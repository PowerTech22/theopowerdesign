/* Shared header, footer, cursor, reveal and helpers for every page. */
(function () {
  const S = window.SITE;
  const root = document.body.dataset.root || "";   // "" on top-level pages, "../" in /work
  const page = document.body.dataset.page || "";

  window.isSet = (v) => typeof v === "string" && v.trim() !== "" && !v.startsWith("REPLACE_");
  window.waLink = (text) => isSet(S.whatsapp) ? `https://wa.me/${S.whatsapp}?text=${encodeURIComponent(text)}` : "";
  window.esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // Favicon (matches the TP logo mark)
  if (!document.querySelector('link[rel="icon"]')) {
    const ico = document.createElement("link"); ico.rel = "icon"; ico.type = "image/svg+xml";
    ico.href = "data:image/svg+xml," + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#60a5fa"/><stop offset="1" stop-color="#22d3ee"/></linearGradient></defs><rect width="64" height="64" rx="16" fill="#0b0d12"/><rect x="1.5" y="1.5" width="61" height="61" rx="14.5" fill="none" stroke="url(#g)" stroke-width="3"/><text x="32" y="43" font-family="Arial,Helvetica,sans-serif" font-size="28" font-weight="800" text-anchor="middle" fill="url(#g)" letter-spacing="-2">TP</text></svg>`);
    document.head.append(ico);
  }

  // Fill <img data-img="hero"> etc. from config
  document.querySelectorAll("[data-img]").forEach((i) => (i.src = S.img[i.dataset.img]));
  document.querySelectorAll("[data-booking]").forEach((a) => (a.href = S.bookingUrl));

  // Send a form to your Gmail via FormSubmit (free, no key). The very first
  // submission sends an activation email to your inbox — click it once.
  // `autoresponse` is emailed to the sender (their "email" field) as a confirmation.
  window.sendForm = async (data, subject = "New message from your website", autoresponse = "") => {
    const body = { _subject: subject, _template: "table", _captcha: "false", ...data };
    if (autoresponse) body._autoresponse = autoresponse;
    const ctrl = new AbortController(); const timer = setTimeout(() => ctrl.abort(), 120000);
    const res = await fetch(`https://formsubmit.co/ajax/${S.formsubmitId || S.email}`, {
      signal: ctrl.signal, method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body)
    });
    clearTimeout(timer);
    const j = await res.json().catch(() => ({}));
    if (!res.ok || String(j.success) === "false") throw new Error(j.message || "Form failed");
  };

  // Standard (non-AJAX) FormSubmit post: the visitor passes FormSubmit's quick
  // "I'm not a robot" check, then lands on thanks.html. This mode is required for
  // the confirmation email (_autoresponse) to reach the sender.
  window.postForm = (data, subject, autoresponse, thanks = {}) => {
    const f = document.createElement("form");
    f.method = "POST"; f.action = `https://formsubmit.co/${S.formsubmitId || S.email}`; f.style.display = "none";
    const next = new URL(root + "thanks.html", location.href);
    Object.entries(thanks).forEach(([k, v]) => v && next.searchParams.set(k, v));
    const fields = { ...data, _subject: subject, _template: "table", _next: next.href, _autoresponse: autoresponse || "" };
    Object.entries(fields).forEach(([k, v]) => {
      if (v === "" || v == null) return;
      const i = document.createElement(k === "_autoresponse" || k === "message" ? "textarea" : "input");
      i.name = k; i.value = String(v); f.append(i);
    });
    document.body.append(f); f.submit();
  };

  const link = (href, label, key) =>
    `<a href="${root}${href}"${page === key ? ' class="active" aria-current="page"' : ""}>${label}</a>`;

  // Header
  const header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML = `
    <div class="wrap nav">
      <a class="logo" href="${root}index.html" aria-label="TheoPower home"><span class="logo-mark" aria-hidden="true"><b>T</b><i>P</i></span><span class="logo-text">Theo<span>Power</span></span></a>
      <nav class="nav-links" aria-label="Main">
        ${link("index.html#work", "Work", "work")}
        ${link("about.html", "About", "about")}
        ${link("contact.html", "Contact", "contact")}
        ${link("pay.html", "Pay", "pay")}
      </nav>
      <a class="btn btn-primary" href="${root}contact.html">Start a project <span aria-hidden="true">→</span></a>
      <button class="menu-btn" aria-label="Open menu" aria-expanded="false"><span></span><span></span></button>
    </div>`;
  document.body.prepend(header);
  const menuBtn = header.querySelector(".menu-btn");
  menuBtn.addEventListener("click", () => {
    const open = header.classList.toggle("nav-open");
    menuBtn.setAttribute("aria-expanded", open);
    document.body.style.overflow = open ? "hidden" : "";
  });
  header.querySelectorAll(".nav-links a").forEach((a) => a.addEventListener("click", () => {
    header.classList.remove("nav-open"); document.body.style.overflow = "";
  }));
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 30);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

  // Footer
  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `
    <div class="wrap">
      <div class="foot-grid">
        <div>
          <a class="logo" href="${root}index.html" aria-label="TheoPower home"><span class="logo-mark" aria-hidden="true"><b>T</b><i>P</i></span><span class="logo-text">Theo<span>Power</span></span></a>
          <p class="blurb">Websites, apps and AI automation — designed and built by one person who stays until it works.</p>
          <div class="foot-ctas">
            <a class="btn btn-primary" href="${root}contact.html">Start a project</a>
            <a class="btn btn-ghost" href="${S.bookingUrl}" target="_blank" rel="noopener">Book a call</a>
          </div>
        </div>
        <div><h4>SERVICES</h4><ul>
          <li><a href="${root}website-development.html">Website &amp; App Development</a></li>
          <li><a href="${root}ai-automation.html">AI Automation</a></li>
        </ul></div>
        <div><h4>SITE</h4><ul>
          <li><a href="${root}index.html">Home</a></li>
          <li><a href="${root}index.html#work">Work</a></li>
          <li><a href="${root}about.html">About</a></li>
          <li><a href="${root}contact.html">Contact</a></li>
        </ul></div>
        <div><h4>PAYMENTS</h4><ul>
          <li><a href="${root}pay.html">Pay an invoice</a></li>
          <li><a href="${root}pay.html#method">Card · USD · GBP · Naira</a></li>
        </ul></div>
      </div>
      <div class="foot-bottom">
        <span>© ${new Date().getFullYear()} ${S.legalName}. All rights reserved.</span>
        <span>Designed &amp; hand-coded by Theo · Building worldwide</span>
      </div>
      <div class="foot-word" aria-hidden="true">TheoPower</div>
    </div>`;
  document.body.append(footer);

  // WhatsApp floating button
  const wa = waLink(`Hi Theo, I found you on your website.`);
  if (wa) {
    const a = document.createElement("a");
    a.className = "wa-float"; a.href = wa; a.target = "_blank"; a.rel = "noopener"; a.setAttribute("aria-label", "Chat on WhatsApp");
    a.innerHTML = `<svg viewBox="0 0 24 24"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4C2.7 15.6 2.2 13.8 2.2 12 2.2 6.6 6.6 2.2 12 2.2c2.6 0 5.1 1 6.9 2.9 1.8 1.8 2.9 4.3 2.9 6.9 0 5.4-4.4 9.8-9.8 9.8zm8.4-18.2C18.2 1.3 15.2 0 12 0 5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.6 6L0 24l6.2-1.6c1.8 1 3.8 1.5 5.8 1.5 6.6 0 12-5.4 12-12 0-3.2-1.2-6.2-3.6-8.4z"/></svg>`;
    document.body.append(a);
  }

  // Scroll progress bar
  const bar = document.createElement("div"); bar.className = "progress"; document.body.append(bar);
  const prog = () => { const h = document.documentElement.scrollHeight - innerHeight; bar.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`; };
  addEventListener("scroll", prog, { passive: true }); prog();

  // Spotlight that follows the mouse on cards
  document.addEventListener("pointermove", (e) => {
    const c = e.target.closest(".card,.bento"); if (!c) return;
    const r = c.getBoundingClientRect();
    c.style.setProperty("--mx", `${e.clientX - r.left}px`); c.style.setProperty("--my", `${e.clientY - r.top}px`);
  }, { passive: true });

  // Reveal on scroll
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  // Cursor ring: mouse only, follows pointer, resets after clicks
  if (matchMedia("(hover:hover) and (pointer:fine)").matches) {
    const c = document.createElement("div"); c.className = "cursor"; document.body.append(c);
    let x = 0, y = 0, cx = 0, cy = 0;
    addEventListener("mousemove", (e) => { x = e.clientX; y = e.clientY; c.style.opacity = 1;
      c.classList.toggle("big", !!e.target.closest("a,button,label,.method")); });
    addEventListener("mousedown", () => c.classList.remove("big"));
    document.addEventListener("mouseleave", () => (c.style.opacity = 0));
    (function loop() { cx += (x - cx) * 0.22; cy += (y - cy) * 0.22; c.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`; requestAnimationFrame(loop); })();
  }

  // Copy buttons (used on Pay page)
  document.addEventListener("click", async (e) => {
    const b = e.target.closest("[data-copy]"); if (!b) return;
    try { await navigator.clipboard.writeText(b.dataset.copy); b.textContent = "Copied"; }
    catch { b.textContent = "Copy failed"; }
    setTimeout(() => (b.textContent = "Copy"), 1600);
  });
})();
