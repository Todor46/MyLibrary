import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../features/home/HomeScreen';
import BookScreen from '../../features/book/BookScreen';
import NewBookScreen from '../../features/newBook/NewBookScreen';
import GenreScreen from '../../features/genre/GenreScreen';
import EditBookScreen from '../../features/editBook/EditBookScreen';

export type RootStackParamList = {
  Home: undefined;
  Book: { _id: string };
  NewBook: undefined;
  EditBook: { _id: string };
  Genre: { genre: string | undefined };
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
      <Stack.Screen
        name="EditBook"
        component={EditBookScreen}
        options={{ headerTitle: 'Edit' }}
      />
      <Stack.Screen name="Genre" component={GenreScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
