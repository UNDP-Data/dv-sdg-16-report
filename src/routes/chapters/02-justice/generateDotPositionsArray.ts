export interface Point {
  x: number;
  y: number;
}

export interface DotPosition {
  id: number;
  cloud: Point;
  reported: Point;
}

interface Ring {
  innerRadius: number;
  outerRadius: number;
}

interface Target {
  radius: number;
  capacity: number;
}

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
const TOTAL_DOTS = 100;
const RANDOM_DOTS = TOTAL_DOTS - 1;

const generateRandomPointInRing = (center: Point, cloud: Ring): Point => {
  const angle = Math.random() * Math.PI * 2;
  const radius = Math.sqrt(
    Math.random() * (cloud.outerRadius ** 2 - cloud.innerRadius ** 2) + cloud.innerRadius ** 2,
  );
  return {
    x: center.x + radius * Math.cos(angle),
    y: center.y + radius * Math.sin(angle),
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
  center: Point,
  cloud: Ring,
  target: Target,
  pointRadius: number,
  fixedCloudPoint: Point,
) => {
  const points: DotPosition[] = [];
  const cloudPoints: Point[] = [fixedCloudPoint];
  let counter = 0;

  const reportedPosition = (id: number): Point => {
    const spiralRadius = target.radius * Math.sqrt((id + 0.5) / target.capacity);
    const spiralAngle = id * GOLDEN_ANGLE;
    return {
      x: center.x + spiralRadius * Math.cos(spiralAngle),
      y: center.y + spiralRadius * Math.sin(spiralAngle),
    };
  };

  while (points.length < RANDOM_DOTS) {
    const cloudPoint = generateRandomPointInRing(center, cloud);

    if (!checkCollision(cloudPoint, pointRadius, cloudPoints) || counter > 12) {
      const id = points.length;

      points.push({ id, cloud: cloudPoint, reported: reportedPosition(id) });
      cloudPoints.push(cloudPoint);
      counter = 0;
    } else {
      counter += 1;
    }
  }

  points.push({
    id: RANDOM_DOTS,
    cloud: fixedCloudPoint,
    reported: reportedPosition(RANDOM_DOTS),
  });

  return points;
};
