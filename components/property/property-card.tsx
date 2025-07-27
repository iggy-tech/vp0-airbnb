// Enhanced PropertyCard with Swipeable Carousel
import React, { useState, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  Pressable, 
  Image,
  FlatList,
  Dimensions,
  Animated
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@/components/text';

const { width: screenWidth } = Dimensions.get('window');

interface PropertyCardProps {
  property: {
    id: number;
    title: string;
    subtitle: string;
    details: string;
    price: string;
    priceSubtext: string;
    rating: string;
    reviews: string;
    images: string[];
    image: string;
    badge?: string | null;
    host?: {
      name: string;
      avatar: string;
      badge: string;
      experience: string;
    };
    amenities?: Array<{
      icon: string;
      title: string;
      subtitle: string;
    }>;
    features?: string[];
    description?: string;
    location?: string;
  };
  onPress: (property: any) => void;
  cardWidth?: number;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ 
  property, 
  onPress, 
  cardWidth = (screenWidth - 48) / 2.1 
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const heartScale = useRef(new Animated.Value(1)).current;
  
  const handleImageScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / cardWidth);
    setCurrentImageIndex(index);
  };

  const handleLikePress = () => {
    setIsLiked(!isLiked);
    
    // Heart animation
    Animated.sequence([
      Animated.timing(heartScale, {
        toValue: 1.3,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(heartScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.98,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const renderImageItem = ({ item }: { item: string }) => (
    <Image 
      source={{ uri: item }} 
      style={[styles.propertyImage, { width: cardWidth }]} 
      resizeMode="cover"
    />
  );

  const renderDots = () => {
    if (property.images.length <= 1) return null;
    
    return (
      <View style={styles.dotsContainer}>
        {property.images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor: currentImageIndex === index 
                  ? '#fff' 
                  : 'rgba(255,255,255,0.5)',
                width: currentImageIndex === index ? 8 : 6,
                height: currentImageIndex === index ? 8 : 6,
              }
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <Animated.View 
      style={[
        styles.propertyCard, 
        { width: cardWidth },
        { transform: [{ scale: scaleAnim }] }
      ]}
    >
      <Pressable 
        onPress={() => onPress(property)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.cardContainer}
      >
        <View style={styles.imageContainer}>
          <FlatList
            data={property.images}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            bounces={false}
            decelerationRate="fast"
            snapToAlignment="start"
            snapToInterval={cardWidth}
            onMomentumScrollEnd={handleImageScroll}
            renderItem={renderImageItem}
            keyExtractor={(item, index) => index.toString()}
            style={styles.imageCarousel}
          />
          
          {renderDots()}
          
          {property.badge && (
            <View style={styles.guestFavoriteBadge}>
              <Text style={styles.guestFavoriteText}>{property.badge}</Text>
            </View>
          )}
          
          <Pressable 
            style={styles.heartButton}
            onPress={handleLikePress}
          >
            <Animated.View style={{ transform: [{ scale: heartScale }] }}>
              <Ionicons 
                name={isLiked ? "heart" : "heart-outline"} 
                size={20} 
                color={isLiked ? "#FF385C" : "#fff"} 
              />
            </Animated.View>
          </Pressable>
        </View>
        
        <View style={styles.propertyInfo}>
          <Text style={styles.propertyTitle} numberOfLines={2}>
            {property.title}
          </Text>
          <Text style={styles.propertySubtitle} numberOfLines={1}>
            {property.subtitle}
          </Text>
          <Text style={styles.propertyDetails} numberOfLines={1}>
            {property.details}
          </Text>
          <View style={styles.propertyPricing}>
            <Text style={styles.propertyPrice}>
              {property.price} <Text style={styles.priceSubtext}>{property.priceSubtext}</Text>
            </Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={12} color="#000" />
              <Text style={styles.ratingText}>{property.rating}</Text>
            </View>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
};

// Enhanced Modal Carousel Component
interface ModalCarouselProps {
  images: string[];
  onImageChange: (index: number) => void;
  currentIndex: number;
}

const ModalCarousel: React.FC<ModalCarouselProps> = ({ 
  images, 
  onImageChange, 
  currentIndex 
}) => {
  const flatListRef = useRef<FlatList>(null);
  
  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / screenWidth);
    onImageChange(index);
  };

  const renderImageItem = ({ item }: { item: string }) => (
    <Image 
      source={{ uri: item }} 
      style={styles.modalImage} 
      resizeMode="cover"
    />
  );

  return (
    <View style={styles.modalCarouselContainer}>
      <FlatList
        ref={flatListRef}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        decelerationRate="fast"
        snapToAlignment="center"
        onMomentumScrollEnd={handleScroll}
        renderItem={renderImageItem}
        keyExtractor={(item, index) => index.toString()}
        initialScrollIndex={currentIndex}
        getItemLayout={(data, index) => ({
          length: screenWidth,
          offset: screenWidth * index,
          index,
        })}
      />
      
      <View style={styles.modalDotsContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.modalDot,
              {
                backgroundColor: currentIndex === index 
                  ? '#fff' 
                  : 'rgba(255,255,255,0.5)',
                width: currentIndex === index ? 8 : 6,
                height: currentIndex === index ? 8 : 6,
              }
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  propertyCard: {
    marginHorizontal: 8,
  },
  cardContainer: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 8,
    borderRadius: 12,
    overflow: 'hidden',
  },
  imageCarousel: {
    borderRadius: 12,
  },
  propertyImage: {
    height: 160,
    backgroundColor: '#f0f0f0',
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    borderRadius: 4,
    marginHorizontal: 2,
  },
  guestFavoriteBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  guestFavoriteText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000',
  },
  heartButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  propertyInfo: {
    paddingHorizontal: 4,
  },
  propertyTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    marginBottom: 2,
    lineHeight: 20,
  },
  propertySubtitle: {
    fontSize: 14,
    color: '#717171',
    marginBottom: 2,
  },
  propertyDetails: {
    fontSize: 14,
    color: '#717171',
    marginBottom: 4,
  },
  propertyPricing: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  propertyPrice: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
  priceSubtext: {
    fontWeight: '400',
    color: '#717171',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#000',
    marginLeft: 2,
    fontWeight: '500',
  },
  
  // Modal Carousel Styles
  modalCarouselContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  modalImage: {
    width: screenWidth,
    height: '100%',
  },
  modalDotsContainer: {
    position: 'absolute',
    bottom: '15%',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalDot: {
    borderRadius: 4,
    marginHorizontal: 3,
  },
});

export { PropertyCard, ModalCarousel };