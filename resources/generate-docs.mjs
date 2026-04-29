import {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  Table, TableRow, TableCell, WidthType, BorderStyle,
  AlignmentType, PageBreak, ShadingType,
} from "docx";
import { writeFileSync } from "fs";

// ── helpers ──────────────────────────────────────────────────────────────────

const BRAND_PURPLE = "5B21B6";
const BRAND_LIGHT  = "EDE9FE";
const GREY_LINE    = "D1D5DB";

function h1(text) {
  return new Paragraph({
    text,
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 400, after: 200 },
    shading: { type: ShadingType.CLEAR, fill: BRAND_LIGHT },
    run: { bold: true, color: BRAND_PURPLE },
  });
}

function h2(text) {
  return new Paragraph({
    text,
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 300, after: 120 },
    run: { color: BRAND_PURPLE },
  });
}

function h3(text) {
  return new Paragraph({
    text,
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 200, after: 80 },
  });
}

function body(text, opts = {}) {
  return new Paragraph({
    children: [new TextRun({ text, size: 22, ...opts })],
    spacing: { after: 100 },
  });
}

function label(enText, cyText) {
  return new Paragraph({
    children: [
      new TextRun({ text: "EN: ", bold: true, size: 22 }),
      new TextRun({ text: enText + "  ", size: 22 }),
      new TextRun({ text: "CY: ", bold: true, size: 22, color: "065F46" }),
      new TextRun({ text: cyText, size: 22, color: "065F46" }),
    ],
    spacing: { after: 80 },
  });
}

function bullet(text) {
  return new Paragraph({
    text,
    bullet: { level: 0 },
    spacing: { after: 60 },
    run: { size: 22 },
  });
}

function bilingualBullet(en, cy) {
  return new Paragraph({
    children: [
      new TextRun({ text: en, size: 22 }),
      new TextRun({ text: "  /  ", size: 22, color: "9CA3AF" }),
      new TextRun({ text: cy, size: 22, color: "065F46" }),
    ],
    bullet: { level: 0 },
    spacing: { after: 60 },
  });
}

function divider() {
  return new Paragraph({
    border: { bottom: { color: GREY_LINE, size: 6, space: 1, style: BorderStyle.SINGLE } },
    spacing: { before: 200, after: 200 },
  });
}

function pageBreak() {
  return new Paragraph({ children: [new PageBreak()] });
}

function tableRow(cells, isHeader = false) {
  return new TableRow({
    children: cells.map(
      (c) =>
        new TableCell({
          children: [
            new Paragraph({
              children: [new TextRun({ text: c, bold: isHeader, size: 20 })],
            }),
          ],
          shading: isHeader
            ? { type: ShadingType.CLEAR, fill: BRAND_PURPLE }
            : {},
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
        })
    ),
  });
}

// ── document ──────────────────────────────────────────────────────────────────

