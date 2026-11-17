import vm from 'node:vm';import fs from 'node:fs';import assert from 'node:assert/strict';
let nodes=new Map(),stored={};const node=()=>({innerHTML:'',textContent:'',style:{},insertAdjacentHTML(){}});let context=vm.createContext({console,Date,Math,JSON,Object,Array,Set,String,Number,Promise,Error,RegExp,encodeURIComponent,setTimeout:()=>0,setInterval:()=>0,clearInterval(){},confirm:()=>true,location:{hash:'',reload(){}},window:{addEventListener(){},scrollTo(){}},document:{querySelector(s){if(!nodes.has(s))nodes.set(s,node());return nodes.get(s)}},localStorage:{getItem:k=>stored[k]??null,setItem:(k,v)=>stored[k]=v},fetch:async p=>({ok:true,json:async()=>JSON.parse(fs.readFileSync('dist/'+p.split('?')[0],'utf8'))})});
vm.runInContext(fs.readFileSync('dist/engine.js','utf8'),context);vm.runInContext(fs.readFileSync('dist/app.js','utf8'),context);await new Promise(r=>setTimeout(r,30));const run=s=>vm.runInContext(s,context);
assert(nodes.get('#app').innerHTML.includes('প্রস্তুতি হোক'));
run("start('English',1);renderExam()");assert(nodes.get('#app').innerHTML.includes('প্রশ্ন 1 / 25'));
run('answer(exam.questions[0].answer);step(1)');assert.equal(run('Object.keys(exam.answers).length'),1);
run('exam=null;resume();renderExam()');assert.equal(run('exam.index'),1);
run('submitExam(true);reviewResult()');assert.equal(run('state.results.length'),1);assert.equal(run('state.results[0].score'),4);assert.equal(run('state.active'),null);
run("subjectPage()");assert(nodes.get('#app').innerHTML.includes('4%'));
run("retest('English');renderExam()");assert.equal(run('exam.questions.length'),25);
run('results()');assert(nodes.get('#app').innerHTML.includes('4 / 100'));
run('bankPage()');assert(nodes.get('#app').innerHTML.includes('652টি প্রশ্ন'));
run("bankMode='source';bankPage()");assert(nodes.get('#app').innerHTML.includes('1344টি উৎসের অংশ'));assert(!nodes.get('#app').innerHTML.includes('undefined'));
run('draftPage()');assert(nodes.get('#app').innerHTML.includes('1344টি খসড়া'));

console.log("Passed: dashboard, exam, resume, submission, review, retest, result and bank rendering");
