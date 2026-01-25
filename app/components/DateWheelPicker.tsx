import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MeasurementWheelPicker } from './MeasurementWheelPicker';

interface DateWheelPickerProps {
  onDateChange: (day: number, month: number, year: number) => void;
  initialDay?: number;
  initialMonth?: number;
  initialYear?: number;
}

export function DateWheelPicker({ 
  onDateChange, 
  initialDay = 1, 
  initialMonth = 1, 
  initialYear = 2000 
}: DateWheelPickerProps) {
  const [selectedDay, setSelectedDay] = useState(initialDay);
  const [selectedMonth, setSelectedMonth] = useState(initialMonth);
  const [selectedYear, setSelectedYear] = useState(initialYear);
  
  // Generate year options (current year going back 100 years)
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 101 }, (_, i) => currentYear - 100 + i);

  // Generate month options (1-12)
  const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1);

  // Get max days for selected month and year
  const getMaxDays = (month: number, year: number) => {
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let maxDays = daysInMonth[month - 1];
    
    // Handle leap year for February
    if (month === 2 && ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0)) {
      maxDays = 29;
    }
    
    return maxDays;
  };

  // Generate day options based on selected month/year
  const maxDays = getMaxDays(selectedMonth, selectedYear);
  const dayOptions = Array.from({ length: maxDays }, (_, i) => i + 1);

  // Clamp day if it exceeds max days when month/year changes
  useEffect(() => {
    if (selectedDay > maxDays) {
      setSelectedDay(maxDays);
    }
  }, [maxDays, selectedDay]);

  // Notify parent of date changes
  useEffect(() => {
    onDateChange(selectedDay, selectedMonth, selectedYear);
  }, [selectedDay, selectedMonth, selectedYear, onDateChange]);

  const handleDayChange = (value: number) => {
    setSelectedDay(value);
  };

  const handleMonthChange = (value: number) => {
    setSelectedMonth(value);
  };

  const handleYearChange = (value: number) => {
    setSelectedYear(value);
  };

  // Format values with leading zeros
  const formatDay = (value: number) => value.toString().padStart(2, '0');
  const formatMonth = (value: number) => value.toString().padStart(2, '0');

  return (
    <View style={styles.dateFrame}>
      <View style={styles.row}>
        <MeasurementWheelPicker
          values={dayOptions}
          unit=""
          initialValue={initialDay}
          onValueChange={handleDayChange}
          renderValue={formatDay}
        />
        <Text style={styles.dot}>.</Text>
        <MeasurementWheelPicker
          values={monthOptions}
          unit=""
          initialValue={initialMonth}
          onValueChange={handleMonthChange}
          renderValue={formatMonth}
        />
        <Text style={styles.dot}>.</Text>
        <MeasurementWheelPicker
          values={yearOptions}
          unit=""
          initialValue={initialYear}
          onValueChange={handleYearChange}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dateFrame: {
    backgroundColor: '#F5F5F7',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginTop: 32,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000',
    marginHorizontal: 6,
    marginBottom: 2,
  },
});
