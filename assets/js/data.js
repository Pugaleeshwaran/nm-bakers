/* ==========================================================================
   NM BAKERY — data.js
   Single source of truth for business details and the full menu.
   Edit values here and every page updates automatically.
   Loaded as a classic script so the site works from file:// as well.
   ========================================================================== */

/* --------------------------------------------------------------------------
   Business configuration
   TODO: replace the placeholder phone / email / address with the real ones.
   -------------------------------------------------------------------------- */
window.NM_CONFIG = {
  name: 'NM Bakery',
  tagline: 'Freshly Baked With Love',
  motto: 'Life is sweeter with home baked goodies',
  phoneDisplay: '+91 98765 43210',
  phoneRaw: '919876543210',          // digits only, with country code — used for tel: & WhatsApp
  email: 'hello@nmbakery.in',
  addressLine1: 'Home Bakery Studio',
  addressLine2: 'Vellore, Tamil Nadu 632014',
  instagram: 'https://instagram.com/',
  facebook: 'https://facebook.com/',
  hours: [
    { day: 'Monday — Friday', time: '9:00 AM — 8:00 PM' },
    { day: 'Saturday',        time: '9:00 AM — 9:00 PM' },
    { day: 'Sunday',          time: '10:00 AM — 6:00 PM' },
    { day: 'Public holidays', time: 'Pre-orders only', closed: true }
  ],
  noticeHours: 24                     // minimum notice for custom orders
};

/* --------------------------------------------------------------------------
   Categories
   `tone` drives the illustrated artwork colours for each product card.
   -------------------------------------------------------------------------- */
window.NM_CATEGORIES = [
  {
    id: 'cakes',
    name: 'Cakes',
    shortName: 'Cakes',
    tone: ['#8E2436', '#4A2314'],
    art: 'cake',
    unit: '½ kg',
    blurb: 'Tall, tender layers finished by hand — from everyday vanilla to our coffee tres leches.',
    from: 350
  },
  {
    id: 'bento',
    name: 'Bento Cakes',
    shortName: 'Bento',
    tone: ['#D68FA2', '#8E2A44'],
    art: 'bento',
    unit: 'per box',
    blurb: 'Little celebration cakes in a box, piped with your message while you wait.',
    from: 250
  },
  {
    id: 'brownies',
    name: 'Brownies',
    shortName: 'Brownies',
    tone: ['#5C3A25', '#2E1A11'],
    art: 'brownie',
    unit: 'per piece',
    blurb: 'Dense, fudgy centres with a paper-thin crackled top. Baked fresh every morning.',
    from: 45
  },
  {
    id: 'cookies',
    name: 'Cookies',
    shortName: 'Cookies',
    tone: ['#D9A559', '#8A5A2E'],
    art: 'cookie',
    unit: '100 g',
    blurb: 'Crisp at the edge, chewy in the middle, loaded with real chocolate.',
    from: 120
  },
  {
    id: 'teacakes',
    name: 'Tea Cakes & Others',
    shortName: 'Tea Cakes',
    tone: ['#E0B478', '#A8703C'],
    art: 'loaf',
    unit: '½ kg',
    blurb: 'Simple loaf cakes made for slow afternoons and a second cup of chai.',
    from: 200
  }
];

/* --------------------------------------------------------------------------
   Products — transcribed from the NM Bakery menu card
   -------------------------------------------------------------------------- */
