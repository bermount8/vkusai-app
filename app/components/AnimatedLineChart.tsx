import React, { useEffect, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface AnimatedLineChartProps {
  data: number[];
  width?: number;
  height?: number;
}

export function AnimatedLineChart({
  data,
  width = 300,
  height = 140,
}: AnimatedLineChartProps) {
  const progress = useSharedValue(0);

  const { path, points, pathLength } = useMemo(() => {
    const max = Math.max(...data);
    const min = Math.min(...data);

    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y =
        height - ((value - min) / (max - min)) * height;
      return { x, y };
    });

    const path = points
      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
      .join(' ');

    const pathLength = width * 2;

    return { path, points, pathLength };
  }, [data, width, height]);

  useEffect(() => {
    progress.value = withTiming(1, {
      duration: 1200,
      easing: Easing.out(Easing.cubic),
    });
  }, []);

  const animatedPathProps = useAnimatedProps(() => ({
    strokeDashoffset: pathLength * (1 - progress.value),
  }));

  const animatedDotProps = useAnimatedProps(() => {
    const index = Math.floor(progress.value * (points.length - 1));
    const point = points[index] || points[0];

    return {
      cx: point.x,
      cy: point.y,
    };
  });

  return (
    <View style={styles.container}>
      <Svg width={width} height={height}>
        <AnimatedPath
          d={path}
          stroke="#000"
          strokeWidth={3}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={pathLength}
          animatedProps={animatedPathProps}
        />
        <AnimatedCircle
          r={5}
          fill="#000"
          animatedProps={animatedDotProps}
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
