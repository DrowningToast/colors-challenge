import { Pass, RGBValue } from "../types/ColorFormat";

export default function RGBPass(): Pass {
  return {
    type: "RGB",
    red: [0, 256],
    green: [0, 256],
    blue: [0, 256],
  };
}
