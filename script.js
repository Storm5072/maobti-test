// 36种猫格匹配数据
const catList = [
  {c:(e,s,t,j)=>e>=70&&s>=70&&t>=70&&j>=70,n:"小狗猫",d:"外向粘人+念旧务实+感性贴心+强迫症，像小狗一样黏着你，准时叫你起床～",g:"固定作息、多陪伴、不要频繁换环境"},
  {c:(e,s,t,j)=>e>=70&&s>=70&&t>=70&&j>=60&&j<70,n:"小鹿猫",d:"温顺粘人+守旧规律+感性温和，不乱闹、不挑事，超省心～",g:"固定饮食、温柔互动、少换玩具"},
  {c:(e,s,t,j)=>e>=70&&s>=70&&t>=70&&j>=40&&j<60,n:"绵羊猫",d:"软萌粘人+不挑剔+情绪稳定，换粮换环境都不怕～",g:"多夸奖、慢换环境、随心互动"},
  {c:(e,s,t,j)=>e>=70&&s>=70&&t>=50&&t<70&&j>=70,n:"兔子猫",d:"活泼粘人+念旧+爱蹦跳，抗议但很快原谅你～",g:"多陪玩、固定主食、包容小随性"},
  {c:(e,s,t,j)=>e>=70&&s>=70&&t>=50&&t<70&&j>=40&&j<60,n:"松鼠猫",d:"粘人好动+念旧+爱拆家，适应快、丢玩具也开心～",g:"多消耗精力、固定零食、不约束"},
  {c:(e,s,t,j)=>e>=70&&s>=70&&t<50&&j>=70,n:"狼猫",d:"外向霸气+守旧+理性果断，家里它说了算～",g:"顺着性子、固定规则、不妥协"},
  {c:(e,s,t,j)=>e>=70&&s>=70&&t<50&&j>=40&&j<60,n:"狐狸猫",d:"聪明强势+务实+理性，会沟通、不黏人～",g:"多互动、固定饮食、适度引导"},
  {c:(e,s,t,j)=>e>=70&&s>=50&&s<70&&t>=70&&j>=70,n:"鹦鹉猫",d:"粘人话多+好奇+感性，爱探索、守规矩～",g:"多陪伴、固定作息、适度探索"},
  {c:(e,s,t,j)=>e>=70&&s>=50&&s<70&&t>=70&&j>=40&&j<60,n:"蜂鸟猫",d:"活泼粘人+好奇+感性，停不下来～",g:"多陪玩、多给新玩具、温柔互动"},
  {c:(e,s,t,j)=>e>=70&&s>=50&&s<70&&t<50&&j>=70,n:"雄鹰猫",d:"霸气探索+好奇+理性，掌控一切～",g:"多挑战、固定规则、适度自由"},
  {c:(e,s,t,j)=>e>=70&&s>=50&&s<70&&t<50&&j>=40&&j<60,n:"隼猫",d:"敏捷强势+好奇+理性，不鲁莽～",g:"多挑战、适度引导、多互动"},
  {c:(e,s,t,j)=>e>=70&&s<50&&t>=70&&j>=70,n:"蝴蝶猫",d:"灵动粘人+好奇+感性，哪里热闹去哪里～",g:"多互动、多新玩具、随心陪伴"},
  {c:(e,s,t,j)=>e>=70&&s<50&&t>=70&&j>=40&&j<60,n:"蜻蜓猫",d:"好动粘人+好奇+感性，探索不停～",g:"多消耗精力、多新玩具、包容随性"},
  {c:(e,s,t,j)=>e>=70&&s<50&&t<50&&j>=70,n:"猎豹猫",d:"迅猛好动+好奇+理性，停不下来～",g:"多挑战、多消耗精力、不约束"},
  {c:(e,s,t,j)=>e>=70&&s<50&&t<50&&j>=40&&j<60,n:"猴子猫",d:"叛逆好动+务实+理性，怎么开心怎么来～",g:"多消耗精力、固定规则、不约束"},
  {c:(e,s,t,j)=>e>=40&&e<70&&s>=70&&t>=70&&j>=70,n:"熊猫猫",d:"内向温顺+守旧+感性，安静陪在你身边～",g:"给独处空间、固定环境、温柔陪伴"},
  {c:(e,s,t,j)=>e>=40&&e<70&&s>=70&&t>=70&&j>=40&&j<60,n:"考拉猫",d:"慵懒内向+守旧+感性，爱睡觉、不粘人～",g:"给独处空间、固定作息、少打扰"},
  {c:(e,s,t,j)=>e>=40&&e<70&&s>=70&&t<50&&j>=70,n:"刺猬猫",d:"高冷内向+守旧+理性，有距离感～",g:"给独处空间、固定规则、不强迫互动"},
  {c:(e,s,t,j)=>e>=40&&e<70&&s>=70&&t<50&&j>=40&&j<60,n:"鼹鼠猫",d:"低调内向+守旧+理性，爱躲着～",g:"给独处空间、固定饮食、少打扰"},
  {c:(e,s,t,j)=>e>=40&&e<70&&s>=50&&s<70&&t>=70&&j>=70,n:"鹿猫",d:"胆小内向+好奇+感性，爱探索～",g:"给独处空间、固定作息、适度探索"},
  {c:(e,s,t,j)=>e>=40&&e<70&&s>=50&&s<70&&t>=70&&j>=40&&j<60,n:"羚羊猫",d:"灵动内向+好奇+感性，爱蹦跳～",g:"给独处空间、多新玩具、温柔安抚"},
  {c:(e,s,t,j)=>e>=40&&e<70&&s>=50&&s<70&&t<50&&j>=70,n:"猫头鹰猫",d:"聪明强势+好奇+理性，爱思考～",g:"多挑战、尊重节奏、多互动"},
  {c:(e,s,t,j)=>e>=40&&e<70&&s>=50&&s<70&&t<50&&j>=40&&j<60,n:"蝙蝠猫",d:"灵活强势+好奇+理性，喜欢夜间活动～",g:"多挑战、包容夜玩、多消耗精力"},
  {c:(e,s,t,j)=>e>=40&&e<70&&s<50&&t>=70&&j>=70,n:"垂耳兔猫",d:"胆小内向+好奇+感性，适应快～",g:"给独处空间、多新玩具、少打扰"},
  {c:(e,s,t,j)=>e>=40&&e<70&&s<50&&t>=70&&j>=40&&j<60,n:"小松鼠猫",d:"活泼内向+好奇+感性，爱囤货～",g:"给独处空间、多新玩具、包容随性"},
  {c:(e,s,t,j)=>e>=40&&e<70&&s<50&&t<50&&j>=70,n:"黄鼠狼猫",d:"机敏内向+守旧+理性，爱乱窜～",g:"给独处空间、固定主食、包容调皮"},
  {c:(e,s,t,j)=>e>=40&&e<70&&s<50&&t<50&&j>=40&&j<60,n:"貂熊猫",d:"叛逆内向+守旧+理性，爱拆家～",g:"给独处空间、多消耗精力、不约束"},
  {c:(e,s,t,j)=>e<40&&s>=70&&t>=70&&j>=70,n:"豚鼠猫",d:"胆小内向+守旧+感性，怕陌生人～",g:"给独处空间、固定环境、温柔安抚"},
  {c:(e,s,t,j)=>e<40&&s>=70&&t>=70&&j>=40&&j<60,n:"仓鼠猫",d:"可爱内向+守旧+感性，爱囤玩具～",g:"给独处空间、固定主食、包容随性"},
  {c:(e,s,t,j)=>e<40&&s>=70&&t<50&&j>=70,n:"穿山甲猫",d:"谨慎内向+守旧+理性，怕陌生～",g:"给独处空间、固定环境、尊重边界"},
  {c:(e,s,t,j)=>e<40&&s>=70&&t<50&&j>=40&&j<60,n:"貂猫",d:"机敏内向+守旧+理性，爱乱窜～",g:"给独处空间、固定主食、包容调皮"},
  {c:(e,s,t,j)=>e<40&&s>=50&&s<70&&t>=70&&j>=70,n:"龙猫猫",d:"软萌内向+守旧+感性，爱蹦跳～",g:"给独处空间、多玩具、不约束"},
  {c:(e,s,t,j)=>e<40&&s>=50&&s<70&&t>=70&&j>=40&&j<60,n:"飞鼠猫",d:"灵动内向+好奇+感性，爱跳上跳下～",g:"给独处空间、多新玩具、不约束"},
  {c:(e,s,t,j)=>e>=40&&e<60&&s>=40&&s<60&&t>=40&&t<60&&j>=40&&j<60,n:"变色龙猫",d:"四维均衡，时而粘人时而独立，超级百搭～",g:"随心喂养、不约束、多观察情绪"}
];

