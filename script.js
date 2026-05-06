// ================= 猫格类型（完整版16型） =================
const catList = [
{type:"ENFP",n:"🌈 快乐病毒猫",
d:"它像一个随时能点燃气氛的小太阳。好奇心极强，喜欢打破日常节奏，用各种方式和你互动。情绪表达丰富，但不稳定，往往上一秒还在疯跑，下一秒就开始发呆。",
g:"多提供变化和互动，避免单调环境。建立轻度规则（如固定喂食），能让它在自由中更安心。"},
{type:"ISTJ",n:"📦 仓库管理员猫",
d:"高度依赖稳定环境，对时间和空间有很强记忆。一旦形成习惯就会严格执行，是最“有秩序感”的猫。",
g:"保持环境稳定，避免频繁改变布局。突发变化需要循序渐进适应。"},
{type:"ENTP",n:"🧨 拆家艺术家猫",
d:"精力旺盛、创造力爆棚。它不是在搞破坏，而是在“实验世界”。对一切未知充满兴趣。",
g:"必须提供大量玩具和释放精力的渠道，否则会自行“创造项目”。"},
{type:"ISFP",n:"🍃 随性艺术猫",
d:"温和而随性，喜欢安静享受当下。情绪细腻，但表达克制。",
g:"给它自由空间，不要强迫互动，建立信任比频繁打扰更重要。"},
{type:"ESTJ",n:"👮 管家猫",
d:"掌控欲强，喜欢规律生活。对“应该怎样”有自己标准。",
g:"固定作息是关键，让它参与日常互动会提升安全感。"},
{type:"INFP",n:"☁️ 梦游仙女猫",
d:"安静敏感，情绪世界丰富。容易受到环境影响。",
g:"提供安静稳定空间，避免频繁打扰。"},
{type:"ESFP",n:"🎉 气氛组猫",
d:"天生表演者，喜欢成为关注中心。活跃且亲人。",
g:"多互动、多回应它的表达。"},
{type:"INTJ",n:"🧠 策士猫",
d:"独立、冷静，喜欢观察而非参与。行为有自己的逻辑。",
g:"尊重独立性，不要过度干扰。"},
{type:"ESFJ",n:"💖 小太阳猫",
d:"温暖粘人，情绪共鸣能力强，是“情绪支持型猫”。",
g:"多回应互动，避免冷落。"},
{type:"ISTP",n:"🔧 工程师猫",
d:"动手能力强，喜欢拆解世界。安静但行动派。",
g:"提供探索空间和结构化玩具。"},
{type:"ENFJ",n:"🐾 社交明星猫",
d:"非常擅长与人互动，情绪表达丰富且稳定。",
g:"多社交、多互动。"},
{type:"INTP",n:"🧪 实验室猫",
d:"好奇但克制，喜欢观察与研究，而不是参与。",
g:"提供安静探索空间。"},
{type:"ESTP",n:"🎯 猎手猫",
d:"行动导向，喜欢追逐和捕猎模拟。",
g:"增加运动类互动。"},
{type:"ISFJ",n:"🧸 抱抱猫",
d:"温顺依赖，喜欢熟悉和安全感。",
g:"保持稳定陪伴。"},
{type:"INFJ",n:"🌙 灵性猫",
d:"敏感、洞察力强，对情绪变化非常敏感。",
g:"提供稳定情绪环境。"},
{type:"ENTJ",n:"👑 总裁猫",
d:"掌控全场，自信且主动。喜欢主导节奏。",
g:"给它空间发挥，同时设定边界。"}
];

// ================= 计算 =================
function calc() {
  const get = (name) =>
    +document.querySelector(`input[name="${name}"]:checked`)?.value || 3;

  const E = get("E1")+get("E2")+get("E3");
  const S = get("S1")+get("S2")+get("S3");
  const T = get("T1")+get("T2");
  const J = get("J1")+get("J2");

  const eP = Math.round(E/15*100);
  const sP = Math.round(S/15*100);
  const tP = Math.round(T/10*100);
  const jP = Math.round(J/10*100);

  const type =
    (eP>=50?'E':'I') +
    (sP>=50?'S':'N') +
    (tP>=50?'T':'F') +
    (jP>=50?'J':'P');

  const cat = catList.find(x=>x.type===type);

  return {eP,sP,tP,jP,type,cat};
}

// ================= 提交 =================
document.getElementById('catForm')?.addEventListener('submit', e=>{
  e.preventDefault();
  const r = calc();
  localStorage.setItem('maoBTI', JSON.stringify(r));
  location.href = "result.html";
});

// ================= 结果页 =================
if (document.getElementById('catName')) {
  const data = JSON.parse(localStorage.getItem('maoBTI'));

  document.getElementById('catName').textContent =
    `${data.cat.n}（${data.type}）`;

  document.getElementById('catPct').textContent =
    `E${data.eP}% • S${data.sP}% • T${data.tP}% • J${data.jP}%`;

  document.getElementById('catDesc').textContent = data.cat.d;
  document.getElementById('catSuggest').textContent = data.cat.g;
}