window.NM_PRODUCTS = [
  /* ---- Cakes (₹ / ½ kg) ---- */
  {
    id: 'vanilla-cake', name: 'Vanilla Cake', category: 'cakes', price: 350, unit: '½ kg',
    desc: 'Butter-soft sponge with real vanilla and a cloud of whipped cream frosting.',
    tone: ['#FBF0DC', '#F2DFBC'], badge: 'Classic'
  },
  {
    id: 'chocolate-cake', name: 'Chocolate Cake', category: 'cakes', price: 400, unit: '½ kg',
    desc: 'Deep cocoa sponge layered with silky chocolate ganache. The eternal favourite.',
    tone: ['#5B3A28', '#3A2118'], featured: true, badge: 'Bestseller'
  },
  {
    id: 'black-forest-cake', name: 'Black Forest Cake', category: 'cakes', price: 450, unit: '½ kg',
    desc: 'Chocolate sponge, cherries and fresh cream, finished with dark chocolate shavings.',
    tone: ['#4A2A22', '#8C2F3C'], featured: true
  },
  {
    id: 'white-forest-cake', name: 'White Forest Cake', category: 'cakes', price: 450, unit: '½ kg',
    desc: 'Vanilla sponge with white chocolate curls and a whisper of cherry.',
    tone: ['#FDF6EC', '#E4D3C0']
  },
  {
    id: 'red-velvet-cake', name: 'Red Velvet Cake', category: 'cakes', price: 500, unit: '½ kg',
    desc: 'Velvety crimson crumb paired with tangy cream cheese frosting.',
    tone: ['#8E2436', '#B9455A'], featured: true, badge: 'Signature'
  },
  {
    id: 'mango-cake', name: 'Mango Cake', category: 'cakes', price: 450, unit: '½ kg',
    desc: 'Alphonso pulp folded through fresh cream over a light golden sponge.',
    tone: ['#F2B33D', '#E08A2B'], seasonal: true, badge: 'Seasonal'
  },
  {
    id: 'rose-milk-cake', name: 'Rose Milk Cake', category: 'cakes', price: 450, unit: '½ kg',
    desc: 'Milk-soaked sponge perfumed with rose — nostalgic, floral and gently sweet.',
    tone: ['#F3C9D3', '#DE9AAC']
  },
  {
    id: 'blueberry-cake', name: 'Blueberry Cake', category: 'cakes', price: 500, unit: '½ kg',
    desc: 'Cream cheese frosting swirled with a thick blueberry compote.',
    tone: ['#5A4A8C', '#8A79BF']
  },
  {
    id: 'coffee-tres-leches', name: 'Coffee Tres Leches Cake', category: 'cakes', price: 550, unit: '½ kg',
    desc: 'Sponge soaked in three milks and cold brew, dusted with cocoa. Our most indulgent bake.',
    tone: ['#6B4A32', '#A9784E'], featured: true, badge: 'Chef’s pick'
  },

  /* ---- Bento cakes ---- */
  {
    id: 'vanilla-bento', name: 'Vanilla Bento Cake', category: 'bento', price: 250, unit: 'per box',
    desc: 'A cake for two, boxed and piped with a short handwritten message.',
    tone: ['#FBF0DC', '#EFD9B6']
  },
  {
    id: 'chocolate-bento', name: 'Chocolate Bento Cake', category: 'bento', price: 280, unit: 'per box',
    desc: 'Rich chocolate in miniature — perfect for surprise deliveries.',
    tone: ['#5B3A28', '#3A2118'], featured: true
  },
  {
    id: 'red-velvet-bento', name: 'Red Velvet Bento Cake', category: 'bento', price: 300, unit: 'per box',
    desc: 'Red velvet and cream cheese, scaled down to a single joyful serving.',
    tone: ['#8E2436', '#C0576B']
  },
  {
    id: 'custom-bento', name: 'Customised Bento Cake', category: 'bento', price: 300, unit: 'onwards',
    desc: 'Your colour, your flavour, your message. Tell us the occasion and we will design it.',
    tone: ['#EBC4CA', '#D68FA2'], badge: 'Made to order', custom: true
  },

  /* ---- Brownies (per piece) ---- */
  {
    id: 'classic-brownie', name: 'Classic Brownie', category: 'brownies', price: 45, unit: 'per piece',
    desc: 'Fudgy centre, crackled top, pure dark chocolate. Nothing else needed.',
    tone: ['#4A2C1D', '#2E1A11'], featured: true, badge: 'Bestseller'
  },
  {
    id: 'nuts-brownie', name: 'Nuts Brownie', category: 'brownies', price: 50, unit: 'per piece',
    desc: 'Toasted walnuts and almonds folded into the classic batter.',
    tone: ['#5C3A25', '#8A6039']
  },
  {
    id: 'nutella-brownie', name: 'Nutella Brownie', category: 'brownies', price: 60, unit: 'per piece',
    desc: 'Swirled with Nutella before baking, so every bite finds a hazelnut ribbon.',
    tone: ['#4A2C1D', '#9C6134'], featured: true
  },
  {
    id: 'kinder-brownie', name: 'Kinder Brownie', category: 'brownies', price: 60, unit: 'per piece',
    desc: 'Topped with melted Kinder for a creamy milk-chocolate finish.',
    tone: ['#6B4326', '#E0B478']
  },

  /* ---- Cookies (per 100 g) ---- */
  {
    id: 'choco-chip-cookies', name: 'Choco Chip Cookies', category: 'cookies', price: 120, unit: '100 g',
    desc: 'Brown-butter dough studded with couverture chips. Crisp edge, soft middle.',
    tone: ['#C08A4E', '#8A5A2E'], featured: true
  },
  {
    id: 'double-chocolate-cookies', name: 'Double Chocolate Cookies', category: 'cookies', price: 130, unit: '100 g',
    desc: 'Cocoa dough with dark chocolate chunks — for serious chocolate people.',
    tone: ['#4A2C1D', '#6E4429']
  },
  {
    id: 'butter-cookies', name: 'Butter Cookies', category: 'cookies', price: 120, unit: '100 g',
    desc: 'Melt-in-mouth shortbread with nothing but butter, sugar and flour.',
    tone: ['#F0DCB4', '#DCC08A']
  },

  /* ---- Tea cakes & others (₹ / ½ kg) ---- */
  {
    id: 'tea-cake-plain', name: 'Tea Cake (Plain)', category: 'teacakes', price: 200, unit: '½ kg',
    desc: 'An everyday loaf, lightly sweet — the one that goes with your evening chai.',
    tone: ['#EAD3A8', '#D2B279']
  },
  {
    id: 'marble-cake', name: 'Marble Cake', category: 'teacakes', price: 250, unit: '½ kg',
    desc: 'Vanilla and cocoa batters swirled by hand, so no two slices match.',
    tone: ['#E6CBA0', '#6B4326']
  },
  {
    id: 'chocolate-tea-cake', name: 'Chocolate Tea Cake', category: 'teacakes', price: 250, unit: '½ kg',
    desc: 'A moist cocoa loaf that keeps beautifully for a whole week.',
    tone: ['#5B3A28', '#3A2118']
  },
  {
    id: 'dry-fruit-cake', name: 'Dry Fruit Cake', category: 'teacakes', price: 300, unit: '½ kg',
    desc: 'Generous with raisins, cashews and candied peel. Festive all year round.',
    tone: ['#B07A42', '#7A4E28'], featured: true
  }
];

