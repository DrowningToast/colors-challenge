import { Pass } from "../types/ColorFormat";

export default function HSLPass(): Pass {
  return {
    type: "HSL",
    hue: [0, 361],
    saturation: [0, 100],
    lightness: [0, 100],
  };
}
