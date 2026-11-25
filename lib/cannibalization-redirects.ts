/**
 * Permanent consolidations for keyword cannibalization.
 * /qr-code-for/[platform] pages with a relatedGuideSlug → /guides/<slug>
 * Competing how-to blog posts → matching /guides/<slug>
 */
export const platformGuideRedirects: { source: string; destination: string }[] =
  [
    { source: "/qr-code-for/spotify", destination: "/guides/qr-code-for-spotify" },
    { source: "/qr-code-for/facebook", destination: "/guides/qr-code-for-facebook" },
    { source: "/qr-code-for/linkedin", destination: "/guides/qr-code-for-linkedin" },
    { source: "/qr-code-for/tiktok", destination: "/guides/qr-code-for-tiktok" },
    { source: "/qr-code-for/google-form", destination: "/guides/qr-code-for-google-form" },
    {
      source: "/qr-code-for/app-store",
      destination: "/guides/qr-code-for-app-download",
    },
    {
      source: "/qr-code-for/google-play",
      destination: "/guides/qr-code-for-app-download",
    },
    {
      source: "/qr-code-for/email-signature",
      destination: "/guides/qr-code-for-email-signature",
    },
    {
      source: "/qr-code-for/real-estate",
      destination: "/guides/qr-code-for-real-estate",
    },
    {
      source: "/qr-code-for/product-packaging",
      destination: "/guides/qr-code-for-product-packaging",
    },
    { source: "/qr-code-for/resume", destination: "/guides/qr-code-for-resume" },
    {
      source: "/qr-code-for/menu-board",
      destination: "/guides/qr-code-for-restaurant-menu",
    },
    {
      source: "/qr-code-for/google-business",
      destination: "/guides/qr-code-for-google-reviews",
    },
    {
      source: "/qr-code-for/eventbrite",
      destination: "/guides/qr-code-for-event-tickets",
    },
    { source: "/qr-code-for/pdf-menu", destination: "/guides/qr-code-for-pdf" },
    { source: "/qr-code-for/wifi-guest", destination: "/guides/wifi-qr-code" },
  ];

/** Blog posts that targeted the same primary query as an existing guide. */
export const blogGuideRedirects: { source: string; destination: string }[] = [
  {
    source: "/blog/linkedin-qr-code-guide",
    destination: "/guides/qr-code-for-linkedin",
  },
  {
    source: "/blog/youtube-qr-code-guide",
    destination: "/guides/qr-code-for-youtube",
  },
  {
    source: "/blog/qr-code-with-logo-guide",
    destination: "/guides/qr-code-with-logo",
  },
  {
    source: "/blog/how-to-generate-qr-code-for-facebook",
    destination: "/guides/qr-code-for-facebook",
  },
  {
    source: "/blog/how-to-make-qr-code-for-facebook-page",
    destination: "/guides/qr-code-for-facebook",
  },
  {
    source: "/blog/how-to-make-qr-code-for-instagram",
    destination: "/guides/qr-code-for-instagram",
  },
  {
    source: "/blog/how-to-make-whatsapp-qr-code",
    destination: "/guides/qr-code-for-whatsapp",
  },
  {
    source: "/blog/how-to-make-qr-code-for-tiktok",
    destination: "/guides/qr-code-for-tiktok",
  },
  {
    source: "/blog/how-to-make-qr-code-for-google-form",
    destination: "/guides/qr-code-for-google-form",
  },
  {
    source: "/blog/how-to-make-wifi-qr-code",
    destination: "/guides/wifi-qr-code",
  },
  {
    source: "/blog/how-to-make-qr-code-for-google-reviews",
    destination: "/guides/qr-code-for-google-reviews",
  },
  {
    source: "/blog/how-to-make-vcard-qr-code",
    destination: "/guides/vcard-qr-code",
  },
  {
    source: "/blog/how-to-make-qr-code-for-pdf",
    destination: "/guides/qr-code-for-pdf",
  },
  {
    source: "/blog/how-to-make-qr-code-business-card",
    destination: "/guides/qr-code-for-business-card",
  },
  {
    source: "/blog/how-to-make-qr-code-for-restaurant-menu",
    destination: "/guides/qr-code-for-restaurant-menu",
  },
];

export const cannibalizationRedirects = [
  ...platformGuideRedirects,
  ...blogGuideRedirects,
].map((r) => ({
  source: r.source,
  destination: r.destination,
  permanent: true as const, // 308 in Next.js App Router redirects
}));
