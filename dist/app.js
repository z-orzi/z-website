const translations = {
  zh: {
    skip: "跳到作品", navHome: "首页", navProjects: "作品", navAbout: "关于", contact: "联系我",
    heroTitle: "Small ideas,<br>Brighter days.", heroCn: "我把乱码，翻译成作品。",
    heroBody: "用翻译的敏感和一点点代码，把生活里卡住我的地方，做成可以玩的游戏和真正好用的小工具。",
    explore: "去看作品", figureCaption: "今天的工作台：一盏灯、一些草稿，猫负责监督。",
    currentOne: "在做一个点击解谜小游戏", currentTwo: "整理可复用的 Game Jam 模块", currentThree: "继续学着把想法做小、做完",
    projectsNote: "做出来，比想明白更接近答案", projectsTitle: "作品与实验 <span aria-hidden=\"true\">✦</span>",
    projectsIntro: "它们处在不同阶段，但都从一个真实的小问题开始。", decodeHint: "把鼠标放上去，帮我翻译一下",
    filterAll: "全部", filterBuilding: "制作中", filterReleased: "已发布", filterArchived: "已归档",
    released: "已发布", building: "制作中", archived: "已归档", empty: "这个阶段暂时没有作品。",
    stripHand: "Still building, still curious.", aboutTitle: "我来自语言与人文学科，<br>现在也用代码做东西。",
    aboutBody: "我喜欢那些规模不大、但能让日常顺一点或有趣一点的想法。翻译教会我留意语境，做产品则让我把这种留意变成可以触碰的东西。",
    footerLine: "把小想法做成亮一点的日子。", footerPrompt: "想聊聊小项目，或只是交换一个有趣的想法：", madeWith: "在好奇心还没用完之前持续更新。"
  },
  en: {
    skip: "Skip to projects", navHome: "Home", navProjects: "Projects", navAbout: "About", contact: "Get in touch",
    heroTitle: "Small ideas,<br>Brighter days.", heroCn: "I translate glitches into things.",
    heroBody: "With a translator's eye and a little code, I turn everyday friction into small games, useful tools, and digital experiments.",
    explore: "Explore my work", figureCaption: "Today's desk: one lamp, a few drafts, and a cat on quality control.",
    currentOne: "Building a click-to-solve game", currentTwo: "Preparing reusable Game Jam modules", currentThree: "Learning to make ideas smaller — and finish them",
    projectsNote: "Making it gets me closer than overthinking it", projectsTitle: "Projects & experiments <span aria-hidden=\"true\">✦</span>",
    projectsIntro: "Different stages, same curiosity — each one began with a small, real problem.", decodeHint: "Hover over a card to help me translate it",
    filterAll: "All", filterBuilding: "Building", filterReleased: "Released", filterArchived: "Archived",
    released: "Released", building: "Building", archived: "Archived", empty: "No projects at this stage yet.",
    stripHand: "Still building, still curious.", aboutTitle: "I come from language and humanities.<br>Now I build things with code, too.",
    aboutBody: "I like ideas that are small enough to hold, but useful enough to make an ordinary day smoother or more playful. Translation taught me to notice context; making products lets me turn that attention into something tangible.",
    footerLine: "Turning small ideas into slightly brighter days.", footerPrompt: "For a small project, or just to trade an interesting idea:", madeWith: "Updated while curiosity lasts."
  }
};

const cards = [...document.querySelectorAll(".project-card")];
const decodePool = "锟斤拷烫烫烫▯▮�æø※！？。，/\\{}[]<>_";
const timers = new WeakMap();
let language = localStorage.getItem("z-language") || (navigator.language.startsWith("zh") ? "zh" : "en");

function makeGlitch(length, seed) {
  let value = "";
  for (let i = 0; i < length; i += 1) value += decodePool[(i * 7 + seed * 11) % decodePool.length];
  return value;
}

cards.forEach((card, index) => {
  const title = card.querySelector(".decode-title");
  const description = card.querySelector(".decode-description");
  card.dataset.glitchTitle = makeGlitch(Math.max(10, card.dataset.zhTitle.length), index + 1);
  card.dataset.glitchDescription = makeGlitch(Math.max(25, Math.min(46, card.dataset.zhDescription.length)), index + 7);
  title.textContent = card.dataset.glitchTitle;
  description.textContent = card.dataset.glitchDescription;

  const decode = () => runDecode(card, true);
  const restore = () => runDecode(card, false);
  card.addEventListener("pointerenter", decode);
  card.addEventListener("pointerleave", restore);
  card.addEventListener("focus", decode);
  card.addEventListener("blur", restore);
  card.addEventListener("click", () => {
    if (matchMedia("(hover: none)").matches) runDecode(card, !card.classList.contains("is-decoded"));
  });
});

function runDecode(card, reveal) {
  clearInterval(timers.get(card));
  const title = card.querySelector(".decode-title");
  const description = card.querySelector(".decode-description");
  const finalTitle = reveal ? card.dataset[`${language}Title`] : card.dataset.glitchTitle;
  const finalDescription = reveal ? card.dataset[`${language}Description`] : card.dataset.glitchDescription;
  const currentTitle = title.textContent;
  const currentDescription = description.textContent;
  const maxLength = Math.max(finalTitle.length, finalDescription.length);
  let frame = 0;
  card.classList.toggle("is-decoded", reveal);
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    title.textContent = finalTitle;
    description.textContent = finalDescription;
    return;
  }
  const timer = setInterval(() => {
    const settled = Math.floor(frame / 1.8);
    title.textContent = scrambleLine(currentTitle, finalTitle, settled, frame);
    description.textContent = scrambleLine(currentDescription, finalDescription, settled, frame + 5);
    frame += 1;
    if (settled > maxLength + 3) {
      clearInterval(timer);
      title.textContent = finalTitle;
      description.textContent = finalDescription;
    }
  }, 24);
  timers.set(card, timer);
}

function scrambleLine(from, target, settled, frame) {
  const length = Math.max(from.length, target.length);
  let result = "";
  for (let i = 0; i < length; i += 1) {
    if (i < settled) result += target[i] || "";
    else if (i < settled + 3) result += decodePool[(i * 5 + frame * 3) % decodePool.length];
    else result += from[i] || decodePool[(i + frame) % decodePool.length];
  }
  return result.slice(0, Math.max(target.length, settled + 3));
}

function setLanguage(next) {
  language = next;
  localStorage.setItem("z-language", language);
  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.innerHTML = translations[language][element.dataset.i18n];
  });
  document.querySelectorAll(".language-toggle span").forEach((span) => span.classList.remove("lang-active"));
  document.querySelector(`.language-toggle span:${language === "zh" ? "first-child" : "last-child"}`).classList.add("lang-active");
  cards.filter((card) => card.classList.contains("is-decoded")).forEach((card) => runDecode(card, true));
}

document.querySelector(".language-toggle").addEventListener("click", () => setLanguage(language === "zh" ? "en" : "zh"));

document.querySelectorAll(".filter").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach((item) => item.classList.toggle("is-active", item === button));
    const filter = button.dataset.filter;
    let visible = 0;
    cards.forEach((card) => {
      const show = filter === "all" || card.dataset.status === filter;
      card.hidden = !show;
      if (show) visible += 1;
    });
    document.querySelector(".empty-state").hidden = visible !== 0;
  });
});

setLanguage(language);
