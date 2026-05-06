const catList = {
ENFP:{
n:"🌈 快乐病毒猫",
d:"这种猫像一个行走的快乐源泉，对环境和人都充满热情。它们极其好奇，喜欢探索新事物，也很容易沉浸在自己的小世界里。情绪表达丰富但不稳定，可能上一秒还在疯狂跑酷，下一秒就进入发呆状态。整体而言，它们更倾向于通过互动和变化来获得安全感。",
g:"提供丰富环境和互动机会，避免单调。建立轻规则帮助稳定情绪。"
},
ISTJ:{
n:"📦 仓库管理员猫",
d:"这类猫对环境稳定性要求极高，一旦形成习惯就会长期保持。它们对空间和时间有清晰记忆，行为可预测性强。在熟悉环境中会表现得非常安心，但面对变化时可能会显得谨慎甚至抗拒。整体偏理性且自我节奏明确。",
g:"保持稳定作息与环境，避免频繁改变布局。"
}
};

function calc(){
const get=(p,n)=>Array.from({length:n},(_,i)=>+document.querySelector(`input[name="${p}${i+1}"]:checked`)?.value||3).reduce((a,b)=>a+b,0);

const e=get('E',8),s=get('S',8),t=get('T',8),j=get('J',8);

const eP=Math.round(e/40*100);
const sP=Math.round(s/40*100);
const tP=Math.round(t/40*100);
const jP=Math.round(j/40*100);

const type=(eP>=50?'E':'I')+(sP>=50?'S':'N')+(tP>=50?'T':'F')+(jP>=50?'J':'P');

return {eP,sP,tP,jP,type};
}

document.getElementById('catForm')?.addEventListener('submit',e=>{
e.preventDefault();
const r=calc();

// 排行榜记录
let rank=JSON.parse(localStorage.getItem('rank')||"{}");
rank[r.type]=(rank[r.type]||0)+1;
localStorage.setItem('rank',JSON.stringify(rank));

localStorage.setItem('result',JSON.stringify(r));
location.href='result.html';
});

if(document.getElementById('catName')){
const data=JSON.parse(localStorage.getItem('result'));
const cat=catList[data.type]||catList["ENFP"];

document.getElementById('catName').innerText=cat.n+"（"+data.type+"）";
document.getElementById('catDesc').innerText=cat.d;
document.getElementById('catSuggest').innerText=cat.g;

// 进度条
['E','S','T','J'].forEach(k=>{
document.getElementById('b'+k).style.width=data[k.toLowerCase()+'P']+'%';
document.getElementById('t'+k).innerText=data[k.toLowerCase()+'P']+'%';
});

// 击败
const beat=Math.floor(Math.random()*40)+60;
document.getElementById('beat').innerText=`击败了${beat}%的猫`;

// 分享文案
document.getElementById('shareText').innerText=
`我家猫是${cat.n}（${data.type}），击败了${beat}%的猫！快来测👉`;

// 排行榜
const rank=JSON.parse(localStorage.getItem('rank')||"{}");
const list=Object.entries(rank).sort((a,b)=>b[1]-a[1]).slice(0,5);
const el=document.getElementById('rankList');
list.forEach(i=>{
const li=document.createElement('li');
li.innerText=i[0]+"："+i[1]+"次";
el.appendChild(li);
});
}

function copy(){
navigator.clipboard.writeText(document.getElementById('shareText').innerText);
alert("已复制！");
}