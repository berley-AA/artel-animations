import * as acorn from 'acorn'; import jsx from 'acorn-jsx'; import fs from 'fs';
const P = acorn.Parser.extend(jsx());
export function scripts(html){ const out=[]; const re=/<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/g; let m; while((m=re.exec(html))){ if(/type="(application\/ld\+json|text\/template)"/.test(m[1])) continue; out.push({start:m.index+m[0].indexOf('>')+1, code:m[2]}); } return out; }
export function literals(code){ const lits=[]; let ast; try{ ast=P.parse(code,{ecmaVersion:'latest',sourceType:'script',allowHashBang:true}); }catch(e){ try{ ast=P.parse(code,{ecmaVersion:'latest',sourceType:'module'}); }catch(e2){ return {err:e2.message}; } }
  (function walk(n,parent){ if(!n||typeof n.type!=='string') return;
    if(n.type==='Literal'&&typeof n.value==='string') lits.push({s:n.start,e:n.end,v:n.value,raw:n.raw,parent:parent&&parent.type});
    if(n.type==='TemplateElement') lits.push({s:n.start,e:n.end,v:n.value.cooked,tpl:true});
    for(const k in n){ if(k==='parent')continue; const c=n[k]; if(Array.isArray(c)) c.forEach(x=>walk(x,n)); else if(c&&typeof c.type==='string') walk(c,n); } })(ast,null);
  return {lits}; }
if (process.argv[2]==='list'){ const set=new Map(); for(const f of process.argv.slice(3)){ const h=fs.readFileSync(f,'utf8'); for(const sc of scripts(h)){ const r=literals(sc.code); if(r.err){console.error(f,'PARSE',r.err);continue;} for(const l of r.lits){ const v=l.v; if(!v||!/[A-Za-z]{2,}.*\s.*[A-Za-z]|^[A-Z][a-z]+(\s|$)|^[A-Z][a-z]+[.!?]$/.test(v)) continue; if(/^(https?:|[#.]|\/|[\w-]+\(|[a-z-]+:)|[{};]|rgba|px\b|cubic|translate/.test(v)) continue; if(!set.has(v)) set.set(v,f);} } } console.log(JSON.stringify([...set.keys()],null,0)); }
