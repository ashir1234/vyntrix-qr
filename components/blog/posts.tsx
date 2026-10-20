import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function StaticQrPrivacyPost() {
  return (
    <article className="space-y-6 text-[var(--muted)] leading-relaxed">
      <p>
        Many QR generators claim to be “private.” Few explain what that means.
        On {siteConfig.name}, we draw a hard line:{" "}
        <strong className="text-[var(--foreground)]">
          static QR generation for one-off downloads runs in your browser
        </strong>
        . Dynamic codes are different by design — and we say so up front.
      </p>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        What “client-side” actually means
      </h2>
      <p>
        When you open the{" "}
        <Link href="/studio" className="text-[var(--brand-2)] underline">
          Studio
        </Link>
        , type a URL or WiFi password, style the code, and hit download, the
        payload is encoded locally. We do not need that content on our servers
        to produce a static PNG or SVG. Your logo for a static-only session also
        stays in the browser unless you save it with a dynamic design or cloud
        sync.
      </p>
      <p>
        That matters for cafés printing guest WiFi codes, freelancers sharing
        vCards, and anyone who does not want every draft URL logged by default.
      </p>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        What we store for dynamic QR codes
      </h2>
      <p>
        A{" "}
        <Link
          href="/guides/dynamic-qr-code"
          className="text-[var(--brand-2)] underline"
        >
          dynamic QR
        </Link>{" "}
        encodes a short link. To redirect scanners and show analytics, we must
        store the destination, account ownership, and scan events. That is not
        optional — it is how editable codes work. Free includes 1 dynamic code;
        Pro expands history, CSV export, and related tools. Details live in our{" "}
        <Link href="/privacy" className="text-[var(--brand-2)] underline">
          Privacy Policy
        </Link>
        .
      </p>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        A simple privacy workflow
      </h2>
      <ol className="list-decimal space-y-2 pl-5">
        <li>
          Use <strong className="text-[var(--foreground)]">static</strong> for
          permanent WiFi, vCard, or a URL that will never change — no account
          required.
        </li>
        <li>
          Use <strong className="text-[var(--foreground)]">dynamic</strong> only
          when you need edits or scan counts after print.
        </li>
        <li>
          Prefer guest networks and non-sensitive landing pages behind public
          codes.
        </li>
        <li>
          Read the cookie / ads notice if you browse on the free plan — Pro is
          ad-free when active.
        </li>
      </ol>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        Questions we get
      </h2>
      <p>
        “Does scanning tell you who I am?” Scan analytics for dynamic codes are
        aggregate (counts, coarse device/time signals) — not a dossier on every
        visitor. “Can I delete data?” Contact us via{" "}
        <Link href="/contact" className="text-[var(--brand-2)] underline">
          Contact
        </Link>{" "}
        or {siteConfig.emails.hello}.
      </p>
      <p>
        Privacy is a product choice, not a slogan. If a competitor will not
        explain static vs stored dynamics in plain language, treat that as a
        signal.
      </p>
    </article>
  );
}

export function PrintQrChecklistPost() {
  return (
    <article className="space-y-6 text-[var(--muted)] leading-relaxed">
      <p>
        Most “QR failed” reports are not generator bugs. They are print
        problems: too small, low contrast, missing quiet zone, or a soft PNG
        stretched onto a poster. Use this checklist before you approve a run.
      </p>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        1. Size for distance, not aesthetics
      </h2>
      <p>
        Use the ~10:1 rule (code width ≈ scan distance ÷ 10), then go larger if
        you have a logo, dense URL, or poor lighting. Full table:{" "}
        <Link
          href="/guides/qr-code-size-for-print"
          className="text-[var(--brand-2)] underline"
        >
          QR code size for print
        </Link>
        .
      </p>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        2. Export vector when you can
      </h2>
      <p>
        SVG scales cleanly. PNG is fine for digital or small print if you export
        at enough pixels for ~300 DPI at final size. Never upscale a tiny PNG
        for a window vinyl.
      </p>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        3. Protect contrast and quiet zone
      </h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>Dark modules on a light, solid pad — not on busy photography</li>
        <li>Empty margin of at least four modules on every side</li>
        <li>Beware glossy laminate glare under store lights</li>
      </ul>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        4. Logo discipline
      </h2>
      <p>
        Center marks only; never cover finder squares. Keep logos modest. See{" "}
        <Link
          href="/guides/qr-code-with-logo"
          className="text-[var(--brand-2)] underline"
        >
          QR with logo
        </Link>
        .
      </p>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        5. Proof on real phones
      </h2>
      <ol className="list-decimal space-y-2 pl-5">
        <li>Print one proof at final size (or a true-scale mock).</li>
        <li>Scan with iPhone and Android camera apps.</li>
        <li>Stand at the farthest expected distance.</li>
        <li>
          Confirm the destination — especially for{" "}
          <Link
            href="/guides/dynamic-qr-code"
            className="text-[var(--brand-2)] underline"
          >
            dynamic redirects
          </Link>
          .
        </li>
      </ol>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        Field failures we see often
      </h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>Business-card codes under 2 cm with heavy logos</li>
        <li>Menu codes printed in gold ink on dark stock</li>
        <li>Billboard codes sized for “design balance,” not viewing distance</li>
        <li>Static URLs that moved after 10,000 flyers shipped</li>
      </ul>
      <p>
        Create a print-ready file in the{" "}
        <Link href="/studio" className="text-[var(--brand-2)] underline">
          Studio
        </Link>
        , then treat the checklist as non-negotiable before press.
      </p>
    </article>
  );
}

export function StaticVsDynamicCostPost() {
  return (
    <article className="space-y-6 text-[var(--muted)] leading-relaxed">
      <p>
        Free static QR codes are genuinely free on {siteConfig.name}. The
        expensive part is rarely the generator — it is{" "}
        <strong className="text-[var(--foreground)]">reprinting</strong> when a
        URL, offer, or menu changes. That is when dynamic codes pay for
        themselves.
      </p>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        The hidden cost of “locked” print
      </h2>
      <p>
        A static code encodes the destination forever. If your campaign landing
        page moves, the printed square still points at the old URL. Packaging,
        window decals, and catalogs are the worst offenders: unit cost is low,
        change cost is high.
      </p>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        When static is still the right call
      </h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>Permanent personal site or company homepage</li>
        <li>
          Stable{" "}
          <Link
            href="/guides/wifi-qr-code"
            className="text-[var(--brand-2)] underline"
          >
            WiFi
          </Link>{" "}
          or{" "}
          <Link
            href="/guides/vcard-qr-code"
            className="text-[var(--brand-2)] underline"
          >
            vCard
          </Link>{" "}
          payloads
        </li>
        <li>Internal labels where analytics do not matter</li>
        <li>One-off events that will never be updated</li>
      </ul>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        When dynamic is cheaper than “free”
      </h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>Seasonal menus and promos</li>
        <li>Product packaging expected to last years</li>
        <li>Paid ads driving to a page you will iterate</li>
        <li>Any print run where a typo would force a reprint</li>
        <li>You need scan counts for a client report</li>
      </ul>
      <p>
        Compare models in{" "}
        <Link
          href="/guides/static-vs-dynamic-qr-code"
          className="text-[var(--brand-2)] underline"
        >
          static vs dynamic
        </Link>{" "}
        and{" "}
        <Link href="/pricing" className="text-[var(--brand-2)] underline">
          Pricing
        </Link>
        . Free includes 1 dynamic code to prove the workflow; Pro ($12/mo)
        unlocks unlimited dynamics, CSV, projects, and print pack.
      </p>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        A 60-second decision
      </h2>
      <ol className="list-decimal space-y-2 pl-5">
        <li>Could the destination change in 12 months?</li>
        <li>Would a reprint cost more than a year of Pro?</li>
        <li>Do you need scan numbers?</li>
      </ol>
      <p>
        Two or more “yes” answers → start dynamic. Otherwise ship a clean static
        code from the{" "}
        <Link href="/studio" className="text-[var(--brand-2)] underline">
          Studio
        </Link>{" "}
        and move on.
      </p>
    </article>
  );
}

export function ErrorCorrectionLogosPost() {
  return (
    <article className="space-y-6 text-[var(--muted)] leading-relaxed">
      <p>
        Pretty QR codes fail for a boring reason: scanners need enough intact
        modules to reconstruct the payload. Logos, gradients, and fancy frames
        remove or obscure those modules. Error correction is the safety net —
        and it has limits.
      </p>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        What error correction actually does
      </h2>
      <p>
        QR codes include redundant data so a damaged or partially covered code
        can still decode. Levels (roughly L → H) trade density for resilience.
        When you drop a logo in the center, you are deliberately covering
        modules; higher error correction compensates. That is why{" "}
        <Link href="/studio" className="text-[var(--brand-2)] underline">
          {siteConfig.name} Studio
        </Link>{" "}
        raises correction when a logo is present.
      </p>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        Why “more design” often means “larger print”
      </h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>Higher correction makes denser patterns — small cards struggle.</li>
        <li>Long URLs already use more modules; logos pile on risk.</li>
        <li>
          Low contrast (light brand colors on cream stock) wastes the correction
          budget on lighting problems instead of the logo.
        </li>
      </ul>
      <p>
        Practical fix: keep logos modest (roughly 15–30% of the area), never
        cover finder squares, and follow{" "}
        <Link
          href="/guides/qr-code-with-logo"
          className="text-[var(--brand-2)] underline"
        >
          logo guidelines
        </Link>{" "}
        plus{" "}
        <Link
          href="/guides/qr-code-size-for-print"
          className="text-[var(--brand-2)] underline"
        >
          print sizing
        </Link>
        .
      </p>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        A short decision tree
      </h2>
      <ol className="list-decimal space-y-2 pl-5">
        <li>
          Under 2 cm on a business card? Skip the logo or use a tiny monochrome
          mark.
        </li>
        <li>
          Packaging or poster with room? Logo is fine — proof on the real
          substrate.
        </li>
        <li>
          Destination might change? Put branding on a{" "}
          <Link
            href="/guides/dynamic-qr-code"
            className="text-[var(--brand-2)] underline"
          >
            dynamic
          </Link>{" "}
          short link so you do not reprint when the URL moves.
        </li>
      </ol>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        Field failures we still see
      </h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>Full-bleed photos behind the code with no solid pad</li>
        <li>Metallic ink without a white underlay</li>
        <li>Corner logos that eat a finder pattern</li>
        <li>Screen preview that works; laminated proof that does not</li>
      </ul>
      <p>
        Design for the camera first, the brand second. A scannable plain code
        beats a beautiful square nobody can open.
      </p>
    </article>
  );
}

