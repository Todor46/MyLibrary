import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Dialog, IconButton, Title } from 'react-native-paper';
import Snackbar from 'react-native-snackbar';
import useBooks from '../../core/hooks/useBooks';
import realm from '../../core/lib/realm';
import { RootStackParamList } from '../../core/navigation/RootNavigator';
import { Book } from '../../core/schemas/BookSchema';

type Props = NativeStackScreenProps<RootStackParamList, 'Book'>;

const BookScreen = ({ route, navigation }: Props) => {
  const [deleteDialog, setDeleteDialog] = useState<boolean>(false);
  const { _id } = route.params;
  const { books } = useBooks();
  const book = books.find((b) => b._id === _id) as Book;
  const bookTitle = useRef(book.title);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: book?.title,
      headerRight: () => (
        <View style={style.icons}>
          <IconButton icon="circle-edit-outline" onPress={() => handleEdit()} />
          <IconButton
            icon="trash-can-outline"
            onPress={() => setDeleteDialog(true)}
          />
        </View>
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEdit = () => {
    navigation.navigate('EditBook', { _id: book._id });
  };

  const handleDelete = () => {
    realm.write(() => {
      realm.delete(book);
    });
    Snackbar.show({
      text: `${bookTitle.current} deleted!`,
      duration: 3000,
    });
    navigation.navigate('Home');
  };

  return (
    <>
      <View style={style.container}>
        <Title style={style.title}>{book?.title}</Title>
        {!!book?.author && <Text>By {book?.author}</Text>}
        <Text>Read? {book?.read ? 'Yes :)' : 'No :('}</Text>
        {!!book.genre && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Genre', { genre: book?.genre })
            }>
            <Text style={style.genre}>{book?.genre}</Text>
          </TouchableOpacity>
        )}
      </View>
      <Dialog visible={deleteDialog} onDismiss={() => setDeleteDialog(false)}>
        <Dialog.Title>Deleting {book?.title}</Dialog.Title>
        <Dialog.Content>
          <Text> Are you sure you want to delete {book?.title}?</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setDeleteDialog(false)}>Canel</Button>
          <Button onPress={() => handleDelete()}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </>
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
