// components/PropertyAmenities.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '../text';

interface Amenity {
  icon?: string;
  title: string;
  subtitle: string;
}

interface PropertyAmenitiesProps {
  amenities: Amenity[];
}

export default function PropertyAmenities({ amenities }: PropertyAmenitiesProps) {
  const getIconName = (title: string): keyof typeof Ionicons.glyphMap => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('check-in') || titleLower.includes('self check')) return 'key-outline';
    if (titleLower.includes('park') || titleLower.includes('parking')) return 'car-outline';
    if (titleLower.includes('room') || titleLower.includes('bed')) return 'bed-outline';
    if (titleLower.includes('wifi')) return 'wifi-outline';
    if (titleLower.includes('kitchen')) return 'restaurant-outline';
    if (titleLower.includes('workspace')) return 'laptop-outline';
    return 'home-outline';
  };

  return (
    <View style={styles.amenitiesSection}>
      {amenities.map((amenity, index) => (
        <View key={index} style={styles.amenityRow}>
          <View style={styles.amenityIconContainer}>
            <Ionicons 
              name={getIconName(amenity.title)} 
              size={20} 
              color="#000" 
            />
          </View>
          <View style={styles.amenityContent}>
            <Text style={styles.amenityTitle}>{amenity.title}</Text>
            <Text style={styles.amenitySubtitle}>{amenity.subtitle}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  amenitiesSection: {
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  amenityRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  amenityIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    marginTop: 2,
  },
  amenityContent: {
    flex: 1,
  },
  amenityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  amenitySubtitle: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
});