export function SmallBusinessQrPlaybookPost() {
  return (
    <article className="space-y-6 text-[var(--muted)] leading-relaxed">
      <p>
        Small businesses do not need twenty QR codes. They need a few that do
        clear jobs: reviews, menus, WiFi, WhatsApp, and the occasional promo.
        This playbook is the stack we recommend when someone asks “where should
        I start?”
      </p>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        The core five
      </h2>
      <ol className="list-decimal space-y-3 pl-5">
        <li>
          <Link
            href="/guides/qr-code-for-google-reviews"
            className="text-[var(--brand-2)] underline"
          >
            Google review QR
          </Link>{" "}
          on receipts or the counter — ask honestly, never incentivize.
        </li>
        <li>
          <Link
            href="/guides/qr-code-for-restaurant-menu"
            className="text-[var(--brand-2)] underline"
          >
            Menu QR
          </Link>{" "}
          (or service list) on a{" "}
          <strong className="text-[var(--foreground)]">dynamic</strong> link so
          prices can change.
        </li>
        <li>
          <Link
            href="/guides/wifi-qr-code"
            className="text-[var(--brand-2)] underline"
          >
            Guest WiFi QR
          </Link>{" "}
          at the entrance — static is fine if the password is stable.
        </li>
        <li>
          <Link
            href="/guides/qr-code-for-whatsapp"
            className="text-[var(--brand-2)] underline"
          >
            WhatsApp click-to-chat
          </Link>{" "}
          for support or bookings.
        </li>
        <li>
          One social profile QR (often{" "}
          <Link
            href="/guides/qr-code-for-instagram"
            className="text-[var(--brand-2)] underline"
          >
            Instagram
          </Link>
          ) on packaging or the window.
        </li>
      </ol>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        Placement beats perfection
      </h2>
      <p>
        A good-enough code at the payment counter outperforms a perfect SVG that
        lives only in a brand deck. Caption every code (“Scan for today’s
        menu”). Size for distance. Proof on iPhone and Android under real
        lights — details in our{" "}
        <Link
          href="/blog/print-qr-codes-that-scan"
          className="text-[var(--brand-2)] underline"
        >
          print checklist
        </Link>
        .
      </p>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        When to pay for dynamic
      </h2>
      <p>
        Free static codes on {siteConfig.name} cover WiFi and permanent links.
        Pay for dynamic (or use the free single dynamic slot) when print is
        expensive to replace — menus, packaging, window vinyl. See{" "}
        <Link
          href="/blog/static-vs-dynamic-qr-cost"
          className="text-[var(--brand-2)] underline"
        >
          when free codes become expensive
        </Link>{" "}
        and{" "}
        <Link href="/pricing" className="text-[var(--brand-2)] underline">
          Pricing
        </Link>
        .
      </p>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        A one-afternoon rollout
      </h2>
      <ol className="list-decimal space-y-2 pl-5">
        <li>Create the five codes in the Studio.</li>
        <li>Print one proof sheet; test scans.</li>
        <li>Laminate table/counter versions.</li>
        <li>Train staff on the one-line ask for reviews.</li>
        <li>Revisit destinations monthly if they are dynamic.</li>
      </ol>
      <p>
        That is enough for most cafés, clinics, salons, and shops. Add{" "}
        <Link
          href="/guides/vcard-qr-code"
          className="text-[var(--brand-2)] underline"
        >
          vCard
        </Link>{" "}
        or{" "}
        <Link
          href="/guides/qr-code-for-business-card"
          className="text-[var(--brand-2)] underline"
        >
          business-card
        </Link>{" "}
        codes only when networking is part of the job.
      </p>
    </article>
  );
}

export function FinishTheQrWorkflowPost() {
  return (
    <article className="space-y-6 text-[var(--muted)] leading-relaxed">
      <p>
        Most QR tools lose people between “looks cool” and “printed and
        working.” We built {siteConfig.name} around finishing the job: pick a
        type, brand it, preview, download, and — if needed — keep a dynamic link
        you can still edit next month.
      </p>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        The drop-off points
      </h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>Watermarks that force an upgrade after the design is done</li>
        <li>No SVG, so the print shop softens a tiny PNG</li>
        <li>Unclear Free vs Pro for dynamic analytics</li>
        <li>No path from “I printed this” back to “I need to change the URL”</li>
      </ul>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        What we optimize for instead
      </h2>
      <p>
        Unlimited static codes with no watermark. Logo and color tools with live
        2D/3D preview. Honest limits: one free dynamic code to learn the
        workflow; Pro when you outgrow it. Privacy spelled out — static in the
        browser, dynamics stored for redirects (
        <Link
          href="/blog/static-qr-privacy-in-the-browser"
          className="text-[var(--brand-2)] underline"
        >
          privacy post
        </Link>
        ).
      </p>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        A finish-line checklist
      </h2>
      <ol className="list-decimal space-y-2 pl-5">
        <li>
          Open{" "}
          <Link href="/studio" className="text-[var(--brand-2)] underline">
            Studio
          </Link>{" "}
          and choose the right type (URL, WiFi, vCard, …).
        </li>
        <li>Decide static vs dynamic before you fall in love with the art.</li>
        <li>Export SVG for print; PNG for digital.</li>
        <li>Scan a proof from the farthest expected distance.</li>
        <li>Save manage access if the code is dynamic.</li>
        <li>
          Bookmark{" "}
          <Link href="/guides" className="text-[var(--brand-2)] underline">
            guides
          </Link>{" "}
          for the next use case instead of starting from zero.
        </li>
      </ol>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        Who this is for
      </h2>
      <p>
        Freelancers, café owners, marketers, and anyone who needs a code that
        still works after the meeting ends. If you only need a disposable square
        for a slide deck, any generator will do. If you ship physical materials,{" "}
        finishing the workflow matters more than another skin for the modules.
      </p>
      <p>
        Questions?{" "}
        <Link href="/contact" className="text-[var(--brand-2)] underline">
          Contact
        </Link>{" "}
        {siteConfig.parentCompany.name} at {siteConfig.emails.hello}.
      </p>
    </article>
  );
}

