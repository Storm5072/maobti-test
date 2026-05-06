const catList = [
  {c:(e,s,t,j)=>e>=70&&s>=70&&t>=70&&j>=70,n:"小狗猫",d:"外向粘人+念旧务实+感性贴心+强迫症，像小狗一样黏着你，准时叫你起床～",g:"固定作息、多陪伴、不要频繁换环境"},
  {c:(e,s,t,j)=>e>=70&&s>=70&&t>=70&&j>=60&&j<70,n:"小鹿猫",d:"温顺粘人+守旧规律+感性温和，不乱闹、不挑事，超省心～",g:"固定饮食、温柔互动、少换玩具"},
  {c:(e,s,t,j)=>e>=70&&s>=70&&t>=70&&j>=40&&j<60,n:"绵羊猫",d:"软萌粘人+不挑剔+情绪稳定，换粮换环境都不怕～",g:"多夸奖、慢换环境、随心互动"},
  {c:(e,s,t,j)=>e>=70&&s>=70&&t>=50&&t<70&&j>=70,n:"兔子猫",d:"活泼粘人+念旧+爱蹦跳，抗议但很快原谅你～",g:"多陪玩、固定主食、包容小随性"},
  {c:(e,s,t,j)=>e>=70&&s>=70&&t>=50&&t<70&&j>=40&&j<60,n:"松鼠猫",d:"粘人好动+念旧+爱拆家，适应快、丢玩具也开心～",g:"多消耗精力、固定零食、不约束"},
  {c:(e,s,t,j)=>e>=70&&s>=70&&t<50&&j>=70,n:"狼猫",d:"外向霸气+守旧+理性果断，家里它说了算～",g:"顺着性子、固定规则、不妥协"},
  {c:(e,s,t,j)=>e>=70&&s>=70&&t<50&&j>=40&&j<60,n:"狐狸猫",d:"聪明强势+务实+理性，会沟通、不黏人～",g:"多互动、固定饮食、适度引导"},
  {c:(e,s,t,j)=>e>=40&&e<60&&s>=40&&s<60&&t>=40&&t<60&&j>=40&&j<60,n:"变色龙猫",d:"四维均衡，时而粘人时而独立，超级百搭～",g:"随心喂养、不约束、多观察情绪"}
];

// 问卷页
if (location.pathname.includes('index.html') || location.pathname === '/') {
  document.getElementById('catForm').addEventListener('submit', e => {
    e.preventDefault();
    const score = (prefix, count) => {
      let sum = 0;
      for (let i=1; i<=count; i++) {
        const el = document.querySelector(`input[name="${prefix}${i}"]:checked`);
        sum += el ? Number(el.value) : 3;
      }
      return sum;
    };
    const E = score('E',8);
    const S = score('S',10);
    const T = score('T',10);
    const J = score('J',8);
    const eP = Math.round(E/40*100);
    const sP = Math.round(S/50*100);
    const tP = Math.round(T/50*100);
    const jP = Math.round(J/40*100);
    const cat = catList.find(x => x.c(eP,sP,tP,jP)) || catList[catList.length-1];
    localStorage.setItem('maoResult', JSON.stringify({ cat, eP, sP, tP, jP }));
    location.href = 'result.html';
  });
}

// 结果页
if (location.pathname.includes('result.html')) {
  window.addEventListener('load', () => {
    const data = JSON.parse(localStorage.getItem('maoResult'));
    if (!data) { location.href = 'index.html'; return; }
    const { cat, eP, sP, tP, jP } = data;
    document.getElementById('catName').textContent = cat.n;
    document.getElementById('catPct').textContent = `E${eP}% • S${sP}% • T${tP}% • J${jP}%`;
    document.getElementById('bE').style.width = eP+'%'; document.getElementById('tE').textContent = eP+'%';
    document.getElementById('bS').style.width = sP+'%'; document.getElementById('tS').textContent = sP+'%';
    document.getElementById('bT').style.width = tP+'%'; document.getElementById('tT').textContent = tP+'%';
    document.getElementById('bJ').style.width = jP+'%'; document.getElementById('tJ').textContent = jP+'%';
    document.getElementById('catDesc').textContent = cat.d;
    document.getElementById('catSuggest').textContent = cat.g;
  });
}