// components/PropertyPolicies.tsx
import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '../text';

interface PropertyPoliciesProps {
  onAvailabilityPress?: () => void;
  onCancellationPress?: () => void;
  onHouseRulesPress?: () => void;
  onSafetyPress?: () => void;
  onReportPress?: () => void;
}

export default function PropertyPolicies({
  onAvailabilityPress,
  onCancellationPress,
  onHouseRulesPress,
  onSafetyPress,
  onReportPress,
}: PropertyPoliciesProps) {
  
  return (
    <View style={styles.policiesSection}>
      {/* Availability */}
      <Pressable style={styles.policyItem} onPress={onAvailabilityPress}>
        <View style={styles.policyContent}>
          <Text style={styles.policyTitle}>Availability</Text>
          <Text style={styles.policySubtitle}>Oct 24 – 26</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#6B7280" />
      </Pressable>

      {/* Cancellation Policy */}
      <View style={styles.policyItem}>
        <View style={styles.policyContent}>
          <Text style={styles.policyTitle}>Cancellation policy</Text>
          <Text style={styles.policyDescription}>
            Free cancellation before Oct 19. Cancel before check-in on Oct 24 for a partial refund.
          </Text>
          <Text style={styles.policySubtitle}>
            Review this Host&apos;s full policy for details.
          </Text>
        </View>
        <Pressable onPress={onCancellationPress}>
          <Ionicons name="chevron-forward" size={20} color="#6B7280" />
        </Pressable>
      </View>

      {/* House Rules */}
      <View style={styles.policyItem}>
        <View style={styles.policyContent}>
          <Text style={styles.policyTitle}>House rules</Text>
          <View style={styles.rulesList}>
            <Text style={styles.ruleText}>Check-in after 4:00 p.m.</Text>
            <Text style={styles.ruleText}>Checkout before 11:00 a.m.</Text>
            <Text style={styles.ruleText}>6 guests maximum</Text>
          </View>
          <Pressable style={styles.showMoreButton} onPress={onHouseRulesPress}>
            <Text style={styles.showMoreText}>Show more</Text>
          </Pressable>
        </View>
      </View>

      {/* Safety & Property */}
      <View style={styles.policyItem}>
        <View style={styles.policyContent}>
          <Text style={styles.policyTitle}>Safety & property</Text>
          <View style={styles.safetyList}>
            <Text style={styles.safetyText}>Exterior security cameras on property</Text>
            <Text style={styles.safetyText}>Nearby lake, river, other body of water</Text>
            <Text style={styles.safetyText}>Carbon monoxide alarm</Text>
          </View>
          <Pressable style={styles.showMoreButton} onPress={onSafetyPress}>
            <Text style={styles.showMoreText}>Show more</Text>
          </Pressable>
        </View>
      </View>

      {/* Report Listing */}
      <Pressable style={styles.reportItem} onPress={onReportPress}>
        <Ionicons name="flag-outline" size={20} color="#000" />
        <Text style={styles.reportText}>Report this listing</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  policiesSection: {
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  policyItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  policyContent: {
    flex: 1,
    paddingRight: 16,
  },
  policyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  policySubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  policyDescription: {
    fontSize: 14,
    color: '#000',
    lineHeight: 22,
    marginBottom: 8,
  },
  rulesList: {
    marginBottom: 12,
  },
  ruleText: {
    fontSize: 16,
    color: '#000',
    marginBottom: 4,
  },
  safetyList: {
    marginBottom: 12,
  },
  safetyText: {
    fontSize: 16,
    color: '#000',
    marginBottom: 4,
  },
  showMoreButton: {
    alignSelf: 'flex-start',
  },
  showMoreText: {
    fontSize: 16,
    color: '#000',
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
  reportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  reportText: {
    fontSize: 16,
    color: '#000',
    marginLeft: 12,
    textDecorationLine: 'underline',
  },
});