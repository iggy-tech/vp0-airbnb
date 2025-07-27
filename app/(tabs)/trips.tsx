import React from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Image,
} from 'react-native';
import { Text } from '@/components/text';

export default function TripsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Trips</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.illustrationContainer}>
          <View style={styles.timelineContainer}>
            <View style={styles.timelineItem}>
              <View style={styles.timelineCircle} />
              <Image 
                source={{
                  uri: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=100&h=100&fit=crop'
                }}
                style={styles.timelineImage}
              />
            </View>
            <View style={styles.timelineLine} />
            <View style={styles.timelineItem}>
              <View style={[styles.timelineCircle, styles.timelineCircleInactive]} />
              <Image 
                source={{
                  uri: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=100&h=100&fit=crop'
                }}
                style={styles.timelineImage}
              />
            </View>
            <View style={styles.timelineLine} />
            <View style={styles.timelineItem}>
              <View style={[styles.timelineCircle, styles.timelineCircleInactive]} />
              <Image 
                source={{
                  uri: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=100&h=100&fit=crop'
                }}
                style={styles.timelineImage}
              />
            </View>
          </View>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.mainTitle}>Build the perfect trip</Text>
          <Text style={styles.subtitle}>Explore homes, experiences, and services.</Text>
          <Text style={styles.description}>
            When you book, your reservations will show up here.
          </Text>
        </View>

        <Pressable style={styles.getStartedButton}>
          <Text style={styles.getStartedText}>Get started</Text>
        </Pressable>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  illustrationContainer: {
    marginBottom: 48,
  },
  timelineContainer: {
    alignItems: 'center',
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  timelineCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF385C',
    marginRight: 20,
  },
  timelineCircleInactive: {
    backgroundColor: '#ddd',
  },
  timelineLine: {
    width: 1,
    height: 30,
    backgroundColor: '#ddd',
    marginLeft: 6,
  },
  timelineImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 48,
    maxWidth: 280,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  getStartedButton: {
    backgroundColor: '#FF385C',
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 12,
  },
  getStartedText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});