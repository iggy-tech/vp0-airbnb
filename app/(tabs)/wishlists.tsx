import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import { Text } from '@/components/text';

// Sample data for recently viewed properties
const recentlyViewed = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=200&h=200&fit=crop',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=200&h=200&fit=crop',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=200&h=200&fit=crop',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=200&h=200&fit=crop',
  },
];

export default function WishlistsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Wishlists</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.recentlyViewedSection}>
          <View style={styles.imageGrid}>
            {recentlyViewed.map((item, index) => (
              <Image
                key={item.id}
                source={{ uri: item.image }}
                style={[
                  styles.gridImage,
                  index === 0 && styles.topLeft,
                  index === 1 && styles.topRight,
                  index === 2 && styles.bottomLeft,
                  index === 3 && styles.bottomRight,
                ]}
              />
            ))}
          </View>
          
          <View style={styles.sectionInfo}>
            <Text style={styles.sectionTitle}>Recently viewed</Text>
            <Text style={styles.sectionSubtitle}>Today</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  recentlyViewedSection: {
    marginBottom: 32,
  },
  imageGrid: {
    width: 200,
    height: 150,
    position: 'relative',
    marginBottom: 16,
  },
  gridImage: {
    position: 'absolute',
    backgroundColor: '#f0f0f0',
  },
  topLeft: {
    width: 95,
    height: 72,
    top: 0,
    left: 0,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 2,
  },
  topRight: {
    width: 95,
    height: 72,
    top: 0,
    right: 0,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 4,
  },
  bottomLeft: {
    width: 95,
    height: 72,
    bottom: 0,
    left: 0,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 2,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 4,
  },
  bottomRight: {
    width: 95,
    height: 72,
    bottom: 0,
    right: 0,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 12,
  },
  sectionInfo: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
  },
});