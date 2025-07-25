import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  SafeAreaView,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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

// Notifications Screen Component
function NotificationsScreen({ onBack }: { onBack: () => void }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.notificationsHeader}>
        <Pressable style={styles.backButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>
        <Text style={styles.title}>Notifications</Text>
        <View style={{ width: 44 }} />
      </View>
      
      <View style={styles.notificationsContent}>
        <View style={styles.notificationsEmptyState}>
          <Ionicons name="notifications" size={64} color="#ccc" />
          <Text style={styles.noNotificationsTitle}>No notifications yet</Text>
          <Text style={styles.noNotificationsSubtitle}>
            You've got a blank state (for now). We'll let you know when updates arrive.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default function ProfileScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

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
        setShowNotifications(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            await supabase.auth.signOut();
          },
        },
      ]
    );
  };

  const getUserName = () => {
    if (!user) return '';
    return user.user_metadata?.full_name || 
           user.user_metadata?.name || 
           user.email?.split('@')[0] || 
           'User';
  };

  const getUserAvatar = () => {
    if (!user) return null;
    return user.user_metadata?.avatar_url || user.user_metadata?.picture;
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

  // Show notifications screen if active
  if (showNotifications) {
    return <NotificationsScreen onBack={() => setShowNotifications(false)} />;
  }

  // Signed Out State - Login Screen
  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.headerSignedOut}>
            <Text style={styles.title}>Profile</Text>
          </View>

          <Text style={styles.subtitle}>
            Log in and start planning your next trip.
          </Text>

          <Pressable 
            style={styles.loginButton}
            onPress={() => setShowAuthModal(true)}
          >
            <Text style={styles.loginButtonText}>Log in or sign up</Text>
          </Pressable>

          <View style={styles.menuSection}>
            <MenuItem 
              icon="settings-outline" 
              title="Account settings" 
              onPress={() => {}}
            />
            <MenuItem 
              icon="help-circle-outline" 
              title="Get help" 
              onPress={() => {}}
            />
            <MenuItem 
              icon="hand-left-outline" 
              title="Privacy" 
              onPress={() => {}}
            />
            <MenuItem 
              icon="document-text-outline" 
              title="Legal" 
              onPress={() => {}}
            />
          </View>
        </ScrollView>

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

  // Signed In State - Profile Screen
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <Pressable 
            style={styles.notificationButton}
            onPress={() => setShowNotifications(true)}
          >
            <Ionicons name="notifications-outline" size={24} color="#000" />
          </Pressable>
        </View>

        {/* User Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            {getUserAvatar() ? (
              <Image source={{ uri: getUserAvatar() }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Ionicons name="person" size={40} color="#999" />
              </View>
            )}
          </View>
          <Text style={styles.userName}>{getUserName()}</Text>
          <Text style={styles.userLocation}>London, Canada</Text>
        </View>

        {/* Feature Cards */}
        <View style={styles.featureCards}>
          <FeatureCard
            title="Past trips"
            subtitle="NEW"
            icon="🧳"
            onPress={() => {}}
          />
          <FeatureCard
            title="Connections"
            subtitle="NEW"
            icon="👥"
            onPress={() => {}}
          />
        </View>

        {/* Become a Host Card */}
        <View style={styles.hostCard}>
          <View style={styles.hostIcon}>
            <Text style={styles.hostEmoji}>🏠</Text>
          </View>
          <View style={styles.hostContent}>
            <Text style={styles.hostTitle}>Become a host</Text>
            <Text style={styles.hostSubtitle}>
              It's easy to start hosting and earn extra income.
            </Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <MenuItem 
            icon="settings-outline" 
            title="Account settings" 
            showBadge
            showBorder
            onPress={() => {}}
          />
          <MenuItem 
            icon="help-circle-outline" 
            title="Get help" 
            showBorder
            onPress={() => {}}
          />
          <MenuItem 
            icon="person-outline" 
            title="View profile" 
            showBorder
            onPress={() => {}}
          />
          <MenuItem 
            icon="hand-left-outline" 
            title="Privacy" 
            showBorder
            onPress={() => {}}
          />
          
          {/* Section Divider */}
          <View style={styles.sectionDivider} />
          
          <MenuItem 
            icon="people-outline" 
            title="Refer a host" 
            onPress={() => {}}
          />
          <MenuItem 
            icon="person-add-outline" 
            title="Find a co-host" 
            onPress={() => {}}
          />
          <MenuItem 
            icon="gift-outline" 
            title="Gift cards" 
            onPress={() => {}}
          />
          <MenuItem 
            icon="document-text-outline" 
            title="Legal" 
            onPress={() => {}}
          />
          <MenuItem 
            icon="log-out-outline" 
            title="Log out" 
            hideChevron
            onPress={handleSignOut}
          />
        </View>
      </ScrollView>

      {/* Fixed Switch to Hosting Button */}
      <View style={styles.bottomButton}>
        <Pressable style={styles.hostingButton}>
          <Ionicons name="swap-vertical" size={20} color="white" />
          <Text style={styles.hostingButtonText}>Switch to hosting</Text>
        </Pressable>
      </View>

    </SafeAreaView>
  );
}

// Feature Card Component
function FeatureCard({ title, subtitle, icon, onPress }: {
  title: string;
  subtitle?: string;
  icon: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.featureCard} onPress={onPress}>
      {subtitle && (
        <View style={styles.newBadge}>
          <Text style={styles.newBadgeText}>{subtitle}</Text>
        </View>
      )}
      <Text style={styles.featureIcon}>{icon}</Text>
      <Text style={styles.featureTitle}>{title}</Text>
    </Pressable>
  );
}

// Menu Item Component
function MenuItem({ icon, title, showBadge, showBorder, hideChevron, onPress }: {
  icon: string;
  title: string;
  showBadge?: boolean;
  showBorder?: boolean;
  hideChevron?: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable 
      style={[
        styles.menuItem,
      ]} 
      onPress={onPress}
    >
      <View style={styles.menuItemLeft}>
        <Ionicons name={icon as any} size={24} color="#000" />
        <Text style={styles.menuItemTitle}>{title}</Text>
        {showBadge && <View style={styles.redBadge} />}
      </View>
      {!hideChevron && (
        <Ionicons name="chevron-forward" size={20} color="#999" />
      )}
    </Pressable>
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
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  headerSignedOut: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f7f7f7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: '#000',
    marginHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 32,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  profileCard: {
    backgroundColor: '#fff',
    marginHorizontal: 24,
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e5e5e5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  userLocation: {
    fontSize: 16,
    color: '#666',
  },
  featureCards: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 24,
  },
  featureCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  newBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#4A90E2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  newBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  featureIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },
  hostCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 24,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  hostIcon: {
    marginRight: 16,
  },
  hostEmoji: {
    fontSize: 32,
  },
  hostContent: {
    flex: 1,
  },
  hostTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  hostSubtitle: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  menuSection: {
    paddingHorizontal: 24,
    marginBottom: 120, // Space for bottom button
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  menuItemWithBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    color: '#000',
    marginLeft: 16,
    fontWeight: '500',
  },
  redBadge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF385C',
    marginLeft: 8,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 16,
  },
  bottomButton: {
    position: 'absolute',
    bottom: 100, // Above tab bar
    left: 24,
    right: 24,
  },
  hostingButton: {
    backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 40,
    gap: 8,
  },
  hostingButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  // Notifications screen styles
  notificationsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f7f7f7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationsContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  notificationsEmptyState: {
    alignItems: 'center',
    maxWidth: 300,
  },
  noNotificationsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 24,
    marginBottom: 12,
  },
  noNotificationsSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
});