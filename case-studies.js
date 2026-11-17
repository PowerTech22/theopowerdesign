/* Case study content + renderer. Each /work/*.html page sets data-study. */
(() => {
  const M = "https://media.base44.com/images/public/6ae3c5b377c8643b271ca06e/";
  const U = (id) => `https://images.unsplash.com/photo-${id}?w=1800&q=80&auto=format&fit=crop`;

  const STUDIES = {
    "website-development": {
      label: "WEBSITE & APP DEVELOPMENT — CASE STUDY 01",
      title: "A booking-first website for Lumen Dental",
      intro: "Lumen's old site looked fine and booked almost nothing. I rebuilt it around one job — getting a new patient into the calendar in under a minute.",
      image: U("1524758631624-e2822e304c36"),
      facts: [["CLIENT", "Lumen Dental Studio"], ["PLATFORM", "Squarespace + custom booking flow"], ["TIMELINE", "5 weeks"], ["SCOPE", "Copy, design, build, SEO, handover"]],
      challenge: "Patients were arriving from Instagram and local search, landing on a homepage that talked about the practice instead of the appointment. The contact form had nine fields, no confirmation, and on mobile the phone number was buried three scrolls down. Bookings were flat while enquiries kept climbing.",
      approach: [
        ["One job per page", "Every page now answers a single question — what is this treatment, who is it for, what does it cost, how do I book it. No more paragraphs of history above the fold."],
        ["Booking in the first screen", "The calendar opens directly from the hero and from a sticky bar on mobile, with the form cut to four fields and an instant confirmation message."],
        ["Proof in the right places", "Reviews sit next to each treatment rather than hidden on a separate page, and real studio photography replaced the stock library shots."]
      ],
      sites: {
        head: "Sites I've designed and built.",
        text: "A selection of live client sites across Wix and Shopify — service businesses, a language academy, a wedding film studio and an e-commerce store. Every link opens the real thing.",
        items: [
          ["", "Langs Akademi", "Language academy site with programme pages, tutor proof and course enquiries.", "https://www.langsakademi.com/", "langsakademi.com"],
          ["WIX", "LivinTheLifeCo", "Wedding film studio — featured films, the process, and an availability enquiry flow.", "https://www.livinthelifeco.com/", "livinthelifeco.com"],
          ["SHOPIFY", "Live Your Faith", "Shopify storefront with product pages, bundles and a campaign landing page.", "https://liveyourfaith.store/", "liveyourfaith.store"],
          ["WIX", "Elite Security Solutions", "Private security company site — service offering, case studies and quote requests.", "https://martinsezekiel123.wixsite.com/my-site-41", "martinsezekiel123.wixsite.com"],
          ["WIX", "Truly PYour Nail Lounge", "Nail salon site with a full service menu, pricing cards and booking enquiries.", "https://martinsezekiel123.wixsite.com/my-site-30", "martinsezekiel123.wixsite.com"],
          ["WIX", "AI Booking Agency", "AI receptionist landing page — offer, demo booking form and client results.", "https://bryson52.wixsite.com/my-site-43", "bryson52.wixsite.com"],
          ["WIX", "WixMaster Studio", "Agency site with a project gallery, video testimonials and a services breakdown.", "https://martinsezekiel123.wixsite.com/my-site-16", "martinsezekiel123.wixsite.com"]
        ]
      },
      tags: ["SQUARESPACE", "CUSTOM CSS", "GOOGLE ANALYTICS", "SEARCH CONSOLE"],
      built: ["Full site design system in Figma before a line of code", "Squarespace build with custom CSS and scheduling integration", "Service and pricing pages structured for local search", "Google Business Profile clean-up and review flow", "Analytics events on every booking step", "A one-hour walkthrough and written handover so the team can edit it"],
      stats: [["2.1×", "More booking requests in the first quarter"], ["0.9s", "Median page load on mobile"], ["40s", "Average time to complete a booking"]],
      quote: "We stopped explaining the practice and started filling the diary. The whole thing feels calm now — and we can update it ourselves.",
      cite: "PRACTICE MANAGER — LUMEN DENTAL STUDIO",
      more: [["Aurora Skincare", "Shopify storefront and product pages for a 60-SKU launch"], ["Northwind Studio", "Base44 client portal with logins, files and invoices"], ["Fable Coffee", "Wix site and online ordering for two locations"]],
      next: ["AI Automation", "ai-automation"]
    },

    "ai-automation": {
      label: "AI AUTOMATION — CASE STUDY 02",
      title: "Lead intake on autopilot for Northwind Studio",
      intro: "Enquiries arrived by form, DM and email, then sat in an inbox until someone had time. I built one pipeline that reads every lead, sorts it, and drafts the first reply.",
      image: U("1551288049-bebda4e38f71"),
      facts: [["CLIENT", "Northwind Studio"], ["STACK", "Base44, OpenAI, Make, HubSpot"], ["TIMELINE", "3 weeks"], ["SCOPE", "Process mapping, build, testing, training"]],
      challenge: "Three people were spending the first two hours of every day copy-pasting enquiries into a spreadsheet, deciding who should answer, and rewriting the same reply. Good leads went cold over the weekend, and nothing was measured.",
      approach: [
        ["Map the real process first", "A week of shadowing before any automation. The messy parts were the handoffs, not the tools — so the pipeline was designed around who needs to know what, and when."],
        ["One inbox, one truth", "Form, Instagram and email all feed a single intake pipeline. Every lead is de-duplicated, enriched, and written to the CRM with a source tag."],
        ["AI drafts, people decide", "The model classifies the enquiry, checks it against the service list and budget floor, then drafts a reply for a human to approve. Nothing is sent unsupervised."]
      ],
      gallery: {
        eyebrow: "BUILD SNAPSHOTS", head: "The pipeline, screen by screen.",
        text: "Snapshots from the build: the unified intake, the enrichment and scoring steps, the CRM records it creates, and the drafting queue where a person still approves every reply before it goes out.",
        images: ["6a0e13a1f_IMG-20261110-WA0000.jpg", "15cee7e57_IMG-20261110-WA0004.jpg", "b567920fb_IMG-20261110-WA0007.jpg", "273e944ef_IMG-20261110-WA0008.jpg", "c6b5dd47c_IMG-20261110-WA0009.jpg", "cac87f6f0_IMG-20261110-WA0012.jpg", "2df0e67e0_IMG-20261110-WA0018.jpg", "f0c87fa2a_IMG-20261110-WA0021.jpg", "20b68f0d0_IMG-20261110-WA0022.jpg", "8049c68a2_IMG-20261110-WA0023.jpg", "79c777c88_IMG-20261110-WA0024.jpg", "71c65b6af_IMG-20261110-WA0025.jpg", "5488c76f9_IMG-20261110-WA0026.jpg", "1b68d8fe9_IMG-20261110-WA0027.jpg", "f1f3b2dc5_IMG-20261107-WA0029.jpg", "6d092116b_IMG-20261107-WA0030.jpg"].map((f) => M + f)
      },
      tags: ["BASE44", "OPENAI", "MAKE", "HUBSPOT", "SLACK"],
      built: ["Unified intake across web form, Instagram DMs and email", "Enrichment and scoring against an ideal-client profile", "CRM records with stage, owner and source, created automatically", "Slack alerts for high-value enquiries with a suggested angle", "Drafted replies in the team's voice, one click to send", "Weekly digest with response times and conversion by source"],
      stats: [["14h", "Given back to the team each week"], ["4 min", "Average time to first reply"], ["100%", "Of enquiries logged, with a source"]],
      quote: "The automation does the sorting and the first draft. My team just has the conversation now.",
      cite: "FOUNDER — NORTHWIND STUDIO",
      more: [["Retainer reporting", "Monthly client reports assembled and sent without a spreadsheet"], ["Content repurposing", "One long-form post turned into six channel-ready drafts"], ["Invoice chasing", "Polite, escalating reminders tied to real payment status"]],
      next: ["Website & App Development", "website-development"]
    }
  };

  const s = STUDIES[document.body.dataset.study];
  const n2 = (i) => String(i + 1).padStart(2, "0");
  document.title = `${s.title} | TheoPower`;

  document.getElementById("study").innerHTML = `
    <section class="page-hero" style="padding-bottom:40px">
      <div class="wrap">
        <a href="index.html#work" class="eyebrow" style="color:var(--muted)">← All services</a>
        <p class="eyebrow" style="display:block;margin-top:26px">${s.label}</p>
        <h1>${s.title}</h1>
        <p class="lead">${s.intro}</p>
        <div class="cs-hero-img reveal"><img src="${s.image}" alt="${s.title}"></div>
        <div class="facts">${s.facts.map(([k, v]) => `<div><span>${k}</span><b>${v}</b></div>`).join("")}</div>
      </div>
    </section>

    <section style="padding-top:40px"><div class="wrap two-col reveal">
      <div><span class="eyebrow">The challenge</span><h2>What wasn't working.</h2></div>
      <p>${s.challenge}</p>
    </div></section>

    <section class="divider"><div class="wrap">
      <div class="sec-head reveal"><div><span class="eyebrow">The approach</span><h2>How I fixed it.</h2></div></div>
      <div class="principles">${s.approach.map(([h, p], i) => `<div class="card reveal"><span class="num">${n2(i)}</span><h3>${h}</h3><p>${p}</p></div>`).join("")}</div>
    </div></section>

    ${s.sites ? `<section class="divider"><div class="wrap">
      <div class="sec-head reveal"><div><span class="eyebrow">Live sites</span><h2>${s.sites.head}</h2></div><p>${s.sites.text}</p></div>
      <div class="sites">${s.sites.items.map(([badge, name, desc, href, host], i) => `
        <a class="card site-card reveal" href="${href}" target="_blank" rel="noopener">
          <div class="top"><span class="num">${n2(i)}</span>${badge ? `<span class="badge">${badge}</span>` : ""}</div>
          <h3>${name}</h3><p>${desc}</p><span class="url">${host} ↗</span></a>`).join("")}</div>
    </div></section>` : ""}

    ${s.gallery ? `<section class="divider"><div class="wrap">
      <div class="sec-head reveal"><div><span class="eyebrow">${s.gallery.eyebrow}</span><h2>${s.gallery.head}</h2></div><p>${s.gallery.text}</p></div>
      <div class="gallery">${s.gallery.images.map((src, i) => `<button type="button" data-full="${src}" aria-label="${s.gallery.head} — image ${i + 1}"><img src="${src}" alt="${s.gallery.head} — image ${i + 1}" loading="lazy"></button>`).join("")}</div>
    </div></section>` : ""}

    <section class="divider"><div class="wrap">
      <div class="sec-head reveal"><div><span class="eyebrow">What I built</span><h2>The work, item by item.</h2></div></div>
      <div class="tags">${s.tags.map((t) => `<span>${t}</span>`).join("")}</div>
      <ul class="checklist reveal">${s.built.map((b) => `<li>${b}</li>`).join("")}</ul>
    </div></section>

    <section class="divider"><div class="wrap">
      <span class="eyebrow">After launch</span>
      <div class="stats" style="margin-top:34px">${s.stats.map(([v, l]) => `<div class="stat reveal"><b>${v}</b><p>${l}</p></div>`).join("")}</div>
      <blockquote class="reveal">“${s.quote}”</blockquote><cite>${s.cite}</cite>
    </div></section>

    <section class="divider"><div class="wrap">
      <span class="eyebrow">More from this service</span>
      <div class="more-grid" style="margin-top:28px">${s.more.map(([h, p]) => `<div class="card reveal"><h3 style="margin-top:0">${h}</h3><p>${p}</p></div>`).join("")}</div>
    </div></section>

    <div class="wrap"><a class="next-cs" href="${s.next[1]}.html"><div><span class="eyebrow">Next case study</span><h2 style="margin-top:10px">${s.next[0]}</h2></div><span style="font-size:32px">→</span></a></div>

    <section class="cta"><div class="wrap reveal">
      <span class="eyebrow">Something like this?</span>
      <h2>Tell me what you're <em>building</em>.</h2>
      <a class="btn btn-primary" href="contact.html" style="margin-top:20px">Start a project ↗</a>
    </div></section>

    <div class="lightbox" id="lightbox"><button type="button" aria-label="Close">✕</button><img alt=""></div>`;

  const lb = document.getElementById("lightbox");
  document.querySelectorAll("[data-full]").forEach((b) => b.addEventListener("click", () => { lb.querySelector("img").src = b.dataset.full; lb.classList.add("show"); }));
  lb.addEventListener("click", (e) => { if (e.target.tagName !== "IMG") lb.classList.remove("show"); });
  addEventListener("keydown", (e) => e.key === "Escape" && lb.classList.remove("show"));
})();
