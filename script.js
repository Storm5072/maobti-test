const catList = [
  {c:(e,s,t,j)=>e>=70&&s>=70&&t>=70&&j>=70,n:"小狗猫",d:"外向粘人+念旧务实+感性贴心+强迫症，像小狗一样黏着你，准时叫你起床～",g:"固定作息、多陪伴、不要频繁换环境"},
  {c:(e,s,t,j)=>e>=70&&s>=70&&t>=70&&j>=60&&j<70,n:"小鹿猫",d:"温顺粘人+守旧规律+感性温和，不乱闹、不挑事，超省心～",g:"固定饮食、温柔互动、少换玩具"},
  {c:(e,s,t,j)=>e>=40&&e<60&&s>=40&&s<60&&t>=40&&t<60&&j>=40&&j<60,n:"变色龙猫",d:"四维均衡，时而粘人时而独立，超级百搭～",g:"随心喂养、不约束、多观察情绪"}
];

if (location.pathname.includes('index.html')) {
  document.getElementById('catForm').addEventListener('submit', e => {
    e.preventDefault();
    const score = (p, n) => Array.from({length:n}, (_,i) => +document.querySelector(`input[name="${p}${i+1}"]:checked`)?.value||3).reduce((a,b)=>a+b,0);
    const E=score('E',8),S=score('S',10),T=score('T',10),J=score('J',8);
    const eP=Math.round(E/40*100),sP=Math.round(S/50*100),tP=Math.round(T/50*100),jP=Math.round(J/40*100);
    const cat = catList.find(x=>x.c(eP,sP,tP,jP)) || catList.at(-1);
    localStorage.setItem('maoBTI', JSON.stringify({cat,eP,sP,tP,jP}));
  });
}

if (location.pathname.includes('result.html')) {
  window.onload = () => {
    const d = JSON.parse(localStorage.getItem('maoBTI'));
    if(!d){location.href='index.html';return}
    document.getElementById('catName').textContent=d.cat.n;
    document.getElementById('catPct').textContent=`E${d.eP}% • S${d.sP}% • T${d.tP}% • J${d.jP}%`;
    document.getElementById('bE').style.width=d.eP+'%';document.getElementById('tE').textContent=d.eP+'%';
    document.getElementById('bS').style.width=d.sP+'%';document.getElementById('tS').textContent=d.sP+'%';
    document.getElementById('bT').style.width=d.tP+'%';document.getElementById('tT').textContent=d.tP+'%';
    document.getElementById('bJ').style.width=d.jP+'%';document.getElementById('tJ').textContent=d.jP+'%';
    document.getElementById('catDesc').textContent=d.cat.d;
    document.getElementById('catSuggest').textContent=d.cat.g;
  };
}