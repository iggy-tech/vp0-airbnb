import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';


export default function TabLayout() {

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
          tabBarIcon: ({  focused }) => (
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
          title: 'Log in',
          tabBarIcon: ({ color, focused }) => (
            <SimpleLineIcons 
              size={24} 
              name="user" 
              color={focused ? '#FF385C' : '#6B7280'} 
            />
          ),
        }}
      />
    </Tabs>
  );
}