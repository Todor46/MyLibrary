import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Surface, Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Book } from '../schemas/BookSchema';

const BookItem = ({
  book: { title, author, genre, _id, read },
}: {
  book: Book;
}) => {
  const { navigate } = useNavigation<NativeStackNavigationProp<any, any>>();

  return (
    <Surface style={style.container}>
      <TouchableOpacity onPress={() => navigate('Book', { _id })}>
        <>
          <View style={style.row}>
            <Title style={style.title}>{title}</Title>
            {read ? (
              <Icon style={style.iconRead} name="check-circle-outline" />
            ) : (
              <Icon style={style.iconUnread} name="information-outline" />
            )}
          </View>
          <View style={style.row}>
            <Text style={style.author}>{author}</Text>
            <Text style={style.genre}>{genre}</Text>
          </View>
        </>
      </TouchableOpacity>
    </Surface>
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
    elevation: 4,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    fontWeight: '600',
  },
  author: {
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  genre: {
    fontSize: 12,
  },
  iconRead: {
    color: 'green',
    fontSize: 20,
  },
  iconUnread: {
    color: 'red',
    fontSize: 20,
  },
});