export function YouTubeQrCodeGuidePost() {
  return (
    <article className="space-y-6 text-[var(--muted)] leading-relaxed">
      <p>
        YouTube is the second-largest search engine, and plenty of physical
        materials — product packaging, event posters, business cards, merch,
        trade-show banners — would benefit from a direct link into it. A{" "}
        <strong className="text-[var(--foreground)]">YouTube QR code</strong>{" "}
        lets someone scan once and land on your channel, a specific video, a
        Shorts compilation, or a playlist — without typing a single character.
      </p>
      <p>
        This guide covers the link types YouTube offers (channel, video, Short,
        playlist), the <code className="text-[var(--foreground)] bg-[var(--surface)] px-1 rounded">?sub_confirmation=1</code>{" "}
        subscribe prompt trick, when to use static vs dynamic codes, a
        print-ready checklist, and placement ideas — packaging, posters, merch,
        event badges, and business cards.
      </p>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        YouTube link types: what to encode
      </h2>
      <p>
        YouTube supports several URL formats. Pick the one that matches your
        goal, then paste it into the{" "}
        <Link href="/studio" className="text-[var(--brand-2)] underline">
          {siteConfig.name} Studio
        </Link>{" "}
        URL field.
      </p>

      <h3 className="text-xl font-semibold text-[var(--foreground)] mt-4">
        Channel URL
      </h3>
      <p>
        A channel link shows your full page — all uploads, playlists, community
        posts, and the Subscribe button. Use it for brand awareness, creator
        networking, or anywhere the goal is &quot;follow me here.&quot; Formats:
      </p>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <code className="text-[var(--foreground)] bg-[var(--surface)] px-1 rounded">
            https://youtube.com/@YourHandle
          </code>{" "}
          — the modern handle format (preferred)
        </li>
        <li>
          <code className="text-[var(--foreground)] bg-[var(--surface)] px-1 rounded">
            https://youtube.com/c/YourChannel
          </code>{" "}
          — legacy custom URL (still works, but avoid for new materials)
        </li>
        <li>
          <code className="text-[var(--foreground)] bg-[var(--surface)] px-1 rounded">
            https://youtube.com/channel/UC...
          </code>{" "}
          — internal channel ID link (works but not human-readable)
        </li>
      </ul>
      <p className="mt-4">
        <strong className="text-[var(--foreground)]">Finding your URL:</strong>{" "}
        Open your YouTube channel page in a browser, copy the address bar. If
        you have a custom handle, it will be <code className="text-[var(--foreground)] bg-[var(--surface)] px-1 rounded">@YourHandle</code>. If not, consider
        claiming one in YouTube Studio → Customization → Basic info.
      </p>

      <h3 className="text-xl font-semibold text-[var(--foreground)] mt-4">
        Video URL
      </h3>
      <p>
        A single-video link lands viewers directly on that video. Great for
        product demos, tutorials referenced on packaging, or highlight reels.
        YouTube offers two share formats:
      </p>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <code className="text-[var(--foreground)] bg-[var(--surface)] px-1 rounded">
            https://youtu.be/VIDEO_ID
          </code>{" "}
          — short share link (slightly simpler QR pattern)
        </li>
        <li>
          <code className="text-[var(--foreground)] bg-[var(--surface)] px-1 rounded">
            https://youtube.com/watch?v=VIDEO_ID
          </code>{" "}
          — full URL
        </li>
      </ul>
      <p className="mt-4">
        To get either: open the video → click Share → copy the link. Both work;
        the short link produces a marginally simpler QR code, but the
        difference is small.
      </p>
      <p className="mt-2">
        <strong className="text-[var(--foreground)]">Timestamp links:</strong>{" "}
        Append <code className="text-[var(--foreground)] bg-[var(--surface)] px-1 rounded">?t=90s</code> or{" "}
        <code className="text-[var(--foreground)] bg-[var(--surface)] px-1 rounded">&amp;t=2m30s</code> to start playback
        at a specific moment. Useful for conference handouts or printed guides
        that reference one segment of a longer recording.
      </p>

      <h3 className="text-xl font-semibold text-[var(--foreground)] mt-4">
        YouTube Shorts URL
      </h3>
      <p>
        Shorts have their own URL format:{" "}
        <code className="text-[var(--foreground)] bg-[var(--surface)] px-1 rounded">
          https://youtube.com/shorts/VIDEO_ID
        </code>
        . On mobile, this opens the Shorts player (vertical feed). Use it when
        the Short is the primary content — quick tips, product teasers, or
        behind-the-scenes clips on packaging.
      </p>

      <h3 className="text-xl font-semibold text-[var(--foreground)] mt-4">
        Playlist URL
      </h3>
      <p>
        Playlists work well for course modules, album tracks, event session
        archives, or a &quot;best of&quot; reel. Format:
      </p>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <code className="text-[var(--foreground)] bg-[var(--surface)] px-1 rounded">
            https://youtube.com/playlist?list=PL...
          </code>
        </li>
      </ul>
      <p className="mt-4">
        A playlist QR makes sense when a single video would feel incomplete —
        workshop series, multi-part tutorials, or conference recordings. If the
        playlist evolves, a{" "}
        <Link
          href="/guides/dynamic-qr-code"
          className="text-[var(--brand-2)] underline"
        >
          dynamic QR code
        </Link>{" "}
        lets you swap the destination later without reprinting.
      </p>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        The subscribe prompt: ?sub_confirmation=1
      </h2>
      <p>
        You may have seen URLs with{" "}
        <code className="text-[var(--foreground)] bg-[var(--surface)] px-1 rounded">?sub_confirmation=1</code> appended
        to the channel link. When a viewer opens this link, YouTube displays a
        pop-up asking them to confirm a subscription.{" "}
        <strong className="text-[var(--foreground)]">
          It does not auto-subscribe anyone.
        </strong>{" "}
        Viewers still tap &quot;Subscribe&quot; themselves. The prompt simply
        surfaces the action immediately instead of leaving the button in the
        header.
      </p>
      <p>
        Example:{" "}
        <code className="text-[var(--foreground)] bg-[var(--surface)] px-1 rounded">
          https://youtube.com/@YourHandle?sub_confirmation=1
        </code>
      </p>
      <p className="mt-4">
        Use this when your explicit goal is subscriber growth — merch inserts,
        giveaway posters, post-event thank-you cards. Avoid it if the code
        should land on a single video or playlist (the prompt only works on
        channel pages). Keep expectations realistic: the bump comes from making
        the ask obvious, not from any automation.
      </p>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        Static vs dynamic: which to choose
      </h2>
      <p>
        A{" "}
        <strong className="text-[var(--foreground)]">static QR code</strong>{" "}
        encodes the destination URL directly. Once printed, it points there
        forever — no account required, no tracking. A{" "}
        <strong className="text-[var(--foreground)]">dynamic QR code</strong>{" "}
        encodes a short redirect URL that you can update anytime, plus you get
        scan counts.
      </p>

      <h3 className="text-xl font-semibold text-[var(--foreground)] mt-4">
        When static is fine
      </h3>
      <ul className="list-disc space-y-2 pl-5">
        <li>Linking to your stable channel URL that will not change</li>
        <li>A &quot;How to assemble&quot; video on permanent product packaging</li>
        <li>One-off event badges where you do not need scan analytics</li>
        <li>Personal business cards with a channel link you control</li>
      </ul>

      <h3 className="text-xl font-semibold text-[var(--foreground)] mt-4">
        When dynamic is worth it
      </h3>
      <ul className="list-disc space-y-2 pl-5">
        <li>Seasonal campaign posters where the featured video changes</li>
        <li>Trade-show booths where you want per-event scan numbers</li>
        <li>Product packaging on long-lived retail shelves — the code can be updated remotely if a video is deleted or replaced</li>
        <li>Merch runs where you may want to redirect to a playlist or different video later</li>
        <li>You want to A/B test whether a Shorts link or a full video converts better</li>
      </ul>
      <p className="mt-4">
        Read{" "}
        <Link
          href="/blog/static-vs-dynamic-qr-cost"
          className="text-[var(--brand-2)] underline"
        >
          when free QR codes become expensive
        </Link>{" "}
        for the full cost comparison.{" "}
        <Link href="/pricing" className="text-[var(--brand-2)] underline">
          Free
        </Link>{" "}
        includes 1 dynamic code to test the workflow; Pro ($12/month) unlocks
        unlimited dynamics, full scan history, and CSV export.
      </p>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        Creating your YouTube QR code
      </h2>
      <ol className="list-decimal space-y-3 pl-5">
        <li>
          Open the{" "}
          <Link href="/studio" className="text-[var(--brand-2)] underline">
            {siteConfig.name} Studio
          </Link>{" "}
          and select the URL content type.
        </li>
        <li>
          Paste your YouTube link — channel, video, Short, or playlist. Add{" "}
          <code className="text-[var(--foreground)] bg-[var(--surface)] px-1 rounded">?sub_confirmation=1</code> if you want
          the subscribe prompt on a channel link.
        </li>
        <li>
          Decide static vs dynamic. Static is instant, no account. Dynamic
          requires sign-in but lets you track scans and change the destination.
        </li>
        <li>
          In the Design tab, adjust colors. YouTube&apos;s red works well as an
          accent, but keep modules dark and the background light for reliable
          scans. Optional: add a small logo (see{" "}
          <Link
            href="/blog/error-correction-logos-pretty-qr-fail"
            className="text-[var(--brand-2)] underline"
          >
            error correction and logos
          </Link>
          ).
        </li>
        <li>
          Scan-test with your phone camera to confirm the link opens correctly.
        </li>
        <li>
          Download: PNG for digital use, SVG for print. The Studio exports both
          free and without watermark.
        </li>
      </ol>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        Print &amp; scan checklist
      </h2>
      <p>
        QR codes fail silently — they look fine until nobody can open them. Run
        through this checklist before you commit to print. (Full details in our{" "}
        <Link
          href="/blog/print-qr-codes-that-scan"
          className="text-[var(--brand-2)] underline"
        >
          print checklist
        </Link>
        .)
      </p>
      <ol className="list-decimal space-y-2 pl-5">
        <li>
          <strong className="text-[var(--foreground)]">Size for distance:</strong>{" "}
          Code width ≈ expected scan distance ÷ 10. A poster viewed from 2 m
          needs at least 20 cm; a business card held at arm&apos;s length
          (30 cm) needs at least 2 cm — more if you add a logo.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Contrast:</strong> Dark
          modules on a light, solid background. Avoid placing codes over photos
          without a white pad underneath.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Quiet zone:</strong>{" "}
          Leave at least 4 modules of empty margin around the code.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Export vector for large formats:</strong>{" "}
          SVG scales cleanly; a 300-pixel PNG stretched onto a banner will blur.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Proof on real phones:</strong>{" "}
          Print one sample at final size, scan with both iPhone and Android
          camera apps, under realistic lighting.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Watch for glare:</strong>{" "}
          Glossy laminate under bright retail lights can blind the camera.
          Matte finishes scan more reliably.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Label the code:</strong>{" "}
          &quot;Scan to watch&quot; or &quot;Subscribe on YouTube&quot; tells
          people what happens before they raise their phone.
        </li>
      </ol>
      <p className="mt-4">
        See{" "}
        <Link
          href="/guides/qr-code-size-for-print"
          className="text-[var(--brand-2)] underline"
        >
          QR code size for print
        </Link>{" "}
        for a full distance → size table.
      </p>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        Where to place YouTube QR codes
      </h2>
      <p>
        A YouTube link adds value wherever printed materials benefit from video
        context. Here are the most common placements:
      </p>

      <h3 className="text-xl font-semibold text-[var(--foreground)] mt-4">
        Product packaging
      </h3>
      <p>
        Link to setup tutorials, how-to videos, or an unboxing reel. This
        reduces support queries and improves customer experience. Place the
        code where it&apos;s visible after unboxing (inside flap or quick-start
        card) and where it will not be creased or taped over. Use a{" "}
        <Link
          href="/guides/dynamic-qr-code"
          className="text-[var(--brand-2)] underline"
        >
          dynamic code
        </Link>{" "}
        if the product has a long shelf life and the video might be replaced.
      </p>

      <h3 className="text-xl font-semibold text-[var(--foreground)] mt-4">
        Posters and flyers
      </h3>
      <p>
        Music releases, film trailers, event promos — posters are a natural fit.
        Size the code generously (remember the 10:1 rule) and place it in a
        lower corner so phones can reach it without obscuring the headline.
        Dynamic codes let you swap the featured video between tour legs or
        release phases.
      </p>

      <h3 className="text-xl font-semibold text-[var(--foreground)] mt-4">
        Merch and apparel
      </h3>
      <p>
        Hangtags, inner labels, or even printed directly on packaging can link
        fans to exclusive content. Keep codes small but functional — test on
        the actual fabric or tag stock. A channel link with{" "}
        <code className="text-[var(--foreground)] bg-[var(--surface)] px-1 rounded">?sub_confirmation=1</code> works well
        here: buyers already like your brand, so nudging a subscription is
        reasonable.
      </p>

      <h3 className="text-xl font-semibold text-[var(--foreground)] mt-4">
        Events and conferences
      </h3>
      <p>
        Session slides, badge inserts, signage, and workshop handouts can all
        link to session recordings or speaker channels. A dynamic code per event
        lets you track scans by conference. Our{" "}
        <Link
          href="/blog/linkedin-qr-code-guide"
          className="text-[var(--brand-2)] underline"
        >
          LinkedIn QR guide
        </Link>{" "}
        covers badge-sizing tips that apply here too.
      </p>

      <h3 className="text-xl font-semibold text-[var(--foreground)] mt-4">
        Business cards
      </h3>
      <p>
        Creators, agencies, and video-production professionals can replace a
        plain portfolio link with a channel QR. Follow the{" "}
        <Link
          href="/guides/qr-code-for-business-card"
          className="text-[var(--brand-2)] underline"
        >
          business card QR guide
        </Link>{" "}
        for sizing (at least 2 cm on a standard 85 × 55 mm card) and contrast.
        Consider adding a{" "}
        <Link
          href="/guides/vcard-qr-code"
          className="text-[var(--brand-2)] underline"
        >
          vCard QR
        </Link>{" "}
        on the other side for instant contact save.
      </p>

      <h3 className="text-xl font-semibold text-[var(--foreground)] mt-4">
        Educational materials
      </h3>
      <p>
        Textbooks, syllabi, posters, and lab guides can link to lecture
        recordings or demonstration videos. Playlists are especially useful for
        courses with multiple modules.
      </p>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        Common mistakes to avoid
      </h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong className="text-[var(--foreground)]">Linking to unlisted or private videos:</strong>{" "}
          Scanners without the link permission see an error. Double-check
          visibility in YouTube Studio.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Claiming ?sub_confirmation=1 auto-subscribes:</strong>{" "}
          It does not. Viewers still tap Subscribe. Overpromising annoys them.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Using a video you plan to delete:</strong>{" "}
          If you will remove the video after a campaign, use a dynamic code so
          you can redirect to a replacement.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Ignoring mobile-first experience:</strong>{" "}
          QR scans come from phones. Make sure the video plays well on
          mobile — vertical crops for Shorts, subtitles if viewers are in
          public with sound off.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Tiny codes with heavy logos:</strong>{" "}
          Logos eat into error-correction budget. On a small tag, skip the
          logo or use a minimal monochrome mark.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">No call to action:</strong>{" "}
          A bare square with no label is mysterious. &quot;Watch the demo&quot;
          or &quot;Subscribe on YouTube&quot; sets expectations.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Printing static when dynamic would save a reprint:</strong>{" "}
          If the destination might change and the print run is expensive,
          dynamic codes are cheaper than reprinting. See{" "}
          <Link
            href="/blog/static-vs-dynamic-qr-cost"
            className="text-[var(--brand-2)] underline"
          >
            when free codes become expensive
          </Link>
          .
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Skipping the proof scan:</strong>{" "}
          Always test at final size, on the actual stock, with real phones.
          What looks fine on screen may fail on glossy paper under store lights.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        Quick reference: YouTube URL types
      </h2>
      <div className="overflow-x-auto mt-4">
        <table className="w-full text-sm border border-[var(--border)] rounded-lg">
          <thead className="bg-[var(--surface)]">
            <tr>
              <th className="text-left p-3 font-semibold text-[var(--foreground)]">Type</th>
              <th className="text-left p-3 font-semibold text-[var(--foreground)]">URL Format</th>
              <th className="text-left p-3 font-semibold text-[var(--foreground)]">Best For</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            <tr>
              <td className="p-3">Channel</td>
              <td className="p-3 font-mono text-xs">youtube.com/@Handle</td>
              <td className="p-3">Brand awareness, subscriptions</td>
            </tr>
            <tr>
              <td className="p-3">Channel + subscribe prompt</td>
              <td className="p-3 font-mono text-xs">youtube.com/@Handle?sub_confirmation=1</td>
              <td className="p-3">Subscriber-growth campaigns</td>
            </tr>
            <tr>
              <td className="p-3">Video</td>
              <td className="p-3 font-mono text-xs">youtu.be/VIDEO_ID</td>
              <td className="p-3">Single tutorial, demo, announcement</td>
            </tr>
            <tr>
              <td className="p-3">Video + timestamp</td>
              <td className="p-3 font-mono text-xs">youtu.be/VIDEO_ID?t=90s</td>
              <td className="p-3">Highlighting one segment</td>
            </tr>
            <tr>
              <td className="p-3">Short</td>
              <td className="p-3 font-mono text-xs">youtube.com/shorts/VIDEO_ID</td>
              <td className="p-3">Vertical teasers, quick tips</td>
            </tr>
            <tr>
              <td className="p-3">Playlist</td>
              <td className="p-3 font-mono text-xs">youtube.com/playlist?list=PL...</td>
              <td className="p-3">Courses, albums, archives</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        Wrapping up
      </h2>
      <p>
        A YouTube QR code turns packaging, posters, badges, and merch into video
        gateways. Pick the right link type — channel for subscriptions, video
        for single destinations, playlist for series. Add{" "}
        <code className="text-[var(--foreground)] bg-[var(--surface)] px-1 rounded">?sub_confirmation=1</code> if you want
        the subscribe prompt, but set honest expectations. Decide static vs
        dynamic based on how likely the destination is to change and whether you
        need scan analytics.
      </p>
      <p>
        Run through the print checklist before approving any run. Size for
        distance, proof on real phones, and label every code so scanners know
        what to expect.
      </p>
      <p>
        For related reading, see our{" "}
        <Link
          href="/guides/qr-code-for-youtube"
          className="text-[var(--brand-2)] underline"
        >
          YouTube QR guide
        </Link>{" "}
        (quick reference),{" "}
        <Link
          href="/blog/small-business-qr-playbook"
          className="text-[var(--brand-2)] underline"
        >
          small-business QR playbook
        </Link>
        , and{" "}
        <Link
          href="/blog/linkedin-qr-code-guide"
          className="text-[var(--brand-2)] underline"
        >
          LinkedIn QR code guide
        </Link>{" "}
        (similar structure, networking focus).
      </p>
      <p>
        Create your YouTube QR in the{" "}
        <Link href="/studio" className="text-[var(--brand-2)] underline">
          Studio
        </Link>{" "}
        — static codes are free with no watermark, dynamic codes require a free
        account.
      </p>
      <p>
        Questions?{" "}
        <Link href="/contact" className="text-[var(--brand-2)] underline">
          Contact
        </Link>{" "}
        {siteConfig.parentCompany.name} at {siteConfig.emails.hello}.
      </p>
    </article>
  );
}

