export default function Random(min: number = 0, max: number) {
  return min + Math.floor(Math.random() * (max - 1));
}
