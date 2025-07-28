import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  Pressable,
} from 'react-native';
import { supabase } from '@/lib/supabase';
import AuthModal from '@/components/auth-modal';
import { Text } from '@/components/text';

interface User {
  id: string;
  email?: string;
  user_metadata: {
    full_name?: string;
    avatar_url?: string;
    name?: string;
    picture?: string;
  };
}

// Sample data for recently viewed properties (when logged in)
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

// Sample wishlist data (when logged in)
const savedWishlists = [
  {
    id: 1,
    name: 'Weekend Getaways',
    properties: 4,
    coverImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=200&h=200&fit=crop',
  },
  {
    id: 2,
    name: 'City Breaks',
    properties: 7,
    coverImage: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=200&h=200&fit=crop',
  },
];

export default function WishlistsScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    // Check initial auth status
    const checkAuthStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setIsLoading(false);
    };

    checkAuthStatus();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
      if (event === 'SIGNED_OUT') {
        setShowAuthModal(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

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
          <Text style={styles.title}>Wishlists</Text>
        </View>

        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyTitle}>Log in to view your wishlists</Text>
          <Text style={styles.emptySubtitle}>
            You can create, view, or edit wishlists once you&apos;ve logged in.
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

  // Signed In State - Show Wishlists Content
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Wishlists</Text>
      </View>

      <View style={styles.content}>
        {/* Recently Viewed Section */}
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

        {/* Saved Wishlists Section */}
        <View style={styles.savedWishlistsSection}>
          <Text style={styles.savedWishlistsTitle}>Your wishlists</Text>
          
          {savedWishlists.map((wishlist) => (
            <Pressable key={wishlist.id} style={styles.wishlistItem}>
              <Image
                source={{ uri: wishlist.coverImage }}
                style={styles.wishlistImage}
              />
              <View style={styles.wishlistInfo}>
                <Text style={styles.wishlistName}>{wishlist.name}</Text>
                <Text style={styles.wishlistCount}>
                  {wishlist.properties} {wishlist.properties === 1 ? 'property' : 'properties'}
                </Text>
              </View>
            </Pressable>
          ))}

          {/* Create New Wishlist Button */}
          <Pressable style={styles.createWishlistButton}>
            <View style={styles.createWishlistIcon}>
              <Text style={styles.createWishlistPlus}>+</Text>
            </View>
            <View style={styles.createWishlistInfo}>
              <Text style={styles.createWishlistText}>Create new wishlist</Text>
            </View>
          </Pressable>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

  // Signed In Content
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

  // Saved Wishlists
  savedWishlistsSection: {
    flex: 1,
  },
  savedWishlistsTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
  },
  wishlistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 8,
  },
  wishlistImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    marginRight: 16,
  },
  wishlistInfo: {
    flex: 1,
  },
  wishlistName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  wishlistCount: {
    fontSize: 14,
    color: '#666',
  },
  createWishlistButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 8,
  },
  createWishlistIcon: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#f8f8f8',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  createWishlistPlus: {
    fontSize: 24,
    color: '#999',
    fontWeight: '300',
  },
  createWishlistInfo: {
    flex: 1,
  },
  createWishlistText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
});