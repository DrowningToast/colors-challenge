import { FC, useEffect, useRef, useState } from "react";
import { ApiColorValue, RendererProduct } from "../types/ColorFormat";
import HSLRenderer from "./HSLRenderer";
import RGBRenderer from "./RGBRenderer";

interface Props {
  color: ApiColorValue;
  id: number;
}

/**
 * @internal
 */
const ColorRenderer: FC<Props> = ({ color, id }) => {
  const RendererCollection = RendererCollectionGenerator(color);
  const [colorString, setColorString] = useState<string | null>(null);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;
    RendererCollection.forEach((Renderer) => {
      if (color.type === Renderer.type) {
        container.current!.style.backgroundColor = Renderer.render();
        return setColorString(Renderer.render());
      }
    });
  }, [color, RendererCollection]);

  return (
    <div
      ref={container}
      style={{
        backgroundColor: `${colorString}`,
      }}
      className={`w-full h-full flex flex-col justify-evenly items-center bg-[${colorString}]`}
    >
      <h1 className="text-white font-bold text-4xl [writing-mode:vertical-lr] mix-blend-difference">
        {colorString}
      </h1>
    </div>
  );
};

/**
 * @description This function generates a collection of renderer. Edit the collection const to add more custom renderer function
 */
const RendererCollectionGenerator = (
  color: ApiColorValue
): RendererProduct[] => {
  // The internal render method receives the object from the backend and translate them into backgroundColor property
  // On the other hand, sepreate color renderer produces RendererProduct which is an object containing "type" as a unqiue identifier id
  // and contains the Render function which does the actual string formatting
  const collections = [
    RGBRenderer(color),
    HSLRenderer(color),
    // Add more custom color renderer into the array here!
  ];
  return collections;
};

export default ColorRenderer;