export function QrCodeWithLogoGuidePost() {
  return (
    <article className="space-y-6 text-[var(--muted)] leading-relaxed">
      <p>
        A plain black-and-white QR code does the job, but a{" "}
        <strong className="text-[var(--foreground)]">QR code with a logo</strong>{" "}
        does the job <em>and</em> looks like it belongs on your brand. Whether
        you want your company mark, app icon, or a custom symbol in the center,
        adding a logo to a QR code is straightforward — if you understand how
        QR codes handle damage and follow a few practical steps.
      </p>
      <p>
        This guide walks through the entire process of{" "}
        <strong className="text-[var(--foreground)]">
          creating a QR code with a logo inside
        </strong>{" "}
        using{" "}
        <Link href="/studio" className="text-[var(--brand-2)] underline">
          {siteConfig.name} Studio
        </Link>
        : preparing your logo file, uploading it, choosing error correction,
        adjusting colors, keeping the quiet zone intact, testing scans on
        several phones, exporting for print vs web, and deciding when to make
        the code dynamic so the destination can change after printing.
      </p>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        Why QR codes with logos work
      </h2>
      <p>
        QR codes include built-in redundancy called{" "}
        <strong className="text-[var(--foreground)]">error correction</strong>.
        Scanners can still read the code even when part of it is missing,
        damaged, or — in our case — covered by a logo. The QR standard offers
        four levels of error correction (L, M, Q, H), each letting the code
        tolerate progressively more &quot;damage.&quot;
      </p>
      <p>
        When you drop a logo in the center of a QR code, you are deliberately
        covering modules. Higher error correction compensates by encoding more
        redundant data. That is why generators like {siteConfig.name} raise the
        error-correction level automatically when you upload a logo.
      </p>
      <p>
        For a deeper dive into how error correction works and why branded codes
        sometimes fail, read{" "}
        <Link
          href="/blog/error-correction-logos-pretty-qr-fail"
          className="text-[var(--brand-2)] underline"
        >
          Error Correction, Logos, and Why Pretty QR Codes Fail
        </Link>
        . This post focuses on the practical &quot;how&quot; — the step-by-step creation
        process.
      </p>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        Step 1: Prepare your logo file
      </h2>
      <p>
        Not every logo works well inside a QR code. Follow these guidelines to
        set yourself up for success:
      </p>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong className="text-[var(--foreground)]">
            Use a square or near-square format.
          </strong>{" "}
          QR codes are square; a wide horizontal logo will either be cropped or
          waste space with empty padding.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">
            Prefer transparent backgrounds.
          </strong>{" "}
          A transparent PNG or SVG lets the QR background show through,
          creating a cleaner integrated look than a white box sitting on top.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">
            Keep it simple.
          </strong>{" "}
          Flat marks, icons, and simple wordmarks scan better than detailed
          photographs or intricate illustrations. Fine details disappear at
          small sizes.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">
            Export large enough.
          </strong>{" "}
          Upload a logo that is sharp at around 200–400 px on a side. The
          Studio scales it down; starting with a low-resolution file makes it
          blurry.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">
            Avoid busy colors.
          </strong>{" "}
          A monochrome or two-color logo with strong contrast scans more
          reliably than a gradient-heavy design that blends into the modules.
        </li>
      </ul>
      <p>
        In short: flat, high-contrast, square-ish marks work best. If your logo
        is complex, consider using a simplified icon version for the QR code.
      </p>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        Step 2: Open the Studio and enter your content
      </h2>
      <ol className="list-decimal space-y-3 pl-5">
        <li>
          Go to the{" "}
          <Link href="/studio" className="text-[var(--brand-2)] underline">
            {siteConfig.name} Studio
          </Link>
          .
        </li>
        <li>
          Choose a content type — URL, WiFi, vCard, text, or another option.
          Most branded codes use URL since they point to websites, landing
          pages, or{" "}
          <Link
            href="/guides/dynamic-qr-code"
            className="text-[var(--brand-2)] underline"
          >
            dynamic short links
          </Link>
          .
        </li>
        <li>
          Fill in the form: paste your URL, enter WiFi credentials, or provide
          whatever data the chosen type requires.
        </li>
      </ol>
      <p>
        At this point you have a working QR code in the preview pane — just
        without styling or a logo yet.
      </p>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        Step 3: Decide static vs dynamic
      </h2>
      <p>
        Before you fall in love with your branded design, make a strategic
        choice:{" "}
        <strong className="text-[var(--foreground)]">static</strong> or{" "}
        <strong className="text-[var(--foreground)]">dynamic</strong>?
      </p>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong className="text-[var(--foreground)]">Static:</strong> The
          destination URL is encoded directly in the QR code. Once printed, it
          cannot be changed. No account required; the code is generated entirely
          in your browser.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Dynamic:</strong> The QR
          code encodes a short redirect link. You can update the destination
          anytime without reprinting, and you get scan analytics. Requires a
          free account.
        </li>
      </ul>
      <p>
        If your print run is expensive, the URL might change, or you want to
        track scans, toggle the dynamic option before styling. Read{" "}
        <Link
          href="/blog/static-vs-dynamic-qr-cost"
          className="text-[var(--brand-2)] underline"
        >
          When Free QR Codes Become Expensive
        </Link>{" "}
        for a full cost comparison.
      </p>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        Step 4: Upload your logo
      </h2>
      <ol className="list-decimal space-y-3 pl-5">
        <li>
          Switch to the <strong className="text-[var(--foreground)]">Design</strong>{" "}
          tab in the Studio.
        </li>
        <li>
          Scroll down to the <strong className="text-[var(--foreground)]">Logo</strong>{" "}
          section and click <strong className="text-[var(--foreground)]">Upload logo</strong>.
        </li>
        <li>
          Select your prepared image file (PNG, SVG, JPEG, or other common
          formats are accepted).
        </li>
        <li>
          The Studio places the logo in the center and renders a live preview.
          You can swap or remove the logo anytime.
        </li>
      </ol>
      <p>
        When you upload a logo, the Studio automatically raises the{" "}
        <strong className="text-[var(--foreground)]">error correction</strong>{" "}
        level to <strong className="text-[var(--foreground)]">H</strong> (the
        highest) if it was previously set to L or M. This protects scan
        reliability.
      </p>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        Step 5: Choose error correction
      </h2>
      <p>
        The error-correction selector offers four levels: L, M, Q, and H. Higher
        levels let the code survive more damage (including your logo) but create
        denser patterns with more modules.
      </p>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong className="text-[var(--foreground)]">H (High):</strong>{" "}
          Recommended when using a logo. Tolerates up to ~30% damage.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Q (Quartile):</strong>{" "}
          A middle ground for modest logos or when you need a slightly simpler
          pattern.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">M / L:</strong>{" "}
          Best for plain codes without logos. Not recommended when covering
          modules with branding.
        </li>
      </ul>
      <p>
        The hint under the selector says &quot;Higher = more logo-friendly.&quot; Stick
        with H or Q when a logo is present.
      </p>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        Step 6: Adjust logo size
      </h2>
      <p>
        Once a logo is uploaded, a{" "}
        <strong className="text-[var(--foreground)]">Logo size</strong> slider
        appears (ranging from 10% to 60% of the QR area). Resist the temptation
        to max it out:
      </p>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong className="text-[var(--foreground)]">15–30%</strong> is the
          safe zone for most logos and high error correction.
        </li>
        <li>
          Larger logos (40–60%) look dramatic but eat into the error-correction
          budget. They can work on large prints but may fail on small business
          cards.
        </li>
        <li>
          Test-scan after every significant size change. The live preview looks
          fine, but a real phone camera is the ultimate judge.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        Step 7: Customize colors and dot styles
      </h2>
      <p>
        A logo is just one part of brand identity. The Studio also lets you
        adjust:
      </p>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong className="text-[var(--foreground)]">Foreground color:</strong>{" "}
          The color of the QR modules (the &quot;dots&quot;).
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Background color:</strong>{" "}
          Usually white or a light shade.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Gradient:</strong>{" "}
          Optional linear or radial gradient across the modules.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Dot style:</strong>{" "}
          Choose from rounded, dots, classy, square, heart, diamond, star, and
          many more.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Corner styles:</strong>{" "}
          Customize the three finder squares in the corners.
        </li>
      </ul>
      <p>
        <strong className="text-[var(--foreground)]">Contrast matters most.</strong>{" "}
        Keep modules dark relative to the background. Light-on-light (yellow on
        cream) or dark-on-dark (navy on black) combinations confuse scanners.
        Brand colors are fine as long as the contrast ratio stays high.
      </p>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        Step 8: Protect the quiet zone
      </h2>
      <p>
        The <strong className="text-[var(--foreground)]">quiet zone</strong> is
        the empty margin around the entire QR code. Scanners need this blank
        space to distinguish the code from surrounding artwork. The Studio has
        a <strong className="text-[var(--foreground)]">Quiet-zone margin</strong>{" "}
        slider (0–40 px); keep at least 8–12 px for reliability.
      </p>
      <p>
        When placing the final file in your design software, do not crop into
        that margin or butt text directly against the edge. Four modules of
        clear space on every side is the industry rule of thumb.
      </p>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        Step 9: Test on multiple phones
      </h2>
      <p>
        The live 2D/3D preview in the Studio is convenient, but it is not a
        substitute for real scanning. Before you finalize:
      </p>
      <ol className="list-decimal space-y-2 pl-5">
        <li>
          Scan with the native camera app on an <strong className="text-[var(--foreground)]">iPhone</strong>.
        </li>
        <li>
          Scan with the native camera app on an <strong className="text-[var(--foreground)]">Android</strong> phone.
        </li>
        <li>
          Try an older phone if you have one — older cameras and lower-resolution
          screens are less forgiving.
        </li>
        <li>
          If the code will be printed, print a proof at final size and scan it
          under realistic lighting.
        </li>
      </ol>
      <p>
        Test every time you change the logo size, color contrast, or target URL
        length.
      </p>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        Step 10: Export for print or web
      </h2>
      <p>
        The Studio offers two download formats:
      </p>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong className="text-[var(--foreground)]">PNG:</strong>{" "}
          A raster image suitable for web, social media, email signatures, and
          small print. Make sure the pixel dimensions are large enough for your
          use case (aim for 300 DPI at final print size).
        </li>
        <li>
          <strong className="text-[var(--foreground)]">SVG:</strong>{" "}
          A vector file that scales infinitely without blurring. Ideal for
          large-format print — posters, banners, packaging. Also perfect for
          handing to a designer who will place the code in Illustrator or
          InDesign.
        </li>
      </ul>
      <p>
        Both formats are{" "}
        <strong className="text-[var(--foreground)]">free and without watermark</strong>{" "}
        for static codes. Dynamic codes also export without watermark once you
        are signed in.
      </p>
      <p>
        If you added a decorative frame in the Studio, the downloaded file
        includes it. For print sizing guidance, see{" "}
        <Link
          href="/blog/print-qr-codes-that-scan"
          className="text-[var(--brand-2)] underline"
        >
          Print QR Codes That Actually Scan
        </Link>{" "}
        and the{" "}
        <Link
          href="/guides/qr-code-size-for-print"
          className="text-[var(--brand-2)] underline"
        >
          QR code size for print
        </Link>{" "}
        reference.
      </p>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        When to use a dynamic code
      </h2>
      <p>
        Adding a logo does not change whether you should choose static or
        dynamic — but it is worth repeating the decision framework here because
        branded codes often appear on expensive print runs:
      </p>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong className="text-[var(--foreground)]">Dynamic is worth it</strong>{" "}
          when the destination URL might change, when you need scan analytics,
          or when reprinting would cost more than a Pro plan.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Static is fine</strong>{" "}
          for permanent links (your homepage, a stable YouTube channel, a WiFi
          password that never changes) and one-off events.
        </li>
      </ul>
      <p>
        Dynamic codes encode a short redirect, so the QR pattern itself is
        simpler — fewer modules to cover with your logo. That can be a bonus
        when you want a larger brand mark.
      </p>
      <p>
        Read more in{" "}
        <Link
          href="/blog/finish-the-qr-workflow"
          className="text-[var(--brand-2)] underline"
        >
          Building a QR Workflow People Actually Finish
        </Link>
        .
      </p>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        Print checklist for branded codes
      </h2>
      <p>
        Before you approve a print run, verify:
      </p>
      <ol className="list-decimal space-y-2 pl-5">
        <li>
          <strong className="text-[var(--foreground)]">Size for distance:</strong>{" "}
          Code width ≈ scanning distance ÷ 10. Add extra if you have a large
          logo.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Contrast:</strong>{" "}
          Dark modules on a light, solid background.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Quiet zone:</strong>{" "}
          At least four modules of clear margin on every side.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">No cover on finder squares:</strong>{" "}
          The three large squares in the corners must remain visible.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Vector for large formats:</strong>{" "}
          Use SVG for banners and packaging; PNG is fine for small digital use.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Proof scan:</strong>{" "}
          Print one sample at final size and test with real phones under
          realistic lighting.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Watch for glare:</strong>{" "}
          Glossy laminate under bright lights can blind the camera. Matte
          finishes scan more reliably.
        </li>
      </ol>
      <p>
        A full pre-press walkthrough is in the{" "}
        <Link
          href="/blog/print-qr-codes-that-scan"
          className="text-[var(--brand-2)] underline"
        >
          print checklist post
        </Link>
        .
      </p>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        FAQ: QR codes with logos
      </h2>

      <h3 className="text-xl font-semibold text-[var(--foreground)] mt-4">
        Does a logo stop a QR code from scanning?
      </h3>
      <p>
        Not if you use high error correction and keep the logo at a reasonable
        size. {siteConfig.name} automatically raises error correction when you
        upload a logo, so the code stays scannable.
      </p>

      <h3 className="text-xl font-semibold text-[var(--foreground)] mt-4">
        What size should the logo be?
      </h3>
      <p>
        Aim for 15–30% of the QR area for reliable scanning. Larger logos (up
        to 60% in the Studio) work on big prints with high error correction,
        but test thoroughly.
      </p>

      <h3 className="text-xl font-semibold text-[var(--foreground)] mt-4">
        Can I put the logo in a corner?
      </h3>
      <p>
        No. The three finder squares in the corners are critical for scanners
        to orient the code. Never cover them. Center logos are the safe
        default.
      </p>

      <h3 className="text-xl font-semibold text-[var(--foreground)] mt-4">
        Can I add a logo to a free QR code?
      </h3>
      <p>
        Yes. On {siteConfig.name}, static QR codes are free with no watermark,
        including logo support, color customization, and SVG/PNG export.
        Dynamic codes also support logos and require a free account.
      </p>

      <h3 className="text-xl font-semibold text-[var(--foreground)] mt-4">
        What file format should my logo be?
      </h3>
      <p>
        A transparent PNG or SVG works best. Avoid low-resolution JPEGs with
        white boxes around the mark.
      </p>

      <h3 className="text-xl font-semibold text-[var(--foreground)] mt-4">
        Do brand colors hurt scanning?
      </h3>
      <p>
        They can if contrast is low. Yellow on white, light gray on cream, or
        any light-on-light combination confuses cameras. Keep modules dark
        relative to the background and test on real phones.
      </p>

      <h3 className="text-xl font-semibold text-[var(--foreground)] mt-4">
        Should I print a logo QR as static or dynamic?
      </h3>
      <p>
        If the destination might change or the print run is expensive, use a
        dynamic code so you can update without reprinting. For permanent links
        and one-off events, static is fine.
      </p>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        Wrapping up
      </h2>
      <p>
        Creating a{" "}
        <strong className="text-[var(--foreground)]">
          QR code with a logo inside
        </strong>{" "}
        is straightforward once you understand the role of error correction.
        Prepare a simple, high-contrast logo; upload it in the{" "}
        <Link href="/studio" className="text-[var(--brand-2)] underline">
          Studio
        </Link>
        ; keep the size modest; choose H or Q error correction; protect the
        quiet zone; test on multiple phones; and export SVG for print, PNG for
        digital.
      </p>
      <p>
        If the destination might change or you want scan analytics, make it
        dynamic before you finalize the design. For a deeper understanding of
        why branded codes sometimes fail, read{" "}
        <Link
          href="/blog/error-correction-logos-pretty-qr-fail"
          className="text-[var(--brand-2)] underline"
        >
          Error Correction, Logos, and Why Pretty QR Codes Fail
        </Link>
        .
      </p>
      <p>
        Questions?{" "}
        <Link href="/contact" className="text-[var(--brand-2)] underline">
          Contact
        </Link>{" "}
        {siteConfig.parentCompany.name} at {siteConfig.emails.hello}.
      </p>
    </article>
  );
}