/* --------------------------------------------------------------------------
   Why choose us — straight from the menu card
   -------------------------------------------------------------------------- */
window.NM_VALUES = [
  { icon: 'sparkle',  title: '100% Fresh & Homemade',   text: 'Every order is baked after you place it — never pulled from a freezer or a shelf.' },
  { icon: 'wheat',    title: 'Premium Ingredients',      text: 'Couverture chocolate, real butter, farm eggs and Alphonso pulp in season.' },
  { icon: 'leaf',     title: 'No Preservatives',         text: 'Nothing artificial goes into the batter, which is exactly why it tastes like home.' },
  { icon: 'shield',   title: 'Hygienic Preparation',     text: 'A dedicated home studio, sanitised surfaces and sealed, tamper-proof packing.' },
  { icon: 'heart',    title: 'Made with Lots of Love',   text: 'Small batches, one baker, and the patience that mass production cannot buy.' },
  { icon: 'gift',     title: 'Customised for You',       text: 'Birthdays, anniversaries and every occasion in between, designed to your brief.' }
];

/* --------------------------------------------------------------------------
   Testimonials
   -------------------------------------------------------------------------- */
window.NM_TESTIMONIALS = [
  {
    quote: 'The red velvet was the softest I have had in Vellore — and the cream cheese was not sickly sweet. It disappeared in one evening.',
    name: 'Aarthi R.', meta: 'Birthday order'
  },
  {
    quote: 'Ordered forty brownies for an office farewell at short notice. Packed neatly, delivered on time, and three people asked me for the number.',
    name: 'Vignesh K.', meta: 'Corporate order'
  },
  {
    quote: 'The bento cake arrived looking exactly like the reference I sent. My sister cried. Worth every rupee.',
    name: 'Divya S.', meta: 'Surprise gift'
  }
];

/* --------------------------------------------------------------------------
   How we bake — home page scroll story
   -------------------------------------------------------------------------- */
window.NM_PROCESS = [
  { art: 'chat',    title: 'You tell us the occasion', text: 'Message us on WhatsApp with the flavour, the weight and the date. We reply with a quote the same day.' },
  { art: 'bowl',    title: 'We shop and mix that day', text: 'Butter, eggs and cream are bought fresh for your order. Batter is mixed by hand, never held overnight.' },
  { art: 'oven',    title: 'Baked in small batches',   text: 'One cake at a time in the home studio, so the bake, the soak and the crumb are all watched closely.' },
  { art: 'box',     title: 'Finished and sealed',      text: 'Frosted, decorated, then boxed and sealed the hour before it reaches you — still fragrant.' }
];

/* --------------------------------------------------------------------------
   FAQ
   -------------------------------------------------------------------------- */
window.NM_FAQ = [
  {
    q: 'How much notice do you need for an order?',
    a: 'Cakes, tea cakes and bento boxes need at least 24 hours. Brownies and cookies can often be arranged same-day if we are not fully booked. For tiered or heavily decorated custom cakes, please give us three to four days.'
  },
  {
    q: 'Do you deliver, and is there a charge?',
    a: 'We deliver across the city. Delivery is charged separately based on distance and is confirmed when you place the order. You are also welcome to collect from the studio at no cost.'
  },
  {
    q: 'Can I get an eggless version?',
    a: 'Yes — most of our cakes, tea cakes and brownies can be made eggless on request. Please mention it when you order, as eggless bakes need a slightly different schedule.'
  },
  {
    q: 'How should I store what I receive?',
    a: 'Because we use no preservatives, cream cakes must go straight into the refrigerator and are best within 48 hours. Brownies and cookies keep in an airtight box at room temperature for up to five days.'
  },
  {
    q: 'Do you take bulk or corporate orders?',
    a: 'We do — hampers, office celebrations, return gifts and festive boxes. Send us the quantity and the date and we will work out pricing and packing options with you.'
  },
  {
    q: 'How do I pay?',
    a: 'UPI, bank transfer or cash on collection. Custom orders are confirmed with a fifty percent advance, and the balance is due before delivery.'
  }
];
