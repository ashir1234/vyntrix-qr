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
