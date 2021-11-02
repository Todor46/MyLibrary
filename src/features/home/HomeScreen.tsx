import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button, Text, View } from 'react-native';
import { RootStackParamList } from '../../core/navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: Props) => {
  return (
    <View>
      <Text>Hello</Text>
      <Button
        onPress={() => navigation.navigate('Book', { id: 1 })}
        title="Go to Book 1"
      />
      <Button
        onPress={() => navigation.navigate('Book', { id: 2 })}
        title="Go to Book 2"
      />
      <Button
        onPress={() => navigation.navigate('Book', { id: 3 })}
        title="Go to Book 3"
      />
    </View>
  );
};

export default HomeScreen;
