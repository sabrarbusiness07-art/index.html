import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),E=require('./dist/engine.js'),b=JSON.parse(fs.readFileSync('dist/data/questions.json'));
assert(b.every(E.valid));assert.equal(new Set(b.map(q=>q.id)).size,b.length);
let sets=new Set();for(let s of ['IQ','English','GK'])for(let n=1;n<=40;n++){let q=E.selectTest(b,s,n);assert.equal(q.length,25);assert.equal(new Set(q.map(x=>x.id)).size,25);assert(q.every(x=>x.subject===s));sets.add(q.map(x=>x.id).join(','));let correct=Object.fromEntries(q.map(x=>[x.id,x.answer]));assert.equal(E.grade(q,correct).score,100);assert.equal(E.grade(q,{}).score,0)}assert.equal(sets.size,120);
let q=b.slice(0,25),a=Object.fromEntries(q.slice(0,10).map(x=>[x.id,x.answer]));assert.equal(E.grade(q,a).score,40);
const results=[{subject:'GK',...E.grade(q,a)}];assert.equal(E.analyse(results).GK.accuracy,40);assert.equal(E.analyse(results).IQ.accuracy,null);
assert(!E.valid({...b[0],answer:4}));assert(!E.valid({...b[0],subject:'Math'}));assert(!E.valid({...b[0],options:['x','x','y','z']}));
console.log(`Passed: ${b.length} valid questions; 120 distinct test sets; scoring, analysis and import validation`);

// Every ready question appears in the 40 subject sets; no draft is scored.
for(const subject of ['IQ','English','GK']){const seen=new Set();for(let n=1;n<=40;n++)for(const q of E.selectTest(b,subject,n))seen.add(q.id);assert.equal(seen.size,b.filter(q=>q.subject===subject).length);assert.deepEqual(E.selectTest(b,subject,7),E.selectTest(b,subject,7));}
const archived=JSON.parse(fs.readFileSync('dist/data/imported.json'));assert.equal(archived.length,1344);assert(archived.every(q=>q.answer===null&&q.status==='source_only'));const ids=new Set(b.map(q=>q.id));assert(archived.every(q=>q.reviewedMcqIds.every(id=>ids.has(id))));
const find=id=>b.find(q=>q.id==='source-reviewed-'+id);assert.equal(find('0-22-37').options[find('0-22-37').answer],'৯২৯.০৩ বর্গসেন্টিমিটার');assert.equal(find('1-28-11').options[find('1-28-11').answer],'১৮ এপ্রিল ১৯৭১');assert.equal(find('0-24-25').options[find('0-24-25').answer],'১০ এপ্রিল ১৯৭১');
console.log('Passed: complete ready-bank coverage, source preservation, reviewed links and corrected factual regressions');

const membershipSets=new Set();for(const subject of ["IQ","English","GK"])for(let n=1;n<=40;n++)membershipSets.add(E.selectTest(b,subject,n).map(q=>q.id).sort().join(","));assert.equal(membershipSets.size,120);console.log("Passed: all 120 sets also have different question membership, not just order");
