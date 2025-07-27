// components/ImageCarousel.tsx
import React, { useState } from 'react';
import { View, StyleSheet, Image, FlatList, Dimensions } from 'react-native';

interface ImageCarouselProps {
  images: string[];
}

const { width: screenWidth } = Dimensions.get('window');

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleMomentumScrollEnd = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
    setCurrentIndex(index);
  };

  return (
    <View style={styles.carouselContainer}>
      <FlatList
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        decelerationRate="fast"
        snapToAlignment="center"
        onMomentumScrollEnd={handleMomentumScrollEnd}
        renderItem={({ item }) => (
          <Image 
            source={{ uri: item }} 
            style={styles.carouselImage} 
            resizeMode="cover"
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      
      <View style={styles.dotsContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index ? styles.activeDot : styles.inactiveDot
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  carouselContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  carouselImage: {
    width: screenWidth,
    height: '100%',
  },
  dotsContainer: {
    position: 'absolute',
    bottom: '15%',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: '#fff',
  },
  inactiveDot: {
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
});