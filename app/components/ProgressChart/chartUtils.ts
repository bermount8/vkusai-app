import { ChartPoint } from './types';

export function normalizeData(
  data: number[],
  width: number,
  height: number
): ChartPoint[] {
  const max = Math.max(...data);
  const min = Math.min(...data);

  return data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - min) / (max - min)) * height;
    return { x, y };
  });
}

// Сглаживание (moving average)
export function smoothData(data: number[], window = 3) {
  return data.map((_, i) => {
    const slice = data.slice(
      Math.max(0, i - window),
      Math.min(data.length, i + window + 1)
    );
    return slice.reduce((a, b) => a + b, 0) / slice.length;
  });
}

// Линия
export function buildPath(points: ChartPoint[]): string {
  return points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ');
}

// Заливка
export function buildAreaPath(points: ChartPoint[], height: number): string {
  const line = buildPath(points);
  const last = points[points.length - 1];
  return `${line} L ${last.x} ${height} L 0 ${height} Z`;
}

export function buildSmoothPath(points: ChartPoint[]): string {
  if (points.length < 2) return '';

  const smoothing = 0.2;

  const line = (pointA: ChartPoint, pointB: ChartPoint) => {
    const lengthX = pointB.x - pointA.x;
    const lengthY = pointB.y - pointA.y;
    return {
      length: Math.sqrt(lengthX ** 2 + lengthY ** 2),
      angle: Math.atan2(lengthY, lengthX),
    };
  };

  const controlPoint = (
    current: ChartPoint,
    previous: ChartPoint | null,
    next: ChartPoint | null,
    reverse = false
  ) => {
    const p = previous || current;
    const n = next || current;
    const o = line(p, n);
    const angle = o.angle + (reverse ? Math.PI : 0);
    const length = o.length * smoothing;
    return {
      x: current.x + Math.cos(angle) * length,
      y: current.y + Math.sin(angle) * length,
    };
  };

  return points.reduce((acc, point, i, a) => {
    if (i === 0) return `M ${point.x} ${point.y}`;

    const cps = controlPoint(a[i - 1], a[i - 2] || null, point);
    const cpe = controlPoint(point, a[i - 1], a[i + 1] || null, true);

    return (
      acc +
      ` C ${cps.x} ${cps.y}, ${cpe.x} ${cpe.y}, ${point.x} ${point.y}` 
    );
  }, '');
}
