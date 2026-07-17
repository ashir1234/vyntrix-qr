/**
 * Single source of truth for Free vs Pro. Consumed by quota checks (API),
 * the dashboard, the pricing page, and analytics gating.
 */

export type PlanId = "free" | "pro";

export interface PlanLimits {
  id: PlanId;
  name: string;
  /** Display price, e.g. "$0" or "$12". */
  price: string;
  priceSuffix: string;
  tagline: string;
  /** Max number of dynamic QR codes a user may own. null = unlimited. */
  maxDynamicCodes: number | null;
  /** Trailing days of scan analytics visible. null = full history. */
  analyticsWindowDays: number | null;
  /** Whether the plan can export scans as CSV. */
  csvExport: boolean;
  /** Whether the plan can set a custom slug. */
  customSlug: boolean;
  /** Whether ads are shown to this plan. */
  ads: boolean;
  /** Cloud Studio sync across devices. */
  cloudSync: boolean;
  /** Max saved projects. null = unlimited. 0 = feature locked. */
  maxProjects: number | null;
  /** Bulk dynamic QR creation from CSV. */
  bulkCreate: boolean;
  /** Max rows per bulk create job. */
  maxBulkRows: number;
  /** Hi-res / print-sheet exports. */
  printPack: boolean;
  /** Whether Pro can create dynamic WiFi landing pages (scan analytics). */
  wifiLanding: boolean;
  /** Bullet points for the pricing page. */
  features: string[];
}

export const PLAN_LIMITS: Record<PlanId, PlanLimits> = {
  free: {
    id: "free",
    name: "Free",
    price: "$0",
    priceSuffix: "forever",
    tagline: "Everything you need to make and share QR codes.",
    maxDynamicCodes: 1,
    analyticsWindowDays: 7,
    csvExport: false,
    customSlug: false,
    ads: true,
    cloudSync: false,
    maxProjects: 0,
    bulkCreate: false,
    maxBulkRows: 0,
    printPack: false,
    wifiLanding: false,
    features: [
      "Unlimited static QR codes",
      "Logos, colors, gradients & frames",
      "3D live preview",
      "PNG & SVG downloads",
      "1 dynamic (editable) QR code",
      "7-day scan analytics",
    ],
  },
  pro: {
    id: "pro",
    name: "Pro",
    price: "$12",
    priceSuffix: "/month",
    tagline: "For creators and businesses that live on their links.",
    maxDynamicCodes: null,
    analyticsWindowDays: null,
    csvExport: true,
    customSlug: true,
    ads: false,
    cloudSync: true,
    maxProjects: null,
    bulkCreate: true,
    maxBulkRows: 50,
    printPack: true,
    wifiLanding: true,
    features: [
      "Everything in Free",
      "Unlimited dynamic QR codes",
      "Dynamic WiFi pages + scan analytics",
      "Full scan history + analytics + CSV export",
      "Custom short-link slugs",
      "Cloud Studio sync across devices",
      "Project folders (group many QR codes)",
      "Bulk create from CSV",
      "Print pack (4K PNG, PDF sheet)",
      "No ads",
    ],
  },
};

export function planLimits(plan: PlanId): PlanLimits {
  return PLAN_LIMITS[plan];
}

/** True when the plan may create another dynamic code given current usage. */
export function canCreateDynamic(plan: PlanId, currentCount: number): boolean {
  const max = PLAN_LIMITS[plan].maxDynamicCodes;
  return max === null || currentCount < max;
}
