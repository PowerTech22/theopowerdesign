/* Pay page: Paystack inline checkout, Cleva USD details, naira bank transfer.
   Tip: send clients a pre-filled link, e.g.
   pay.html?ref=INV-014&amount=250000&currency=NGN&method=paystack          */
(() => {
  const S = window.SITE, P = S.payments;
  const $ = (id) => document.getElementById(id);
  const form = $("pay-form"), notice = $("pay-notice"), cur = $("p-currency"), amt = $("p-amount");
  const symbol = { NGN: "₦", USD: "$", GBP: "£" };

  const METHODS = [
    { id: "paystack", on: P.paystack.enabled, title: "Paystack", sub: "Card, bank, USSD — instant confirmation", tag: "NGN", currencies: P.paystack.currencies?.length ? P.paystack.currencies : ["NGN"] },
    { id: "cleva",    on: P.cleva.enabled,    title: "US dollar transfer", sub: "ACH or wire from a US bank account", tag: "USD", currencies: ["USD"] },
    { id: "gbp",      on: P.gbp?.enabled,     title: "UK pound transfer", sub: "Faster Payments from a UK bank account", tag: "GBP", currencies: ["GBP"] },
    { id: "naira",    on: P.naira.enabled,    title: "Naira bank transfer", sub: "Direct transfer to my Nigerian account", tag: "NGN", currencies: ["NGN"] }
  ].filter((m) => m.on);

  $("methods").innerHTML = METHODS.map((m, i) => `
    <label class="method"><input type="radio" name="method" value="${m.id}" ${i === 0 ? "checked" : ""}>
      <span><strong>${m.title}</strong><small>${m.sub}</small></span><span class="tag">${m.tag}</span></label>`).join("");

  const show = (msg, ok) => { notice.innerHTML = msg; notice.className = "notice show " + (ok ? "ok" : "err"); };
  const hide = () => (notice.className = "notice");
  const method = () => form.querySelector('input[name="method"]:checked')?.value;
  const fmt = (n, c) => `${symbol[c] || ""}${Number(n || 0).toLocaleString("en", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${c}`;

  // Account details
  const row = (label, val) => {
    const v = isSet(val) ? esc(val) : `<em style="color:var(--err)">Not set</em>`;
    return `<div class="acct-row"><span>${label}</span><b>${v}${isSet(val) ? `<button type="button" class="copy" data-copy="${esc(val)}">Copy</button>` : ""}</b></div>`;
  };
  $("naira-acct").innerHTML = row("Bank", P.naira.bankName) + row("Account number", P.naira.accountNumber) + row("Account name", P.naira.accountName);
  $("cleva-acct").innerHTML = row("Account name", P.cleva.accountName) + row("Account number", P.cleva.accountNumber) +
    row("Routing number (ACH/wire)", P.cleva.routingNumber) + row("Bank", P.cleva.bankName) +
    row("Bank address", P.cleva.bankAddress) + row("Account type", P.cleva.accountType);
  if (P.gbp) $("gbp-acct").innerHTML = row("Account name", P.gbp.accountName) + row("Account number", P.gbp.accountNumber) +
    row("Sort code", P.gbp.sortCode) + row("Bank", P.gbp.bankName) + row("Bank address", P.gbp.bankAddress) + row("Account type", P.gbp.accountType);
  if (isSet(P.cleva.paymentLink)) { $("cleva-link").href = P.cleva.paymentLink; $("cleva-link").hidden = false; }

  function sync() {
    const m = METHODS.find((x) => x.id === method()); if (!m) return;
    const prev = cur.value;
    cur.innerHTML = m.currencies.map((c) => `<option value="${c}">${c}</option>`).join("");
    if (m.currencies.includes(prev)) cur.value = prev;
    document.querySelectorAll(".panel").forEach((p) => p.classList.toggle("show", p.id === "panel-" + m.id));
    summary(); hide();
  }
  function summary() {
    const ref = $("p-ref").value.trim();
    const txt = amt.value > 0 ? `Amount: <b>${fmt(amt.value, cur.value)}</b>${ref ? ` · Reference: <b>${esc(ref)}</b>` : ""}` : "Enter the amount above.";
    document.querySelectorAll("[data-summary]").forEach((e) => (e.innerHTML = txt));
  }
  form.addEventListener("change", (e) => (e.target.name === "method" ? sync() : summary()));
  form.addEventListener("input", summary);

  function valid() {
    const d = Object.fromEntries(new FormData(form));
    if (!d.name.trim() || !/^\S+@\S+\.\S+$/.test(d.email) || !d.reference.trim()) { show("Please add your name, email and the invoice reference.", false); return null; }
    if (!(Number(d.amount) > 0)) { show("Please enter the amount you're paying.", false); amt.focus(); return null; }
    return d;
  }

  function notify(subject, d, extra = "", thanks = {}) {
    try {
      postForm({ name: d.name, email: d.email, reference: d.reference,
        amount: fmt(d.amount, d.currency), method: subject, details: extra }, `Payment notice — ${subject} — ${d.reference}`,
        `Hi ${d.name},\n\nThanks — I've received your payment notice for ${d.reference} (${fmt(d.amount, d.currency)} via ${subject.replace(/ — client says payment sent$/, "")}).\n\nI'll confirm as soon as it's matched, usually within one working day.${extra ? "\n\n" + extra : ""}\n\n— Theo\nTheoPower`, { name: d.name, ...thanks });
    } catch {}
  }
  const waBtn = (text) => { const l = waLink(text); return l ? ` <a class="btn btn-ghost" style="margin-top:12px" href="${l}" target="_blank" rel="noopener">Send confirmation on WhatsApp</a>` : ""; };

  // Paystack
  $("paystack-btn").addEventListener("click", () => {
    const d = valid(); if (!d) return;
    if (!isSet(P.paystack.publicKey)) return show("Card payments aren't switched on yet. Please use a bank transfer option.", false);
    if (!window.PaystackPop) return show("Paystack checkout is still loading — check your connection and try again.", false);
    const handler = PaystackPop.setup({
      key: P.paystack.publicKey,
      email: d.email,
      amount: Math.round(Number(d.amount) * 100),   // kobo / cents
      currency: d.currency,
      ref: "TP-" + Date.now() + "-" + Math.floor(Math.random() * 1e4),
      metadata: { custom_fields: [
        { display_name: "Client name", variable_name: "client_name", value: d.name },
        { display_name: "Invoice reference", variable_name: "invoice_ref", value: d.reference }
      ] },
      callback: function (res) {
        show(`<b>Payment received — thank you, ${esc(d.name)}.</b><br>Paystack reference: <b>${esc(res.reference)}</b>. A receipt is on its way to ${esc(d.email)}.` +
          waBtn(`Hi Theo, I've paid ${fmt(d.amount, d.currency)} by Paystack for ${d.reference}. Paystack ref: ${res.reference}`), true);
        setTimeout(() => notify("Paystack payment received", d, `Paystack ref: ${res.reference}`,
          { t: "paid", ref: d.reference, wa: `Hi Theo, I've paid ${fmt(d.amount, d.currency)} by Paystack for ${d.reference}. Paystack ref: ${res.reference}` }), 1800);
      },
      onClose: function () { show("Checkout closed — no payment was taken. You can try again any time.", false); }
    });
    handler.openIframe();
  });

  // Transfers: "I've sent it"
  document.querySelectorAll("[data-sent]").forEach((b) => b.addEventListener("click", () => {
    const d = valid(); if (!d) return;
    const via = b.dataset.sent;
    const text = `Hi Theo, I've sent ${fmt(d.amount, d.currency)} by ${via} for ${d.reference}. Name: ${d.name}, email: ${d.email}.`;
    show(`<b>Thanks, ${esc(d.name)}.</b> Sending your payment notice…`, true);
    notify(`${via} — client says payment sent`, d, "", { t: "pay", ref: d.reference, via, wa: text });
  }));

  // Prefill from link: ?ref=&amount=&currency=&method=&name=&email=
  const q = new URLSearchParams(location.search);
  if (q.get("method")) { const r = form.querySelector(`input[name="method"][value="${CSS.escape(q.get("method"))}"]`); if (r) r.checked = true; }
  sync();
  if (q.get("currency") && [...cur.options].some((o) => o.value === q.get("currency"))) cur.value = q.get("currency");
  if (q.get("ref")) $("p-ref").value = q.get("ref");
  if (q.get("amount")) amt.value = q.get("amount");
  if (q.get("name")) $("p-name").value = q.get("name");
  if (q.get("email")) $("p-email").value = q.get("email");
  summary();
})();
