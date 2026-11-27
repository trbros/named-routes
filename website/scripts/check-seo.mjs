// Run against an actual deployment (or a production build with next start).
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { parseArgs } from 'node:util';
import { createSeoConfig, languageAlternates, localizedUrl, publicUrl, sitemapEntries } from '../lib/seo-urls.mjs';
const {values} = parseArgs({options:{origin:{type:'string'},all:{type:'boolean',default:false}}});
const read=async path=>JSON.parse(await readFile(new URL(path,import.meta.url),'utf8'));
const locales=await read('../../docs/locales.json');
const sections=await read('../../docs/content.json');
const config=createSeoConfig({...process.env,NODE_ENV:'production',VERCEL_ENV:'production',SEO_INDEXABLE:'true'});
const target=new URL(values.origin??config.origin);
assert.equal(target.pathname,'/','--origin must be an origin, not a path');
async function request(url){
  const response=await fetch(new URL(url.pathname,target),{redirect:'manual',signal:AbortSignal.timeout(20000),headers:{'user-agent':'Googlebot'}});
  assert.equal(response.status,200,`${response.status} ${url.pathname}`);
  return response;
}
const expected=sitemapEntries(sections.map(x=>x.id),locales.locales,locales.source,config);
const xml=await (await request(new URL(publicUrl('/sitemap.xml',config)))).text();
const actual=[...xml.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/g)].map(x=>x[1].trim());
assert.equal(actual.length,new Set(actual).size,'duplicate sitemap URLs');
assert.deepEqual(actual.sort(),expected.map(x=>x.url).sort(),'sitemap URLs must match the current docs catalog');
assert.ok(xml.includes('hreflang="x-default"'),'x-default missing from sitemap');
const paths=['','/docs','/docs/mcp-installation','/docs/mcp-tools','/docs/mcp-workflow','/releases','/playground'];
const pages=values.all?expected.map(x=>x.url):locales.locales.flatMap(({code})=>paths.map(path=>localizedUrl(code,path,config)));
const attr=(tag,key)=>new RegExp(`\\b${key}\\s*=\\s*["']([^"']*)["']`,'i').exec(tag)?.[1];
for(const page of pages){
  const url=new URL(page), html=await (await request(url)).text();
  const links=html.match(/<link\b[^>]*>/gi)??[];
  const canonicals=links.filter(tag=>attr(tag,'rel')==='canonical');
  assert.equal(canonicals.length,1,`${page}: expected exactly one canonical`);
  assert.equal(attr(canonicals[0],'href'),page,`${page}: incorrect canonical`);
  const path=url.pathname.slice(config.basePath.length).split('/').slice(2).join('/');
  const alternates=languageAlternates(path?`/${path}`:'',locales.locales,locales.source,config);
  for(const [lang,href] of Object.entries(alternates)) assert.ok(links.some(tag=>attr(tag,'rel')==='alternate'&&attr(tag,'hreflang')===lang&&attr(tag,'href')===href),`${page}: missing ${lang} hreflang`);
  const robots=(html.match(/<meta\b[^>]*>/gi)??[]).filter(tag=>attr(tag,'name')==='robots');
  assert.ok(!robots.some(tag=>/noindex/i.test(attr(tag,'content')??'')),`${page}: unexpected noindex`);
  assert.match(html,/<title>[^<]+<\/title>/i,`${page}: missing title`);
  assert.ok((html.match(/<meta\b[^>]*>/gi)??[]).some(tag=>attr(tag,'name')==='description'&&attr(tag,'content')?.trim()),`${page}: missing description`);
}
const demo=await (await request(new URL(localizedUrl(locales.source,'/users/demo',config)))).text();
assert.ok((demo.match(/<meta\b[^>]*>/gi)??[]).some(tag=>attr(tag,'name')==='robots'&&/noindex/i.test(attr(tag,'content')??'')),'demo must be noindex');
const llms=await request(new URL(publicUrl('/llms.txt',config)));
assert.match(llms.headers.get('x-robots-tag')??'',/noindex/i,'llms mirror should be noindex, not blocked');
const robots=await (await request(new URL(publicUrl('/robots.txt',config)))).text();
assert.ok(robots.includes(publicUrl('/sitemap.xml',config)),'robots sitemap reference missing');
if(config.basePath){
  const rootRobots=await fetch(new URL('/robots.txt',target),{signal:AbortSignal.timeout(20000)});
  if(!rootRobots.ok||!(await rootRobots.text()).includes(publicUrl('/sitemap.xml',config))) console.warn('The shared origin /robots.txt does not advertise the sitemap. Add its Sitemap line at the root host or submit the sitemap directly to Search Console.');
}
console.log(`Verified sitemap (${expected.length} URLs), ${pages.length} HTML pages, demo noindex and AI mirror headers.`);
