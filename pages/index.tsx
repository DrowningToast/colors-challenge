import { NextPage } from "next";
import ColorRenderer from "../components/renderers/ColorRenderer";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { ApiColorValue } from "../components/types/ColorFormat";
import axios from "axios";
// import { R2, RGBValue } from "../components/types/ColorFormat";
const Home: NextPage = () => {
  const [colors, setColors] = useState<ApiColorValue[] | null>(null);
  const [types, setTypes] = useState<string[] | null>(null);
  const type = useRef<HTMLSelectElement>(null);

  const fetchColors = async () => {
    if (!type.current) return;
    const colors = await axios.get<ApiColorValue[]>(
      `/api/randomizer/${type.current.value}/5`
    );
    setColors(colors.data);
  };

  const fetchTypes = async () => {
    const types = await axios.get<string[]>(`api/format`);
    setTypes(types.data);
  };

  // Fetch the colors for the first time
  useEffect(() => {
    fetchColors();
    fetchTypes();
  }, []);

  // Fetch all type of color format
  useEffect(() => {}, []);

  return (
    <>
      <Head>
        <title>Colors Challenge</title>
      </Head>
      <main className="w-full min-h-full">
        <div className="text-center justify-center w-full h-1/10vh items-center flex">
          <h1 className="text-5xl font-extrabold gradientText">Colors</h1>
        </div>
        <div className="w-full min-h-full h-9/10vh grid grid-cols-5 place-items-center relative">
          {colors &&
            colors.map((colorValue, index) => {
              return (
                <ColorRenderer
                  key={index}
                  id={index}
                  color={{ ...colorValue }}
                />
              );
            })}
          <div className="z-0 overflow-hidden flex justify-evenly items-center px-2 py-2 absolute bottom-12 inset-x-12 h-32 rounded-2xl">
            <div className="absolute inset-0 bg-gray-400 opacity-50 backdrop-blur-3xl blur-3xl -z-10"></div>
            <button
              onClick={async () => {
                await fetchColors();
              }}
              className="border-4 border-gray-200 py-2 px-12 rounded-lg text-white font-medium"
            >
              Generate
            </button>
            <select
              ref={type}
              className="border-2 px-2 py-2 border-gray-200 w-36 rounded-lg bg-none"
              name="type"
              id="returnValue"
            >
              <option value="ANY">Any</option>
              {types &&
                types.map((type) => {
                  return <option value={type}>Only {type}</option>;
                })}
            </select>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
