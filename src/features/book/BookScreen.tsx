import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import useBooks from '../../core/hooks/useBooks';
import { RootStackParamList } from '../../core/navigation/RootNavigator';
import { Book } from '../../core/schemas/BookSchema';

type Props = NativeStackScreenProps<RootStackParamList, 'Book'>;

const BookScreen = ({ route, navigation }: Props) => {
  const [book, setBook] = useState<Book | undefined>();
  const { _id } = route.params;
  const { books } = useBooks();

  useEffect(() => {
    setBook(books.find((b) => b._id === _id));
  }, [books, _id]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: book?.title,
      headerRight: () => (
        <View style={style.icons}>
          <IconButton icon="circle-edit-outline" onPress={() => handleEdit()} />
          <IconButton icon="trash-can-outline" onPress={() => handleDelete()} />
        </View>
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEdit = () => {};
  const handleDelete = () => {};

  return (
    <View style={style.container}>
      <Text style={style.title}>{book?.title}</Text>
      {!!book?.author && <Text>By {book?.author}</Text>}
      <TouchableOpacity
        onPress={() => navigation.navigate('Genre', { genre: book?.genre })}>
        <Text style={style.genre}>{book?.genre}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BookScreen;

const style = StyleSheet.create({
  icons: {
    flexDirection: 'row',
  },
  container: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  genre: {
    color: 'teal',
  },
});
