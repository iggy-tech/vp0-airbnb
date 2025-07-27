// components/PropertyFeatures.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Text } from '../text';

interface PropertyFeaturesProps {
  features: string[];
  title?: string;
}

export default function PropertyFeatures({ 
  features, 
  title = "What this place offers" 
}: PropertyFeaturesProps) {
  
  const getFeatureIcon = (feature: string): keyof typeof Feather.glyphMap => {
    const featureLower = feature.toLowerCase();
    if (featureLower.includes('lock') || featureLower.includes('door')) return 'lock';
    if (featureLower.includes('wifi')) return 'wifi';
    if (featureLower.includes('workspace') || featureLower.includes('desk')) return 'monitor';
    if (featureLower.includes('parking')) return 'truck';
    if (featureLower.includes('camera') || featureLower.includes('security')) return 'camera';
    if (featureLower.includes('kitchen')) return 'coffee';
    if (featureLower.includes('air') || featureLower.includes('conditioning')) return 'wind';
    if (featureLower.includes('heating')) return 'thermometer';
    if (featureLower.includes('tv') || featureLower.includes('television')) return 'tv';
    if (featureLower.includes('washer') || featureLower.includes('laundry')) return 'refresh-cw';
    return 'check-circle';
  };

  return (
    <View style={styles.featuresSection}>
      <Text style={styles.sectionHeader}>{title}</Text>
      {features.map((feature, index) => (
        <View key={index} style={styles.featureRow}>
          <View style={styles.featureIconContainer}>
            <Feather name={getFeatureIcon(feature)} size={18} color="#000" />
          </View>
          <Text style={styles.featureText}>{feature}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  featuresSection: {
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureIconContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  featureText: {
    fontSize: 16,
    color: '#000',
    flex: 1,
  },
});