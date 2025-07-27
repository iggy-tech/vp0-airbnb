import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  FlatList,
  Pressable,
  Image,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@/components/text';

const { width: screenWidth } = Dimensions.get('window');

// Hard-coded chat messages for demo
const chatMessages = [
  {
    id: 1,
    text: "Usually",
    isHost: true,
    timestamp: "2:03 AM",
    isRead: true,
  },
  {
    id: 2,
    text: "Allison invited you to book for 1 guest on Sep 5 – 7.",
    isHost: true,
    timestamp: "2:03 AM",
    isRead: true,
    hasAction: true,
    actionText: "Complete booking"
  },
  {
    id: 3,
    text: "🌙 It's 1:32 AM for your Host.",
    isSystem: true,
    timestamp: "2:03 AM",
  },
  {
    id: 4,
    text: "Ok thanks",
    isHost: false,
    timestamp: "2:04 AM",
    isRead: false,
  },
];

export default function ChatScreen() {
  const router = useRouter();
  const { id, hostName, hostAvatar, propertyImage, details } = useLocalSearchParams();
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState(chatMessages);
  const flatListRef = useRef(null);

  useEffect(() => {
    // Scroll to bottom when component mounts
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: false });
    }, 100);
  }, []);

  const sendMessage = () => {
    if (messageText.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: messageText,
        isHost: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isRead: false,
      };
      
      setMessages([...messages, newMessage]);
      setMessageText('');
      
      // Scroll to bottom after sending message
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const renderMessage = ({ item: message }) => {
    if (message.isSystem) {
      return (
        <View style={styles.systemMessageContainer}>
          <Text style={styles.systemMessage}>{message.text}</Text>
        </View>
      );
    }

    return (
      <View style={[
        styles.messageContainer,
        message.isHost ? styles.hostMessageContainer : styles.userMessageContainer
      ]}>
        {message.isHost && (
          <Image source={{ uri: hostAvatar }} style={styles.messageAvatar} />
        )}
        
        <View style={[
          styles.messageBubble,
          message.isHost ? styles.hostMessageBubble : styles.userMessageBubble
        ]}>
          <Text style={[
            styles.messageText,
            message.isHost ? styles.hostMessageText : styles.userMessageText
          ]}>
            {message.text}
          </Text>
          
          {message.hasAction && (
            <Pressable style={styles.actionButton}>
              <Text style={styles.actionButtonText}>{message.actionText}</Text>
            </Pressable>
          )}
        </View>
        
        {!message.isHost && (
          <View style={styles.userMessageMeta}>
            <Text style={styles.messageTime}>{message.timestamp}</Text>
            {message.isRead && <Text style={styles.readIndicator}>Read</Text>}
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>
        
        <View style={styles.headerInfo}>
          <Image source={{ uri: hostAvatar }} style={styles.headerAvatar} />
          <View style={styles.headerText}>
            <Text style={styles.headerName}>{hostName}</Text>
            <Text style={styles.headerDetails}>{details}</Text>
          </View>
        </View>
        
        <Pressable style={styles.detailsButton}>
          <Text style={styles.detailsButtonText}>Details</Text>
        </Pressable>
      </View>

      {/* Messages List */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id.toString()}
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Action Button */}
      <View style={styles.actionContainer}>
        <Pressable style={styles.completeBookingButton}>
          <Text style={styles.completeBookingText}>Complete Booking</Text>
        </Pressable>
      </View>

      {/* Input Area */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputContainer}
      >
        <View style={styles.inputRow}>
          <TextInput
            style={styles.textInput}
            value={messageText}
            onChangeText={setMessageText}
            placeholder="Type a message..."
            placeholderTextColor="#999"
            multiline
            maxLength={500}
          />
          <Pressable onPress={sendMessage} style={styles.sendButton}>
            <Ionicons name="send" size={20} color="#007AFF" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  headerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  headerDetails: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  detailsButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  detailsButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  messageContainer: {
    marginVertical: 4,
  },
  hostMessageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  userMessageContainer: {
    alignItems: 'flex-end',
  },
  messageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
    marginTop: 4,
  },
  messageBubble: {
    maxWidth: screenWidth * 0.7,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  hostMessageBubble: {
    backgroundColor: '#f0f0f0',
    borderBottomLeftRadius: 4,
  },
  userMessageBubble: {
    backgroundColor: '#007AFF',
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  hostMessageText: {
    color: '#000',
  },
  userMessageText: {
    color: '#fff',
  },
  userMessageMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginRight: 8,
  },
  messageTime: {
    fontSize: 12,
    color: '#999',
    marginRight: 8,
  },
  readIndicator: {
    fontSize: 12,
    color: '#999',
  },
  systemMessageContainer: {
    alignItems: 'center',
    marginVertical: 8,
  },
  systemMessage: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  actionButton: {
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  actionButtonText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  actionContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  completeBookingButton: {
    backgroundColor: '#FF385C',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  completeBookingText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  inputContainer: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  textInput: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    marginRight: 12,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
});