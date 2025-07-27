// components/calendar.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Animated,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Text } from '@/components/text';

interface CalendarProps {
  selectedDates: Date[];
  onDateSelect: (dates: Date[]) => void;
  isRange?: boolean;
}

const { width: screenWidth } = Dimensions.get('window');

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export default function Calendar({ selectedDates, onDateSelect, isRange = true }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedOption, setSelectedOption] = useState<'dates' | 'months' | 'flexible'>('dates');
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    animateSlider();
  }, [selectedOption]);

  const animateSlider = () => {
    const optionIndex = selectedOption === 'dates' ? 0 : selectedOption === 'months' ? 1 : 2;
    const targetPosition = optionIndex * 120; // Adjust based on your option width
    
    Animated.spring(slideAnim, {
      toValue: targetPosition,
      tension: 300,
      friction: 20,
      useNativeDriver: true,
    }).start();
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isDateSelected = (date: Date) => {
    return selectedDates.some(selectedDate => 
      selectedDate.toDateString() === date.toDateString()
    );
  };

  const isDateInRange = (date: Date) => {
    if (selectedDates.length !== 2) return false;
    const [start, end] = selectedDates.sort((a, b) => a.getTime() - b.getTime());
    return date >= start && date <= end;
  };

  const isDateRangeStart = (date: Date) => {
    if (selectedDates.length === 0) return false;
    const sortedDates = selectedDates.sort((a, b) => a.getTime() - b.getTime());
    return sortedDates[0].toDateString() === date.toDateString();
  };

  const isDateRangeEnd = (date: Date) => {
    if (selectedDates.length < 2) return false;
    const sortedDates = selectedDates.sort((a, b) => a.getTime() - b.getTime());
    return sortedDates[sortedDates.length - 1].toDateString() === date.toDateString();
  };

  const handleDatePress = (date: Date) => {
    if (isRange) {
      if (selectedDates.length === 0) {
        onDateSelect([date]);
      } else if (selectedDates.length === 1) {
        const sortedDates = [selectedDates[0], date].sort((a, b) => a.getTime() - b.getTime());
        onDateSelect(sortedDates);
      } else {
        onDateSelect([date]);
      }
    } else {
      onDateSelect([date]);
    }
  };

  const renderCalendarGrid = (month: Date) => {
    const daysInMonth = getDaysInMonth(month);
    const firstDay = getFirstDayOfMonth(month);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <View key={`empty-${i}`} style={styles.dayCell}>
          <View style={styles.dayButton} />
        </View>
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(month.getFullYear(), month.getMonth(), day);
      const isSelected = isDateSelected(date);
      const isInRange = isDateInRange(date);
      const isRangeStart = isDateRangeStart(date);
      const isRangeEnd = isDateRangeEnd(date);
      const isToday = date.toDateString() === new Date().toDateString();
      const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));

      days.push(
        <View key={day} style={styles.dayCell}>
          {isInRange && !isSelected && (
            <View style={styles.rangeBackground} />
          )}
          <Pressable
            style={[
              styles.dayButton,
              isSelected && styles.selectedDay,
              isRangeStart && styles.rangeStartDay,
              isRangeEnd && styles.rangeEndDay,
              isToday && !isSelected && styles.todayDay,
              isPast && styles.pastDay,
            ]}
            onPress={() => !isPast && handleDatePress(date)}
            disabled={isPast}
          >
            <Text
              style={[
                styles.dayText,
                isSelected && styles.selectedDayText,
                isToday && !isSelected && styles.todayDayText,
                isPast && styles.pastDayText,
              ]}
            >
              {day}
            </Text>
          </Pressable>
        </View>
      );
    }

    return days;
  };

  const renderMonth = (monthOffset: number) => {
    const month = new Date(currentDate.getFullYear(), currentDate.getMonth() + monthOffset, 1);
    
    return (
      <View key={monthOffset} style={styles.monthContainer}>
        <Text style={styles.monthTitle}>
          {MONTHS[month.getMonth()]} {month.getFullYear()}
        </Text>
        
        <View style={styles.weekdaysContainer}>
          {WEEKDAYS.map((weekday, index) => (
            <View key={index} style={styles.weekdayCell}>
              <Text style={styles.weekdayText}>{weekday}</Text>
            </View>
          ))}
        </View>
        
        <View style={styles.calendarGrid}>
          {renderCalendarGrid(month)}
        </View>
      </View>
    );
  };

  const renderQuickOptions = () => (
    <View style={styles.quickOptionsContainer}>
      <Pressable
        style={[styles.quickOption, selectedOption === 'dates' && styles.quickOptionActive]}
        onPress={() => setSelectedOption('dates')}
      >
        <Text style={[styles.quickOptionText, selectedOption === 'dates' && styles.quickOptionTextActive]}>
          Exact dates
        </Text>
      </Pressable>
      
      <Pressable
        style={styles.quickOption}
        onPress={() => setSelectedOption('months')}
      >
        <Text style={styles.quickOptionText}>± 1 day</Text>
      </Pressable>
      
      <Pressable
        style={styles.quickOption}
        onPress={() => setSelectedOption('flexible')}
      >
        <Text style={styles.quickOptionText}>± 2 days</Text>
      </Pressable>
      
      <Pressable
        style={styles.quickOption}
        onPress={() => setSelectedOption('flexible')}
      >
        <Text style={styles.quickOptionText}>± 3 days</Text>
      </Pressable>
    </View>
  );

  if (selectedOption === 'months') {
    return (
      <View style={styles.container}>
        <View style={styles.optionsContainer}>
          <Pressable
            style={styles.optionButton}
            onPress={() => setSelectedOption('dates')}
          >
            <Text style={styles.optionText}>Dates</Text>
          </Pressable>
          <Pressable
            style={[styles.optionButton, styles.optionButtonActive]}
            onPress={() => setSelectedOption('months')}
          >
            <Text style={[styles.optionText, styles.optionTextActive]}>Months</Text>
          </Pressable>
          <Pressable
            style={styles.optionButton}
            onPress={() => setSelectedOption('flexible')}
          >
            <Text style={styles.optionText}>Flexible</Text>
          </Pressable>
        </View>
        <View style={styles.monthsGrid}>
          {MONTHS.map((month, index) => (
            <Pressable key={index} style={styles.monthOption}>
              <Text style={styles.monthOptionText}>{month}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    );
  }

  if (selectedOption === 'flexible') {
    return (
      <View style={styles.container}>
        <View style={styles.optionsContainer}>
          <Pressable
            style={styles.optionButton}
            onPress={() => setSelectedOption('dates')}
          >
            <Text style={styles.optionText}>Dates</Text>
          </Pressable>
          <Pressable
            style={styles.optionButton}
            onPress={() => setSelectedOption('months')}
          >
            <Text style={styles.optionText}>Months</Text>
          </Pressable>
          <Pressable
            style={[styles.optionButton, styles.optionButtonActive]}
            onPress={() => setSelectedOption('flexible')}
          >
            <Text style={[styles.optionText, styles.optionTextActive]}>Flexible</Text>
          </Pressable>
        </View>
        <View style={styles.flexibleContainer}>
          <Text style={styles.flexibleTitle}>How long would you like to stay?</Text>
          <View style={styles.durationOptions}>
            <Pressable style={styles.durationOption}>
              <Text style={styles.durationText}>Weekend</Text>
            </Pressable>
            <Pressable style={styles.durationOption}>
              <Text style={styles.durationText}>Week</Text>
            </Pressable>
            <Pressable style={styles.durationOption}>
              <Text style={styles.durationText}>Month</Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.optionsContainer}>
        <Pressable
          style={[styles.optionButton, styles.optionButtonActive]}
          onPress={() => setSelectedOption('dates')}
        >
          <Text style={[styles.optionText, styles.optionTextActive]}>Dates</Text>
        </Pressable>
        <Pressable
          style={styles.optionButton}
          onPress={() => setSelectedOption('months')}
        >
          <Text style={styles.optionText}>Months</Text>
        </Pressable>
        <Pressable
          style={styles.optionButton}
          onPress={() => setSelectedOption('flexible')}
        >
          <Text style={styles.optionText}>Flexible</Text>
        </Pressable>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {[0, 1, 2, 3, 4, 5].map(monthOffset => renderMonth(monthOffset))}
      </ScrollView>

      {renderQuickOptions()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  optionsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  optionButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  optionButtonActive: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  optionText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  optionTextActive: {
    color: '#fff',
  },
  scrollContainer: {
    flex: 1,
  },
  monthContainer: {
    marginBottom: 40,
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
    textAlign: 'center',
  },
  weekdaysContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  weekdayCell: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  weekdayText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%',
    position: 'relative',
    alignItems: 'center',
    paddingVertical: 4,
  },
  rangeBackground: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#f0f0f0',
  },
  dayButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  selectedDay: {
    backgroundColor: '#000',
  },
  rangeStartDay: {
    backgroundColor: '#000',
  },
  rangeEndDay: {
    backgroundColor: '#000',
  },
  todayDay: {
    borderWidth: 1,
    borderColor: '#000',
  },
  pastDay: {
    opacity: 0.3,
  },
  dayText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  selectedDayText: {
    color: '#fff',
  },
  todayDayText: {
    color: '#000',
    fontWeight: '600',
  },
  pastDayText: {
    color: '#999',
  },
  quickOptionsContainer: {
    flexDirection: 'row',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    flexWrap: 'wrap',
  },
  quickOption: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  quickOptionActive: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  quickOptionText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  quickOptionTextActive: {
    color: '#fff',
  },
  monthsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 20,
  },
  monthOption: {
    width: '50%',
    paddingVertical: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  monthOptionText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  flexibleContainer: {
    paddingTop: 20,
  },
  flexibleTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  durationOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  durationOption: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 24,
  },
  durationText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
});