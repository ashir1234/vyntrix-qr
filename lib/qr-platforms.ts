/**
 * Programmatic SEO pages: /qr-code-for/[slug]
 * Each entry needs unique intro/tips/FAQs so pages aren't thin duplicates.
 */

export type QrPlatformCategory =
  | "social"
  | "music"
  | "business"
  | "forms"
  | "apps"
  | "print"
  | "other";

export type QrPlatform = {
  slug: string;
  name: string;
  category: QrPlatformCategory;
  title: string;
  description: string;
  h1: string;
  keywords: string[];
  urlHint: string;
  urlExample: string;
  intro: string;
  tips: string[];
  faqs: { q: string; a: string }[];
  /** Link to a deeper /guides article when one exists. */
  relatedGuideSlug?: string;
};

export const qrPlatforms: QrPlatform[] = [
  {
    slug: "spotify",
    name: "Spotify",
    category: "music",
    title: "How to Create a Spotify QR Code (Free)",
    description:
      "Make a free Spotify QR code that opens a song, album, playlist, or artist page. Download PNG or SVG and share it on posters, merch, or menus.",
    h1: "How to Create a Spotify QR Code",
    keywords: [
      "Spotify QR code",
      "QR code for Spotify",
      "playlist QR code",
      "Spotify song QR code",
    ],
    urlHint: "Copy the share link from the Spotify app or web player",
    urlExample: "https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M",
    intro:
      "A Spotify QR code lets fans open your track, album, playlist, or artist page with one scan — no typing search terms. Ideal for merch, gig posters, restaurant playlists, and packaging.",
    tips: [
      "Use the official open.spotify.com share link so every device opens the app or web player correctly.",
      "For events, prefer a playlist URL so you can update tracks without reprinting.",
      "Pair the code with a short caption like “Scan for the playlist.”",
    ],
    faqs: [
      {
        q: "Can I track how many people scanned my Spotify QR?",
        a: "Yes. Create a dynamic QR code that redirects to your Spotify link. You’ll see scan counts and devices in the dashboard while keeping the printed code the same.",
      },
      {
        q: "Does it work if someone doesn’t have Spotify installed?",
        a: "Yes. The open.spotify.com link opens in a browser or prompts them to install the app.",
      },
      {
        q: "Can I change the song later?",
        a: "With a dynamic QR code, yes — update the destination anytime. Static codes are locked to the original URL.",
      },
    ],
    relatedGuideSlug: "qr-code-for-spotify",
  },
  {
    slug: "apple-music",
    name: "Apple Music",
    category: "music",
    title: "How to Create an Apple Music QR Code",
    description:
      "Generate a free Apple Music QR code for a song, album, or playlist. Print-ready PNG and SVG downloads for posters, packaging, and events.",
    h1: "How to Create an Apple Music QR Code",
    keywords: [
      "Apple Music QR code",
      "QR code for Apple Music",
      "music playlist QR code",
    ],
    urlHint: "Share → Copy Link in Apple Music",
    urlExample: "https://music.apple.com/us/album/example/1234567890",
    intro:
      "An Apple Music QR code opens a song, album, or playlist instantly. Use it on vinyl inserts, café cards, and event flyers so listeners skip searching.",
    tips: [
      "Prefer music.apple.com links over shortened third-party URLs.",
      "Test on both iPhone and Android before printing.",
      "Add brand colors so the code matches your artwork.",
    ],
    faqs: [
      {
        q: "Will Android users be able to open it?",
        a: "Yes. Apple Music links open in a browser or the Apple Music app where available.",
      },
      {
        q: "Can I brand the QR with my logo?",
        a: "Yes. Upload a logo in the Studio and keep high contrast so phones still scan reliably.",
      },
    ],
  },
  {
    slug: "facebook",
    name: "Facebook",
    category: "social",
    title: "How to Create a Facebook QR Code (Page or Profile)",
    description:
      "Create a free Facebook QR code that opens your Page or profile. Perfect for storefronts, flyers, and business cards.",
    h1: "How to Create a Facebook QR Code",
    keywords: [
      "Facebook QR code",
      "QR code for Facebook page",
      "Facebook page QR code",
    ],
    urlHint: "Open your Page → Share → Copy link",
    urlExample: "https://www.facebook.com/YourPageName",
    intro:
      "A Facebook QR code sends people straight to your Page or profile. It’s one of the simplest ways to grow likes from offline traffic.",
    tips: [
      "Use your public Page URL, not a temporary share dialog link.",
      "Print with a quiet zone (margin) so cameras can lock on quickly.",
      "Enable dynamic QR if you might switch to a new Page later.",
    ],
    faqs: [
      {
        q: "Is this the same as Facebook’s built-in QR?",
        a: "Facebook has its own QR in the app. A standard QR works with any camera and can be styled to match your brand.",
      },
      {
        q: "Can I track scans?",
        a: "Use a dynamic QR code to log scans while still sending visitors to Facebook.",
      },
    ],
    relatedGuideSlug: "qr-code-for-facebook",
  },
  {
    slug: "linkedin",
    name: "LinkedIn",
    category: "social",
    title: "How to Create a LinkedIn QR Code",
    description:
      "Make a free LinkedIn QR code for your profile or company page. Great for networking events, email signatures, and business cards.",
    h1: "How to Create a LinkedIn QR Code",
    keywords: [
      "LinkedIn QR code",
      "QR code for LinkedIn",
      "LinkedIn profile QR",
    ],
    urlHint: "Open your profile → copy the linkedin.com/in/… URL",
    urlExample: "https://www.linkedin.com/in/your-name",
    intro:
      "A LinkedIn QR code helps people connect with you in one scan at conferences, meetups, and client meetings — faster than spelling your name.",
    tips: [
      "Use your vanity URL (linkedin.com/in/you) when possible.",
      "Put the code on the back of your business card or name badge.",
      "Dynamic QR lets you swap between personal and company page later.",
    ],
    faqs: [
      {
        q: "Can I use it for a company page?",
        a: "Yes. Paste your company page URL instead of a personal profile.",
      },
      {
        q: "Does LinkedIn require a special QR format?",
        a: "No. A normal URL QR that points to your LinkedIn page is enough.",
      },
    ],
    relatedGuideSlug: "qr-code-for-linkedin",
  },
  {
    slug: "tiktok",
    name: "TikTok",
    category: "social",
    title: "How to Create a TikTok QR Code",
    description:
      "Generate a free TikTok QR code for your profile or video. Download PNG/SVG for packaging, posters, and stickers.",
    h1: "How to Create a TikTok QR Code",
    keywords: [
      "TikTok QR code",
      "QR code for TikTok",
      "TikTok profile QR code",
    ],
    urlHint: "Share profile or video → Copy link",
    urlExample: "https://www.tiktok.com/@yourusername",
    intro:
      "A TikTok QR code opens your profile or a specific video instantly. Use it on product packaging, event signage, and influencer collabs.",
    tips: [
      "Profile links are best for ongoing growth; video links are best for campaigns.",
      "Keep the code large enough on small packaging (at least ~2 cm / 0.8 in).",
      "Track campaign scans with a dynamic QR.",
    ],
    faqs: [
      {
        q: "Will it open the TikTok app?",
        a: "Usually yes when TikTok is installed. Otherwise it opens in the browser.",
      },
      {
        q: "Can I change which video it opens later?",
        a: "With a dynamic QR code you can update the destination without reprinting.",
      },
    ],
    relatedGuideSlug: "qr-code-for-tiktok",
  },
  {
    slug: "x-twitter",
    name: "X (Twitter)",
    category: "social",
    title: "How to Create an X (Twitter) QR Code",
    description:
      "Create a free QR code for your X (Twitter) profile or post. Share it on print materials and track scans with a dynamic link.",
    h1: "How to Create an X (Twitter) QR Code",
    keywords: [
      "Twitter QR code",
      "X QR code",
      "QR code for Twitter profile",
    ],
    urlHint: "Copy your profile URL from x.com",
    urlExample: "https://x.com/yourhandle",
    intro:
      "An X (Twitter) QR code sends scanners to your profile or a specific post. Handy for press kits, talks, and product launches.",
    tips: [
      "Use x.com/handle for profiles — it works across devices.",
      "For launches, link a pinned announcement post.",
      "Add your handle as a caption under the code.",
    ],
    faqs: [
      {
        q: "Should I use twitter.com or x.com?",
        a: "Either works; x.com is the current domain. Pick one and stick with it.",
      },
    ],
  },
  {
    slug: "pinterest",
    name: "Pinterest",
    category: "social",
    title: "How to Create a Pinterest QR Code",
    description:
      "Make a free Pinterest QR code for your profile, board, or pin. Ideal for magazines, packaging, and retail displays.",
    h1: "How to Create a Pinterest QR Code",
    keywords: ["Pinterest QR code", "QR code for Pinterest", "Pinterest board QR"],
    urlHint: "Open profile, board, or pin → Share → Copy link",
    urlExample: "https://www.pinterest.com/yourname/board-name/",
    intro:
      "A Pinterest QR code opens a board, pin, or profile so shoppers can save ideas without searching. Popular for home, fashion, and DIY brands.",
    tips: [
      "Board links work well for evergreen lookbooks.",
      "Use high-contrast codes on glossy packaging.",
      "Dynamic QR helps you rotate seasonal boards.",
    ],
    faqs: [
      {
        q: "Can I link to a single pin?",
        a: "Yes. Paste the pin URL so scanners land on that idea directly.",
      },
    ],
  },
  {
    slug: "snapchat",
    name: "Snapchat",
    category: "social",
    title: "How to Create a Snapchat QR Code",
    description:
      "Generate a free Snapchat QR / Snapcode-style link QR for your profile. Works with any phone camera, not just Snapchat’s scanner.",
    h1: "How to Create a Snapchat QR Code",
    keywords: ["Snapchat QR code", "Snapcode", "QR code for Snapchat"],
    urlHint: "Use your public profile or landing link if available",
    urlExample: "https://www.snapchat.com/add/yourusername",
    intro:
      "A standard Snapchat QR (URL) works with any camera — unlike Snapcodes that need the Snapchat app. Great for youth brands and campus events.",
    tips: [
      "Prefer snapchat.com/add/username links when possible.",
      "Explain “Open camera → scan” for people unfamiliar with Snap.",
      "Style the code in brand yellow/black carefully — keep contrast high.",
    ],
    faqs: [
      {
        q: "Is this a Snapcode?",
        a: "No. It’s a normal QR that opens your Snapchat add link. Snapcodes are Snapchat’s proprietary format.",
      },
    ],
  },
  {
    slug: "discord",
    name: "Discord",
    category: "social",
    title: "How to Create a Discord Invite QR Code",
    description:
      "Create a free Discord QR code that opens your server invite. Perfect for gaming communities, meetups, and creator events.",
    h1: "How to Create a Discord Invite QR Code",
    keywords: [
      "Discord QR code",
      "Discord invite QR",
      "QR code for Discord server",
    ],
    urlHint: "Server settings → Invites → Copy invite link",
    urlExample: "https://discord.gg/your-invite",
    intro:
      "A Discord invite QR code lets people join your server without typing a long code. Use it on stream overlays, posters, and merch.",
    tips: [
      "Set invite expiry and max uses in Discord before printing.",
      "Use a dynamic QR so you can replace expired invites without reprinting.",
      "Never put permanent admin invites on public posters.",
    ],
    faqs: [
      {
        q: "What if my invite expires?",
        a: "Create a new invite and update a dynamic QR destination, or reprint if you used a static code.",
      },
    ],
  },
  {
    slug: "telegram",
    name: "Telegram",
    category: "social",
    title: "How to Create a Telegram QR Code",
    description:
      "Make a free Telegram QR code for your channel, group, or username. Download PNG or SVG for print and digital use.",
    h1: "How to Create a Telegram QR Code",
    keywords: ["Telegram QR code", "QR code for Telegram", "Telegram channel QR"],
    urlHint: "t.me/username or invite link",
    urlExample: "https://t.me/yourchannel",
    intro:
      "A Telegram QR code opens your channel, group, or chat. Useful for community updates, local groups, and support lines.",
    tips: [
      "Public t.me/username links are easiest to maintain.",
      "Private invite links should be rotated if shared widely.",
      "Add a caption so people know what they’ll join.",
    ],
    faqs: [
      {
        q: "Can I track joins from the QR?",
        a: "Telegram doesn’t show QR-specific joins. Use a dynamic QR to count scans before they open Telegram.",
      },
    ],
  },
  {
    slug: "reddit",
    name: "Reddit",
    category: "social",
    title: "How to Create a Reddit QR Code",
    description:
      "Create a free Reddit QR code for a subreddit, post, or profile. Share community links on print and packaging.",
    h1: "How to Create a Reddit QR Code",
    keywords: ["Reddit QR code", "QR code for Reddit", "subreddit QR code"],
    urlHint: "Copy the reddit.com link for a subreddit or post",
    urlExample: "https://www.reddit.com/r/yoursubreddit",
    intro:
      "A Reddit QR code sends scanners to a subreddit, post, or profile — useful for community-led brands and AMA promotions.",
    tips: [
      "Link the subreddit for ongoing discovery, or a sticky post for campaigns.",
      "Test old.reddit and app deep links aren’t required — standard URLs work.",
    ],
    faqs: [
      {
        q: "Can I QR a single post?",
        a: "Yes. Paste the full post URL so scanners land on that thread.",
      },
    ],
  },
  {
    slug: "google-form",
    name: "Google Form",
    category: "forms",
    title: "How to Create a QR Code for a Google Form",
    description:
      "Turn any Google Form into a scannable QR code for surveys, RSVPs, waitlists, and feedback. Free PNG and SVG download.",
    h1: "How to Create a Google Form QR Code",
    keywords: [
      "Google Form QR code",
      "QR code for survey",
      "QR code for Google Forms",
      "feedback QR code",
    ],
    urlHint: "Form → Send → Link → Copy",
    urlExample: "https://docs.google.com/forms/d/e/FORM_ID/viewform",
    intro:
      "A Google Form QR code makes surveys and RSVPs frictionless — guests scan and answer on their phone. Ideal for events, classrooms, and storefront feedback.",
    tips: [
      "Shorten nothing critical — use the official docs.google.com link.",
      "Place codes near the call-to-action (“Scan to RSVP”).",
      "Dynamic QR helps if you swap forms between events.",
    ],
    faqs: [
      {
        q: "Can people fill the form offline?",
        a: "No. They need internet to open Google Forms. The QR only opens the link.",
      },
      {
        q: "How do I see who scanned vs who submitted?",
        a: "Dynamic QR analytics show scans; Google Forms shows submissions. They won’t match 1:1.",
      },
    ],
    relatedGuideSlug: "qr-code-for-google-form",
  },
  {
    slug: "typeform",
    name: "Typeform",
    category: "forms",
    title: "How to Create a Typeform QR Code",
    description:
      "Generate a free QR code for your Typeform survey or quiz. Great for events, onboarding, and lead capture.",
    h1: "How to Create a Typeform QR Code",
    keywords: ["Typeform QR code", "survey QR code", "quiz QR code"],
    urlHint: "Share panel → Copy link",
    urlExample: "https://form.typeform.com/to/abcdef",
    intro:
      "A Typeform QR code opens your survey or quiz instantly. Useful when you want a polished mobile form experience from print.",
    tips: [
      "Preview the form on mobile before printing the code.",
      "Use dynamic QR for multi-stop campaigns with different forms.",
    ],
    faqs: [
      {
        q: "Does the QR collect responses?",
        a: "No — Typeform collects responses. The QR only opens the form URL.",
      },
    ],
  },
  {
    slug: "microsoft-forms",
    name: "Microsoft Forms",
    category: "forms",
    title: "How to Create a Microsoft Forms QR Code",
    description:
      "Create a free QR code for a Microsoft Forms survey or quiz. Works well for schools, workplaces, and events.",
    h1: "How to Create a Microsoft Forms QR Code",
    keywords: [
      "Microsoft Forms QR code",
      "Office Forms QR",
      "survey QR code Microsoft",
    ],
    urlHint: "Collect responses → Copy link",
    urlExample: "https://forms.office.com/r/YourFormId",
    intro:
      "A Microsoft Forms QR code is perfect for internal surveys and classroom quizzes where people already use Microsoft accounts.",
    tips: [
      "Confirm the form allows anonymous responses if needed.",
      "Print larger codes for hallway posters.",
    ],
    faqs: [
      {
        q: "Do scanners need a Microsoft login?",
        a: "Only if you required sign-in in Forms settings. Otherwise anyone with the link can answer.",
      },
    ],
  },
  {
    slug: "app-store",
    name: "App Store",
    category: "apps",
    title: "How to Create an App Store QR Code (iOS)",
    description:
      "Make a free QR code that opens your iOS app on the Apple App Store. Ideal for packaging, ads, and event booths.",
    h1: "How to Create an App Store QR Code",
    keywords: [
      "App Store QR code",
      "iOS app QR code",
      "download app QR code",
    ],
    urlHint: "App Store Connect or public apps.apple.com link",
    urlExample: "https://apps.apple.com/app/id1234567890",
    intro:
      "An App Store QR code sends iPhone users straight to your app’s listing. Pair it with a Play Store code — or a smart landing page — for Android.",
    tips: [
      "Use the official apps.apple.com URL.",
      "For mixed audiences, link a landing page that detects device and redirects.",
      "Track installs separately in App Analytics; use dynamic QR for scan counts.",
    ],
    faqs: [
      {
        q: "What happens on Android?",
        a: "The App Store page may still open in a browser. Prefer a dual-link landing page for mixed traffic.",
      },
    ],
    relatedGuideSlug: "qr-code-for-app-download",
  },
  {
    slug: "google-play",
    name: "Google Play",
    category: "apps",
    title: "How to Create a Google Play QR Code",
    description:
      "Generate a free Google Play QR code so Android users can install your app in one scan.",
    h1: "How to Create a Google Play QR Code",
    keywords: [
      "Google Play QR code",
      "Android app QR code",
      "Play Store QR code",
    ],
    urlHint: "Play Console → store listing URL",
    urlExample: "https://play.google.com/store/apps/details?id=com.example.app",
    intro:
      "A Google Play QR code opens your Android app listing instantly. Use it on packaging, ads, and in-store displays.",
    tips: [
      "Use the full play.google.com details URL with your package id.",
      "Combine with an iOS App Store code or a smart landing page.",
    ],
    faqs: [
      {
        q: "Can one QR work for iOS and Android?",
        a: "Not with a single store URL. Link a landing page that detects the device, or print two codes.",
      },
    ],
    relatedGuideSlug: "qr-code-for-app-download",
  },
  {
    slug: "email-signature",
    name: "Email signature",
    category: "business",
    title: "How to Add a QR Code to Your Email Signature",
    description:
      "Create a free QR code for your email signature that opens your site, booking page, or vCard. Small PNG tips included.",
    h1: "How to Add a QR Code to Your Email Signature",
    keywords: [
      "email signature QR code",
      "QR code in email signature",
      "outlook signature QR",
    ],
    urlHint: "Use a short URL, booking link, or contact page",
    urlExample: "https://example.com/book",
    intro:
      "An email-signature QR code turns every outgoing message into a scannable CTA — book a call, save a contact, or visit your site.",
    tips: [
      "Keep the image small (≈100–130 px) so signatures stay tidy.",
      "PNG with transparent background works best in most clients.",
      "Link the image to the same URL for click + scan.",
    ],
    faqs: [
      {
        q: "Will it work in Gmail and Outlook?",
        a: "Yes if you embed a hosted or attached image. Some clients block images until the recipient allows them.",
      },
      {
        q: "What should the QR open?",
        a: "Common choices: calendar booking, website, LinkedIn, or a vCard contact page.",
      },
    ],
    relatedGuideSlug: "qr-code-for-email-signature",
  },
  {
    slug: "calendly",
    name: "Calendly",
    category: "business",
    title: "How to Create a Calendly QR Code",
    description:
      "Make a free Calendly QR code so people can book a meeting by scanning. Great for business cards and booths.",
    h1: "How to Create a Calendly QR Code",
    keywords: ["Calendly QR code", "booking QR code", "schedule meeting QR"],
    urlHint: "Copy your Calendly event link",
    urlExample: "https://calendly.com/yourname/30min",
    intro:
      "A Calendly QR code removes friction from booking — scan, pick a slot, done. Perfect for sales, recruiting, and consulting.",
    tips: [
      "Use an event-type link, not your home page, when you want a specific meeting length.",
      "Dynamic QR lets you change event types after printing cards.",
    ],
    faqs: [
      {
        q: "Can I track bookings from the QR?",
        a: "Calendly tracks bookings; a dynamic QR tracks scans. Use both for a full picture.",
      },
    ],
  },
  {
    slug: "zoom",
    name: "Zoom",
    category: "business",
    title: "How to Create a Zoom Meeting QR Code",
    description:
      "Create a free QR code that opens a Zoom meeting join link. Useful for classrooms, webinars, and hybrid events.",
    h1: "How to Create a Zoom Meeting QR Code",
    keywords: ["Zoom QR code", "Zoom meeting QR", "join Zoom QR code"],
    urlHint: "Copy the Join URL from your Zoom invite",
    urlExample: "https://zoom.us/j/1234567890",
    intro:
      "A Zoom QR code lets attendees join without typing long meeting IDs. Place it on slides, badges, and room signs.",
    tips: [
      "Prefer the full https://zoom.us/j/… link including passcode query if required.",
      "For recurring rooms, use a dynamic QR so you can rotate meeting IDs.",
      "Don’t print passcodes in huge text next to public codes unless intended.",
    ],
    faqs: [
      {
        q: "Does the QR include the password?",
        a: "Only if the join URL embeds it. Otherwise attendees may still need a passcode.",
      },
    ],
  },
  {
    slug: "google-maps",
    name: "Google Maps",
    category: "business",
    title: "How to Create a Google Maps QR Code",
    description:
      "Generate a free Google Maps QR code for your business location or directions. Perfect for flyers, packaging, and storefronts.",
    h1: "How to Create a Google Maps QR Code",
    keywords: [
      "Google Maps QR code",
      "location QR code",
      "directions QR code",
    ],
    urlHint: "Google Maps → Share → Copy link",
    urlExample: "https://maps.google.com/?q=Your+Business+Name",
    intro:
      "A Google Maps QR code opens your pin or directions in one scan. Ideal for weddings, pop-ups, and local businesses.",
    tips: [
      "Share a place link or directions link depending on your goal.",
      "Test walking vs driving directions before printing event materials.",
    ],
    faqs: [
      {
        q: "Can I use Plus Codes or coordinates?",
        a: "Yes. Any Maps URL that opens the right pin will work in a QR code.",
      },
    ],
  },
  {
    slug: "paypal",
    name: "PayPal",
    category: "business",
    title: "How to Create a PayPal Payment QR Code",
    description:
      "Create a free PayPal QR code that opens your payment or me link. Handy for markets, tips, and invoices.",
    h1: "How to Create a PayPal QR Code",
    keywords: ["PayPal QR code", "payment QR code", "PayPal.me QR"],
    urlHint: "Use paypal.me/you or a payment request link",
    urlExample: "https://www.paypal.me/yourname/10",
    intro:
      "A PayPal QR code speeds up payments at booths and events. Customers scan and pay without cash or card terminals.",
    tips: [
      "Include the amount in the link when you want a fixed price.",
      "Display your business name next to the code to prevent phishing fears.",
    ],
    faqs: [
      {
        q: "Is this the same as PayPal’s in-app QR?",
        a: "PayPal also generates native codes. A URL QR to paypal.me works universally with any camera.",
      },
    ],
  },
  {
    slug: "venmo",
    name: "Venmo",
    category: "business",
    title: "How to Create a Venmo QR Code",
    description:
      "Make a free Venmo QR code for tips and peer payments using your Venmo profile link.",
    h1: "How to Create a Venmo QR Code",
    keywords: ["Venmo QR code", "Venmo payment QR", "tip jar QR code"],
    urlHint: "Copy your Venmo profile payment link",
    urlExample: "https://venmo.com/u/YourName",
    intro:
      "A Venmo QR code is popular for tip jars, roommate payments, and small-business checkout in the US.",
    tips: [
      "Confirm the username on a test payment before printing.",
      "US-focused — have a backup method for international guests.",
    ],
    faqs: [
      {
        q: "Do scanners need the Venmo app?",
        a: "The link opens Venmo when installed, or the web flow otherwise (availability varies by region).",
      },
    ],
  },
  {
    slug: "real-estate",
    name: "Real estate listing",
    category: "print",
    title: "How to Create a QR Code for Real Estate Signs",
    description:
      "Add a free QR code to yard signs and flyers that opens your listing, tour video, or contact form.",
    h1: "How to Create a QR Code for Real Estate",
    keywords: [
      "real estate QR code",
      "QR code for yard sign",
      "property listing QR code",
    ],
    urlHint: "Listing URL, virtual tour, or landing page",
    urlExample: "https://example.com/listings/123-main-st",
    intro:
      "A real-estate QR code on a yard sign turns drive-by interest into listing views. Link photos, price, and a contact form without reprinting when details change — use a dynamic code.",
    tips: [
      "Always use a dynamic QR for listings that may change price or status.",
      "Make the code large and high-contrast for viewing from a car.",
      "Add “Scan for photos & details” so the action is obvious.",
    ],
    faqs: [
      {
        q: "Should I link Zillow or my own site?",
        a: "Either works. Your site lets you capture leads; portals are familiar. Dynamic QR lets you switch later.",
      },
    ],
    relatedGuideSlug: "qr-code-for-real-estate",
  },
  {
    slug: "product-packaging",
    name: "Product packaging",
    category: "print",
    title: "How to Put a QR Code on Product Packaging",
    description:
      "Add a scannable QR code to packaging for manuals, warranties, reorders, and brand stories. Print-size tips included.",
    h1: "How to Put a QR Code on Product Packaging",
    keywords: [
      "QR code on packaging",
      "product packaging QR code",
      "QR code for product label",
    ],
    urlHint: "Support page, manual PDF, reorder link, or brand story",
    urlExample: "https://example.com/products/sku-123/support",
    intro:
      "A packaging QR code connects physical products to digital help — manuals, how-to videos, warranties, and refill links — without crowding the label.",
    tips: [
      "Follow quiet-zone and minimum size rules for small labels.",
      "Prefer dynamic codes so support URLs can change after products ship.",
      "Don’t rely on ultra-fancy styling that lowers contrast.",
    ],
    faqs: [
      {
        q: "What size should a packaging QR be?",
        a: "As a rule of thumb, at least 2×2 cm (≈0.8 in) for close scans, larger if shoppers scan from farther away.",
      },
    ],
    relatedGuideSlug: "qr-code-for-product-packaging",
  },
  {
    slug: "resume",
    name: "Resume / CV",
    category: "print",
    title: "How to Add a QR Code to Your Resume",
    description:
      "Create a free resume QR code that opens your portfolio, LinkedIn, or PDF CV. Stand out in job applications.",
    h1: "How to Add a QR Code to Your Resume",
    keywords: [
      "resume QR code",
      "QR code on CV",
      "portfolio QR code",
    ],
    urlHint: "Portfolio, LinkedIn, or hosted PDF resume",
    urlExample: "https://yourname.dev",
    intro:
      "A resume QR code lets recruiters open your portfolio or LinkedIn without typing. Keep it subtle and professional.",
    tips: [
      "Link a personal site or LinkedIn — not a fragile file-sharing URL.",
      "Place it in a corner; don’t let it dominate the CV.",
      "Ensure the destination stays online for months after applying.",
    ],
    faqs: [
      {
        q: "Do recruiters actually scan resume QR codes?",
        a: "Some do, especially for design and tech roles. Always keep the URL printed as text too.",
      },
    ],
    relatedGuideSlug: "qr-code-for-resume",
  },
  {
    slug: "wedding",
    name: "Wedding",
    category: "print",
    title: "How to Create a Wedding QR Code (RSVP, Photos, Registry)",
    description:
      "Make free wedding QR codes for RSVPs, photo albums, livestreams, and registries. Beautiful branded downloads.",
    h1: "How to Create a Wedding QR Code",
    keywords: [
      "wedding QR code",
      "RSVP QR code",
      "wedding website QR",
    ],
    urlHint: "Wedding website, RSVP form, or album link",
    urlExample: "https://example.com/alex-and-jordan",
    intro:
      "Wedding QR codes replace awkward URL typing for RSVPs, schedules, and photo sharing. Guests scan from invitations and table cards.",
    tips: [
      "One primary wedding-site link is clearer than many codes.",
      "Use dynamic QR if vendors change galleries after the day.",
      "Match colors carefully — soft pastels need stronger contrast for scanning.",
    ],
    faqs: [
      {
        q: "Can I put a QR on formal invitations?",
        a: "Yes. Keep it elegant and add a short line like “Scan to RSVP.”",
      },
    ],
  },
  {
    slug: "menu-board",
    name: "Menu board",
    category: "print",
    title: "How to Create a QR Code for a Digital Menu Board",
    description:
      "Link a digital menu with a free QR code for cafés, food trucks, and restaurants. Update items without reprinting signs.",
    h1: "How to Create a Menu Board QR Code",
    keywords: [
      "menu board QR code",
      "digital menu QR",
      "food truck QR code",
    ],
    urlHint: "Hosted menu page or PDF",
    urlExample: "https://example.com/menu",
    intro:
      "A menu-board QR code is essential for food trucks and cafés that change specials often. Dynamic codes keep the printed sign valid.",
    tips: [
      "Host the menu on a fast mobile page.",
      "Update prices via dynamic destination instead of reprinting.",
    ],
    faqs: [
      {
        q: "Is this different from a table tent menu QR?",
        a: "Same idea — larger viewing distance on boards means a bigger printed code.",
      },
    ],
    relatedGuideSlug: "qr-code-for-restaurant-menu",
  },
  {
    slug: "nft",
    name: "NFT / digital collectible",
    category: "other",
    title: "How to Create a QR Code for an NFT or Collectible",
    description:
      "Link art drops and digital collectibles with a free QR code to your mint page or gallery.",
    h1: "How to Create an NFT QR Code",
    keywords: ["NFT QR code", "mint page QR code", "digital collectible QR"],
    urlHint: "Mint page, OpenSea item, or gallery URL",
    urlExample: "https://example.com/mint",
    intro:
      "An NFT or collectible QR code bridges physical merch and on-chain or gallery pages. Common on drop posters and packaging.",
    tips: [
      "Prefer your own landing page so you can change marketplaces later.",
      "Warn buyers about phishing — show your official domain next to the code.",
    ],
    faqs: [
      {
        q: "Can a QR store the NFT itself?",
        a: "No. It only opens a URL. The NFT lives on-chain or on the linked platform.",
      },
    ],
  },
  {
    slug: "github",
    name: "GitHub",
    category: "other",
    title: "How to Create a GitHub QR Code",
    description:
      "Create a free GitHub QR code for your profile, repo, or README. Great for talks, posters, and hackathons.",
    h1: "How to Create a GitHub QR Code",
    keywords: ["GitHub QR code", "repo QR code", "QR code for GitHub"],
    urlHint: "github.com/user or github.com/user/repo",
    urlExample: "https://github.com/vercel/next.js",
    intro:
      "A GitHub QR code sends developers to your profile or repository instantly — useful on conference slides and meetup stickers.",
    tips: [
      "Link the repo README for projects; profile for personal branding.",
      "Use high-contrast black codes on light slide backgrounds.",
    ],
    faqs: [
      {
        q: "Can I link to a specific file or release?",
        a: "Yes. Paste any public GitHub URL, including releases and docs pages.",
      },
    ],
  },
  {
    slug: "notion",
    name: "Notion",
    category: "other",
    title: "How to Create a Notion Page QR Code",
    description:
      "Make a free QR code that opens a public Notion page — wikis, menus, handbooks, and event briefs.",
    h1: "How to Create a Notion QR Code",
    keywords: ["Notion QR code", "QR code for Notion page"],
    urlHint: "Share → Copy link (page must be public or accessible)",
    urlExample: "https://username.notion.site/your-page",
    intro:
      "A Notion QR code is a flexible way to share living documents — handbooks, menus, and itineraries you can edit after printing.",
    tips: [
      "Confirm share permissions before printing.",
      "Dynamic QR helps if you migrate off Notion later.",
    ],
    faqs: [
      {
        q: "Will private Notion pages work?",
        a: "Only for people already logged in with access. Use public share links for open audiences.",
      },
    ],
  },
  {
    slug: "shopify",
    name: "Shopify store",
    category: "business",
    title: "How to Create a Shopify Store QR Code",
    description:
      "Create a free QR code for your Shopify store or product page. Drive offline traffic to checkout.",
    h1: "How to Create a Shopify QR Code",
    keywords: [
      "Shopify QR code",
      "product page QR code",
      "store QR code",
    ],
    urlHint: "Storefront or product URL",
    urlExample: "https://yourstore.myshopify.com/products/example",
    intro:
      "A Shopify QR code connects retail displays and packaging to your online product page — ideal for pop-ups and wholesale catalogs.",
    tips: [
      "Link the exact product for SKU-specific packaging.",
      "Use UTM parameters on the URL if you want campaign analytics in addition to QR scans.",
    ],
    faqs: [
      {
        q: "Can I track sales from the QR?",
        a: "Use UTM tags plus dynamic QR scan stats for a solid attribution combo.",
      },
    ],
  },
  {
    slug: "etsy",
    name: "Etsy",
    category: "business",
    title: "How to Create an Etsy Shop QR Code",
    description:
      "Generate a free Etsy QR code for your shop or listing. Perfect for craft fairs and packaging inserts.",
    h1: "How to Create an Etsy QR Code",
    keywords: ["Etsy QR code", "Etsy shop QR", "craft fair QR code"],
    urlHint: "Copy your shop or listing URL",
    urlExample: "https://www.etsy.com/shop/YourShop",
    intro:
      "An Etsy QR code helps craft-fair shoppers follow your store after they leave the booth.",
    tips: [
      "Shop URLs are best for brand growth; listing URLs for a hero product.",
      "Include a thank-you card with the code in every order.",
    ],
    faqs: [
      {
        q: "Can buyers favorite my shop from the QR?",
        a: "The QR opens the shop; they favorite from Etsy’s UI after signing in.",
      },
    ],
  },
  {
    slug: "amazon-product",
    name: "Amazon product",
    category: "business",
    title: "How to Create an Amazon Product QR Code",
    description:
      "Make a free QR code that opens your Amazon product listing. Useful for packaging, inserts, and ads.",
    h1: "How to Create an Amazon Product QR Code",
    keywords: [
      "Amazon QR code",
      "Amazon listing QR",
      "product ASIN QR code",
    ],
    urlHint: "Share the product page URL or Amazon Short URL",
    urlExample: "https://www.amazon.com/dp/B0EXAMPLE",
    intro:
      "An Amazon product QR code sends customers to your listing for reviews, reorders, and details you can’t fit on the box.",
    tips: [
      "Use your affiliate-compliant links only where allowed.",
      "Dynamic QR helps if ASINs or storefronts change.",
    ],
    faqs: [
      {
        q: "Can I link my Amazon Storefront?",
        a: "Yes. Paste the storefront URL instead of a single product when you want the full catalog.",
      },
    ],
  },
  {
    slug: "twitch",
    name: "Twitch",
    category: "social",
    title: "How to Create a Twitch QR Code",
    description:
      "Create a free Twitch QR code for your channel. Share it on panels, merch, and convention badges.",
    h1: "How to Create a Twitch QR Code",
    keywords: ["Twitch QR code", "Twitch channel QR", "streamer QR code"],
    urlHint: "twitch.tv/yourchannel",
    urlExample: "https://www.twitch.tv/yourchannel",
    intro:
      "A Twitch QR code helps IRL fans follow your channel without typing your handle — great for meetups and merch tables.",
    tips: [
      "Put the code on stream starting soon screens too.",
      "Track panel/merch scans with a dynamic QR.",
    ],
    faqs: [
      {
        q: "Can I link a specific clip or VOD?",
        a: "Yes. Use the clip or video URL for campaign-specific codes.",
      },
    ],
  },
  {
    slug: "soundcloud",
    name: "SoundCloud",
    category: "music",
    title: "How to Create a SoundCloud QR Code",
    description:
      "Generate a free SoundCloud QR code for a track, playlist, or profile. Share music from posters and cards.",
    h1: "How to Create a SoundCloud QR Code",
    keywords: ["SoundCloud QR code", "QR code for SoundCloud"],
    urlHint: "Copy track or profile share link",
    urlExample: "https://soundcloud.com/artist/track-name",
    intro:
      "A SoundCloud QR code is popular with DJs and indie artists who hand out cards at shows.",
    tips: [
      "Link a playlist for a fuller listening session.",
      "Test mobile playback before printing a big batch.",
    ],
    faqs: [
      {
        q: "Do private tracks work?",
        a: "Only if the share link allows access. Public tracks are safest for print.",
      },
    ],
  },
  {
    slug: "behance",
    name: "Behance",
    category: "other",
    title: "How to Create a Behance QR Code",
    description:
      "Make a free Behance QR code for your portfolio. Perfect for design résumés and exhibition tags.",
    h1: "How to Create a Behance QR Code",
    keywords: ["Behance QR code", "portfolio QR code Behance"],
    urlHint: "behance.net/yourname",
    urlExample: "https://www.behance.net/yourname",
    intro:
      "A Behance QR code lets clients open your portfolio during critiques, markets, and gallery shows.",
    tips: [
      "Feature your best project as the landing experience.",
      "Keep a backup personal-site link on the same card.",
    ],
    faqs: [
      {
        q: "Can I link a single project?",
        a: "Yes. Use the project URL when you want to highlight one case study.",
      },
    ],
  },
  {
    slug: "linktree",
    name: "Linktree",
    category: "social",
    title: "How to Create a Linktree QR Code",
    description:
      "Create a free QR code for your Linktree (or similar link-in-bio). One scan, many destinations.",
    h1: "How to Create a Linktree QR Code",
    keywords: [
      "Linktree QR code",
      "link in bio QR code",
      "bio link QR",
    ],
    urlHint: "Your linktr.ee URL",
    urlExample: "https://linktr.ee/yourname",
    intro:
      "A Linktree QR code is ideal when you want one printed code that offers shop, socials, and contact options.",
    tips: [
      "Keep the Linktree tidy — too many links reduce conversions.",
      "Dynamic QR + Linktree gives two layers of editability.",
    ],
    faqs: [
      {
        q: "Is Linktree required?",
        a: "No. Any link-in-bio or personal landing page works the same way.",
      },
    ],
  },
  {
    slug: "google-business",
    name: "Google Business Profile",
    category: "business",
    title: "How to Create a Google Business Profile QR Code",
    description:
      "Make a free QR code that opens your Google Business Profile — hours, directions, and reviews.",
    h1: "How to Create a Google Business Profile QR Code",
    keywords: [
      "Google Business QR code",
      "Google My Business QR",
      "GBP QR code",
    ],
    urlHint: "Share your Business Profile link from Maps or Search",
    urlExample: "https://maps.app.goo.gl/example",
    intro:
      "A Google Business Profile QR code helps customers find hours, directions, and reviews — and complements a dedicated review QR.",
    tips: [
      "For reviews specifically, use a review-link guide and URL.",
      "Place codes at the register and on receipts.",
    ],
    faqs: [
      {
        q: "How is this different from a review QR?",
        a: "A profile link shows your whole listing; a review link jumps to the write-a-review flow.",
      },
    ],
    relatedGuideSlug: "qr-code-for-google-reviews",
  },
  {
    slug: "eventbrite",
    name: "Eventbrite",
    category: "business",
    title: "How to Create an Eventbrite QR Code",
    description:
      "Create a free QR code for an Eventbrite event page so people can view details and register.",
    h1: "How to Create an Eventbrite QR Code",
    keywords: [
      "Eventbrite QR code",
      "event registration QR",
      "ticket page QR code",
    ],
    urlHint: "Copy your event page URL",
    urlExample: "https://www.eventbrite.com/e/example-tickets-123",
    intro:
      "An Eventbrite QR code on posters and flyers drives registrations without a long URL. For check-in tickets, see our event tickets guide.",
    tips: [
      "Update event details on Eventbrite; keep the same dynamic QR on print.",
      "Use UTM tags to measure flyer performance.",
    ],
    faqs: [
      {
        q: "Is this for check-in at the door?",
        a: "This opens the event page. Door check-in usually uses per-attendee ticket QR codes from Eventbrite.",
      },
    ],
    relatedGuideSlug: "qr-code-for-event-tickets",
  },
  {
    slug: "pdf-menu",
    name: "PDF document",
    category: "forms",
    title: "How to Create a QR Code That Opens a PDF",
    description:
      "Link any hosted PDF with a free QR code — menus, manuals, price lists, and brochures.",
    h1: "How to Create a QR Code for a PDF",
    keywords: ["PDF QR code", "QR code to PDF", "open PDF QR"],
    urlHint: "Direct HTTPS link to your PDF file",
    urlExample: "https://example.com/files/menu.pdf",
    intro:
      "A PDF QR code is the fastest way to distribute documents without email attachments. Host the file, then encode the URL.",
    tips: [
      "Host on HTTPS with a stable path.",
      "Use dynamic QR so you can replace the PDF without reprinting.",
    ],
    faqs: [
      {
        q: "Can the QR contain the PDF itself?",
        a: "Not practically for large files. Encode a URL to a hosted PDF instead.",
      },
    ],
    relatedGuideSlug: "qr-code-for-pdf",
  },
  {
    slug: "wifi-guest",
    name: "Guest WiFi page",
    category: "other",
    title: "How to Create a Guest WiFi QR Code",
    description:
      "Create a free WiFi QR code — or a Pro dynamic WiFi landing page with open tracking — for cafés, offices, and events.",
    h1: "How to Create a Guest WiFi QR Code",
    keywords: [
      "guest WiFi QR code",
      "WiFi QR code",
      "hotel WiFi QR",
    ],
    urlHint: "Use Studio WiFi type (SSID + password) or a dynamic WiFi page on Pro",
    urlExample: "WIFI:T:WPA;S:GuestNetwork;P:password;;",
    intro:
      "Guest WiFi QR codes remove password friction for visitors. Static WiFi codes connect directly; Pro dynamic WiFi pages add open tracking.",
    tips: [
      "Use WPA/WPA2 and avoid printing passwords in huge plaintext when possible.",
      "For analytics, use a Pro dynamic WiFi landing page.",
      "Rotate passwords periodically and update dynamic destinations.",
    ],
    faqs: [
      {
        q: "Can I see who connected?",
        a: "A static WiFi QR cannot report joins. A Pro dynamic WiFi page tracks page opens as a proxy for interest.",
      },
    ],
    relatedGuideSlug: "wifi-qr-code",
  },
];

export type QrPlatformSlug = (typeof qrPlatforms)[number]["slug"];

export function getQrPlatform(slug: string) {
  return qrPlatforms.find((p) => p.slug === slug);
}

export function qrPlatformsByCategory() {
  const map = new Map<QrPlatformCategory, QrPlatform[]>();
  for (const p of qrPlatforms) {
    const list = map.get(p.category) ?? [];
    list.push(p);
    map.set(p.category, list);
  }
  return map;
}

export const qrPlatformCategoryLabels: Record<QrPlatformCategory, string> = {
  social: "Social",
  music: "Music",
  business: "Business",
  forms: "Forms & surveys",
  apps: "Apps",
  print: "Print & packaging",
  other: "More",
};
