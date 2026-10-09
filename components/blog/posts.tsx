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
