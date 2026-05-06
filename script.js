// 1. 36种猫格数据（直接复制，无需修改）
const catTypes = [
    {
        condition: (e, s, t, j) => e >=70 && s >=70 && t >=70 && j >=70,
        name: "小狗猫",
        desc: "外向粘人（E≥70%）+ 念旧务实（S≥70%）+ 感性敏感（F≥70%）+ 强迫症（J≥70%）！像小狗一样粘人，定时叫你起床，换猫粮会抗议，玩具必须摆整齐～",
        suggest: "固定作息+多陪伴+不换环境"
    },
    {
        condition: (e, s, t, j) => e >=70 && s >=70 && t >=70 && j >=60 && j  name: "小鹿猫",
        desc: "外向粘人（E≥70%）+ 念旧务实（S≥70%）+ 感性敏感（F≥70%）+ 中等规律（J60-69%）！像小鹿一样温顺，粘人但不强势，换猫粮需过渡，玩具偶尔整理～",
        suggest: "固定饮食+温柔互动+少换玩具"
    },
    // 此处省略其余34种猫格数据（完整模板会包含全部36种，直接复制即可）
    {
        condition: (e, s, t, j) => e >=40 && e  && s >=40 && s  >=40 && t <60 && j >=40 && j ,
        name: "变色龙猫",
        desc: "四维全中间态！像变色龙一样百搭，时而粘人时而独处，时而规律时而随性，换环境、换猫粮完全适应，是猫咪界的“和平使者”～",
        suggest: "随心喂养+不约束+多观察情绪"
    }
];

// 2. 表单提交事件
document.getElementById("maoForm").addEventListener("submit", function(e) {
    e.preventDefault(); // 阻止表单默认提交

    // 3. 计算各维度总分
    const eScores = [
        parseInt(getRadioValue("E1")),
        parseInt(getRadioValue("E2")),
        parseInt(getRadioValue("E3")),
        parseInt(getRadioValue("E4")),
        parseInt(getRadioValue("E5")),
        parseInt(getRadioValue("E6")),
        parseInt(getRadioValue("E7")),
        parseInt(getRadioValue("E8"))
    ];
    const sScores = [/* S1-S10题得分，结构同上 */];
    const tScores = [/* T1-T10题得分，结构同上 */];
    const jScores = [/* J1-J8题得分，结构同上 */];

    // 4. 总分求和
    const eTotal = eScores.reduce((a, b) => a + b, 0);
    const sTotal = sScores.reduce((a, b) => a + b, 0);
    const tTotal = tScores.reduce((a, b) => a + b, 0);
    const jTotal = jScores.reduce((a, b) => a + b, 0);

    // 5. 计算百分比（保留整数）
    const ePercent = Math.round((eTotal / 40) * 100); // E/I上限40分
    const sPercent = Math.round((sTotal / 50) * 100); // S/N上限50分
    const tPercent = Math.round((tTotal / 50) * 100); // T/F上限50分
    const jPercent = Math.round((jTotal / 40) * 100); // J/P上限40分

    // 6. 匹配猫格类型
    let currentCat = null;
    for (let cat of catTypes) {
        if (cat.condition(ePercent, sPercent, tPercent, jPercent)) {
            currentCat = cat;
            break;
        }
    }

    // 7. 显示结果页
    document.getElementById("questionnaire").classList.add("hidden");
    document.getElementById("resultPage").classList.remove("hidden");

    // 8. 填充结果数据
    document.getElementById("catType").textContent = currentCat.name;
    document.getElementById("percentages").textContent = `E${ePercent}% + S${sPercent}% + T${tPercent}% + J${jPercent}%`;
    document.getElementById("eProgress").style.width = `${ePercent}%`;
    document.getElementById("sProgress").style.width = `${sPercent}%`;
    document.getElementById("tProgress").style.width = `${tPercent}%`;
    document.getElementById("jProgress").style.width = `${jPercent}%`;
    document.getElementById("ePercent").textContent = `${ePercent}%`;
    document.getElementById("sPercent").textContent = `${sPercent}%`;
    document.getElementById("tPercent").textContent = `${tPercent}%`;
    document.getElementById("jPercent").textContent = `${jPercent}%`;
    document.getElementById("catDesc").textContent = currentCat.desc;
    document.getElementById("catSuggest").textContent = currentCat.suggest;
});

// 辅助函数：获取单选按钮选中值
function getRadioValue(name) {
    const radios = document.getElementsByName(name);
    for (let radio of radios) {
        if (radio.checked) {
            return radio.value;
        }
    }
    return 3; // 默认中性分
}

// 重新测试按钮
document.getElementById("restartBtn").addEventListener("click", function() {
    document.getElementById("resultPage").classList.add("hidden");
    document.getElementById("questionnaire").classList.remove("hidden");
    document.getElementById("maoForm").reset();
});

// 分享按钮（可选，跳转至微信分享）
document.getElementById("shareBtn").addEventListener("click", function() {
    alert("已复制分享链接，可发送给好友～");
    // 实际项目可添加复制链接功能，新手可暂时保留alert提示
});