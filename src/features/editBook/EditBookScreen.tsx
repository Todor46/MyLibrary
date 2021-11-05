import { Picker } from '@react-native-picker/picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { StyleSheet, TextInput as RNTextInput, View } from 'react-native';
import { Checkbox, IconButton, Text, TextInput } from 'react-native-paper';
import { RootStackParamList } from '../../core/navigation/RootNavigator';
import 'react-native-get-random-values';
import genres from '../../core/constants/genres';
import realm from '../../core/lib/realm';
import useBooks from '../../core/hooks/useBooks';
import { Book, Genre } from '../../core/schemas/BookSchema';
import Snackbar from 'react-native-snackbar';

type Props = NativeStackScreenProps<RootStackParamList, 'EditBook'>;

interface FormData {
  title: string;
  author: string;
  genre: Genre;
  read: boolean;
}

const EditBookScreen = ({ navigation, route }: Props) => {
  const [book, setBook] = useState<Book>();
  const [formData, setFormData] = useState<FormData>({
    title: '',
    author: '',
    genre: '',
    read: false,
  });
  const { books } = useBooks();
  const { _id } = route.params;

  useEffect(() => {
    setBook(books.find((b) => b._id === _id));
    book &&
      setFormData({
        title: book.title,
        author: book.author,
        genre: book.genre,
        read: book.read,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [book]);

  const { title, author, genre, read } = formData;

  const handleChange = (type: string, value: string | boolean) => {
    setFormData({ ...formData, [type]: value });
  };

  const handleEdit = () => {
    if (!title.length && titleRef.current) {
      return titleRef.current.focus();
    }

    book &&
      realm?.write(() => {
        book.title = title;
        book.author = author;
        book.genre = genre;
        book.read = read;
      });
    Snackbar.show({
      text: 'Edit successful!',
      duration: 3000,
    });
    navigation.navigate('Home');
  };

  const titleRef = useRef<RNTextInput>(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton icon="check" onPress={() => handleEdit()} />
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleEdit]);

  return (
    <View style={style.container}>
      <View style={style.containerInner}>
        <TextInput
          label="Title"
          value={title}
          onChangeText={(text) => handleChange('title', text)}
          style={style.input}
          mode="outlined"
          ref={titleRef}
        />
        <TextInput
          label="Author"
          value={author}
          onChangeText={(text) => handleChange('author', text)}
          style={style.input}
          mode="outlined"
        />
        <Picker
          style={style.input}
          selectedValue={genre}
          onValueChange={(itemValue) => handleChange('genre', itemValue)}>
          <Picker.Item label="Genre" enabled={false} />
          {genres.map((g, idx) => (
            <Picker.Item key={idx} value={g} label={g} />
          ))}
        </Picker>
        <View style={style.checkbox}>
          <Checkbox
            status={read ? 'checked' : 'unchecked'}
            onPress={() => handleChange('read', !read)}
          />
          <Text>Read</Text>
        </View>
      </View>
    </View>
  );
};

export default EditBookScreen;

const style = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    height: '100%',
  },
  containerInner: {
    flexGrow: 1,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    bottom: 10,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
