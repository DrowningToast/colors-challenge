import { Pass } from "../types/ColorFormat";
import HSLPass from "./HSLPass";
import RGBPass from "./RGBPass";

export default function Passes(): Pass[] {
  // Color passes generate color in their respective format
  // There're 2 passes already builtin the system, they're functions which return Pass object
  // Pass always contains "type" property, working as a unqiue identifier. And other value the format needs
  return [
    RGBPass(),
    HSLPass(),
    // Add new passes here!
  ];
}
