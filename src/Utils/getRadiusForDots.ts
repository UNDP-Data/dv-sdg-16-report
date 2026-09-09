export function getRadiusForDots(graphRadius: number) {
  if (graphRadius < 150) return 4;
  if (graphRadius < 200) return 5;
  return 6;
}
