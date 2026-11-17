(function(root){
function rng(seed){return()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function shuffle(a,seed){a=[...a];let r=rng(seed);for(let i=a.length-1;i>0;i--){let j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function select(bank,subject,seed,count=25){return shuffle(bank.filter(q=>q.subject===subject),seed).slice(0,count)}
function selectTest(bank,subject,testNo,count=25){
 const seed=Array.from(subject).reduce((n,c)=>n*31+c.charCodeAt(0),17)>>>0;
 const pool=shuffle(bank.filter(q=>q.subject===subject),seed);
 if(!pool.length)return [];
 const size=Math.min(count,pool.length),start=((testNo-1)*size)%pool.length;
 const questions=testNo<=Math.ceil(pool.length/size)?Array.from({length:size},(_,i)=>pool[(start+i)%pool.length]):shuffle(pool,seed+testNo*3571).slice(0,size);
 return shuffle(questions,seed+testNo*997);
}
function grade(qs,answers){let right=0;let topics={};qs.forEach(q=>{let t=topics[q.topic]??={right:0,total:0};t.total++;if(answers[q.id]===q.answer){right++;t.right++}});return{right,total:qs.length,score:Math.round(right/qs.length*100),topics}}
function analyse(results){const subjects={};for(const s of ['IQ','English','GK']){const rows=results.filter(r=>r.subject===s);let total=0,right=0,topics={};for(const r of rows.slice(-5)){total+=r.total;right+=r.right;for(const [k,v]of Object.entries(r.topics)){let t=topics[k]??={right:0,total:0};t.right+=v.right;t.total+=v.total}}subjects[s]={attempts:rows.length,total,right,accuracy:total?Math.round(right/total*100):null,topics}}return subjects}
function valid(q){return q&&typeof q.id==='string'&&['IQ','English','GK'].includes(q.subject)&&typeof q.topic==='string'&&q.topic.trim()&&typeof q.question==='string'&&q.question.trim()&&Array.isArray(q.options)&&q.options.length===4&&q.options.every(x=>typeof x==='string'&&x.trim())&&new Set(q.options).size===4&&Number.isInteger(q.answer)&&q.answer>=0&&q.answer<4&&typeof q.explanation==='string'&&q.explanation.trim()}
const api={shuffle,select,selectTest,grade,analyse,valid};if(typeof module!=='undefined')module.exports=api;else root.Engine=api;
})(globalThis);
