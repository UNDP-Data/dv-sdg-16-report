export interface DotPosition {
  id: number;
  cloudX: number;
  cloudY: number;
  reportedX: number;
  reportedY: number;
}

interface Point {
  x: number;
  y: number;
}

interface Ring {
  centerX: number;
  centerY: number;
  innerRadius: number;
  outerRadius: number;
}

interface Target {
  centerX: number;
  centerY: number;
  radius: number;
  capacity: number;
}

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

const generateRandomPointInRing = (cloud: Ring) => {
  const angle = Math.random() * Math.PI * 2;
  const radius = Math.sqrt(
    Math.random() * (cloud.outerRadius ** 2 - cloud.innerRadius ** 2) + cloud.innerRadius ** 2,
  );
  return {
    x: cloud.centerX + radius * Math.cos(angle),
    y: cloud.centerY + radius * Math.sin(angle),
  };
};

const checkCollision = (candidate: Point, pointRadius: number, points: Point[]) => {
  for (const point of points) {
    const dx = candidate.x - point.x;
    const dy = candidate.y - point.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < pointRadius * 2) {
      return true;
    }
  }
  return false;
};

export const generateDotPositionsArray = (
  noOfPoints: number,
  cloud: Ring,
  target: Target,
  pointRadius = 6,
) => {
  const points: DotPosition[] = [];
  const cloudPoints: Point[] = [];
  let counter = 0;

  while (points.length < noOfPoints) {
    const cloudPoint = generateRandomPointInRing(cloud);

    if (!checkCollision(cloudPoint, pointRadius, cloudPoints) || counter > 12) {
      const id = points.length;
      const spiralRadius = target.radius * Math.sqrt((id + 0.5) / target.capacity);
      const spiralAngle = id * GOLDEN_ANGLE;

      points.push({
        id,
        cloudX: cloudPoint.x,
        cloudY: cloudPoint.y,
        reportedX: target.centerX + spiralRadius * Math.cos(spiralAngle),
        reportedY: target.centerY + spiralRadius * Math.sin(spiralAngle),
      });
      cloudPoints.push(cloudPoint);
      counter = 0;
    } else {
      counter += 1;
    }
  }

  return points;
};
