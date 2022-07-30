import { colorValue, Renderer, RGBValue } from "../types/ColorFormat";

const RGBRenderer: Renderer = (colorValue) => {
  return {
    type: "RGB",
    render: (): colorValue => {
      const colorString: RGBValue = `rgb(${colorValue.red},${colorValue.green},${colorValue.blue})`;
      return colorString;
    },
  };
};

export default RGBRenderer;
