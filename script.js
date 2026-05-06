// ================= 猫格类型 =================
const catList = [
  {type:"ESTJ",n:"小狗猫",d:"外向粘人+务实+理性+规律，像小狗一样黏人又守时",g:"固定作息、多陪伴"},
  {type:"ESFJ",n:"小鹿猫",d:"温顺粘人+感性+稳定，超级治愈",g:"多互动、少冷落"},
  {type:"ENTP",n:"拆家猫",d:"脑洞大+精力旺盛+爱折腾",g:"多玩具、多消耗精力"},
  {type:"INFP",n:"仙女猫",d:"安静敏感+情绪细腻",g:"安静环境、多陪伴"},
  {type:"XXXX",n:"变色龙猫",d:"性格多变，适应力强",g:"自由养"}
];

// ================= 计算函数 =================
function calc() {
  const score = (p, n) =>
    Array.from({length:n}, (_,i) =>
      +document.querySelector(`input[name="${p}${i+1}"]:checked`)?.value || 3
    ).reduce((a,b)=>a+b,0);

  const E = score('E',8);
  const S = score('S',10);
  const T = score('T',10);
  const J = score('J',8);

  const eP = Math.round(E/40*100);
  const sP = Math.round(S/50*100);
  const tP = Math.round(T/50*100);
  const jP = Math.round(J/40*100);

  // MBTI判定
  const type =
    (eP>=50?'E':'I') +
    (sP>=50?'S':'N') +
    (tP>=50?'T':'F') +
    (jP>=50?'J':'P');

  const cat = catList.find(x=>x.type===type) || catList.at(-1);

  return {eP,sP,tP,jP,type,cat};
}

// ================= 首页逻辑 =================
if (document.getElementById('catForm')) {

  console.log("首页JS已加载");

  document.getElementById('catForm').addEventListener('submit', function(e) {
    e.preventDefault();

    console.log("点击提交");

    const result = calc();

    console.log("计算结果", result);

    // 存本地（备用）
    localStorage.setItem('maoBTI', JSON.stringify(result));

    // 生成分享URL
    const url = `result.html?e=${result.eP}&s=${result.sP}&t=${result.tP}&j=${result.jP}&type=${result.type}`;

    // 跳转
    window.location.href = url;
  });
}

// ================= 结果页逻辑 =================
if (document.getElementById('catName')) {

  console.log("结果页JS已加载");

  window.onload = () => {

    // 优先读取URL参数（用于分享）
    const params = new URLSearchParams(location.search);

    let data;

    if (params.get('e')) {
      data = {
        eP: +params.get('e'),
        sP: +params.get('s'),
        tP: +params.get('t'),
        jP: +params.get('j'),
        type: params.get('type'),
        cat: catList.find(x=>x.type===params.get('type')) || catList.at(-1)
      };
    } else {
      // fallback 本地存储
      data = JSON.parse(localStorage.getItem('maoBTI'));
    }

    if (!data) {
      alert("请先完成测试");
      location.href = "index.html";
      return;
    }

    // ===== 渲染 =====
    document.getElementById('catName').textContent = `${data.cat.n}（${data.type}）`;
    document.getElementById('catPct').textContent =
      `E${data.eP}% • S${data.sP}% • T${data.tP}% • J${data.jP}%`;

    // 进度条
    document.getElementById('bE').style.width = data.eP + '%';
    document.getElementById('tE').textContent = data.eP + '%';

    document.getElementById('bS').style.width = data.sP + '%';
    document.getElementById('tS').textContent = data.sP + '%';

    document.getElementById('bT').style.width = data.tP + '%';
    document.getElementById('tT').textContent = data.tP + '%';

    document.getElementById('bJ').style.width = data.jP + '%';
    document.getElementById('tJ').textContent = data.jP + '%';

    document.getElementById('catDesc').textContent = data.cat.d;
    document.getElementById('catSuggest').textContent = data.cat.g;

    // ===== 分享按钮 =====
    const shareBtn = document.createElement('button');
    shareBtn.textContent = "复制分享链接";
    shareBtn.className = "submitBtn";

    shareBtn.onclick = () => {
      navigator.clipboard.writeText(location.href);
      shareBtn.textContent = "已复制！";
    };

    document.querySelector('.resultCard').appendChild(shareBtn);
  };
}