// 问卷页逻辑
if (location.pathname.includes('index.html') || location.pathname === '/') {
  document.getElementById('catForm').addEventListener('submit', e => {
    e.preventDefault();
    // 计算分数
    const sum = (name, len) => Array(len).fill().map((_,i) => +document.querySelector(`input[name="${name}${i+1}"]:checked`)?.value||3).reduce((a,b)=>a+b,0);
    const E = sum('E',8), S=sum('S',10), T=sum('T',10), J=sum('J',8);
    const eP=Math.round(E/40*100), sP=Math.round(S/50*100), tP=Math.round(T/50*100), jP=Math.round(J/40*100);
    // 匹配猫格
    const cat = catList.find(x=>x.c(eP,sP,tP,jP)) || catList[catList.length-1];
    // 存储结果并跳转
    localStorage.setItem('maoBTI', JSON.stringify({cat,eP,sP,tP,jP}));
    location.href = 'result.html';
  });
}

// 结果页逻辑
if (location.pathname.includes('result.html')) {
  window.onload = () => {
    const data = JSON.parse(localStorage.getItem('maoBTI'));
    if(!data) return location.href='index.html';
    const {cat,eP,sP,tP,jP} = data;
    document.getElementById('catName').textContent = cat.n;
    document.getElementById('catPct').textContent = `E${eP}% • S${sP}% • T${tP}% • J${jP}%`;
    document.getElementById('bE').style.width = eP+'%'; document.getElementById('tE').textContent=eP+'%';
    document.getElementById('bS').style.width = sP+'%'; document.getElementById('tS').textContent=sP+'%';
    document.getElementById('bT').style.width = tP+'%'; document.getElementById('tT').textContent=tP+'%';
    document.getElementById('bJ').style.width = jP+'%'; document.getElementById('tJ').textContent=jP+'%';
    document.getElementById('catDesc').textContent = cat.d;
    document.getElementById('catSuggest').textContent = cat.g;
  };
}