export function QrCodeLogoDesignPost() {
  return (
    <article className="space-y-6 text-[var(--muted)] leading-relaxed">
      <p>
        Adding a logo to a QR code is straightforward — keeping it scannable is
        where most designs fail. If you already know{" "}
        <Link
          href="/blog/error-correction-logos-pretty-qr-fail"
          className="text-[var(--brand-2)] underline"
        >
          why logo QR codes fail
        </Link>{" "}
        and want a{" "}
        <Link
          href="/blog/qr-code-with-logo-guide"
          className="text-[var(--brand-2)] underline"
        >
          step-by-step walkthrough
        </Link>{" "}
        for creating one in {siteConfig.name}, those guides have you covered.
        This post is the design reference: concrete rules for logo size,
        placement, contrast, styling, file formats, and a pre-launch testing
        protocol that catches failures before they cost you a print run.
      </p>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        Logo size and error correction: the core tradeoff
      </h2>
      <p>
        Every QR code includes redundant data so scanners can still decode it
        when part of the pattern is damaged, dirty, or — in your case — covered
        by a logo. The four error correction levels (L, M, Q, H) determine how
        much damage the code can tolerate:
      </p>
      <div className="overflow-x-auto mt-4">
        <table className="w-full text-sm border border-[var(--border)] rounded-lg">
          <thead className="bg-[var(--surface)]">
            <tr>
              <th className="text-left p-3 font-semibold text-[var(--foreground)]">Level</th>
              <th className="text-left p-3 font-semibold text-[var(--foreground)]">Recovery capacity</th>
              <th className="text-left p-3 font-semibold text-[var(--foreground)]">Safe logo coverage</th>
              <th className="text-left p-3 font-semibold text-[var(--foreground)]">Pattern density</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            <tr>
              <td className="p-3 font-semibold text-[var(--foreground)]">L</td>
              <td className="p-3">~7%</td>
              <td className="p-3">Not recommended</td>
              <td className="p-3">Lowest (simplest pattern)</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold text-[var(--foreground)]">M</td>
              <td className="p-3">~15%</td>
              <td className="p-3">≤10% with caution</td>
              <td className="p-3">Low–medium</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold text-[var(--foreground)]">Q</td>
              <td className="p-3">~25%</td>
              <td className="p-3">15–20%</td>
              <td className="p-3">Medium–high</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold text-[var(--foreground)]">H</td>
              <td className="p-3">~30%</td>
              <td className="p-3">20–30%</td>
              <td className="p-3">Highest (most modules)</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-4">
        <strong className="text-[var(--foreground)]">The rule:</strong> Your
        logo should cover less than the recovery capacity, with headroom for
        print imperfections. {siteConfig.name} Studio offers a logo size slider
        from 10% to 60% and auto-raises error correction to H when you upload a
        logo. For most branded codes, stay between{" "}
        <strong className="text-[var(--foreground)]">15–30%</strong> with H
        correction. Pushing to 40–60% can work on large prints with perfect
        contrast, but test aggressively.
      </p>
      <p>
        Higher error correction creates denser patterns with more modules. That
        means the code is harder to read at very small sizes (e.g., 1.5 cm
        business cards). If you need a tiny code, either shrink the logo or drop
        it entirely. A plain code at 2 cm beats a branded code that won&apos;t scan.
      </p>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        Placement: center only, respect the anatomy
      </h2>
      <p>
        QR codes have non-negotiable structural elements that scanners rely on
        to orient and read the pattern. Never obscure:
      </p>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong className="text-[var(--foreground)]">Finder patterns</strong>{" "}
          — the three large squares in the corners. These tell the camera where
          the code starts and how it&apos;s rotated.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Timing patterns</strong>{" "}
          — the alternating dark/light lines between finder patterns. They help
          scanners count modules.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Alignment patterns</strong>{" "}
          — smaller squares in larger QR codes that correct for perspective
          distortion.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Quiet zone</strong> — the
          blank margin around the entire code. Scanners need this empty space to
          distinguish the code from surrounding artwork.
        </li>
      </ul>
      <p>
        The safe zone for a logo is the{" "}
        <strong className="text-[var(--foreground)]">center</strong> of the data
        area — the region where error correction can recover the covered
        modules. {siteConfig.name} Studio automatically places uploaded logos in
        the center. Never drag a logo toward a corner or edge; you&apos;ll hit
        structural patterns.
      </p>
      <p>
        <strong className="text-[var(--foreground)]">Offset logos?</strong>{" "}
        Sometimes designers want the logo slightly off-center for aesthetic
        reasons. This is risky: you&apos;re covering modules that might be closer to
        timing or alignment patterns, and uneven coverage can exceed error
        correction in one direction while leaving slack elsewhere. Stick to
        center unless you have extensive testing budget.
      </p>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        Logo padding and background plates
      </h2>
      <p>
        A logo dropped directly onto the modules often looks cluttered and scans
        poorly — the logo&apos;s edges blend into the pattern. Use one of these
        techniques:
      </p>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong className="text-[var(--foreground)]">Transparent logo with clear background:</strong>{" "}
          The simplest approach if your logo is a simple mark with strong
          outlines. Works best when the logo color contrasts with both the
          foreground modules and the QR background.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">White (or light) background plate:</strong>{" "}
          Add a small square or circle of the QR&apos;s background color behind the
          logo. This creates visual separation and ensures the logo sits on a
          clean field. The plate&apos;s area counts toward your coverage budget.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Subtle padding in the logo file:</strong>{" "}
          Export your logo with a few pixels of built-in margin. This avoids the
          logo touching modules directly, even without a visible plate.
        </li>
      </ul>
      <p>
        Avoid heavy drop shadows, outer glows, or fuzzy edges on the logo. These
        bleed into modules and reduce scanner confidence.
      </p>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        Mark-only logos vs full wordmarks
      </h2>
      <p>
        Not all logos work equally well inside a QR code:
      </p>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong className="text-[var(--foreground)]">Icon / symbol / mark:</strong>{" "}
          Compact, roughly square, high contrast. Ideal. Examples: app icons,
          monograms, simplified brand marks.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Horizontal wordmark:</strong>{" "}
          Wide and short. Forces you to either use a tiny version (illegible) or
          cover excessive horizontal area (risky). Consider a stacked or
          abbreviated version.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Full lockup (icon + wordmark):</strong>{" "}
          Usually too complex and too large. Extract the icon for the QR code;
          place the full logo elsewhere on the material.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Photography or detailed illustrations:</strong>{" "}
          Fine details disappear at small sizes and gradients hurt contrast.
          Avoid.
        </li>
      </ul>
      <p>
        Many brands have a &quot;mark-only&quot; version for exactly this use case. If
        yours doesn&apos;t, ask your designer for one — or use the app icon.
      </p>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        Color and contrast rules
      </h2>
      <p>
        Scanners detect QR codes by finding the contrast boundary between dark
        modules and a light background. Mess with that contrast and scans fail —
        even if the pattern is intact.
      </p>

      <h3 className="text-xl font-semibold text-[var(--foreground)] mt-4">
        The golden rule: dark on light
      </h3>
      <p>
        Keep modules darker than the background. Black on white is the safest.
        Brand colors work if you maintain a strong contrast ratio — navy on
        cream, dark green on white, etc. Light modules on dark backgrounds
        (&quot;inverted&quot; codes) are technically valid but scan less reliably in
        variable lighting. Avoid them unless you&apos;ve tested thoroughly.
      </p>

      <h3 className="text-xl font-semibold text-[var(--foreground)] mt-4">
        Gradients: use with caution
      </h3>
      <p>
        {siteConfig.name} Studio offers linear and radial gradients across
        modules. A subtle dark-to-slightly-less-dark gradient can look elegant.
        A gradient that fades to a light color in any region kills contrast in
        that zone. If you use a gradient, ensure the lightest point is still
        clearly darker than the background. Test-scan after every adjustment.
      </p>

      <h3 className="text-xl font-semibold text-[var(--foreground)] mt-4">
        Logo color vs code color
      </h3>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          If your logo is dark, a white/light background plate helps it stand
          out from dark modules.
        </li>
        <li>
          If your logo is light or colorful, ensure it doesn&apos;t blend into the QR
          background. A thin dark border or background plate may help.
        </li>
        <li>
          Match the QR&apos;s foreground color to a brand accent if you want
          cohesion, but keep the logo visually distinct.
        </li>
      </ul>

      <h3 className="text-xl font-semibold text-[var(--foreground)] mt-4">
        Avoid these contrast killers
      </h3>
      <ul className="list-disc space-y-2 pl-5">
        <li>Yellow or light-gray modules on white</li>
        <li>Pastel modules on pastel backgrounds</li>
        <li>Multicolor gradients that create low-contrast zones</li>
        <li>Printing on busy photographic backgrounds without a solid pad</li>
        <li>Metallic or holographic inks without a matte underlay</li>
      </ul>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        Module shape and eye styling limits
      </h2>
      <p>
        {siteConfig.name} Studio offers many dot styles (rounded, dots, classy,
        square, heart, diamond, star, and more) plus corner frame and corner dot
        options. These are safe to use — the pattern geometry stays correct.
        However:
      </p>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong className="text-[var(--foreground)]">Overly decorative styles reduce effective contrast.</strong>{" "}
          A &quot;heart&quot; or &quot;star&quot; dot style has less filled area per module than a
          square, making the code lighter overall. Compensate with darker colors
          or larger sizes.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Keep finder-pattern corners recognizable.</strong>{" "}
          The three large corner squares must remain clearly square-ish and
          contrasting. Extreme corner styles (like very rounded outer frames
          with dot centers) can confuse older scanners.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Combine decorative styles with simpler logos.</strong>{" "}
          If your logo is detailed, keep modules simple. If modules are fancy,
          keep the logo clean. Too much visual complexity everywhere overwhelms
          the eye and the scanner.
        </li>
      </ul>
      <p>
        When in doubt, start with &quot;rounded&quot; or &quot;square&quot; dots and standard corner
        styles. Add flair only after confirming the code scans reliably.
      </p>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        File format for the logo
      </h2>
      <p>
        What you upload into the QR generator matters:
      </p>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong className="text-[var(--foreground)]">Transparent PNG:</strong>{" "}
          The standard choice. Use a file at least 200–400 px on a side so
          scaling down stays sharp. Transparent background lets the QR&apos;s own
          background show through — or lets you add a background plate cleanly.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">SVG:</strong> Vector
          format, scales perfectly. If the generator supports it (many do),
          SVG is ideal for crisp results at any export size.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">JPEG:</strong> Avoid if
          possible. No transparency support, and compression artifacts can blur
          edges. If you must use JPEG, ensure the background color exactly
          matches the QR background.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Low-resolution files:</strong>{" "}
          A 50 px logo upscaled to 400 px will be blurry. Start with a
          high-resolution source.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        Export format: SVG for print, PNG for web
      </h2>
      <p>
        Once your logo QR code is designed, export it in the right format for
        your use case:
      </p>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong className="text-[var(--foreground)]">SVG (vector):</strong>{" "}
          Scales infinitely without blurring. Ideal for print — business cards,
          posters, packaging, banners. Hand this to your designer or printer.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">PNG (raster):</strong>{" "}
          Fixed resolution. Fine for web, email signatures, social media, and
          small digital uses. Export at a resolution large enough for your
          intended display size. For print, ensure the PNG is at least 300 DPI
          at final dimensions.
        </li>
      </ul>
      <p>
        {siteConfig.name} exports both formats free and without watermark. Use
        SVG whenever print quality matters. See{" "}
        <Link
          href="/blog/print-qr-codes-that-scan"
          className="text-[var(--brand-2)] underline"
        >
          print QR codes that scan
        </Link>{" "}
        for a full pre-press checklist.
      </p>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        Testing protocol: phones, distances, lighting
      </h2>
      <p>
        The preview on your screen is not proof the code works. Before you
        commit to print or wide distribution:
      </p>
      <ol className="list-decimal space-y-3 pl-5">
        <li>
          <strong className="text-[var(--foreground)]">Scan with an iPhone</strong>{" "}
          using the native Camera app. iOS is generally forgiving but not
          infallible.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Scan with an Android phone</strong>{" "}
          using the native Camera app. Android cameras vary widely; test on at
          least one mid-range device if possible.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Scan an older phone</strong>{" "}
          if your audience might use one. Older cameras and lower-resolution
          screens are less forgiving.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Print a proof at final size</strong>{" "}
          on the actual stock (paper, vinyl, fabric) before approving a run.
          Screen colors and print colors differ; what looks fine digitally may
          lose contrast on paper.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Scan at expected distance</strong>{" "}
          — arm&apos;s length for a business card, 2 meters for a poster, 5+ meters
          for a banner. The ~10:1 rule (code width ≈ scan distance ÷ 10) is a
          starting point; logos and dense URLs need extra margin. See{" "}
          <Link
            href="/guides/qr-code-size-for-print"
            className="text-[var(--brand-2)] underline"
          >
            QR code size for print
          </Link>
          .
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Test under realistic lighting</strong>{" "}
          — dim restaurant, bright retail, outdoor shade. Glossy laminate can
          glare; matte finishes scan more reliably.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Confirm the destination</strong>{" "}
          opens correctly — especially for{" "}
          <Link
            href="/guides/dynamic-qr-code"
            className="text-[var(--brand-2)] underline"
          >
            dynamic codes
          </Link>{" "}
          where a redirect is involved.
        </li>
      </ol>
      <p>
        Test after every significant change: logo size, color, dot style, or URL
        length. A code that scanned at 20% logo coverage might fail at 35%.
      </p>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        Quick-reference table: logo QR design rules
      </h2>
      <div className="overflow-x-auto mt-4">
        <table className="w-full text-sm border border-[var(--border)] rounded-lg">
          <thead className="bg-[var(--surface)]">
            <tr>
              <th className="text-left p-3 font-semibold text-[var(--foreground)]">Rule</th>
              <th className="text-left p-3 font-semibold text-[var(--foreground)]">Guideline</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            <tr>
              <td className="p-3 font-medium text-[var(--foreground)]">Error correction</td>
              <td className="p-3">Use H (or at least Q) when a logo is present</td>
            </tr>
            <tr>
              <td className="p-3 font-medium text-[var(--foreground)]">Logo size</td>
              <td className="p-3">15–30% of the code area; test if exceeding 30%</td>
            </tr>
            <tr>
              <td className="p-3 font-medium text-[var(--foreground)]">Placement</td>
              <td className="p-3">Center only — never over finder patterns, timing, or quiet zone</td>
            </tr>
            <tr>
              <td className="p-3 font-medium text-[var(--foreground)]">Logo shape</td>
              <td className="p-3">Square or near-square; icon/mark preferred over wordmarks</td>
            </tr>
            <tr>
              <td className="p-3 font-medium text-[var(--foreground)]">Logo file</td>
              <td className="p-3">Transparent PNG or SVG, 200–400+ px, no compression artifacts</td>
            </tr>
            <tr>
              <td className="p-3 font-medium text-[var(--foreground)]">Padding</td>
              <td className="p-3">Use a background plate or built-in margin to separate logo from modules</td>
            </tr>
            <tr>
              <td className="p-3 font-medium text-[var(--foreground)]">Contrast</td>
              <td className="p-3">Dark modules on light background; avoid inverted or low-contrast combos</td>
            </tr>
            <tr>
              <td className="p-3 font-medium text-[var(--foreground)]">Gradients</td>
              <td className="p-3">Keep lightest point clearly darker than background</td>
            </tr>
            <tr>
              <td className="p-3 font-medium text-[var(--foreground)]">Dot styles</td>
              <td className="p-3">Safe to use, but compensate for reduced fill with darker colors or larger size</td>
            </tr>
            <tr>
              <td className="p-3 font-medium text-[var(--foreground)]">Export for print</td>
              <td className="p-3">SVG (vector); PNG at 300+ DPI for final size if raster needed</td>
            </tr>
            <tr>
              <td className="p-3 font-medium text-[var(--foreground)]">Export for web</td>
              <td className="p-3">PNG at display resolution; SVG also works</td>
            </tr>
            <tr>
              <td className="p-3 font-medium text-[var(--foreground)]">Minimum size (with logo)</td>
              <td className="p-3">≥2.5 cm on business cards; larger for posters and distance scanning</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        Pre-launch checklist
      </h2>
      <p>
        Run through this list before approving any print run or publishing a
        logo QR code online:
      </p>
      <ol className="list-decimal space-y-2 pl-5">
        <li>
          <strong className="text-[var(--foreground)]">Error correction set to H or Q</strong>{" "}
          (auto-set in {siteConfig.name} when you upload a logo).
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Logo size under 30%</strong>{" "}
          (or tested extensively if larger).
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Logo centered</strong>{" "}
          — not touching finder patterns, timing, or quiet zone.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Dark modules on light background</strong>{" "}
          with strong contrast.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Gradient (if any) stays dark throughout.</strong>
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Quiet zone preserved</strong>{" "}
          — at least 4 modules of blank margin on all sides.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Code sized for distance</strong>{" "}
          — 10:1 rule plus margin for logo and URL length.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Scanned on iPhone camera app.</strong>
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Scanned on Android camera app.</strong>
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Printed proof tested at final size, on final stock, under real lighting.</strong>
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Destination URL correct</strong>{" "}
          (especially for dynamic redirects).
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Exported as SVG for print</strong>{" "}
          (or PNG at ≥300 DPI).
        </li>
      </ol>
      <p>
        If any step fails, fix it before printing. A beautiful code that doesn&apos;t
        scan is worse than a plain one that works.
      </p>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        When to skip the logo
      </h2>
      <p>
        Sometimes a plain QR code is the better choice:
      </p>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong className="text-[var(--foreground)]">Very small codes</strong>{" "}
          (under 2 cm) — logos can&apos;t be seen clearly and just hurt scan
          reliability.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Dense data</strong>{" "}
          (long URLs, vCards with lots of fields) — already high module count;
          adding a logo makes it harder to scan.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Low-quality print</strong>{" "}
          (cheap stickers, low-res thermal labels) — error budget is needed to
          survive the print process, not a logo.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Internal / utility codes</strong>{" "}
          — warehouse labels, internal URLs, where branding adds no value.
        </li>
      </ul>
      <p>
        For these cases, skip the logo and use color or a decorative frame to
        add brand context without covering modules.
      </p>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        Related resources
      </h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <Link
            href="/blog/qr-code-with-logo-guide"
            className="text-[var(--brand-2)] underline"
          >
            How to Create a QR Code with a Logo (Step-by-Step)
          </Link>{" "}
          — the full walkthrough for creating one in {siteConfig.name} Studio.
        </li>
        <li>
          <Link
            href="/blog/error-correction-logos-pretty-qr-fail"
            className="text-[var(--brand-2)] underline"
          >
            Error Correction, Logos, and Why Pretty QR Codes Fail
          </Link>{" "}
          — the deeper technical explanation.
        </li>
        <li>
          <Link
            href="/blog/print-qr-codes-that-scan"
            className="text-[var(--brand-2)] underline"
          >
            Print QR Codes That Actually Scan
          </Link>{" "}
          — the pre-press checklist for any QR code.
        </li>
        <li>
          <Link
            href="/guides/qr-code-with-logo"
            className="text-[var(--brand-2)] underline"
          >
            QR Code with Logo Guide
          </Link>{" "}
          — quick reference.
        </li>
        <li>
          <Link
            href="/guides/qr-code-size-for-print"
            className="text-[var(--brand-2)] underline"
          >
            QR Code Size for Print
          </Link>{" "}
          — the complete sizing reference.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        Wrapping up
      </h2>
      <p>
        A well-designed logo QR code balances brand visibility with scan
        reliability. Use H error correction, keep the logo under 30% of the
        code area, center it, maintain dark-on-light contrast, and test on real
        phones before you print. When in doubt, simplify — a plain code that
        scans is better than a branded code that fails.
      </p>
      <p>
        Design your logo QR in the{" "}
        <Link href="/studio" className="text-[var(--brand-2)] underline">
          {siteConfig.name} Studio
        </Link>{" "}
        — static codes are free with no watermark, and dynamic codes let you
        track scans and update the destination after printing.
      </p>
      <p>
        Questions?{" "}
        <Link href="/contact" className="text-[var(--brand-2)] underline">
          Contact
        </Link>{" "}
        {siteConfig.parentCompany.name} at {siteConfig.emails.hello}.
      </p>
    </article>
  );
}

