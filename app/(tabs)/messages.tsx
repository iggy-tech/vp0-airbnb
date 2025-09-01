import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  SafeAreaView,
  TextInput,
  Animated,
  Dimensions,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';
import AuthModal from '@/components/auth-modal';
import { Text } from '@/components/text';

interface User {
  id: string;
  email: string;
  user_metadata: {
    full_name?: string;
    avatar_url?: string;
    name?: string;
    picture?: string;
  };
}

const categoryTabs = ['All', 'Travelling', 'Support'];

const messages = [
  {
    id: 1,
    hostName: 'Allison',
    message: 'Airbnb update: The host invited the gu...',
    details: 'Invited to book • Sep 5 – 7 • New York',
    time: '2:03 AM',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    propertyImage: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=100&h=100&fit=crop',
    hasButton: true,
    buttonText: 'Complete booking',
    isUnread: false,
    category: 'Travelling',
  },
  {
    id: 2,
    hostName: 'David',
    message: 'Thanks for your interest! The space is...',
    details: 'Booking confirmed • Aug 28 – 30 • Los Angeles',
    time: 'Yesterday',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    propertyImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=100&h=100&fit=crop',
    hasButton: true,
    buttonText: 'Complete booking',
    isUnread: false,
    category: 'Travelling',
  },
  {
    id: 3,
    hostName: 'Sarah',
    message: 'Your reservation has been approved!',
    details: 'Check-in ready • Aug 15 – 17 • San Francisco',
    time: '3 days ago',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
    propertyImage: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=100&h=100&fit=crop',
    hasButton: true,
    buttonText: 'Complete booking',
    isUnread: false,
    category: 'Travelling',
  },
  {
    id: 4,
    hostName: 'Support Team',
    message: 'How was your recent stay? We\'d love...',
    details: 'Feedback request • Jul 20 • Miami',
    time: '1 week ago',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
    propertyImage: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=100&h=100&fit=crop',
    hasButton: false,
    buttonText: '',
    isUnread: false,
    category: 'Support',
  },
  {
    id: 5,
    hostName: 'Michael',
    message: 'Looking forward to hosting you next...',
    details: 'Upcoming trip • Dec 1 – 3 • Boston',
    time: '2 weeks ago',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    propertyImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=100&h=100&fit=crop',
    hasButton: true,
    buttonText: 'Complete booking',
    isUnread: false,
    category: 'Travelling',
  },
];

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function MessagesScreen() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchText, setSearchText] = useState('');
  
  const searchAnimation = useRef(new Animated.Value(0)).current;
  const searchInputRef = useRef<TextInput>(null);

  useEffect(() => {
    // Check initial auth status
    const checkAuthStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ? {
        id: session.user.id,
        email: session.user.email ?? '',
        user_metadata: session.user.user_metadata ?? {},
      } : null);
      setIsLoading(false);
    };

    checkAuthStatus();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ? {
        id: session.user.id,
        email: session.user.email ?? '',
        user_metadata: session.user.user_metadata ?? {},
      } : null);
      if (event === 'SIGNED_OUT') {
        setShowAuthModal(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Filter messages based on selected category
  const filteredMessages = selectedCategory === 'All' 
    ? messages 
    : messages.filter(message => message.category === selectedCategory);

  const expandSearch = () => {
    setIsSearchExpanded(true);
    Animated.timing(searchAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      searchInputRef.current?.focus();
    });
  };

  const collapseSearch = () => {
    setIsSearchExpanded(false);
    setSearchText('');
    searchInputRef.current?.blur();
    Animated.timing(searchAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const searchBarWidth = searchAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [44, screenWidth - 140], // Leave space for cancel button and padding
  });

  const handleChatPress = (message: any) => {
    // Navigate to the individual chat screen using Expo Router
    router.push({
      pathname: '/chat/[id]',
      params: {
        id: message.id,
        hostName: message.hostName,
        hostAvatar: message.avatar,
        propertyImage: message.propertyImage,
        details: message.details,
      }
    });
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Signed Out State - Login Prompt
  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Inbox</Text>
        </View>

        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyTitle}>Log in to see messages</Text>
          <Text style={styles.emptySubtitle}>
            Once you login, you&apos;ll find messages from hosts here.
          </Text>

          <Pressable
            style={styles.loginButton}
            onPress={() => setShowAuthModal(true)}
          >
            <Text style={styles.loginButtonText}>Log in</Text>
          </Pressable>
        </View>

        <AuthModal
          visible={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onAuthSuccess={(user) => {
            setUser(user);
            setShowAuthModal(false);
          }}
        />
      </SafeAreaView>
    );
  }

  // Signed In State - Show Messages
  const renderMessage = ({ item: message }: { item: any }) => (
    <Pressable 
      style={styles.messageItem}
      onPress={() => handleChatPress(message)}
      android_ripple={{ color: '#f0f0f0' }}
    >
      <View style={styles.messageContent}>
        <View style={styles.avatarContainer}>
          <Image 
            source={{ uri: message.propertyImage }} 
            style={styles.propertyImage}
          />
          <Image 
            source={{ uri: message.avatar }} 
            style={styles.hostAvatar}
          />
        </View>
        
        <View style={styles.messageInfo}>
          <View style={styles.messageHeader}>
            <Text style={styles.hostName}>{message.hostName}</Text>
            <Text style={styles.messageTime}>{message.time}</Text>
          </View>
          
          <Text style={styles.messageText}>{message.message}</Text>
          
          <View style={styles.messageDetails}>
            {message.isUnread && <View style={styles.unreadDot} />}
            <Text style={styles.detailsText}>{message.details}</Text>
          </View>
          
          {message.hasButton && (
            <Pressable style={styles.actionButton}>
              <Text style={styles.actionButtonText}>{message.buttonText}</Text>
            </Pressable>
          )}
        </View>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerRight}>
            <Animated.View style={[
              styles.searchContainer,
              {
                width: searchBarWidth,
              }
            ]}>
              {isSearchExpanded ? (
                <View style={styles.expandedSearchBar}>
                  <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
                  <TextInput
                    ref={searchInputRef}
                    style={styles.searchInput}
                 
                    value={searchText}
                    onChangeText={setSearchText}
                    placeholderTextColor="#666"
                  />
                </View>
              ) : (
                <Pressable style={styles.headerButton} onPress={expandSearch}>
                  <Ionicons name="search" size={20} color="#000" />
                </Pressable>
              )}
            </Animated.View>
            
            {isSearchExpanded ? (
              <Pressable onPress={collapseSearch} style={styles.cancelButton}>
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable>
            ) : (
              <Pressable style={styles.headerButton}>
                <Ionicons name="settings-outline" size={20} color="#000" />
              </Pressable>
            )}
          </View>
        </View>
      </View>

      <View style={styles.titleHeader}>
        <Text style={styles.title}>Messages</Text>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScrollView}
        contentContainerStyle={styles.categoryContainer}
      >
        {categoryTabs.map((category) => (
          <Pressable
            key={category}
            style={[
              styles.categoryTab,
              selectedCategory === category && styles.categoryTabActive
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.categoryTextActive
              ]}
            >
              {category}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.content}>
        {filteredMessages.length > 0 ? (
          <FlatList
            data={filteredMessages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id.toString()}
            style={styles.messagesList}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.messagesListContent}
          />
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.iconContainer}>
              <Ionicons name="chatbubble-outline" size={64} color="#ddd" />
            </View>
            <Text style={styles.emptyTitle}>No messages in {selectedCategory}</Text>
            <Text style={styles.emptySubtitle}>
              Try selecting a different category or check back later.
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Empty State (Signed Out)
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    maxWidth: 400,
    alignSelf: 'center',
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  loginButton: {
    backgroundColor: '#E91E63',
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 8,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  // Header
  header: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    minHeight: 40,
  },
  titleHeader: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#000',
    letterSpacing: -0.5,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchContainer: {
    backgroundColor: '#f7f7f7',
    height: 44,
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 22,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f7f7f7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  expandedSearchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: '100%',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    height: '100%',
  },
  cancelButton: {
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  cancelText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  
  // Categories
  categoryScrollView: {
    paddingVertical: 4,
    marginBottom: 0,
  },
  categoryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 4,
    gap: 8,
  },
  categoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 18,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    height: 32,
  },
  categoryTabActive: {
    backgroundColor: '#000',
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#666',
  },
  categoryTextActive: {
    color: '#fff',
  },
  
  // Content
  content: {
    height: screenHeight - 300,
    paddingTop: 4,
  },
  messagesList: {
    flex: 1,
  },
  messagesListContent: {
    paddingHorizontal: 24,
    paddingTop: 0,
  },
  messageItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  messageContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  propertyImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
  },
  hostAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    position: 'absolute',
    bottom: -10,
    right: -8,
    borderWidth: 2,
    borderColor: '#fff',
  },
  messageInfo: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  hostName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  messageTime: {
    fontSize: 14,
    color: '#888',
  },
  messageText: {
    fontSize: 15,
    color: '#000',
    marginBottom: 4,
    lineHeight: 20,
  },
  messageDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  unreadDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF385C',
    marginRight: 6,
  },
  detailsText: {
    fontSize: 14,
    color: '#888',
  },
  actionButton: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  emptyState: {
    alignItems: 'center',
    maxWidth: 280,
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  iconContainer: {
    marginBottom: 24,
  },
});