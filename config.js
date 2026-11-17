/* =====================================================================
   TheoPower — SITE SETTINGS
   This is the ONLY file you need to edit. Replace every value that
   starts with "REPLACE_" with your real details, save, and redeploy.
   ===================================================================== */
window.SITE = {
  brand: "TheoPower",
  legalName: "TheoPower Design",
  email: "powertheo.design@gmail.com",           // shown on Pay + Contact pages
  bookingUrl: "https://calendar.app.google/L2g8262JicToMLoN8",

  // WhatsApp number in international format, digits only, no "+" or spaces.
  // Example: 2348012345678
  whatsapp: "2347030252724",

  // Contact + payment-notice forms email this address via FormSubmit (no key).

  payments: {
    // ---------- 1. PAYSTACK (cards, bank, USSD, transfer) ----------
    // Use your PUBLIC key only (starts with pk_live_ or pk_test_).
    // NEVER put your secret key (sk_...) in this file.
    paystack: {
      enabled: true,
      publicKey: "pk_live_2f31b770a938fe45616e2f96db95dd4cdb09cfd1",
      // Add "USD" only if Paystack has enabled USD on your account.
      currencies: ["NGN"]
    },

    // ---------- 2. CLEVA — US dollar account (ACH / wire) ----------
    cleva: {
      enabled: true,
      accountName: "Theophilus Adesola",
      accountNumber: "211755930198",
      routingNumber: "101019644",
      bankName: "Lead Bank",
      bankAddress: "9450 Southwest Gemini Drive, Beaverton, OR, 97008, USA",
      accountType: "Personal Checking",
      // Optional: a Cleva payment link, if you have one. Leave "" to hide.
      paymentLink: ""
    },

    // ---------- 3. UK pound account (Faster Payments / sort code) ----------
    gbp: {
      enabled: true,
      accountName: "Bridge Building S.A.",
      accountNumber: "75265633",
      sortCode: "608382",
      bankName: "Banking Circle S.A.",
      bankAddress: "2 Boulevard de la Foire, L-1528 Luxembourg",
      accountType: "Business"
    },

    // ---------- 4. DIRECT NAIRA BANK TRANSFER ----------
    naira: {
      enabled: true,
      bankName: "Zenith Bank",
      accountNumber: "2416399381",
      accountName: "Theophilus Adesola"
    }
  },

  // Images. These currently load from your Base44 media library.
  // To stop depending on Base44, save each image into assets/img/
  // and change the URL to e.g. "assets/img/hero.jpg".
  img: {
    logo:     "https://media.base44.com/images/public/6ae3c5b377c8643b271ca06e/40f177b76_Power.png",
    hero:     "https://media.base44.com/images/public/6ae3c5b377c8643b271ca06e/f35babed2_generated_25e3fc9a.jpg",
    service:  "https://media.base44.com/images/public/6ae3c5b377c8643b271ca06e/a399c9180_generated_74fb18f4.jpg",
    portrait: "https://media.base44.com/images/public/6ae3c5b377c8643b271ca06e/551d1a1bd_ProfileImage.png"
  }
};
