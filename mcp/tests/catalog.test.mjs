import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { catalog,getTopic,searchDocs,frameworkGuide } from '../src/catalog.mjs';
test('versioned catalog and all framework guides',()=>{
  assert.equal(catalog.version,JSON.parse(readFileSync(new URL('../../package.json',import.meta.url),'utf8')).version);
  for(const framework of ['nextjs','nuxt','vue','sveltekit','astro','react-router','tanstack-router','manual']) {
    const guide=frameworkGuide(framework,'pt'); assert.ok(guide.topics.length,framework);
    for(const topic of guide.topics) assert.ok(getTopic(topic.id,'pt').text);
  }
  assert.throws(()=>getTopic('unknown'),/Unknown topic/);
  assert.ok(searchDocs('route.url', 'en').length);
  assert.ok(searchDocs('astro', 'pt').length);
  assert.ok(catalog.contract.includes('route.endpoint'));
});
