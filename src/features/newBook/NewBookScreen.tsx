import { Picker } from '@react-native-picker/picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useRef, useState } from 'react';
import { StyleSheet, TextInput as RNTextInput, View } from 'react-native';
import { Button, Checkbox, Text, TextInput } from 'react-native-paper';
import useRealm from '../../core/hooks/useRealm';
import { RootStackParamList } from '../../core/navigation/RootNavigator';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import genres from '../../core/constants/genres';

type Props = NativeStackScreenProps<RootStackParamList, 'NewBook'>;

const NewBookScreen = ({ navigation }: Props) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    read: false,
  });

  const { title, author, genre, read } = formData;

  const handleChange = (type: string, value: string | boolean) => {
    setFormData({ ...formData, [type]: value });
  };

  const realm = useRealm();

  const handleAdd = () => {
    if (!title.length && titleRef.current) {
      return titleRef.current.focus();
    }

    const book = {
      _id: uuidv4(),
      title,
      author,
      genre,
      read,
    };
    realm?.write(() => {
      realm.create('Book', book);
    });
    navigation.navigate('Home');
  };

  const titleRef = useRef<RNTextInput>(null);

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
      <Button mode="contained" style={style.button} onPress={() => handleAdd()}>
        Add
      </Button>
    </View>
  );
};

export default NewBookScreen;

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
