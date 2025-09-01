// components/search-modal.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  SafeAreaView,
  Pressable,
  TextInput,
  Animated,
  Dimensions,
  ScrollView,
  StatusBar,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@/components/text';
import Calendar from '@/components/calendar';
import { Image } from 'react-native';

interface MorphingSearchModalProps {
  visible: boolean;
  onClose: () => void;
  onSearch?: (query: string) => void;
  searchBarPosition?: { x: number; y: number; width: number; height: number };
}

interface CategoryData {
  id: number;
  title: string;
  icon: any; // Changed from string to any for require() imports
  isActive: boolean;
}

interface DestinationData {
  id: number;
  title: string;
  subtitle: string;
  icon: any;
  iconColor?: string;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Categories data
const categories: CategoryData[] = [
  { id: 1, title: 'Homes', icon: require('@/assets/images/home.png'), isActive: true },
  { id: 2, title: 'Experiences', icon: require('@/assets/images/experiences.png'), isActive: false },
  { id: 3, title: 'Services', icon: require('@/assets/images/services.png'), isActive: false },
];

// Destinations with proper icons
const destinationsData: DestinationData[] = [
  {
    id: 1,
    title: 'Nearby',
    subtitle: 'Find what\'s around you',
    icon: require('@/assets/images/icon.png'),
    iconColor: '#007AFF',
  },
  {
    id: 2,
    title: 'Toronto, Ontario',
    subtitle: 'Because your wishlist has stays in Toronto',
    icon: require('@/assets/images/icon.png'),
    iconColor: '#007AFF',
  },
  {
    id: 3,
    title: 'Mississauga, Ontario',
    subtitle: 'Because your wishlist has stays in Mississauga',
    icon: require('@/assets/images/icon.png'),
    iconColor: '#007AFF',
  },
  {
    id: 4,
    title: 'Downtown Montreal, Quebec',
    subtitle: 'For sights like Notre-Dame Basilica of Montreal',
    icon: require('@/assets/images/icon.png'),
    iconColor: '#E85D75',
  },
  {
    id: 5,
    title: 'Niagara Falls, Ontario',
    subtitle: 'Great for a weekend getaway',
    icon: require('@/assets/images/icon.png'),
    iconColor: '#8B5A3C',
  },
];

type SectionType = 'where' | 'when' | 'who' | 'what' | null;

export default function SearchModal({ 
  visible, 
  onClose, 
  onSearch,
  searchBarPosition = { x: 24, y: 200, width: screenWidth - 48, height: 56 }
}: MorphingSearchModalProps) {
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSection, setExpandedSection] = useState<SectionType>('where');
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [pets, setPets] = useState(0);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  
  // Animation values
  const morphAnim = useRef(new Animated.Value(0)).current;
  const blurAnim = useRef(new Animated.Value(0)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;
  const categorySlideAnim = useRef(new Animated.Value(0)).current;
  const searchBarScale = useRef(new Animated.Value(1)).current;
  
  // Section animations
  const sectionAnimations = useRef({
    where: new Animated.Value(0),
    when: new Animated.Value(0),
    who: new Animated.Value(0),
    what: new Animated.Value(0),
  }).current;
  
  // Category animations
  const categoryAnimations = useRef(
    categories.map(() => new Animated.Value(1))
  ).current;

  useEffect(() => {
    if (visible) {
      startMorphAnimation();
      // Auto-expand 'where' section when modal opens
      setExpandedSection('where');
    } else {
      reverseMorphAnimation();
    }
  }, [visible]);

  useEffect(() => {
    animateCategoryIndicator();
  }, [selectedCategory]);

  useEffect(() => {
    animateSections();
  }, [expandedSection]);

  const startMorphAnimation = () => {
    morphAnim.setValue(0);
    blurAnim.setValue(0);
    contentOpacity.setValue(0);
    searchBarScale.setValue(1);
    
    Animated.timing(searchBarScale, {
      toValue: 0.98,
      duration: 150,
      useNativeDriver: false,
    }).start(() => {
      Animated.parallel([
        Animated.spring(morphAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: false,
        }),
        Animated.timing(blurAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: false,
        }),
        Animated.timing(searchBarScale, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start(() => {
        Animated.timing(contentOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }).start();
      });
    });
  };

  const reverseMorphAnimation = () => {
    Animated.parallel([
      Animated.timing(contentOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(blurAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.spring(morphAnim, {
        toValue: 0,
        tension: 120,
        friction: 8,
        useNativeDriver: false,
      }),
    ]).start();
  };

const animateCategoryIndicator = () => {
  // Since we're using flex: 1 for each category, each takes equal space
  const totalCategories = categories.length;
  const containerWidth = screenWidth - 40; // Account for horizontal padding (20px each side)
  const categoryWidth = containerWidth / totalCategories;
  
  // Calculate the center position for the selected category
  const centerPosition = (selectedCategory - 1) * categoryWidth + categoryWidth / 2;
  
  // The indicator should be centered, so subtract half its width
  const indicatorWidth = 60; // Adjust this based on your desired indicator width
  const targetPosition = centerPosition - indicatorWidth / 2;
  
  Animated.spring(categorySlideAnim, {
    toValue: targetPosition,
    tension: 300,
    friction: 20,
    useNativeDriver: false,
  }).start();

  categoryAnimations.forEach((anim, index) => {
    Animated.spring(anim, {
      toValue: selectedCategory === index + 1 ? 1.1 : 1,
      tension: 300,
      friction: 8,
      useNativeDriver: false,
    }).start();
  });
};

  const animateSections = () => {
    Object.keys(sectionAnimations).forEach((key) => {
      const sectionKey = key as keyof typeof sectionAnimations;
      Animated.spring(sectionAnimations[sectionKey], {
        toValue: expandedSection === sectionKey ? 1 : 0,
        tension: 300,
        friction: 25,
        useNativeDriver: false,
      }).start();
    });
  };

  const handleCategoryPress = (categoryId: number) => {
    setSelectedCategory(categoryId);
    // Reset expanded section based on category
    if (categoryId === 1) { // Homes
      setExpandedSection('where');
    } else if (categoryId === 2) { // Experiences
      setExpandedSection('where');
    } else if (categoryId === 3) { // Services
      setExpandedSection('where');
    }
  };

  const handleSectionPress = (section: SectionType) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleDestinationPress = (destination: DestinationData) => {
    setSearchQuery(destination.title);
    setExpandedSection('when');
  };

  const handleSearch = () => {
    onSearch?.(searchQuery);
    onClose();
  };

  const handleClearAll = () => {
    setSearchQuery('');
    setAdults(0);
    setChildren(0);
    setInfants(0);
    setPets(0);
    setSelectedDates([]);
    setExpandedSection('where');
  };

  const getSecondSectionConfig = () => {
    switch (selectedCategory) {
      case 1: // Homes
        return { key: 'when' as SectionType, title: 'When', placeholder: 'Add dates' };
      case 2: // Experiences
        return { key: 'when' as SectionType, title: 'When', placeholder: 'Add dates' };
      case 3: // Services
        return { key: 'what' as SectionType, title: 'What', placeholder: 'Add service' };
      default:
        return { key: 'when' as SectionType, title: 'When', placeholder: 'Add dates' };
    }
  };

  const getThirdSectionConfig = () => {
    switch (selectedCategory) {
      case 1: // Homes
        return { key: 'who' as SectionType, title: 'Who', placeholder: 'Add guests' };
      case 2: // Experiences
        return { key: 'who' as SectionType, title: 'Who', placeholder: 'Add guests' };
      case 3: // Services
        return null; // Services only has Where and What
      default:
        return { key: 'who' as SectionType, title: 'Who', placeholder: 'Add guests' };
    }
  };

  // Calculate morphing dimensions
  const morphedTop = morphAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [searchBarPosition.y, 80],
  });

  const morphedLeft = morphAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [searchBarPosition.x, 0],
  });

  const morphedWidth = morphAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [searchBarPosition.width, screenWidth],
  });

  const morphedHeight = morphAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [searchBarPosition.height, screenHeight - 80],
  });

  const morphedBorderRadius = morphAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [28, 24],
  });

  const renderCategories = () => (
    <View style={styles.categoriesContainer}>
      <View style={styles.categoriesRow}>
        {categories.map((category, index) => (
          <Pressable
            key={category.id}
            style={styles.categoryItem}
            onPress={() => handleCategoryPress(category.id)}
          >
            <Animated.View
              style={[
                styles.categoryContent,
                {
                  transform: [{ scale: categoryAnimations[index] }],
                },
              ]}
            >
              <View style={styles.categoryIcon}>
                <Image
                  source={category.icon} 
                  style={styles.categoryImage}
                  resizeMode="contain"
                />
                {(category.title === 'Experiences' || category.title === 'Services') && (
                  <View style={styles.newBadge}>
                    <Text style={styles.newBadgeText}>NEW</Text>
                  </View>
                )}
              </View>
              <Text
                style={[
                  styles.categoryTitle,
                  selectedCategory === category.id && styles.categoryTitleActive,
                ]}
              >
                {category.title}
              </Text>
            </Animated.View>
          </Pressable>
        ))}
      </View>
      
      <Animated.View
        style={[
          styles.categoryIndicator,
          {
            transform: [{ translateX: categorySlideAnim }],
          },
        ]}
      />
    </View>
  );

  const renderDestinationIcon = (destination: DestinationData) => {
    const getIconEmoji = () => {
      switch (destination.id) {
        case 1: return '✈️';
        case 2: return '🏙️';
        case 3: return '🏘️';
        case 4: return '🏛️';
        case 5: return '🏞️';
        default: return '📍';
      }
    };

    return (
      <View style={[styles.destinationIcon, { backgroundColor: destination.iconColor + '15' }]}>
        <Text style={styles.destinationEmoji}>{getIconEmoji()}</Text>
      </View>
    );
  };

  const renderWhereSection = () => {
    const isExpanded = expandedSection === 'where';
    const animatedHeight = sectionAnimations.where.interpolate({
      inputRange: [0, 1],
      outputRange: [80, 400],
    });

    return (
      <Animated.View
        style={[
          styles.section,
          isExpanded && styles.expandedSection,
          { height: animatedHeight }
        ]}
      >
        <Pressable 
          style={styles.sectionHeader}
          onPress={() => handleSectionPress('where')}
        >
          <Text style={styles.sectionTitle}>Where?</Text>
          {!isExpanded && searchQuery && (
            <Text style={styles.sectionValue}>{searchQuery}</Text>
          )}
          {!isExpanded && !searchQuery && (
            <Text style={styles.sectionPlaceholder}>Search destinations</Text>
          )}
        </Pressable>

        {isExpanded && (
          <Animated.View style={styles.sectionContent}>
            <View style={styles.searchInputContainer}>
              <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search destinations"
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor="#999"
                autoFocus={isExpanded}
              />
            </View>

            <Text style={styles.suggestedTitle}>Suggested destinations</Text>
            
            <ScrollView style={styles.destinationsList} showsVerticalScrollIndicator={false}>
              {destinationsData.map((destination) => (
                <Pressable
                  key={destination.id}
                  style={styles.destinationItem}
                  onPress={() => handleDestinationPress(destination)}
                >
                  {renderDestinationIcon(destination)}
                  <View style={styles.destinationContent}>
                    <Text style={styles.destinationTitle}>{destination.title}</Text>
                    <Text style={styles.destinationSubtitle}>{destination.subtitle}</Text>
                  </View>
                </Pressable>
              ))}
            </ScrollView>
          </Animated.View>
        )}
      </Animated.View>
    );
  };

  const renderWhenSection = () => {
    const secondSection = getSecondSectionConfig();
    if (!secondSection || secondSection.key !== 'when') return null;

    const isExpanded = expandedSection === 'when';
    const animatedHeight = sectionAnimations.when.interpolate({
      inputRange: [0, 1],
      outputRange: [80, 600],
    });

    return (
      <Animated.View
        style={[
          styles.section,
          isExpanded && styles.expandedSection,
          { height: animatedHeight }
        ]}
      >
        <Pressable 
          style={styles.sectionHeader}
          onPress={() => handleSectionPress('when')}
        >
          <Text style={styles.sectionTitle}>When?</Text>
          {!isExpanded && (
            <Text style={styles.sectionPlaceholder}>Add dates</Text>
          )}
        </Pressable>

        {isExpanded && (
          <Animated.View style={styles.sectionContent}>
                          <View style={styles.datePickerContainer}>
                <Calendar
                  selectedDates={selectedDates}
                  onDateSelect={setSelectedDates}
                  isRange={true}
                />
              </View>
          </Animated.View>
        )}
      </Animated.View>
    );
  };

  const renderWhoSection = () => {
    const thirdSection = getThirdSectionConfig();
    if (!thirdSection || thirdSection.key !== 'who') return null;

    const isExpanded = expandedSection === 'who';
    const animatedHeight = sectionAnimations.who.interpolate({
      inputRange: [0, 1],
      outputRange: [80, 400],
    });

    const totalGuests = adults + children + infants;

    return (
      <Animated.View
        style={[
          styles.section,
          isExpanded && styles.expandedSection,
          { height: animatedHeight }
        ]}
      >
        <Pressable 
          style={styles.sectionHeader}
          onPress={() => handleSectionPress('who')}
        >
          <Text style={styles.sectionTitle}>Who?</Text>
          {!isExpanded && totalGuests > 0 && (
            <Text style={styles.sectionValue}>
              {totalGuests} guest{totalGuests !== 1 ? 's' : ''}
            </Text>
          )}
          {!isExpanded && totalGuests === 0 && (
            <Text style={styles.sectionPlaceholder}>Add guests</Text>
          )}
        </Pressable>

        {isExpanded && (
          <Animated.View style={styles.sectionContent}>
            <View>
              <View style={styles.guestRow}>
                <View>
                  <Text style={styles.guestType}>Adults</Text>
                  <Text style={styles.guestAges}>Ages 13 or above</Text>
                </View>
                <View style={styles.counterControls}>
                  <Pressable 
                    style={[styles.counterButton, adults === 0 && styles.counterButtonDisabled]}
                    onPress={() => setAdults(Math.max(0, adults - 1))}
                  >
                    <Ionicons name="remove" size={16} color={adults === 0 ? "#ccc" : "#666"} />
                  </Pressable>
                  <Text style={styles.counterValue}>{adults}</Text>
                  <Pressable 
                    style={styles.counterButton}
                    onPress={() => setAdults(adults + 1)}
                  >
                    <Ionicons name="add" size={16} color="#666" />
                  </Pressable>
                </View>
              </View>

              <View style={styles.guestRow}>
                <View>
                  <Text style={styles.guestType}>Children</Text>
                  <Text style={styles.guestAges}>Ages 2-12</Text>
                </View>
                <View style={styles.counterControls}>
                  <Pressable 
                    style={[styles.counterButton, children === 0 && styles.counterButtonDisabled]}
                    onPress={() => setChildren(Math.max(0, children - 1))}
                  >
                    <Ionicons name="remove" size={16} color={children === 0 ? "#ccc" : "#666"} />
                  </Pressable>
                  <Text style={styles.counterValue}>{children}</Text>
                  <Pressable 
                    style={styles.counterButton}
                    onPress={() => setChildren(children + 1)}
                  >
                    <Ionicons name="add" size={16} color="#666" />
                  </Pressable>
                </View>
              </View>

              <View style={styles.guestRow}>
                <View>
                  <Text style={styles.guestType}>Infants</Text>
                  <Text style={styles.guestAges}>Under 2</Text>
                </View>
                <View style={styles.counterControls}>
                  <Pressable 
                    style={[styles.counterButton, infants === 0 && styles.counterButtonDisabled]}
                    onPress={() => setInfants(Math.max(0, infants - 1))}
                  >
                    <Ionicons name="remove" size={16} color={infants === 0 ? "#ccc" : "#666"} />
                  </Pressable>
                  <Text style={styles.counterValue}>{infants}</Text>
                  <Pressable 
                    style={styles.counterButton}
                    onPress={() => setInfants(infants + 1)}
                  >
                    <Ionicons name="add" size={16} color="#666" />
                  </Pressable>
                </View>
              </View>

              <View style={styles.guestRow}>
                <View>
                  <Text style={styles.guestType}>Pets</Text>
                  <Text style={[styles.guestAges, styles.petLink]}>Bringing a service animal?</Text>
                </View>
                <View style={styles.counterControls}>
                  <Pressable 
                    style={[styles.counterButton, pets === 0 && styles.counterButtonDisabled]}
                    onPress={() => setPets(Math.max(0, pets - 1))}
                  >
                    <Ionicons name="remove" size={16} color={pets === 0 ? "#ccc" : "#666"} />
                  </Pressable>
                  <Text style={styles.counterValue}>{pets}</Text>
                  <Pressable 
                    style={styles.counterButton}
                    onPress={() => setPets(pets + 1)}
                  >
                    <Ionicons name="add" size={16} color="#666" />
                  </Pressable>
                </View>
              </View>
            </View>
          </Animated.View>
        )}
      </Animated.View>
    );
  };

  const renderWhatSection = () => {
    const secondSection = getSecondSectionConfig();
    if (!secondSection || secondSection.key !== 'what') return null;

    const isExpanded = expandedSection === 'what';
    const animatedHeight = sectionAnimations.what.interpolate({
      inputRange: [0, 1],
      outputRange: [80, 300],
    });

    return (
      <Animated.View
        style={[
          styles.section,
          isExpanded && styles.expandedSection,
          { height: animatedHeight }
        ]}
      >
        <Pressable 
          style={styles.sectionHeader}
          onPress={() => handleSectionPress('what')}
        >
          <Text style={styles.sectionTitle}>What?</Text>
          <Text style={styles.sectionPlaceholder}>Add service</Text>
        </Pressable>

        {isExpanded && (
          <Animated.View style={styles.sectionContent}>
            <Text style={styles.servicePlaceholder}>Service options would go here</Text>
          </Animated.View>
        )}
      </Animated.View>
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="none"


   
      onRequestClose={onClose}
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      {/* Blur Background */}
      <Animated.View style={[StyleSheet.absoluteFill, { 
        opacity: blurAnim,
        backgroundColor: 'rgba(0, 0, 0, 0.1)'
      }]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
      </Animated.View>

      {/* Morphing Container */}
      <Animated.View
        style={[
          styles.morphingContainer,
          {
            top: morphedTop,
            left: morphedLeft,
            width: morphedWidth,
            height: morphedHeight,
            borderRadius: morphedBorderRadius,
            transform: [{ scale: searchBarScale }],
          },
        ]}
      >
        <SafeAreaView style={styles.safeArea}>
          {/* Close Button */}
          <Animated.View style={[styles.closeButtonContainer, { opacity: contentOpacity }]}>
            <Pressable style={styles.closeButton} onPress={onClose}>
              <View style={styles.closeButtonInner}>
                <Ionicons name="close" size={18} color="#000" />
              </View>
            </Pressable>
          </Animated.View>

          {/* Categories */}
          <Animated.View style={[styles.categoriesSection, { opacity: contentOpacity }]}>
            {renderCategories()}
          </Animated.View>

          {/* Content */}
          <Animated.View style={[styles.content, { opacity: contentOpacity }]}>
            <ScrollView style={styles.sectionsContainer} showsVerticalScrollIndicator={false}>
              {renderWhereSection()}
              {renderWhenSection()}
              {renderWhoSection()}
              {renderWhatSection()}
            </ScrollView>
          </Animated.View>

          {/* Footer */}
          <Animated.View style={[styles.footer, { opacity: contentOpacity }]}>
            <Pressable style={styles.clearButton} onPress={handleClearAll}>
              <Text style={styles.clearButtonText}>Clear all</Text>
            </Pressable>
            
            <Pressable style={styles.searchButton} onPress={handleSearch}>
              <Ionicons name="search" size={18} color="#fff" />
              <Text style={styles.searchButtonText}>Search</Text>
            </Pressable>
          </Animated.View>
        </SafeAreaView>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  morphingContainer: {
    position: 'absolute',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
    overflow: 'hidden',
  },
  safeArea: {
    flex: 1,
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
  },
  closeButton: {
    zIndex: 10,
  },
  closeButtonInner: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoriesSection: {
    paddingTop: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  categoriesContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  categoriesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 16,
  },
  categoryItem: {
    flex: 1,
    alignItems: 'center',
  },
  categoryContent: {
    alignItems: 'center',
  },
  categoryIcon: {
    position: 'relative',
    marginBottom: 8,
  },
  categoryEmoji: {
    fontSize: 28,
  },
  newBadge: {
    position: 'absolute',
    top: -4,
    right: -12,
    backgroundColor: '#000',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  newBadgeText: {
    color: '#fff',
    fontSize: 8,
    fontWeight: '600',
  },
  categoryTitle: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  categoryTitleActive: {
    color: '#000',
    fontWeight: '600',
  },
  categoryIndicator: {
    position: 'absolute',
    bottom: 0,
    height: 2,

    backgroundColor: '#000',
    borderRadius: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionsContainer: {
    flex: 1,
    paddingVertical: 12,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    overflow: 'hidden',
  },
  expandedSection: {
    borderColor: '#000',
    borderWidth: 2,
  },
  sectionHeader: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 80,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
  },
  sectionValue: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  sectionPlaceholder: {
    fontSize: 16,
    color: '#666',
  },
  sectionContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  suggestedTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
  },
  destinationsList: {
    maxHeight: 200,
  },
  destinationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  destinationIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  destinationEmoji: {
    fontSize: 20,
  },
  destinationContent: {
    flex: 1,
  },
  destinationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 2,
  },
  destinationSubtitle: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  datePickerContainer: {
    height: 400,
  },
 
  guestRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  guestType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  guestAges: {
    fontSize: 14,
    color: '#666',
  },
  petLink: {
    textDecorationLine: 'underline',
  },
  counterControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterButtonDisabled: {
    borderColor: '#e0e0e0',
  },
  counterValue: {
    fontSize: 16,
    fontWeight: '500',
    marginHorizontal: 16,
    minWidth: 20,
    textAlign: 'center',
  },
  servicePlaceholder: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingVertical: 40,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 40,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  clearButton: {
    paddingVertical: 12,
  },
  clearButtonText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E91E63',
    borderRadius: 24,
    paddingHorizontal: 32,
    paddingVertical: 16,
    shadowColor: '#E91E63',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  categoryImage: {
    width: 44,
    height: 44,
  },

});