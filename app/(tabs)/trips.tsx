import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Image,
  ScrollView,
} from 'react-native';
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

// Sample trip data (when logged in)
const upcomingTrips = [
  {
    id: 1,
    destination: 'Modern Loft in Downtown',
    location: 'Toronto, Ontario',
    dates: 'Dec 15 - 18, 2024',
    status: 'confirmed',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=200&h=200&fit=crop',
    hostName: 'Sarah',
    checkIn: '3:00 PM',
    checkOut: '11:00 AM',
  },
];

const pastTrips = [
  {
    id: 2,
    destination: 'Cozy Cabin Retreat',
    location: 'Muskoka, Ontario',
    dates: 'Sep 22 - 25, 2024',
    status: 'completed',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=200&h=200&fit=crop',
    hostName: 'Michael',
    rating: 5,
  },
  {
    id: 3,
    destination: 'Beachfront Villa',
    location: 'Prince Edward County, Ontario',
    dates: 'Aug 10 - 14, 2024',
    status: 'completed',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=200&h=200&fit=crop',
    hostName: 'Emma',
    rating: 4,
  },
];

export default function TripsScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'past'>('upcoming');

  useEffect(() => {
    // Check initial auth status
    const checkAuthStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user
        ? {
            id: session.user.id,
            email: session.user.email ?? '',
            user_metadata: {
              full_name: session.user.user_metadata?.full_name,
              avatar_url: session.user.user_metadata?.avatar_url,
              name: session.user.user_metadata?.name,
              picture: session.user.user_metadata?.picture,
            },
          }
        : null
      );
      setIsLoading(false);
    };

    checkAuthStatus();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user
        ? {
            id: session.user.id,
            email: session.user.email ?? '',
            user_metadata: {
              full_name: session.user.user_metadata?.full_name,
              avatar_url: session.user.user_metadata?.avatar_url,
              name: session.user.user_metadata?.name,
              picture: session.user.user_metadata?.picture,
            },
          }
        : null
      );
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
          <Text style={styles.title}>Trips</Text>
        </View>

        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyTitle}>No trips yet</Text>
          <Text style={styles.emptySubtitle}>
            When you&apos;re ready to plan your next trip, we&apos;re here to help.
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

  // Signed In State - Show Trips Content
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Trips</Text>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <Pressable
          style={[styles.tab, selectedTab === 'upcoming' && styles.activeTab]}
          onPress={() => setSelectedTab('upcoming')}
        >
          <Text style={[styles.tabText, selectedTab === 'upcoming' && styles.activeTabText]}>
            Upcoming
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, selectedTab === 'past' && styles.activeTab]}
          onPress={() => setSelectedTab('past')}
        >
          <Text style={[styles.tabText, selectedTab === 'past' && styles.activeTabText]}>
            Past
          </Text>
        </Pressable>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {selectedTab === 'upcoming' ? (
          <View style={styles.tripsSection}>
            {upcomingTrips.length > 0 ? (
              upcomingTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} type="upcoming" />
              ))
            ) : (
              <View style={styles.noTripsContainer}>
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
            )}
          </View>
        ) : (
          <View style={styles.tripsSection}>
            {pastTrips.map((trip) => (
              <TripCard key={trip.id} trip={trip} type="past" />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// Trip Card Component
function TripCard({ trip, type }: { trip: any; type: 'upcoming' | 'past' }) {
  return (
    <Pressable style={styles.tripCard}>
      <Image source={{ uri: trip.image }} style={styles.tripImage} />
      <View style={styles.tripInfo}>
        <View style={styles.tripHeader}>
          <Text style={styles.tripDestination}>{trip.destination}</Text>
          {type === 'upcoming' && (
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Confirmed</Text>
            </View>
          )}
        </View>
        
        <Text style={styles.tripLocation}>{trip.location}</Text>
        <Text style={styles.tripDates}>{trip.dates}</Text>
        
        {type === 'upcoming' ? (
          <View style={styles.tripDetails}>
            <Text style={styles.hostInfo}>Hosted by {trip.hostName}</Text>
            <Text style={styles.checkInInfo}>Check-in: {trip.checkIn}</Text>
          </View>
        ) : (
          <View style={styles.tripDetails}>
            <Text style={styles.hostInfo}>Hosted by {trip.hostName}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>Your rating: </Text>
              {[...Array(5)].map((_, i) => (
                <Text key={i} style={[styles.star, i < trip.rating && styles.starFilled]}>★</Text>
              ))}
            </View>
          </View>
        )}

        {type === 'upcoming' && (
          <View style={styles.actionButtons}>
            <Pressable style={styles.actionButton}>
              <Text style={styles.actionButtonText}>View details</Text>
            </Pressable>
            <Pressable style={[styles.actionButton, styles.secondaryButton]}>
              <Text style={[styles.actionButtonText, styles.secondaryButtonText]}>Message host</Text>
            </Pressable>
          </View>
        )}
      </View>
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

  // Tab Navigation
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tab: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    marginRight: 24,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#000',
    fontWeight: '600',
  },

  // Content
  content: {
    flex: 1,
  },
  tripsSection: {
    padding: 24,
  },

  // No Trips Illustration
  noTripsContainer: {
    alignItems: 'center',
    paddingVertical: 40,
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

  // Trip Cards
  tripCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  tripImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#f0f0f0',
  },
  tripInfo: {
    padding: 16,
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  tripDestination: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: '#2E7D32',
    fontWeight: '600',
  },
  tripLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  tripDates: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  tripDetails: {
    marginBottom: 16,
  },
  hostInfo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  checkInInfo: {
    fontSize: 14,
    color: '#666',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#666',
    marginRight: 4,
  },
  star: {
    fontSize: 16,
    color: '#ddd',
    marginRight: 2,
  },
  starFilled: {
    color: '#FFD700',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#000',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#000',
  },
});