// components/PropertyStats.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '../text';


interface PropertyStatsProps {
  rating: string;
  reviews: string;
  showGuestFavorite?: boolean;
}

export default function PropertyStats({ 
  rating, 
  reviews, 
  showGuestFavorite = true 
}: PropertyStatsProps) {
  return (
    <View style={styles.statsRow}>
      <View style={styles.statItem}>
        <Text style={styles.statValue}>{rating}</Text>
        <View style={styles.starsRow}>
          {[1,2,3,4,5].map(i => (
            <Ionicons key={i} name="star" size={12} color="#000" />
          ))}
        </View>
      </View>
      
      <View style={styles.statDivider} />
      
      {showGuestFavorite && (
        <>
          <View style={styles.statItem}>
            <View style={styles.guestFavoriteSection}>
              <Text style={styles.guestFavoriteIcon}>🏆</Text>
            </View>
            <Text style={styles.statLabel}>Guest favourite</Text>
          </View>
          
          <View style={styles.statDivider} />
        </>
      )}
      
      <View style={styles.statItem}>
        <Text style={styles.statValue}>{reviews}</Text>
        <Text style={styles.statLabel}>Reviews</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',

  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
    textAlign: 'center',
  },
  starsRow: {
    flexDirection: 'row',
    gap: 2,
  },
  guestFavoriteSection: {
    marginBottom: 4,
  },
  guestFavoriteIcon: {
    fontSize: 18,
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 16,
  },
});