const doc = new Document({
  styles: {
    paragraphStyles: [
      {
        id: "Heading1",
        name: "Heading 1",
        run: { bold: true, size: 32, color: BRAND_PURPLE },
      },
      {
        id: "Heading2",
        name: "Heading 2",
        run: { bold: true, size: 26, color: BRAND_PURPLE },
      },
      {
        id: "Heading3",
        name: "Heading 3",
        run: { bold: true, size: 22, color: "374151" },
      },
    ],
  },
  sections: [
    {
      properties: {},
      children: [

        // ── COVER PAGE ──────────────────────────────────────────────────────
        new Paragraph({
          children: [new TextRun({ text: "YGGG PTA Web Application", bold: true, size: 52, color: BRAND_PURPLE })],
          alignment: AlignmentType.CENTER,
          spacing: { before: 2000, after: 400 },
        }),
        new Paragraph({
          children: [new TextRun({ text: "Documentation — Pages, Content & Functionality", size: 32, color: "6B7280" })],
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
        }),
        new Paragraph({
          children: [new TextRun({ text: "Ysgol Gymraeg Gelligyfelach", size: 26, color: "9CA3AF" })],
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
        }),
        new Paragraph({
          children: [new TextRun({ text: "Charity No. 1136117", size: 22, color: "9CA3AF" })],
          alignment: AlignmentType.CENTER,
          spacing: { after: 2000 },
        }),
        pageBreak(),

        // ── TABLE OF CONTENTS ───────────────────────────────────────────────
        h1("Table of Contents"),
        body("1.  Application Overview"),
        body("2.  Architecture & Technology Stack"),
        body("3.  Navigation & Global Elements"),
        body("4.  Public Pages"),
        body("    4.1  Home Page"),
        body("    4.2  Events Listing"),
        body("    4.3  Event Detail"),
        body("    4.4  About Us"),
        body("    4.5  Meet the PTA"),
        body("    4.6  Reports & Documents"),
        body("    4.7  Fundraising"),
        body("    4.8  Community Achievements"),
        body("    4.9  Contact Us"),
        body("5.  Checkout Flow"),
        body("6.  Authenticated User Pages"),
        body("    6.1  Dashboard"),
        body("    6.2  My Orders"),
        body("    6.3  Settings"),
        body("7.  Admin-Only Pages"),
        body("    7.1  Analytics"),
        body("    7.2  Add / Edit Event"),
        body("    7.3  Manage Events"),
        body("8.  Key Functionality"),
        body("9.  Bilingual Content Reference"),
        pageBreak(),

        // ── 1. OVERVIEW ─────────────────────────────────────────────────────
        h1("1. Application Overview"),
        body(
          "The YGGG PTA app is a bilingual (English / Welsh) event-ticketing and fundraising platform " +
          "built for the Parent Teacher Association of Ysgol Gymraeg Gelligyfelach (a Welsh-medium primary school). " +
          "It allows PTA administrators to publish events, sell tickets online via Stripe, and communicate fundraising " +
          "goals and achievements to the school community. Parents and carers can browse events, purchase tickets, " +
          "and manage their orders through a personal dashboard."
        ),
        body("Key goals of the platform:"),
        bullet("Sell tickets to PTA events (school discos, quiz nights, etc.)"),
        bullet("Publish and track fundraising priorities and achievements"),
        bullet("Provide bilingual content in English and Welsh throughout"),
        bullet("Enable parents / carers to view and manage their own orders"),
        bullet("Give admins full control over events, analytics, and content"),
        divider(),

        // ── 2. ARCHITECTURE ─────────────────────────────────────────────────
        h1("2. Architecture & Technology Stack"),

        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            tableRow(["Layer", "Technology"], true),
            tableRow(["Framework", "Next.js 15 (App Router, TypeScript)"]),
            tableRow(["Database", "PostgreSQL via Neon (serverless) + Drizzle ORM"]),
            tableRow(["Authentication", "Clerk (JWT-based, roles in session metadata)"]),
            tableRow(["Payments", "Stripe (Checkout / payment intents)"]),
            tableRow(["File Uploads", "UploadThing (bilingual event images)"]),
            tableRow(["Styling", "Tailwind CSS + Shadcn/Radix UI components"]),
            tableRow(["State Management", "Zustand (cart, persisted to localStorage)"]),
            tableRow(["Server Actions", "next-safe-action (Zod-validated mutations)"]),
            tableRow(["Hosting", "Vercel (assumed)"]),
          ],
        }),

        new Paragraph({ spacing: { after: 200 } }),
        h2("Route Structure"),
        body("Public routes (no authentication required):"),
        bullet("/  — Home page"),
        bullet("/events  — Event listing"),
        bullet("/events/[id]  — Event detail and booking"),
        bullet("/about  — About Us (Our Mission)"),
        bullet("/about/meetthepta  — Meet the PTA team"),
        bullet("/about/documents  — Reports & Documents"),
        bullet("/fundraising  — Fundraising priorities"),
        bullet("/community-achievements  — Community achievements"),
        bullet("/contactus  — Contact form"),

        new Paragraph({ spacing: { after: 100 } }),
        body("Authenticated user routes:"),
        bullet("/dashboard  — Personal dashboard"),
        bullet("/dashboard/orders  — My orders"),
        bullet("/dashboard/settings  — Account settings"),

        new Paragraph({ spacing: { after: 100 } }),
        body("Admin-only routes:"),
        bullet("/dashboard/analytics  — Revenue analytics"),
        bullet("/dashboard/add-event  — Create a new event"),
        bullet("/dashboard/events  — Manage existing events"),
        pageBreak(),

        // ── 3. NAVIGATION ───────────────────────────────────────────────────
        h1("3. Navigation & Global Elements"),

        h2("Top Navigation Bar"),
        body("The navigation bar appears on every page and contains:"),
        bullet("YGGG PTA logo / wordmark (links to home)"),
        bullet("Language toggle — switches all page content between English and Welsh"),
        bullet("Main navigation menu (desktop: horizontal; mobile: collapsible hamburger)"),
        bullet("Shopping cart icon — opens a slide-over drawer showing cart contents"),
        bullet("Sign In / User button (Clerk) — shows avatar and menu when authenticated"),

        h2("Navigation Menu Items"),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            tableRow(["Menu Item (EN)", "Menu Item (CY)", "Sub-links"], true),
            tableRow(["About Us", "Amdanom ni", "Our Mission, Meet the PTA, Reports & Documents"]),
            tableRow(["Fundraising", "Codi Arian", "Fundraising Priorities, Community Achievements, Upcoming Events"]),
            tableRow(["Events", "Digwyddiadau", "(direct link)"]),
            tableRow(["Contact Us", "Cysylltwch â ni", "(direct link)"]),
          ],
        }),

        new Paragraph({ spacing: { after: 200 } }),
        h2("Footer"),
        body("The footer appears on every page and contains:"),
        bullet("YGGG PTA branding and charity number: 1136117"),
        bullet("Social media links: Instagram, Facebook, Email"),
        bullet('Copyright: "© 2025 Ysgol Gymraeg Gelligyfelach PTA. All rights reserved."'),
        bullet('Welsh: "© 2025 CRhA Ysgol Gymraeg Gelligyfelach. Cedwir pob hawl."'),

        h2("Cart Drawer"),
        body("Accessible via the cart icon in the nav bar. Contains:"),
        bullet("Table of cart items: Event name, price, image thumbnail, quantity"),
        bullet("Total price"),
        bullet('"Proceed to Checkout →" button'),
        bullet('"Your cart is empty" state when no items are added'),
        pageBreak(),

        // ── 4. PUBLIC PAGES ──────────────────────────────────────────────────
        h1("4. Public Pages"),

        // 4.1 HOME
        h2("4.1  Home Page  (/)\n"),
        h3("Purpose"),
        body("The landing page introduces the PTA, signposts key sections, and encourages community engagement."),

        h3("Page Wording"),
        label("YGGG PTA", "CRhA YGGG"),
        label("Welcome to YGGG PTA", "Croeso i CRhA YGGG"),
        label(
          "We are a community of parents, carers, and staff working together to support our school through activities, events, and fundraising that create better opportunities for every child.",
          "Rydym yn gymuned o rieni, gofalwyr ac athrawon sy'n cefnogi ein hysgol trwy weithgareddau, digwyddiadau a chodi arian i greu cyfleoedd gwell i bob plentyn."
        ),

        h3("Call-to-Action Buttons"),
        bilingualBullet("Learn more about us", "Dysgu mwy amdanom"),
        bilingualBullet("Meet the PTA", "Cwrdd â'r CRhA"),

        h3("Highlight Cards"),
        body("Three cards link to key sections:"),
        bilingualBullet(
          "Upcoming PTA Events — From school discos to family quiz nights, there is always something in the diary to bring families together.",
          "Digwyddiadau CRhA i Ddod — O ddisgos ysgol i nosweithiau cwis teuluol, mae rhywbeth bob amser yn y dyddiadur i ddod â theuluoedd ynghyd."
        ),
        bilingualBullet(
          "Fundraising Goals — We fundraise for books, playground resources, and enrichment experiences that directly support every child.",
          "Nodau Codi Arian — Rydym yn codi arian ar gyfer llyfrau, adnoddau maes chwarae, a phrofiadau cyfoethogi sy'n cefnogi pob plentyn yn uniongyrchol."
        ),
        bilingualBullet(
          "Community Achievements — Thanks to volunteers and supporters, we have already funded new learning resources and memorable school activities.",
          "Cyflawniadau Cymunedol — Diolch i wirfoddolwyr a chefnogwyr, rydym eisoes wedi ariannu adnoddau dysgu newydd a gweithgareddau ysgol cofiadwy."
        ),

        h3("CTA Banner"),
        label("Get Involved with the PTA", "Ymunwch â'r CRhA"),
        label(
          "Every hour volunteered and every pound raised helps deliver meaningful experiences for pupils.",
          "Mae pob awr o wirfoddoli a phob punt a godir yn helpu i ddarparu profiadau ystyrlon i ddisgyblion."
        ),
        bilingualBullet("Meet our team", "Cwrdd â'n tîm"),
        divider(),

        // 4.2 EVENTS
        h2("4.2  Events Listing  (/events)"),
        h3("Purpose"),
        body("Lists all upcoming PTA events. Parents can browse, check availability, and click through to book tickets."),

        h3("Page Wording"),
        label("Events", "Digwyddiadau"),
        label("Here's what's coming up", "Dyma beth sy'n dod i fyny"),
        label(
          "Browse our upcoming PTA events, from family activities to fundraising nights, and reserve your place.",
          "Porwch ein digwyddiadau CRhA i ddod, o weithgareddau teuluol i nosweithiau codi arian, a chadwch eich lle."
        ),

        h3("Availability Badges on Event Cards"),
        bilingualBullet("Tickets Available", "Tocynnau ar gael"),
        bilingualBullet("Limited Tickets", "Tocynnau cyfyngedig"),
        bilingualBullet("Sold Out", "Wedi gwerthu allan"),
        bilingualBullet("Event Expired", "Digwyddiad wedi dod i ben"),

        h3("Event Card CTA"),
        bilingualBullet("Book now →", "Archebu →"),
        divider(),

        // 4.3 EVENT DETAIL
        h2("4.3  Event Detail  (/events/[id])"),
        h3("Purpose"),
        body(
          "Shows full details of a single event including description, dates, location, remaining capacity, " +
          "and the ticket booking control. Users add tickets to their cart from this page."
        ),

        h3("Page Wording"),
        body("Tabs:"),
        bullet("Summary"),
        bullet("Location"),
        body("Detail labels:"),
        bullet("Event details"),
        bullet("Starts: / Ends:  [date and time]"),
        bullet("[remainingCapacity] / [capacity] left"),
        body("Location tab:"),
        bullet("Event location"),
        bullet("View on Google Maps"),
        body("Booking section:"),
        bullet("Book tickets"),
        bullet("[quantity] ticket(s)"),
        bullet("Add to cart"),
        bullet("Only [n] ticket(s) remaining  (low-stock warning)"),
        bullet("This event has ended  (expired state)"),
        bullet("Sold out  (zero capacity state)"),
        bullet("← Back to events  (navigation)"),
        divider(),

        // 4.4 ABOUT
        h2("4.4  About Us — Our Mission  (/about)"),
        h3("Purpose"),
        body("Describes the PTA's purpose, focus areas, and recent achievements."),

        h3("Page Wording"),
        label("About Us", "Amdanom ni"),
        label("About the YGGG PTA", "Amdanom CRhA YGGG"),
        label(
          "The PTA exists to strengthen the connection between home and school. We organise social events, volunteer opportunities, and fundraising projects that directly support children and help create a vibrant school community.",
          "Mae'r CRhA yn bodoli i gryfhau'r cysylltiad rhwng y cartref a'r ysgol. Rydym yn trefnu digwyddiadau cymdeithasol, cyfleoedd gwirfoddoli, a phrosiectau codi arian sy'n cefnogi plant yn uniongyrchol ac yn helpu i greu cymuned ysgol fywiog."
        ),

        h3("Our Focus Card"),
        label("Our focus", "Ein ffocws"),
        bilingualBullet(
          "Support pupil wellbeing and enrichment across the school.",
          "Cefnogi lles disgyblion a chyfleoedd cyfoethogi ar draws yr ysgol."
        ),
        bilingualBullet(
          "Run inclusive community events that bring families together.",
          "Cynnal digwyddiadau cymunedol cynhwysol sy'n dod â theuluoedd ynghyd."
        ),
        bilingualBullet(
          "Fundraise for resources that enhance learning and play.",
          "Codi arian ar gyfer adnoddau sy'n gwella dysgu a chwarae."
        ),
        bilingualBullet(
          "Build strong partnerships between parents, carers, and staff.",
          "Meithrin partneriaethau cryf rhwng rhieni, gofalwyr a staff."
        ),

        h3("What We Have Achieved Card"),
        label("What we have achieved", "Beth rydym wedi'i gyflawni"),
        label(
          "Recent fundraising has helped provide classroom resources, event materials, and support for school experiences that make learning more memorable. As the school grows, the PTA continues to champion projects that benefit all pupils.",
          "Mae codi arian diweddar wedi helpu i ddarparu adnoddau dosbarth, deunyddiau digwyddiadau, a chefnogaeth ar gyfer profiadau ysgol sy'n gwneud dysgu'n fwy cofiadwy. Wrth i'r ysgol dyfu, mae'r CRhA yn parhau i hyrwyddo prosiectau sy'n elwa pob disgybl."
        ),
        bilingualBullet("Meet the PTA team  (button)", "Cwrdd â thîm y CRhA"),
        divider(),

        // 4.5 MEET THE PTA
        h2("4.5  Meet the PTA  (/about/meetthepta)"),
        h3("Purpose"),
        body("Introduces the PTA committee members with their roles and short biographies."),

        h3("Page Wording"),
        label("The Team", "Y Tîm"),
        label("Meet the PTA", "Cwrdd â'r CRhA"),
        label(
          "Click on a member card to learn more about who they are and the role they play in supporting our school community.",
          "Cliciwch ar gerdyn aelod i ddysgu mwy am bwy ydynt a'r rôl maent yn ei chwarae wrth gefnogi cymuned ein hysgol."
        ),

        h3("Committee Members"),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            tableRow(["Name", "Role (EN)", "Role (CY)", "Bio (EN)"], true),
            tableRow(["Cheryl Voake-Jones", "Chair", "Cadeirydd", "Cheryl leads the PTA committee and helps shape our school community priorities."]),
            tableRow(["Anthony Dodwell", "Treasurer", "Trysorydd", "Anthony oversees budgeting and helps ensure PTA funds are used effectively for pupils."]),
            tableRow(["Megan Morris", "Secretary", "Ysgrifennydd", "Megan coordinates meeting notes, communication updates, and action tracking for the committee."]),
            tableRow(["Natasha Trotman", "Communications", "Cyfathrebu", "Natasha supports PTA communications with parents, carers, and the wider school community."]),
            tableRow(["Sara Maynard", "Communications", "Cyfathrebu", "Sara helps share PTA updates, event information, and key notices across communication channels."]),
            tableRow(["Terry", "Communications", "Cyfathrebu", "Terry contributes to PTA messaging and keeps families informed about upcoming opportunities."]),
          ],
        }),
        new Paragraph({ spacing: { after: 100 } }),
        bilingualBullet("View more →  (card CTA)", "Gweld mwy →"),
        divider(),

        // 4.6 DOCUMENTS
        h2("4.6  Reports & Documents  (/about/documents)"),
        h3("Purpose"),
        body("Placeholder page for governance documents, newsletters, and meeting notes. Content is not yet published."),

        h3("Page Wording"),
        label("Documents", "Dogfennau"),
        label("Reports & Documents", "Adroddiadau a Dogfennau"),
        label(
          "This page is a placeholder for governance documents, newsletters, and related PTA files.",
          "Mae'r dudalen hon yn ddaliwr lle ar gyfer dogfennau llywodraethu, cylchlythyrau, a ffeiliau CRhA cysylltiedig."
        ),

        h3("Document Sections (Placeholder)"),
        bilingualBullet(
          "Governance documents — Placeholder area for policies, constitutions, annual reports, and committee records.",
          "Dogfennau llywodraethu — Ardal daliwr lle ar gyfer polisïau, cyfansoddiadau, adroddiadau blynyddol, a chofnodion pwyllgor."
        ),
        bilingualBullet(
          "Newsletters — Placeholder area for PTA newsletters, school community updates, and fundraising summaries.",
          "Cylchlythyrau — Ardal daliwr lle ar gyfer cylchlythyrau CRhA, diweddariadau cymuned ysgol, a chrynodebau codi arian."
        ),
        bilingualBullet(
          "General documents — Placeholder area for meeting notes, event packs, and other downloadable resources.",
          "Dogfennau cyffredinol — Ardal daliwr lle ar gyfer nodiadau cyfarfodydd, pecynnau digwyddiadau, ac adnoddau i'w lawrlwytho."
        ),
        divider(),

        // 4.7 FUNDRAISING
        h2("4.7  Fundraising  (/fundraising)"),
        h3("Purpose"),
        body("Communicates the three current fundraising priorities to parents and carers."),

        h3("Page Wording"),
        label("Fundraising", "Codi Arian"),
        label("What we are currently raising money for", "Beth rydym yn codi arian ar ei gyfer ar hyn o bryd"),
        label(
          "Every fundraising campaign is linked to a practical need in school. The priorities below are our current focus and where your donations make the biggest difference.",
          "Mae pob ymgyrch codi arian yn gysylltiedig ag angen ymarferol yn yr ysgol. Y blaenoriaethau isod yw ein ffocws presennol a dyma lle mae eich cyfraniadau'n gwneud y gwahaniaeth mwyaf."
        ),

        h3("Priority 1 — Outdoor Play Equipment Refresh"),
        label("Outdoor play equipment refresh", "Adnewyddu offer chwarae awyr agored"),
        label(
          "We are raising funds for durable playground pieces and safer surfacing so children can stay active all year.",
          "Rydym yn codi arian ar gyfer offer maes chwarae gwydn ac arwyneb mwy diogel fel bod plant yn gallu aros yn egnïol drwy'r flwyddyn."
        ),

        h3("Priority 2 — Classroom Technology Upgrades"),
        label("Classroom technology upgrades", "Uwchraddio technoleg dosbarth"),
        label(
          "Planned purchases include new tablets, charging stations, and interactive tools to support digital learning.",
          "Mae'r cynlluniau'n cynnwys tabledi newydd, gorsafoedd gwefru, ac offer rhyngweithiol i gefnogi dysgu digidol."
        ),

        h3("Priority 3 — Enrichment and Wellbeing Programmes"),
        label("Enrichment and wellbeing programmes", "Rhaglenni cyfoethogi a lles"),
        label(
          "From visiting workshops to after-school experiences, we want every year group to access memorable opportunities.",
          "O weithdai ymweliadol i brofiadau ar ôl ysgol, rydym eisiau i bob blwyddyn gael cyfleoedd cofiadwy."
        ),

        h3("CTA Banner"),
        label(
          "Want to see what PTA fundraising has already achieved?",
          "Eisiau gweld beth mae codi arian y CRhA wedi'i gyflawni eisoes?"
        ),
        label(
          "Explore our community achievements to track what has been funded so far.",
          "Archwiliwch ein cyflawniadau cymunedol i weld beth sydd wedi'i ariannu hyd yma."
        ),
        bilingualBullet("View community achievements  (button)", "Gweld cyflawniadau cymunedol"),
        divider(),

        // 4.8 COMMUNITY ACHIEVEMENTS
        h2("4.8  Community Achievements  (/community-achievements)"),
        h3("Purpose"),
        body("Showcases what PTA fundraising has funded, building trust and encouraging continued community support."),

        h3("Page Wording"),
        label("Community achievements", "Cyflawniadau cymunedol"),
        label("What we've raised and what we've funded", "Beth rydym wedi'i godi a beth rydym wedi'i ariannu"),
        label(
          "Thanks to families, local supporters, and volunteers, PTA fundraising has funded meaningful improvements across school life.",
          "Diolch i deuluoedd, cefnogwyr lleol, a gwirfoddolwyr, mae codi arian y CRhA wedi ariannu gwelliannau ystyrlon ar draws bywyd ysgol."
        ),

        h3("Achievement Cards"),
        bilingualBullet(
          "£4,200 raised for reading resources — Funds helped add new reading books, guided reading sets, and calm corner materials for younger learners.",
          "£4,200 wedi'i godi ar gyfer adnoddau darllen — Helpodd y cronfeydd i ychwanegu llyfrau darllen newydd, setiau darllen dan arweiniad, a deunyddiau corneli tawel i ddysgwyr iau."
        ),
        bilingualBullet(
          "£2,750 funded a school hall sound system — A new portable system has improved assemblies, performances, and PTA events for families.",
          "£2,750 wedi ariannu system sain neuadd yr ysgol — Mae system gludadwy newydd wedi gwella gwasanaethau, perfformiadau, a digwyddiadau CRhA i deuluoedd."
        ),
        bilingualBullet(
          "£1,900 supported wellbeing and enrichment — Contributions covered visiting workshops and activity sessions to broaden learning opportunities.",
          "£1,900 wedi cefnogi lles a chyfoethogi — Defnyddiwyd cyfraniadau i dalu am weithdai ymweliadol a sesiynau gweithgaredd i ehangu cyfleoedd dysgu."
        ),

        h3("Stats"),
        bullet("Total raised this year: £8,850"),
        bullet("Projects delivered: 6 school improvement projects supported so far"),
        divider(),

        // 4.9 CONTACT
        h2("4.9  Contact Us  (/contactus)"),
        h3("Purpose"),
        body("Allows parents and carers to register their interest in joining or volunteering with the PTA. The form submission is not yet wired up."),

        h3("Page Wording"),
        label("Contact", "Cysylltu"),
        label("Contact Us", "Cysylltwch â ni"),
        label(
          "We would love to hear from you. If you are interested in joining the PTA, volunteering, or sharing a fundraising idea, use this form to tell us more.",
          "Byddem wrth ein bodd yn clywed gennych. Os oes gennych ddiddordeb mewn ymuno â'r CRhA, gwirfoddoli, neu rannu syniad codi arian, defnyddiwch y ffurflen hon i ddweud mwy wrthym."
        ),

        h3("Contact Details"),
        bullet("Email: pta@yggg.school"),
        bullet("Phone: 01234 567890"),
        bilingualBullet("Meet us: At the next PTA event", "Yn nigwyddiad nesaf y CRhA"),

        h3("Contact Form"),
        label("Register your interest", "Cofrestru eich diddordeb"),
        label("Share your details and how you would like to help.", "Rhannwch eich manylion a sut hoffech chi helpu."),

        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            tableRow(["Field", "Label (EN)", "Label (CY)", "Placeholder (EN)", "Placeholder (CY)"], true),
            tableRow(["Text", "Full name", "Enw llawn", "Jane Parent", "Jane Rhiant"]),
            tableRow(["Email", "Email address", "Cyfeiriad e-bost", "jane@example.com", "jane@example.com"]),
            tableRow(["Select", "Type of enquiry", "Math o ymholiad", "— select —", "— dewiswch —"]),
            tableRow(["Textarea", "Message", "Neges", "I am interested in helping with school events this term...", "Mae gen i ddiddordeb mewn helpu gyda digwyddiadau ysgol y tymor hwn..."]),
          ],
        }),

        new Paragraph({ spacing: { after: 100 } }),
        h3("Enquiry Type Options"),
        bilingualBullet("General enquiry", "Ymholiad cyffredinol"),
        bilingualBullet("Joining the PTA", "Ymuno â'r CRhA"),
        bilingualBullet("Volunteering at events", "Gwirfoddoli mewn digwyddiadau"),
        bilingualBullet("Business sponsorship", "Nawdd busnes"),
        bilingualBullet("Fundraising idea", "Syniad codi arian"),

        h3("Notices"),
        bilingualBullet(
          "This page is currently a mockup. Form submissions are not wired up yet.",
          "Mae'r dudalen hon yn fodel ar hyn o bryd. Nid yw cyflwyniadau ffurflen wedi'u cysylltu eto."
        ),
        bilingualBullet(
          "When this goes live, a PTA volunteer will follow up with you by email.",
          "Pan fydd hyn yn fyw, bydd gwirfoddolwr CRhA yn cysylltu â chi drwy e-bost."
        ),
        pageBreak(),

        // ── 5. CHECKOUT ─────────────────────────────────────────────────────
        h1("5. Checkout Flow  (/checkout)"),
        body(
          "The checkout is a multi-step flow accessed after adding tickets to the cart. " +
          "It is available to all users (unauthenticated users are redirected to sign in before proceeding)."
        ),

        h2("Step 1 — Ticket Info  (ticket-info)"),
        body("Heading: Ticket Details"),
        body("For each ticket in the cart, the user enters:"),
        bullet("Ticket Holder Name — e.g. Jane Smith"),
        body(
          'Footer note: "Please enter the name of the ticket holder for each ticket. ' +
          'This is required for entry to the event."'
        ),
        bilingualBullet("Continue to Payment →", "Parhau i Dalu →"),

        h2("Step 2 — Payment  (payment-page)"),
        body("Heading: Payment"),
        body("Renders a Stripe-hosted payment form within the page. Back navigation: ← Back to ticket info"),

        h2("Step 3 — Confirmation  (confirmation-page)"),
        body("Heading: Order Confirmed"),
        body('"Thank you!"'),
        body('"Your order has been placed. You will receive a confirmation email shortly."'),
        bilingualBullet("View your orders →", "Gweld eich archebion →"),

        h2("Step Progress Indicator"),
        bullet("Ticket Info"),
        bullet("Payment"),
        bullet("Confirmed"),
        pageBreak(),

        // ── 6. AUTHENTICATED PAGES ──────────────────────────────────────────
        h1("6. Authenticated User Pages"),

        h2("6.1  Dashboard  (/dashboard)"),
        body(
          "Personal overview page shown to any signed-in user. " +
          "The sidebar shows navigation links relevant to the user's role."
        ),

        h2("6.2  My Orders  (/dashboard/orders)"),
        body("Lists all ticket orders placed by the signed-in user."),
        body("Columns: Order reference, Event name, Date, Status, Quantity, Total paid"),
        body("Users can expand each order to view individual ticket holder names."),

        h2("6.3  Settings  (/dashboard/settings)"),
        body("Account settings page — currently delegates to Clerk's hosted profile component for name, email, and password management."),
        pageBreak(),

        // ── 7. ADMIN PAGES ───────────────────────────────────────────────────
        h1("7. Admin-Only Pages"),
        body("These routes are accessible only to users with the admin role (set in Clerk JWT metadata)."),

        h2("7.1  Analytics  (/dashboard/analytics)"),
        h3("Purpose"),
        body("Gives admins a high-level view of revenue, tickets sold, and event popularity."),
        h3("Content"),
        bullet("Stat cards: Total events, Total income, Total tickets"),
        bullet("Bar chart: Income — last 6 months (monthly paid revenue)"),
        bullet("Top events by tickets — Most purchased events"),
        body("Order table columns: Order ID, Customer, Event, Status, Qty, Amount, Date"),
        body('Empty state: "No orders yet."'),

        h2("7.2  Add / Edit Event  (/dashboard/add-event)"),
        h3("Purpose"),
        body("Create a new event or edit an existing one. Both English and Welsh images can be uploaded."),
        h3("Form Fields"),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            tableRow(["Field", "Notes"], true),
            tableRow(["Event Name", "Text input"]),
            tableRow(["Event Description", "Rich text / textarea"]),
            tableRow(["Price", "Numeric — pence or pounds"]),
            tableRow(["Capacity", "Total available tickets"]),
            tableRow(["Event Start", "Date + time picker"]),
            tableRow(["Event End", "Date + time picker"]),
            tableRow(["Location", "Free-text venue name"]),
            tableRow(["Google Maps Link", "Paste a Google Maps share link"]),
            tableRow(["Image (English)", "Upload via UploadThing"]),
            tableRow(["Image (Welsh)", "Upload via UploadThing"]),
          ],
        }),
        new Paragraph({ spacing: { after: 100 } }),
        h3("Form Buttons"),
        bullet("Cancel"),
        bullet("Create Event / Save Changes"),

        h2("7.3  Manage Events  (/dashboard/events)"),
        h3("Purpose"),
        body("Lists all events with admin controls for editing, archiving, or deleting each event."),
        pageBreak(),

        // ── 8. KEY FUNCTIONALITY ─────────────────────────────────────────────
        h1("8. Key Functionality"),

        h2("Authentication & Roles"),
        body("Authentication is handled by Clerk. Two roles exist:"),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            tableRow(["Role", "Capabilities"], true),
            tableRow(["member (any signed-in user)", "Browse events, purchase tickets, view own orders"]),
            tableRow(["admin", "All of the above plus: create/edit/delete events, view analytics"]),
          ],
        }),
        new Paragraph({ spacing: { after: 100 } }),
        body("Role is stored in Clerk JWT session metadata under sessionClaims.metadata.role. Route protection is enforced in middleware.ts."),

        h2("Cart & Ticket Purchase"),
        bullet("Users add tickets to a Zustand cart (persisted to localStorage)"),
        bullet("Cart supports multiple events and quantities"),
        bullet("Checkout requires authentication (unauthenticated users prompted to sign in)"),
        bullet("Ticket holder names are collected per ticket before payment"),
        bullet("Payment is processed via Stripe"),
        bullet("On success, an order record is created in the database with individual ticket records"),
        bullet("A confirmation screen is shown with a link to the user's orders"),

        h2("Bilingual Content"),
        bullet("A LanguageProvider component wraps the entire application"),
        bullet("Language preference (en / cy) is persisted to localStorage"),
        bullet("All user-facing text has an English and Welsh version"),
        bullet("Event images also have bilingual variants (imgUrl / imgUrlWel) stored per event"),
        bullet("Admin users upload separate English and Welsh event images"),

        h2("Event Management"),
        bullet("Admins create events with name, description, price, capacity, start/end dates, location, and map link"),
        bullet("Events display availability badges based on remaining capacity"),
        bullet("Events past their end date are automatically marked as Expired"),
        bullet("Event images are served in the user's selected language"),

        h2("Data Layer"),
        body("Four database tables:"),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            tableRow(["Table", "Key columns"], true),
            tableRow(["users", "id, clerkId, name, email, role"]),
            tableRow(["events", "id, name, description, price, capacity, startDate, endDate, location, mapsLink, imgUrl, imgUrlWel"]),
            tableRow(["orders", "id, userId, eventId, orderRef, status, totalAmount, createdAt"]),
            tableRow(["tickets", "id, orderId, eventId, ticketHolderName"]),
          ],
        }),
        new Paragraph({ spacing: { after: 100 } }),
        pageBreak(),

        // ── 9. BILINGUAL REFERENCE ───────────────────────────────────────────
        h1("9. Bilingual Content Reference"),
        body("Quick reference for key terms used consistently across the application:"),

        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            tableRow(["English", "Welsh (Cymraeg)"], true),
            tableRow(["PTA (Parent Teacher Association)", "CRhA (Cymdeithas Rhieni ac Athrawon)"]),
            tableRow(["Events", "Digwyddiadau"]),
            tableRow(["Fundraising", "Codi Arian"]),
            tableRow(["About Us", "Amdanom ni"]),
            tableRow(["Contact", "Cysylltu"]),
            tableRow(["Community Achievements", "Cyflawniadau Cymunedol"]),
            tableRow(["Reports & Documents", "Adroddiadau a Dogfennau"]),
            tableRow(["Orders", "Archebion"]),
            tableRow(["Analytics", "Dadansoddeg"]),
            tableRow(["Tickets Available", "Tocynnau ar gael"]),
            tableRow(["Limited Tickets", "Tocynnau cyfyngedig"]),
            tableRow(["Sold Out", "Wedi gwerthu allan"]),
            tableRow(["Book now", "Archebu"]),
            tableRow(["Meet the PTA", "Cwrdd â'r CRhA"]),
            tableRow(["Chair", "Cadeirydd"]),
            tableRow(["Treasurer", "Trysorydd"]),
            tableRow(["Secretary", "Ysgrifennydd"]),
            tableRow(["Communications", "Cyfathrebu"]),
          ],
        }),

        new Paragraph({ spacing: { after: 400 } }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Document generated from codebase — YGGG PTA Web App",
              size: 18,
              color: "9CA3AF",
              italics: true,
            }),
          ],
          alignment: AlignmentType.CENTER,
        }),
      ],
    },
  ],
});

const buffer = await Packer.toBuffer(doc);
writeFileSync("resources/YGGG_PTA_App_Documentation.docx", buffer);
console.log("✓ resources/YGGG_PTA_App_Documentation.docx created");
