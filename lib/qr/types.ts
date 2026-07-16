export type QrContentType =
  | "url"
  | "text"
  | "wifi"
  | "vcard"
  | "email"
  | "sms"
  | "phone";

export type DotType =
  | "rounded"
  | "dots"
  | "classy"
  | "classy-rounded"
  | "square"
  | "extra-rounded";

export type CornerSquareType = "dot" | "square" | "extra-rounded";
export type CornerDotType = "dot" | "square";
export type ErrorCorrection = "L" | "M" | "Q" | "H";
export type GradientType = "linear" | "radial";

export type MaterialKind = "matte" | "glass" | "metallic" | "holographic";

export interface QrFields {
  // url / text
  url: string;
  text: string;
  // wifi
  wifiSsid: string;
  wifiPassword: string;
  wifiEncryption: "WPA" | "WEP" | "nopass";
  wifiHidden: boolean;
  // vcard
  vcFirstName: string;
  vcLastName: string;
  vcOrg: string;
  vcTitle: string;
  vcPhone: string;
  vcEmail: string;
  vcUrl: string;
  // email
  emailTo: string;
  emailSubject: string;
  emailBody: string;
  // sms
  smsTo: string;
  smsBody: string;
  // phone
  phoneNumber: string;
}

export interface QrStyle {
  fgColor: string;
  bgColor: string;
  useGradient: boolean;
  gradientColor: string;
  gradientType: GradientType;
  dotType: DotType;
  cornerSquareType: CornerSquareType;
  cornerDotType: CornerDotType;
  errorCorrection: ErrorCorrection;
  margin: number;
  logoDataUrl: string | null;
  logoSize: number; // 0..1 relative
}

export interface QrPreset {
  id: string;
  name: string;
  style: Partial<QrStyle>;
  material?: MaterialKind;
}
