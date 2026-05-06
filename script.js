const catList = [
  {type:"ESTJ",n:"小狗猫",d:"外向粘人+务实+理性+规律，像小狗一样黏人又守时",g:"固定作息、多陪伴"},
  {type:"ESFJ",n:"小鹿猫",d:"温顺粘人+感性+稳定，超级治愈",g:"多互动、少冷落"},
  {type:"XXXX",n:"变色龙猫",d:"性格多变，适应力强",g:"自由养"}
];

// 👉 计算函数
function calc() {
  const score = (p, n) =>
    Array.from({length:n}, (_,i) =>
      +document.querySelector(`input[name="${p}${i+1}"]:checked`)?.value || 3
    ).reduce((a,b)=>a+b,0);

  const E=score('E',8), S=score('S',10), T=score('T',10), J=score('J',8);

  const eP=Math.round(E/40*100);
  const sP=Math.round(S/50*100);
  const tP=Math.round(T/50*100);
  const jP=Math.round(J/40*100);

  // 👉 MBTI判定
  const type =
    (eP>=50?'E':'I') +
    (sP>=50?'S':'N') +
    (tP>=50?'T':'F') +
    (jP>=50?'J':'P');

  const cat = catList.find(x=>x.type===type) || catList.at(-1);

  return {eP,sP,tP,jP,type,cat};
}

// 👉 首页逻辑
if (location.pathname.includes('index')) {
  document.getElementById('catForm').addEventListener('submit', e => {
    e.preventDefault();

    const result = calc();

    // 👉 存本地
    localStorage.setItem('maoBTI', JSON.stringify(result));

    // 👉 分享链接（关键！）
    const url = `result.html?e=${result.eP}&s=${result.sP}&t=${result.tP}&j=${result.jP}&type=${result.type}`;

    window.location.href = url;
  });
}

// 👉 结果页逻辑
if (location.pathname.includes('result')) {
  window.onload = () => {

    // 👉 优先读URL（分享用）
    const params = new URLSearchParams(location.search);

    let data;

    if (params.get('e')) {
      data = {
        eP:+params.get('e'),
        sP:+params.get('s'),
        tP:+params.get('t'),
        jP:+params.get('j'),
        type:params.get('type'),
        cat:catList.find(x=>x.type===params.get('type')) || catList.at(-1)
      };
    } else {
      data = JSON.parse(localStorage.getItem('maoBTI'));
    }

    if (!data) {
      location.href = 'index.html';
      return;
    }

    // 👉 渲染
    document.getElementById('catName').textContent = `${data.cat.n} (${data.type})`;
    document.getElementById('catPct').textContent =
      `E${data.eP}% • S${data.sP}% • T${data.tP}% • J${data.jP}%`;

    ['E','S','T','J'].forEach(k=>{
      document.getElementById('b'+k).style.width = data[k.toLowerCase()+'P']+'%';
      document.getElementById('t'+k).textContent = data[k.toLowerCase()+'P']+'%';
    });

    document.getElementById('catDesc').textContent = data.cat.d;
    document.getElementById('catSuggest').textContent = data.cat.g;

    // 👉 自动生成分享链接
    const share = location.href;
    const btn = document.createElement('button');
    btn.textContent = "复制分享链接";
    btn.className = "submitBtn";
    btn.onclick = () => {
      navigator.clipboard.writeText(share);
      btn.textContent = "已复制！";
    };
    document.querySelector('.resultCard').appendChild(btn);
  };
}