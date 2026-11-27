#!/usr/bin/env node
import { parseArgs } from 'node:util';
import { McpServer } from '@modelcontextprotocol/server';
import { serveStdio } from '@modelcontextprotocol/server/stdio';
import * as z from 'zod/v4';
import { catalog, getTopic, searchDocs, frameworkGuide } from '../src/catalog.mjs';
import { loadManifest } from '../src/manifest.mjs';

const {values}=parseArgs({options:{root:{type:'string'},manifest:{type:'string'}}});
if (values.manifest && !values.root) throw new Error('--manifest requires --root');
const locale=z.enum(catalog.locales).default('en');
const readonly={readOnlyHint:true,destructiveHint:false,idempotentHint:true,openWorldHint:false};
const result=value=>({content:[{type:'text',text:typeof value==='string'?value:JSON.stringify(value,null,2)}]});
function createServer() {
  const server=new McpServer({name:'named-routes',version:catalog.version});
  const tool=(name,description,inputSchema,fn)=>server.registerTool(name,{description,inputSchema,annotations:readonly},async args=>{
    try { return result(await fn(args)); } catch(e) { return {...result({error:e instanceof Error?e.message:String(e)}),isError:true}; }
  });
  tool('get_agent_contract','Read versioned Named Routes conventions and constraints. Read before suggesting integration.',z.object({}),()=>catalog.contract);
  tool('search_docs','Search the bundled documentation by function, framework or task.',z.object({query:z.string().trim().min(1).max(200),locale,limit:z.number().int().min(1).max(25).default(10)}),a=>({version:catalog.version,results:searchDocs(a.query,a.locale,a.limit)}));
  tool('get_topic','Read one complete topic including independent base path examples. Use topic IDs returned by search_docs.',z.object({id:z.string().min(1).max(120),locale}),a=>getTopic(a.id,a.locale));
  tool('get_framework_guide','List the topic IDs for a framework. Read individual topics using get_topic.',z.object({framework:z.enum(['nextjs','nuxt','vue','sveltekit','astro','react-router','tanstack-router','manual']),locale}),a=>frameworkGuide(a.framework,a.locale));
  tool('list_routes','Read the static generated manifest of the explicitly configured project. Does not run config or regenerate; data may be stale.',z.object({filter:z.string().max(200).default(''),offset:z.number().int().min(0).default(0),limit:z.number().int().min(1).max(100).default(40)}),async a=>{
    const m=await loadManifest(values.root,values.manifest);const filter=a.filter.toLowerCase();const entries=m.entries.filter(e=>e.name.toLowerCase().includes(filter)||e.pattern.toLowerCase().includes(filter));return {file:m.file,total:entries.length,offset:a.offset,entries:entries.slice(a.offset,a.offset+a.limit),nextOffset:a.offset+a.limit<entries.length?a.offset+a.limit:null,warning:'Generated snapshot; freshness and installed version not verified.'};
  });
  tool('get_route','Find an exact route name in the configured manifest. Does not guess route names or HTTP methods.',z.object({name:z.string().min(1).max(300)}),async a=>{
    const m=await loadManifest(values.root,values.manifest);const route=m.entries.find(e=>e.name===a.name);if(!route)throw new Error('Route name not found; use list_routes.');return {file:m.file,route,warning:'Generated snapshot; freshness and installed version not verified.'};
  });
  server.registerResource('agent-contract','named-routes://agent-contract',{title:'Named Routes agent contract',mimeType:'text/markdown'},async uri=>({contents:[{uri:uri.href,mimeType:'text/markdown',text:catalog.contract}]}));
  return server;
}
void serveStdio(createServer);
