import { colorValue, HSLValue, Renderer } from "../types/ColorFormat";

const HSLRenderer: Renderer = (colorValue) => {
  return {
    type: "HSL",
    render: (): colorValue => {
      const colorString: HSLValue = `hsl(${colorValue.hue},${colorValue.saturation}%,${colorValue.lightness}%)`;
      return colorString;
    },
  };
};

export default HSLRenderer;
