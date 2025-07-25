// components/Text.tsx
import { Text as RNText, TextProps } from 'react-native';

export const Text = (props: TextProps) => {
  return (
    <RNText 
      {...props} 
      style={[{ fontFamily: 'figtree' }, props.style]} 
    />
  );
};

