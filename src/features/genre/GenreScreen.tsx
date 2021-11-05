import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import useBooks from '../../core/hooks/useBooks';
import { RootStackParamList } from '../../core/navigation/RootNavigator';
import { renderItem } from '../home/HomeScreen';

type Props = NativeStackScreenProps<RootStackParamList, 'Genre'>;

const GenreScreen = ({ route, navigation }: Props) => {
  const { genre } = route.params;
  const { books } = useBooks();

  useEffect(() => {
    navigation.setOptions({ headerTitle: genre });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={s.container}>
      <FlatList
        data={books.filter((book) => book.genre === genre)}
        keyExtractor={(b) => b._id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default GenreScreen;

const s = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
