interface CoordinatesProps {
  id: number;
  x: number;
  y: number;
  regionX: number;
  regionY: number;
  color: string;
  distanceFromCenter: number;
  registered: boolean;
}

const generateRandomPoint = (circleRadius: number, innerRadius: number) => {
  const angle = Math.random() * Math.PI * 2;
  const distanceFromCenter = Math.sqrt(Math.random()) * (circleRadius - innerRadius) + innerRadius;
  const x = distanceFromCenter * Math.cos(angle);
  const y = distanceFromCenter * Math.sin(angle);
  return { x, y, distanceFromCenter };
};

const checkCollision = (
  newPoint: { x: number; y: number; distanceFromCenter: number },
  pointRadius: number,
  points: CoordinatesProps[],
) => {
  for (const point of points) {
    const dx = newPoint.x - point.x;
    const dy = newPoint.y - point.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < pointRadius * 4) {
      return true;
    }
  }
  return false;
};

const findRegionCoordinate = (
  regionList: { region: string; unregisteredBirths: number }[],
  dotId: number,
  height: number,
  pointRadius: number,
) => {
  let start = 0;
  const y = regionList.findIndex(({ unregisteredBirths }) => {
    const end = start + unregisteredBirths;
    const found = dotId >= start && dotId < end;

    if (!found) start = end;

    return found;
  });

  if (y === -1) return [0, 0];

  const x = dotId - start;

  return [
    pointRadius + (pointRadius * 2 + 5) * (x % 20),
    (y * height) / regionList.length +
      40 +
      pointRadius +
      (pointRadius * 2 + 5) * Math.floor(x / 20),
  ];
};

export const generateUniqueRandomPointsArray = (
  noOfPoints: number,
  areaRadius: number,
  width: number,
  height: number,
  threshold: number,
  regionList: { region: string; unregisteredBirths: number }[],
  pointRadius = 6,
) => {
  const points: CoordinatesProps[] = [];
  let counter = 0;
  while (points.length < noOfPoints) {
    const newPoint = generateRandomPoint(areaRadius, 0);
    if (!checkCollision(newPoint, pointRadius, points) || counter > 1000) {
      points.push({
        id: points.length,
        x: newPoint.x,
        y: newPoint.y,
        regionX:
          points.length < threshold
            ? findRegionCoordinate(regionList, points.length, height, pointRadius)[0]
            : newPoint.x,
        regionY:
          points.length < threshold
            ? findRegionCoordinate(regionList, points.length, height, pointRadius)[1]
            : newPoint.y,
        registered: points.length >= threshold,
        color: points.length >= threshold ? 'var(--tertiary)' : 'var(--error)',
        distanceFromCenter: newPoint.distanceFromCenter,
      });
      counter = 0;
    } else {
      counter += 1;
    }
  }
  return points.map((d, i) => ({
    ...d,
    x: d.x + width / 2,
    y: d.y + height / 2,
    regionX: i < threshold ? d.regionX : d.regionX + width / 2,
    regionY: i < threshold ? d.regionY : d.regionY + height / 2,
  }));
};
