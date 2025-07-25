import { Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { supabase } from '@/lib/supabase';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';

export default function TabLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check initial auth status
    const checkAuthStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };

    checkAuthStatus();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FF385C', // Airbnb red
        tabBarInactiveTintColor: '#6B7280', // Gray
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            backgroundColor: 'white',
            borderTopWidth: 1,
            borderTopColor: '#E5E7EB',
          },
          default: {
            backgroundColor: 'white',
            borderTopWidth: 1,
            borderTopColor: '#E5E7EB',
          },
        }),
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '500',
          marginTop: 4,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <SimpleLineIcons 
              size={24} 
              name="magnifier" 
              color={focused ? '#FF385C' : '#6B7280'} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="wishlists"
        options={{
          title: 'Wishlists',
          tabBarIcon: ({ color, focused }) => (
            <SimpleLineIcons 
              size={24} 
              name="heart" 
              color={focused ? '#FF385C' : '#6B7280'} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="trips"
        options={{
          title: 'Trips',
          tabBarIcon: ({ color, focused }) => (
            <SimpleLineIcons 
              size={24} 
              name="location-pin" 
              color={focused ? '#FF385C' : '#6B7280'} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Messages',
          tabBarIcon: ({ focused }) => (
            <SimpleLineIcons 
              size={24} 
              name="bubble" 
              color={focused ? '#FF385C' : '#6B7280'} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: isAuthenticated ? 'Profile' : 'Log in',
          tabBarIcon: ({ color, focused }) => (
            <SimpleLineIcons 
              size={24} 
              name={isAuthenticated ? 'user' : 'user'}
              color={focused ? '#FF385C' : '#6B7280'} 
            />
          ),
        }}
      />
    </Tabs>
  );
}