export function LinkedInQrCodeGuidePost() {
  return (
    <article className="space-y-6 text-[var(--muted)] leading-relaxed">
      <p>
        LinkedIn is where professional connections live, but exchanging profiles
        at conferences, job fairs, and client meetings is still awkward. Spelling
        out names, searching through dozens of similar profiles, and typing URLs
        on tiny keyboards wastes time and loses leads. A{" "}
        <strong className="text-[var(--foreground)]">LinkedIn QR code</strong>{" "}
        solves this: one scan opens your profile or company page directly, ready
        for a connection request.
      </p>
      <p>
        This guide walks through finding your LinkedIn URL, understanding
        LinkedIn&apos;s native QR feature, creating a custom branded code in{" "}
        <Link href="/studio" className="text-[var(--brand-2)] underline">
          {siteConfig.name} Studio
        </Link>
        , and placing it on business cards, badges, slides, and email signatures
        — with sizing tips to make sure it actually scans when printed.
      </p>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        Step 1: Find your LinkedIn profile or company page URL
      </h2>
      <p>
        Before you can create a QR code, you need the exact URL you want scanners
        to land on. LinkedIn offers two main options:
      </p>
      <h3 className="text-xl font-semibold text-[var(--foreground)] mt-4">
        Personal profile URL
      </h3>
      <ol className="list-decimal space-y-2 pl-5">
        <li>Log in to LinkedIn on desktop or mobile browser.</li>
        <li>Click your profile picture → &quot;View profile.&quot;</li>
        <li>
          Look at the URL in your browser&apos;s address bar. It looks like{" "}
          <code className="text-[var(--foreground)] bg-[var(--surface)] px-1 rounded">
            linkedin.com/in/your-name
          </code>
          .
        </li>
        <li>
          For a cleaner link, click &quot;Edit public profile &amp; URL&quot; on
          the right sidebar and customize your public profile URL to remove
          random numbers.
        </li>
        <li>Copy the full URL including <code className="text-[var(--foreground)] bg-[var(--surface)] px-1 rounded">https://</code>.</li>
      </ol>
      <h3 className="text-xl font-semibold text-[var(--foreground)] mt-4">
        Company page URL
      </h3>
      <ol className="list-decimal space-y-2 pl-5">
        <li>Search for your company on LinkedIn or navigate from your profile if you&apos;re an admin.</li>
        <li>
          The URL format is{" "}
          <code className="text-[var(--foreground)] bg-[var(--surface)] px-1 rounded">
            linkedin.com/company/company-name
          </code>
          .
        </li>
        <li>Copy the full URL for trade show booths, recruiting materials, or office signage.</li>
      </ol>
      <p className="mt-4">
        <strong className="text-[var(--foreground)]">Tip:</strong> Test your URL
        in an incognito/private browser window to confirm it&apos;s publicly
        accessible. If your profile is set to &quot;connections only,&quot;
        scanners who aren&apos;t already connected will see a restricted view.
      </p>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        LinkedIn&apos;s built-in QR code feature
      </h2>
      <p>
        LinkedIn&apos;s mobile app includes a QR code feature. In the app, tap
        the search bar, then tap the QR icon (small square) to the right of the
        search field. This shows your profile QR and lets you scan other
        people&apos;s codes.
      </p>
      <p>
        This built-in feature works fine for quick in-person exchanges when both
        parties have the LinkedIn app open. However, it has limitations for
        professional print materials:
      </p>
      <ul className="list-disc space-y-2 pl-5">
        <li>The QR image you can save is a fixed design — you cannot add your logo or brand colors.</li>
        <li>Resolution is limited, which can cause blurry prints on large formats.</li>
        <li>There&apos;s no SVG export for crisp vector printing.</li>
        <li>You cannot track how many times the code was scanned.</li>
        <li>If you change roles or want to point to a company page instead, you need a new image.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        Why create a custom LinkedIn QR code
      </h2>
      <p>
        A custom QR code built in{" "}
        <Link href="/studio" className="text-[var(--brand-2)] underline">
          {siteConfig.name} Studio
        </Link>{" "}
        offers advantages that matter for business cards and professional print:
      </p>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong className="text-[var(--foreground)]">Logo and colors:</strong>{" "}
          Add your headshot, company logo, or brand colors to match your card
          design. Keep logos modest to preserve scan reliability — see our{" "}
          <Link
            href="/blog/error-correction-logos-pretty-qr-fail"
            className="text-[var(--brand-2)] underline"
          >
            guide on error correction and logos
          </Link>
          .
        </li>
        <li>
          <strong className="text-[var(--foreground)]">SVG export:</strong>{" "}
          Vector files scale perfectly for any print size, from small badge
          inserts to roll-up banners.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">PNG without watermark:</strong>{" "}
          {siteConfig.name} static codes are free with no watermark, so you get
          clean files ready for your designer.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">
            Dynamic option for flexibility:
          </strong>{" "}
          With a{" "}
          <Link
            href="/guides/dynamic-qr-code"
            className="text-[var(--brand-2)] underline"
          >
            dynamic QR code
          </Link>
          , you can change the destination URL after printing — useful when you
          change jobs, switch from personal to company page, or want scan
          analytics. Free includes 1 dynamic code; Pro ($12/month) unlocks
          unlimited dynamics with full scan history.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        Creating your LinkedIn QR code
      </h2>
      <ol className="list-decimal space-y-3 pl-5">
        <li>
          Open the{" "}
          <Link href="/studio" className="text-[var(--brand-2)] underline">
            Studio
          </Link>{" "}
          and select the URL type.
        </li>
        <li>Paste your LinkedIn profile or company page URL.</li>
        <li>
          <strong className="text-[var(--foreground)]">Decide: static or dynamic?</strong>{" "}
          Static is fine if your LinkedIn URL is stable. Choose dynamic if you
          might redirect to a different profile later or want to track scans per
          event. Read{" "}
          <Link
            href="/guides/static-vs-dynamic-qr-code"
            className="text-[var(--brand-2)] underline"
          >
            static vs dynamic
          </Link>{" "}
          for a detailed comparison.
        </li>
        <li>
          In the Design tab, add your logo (optional) and adjust colors. Stick
          to dark modules on a light background for best scan reliability.
        </li>
        <li>Preview the code and test-scan with your phone&apos;s camera.</li>
        <li>
          Download PNG for digital use or email signatures, SVG for business
          cards and large print.
        </li>
      </ol>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        Where to put your LinkedIn QR code
      </h2>
      <p>
        A LinkedIn QR code is useful anywhere you want to make connecting easy.
        Here are the most common placements with specific tips for each:
      </p>

      <h3 className="text-xl font-semibold text-[var(--foreground)] mt-4">
        Business cards
      </h3>
      <p>
        The classic use case. Place the QR on the back of your card with a short
        label like &quot;Connect on LinkedIn.&quot; Size matters: on a standard
        85 × 55 mm card, aim for at least 2 × 2 cm (about 0.8 inches) for the
        code. Smaller codes with logos struggle to scan. Our{" "}
        <Link
          href="/guides/qr-code-for-business-card"
          className="text-[var(--brand-2)] underline"
        >
          business card QR guide
        </Link>{" "}
        covers design, vCard vs URL decisions, and printer file formats.
      </p>
      <p>
        Many professionals put a{" "}
        <Link
          href="/guides/vcard-qr-code"
          className="text-[var(--brand-2)] underline"
        >
          vCard QR
        </Link>{" "}
        on one side (for instant contact save) and a LinkedIn QR on the other
        (for the full profile with recommendations and posts).
      </p>

      <h3 className="text-xl font-semibold text-[var(--foreground)] mt-4">
        Conference badges and name tags
      </h3>
      <p>
        Lanyard badges scan differently than cards — they hang vertically,
        people scan from odd angles, and conference lighting can glare on glossy
        holders. Use high contrast, skip decorative gradients, and size
        generously if badge dimensions allow. Consider a{" "}
        <Link
          href="/guides/dynamic-qr-code"
          className="text-[var(--brand-2)] underline"
        >
          dynamic code
        </Link>{" "}
        if you reuse the same badge across multiple events and want to track
        scans per conference.
      </p>

      <h3 className="text-xl font-semibold text-[var(--foreground)] mt-4">
        Presentation slides
      </h3>
      <p>
        A &quot;Let&apos;s connect&quot; closing slide with your LinkedIn QR
        works well for webinars, conference talks, and sales decks. Size the
        code large enough for phone cameras to scan from audience distance — for
        a projected slide, that usually means taking up a good portion of the
        screen. PNG is fine for slides; SVG is overkill unless you&apos;re also
        printing handouts.
      </p>

      <h3 className="text-xl font-semibold text-[var(--foreground)] mt-4">
        Email signatures
      </h3>
      <p>
        An email signature QR bridges digital messages and mobile devices.
        Recipients on desktop can click the link; those checking email on one
        phone can scan from a second device (or print the email). Keep it small
        — roughly 100–130 pixels wide — and use a simple design without heavy
        logos at this scale. Our{" "}
        <Link
          href="/guides/qr-code-for-email-signature"
          className="text-[var(--brand-2)] underline"
        >
          email signature QR guide
        </Link>{" "}
        covers Gmail and Outlook setup.
      </p>

      <h3 className="text-xl font-semibold text-[var(--foreground)] mt-4">
        Trade show booths and banners
      </h3>
      <p>
        Large format printing needs SVG or high-resolution PNG exported at the
        final print dimensions. Use the ~10:1 rule: code width should be roughly
        1/10 of the expected scanning distance. For a banner viewed from 2
        meters, size the code at least 20 cm. Our{" "}
        <Link
          href="/blog/print-qr-codes-that-scan"
          className="text-[var(--brand-2)] underline"
        >
          print checklist
        </Link>{" "}
        covers distance, proofing, and common failures.
      </p>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        Print sizing tips
      </h2>
      <p>
        QR codes fail silently — they look fine until someone tries to scan and
        nothing happens. Follow these sizing guidelines:
      </p>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong className="text-[var(--foreground)]">Minimum for business cards:</strong>{" "}
          2 × 2 cm without logos, slightly larger if you add a center mark.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Badges and small print:</strong>{" "}
          At least 2.5 cm if conditions are suboptimal (glossy surfaces, dim
          lighting).
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Distance formula:</strong>{" "}
          Code width ≈ scan distance ÷ 10, then add margin for logos and dense URLs.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Always proof:</strong>{" "}
          Print one sample at actual size and test-scan with both iPhone and
          Android cameras before ordering a batch.
        </li>
      </ul>
      <p>
        See{" "}
        <Link
          href="/guides/qr-code-size-for-print"
          className="text-[var(--brand-2)] underline"
        >
          QR code size for print
        </Link>{" "}
        for a complete reference table.
      </p>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        Static vs dynamic: when each makes sense
      </h2>
      <p>
        A static QR code encodes your LinkedIn URL directly. Once printed,
        it&apos;s permanent — if you change jobs and get a new LinkedIn profile
        (rare, but it happens), or want to switch from personal to company page,
        you&apos;ll need to reprint.
      </p>
      <p>
        A{" "}
        <Link
          href="/guides/dynamic-qr-code"
          className="text-[var(--brand-2)] underline"
        >
          dynamic QR code
        </Link>{" "}
        encodes a short redirect URL that you can update anytime. Benefits
        include:
      </p>
      <ul className="list-disc space-y-2 pl-5">
        <li>Change the destination without reprinting badges or cards.</li>
        <li>Track scan counts and see when/where people connect.</li>
        <li>A/B test sending some scans to your profile and others to a company page.</li>
      </ul>
      <p>
        For most personal business cards with a stable profile, static is fine
        and simpler. For team materials, reusable conference badges, or when you
        want analytics, dynamic pays for itself in flexibility. Pro ($12/month)
        includes unlimited dynamic codes, full scan history, CSV export, and
        custom short-link slugs.
      </p>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        Common mistakes to avoid
      </h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong className="text-[var(--foreground)]">Profile not public:</strong>{" "}
          If your profile is restricted to connections only, scanners see
          limited info. Check visibility in LinkedIn settings.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Outdated headline or photo:</strong>{" "}
          Scanners judge quickly. Update your profile before a major networking
          event.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Wrong URL:</strong>{" "}
          Accidentally encoding a search results page or an old profile URL with
          a different ID happens more than you&apos;d think. Verify the
          destination.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Code too small:</strong>{" "}
          Tiny codes with logos fail on older phones. Test at final print size.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Low contrast:</strong>{" "}
          Light brand colors on cream paper, or dark codes on dark backgrounds,
          confuse cameras. Stick to dark-on-light.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Heavy logo overlay:</strong>{" "}
          Logos covering more than ~25% of the code area risk scan failures. See{" "}
          <Link
            href="/blog/error-correction-logos-pretty-qr-fail"
            className="text-[var(--brand-2)] underline"
          >
            error correction and logos
          </Link>
          .
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Screenshot of LinkedIn&apos;s app QR:</strong>{" "}
          Saving a low-resolution screenshot instead of generating a proper
          print-ready file leads to blurry results.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">No label:</strong>{" "}
          Always add a caption like &quot;Scan to connect on LinkedIn&quot; so
          people know what the code does.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        Wrapping up
      </h2>
      <p>
        A LinkedIn QR code turns handshakes into connections and booth visits
        into followers. Start with your clean profile or company page URL,
        decide whether static or dynamic fits your use case, create a branded
        code in the{" "}
        <Link href="/studio" className="text-[var(--brand-2)] underline">
          Studio
        </Link>
        , and test before you print. For deeper dives, see our{" "}
        <Link
          href="/guides/qr-code-for-linkedin"
          className="text-[var(--brand-2)] underline"
        >
          LinkedIn QR guide
        </Link>{" "}
        (quick reference) and{" "}
        <Link
          href="/guides/qr-code-for-business-card"
          className="text-[var(--brand-2)] underline"
        >
          business card QR guide
        </Link>{" "}
        (vCard vs URL, design tips).
      </p>
      <p>
        Questions?{" "}
        <Link href="/contact" className="text-[var(--brand-2)] underline">
          Contact
        </Link>{" "}
        {siteConfig.parentCompany.name} at {siteConfig.emails.hello}.
      </p>
    </article>
  );
}
