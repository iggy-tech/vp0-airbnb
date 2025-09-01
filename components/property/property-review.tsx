// components/PropertyReviews.tsx
import React from 'react';
import { View, StyleSheet, Image, ScrollView, Pressable, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '../text';

interface Review {
  id: number;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  text: string;
  yearsOnAirbnb?: number;
}

interface PropertyReviewsProps {
  rating: string;
  reviews: string;
  onShowAllReviews?: () => void;
}

const { width: screenWidth } = Dimensions.get('window');

// Hard-coded reviews data
const reviewsData: Review[] = [
  {
    id: 1,
    userName: 'Catherine',
    userAvatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 5,
    date: 'May 2025',
    text: 'House was beautiful and well laid out. Nice individualisation with the painting. Some features made it less kid friendly e.g. blinds not properly attached. We did self ch...',
    yearsOnAirbnb: 12,
  },
  {
    id: 2,
    userName: 'Benjamin',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    date: 'April 2025',
    text: 'Beautiful place with amazing amenities. The host was very responsive and helpful throughout our stay. Would definitely recommend to anyone visiting the area.',
    yearsOnAirbnb: 8,
  },
  {
    id: 3,
    userName: 'Maria',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    date: 'March 2025',
    text: 'Perfect location and the space was exactly as described. Clean, comfortable, and had everything we needed for our weekend getaway. Thank you for a wonderful stay!',
    yearsOnAirbnb: 5,
  },
  {
    id: 4,
    userName: 'David',
    userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    date: 'February 2025',
    text: 'Exceptional hospitality and attention to detail. The property exceeded our expectations in every way. Great communication from the host team.',
    yearsOnAirbnb: 3,
  },
];

export default function PropertyReviews({ 
  rating, 
  reviews, 
  onShowAllReviews 
}: PropertyReviewsProps) {
  
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Ionicons 
        key={index} 
        name="star" 
        size={14} 
        color={index < rating ? "#000" : "#E5E7EB"} 
      />
    ));
  };

  const renderReviewCard = (review: Review) => (
    <View key={review.id} style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <Image source={{ uri: review.userAvatar }} style={styles.reviewerAvatar} />
        <View style={styles.reviewerInfo}>
          <Text style={styles.reviewerName}>{review.userName}</Text>
          <Text style={styles.reviewerMeta}>
            {review.yearsOnAirbnb} years on Airbnb
          </Text>
        </View>
      </View>
      
      <View style={styles.reviewRating}>
        <View style={styles.starsContainer}>
          {renderStars(review.rating)}
        </View>
        <Text style={styles.reviewDate}>· {review.date}</Text>
      </View>
      
      <Text style={styles.reviewText}>{review.text}</Text>
      
      <Pressable style={styles.showMoreButton}>
        <Text style={styles.showMoreText}>Show more</Text>
      </Pressable>
    </View>
  );

  // Calculate the exact width for snapping - card width + margin
  const reviewCardWidth = screenWidth * 0.85 + 16; // card width + marginRight

  return (
    <View style={styles.reviewsSection}>
      {/* Header with rating display */}
      <View style={styles.reviewsHeader}>
        <View style={styles.ratingDisplay}>
          <View style={styles.laurelLeft}>
            <Text style={styles.laurelEmoji}>🌿</Text>
          </View>
          <Text style={styles.largeRating}>{rating}</Text>
          <View>
            <Text style={styles.laurelEmoji}>🌿</Text>
          </View>
        </View>
        
        <Text style={styles.guestFavoriteTitle}>Guest favourite</Text>
        <Text style={styles.guestFavoriteSubtitle}>
          This home is in the <Text style={styles.boldText}>top 5%</Text> of eligible listings{'\n'}
          based on ratings, reviews, and reliability
        </Text>
      </View>

      {/* Horizontal scrolling reviews */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.reviewsContainer}
        snapToInterval={reviewCardWidth}
        snapToAlignment="start"
        decelerationRate="fast"
        pagingEnabled={false}
      >
        {reviewsData.map(renderReviewCard)}
      </ScrollView>

      {/* Show all reviews button */}
      <Pressable style={styles.showAllButton} onPress={onShowAllReviews}>
        <Text style={styles.showAllText}>Show all {reviews} reviews</Text>
      </Pressable>

      {/* Learn more link */}
      <Pressable style={styles.learnMoreContainer}>
        <Text style={styles.learnMoreText}>Learn how reviews work</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  reviewsSection: {
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  reviewsHeader: {
    alignItems: 'center',
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  ratingDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  largeRating: {
    fontSize: 52,
    fontWeight: '300',
    color: '#000',
    marginHorizontal: 16,
  },
  laurelLeft: {
    transform: [{ scaleX: -1 }],
  },
  laurelEmoji: {
    fontSize: 32,
  },
  guestFavoriteTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  guestFavoriteSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
  },
  boldText: {
    fontWeight: '600',
    color: '#000',
  },
  reviewsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  reviewCard: {
    width: screenWidth * 0.85,
    marginRight: 16,
    padding: 0,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  reviewerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  reviewerInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 2,
  },
  reviewerMeta: {
    fontSize: 14,
    color: '#6B7280',
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  reviewDate: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  reviewText: {
    fontSize: 16,
    color: '#000',
    lineHeight: 22,
    marginBottom: 8,
  },
  showMoreButton: {
    alignSelf: 'flex-start',
  },
  showMoreText: {
    fontSize: 16,
    color: '#000',
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
  showAllButton: {
    backgroundColor: '#F7F7F7',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginHorizontal: 20,
    marginBottom: 16,
    alignItems: 'center',
  },
  showAllText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  learnMoreContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  learnMoreText: {
    fontSize: 16,
    color: '#6B7280',
    textDecorationLine: 'underline',
  },
});