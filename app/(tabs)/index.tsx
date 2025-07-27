// app/(tabs)/index.tsx
import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  Pressable, 
  SafeAreaView, 
  ScrollView, 
  Image,
  StatusBar,
  Animated,
  Dimensions,
  Modal,
  FlatList,
  Share
} from 'react-native';
import {  Ionicons, Feather } from '@expo/vector-icons';
import AuthModal from '@/components/auth-modal';
import { Text } from '@/components/text';

const categoryData = [
  { 
    id: 1, 
    title: 'Homes', 
    image: require('@/assets/images/home.png'),
    active: true 
  },
  { 
    id: 2, 
    title: 'Experiences', 
    image: require('@/assets/images/experiences.png'),
    badge: 'NEW' 
  },
  { 
    id: 3, 
    title: 'Services', 
    image: require('@/assets/images/services.png'),
    badge: 'NEW' 
  },
];

const propertyData = [
  {
    id: 1,
    title: 'A here we are room minutes away from airport',
    subtitle: 'Room in Toronto, Canada',
    details: '1 bed · Shared bathroom',
    price: '$34 USD',
    priceSubtext: 'night',
    rating: '4.84',
    reviews: '230',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&h=600&fit=crop'
    ],
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
    badge: 'Guest favorite',
    host: {
      name: 'Myrna',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      badge: 'Superhost',
      experience: '3 years hosting'
    },
    amenities: [
      { icon: '🏠', title: 'Self check-in', subtitle: 'Check yourself in with the lockbox.' },
      { icon: '🅿️', title: 'Park for free', subtitle: 'This is one of the few places in the area with free parking.' },
      { icon: '🛏️', title: 'Room in a home', subtitle: 'Your own room in a home, plus access to shared spaces.' }
    ],
    features: [
      'Lock on bedroom door',
      'Wifi',
      'Dedicated workspace',
      'Free parking on premises',
      'Exterior security cameras on property'
    ],
    description: 'A friendly neighbourhood, close to wallmart, mc donalds , poppeyes, dollarama, newly opened costco with gas station, burger king, BMO bank. And also 10 to 15 minutes walk to bus stop that goes to the subway train station and downtown.',
    location: 'Toronto, Ontario, Canada'
  },
  {
    id: 2,
    title: 'Place to stay in Strawberry Mansion',
    subtitle: 'Apartment in Philadelphia',
    details: '2 beds · 1 bathroom',
    price: '$122',
    priceSubtext: 'for 2 nights', 
    rating: '4.8',
    reviews: '156',
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop'
    ],
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
    badge: null,
    host: {
      name: 'Sarah',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      badge: 'Superhost',
      experience: '2 years hosting'
    }
  },
  {
    id: 3,
    title: 'Apartment in Center City',
    subtitle: 'Entire apartment',
    details: '1 bed · 1 bathroom',
    price: '$381',
    priceSubtext: 'for 2 nights',
    rating: '5.0', 
    reviews: '89',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop'
    ],
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
    badge: 'Guest favorite',
    host: {
      name: 'Michael',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      badge: 'Host',
      experience: '1 year hosting'
    }
  },
  {
    id: 4,
    title: 'Room in Fishtown',
    subtitle: 'Private room',
    details: '1 bed · Shared bathroom',
    price: '$112',
    priceSubtext: 'for 2 nights',
    rating: '4.99',
    reviews: '203',
    images: [
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop'
    ],
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop',
    badge: 'Guest favorite',
    host: {
      name: 'Jessica',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
      badge: 'Superhost',
      experience: '4 years hosting'
    }
  }
];

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function ExploreScreen() {
  const [showAuthModal, setShowAuthModal] = useState(true); // Start with modal open
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [userAuthenticated, setUserAuthenticated] = useState(false); // Track auth state
  
  const slideAnim = useRef(new Animated.Value(0)).current;
  const scaleAnims = useRef(categoryData.map(() => new Animated.Value(1))).current;
  
  const [selectedProperty, setSelectedProperty] = useState<typeof propertyData[0] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [headerStyle, setHeaderStyle] = useState('overlay');
  
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  
  const tabWidth = (screenWidth - 48) / 3;

  useEffect(() => {
    // Animate the underline to the selected category
    const targetPosition = (selectedCategory - 1) * tabWidth;
    
    Animated.spring(slideAnim, {
      toValue: targetPosition,
      useNativeDriver: true,
      tension: 300,
      friction: 30,
    }).start();

    // Animate scale for all tabs
    scaleAnims.forEach((anim, index) => {
      Animated.spring(anim, {
        toValue: selectedCategory === index + 1 ? 1.1 : 1,
        useNativeDriver: true,
        tension: 300,
        friction: 8,
      }).start();
    });
  }, [selectedCategory, tabWidth]);

  const handleCategoryPress = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  const handlePropertyPress = (property) => {
    setSelectedProperty(property);
    setCurrentImageIndex(0);
    setHeaderStyle('overlay');
    scrollY.setValue(0);
    headerOpacity.setValue(0);
    overlayOpacity.setValue(0);
  };

  const handleSharePress = async () => {
    try {
      const result = await Share.share({
        message: `Check out this amazing place: ${selectedProperty.title} - ${selectedProperty.subtitle}`,
        url: 'https://airbnb.com/rooms/123456',
        title: selectedProperty.title,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const getFeatureIcon = (feature: string) => {
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

  const handleCloseModal = () => {
    setSelectedProperty(null);
    setCurrentImageIndex(0);
    setHeaderStyle('overlay');
  };

  const handleAuthSuccess = (user) => {
    console.log('Authentication successful:', user);
    setShowAuthModal(false); // Close modal on successful auth
    setUserAuthenticated(true); // Mark user as authenticated
    // Handle successful authentication here
    // You might want to update global state, redirect user, etc.
  };

  const handleCloseAuthModal = () => {
    setShowAuthModal(false); // Allow closing without authentication
  };

  const handleOpenAuthModal = () => {
    setShowAuthModal(true); // Re-open auth modal
  };

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: false,
      listener: (event) => {
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

  const renderImageCarousel = () => {
    if (!selectedProperty?.images) return null;

    return (
      <View style={styles.carouselContainer}>
        <FlatList
          data={selectedProperty.images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          decelerationRate="fast"
          snapToAlignment="center"
          onMomentumScrollEnd={(event) => {
            const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
            setCurrentImageIndex(index);
          }}
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
          {selectedProperty.images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentImageIndex === index ? styles.activeDot : styles.inactiveDot
              ]}
            />
          ))}
        </View>
      </View>
    );
  };

  const renderSearchBar = () => (
    <View style={styles.searchBarContainer}>
      <Pressable style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#717171" />
        <Text style={styles.searchText}>Start your search</Text>
      </Pressable>
    </View>
  );

  const renderCategories = () => (
    <View style={styles.categoryContainer}>
      <View style={styles.categoryTabs}>
        {categoryData.map((category, index) => (
          <Pressable 
            key={category.id}
            style={styles.categoryItem}
            onPress={() => handleCategoryPress(category.id)}
          >
            <Animated.View 
              style={[
                styles.categoryContent,
                {
                  transform: [{ scale: scaleAnims[index] }]
                }
              ]}
            >
              <View style={styles.categoryIconContainer}>
                <Image 
                  source={category.image} 
                  style={styles.categoryImage}
                  resizeMode="contain"
                />
                {category.badge && (
                  <Animated.View 
                    style={[
                      styles.badge,
                      {
                        transform: [{ scale: scaleAnims[index] }]
                      }
                    ]}
                  >
                    <Text style={styles.badgeText}>{category.badge}</Text>
                  </Animated.View>
                )}
              </View>
              <Animated.Text 
                style={[
                  styles.categoryTitle,
                  selectedCategory === category.id && styles.categoryTitleActive,
                  {
                    transform: [{ scale: scaleAnims[index] }]
                  }
                ]}
              >
                {category.title}
              </Animated.Text>
            </Animated.View>
          </Pressable>
        ))}
      </View>
      
      <Animated.View 
        style={[
          styles.animatedIndicator,
          {
            transform: [{ translateX: slideAnim }],
            width: tabWidth * 0.3,
          }
        ]} 
      />
    </View>
  );

  const renderPropertyCard = (property: typeof propertyData[0]) => (
    <Pressable 
      key={property.id} 
      style={styles.propertyCard}
      onPress={() => handlePropertyPress(property)}
    >
      <View style={styles.cardContainer}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: property.image }} style={styles.propertyImage} />
          {property.badge && (
            <View style={styles.guestFavoriteBadge}>
              <Text style={styles.guestFavoriteText}>{property.badge}</Text>
            </View>
          )}
          <Pressable style={styles.heartButton}>
            <Ionicons name="heart-outline" size={20} color="#fff" />
          </Pressable>
        </View>
        <View style={styles.propertyInfo}>
          <Text style={styles.propertyTitle}>{property.title}</Text>
          <View style={styles.propertyDetails}>
            <Text style={styles.propertyPrice}>{property.price} {property.priceSubtext}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={12} color="#000" />
              <Text style={styles.ratingText}>{property.rating}</Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );

  const renderSection = (title: string, properties: typeof propertyData) => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Ionicons name="chevron-forward" size={20} color="#717171" />
      </View>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.propertyList}
        snapToInterval={screenWidth * 0.94}
        decelerationRate="fast"
        snapToAlignment="start"
      >
        {properties.map(renderPropertyCard)}
      </ScrollView>
    </View>
  );

  const renderPropertyDetail = () => {
    if (!selectedProperty) return null;

    return (
      <Modal
        visible={!!selectedProperty}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <StatusBar barStyle="light-content" />
          
          {renderImageCarousel()}
          
          <Animated.View 
            style={[
              styles.progressiveOverlay,
              {
                opacity: overlayOpacity
              }
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
                onPress={handleCloseModal}
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
                  onPress={handleSharePress}
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
            
            <Animated.View style={[
              styles.headerTitle,
              { opacity: headerOpacity }
            ]}>
            
            </Animated.View>
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
                  <Text style={styles.modalTitle}>{selectedProperty.title}</Text>
                  <Text style={styles.modalSubtitle}>{selectedProperty.subtitle}</Text>
                  <Text style={styles.modalDetails}>{selectedProperty.details}</Text>
                </View>

                <View style={styles.statsRow}>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{selectedProperty.rating}</Text>
                    <View style={styles.starsRow}>
                      {[1,2,3,4,5].map(i => (
                        <Ionicons key={i} name="star" size={12} color="#000" />
                      ))}
                    </View>
                  </View>
                  
                  <View style={styles.statDivider} />
                  
                  <View style={styles.statItem}>
                    <View style={styles.guestFavoriteSection}>
                      <Text style={styles.guestFavoriteIcon}>🏆</Text>
                    </View>
                    <Text style={styles.statLabel}>Guest favourite</Text>
                  </View>
                  
                  <View style={styles.statDivider} />
                  
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{selectedProperty.reviews}</Text>
                    <Text style={styles.statLabel}>Reviews</Text>
                  </View>
                </View>

                <View style={styles.hostSection}>
                  <View style={styles.hostInfo}>
                    <Image source={{ uri: selectedProperty.host?.avatar }} style={styles.hostAvatar} />
                    <View style={styles.hostDetails}>
                      <Text style={styles.hostName}>Stay with {selectedProperty.host?.name}</Text>
                      <Text style={styles.hostMeta}>{selectedProperty.host?.badge} · {selectedProperty.host?.experience}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.rareFind}>
                  <Ionicons name="diamond" size={16} color="#000" />
                  <Text style={styles.rareFindText}>Rare find! This place is usually booked</Text>
                </View>

                {selectedProperty.amenities && (
                  <View style={styles.amenitiesSection}>
                    {selectedProperty.amenities.map((amenity, index) => {
                      let iconName = 'home-outline';
                      if (amenity.title === 'Self check-in') iconName = 'key-outline';
                      if (amenity.title === 'Park for free') iconName = 'car-outline';
                      if (amenity.title === 'Room in a home') iconName = 'bed-outline';
                      
                      return (
                        <View key={index} style={styles.amenityRow}>
                          <View style={styles.amenityIconContainer}>
                            <Ionicons name={iconName} size={20} color="#000" />
                          </View>
                          <View style={styles.amenityContent}>
                            <Text style={styles.amenityTitle}>{amenity.title}</Text>
                            <Text style={styles.amenitySubtitle}>{amenity.subtitle}</Text>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                )}

                {selectedProperty.description && (
                  <View style={styles.descriptionSection}>
                    <Text style={styles.sectionHeaderModal}>About this place</Text>
                    <Text style={styles.description}>{selectedProperty.description}</Text>
                  </View>
                )}

                <View style={styles.extraContent}>
                  <Text style={styles.sectionHeaderModal}>What this place offers</Text>
                  {selectedProperty.features && selectedProperty.features.map((feature, index) => (
                    <View key={index} style={styles.featureRow}>
                      <View style={styles.featureIconContainer}>
                        <Feather name={getFeatureIcon(feature)} size={18} color="#000" />
                      </View>
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.locationSection}>
                  <Text style={styles.sectionHeaderModal}>Where you'll be</Text>
                  <Text style={styles.locationText}>{selectedProperty.location}</Text>
                </View>

                <View style={styles.bottomContentPadding} />
              </View>
            </Animated.ScrollView>

            <View style={styles.bottomBookingBar}>
              <View style={styles.priceSection}>
                <Text style={styles.bottomPrice}>{selectedProperty.price} night</Text>
            
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
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          {renderSearchBar()}
          {renderCategories()}
        </View>

        {renderSection('Popular homes in Philadelphia', propertyData)}
        {renderSection('Available next month in Miami', propertyData)}

        <View style={styles.priceNotice}>
          <Ionicons name="heart" size={16} color="#FF385C" />
          <Text style={styles.priceNoticeText}>Prices include all fees</Text>
        </View>
      </ScrollView>

      {/* Floating Login Button - only show if not authenticated and modal is closed */}
      {!userAuthenticated && !showAuthModal && (
        <Pressable style={styles.floatingLoginButton} onPress={handleOpenAuthModal}>
          <Ionicons name="person-outline" size={20} color="#fff" />
          <Text style={styles.floatingLoginText}>Log in</Text>
        </Pressable>
      )}

      {renderPropertyDetail()}
      
      <AuthModal 
        visible={showAuthModal} 
        onClose={handleCloseAuthModal}
        onAuthSuccess={handleAuthSuccess}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingTop: 16,
    paddingBottom: 24,
  },
  searchBarContainer: {
    paddingHorizontal: 24,
    marginBottom: 32,
    alignItems: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 32,
    paddingHorizontal: 20,
    paddingVertical: 16,
    width: '100%',
    maxWidth: 600,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  searchText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#717171',
    fontWeight: '500',
  },
  categoryContainer: {
    position: 'relative',
    paddingBottom: 16,
    paddingHorizontal: 24,
  },
  categoryTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  categoryItem: {
    alignItems: 'center',
    paddingVertical: 8,
    flex: 1,
  },
  categoryContent: {
    alignItems: 'center',
  },
  categoryIconContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  categoryImage: {
    width: 52,
    height: 52,
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -20,
    backgroundColor: '#1F2937',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  categoryTitle: {
    fontSize: 12,
    color: '#717171',
    fontWeight: '500',
  },
  categoryTitleActive: {
    color: '#000',
    fontWeight: '500',
  },
  animatedIndicator: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    backgroundColor: '#000',
    borderRadius: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  propertyList: {
    paddingHorizontal: 16,
  },
  propertyCard: {
    width: (screenWidth - 48) / 2.1,
    marginHorizontal: 8,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  propertyImage: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
  },
  guestFavoriteBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
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
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  propertyInfo: {
    paddingHorizontal: 4,
  },
  propertyTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
    marginBottom: 4,
  },
  propertyDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  propertyPrice: {
    fontSize: 14,
    color: '#717171',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#000',
    marginLeft: 4,
    fontWeight: '500',
  },
  priceNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7F7F7',
    marginHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 100,
  },
  priceNoticeText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
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
    bottom: screenHeight * 0.15,
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
  headerTitle: {
    marginTop: 12,
    alignItems: 'center',
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
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 24,
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
  hostSection: {
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  hostInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hostAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 16,
  },
  hostDetails: {
    flex: 1,
  },
  hostName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  hostMeta: {
    fontSize: 14,
    color: '#6B7280',
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
  descriptionSection: {
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  sectionHeaderModal: {
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
  extraContent: {
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
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
  locationSection: {
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  locationText: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 22,
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
  // Floating Login Button
  floatingLoginButton: {
    position: 'absolute',
    bottom: 100, // Above tab bar
    right: 20,
    backgroundColor: '#FF385C',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 1000,
  },
  floatingLoginText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
});