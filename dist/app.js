const translations = {
  zh: {
    skip: "跳到作品", navHome: "首页", navProjects: "作品", navAbout: "关于", contact: "联系我",
    focusBanner: "关注 AI 和游戏。",
    heroTitle: "Ideas to realities.",
    heroBody: "我来自人文社科,但也不畏惧技术。AI是帮助我实现想法的工具。",
    explore: "去看作品",
    currentOne: "在做一个点击解谜小游戏", currentTwo: "在简化RENPY的使用方式，尽可能逼近无代码，把它做成可视化编辑器", currentThree: "准备几场比赛！",
    decodeHint: "把鼠标放上去，查看具体内容",
    filterAll: "全部", filterBuilding: "制作中", filterReleased: "已发布", filterArchived: "已归档",
    released: "已发布", building: "制作中", archived: "已归档", empty: "这个阶段暂时没有作品。",
    stripHand: "Still building, still curious.", aboutTitle: "我来自语言与人文学科，<br>现在也用AI做东西。",
    aboutBody: "我喜欢那些基于日常痛点出发或有趣的想法。翻译教会我保持开放包容,AI帮助我跨过技术门槛。",
    footerPrompt: "想聊聊小项目，或只是交换一个有趣的想法：", bookWebsite: "官网"
  },
  en: {
    skip: "Skip to projects", navHome: "Home", navProjects: "Projects", navAbout: "About", contact: "Get in touch",
    focusBanner: "Exploring AI and games.",
    heroTitle: "Ideas to realities.",
    heroBody: "Trained in the humanities, unafraid of tech. I use AI as a tool to make my ideas real.",
    explore: "Explore my work",
    currentOne: "Building a click-to-solve game", currentTwo: "Simplifying RENPY and bringing it as close to no-code as possible by turning it into a visual editor", currentThree: "Getting ready for a few competitions!",
    decodeHint: "Hover over a card to help me translate it",
    filterAll: "All", filterBuilding: "Building", filterReleased: "Released", filterArchived: "Archived",
    released: "Released", building: "Building", archived: "Archived", empty: "No projects at this stage yet.",
    stripHand: "Still building, still curious.", aboutTitle: "I come from language and humanities.<br>Now I build things with AI.",
    aboutBody: "I like ideas that grow from everyday pain points or simple curiosity. Translation taught me to stay open and inclusive, and AI helps me cross technical barriers.",
    footerPrompt: "For a small project, or just to trade an interesting idea:", bookWebsite: "Website"
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
    const copy = translations[language][element.dataset.i18n];
    if (typeof copy === "string") element.innerHTML = copy;
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
