// app/(tabs)/index.tsx - Fixed category alignment and Poppins font
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
  Share
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AuthModal from '@/components/auth-modal';
import PropertyModal from '@/components/property/property-modal';
import { Text } from '@/components/text';
import { useFonts } from 'expo-font';

import { propertyData } from '@/data/property-data';
import SearchModal from '@/components/search-modal';
import { experiencesData } from '@/data/experiences-data';
import { servicesData } from '@/data/services-data';

const { width: screenWidth } = Dimensions.get('window');

// Enhanced category data with proper icons
const enhancedCategoryData = [
  { 
    id: 1, 
    title: 'Homes', 
    icon: require('@/assets/images/home.png'), 
    badge: null 
  },
  { 
    id: 2, 
    title: 'Experiences', 
    icon: require('@/assets/images/experiences.png'), 
    badge: 'NEW' 
  },
  { 
    id: 3, 
    title: 'Services', 
    icon: require('@/assets/images/services.png'), 
    badge: 'NEW' 
  },
];



export default function ExploreScreen() {
  const [showAuthModal, setShowAuthModal] = useState(true);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<any | null>(null);
  
  const slideAnim = useRef(new Animated.Value(0)).current;
  const scaleAnims = useRef(enhancedCategoryData.map(() => new Animated.Value(1))).current;
  const contentOpacity = useRef(new Animated.Value(1)).current;
  
  const tabWidth = (screenWidth - 48) / 3; // Total width minus padding divided by 3 tabs
  const indicatorWidth = tabWidth * 0.8; // Make indicator slightly smaller than tab
  const indicatorOffset = (tabWidth - indicatorWidth) / 2; // Center the indicator within the tab

  // Load Poppins fonts
  const [fontsLoaded] = useFonts({
    'Figtree-Regular': require('@/assets/fonts/figtree-regular.ttf'),
  });

  useEffect(() => {
    const targetPosition = (selectedCategory - 1) * tabWidth + indicatorOffset;
    
    Animated.spring(slideAnim, {
      toValue: targetPosition,
      useNativeDriver: true,
      tension: 300,
      friction: 30,
    }).start();

    scaleAnims.forEach((anim, index) => {
      Animated.spring(anim, {
        toValue: selectedCategory === index + 1 ? 1.05 : 1,
        useNativeDriver: true,
        tension: 300,
        friction: 8,
      }).start();
    });
  }, [selectedCategory, tabWidth, indicatorOffset]);

  const handleCategoryPress = (categoryId: number) => {
    if (categoryId === selectedCategory) return;

    // Fade out content
    Animated.timing(contentOpacity, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      // Change category
      setSelectedCategory(categoryId);
      
      // Fade in new content
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  const handlePropertyPress = (property: any) => {
    setSelectedProperty(property);
  };

  const handleSharePress = async () => {
    if (!selectedProperty) return;
    
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

  const handleCloseModal = () => {
    setSelectedProperty(null);
  };

  const handleAuthSuccess = (user: any) => {
    console.log('Authentication successful:', user);
    setShowAuthModal(false);
    setUserAuthenticated(true);
  };

  const handleCloseAuthModal = () => {
    setShowAuthModal(false);
  };



  const handleSearchPress = () => {
    setShowSearchModal(true);
  };

  const handleSearchClose = () => {
    setShowSearchModal(false);
  };

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    // Implement search logic here
  };

  // Get content based on selected category
  const getCategoryContent = () => {
    switch (selectedCategory) {
      case 1: // Homes
        return {
          sections: [
            {
              title: 'Popular homes in Philadelphia',
              data: propertyData.filter(property => 
                property.location.includes('Philadelphia') || property.location.includes('PA')
              )
            },
            {
              title: 'Available next month in Miami',
              data: propertyData.filter(property => 
                property.location.includes('Miami') || 
                property.location.includes('FL') ||
                property.location.includes('New York') ||
                property.location.includes('Brooklyn')
              )
            },
            {
              title: 'Unique stays',
              data: propertyData.slice(4, 8)
            }
          ]
        };
      
      case 2: // Experiences
        return {
          sections: [
            {
              title: 'Airbnb Originals',
              data: experiencesData.filter(exp => exp.badge === 'Original')
            },
            {
              title: 'Popular with travellers from your area',
              data: experiencesData.filter(exp => exp.badge === 'Popular')
            },
            {
              title: 'Experiences in Toronto',
              data: experiencesData.filter(exp => exp.subtitle.includes('Toronto'))
            }
          ]
        };
      
      case 3: // Services
        return {
          sections: [
            {
              title: 'Services in Toronto',
              data: servicesData.slice(0, 2)
            },
            {
              title: 'Discover services on Airbnb',
              data: servicesData.slice(2, 4)
            },
            {
              title: 'Photography',
              data: servicesData.filter(service => service.title.includes('Photography') || service.title.includes('Photo'))
            }
          ]
        };
      
      default:
        return { sections: [] };
    }
  };

  const renderSearchBar = () => (
    <View style={styles.searchBarContainer}>
      <Pressable style={styles.searchBar} onPress={handleSearchPress}>
        <Ionicons name="search" size={20} color="#717171" />
        <Text style={styles.searchText}>Start your search</Text>
      </Pressable>
    </View>
  );

  const renderCategories = () => (
    <View style={styles.categoryContainer}>
      <View style={styles.categoryTabs}>
        {enhancedCategoryData.map((category, index) => (
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
                  source={category.icon} 
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
            width: indicatorWidth,
          }
        ]} 
      />
    </View>
  );

  const renderPropertyCard = (property: any) => (
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
          <Text style={styles.propertyTitle} numberOfLines={2}>{property.title}</Text>
          <Text style={styles.propertySubtitle} numberOfLines={1}>{property.subtitle}</Text>
          <View style={styles.propertyDetails}>
            <Text style={styles.propertyPrice}>{property.price}</Text>
            {property.rating && (
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={12} color="#000" />
                <Text style={styles.ratingText}>{property.rating}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </Pressable>
  );

  const renderSection = (title: string, properties: any[]) => {
    if (!properties || properties.length === 0) return null;
    
    return (
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
  };

  const categoryContent = getCategoryContent();

  if (!fontsLoaded) {
    return null; // Or your loading component
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          {renderSearchBar()}
          {renderCategories()}
        </View>

        <Animated.View 
          key={selectedCategory}
       
        >
          {categoryContent.sections.map((section, index) => (
            <View key={index}>
              {renderSection(section.title, section.data)}
            </View>
          ))}

          <View style={styles.priceNotice}>
            <Ionicons name="heart" size={16} color="#FF385C" />
            <Text style={styles.priceNoticeText}>Prices include all fees</Text>
          </View>
        </Animated.View>
      </ScrollView>

  
      <PropertyModal
        property={selectedProperty}
        visible={!!selectedProperty}
        onClose={handleCloseModal}
        onShare={handleSharePress}
      />

      <SearchModal
        visible={showSearchModal}
        onClose={handleSearchClose}
        onSearch={handleSearch}
      />
      
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
    fontFamily: 'Poppins-Medium',
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
    marginBottom: 2,
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
    fontFamily: 'figtree',
  },
  categoryTitle: {
    fontSize: 12,
    color: '#717171',
    fontFamily: 'figtree',
  },
  categoryTitleActive: {
    color: '#000',
    fontFamily: 'figtree',
  },
  animatedIndicator: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    backgroundColor: '#000',
    borderRadius: 20,
    left: 24, // Account for container padding
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
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
  },
  propertyList: {
    paddingHorizontal: 16,
  },
  propertyCard: {
    width: (screenWidth - 48) / 2.1,
    marginHorizontal: 8,
  },
  cardContainer: {
    // Container for the entire card
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
    fontFamily: 'Poppins-SemiBold',
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
    fontFamily: 'Poppins-Medium',
    color: '#000',
    marginBottom: 2,
  },
  propertySubtitle: {
    fontSize: 13,
    color: '#717171',
    marginBottom: 4,
    fontFamily: 'Poppins-Regular',
  },
  propertyDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  propertyPrice: {
    fontSize: 12,
    color: '#717171',
    fontFamily: 'Poppins-Regular',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#000',
    marginLeft: 4,
    fontFamily: 'figtree',
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
    fontFamily: 'Poppins-Medium',
  },
  floatingLoginButton: {
    position: 'absolute',
    bottom: 100,
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
    fontFamily: 'figtree',
    marginLeft: 8,
  },
});