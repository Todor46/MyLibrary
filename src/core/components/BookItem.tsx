import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Book } from '../schemas/BookSchema';

const BookItem = ({ book: { title, author, genre, _id } }: { book: Book }) => {
  const { navigate } = useNavigation<NativeStackNavigationProp<any, any>>();

  return (
    <View style={style.container}>
      <TouchableOpacity onPress={() => navigate('Book', { _id })}>
        <>
          <Text style={style.title}>{title}</Text>
          <View style={style.bottom}>
            <Text style={style.author}>{author}</Text>
            <Text style={style.genre}>{genre}</Text>
          </View>
        </>
      </TouchableOpacity>
    </View>
  );
};

export default BookItem;

const style = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 4,
    marginBottom: 8,
    flexGrow: 0,
    borderColor: '#cccccc',
    borderWidth: 1,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    fontWeight: '600',
    color: '#444444',
  },
  author: {
    fontSize: 14,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genre: {
    fontSize: 12,
  },
});
