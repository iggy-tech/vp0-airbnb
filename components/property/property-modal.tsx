// components/PropertyModal.tsx
import React, { useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  Modal, 
  SafeAreaView, 
  Pressable, 
  Animated, 
  StatusBar, 
  Dimensions, 
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Text } from '../text';

import ImageCarousel from './image-carousel';
import PropertyStats from './property-stats';
import PropertyAmenities from './property-amenities';
import PropertyFeatures from './property-features';
import PropertyMap from './property-map';
import PropertyReviews from './property-review';
import EnhancedPropertyHostInfo from './property-host-info';
import PropertyPolicies from './property-policies';
import PropertyHostInfo from '../property-host-info';

interface Property {
  id: number;
  title: string;
  subtitle: string;
  details: string;
  price: string;
  rating: string;
  reviews: string;
  images: string[];
  host: {
    name: string;
    avatar: string;
    badge: string;
    experience: string;
  };
  amenities?: Array<{
    title: string;
    subtitle: string;
  }>;
  features?: string[];
  description?: string;
  location: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

interface PropertyModalProps {
  property: Property | null;
  visible: boolean;
  onClose: () => void;
  onShare?: () => void;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function PropertyModal({ 
  property, 
  visible, 
  onClose, 
  onShare 
}: PropertyModalProps) {
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const [headerStyle, setHeaderStyle] = React.useState('overlay');

  if (!property) return null;

  // Default coordinates if not provided
  const coordinates = property.coordinates || {
    latitude: 40.7589,
    longitude: -73.9851,
  };

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: false,
      listener: (event: any) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        
        const startOverlay = 50;
        const maxOverlayScroll = screenHeight * 0.25;
        const overlayProgress = Math.max(0, Math.min((offsetY - startOverlay) / maxOverlayScroll, 1));
        overlayOpacity.setValue(overlayProgress * 0.85);
        
        const headerButtonsY = 120;
        const bottomSheetStartY = screenHeight * 0.45;
        const threshold = bottomSheetStartY - headerButtonsY;
        
        if (offsetY > threshold && headerStyle === 'overlay') {
          setHeaderStyle('solid');
          Animated.timing(headerOpacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: false,
          }).start();
        } else if (offsetY <= threshold && headerStyle === 'solid') {
          setHeaderStyle('overlay');
          Animated.timing(headerOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
          }).start();
        }
      },
    }
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <StatusBar barStyle="light-content" />
        
        <ImageCarousel images={property.images} />
        
        <Animated.View 
          style={[
            styles.progressiveOverlay,
            { opacity: overlayOpacity }
          ]} 
        >
          <View style={styles.overlayGradient} />
        </Animated.View>
        
        <SafeAreaView style={styles.overlayHeader}>
          <Animated.View 
            style={[
              styles.solidHeader,
              {
                opacity: headerOpacity,
                backgroundColor: headerOpacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['transparent', '#fff']
                })
              }
            ]}
          />
          <View style={styles.headerButtons}>
            <Pressable 
              style={[
                styles.headerButton,
                headerStyle === 'solid' && styles.headerButtonSolid
              ]} 
              onPress={onClose}
            >
              <Feather 
                name="arrow-left" 
                size={14} 
                color={headerStyle === 'overlay' ? "#fff" : "#000"} 
              />
            </Pressable>
            <View style={styles.headerRightButtons}>
              <Pressable 
                style={[
                  styles.headerButton,
                  headerStyle === 'solid' && styles.headerButtonSolid
                ]}
                onPress={onShare}
              >
                <Feather 
                  name="share" 
                  size={14} 
                  color={headerStyle === 'overlay' ? "#fff" : "#000"} 
                />
              </Pressable>
              <Pressable style={[
                styles.headerButton,
                headerStyle === 'solid' && styles.headerButtonSolid
              ]}>
                <Feather 
                  name="heart" 
                  size={14} 
                  color={headerStyle === 'overlay' ? "#fff" : "#000"} 
                />
              </Pressable>
            </View>
          </View>
        </SafeAreaView>

        <View style={styles.bottomSheetContainer}>
          <Animated.ScrollView 
            style={styles.bottomSheetScrollView}
            showsVerticalScrollIndicator={false}
            bounces={false}
            scrollEventThrottle={16}
            contentContainerStyle={styles.scrollContentContainer}
            onScroll={handleScroll}
          >
            <View style={styles.contentCard}>
              <View style={styles.titleSection}>
                <Text style={styles.modalTitle}>{property.title}</Text>
                <Text style={styles.modalSubtitle}>{property.subtitle}</Text>
                <Text style={styles.modalDetails}>{property.details}</Text>
              </View>

              <PropertyStats 
                rating={property.rating}
                reviews={property.reviews}
              />

           

              <PropertyHostInfo host={property.host} />

              <View style={styles.rareFind}>
                <Ionicons name="diamond" size={16} color="#000" />
                <Text style={styles.rareFindText}>Rare find! This place is usually booked</Text>
              </View>

              {property.amenities && (
                <PropertyAmenities amenities={property.amenities} />
              )}

              {property.description && (
                <View style={styles.descriptionSection}>
                  <Text style={styles.sectionHeader}>About this place</Text>
                  <Text style={styles.description}>{property.description}</Text>
                </View>
              )}

              {property.features && (
                <PropertyFeatures features={property.features} />
              )}

              <PropertyMap 
                coordinates={coordinates}
                title={property.title}
                location={property.location}
                onExpandPress={() => {
                  // Handle full screen map
                  console.log('Expand map pressed');
                }}
              />

              <PropertyReviews reviews={property.reviews} rating={property.rating} />

              <PropertyPolicies 
                onAvailabilityPress={() => console.log('Availability pressed')}
                onCancellationPress={() => console.log('Cancellation pressed')}
                onHouseRulesPress={() => console.log('House rules pressed')}
                onSafetyPress={() => console.log('Safety pressed')}
                onReportPress={() => console.log('Report pressed')}
              />

              <View style={styles.bottomContentPadding} />
            </View>
          </Animated.ScrollView>

          <View style={styles.bottomBookingBar}>
            <View style={styles.priceSection}>
              <Text style={styles.bottomPrice}>{property.price} night</Text>
              <View style={styles.cancellationInfo}>
                <Ionicons name="checkmark" size={16} color="#008A05" />
                <Text style={styles.cancellationText}>Free cancellation</Text>
              </View>
            </View>
            <Pressable style={styles.reserveButton}>
              <Text style={styles.reserveText}>Reserve</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  progressiveOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 25,
  },
  overlayGradient: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
  },
  overlayHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 16,
    zIndex: 50,
  },
  solidHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    zIndex: 10,
    paddingTop: 16,
  },
  headerButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  headerButtonSolid: {
    backgroundColor: '#F9FAFB',
    borderColor: '#E5E7EB',
    width: 34,
    height: 34,
    borderRadius: 17,
  },
  headerRightButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  bottomSheetContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 30,
  },
  bottomSheetScrollView: {
    flex: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
    paddingTop: screenHeight * 0.45,
  },
  contentCard: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    minHeight: screenHeight * 1.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  titleSection: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
    lineHeight: 32,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 4,
    textAlign: 'center',
  },
  modalDetails: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  rareFind: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginVertical: 24,
  },
  rareFindText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  descriptionSection: {
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
  description: {
    fontSize: 16,
    color: '#000',
    lineHeight: 24,
  },
  bottomContentPadding: {
    height: 120,
  },
  bottomBookingBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 34,
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#fff',
    zIndex: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  priceSection: {
    flex: 1,
  },
  bottomPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 2,
  },
  cancellationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e2e2e2',
    paddingHorizontal: 8,
    width: 140,
    padding: 8,
    borderRadius: 16,
    marginTop: 4,
  },
  cancellationText: {
    fontSize: 12,
    color: '#000',
    marginLeft: 4,
    fontWeight: '500',
  },
  reserveButton: {
    backgroundColor: '#E91E63',
    borderRadius: 12,
    paddingHorizontal: 32,
    paddingVertical: 16,
    marginLeft: 16,
    shadowColor: '#E91E63',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  reserveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});