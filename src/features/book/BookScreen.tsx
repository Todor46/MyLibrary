import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View } from 'react-native';
import { RootStackParamList } from '../../core/navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Book'>;

const BookScreen = ({ route }: Props) => {
  const { id } = route.params;

  return (
    <View>
      <Text>Book {id}</Text>
    </View>
  );
};

export default BookScreen;
