interface CoordinatesProps {
  id: number;
  x: number;
  y: number;
  color: string;
  distanceFromCenter: number;
  registered: boolean;
}

const generateRandomPoint = (circleRadius: number) => {
  const angle = Math.random() * Math.PI * 2;
  const distanceFromCenter = Math.sqrt(Math.random()) * circleRadius;
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
    if (distance < pointRadius * 2) {
      return true;
    }
  }
  return false;
};

export const generateUniqueRandomPointsArray = (
  noOfPoints: number,
  areaRadius: number,
  threshold: number,
  pointRadius = 7.5,
) => {
  const points: CoordinatesProps[] = [];
  let counter = 0;
  while (points.length < noOfPoints) {
    const newPoint = generateRandomPoint(areaRadius);
    if (!checkCollision(newPoint, pointRadius, points) || counter > 10) {
      points.push({
        id: points.length,
        x: newPoint.x,
        y: newPoint.y,
        registered: points.length >= threshold,
        color: points.length >= threshold ? 'var(--tertiary)' : 'var(--error)',
        distanceFromCenter: newPoint.distanceFromCenter,
      });
      counter = 0;
    } else {
      counter += 1;
    }
  }
  return points;
};
