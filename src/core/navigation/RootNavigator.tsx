import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../features/home/HomeScreen';
import BookScreen from '../../features/book/BookScreen';
import NewBookScreen from '../../features/newBook/NewBookScreen';

export type RootStackParamList = {
  Home: undefined;
  Book: { _id: string };
  NewBook: undefined;
};

const RootNavigator = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Book" component={BookScreen} />
      <Stack.Screen
        name="NewBook"
        component={NewBookScreen}
        options={{ headerTitle: 'New Book' }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
