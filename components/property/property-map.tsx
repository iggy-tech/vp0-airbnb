import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '../text';

interface PropertyMapProps {
  coordinates: {
    latitude: number;
    longitude: number;
    latitudeDelta?: number;
    longitudeDelta?: number;
  };
  title: string;
  location: string;
  onExpandPress?: () => void;
}

export default function PropertyMap({ 
  coordinates, 
  title, 
  location, 
  onExpandPress 
}: PropertyMapProps) {
  const mapRegion = {
    latitude: coordinates.latitude,
    longitude: coordinates.longitude,
    latitudeDelta: coordinates.latitudeDelta || 0.01,
    longitudeDelta: coordinates.longitudeDelta || 0.01,
  };

  return (
    <View style={styles.mapSection}>
      <Text style={styles.sectionHeader}>Where you&apos;ll be</Text>
      <Text style={styles.locationText}>{location}</Text>
      
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={mapRegion}
          scrollEnabled={false}
          zoomEnabled={false}
          pitchEnabled={false}
          rotateEnabled={false}
          showsUserLocation={false}
          showsMyLocationButton={false}
          showsCompass={false}
          toolbarEnabled={false}
        >
          <Marker
            coordinate={{
              latitude: coordinates.latitude,
              longitude: coordinates.longitude,
            }}
            title={title}
          >
            <View style={styles.customMarker}>
              <View style={styles.markerInner}>
                <Ionicons name="home" size={20} color="#fff" />
              </View>
            </View>
          </Marker>
        </MapView>
        
        {/* Verified Location Badge */}
        <View style={styles.verifiedBadge}>
          <View style={styles.verifiedIcon}>
            <Ionicons name="checkmark" size={12} color="#fff" />
          </View>
          <Text style={styles.verifiedText}>Verified location</Text>
        </View>
        
        {/* Expand Map Button */}
        <Pressable style={styles.expandMapButton} onPress={onExpandPress}>
          <Ionicons name="expand" size={16} color="#000" />
        </Pressable>
      </View>
      
      <Text style={styles.verificationText}>
        We verified that this listing&apos;s location is accurate to within a few meters.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mapSection: {
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
  locationText: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 22,
  },
  mapContainer: {
    position: 'relative',
    height: 300,
    borderRadius: 24,
    overflow: 'hidden',
    marginVertical: 16,
    backgroundColor: '#f0f0f0',
  },
  map: {
    flex: 1,
  },
  customMarker: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FF385C',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
  },
  markerInner: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FF385C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  verifiedIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FF385C',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  verifiedText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  expandMapButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  verificationText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginTop: 8,
  },
});