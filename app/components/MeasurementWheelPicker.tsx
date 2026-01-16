import React, { useRef, useState, useEffect } from 'react';
import { FlatList, View, Text, StyleSheet, Animated } from 'react-native';

interface MeasurementWheelPickerProps {
  values: number[];
  unit: string;
  initialValue: number;
  onValueChange: (value: number) => void;
  renderValue?: (value: number) => string;
}

const ITEM_HEIGHT = 44;
const VISIBLE_ITEMS = 3;
const CONTAINER_HEIGHT = ITEM_HEIGHT * 2.4; // Proper iOS frame size

export function MeasurementWheelPicker({ values, unit, initialValue, onValueChange, renderValue }: MeasurementWheelPickerProps) {
  const flatListRef = useRef<FlatList>(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [selectedIndex, setSelectedIndex] = useState(values.indexOf(initialValue));
  const hasInitialized = useRef(false);
  
  const onLayoutOnce = () => {
    if (hasInitialized.current) return;

    const initialIndex = values.indexOf(initialValue);
    if (initialIndex !== -1 && flatListRef.current) {
      requestAnimationFrame(() => {
        flatListRef.current?.scrollToIndex({
          index: initialIndex,
          animated: false,
          viewPosition: 0.5,
        });
        hasInitialized.current = true;
      });
    }
  };

  const renderItem = ({ item, index }: { item: number; index: number }) => {
    // Calculate distance from center based on scroll position
    const inputRange = [
      (index - 1) * ITEM_HEIGHT,
      index * ITEM_HEIGHT,
      (index + 1) * ITEM_HEIGHT,
    ];
    
    const opacity = scrollY.interpolate({
      inputRange,
      outputRange: [0.4, 1, 0.4],
      extrapolate: 'clamp',
    });
    
    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [0.85, 1, 0.85],
      extrapolate: 'clamp',
    });

    const displayValue = renderValue ? renderValue(item) : `${item} ${unit}`;

    return (
      <Animated.View style={styles.itemContainer}>
        <Animated.Text
          style={[
            styles.itemText,
            {
              opacity,
              transform: [{ scale }],
              fontWeight: index === selectedIndex ? '600' : '500',
            },
          ]}
        >
          {displayValue}
        </Animated.Text>
      </Animated.View>
    );
  };

  const handleMomentumScrollEnd = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    
    if (index >= 0 && index < values.length) {
      setSelectedIndex(index);
      onValueChange(values[index]);
      
      // Smooth snap to center
      const handleMomentumScrollEnd = (event: any) => {
  const offsetY = event.nativeEvent.contentOffset.y;
  const index = Math.round(offsetY / ITEM_HEIGHT);

  if (index >= 0 && index < values.length) {
    setSelectedIndex(index);
    onValueChange(values[index]);
  }
};
    }
  };

  const getItemLayout = (data: any, index: number) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  });

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  return (
    <View style={styles.pickerFrame}>
      <View style={styles.container}>
        <View style={styles.fadeGradientTop} />
        <View style={styles.fadeGradientBottom} />
        <FlatList
          ref={flatListRef}
          onLayout={onLayoutOnce}
          data={values}
          renderItem={renderItem}
          keyExtractor={(item) => item.toString()}
          getItemLayout={getItemLayout}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate="fast"
          showsVerticalScrollIndicator={false}
          onMomentumScrollEnd={handleMomentumScrollEnd}
          onScroll={onScroll}
          scrollEventThrottle={16}
          style={styles.picker}
          contentContainerStyle={styles.pickerContent}
          bounces={true}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pickerFrame: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 4,
  },
  container: {
    height: CONTAINER_HEIGHT,
    width: 100,
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    flex: 1,
  },
  pickerContent: {
    paddingVertical: ITEM_HEIGHT * 0.7, // Center selected item properly
  },
  itemContainer: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 17,
    color: '#000',
    fontWeight: '500',
  },
  fadeGradientTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: ITEM_HEIGHT * 0.7,
    backgroundColor: '#F5F5F5',
    opacity: 0.9,
  },
  fadeGradientBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: ITEM_HEIGHT * 0.7,
    backgroundColor: '#F5F5F5',
    opacity: 0.9,
  },
});
