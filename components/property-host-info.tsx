// components/PropertyHostInfo.tsx
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text } from './text';

interface Host {
  name: string;
  avatar: string;
  badge: string;
  experience: string;
}

interface PropertyHostInfoProps {
  host: Host;
}

export default function PropertyHostInfo({ host }: PropertyHostInfoProps) {
  return (
    <View style={styles.hostSection}>
      <View style={styles.hostInfo}>
        <Image source={{ uri: host.avatar }} style={styles.hostAvatar} />
        <View style={styles.hostDetails}>
          <Text style={styles.hostName}>Stay with {host.name}</Text>
          <Text style={styles.hostMeta}>{host.badge} · {host.experience}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
});