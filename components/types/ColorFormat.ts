export type HexChar =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 0
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F";
export type DoubleHexChar = `${HexChar}${HexChar}`;

export type colorValue = string;

export type RendererProduct = {
  type: string;
  render: () => colorValue;
};

export type Renderer = (colorValue: ApiColorValue) => RendererProduct;

export type Pass = {
  type: string;
  [key: string]: [number, number] | string | (string[] & number[]);
};

/**
 * @internal
 */
export type ApiColorValue = {
  type: string;
  [key: string]: string | number;
};

// Color string format here

export type RGBValue = `rgb(${string | number},${string | number},${
  | string
  | number})` &
  colorValue;

export type HSLValue = `hsl(${string | number},${string | number}%,${
  | string
  | number}%)` &
  colorValue;

export type HexValue =
  | `#${HexChar}${HexChar}${HexChar}`
  | (`#${string}` & colorValue);

// Add more here!
