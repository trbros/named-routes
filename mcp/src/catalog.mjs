import { readFile } from 'node:fs/promises';

export const catalog = JSON.parse(await readFile(new URL('../catalog.json', import.meta.url), 'utf8'));
const topics = new Map(catalog.topics.map(topic => [topic.id, topic]));
const normalize = value => value.normalize('NFKD').replace(/\p{M}/gu, '').toLowerCase();
export function getTopic(id, locale = 'en') {
  const topic = topics.get(id);
  if (!topic) throw new Error(`Unknown topic: ${id}. Use search_docs.`);
  return { id, version: catalog.version, title: topic.title[locale], text: topic.text[locale] };
}
export function searchDocs(query, locale = 'en', limit = 10) {
  const words = normalize(query).split(/\s+/u).filter(Boolean);
  return catalog.topics.map(t => {
    const title = normalize(t.title[locale]+' '+t.id);
    const body = normalize(t.text[locale]);
    return { topic: t, score: words.every(w => title.includes(w) || body.includes(w)) ? words.reduce((n,w) => n + (title.includes(w) ? 5 : 1), 0) : 0 };
  }).filter(x=>x.score>0).sort((a,b)=>b.score-a.score || a.topic.id.localeCompare(b.topic.id)).slice(0,limit).map(({topic:t})=>({id:t.id,title:t.title[locale],excerpt:t.text[locale].slice(0,450)}));
}
export function frameworkGuide(framework, locale = 'en') {
  const group = catalog.groups.find(g=>g.id===`framework-${framework}`);
  const fallback = ({nextjs:'nextjs',nuxt:'nuxt',vue:'vue',sveltekit:'sveltekit',astro:'astro','react-router':'react-router','tanstack-router':'tanstack-router',manual:'manual-routes'})[framework];
  const ids = group?.items ?? (topics.has(fallback) ? [fallback] : []);
  return { framework, version:catalog.version, topics:ids.map(id=>({id,title:topics.get(id).title[locale]})) };
}
