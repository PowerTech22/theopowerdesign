/* Portfolio — the single list of live sites, shown on the homepage and the
   Website & App Development case study. Add a new site as one line here:
   ["PLATFORM", "Name", "One-line description.", "https://url/", "display-url"] */
window.SITES = [
    ["SQUARESPACE", "A Bathhouse", "Bathhouse and spa site — treatments, booking and visit details.", "https://abathhouse.com/", "abathhouse.com"],
    ["SQUARESPACE", "Hôtel Weekend", "Travel magazine and concept store — boutique hotel guides, city guides and shop.", "https://hotel-weekend.com/", "hotel-weekend.com"],
    ["SQUARESPACE", "Frankly Good Coffee", "Coffee roaster store — blends, subscriptions, gift cards and wholesale enquiries.", "https://franklygoodcoffee.com/", "franklygoodcoffee.com"],
    ["SQUARESPACE", "Breathpod", "Breathwork app and corporate wellbeing — free trial, courses, events and journal.", "https://breathpod.com/", "breathpod.com"],
    ["SQUARESPACE", "Little Ripper", "LA restaurant and wine bar — reservations, online ordering, menus and events.", "https://littleripper.la/", "littleripper.la"],
    ["SQUARESPACE", "Myrtle Village Green", "Brooklyn community garden — visiting hours, events, composting and membership.", "https://myrtlegreen.org/", "myrtlegreen.org"],
    ["SQUARESPACE", "Hello-World", "Design studio site — portfolio, studio info, shop and newsletter.", "https://hello-world.studio/", "hello-world.studio"],
    ["SQUARESPACE", "Yarza Twins", "London & Paris design studio — services, case studies, shop and bilingual pages.", "https://yarzatwins.com/", "yarzatwins.com"],
    ["SQUARESPACE", "Andamiro", "Brooklyn Korean restaurant — menu, delivery ordering, press and FAQ.", "https://andamirobk.com/", "andamirobk.com"],
    ["SQUARESPACE", "Sam Frésquez", "Artist portfolio — projects, CV and info pages.", "https://samfresquez.com/", "samfresquez.com"],
    ["BASE44", "SomniaAI", "AI dream journal — log dreams, AI symbol and emotion analysis, dream calendar and archive.", "https://somnia-ai-f545e9d5.base44.app/", "somnia-ai.base44.app"],
    ["BASE44", "NeuroPath", "Habit app for logging wins, interrupting negative patterns and tracking progress.", "https://neuro-path-10759e56.base44.app/", "neuro-path.base44.app"],
    ["BASE44", "Spark! Career Hub", "AI career co-pilot — resume builder, cover letters, interview simulator and job matching.", "https://pathfinder-dca8ad5b.base44.app/", "pathfinder.base44.app"],
    ["BASE44", "NutriSync", "AI meal tracker — food logging, nutrition insights, recipes, meal plans and shopping lists.", "https://nutri-beast-126588eb.base44.app/", "nutri-beast.base44.app"],
    ["BASE44", "Bento", "Personal knowledge and task organizer — bento-grid dashboard, notes, projects and AI auto-linking.", "https://bentoinfo.base44.app/", "bentoinfo.base44.app"],
    ["", "Langs Akademi", "Language academy site with programme pages, tutor proof and course enquiries.", "https://www.langsakademi.com/", "langsakademi.com"],
    ["WIX", "LivinTheLifeCo", "Wedding film studio — featured films, the process, and an availability enquiry flow.", "https://www.livinthelifeco.com/", "livinthelifeco.com"],
    ["SHOPIFY", "Live Your Faith", "Shopify storefront with product pages, bundles and a campaign landing page.", "https://liveyourfaith.store/", "liveyourfaith.store"],
    ["WIX", "Elite Security Solutions", "Private security company site — service offering, case studies and quote requests.", "https://martinsezekiel123.wixsite.com/my-site-41", "martinsezekiel123.wixsite.com"],
    ["WIX", "Truly PYour Nail Lounge", "Nail salon site with a full service menu, pricing cards and booking enquiries.", "https://martinsezekiel123.wixsite.com/my-site-30", "martinsezekiel123.wixsite.com"],
    ["WIX", "AI Booking Agency", "AI receptionist landing page — offer, demo booking form and client results.", "https://bryson52.wixsite.com/my-site-43", "bryson52.wixsite.com"]
  ];

/* Renders filters + grid + "show all" button into a .portfolio container. */
window.renderPortfolio = (root, limit = 6) => {
  const SITES = window.SITES;
  root.innerHTML = `<div class="filters" role="tablist" aria-label="Filter by platform"></div>
    <div class="sites"></div>
    <div class="more-wrap"><button class="btn btn-ghost" type="button"></button></div>`;
  const bar = root.querySelector(".filters"), grid = root.querySelector(".sites"), more = root.querySelector(".more-wrap button");
  const shot = (u) => `https://s0.wp.com/mshots/v1/${encodeURIComponent(u)}?w=1200&h=750`;
  const label = (c) => c === "ALL" ? "All" : c[0] + c.slice(1).toLowerCase();
  const cats = ["ALL", ...new Set(SITES.map(x => x[0]).filter(Boolean))];
  let filter = "ALL", expanded = false;
  bar.innerHTML = cats.map(c => `<button type="button" role="tab" data-f="${c}" aria-selected="${c === "ALL"}">${label(c)} <span>${c === "ALL" ? SITES.length : SITES.filter(x => x[0] === c).length}</span></button>`).join("");
  const draw = () => {
    const list = SITES.filter(x => filter === "ALL" || x[0] === filter);
    const shown = expanded ? list : list.slice(0, limit);
    grid.innerHTML = shown.map(([badge, name, desc, href, host]) => `
      <a class="card site-card" href="${href}" target="_blank" rel="noopener">
        <div class="shot"><span class="initial">${name[0]}</span><img src="${shot(href)}" alt="Screenshot of ${name}" loading="lazy" onerror="this.remove()"></div>
        <div class="info">
          <div class="top"><span class="num">${badge === "BASE44" ? "Live app" : "Live site"}</span>${badge ? `<span class="badge">${badge}</span>` : ""}</div>
          <h3>${name}</h3><p>${desc}</p><span class="url">${host} ↗</span>
        </div></a>`).join("");
    more.parentElement.hidden = list.length <= limit;
    more.textContent = expanded ? "Show fewer" : `Show all ${list.length} projects`;
  };
  bar.addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    filter = b.dataset.f; expanded = false;
    bar.querySelectorAll("button").forEach(x => x.setAttribute("aria-selected", x === b)); draw();
  });
  more.addEventListener("click", () => { expanded = !expanded; draw(); if (!expanded) root.scrollIntoView({ behavior: "smooth", block: "start" }); });
  draw();
};
