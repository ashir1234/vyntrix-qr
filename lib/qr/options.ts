import type { Options } from "qr-code-styling";
import { isCustomDotType } from "./patternCanvas";
import type { QrStyle } from "./types";

export interface BuildOptionsArgs {
  data: string;
  style: QrStyle;
  size?: number;
  /** transparent background is handy when compositing onto a 3D material */
  transparentBg?: boolean;
}

export function buildQrOptions({
  data,
  style,
  size = 320,
  transparentBg = false,
}: BuildOptionsArgs): Options {
  const dotsColor = style.fgColor;
  const gradient = style.useGradient
    ? {
        type: style.gradientType,
        rotation: style.gradientType === "linear" ? Math.PI / 4 : 0,
        colorStops: [
          { offset: 0, color: style.fgColor },
          { offset: 1, color: style.gradientColor },
        ],
      }
    : undefined;

  const dotsType = isCustomDotType(style.dotType) ? "dots" : style.dotType;

  return {
    width: size,
    height: size,
    type: "canvas",
    data: data || " ",
    margin: style.margin,
    qrOptions: {
      errorCorrectionLevel: style.errorCorrection,
    },
    image: style.logoDataUrl ?? undefined,
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 6,
      imageSize: style.logoSize,
      hideBackgroundDots: true,
    },
    dotsOptions: {
      color: dotsColor,
      type: dotsType,
      gradient,
    },
    cornersSquareOptions: {
      color: style.fgColor,
      type: style.cornerSquareType,
    },
    cornersDotOptions: {
      color: style.useGradient ? style.gradientColor : style.fgColor,
      type: style.cornerDotType,
    },
    backgroundOptions: {
      color: transparentBg ? "transparent" : style.bgColor,
    },
  };
}
