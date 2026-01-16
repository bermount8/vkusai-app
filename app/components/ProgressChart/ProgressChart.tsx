import React, { useMemo, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Svg, {
  Path,
  Defs,
  LinearGradient,
  Stop,
  Circle,
} from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import {
  normalizeData,
  buildPath,
  buildAreaPath,
  smoothData,
  buildSmoothPath,
} from './chartUtils';

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface Props {
  aiData: number[];
  traditionalData: number[];
  width?: number;
  height?: number;
}

export function ProgressChart({
  aiData,
  traditionalData,
  width = 320,
  height = 140,
}: Props) {
  const progress = useSharedValue(0);

  const aiSmooth = useMemo(() => smoothData(aiData, 3), [aiData]);

  const aiPoints = useMemo(
    () => normalizeData(aiSmooth, width, height),
    [aiSmooth, width, height]
  );

  const tradPoints = useMemo(
    () => normalizeData(traditionalData, width, height),
    [traditionalData, width, height]
  );

  const aiPath = buildSmoothPath(aiPoints);
  const areaPath = buildAreaPath(aiPoints, height);
  const tradPath = buildPath(tradPoints);

  const pathLength = width * 2;

  useEffect(() => {
    progress.value = withTiming(1, {
      duration: 1200,
      easing: Easing.out(Easing.cubic),
    });
  }, []);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: pathLength * (1 - progress.value),
  }));

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Your weight</Text>

      <Svg width={width} height={height}>
        <Defs>
          <LinearGradient id="aiGradient" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#000" stopOpacity="0.25" />
            <Stop offset="100%" stopColor="#000" stopOpacity="0" />
          </LinearGradient>
        </Defs>

        {/* Traditional */}
        <Path
          d={tradPath}
          stroke="#C7C7CC"
          strokeWidth={3}
          fill="none"
          strokeLinecap="round"
        />

        {/* AI Gradient */}
        <Path d={areaPath} fill="url(#aiGradient)" />

        {/* AI Line */}
        <AnimatedPath
          d={aiPath}
          stroke="#000"
          strokeWidth={3}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={pathLength}
          animatedProps={animatedProps}
        />

        {/* Start / End points */}
        <Circle
          cx={aiPoints[0].x}
          cy={aiPoints[0].y}
          r={4}
          fill="#000"
        />
        <Circle
          cx={aiPoints.at(-1)!.x}
          cy={aiPoints.at(-1)!.y}
          r={4}
          fill="#000"
        />
      </Svg>

      {/* Axis */}
      <View style={styles.axis}>
        <Text style={styles.axisText}>Month 1</Text>
        <Text style={styles.axisText}>Month 6</Text>
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        <LegendItem color="#000" label="Cal AI" />
        <LegendItem color="#C7C7CC" label="Traditional" />
      </View>
    </View>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <View style={styles.legendItem}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={styles.legendText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F5F5F7',
    borderRadius: 20,
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  axis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  axisText: {
    fontSize: 12,
    color: '#999',
  },
  legend: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendText: {
    fontSize: 13,
    color: '#666',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
