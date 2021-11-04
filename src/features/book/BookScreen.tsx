import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import useBooks from '../../core/hooks/useBooks';
import { RootStackParamList } from '../../core/navigation/RootNavigator';
import { Book } from '../../core/schemas/BookSchema';

type Props = NativeStackScreenProps<RootStackParamList, 'Book'>;

const BookScreen = ({ route }: Props) => {
  const [book, setBook] = useState<Book | undefined>();
  const { _id } = route.params;
  const { books } = useBooks();

  useEffect(() => {
    setBook(books.find((b) => b._id === _id));
  }, [books, _id]);

  return (
    <View>
      <Text>Book {_id}</Text>
      <Text>{JSON.stringify(book, null, 2)}</Text>
    </View>
  );
};

export default BookScreen;
