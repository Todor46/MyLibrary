import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { IconButton } from 'react-native-paper';
import BookItem from '../../core/components/BookItem';
import useRealm from '../../core/hooks/useRealm';
import { RootStackParamList } from '../../core/navigation/RootNavigator';
import { Book } from '../../core/schemas/BookSchema';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: Props) => {
  const [books, setBooks] = useState<
    Realm.Results<Realm.Object> | Book[] | undefined
  >();
  const realm = useRealm();

  useEffect(() => {
    const data = realm?.objects('Book');
    setBooks(data);

    data?.addListener(() => setBooks([...data]));

    return () => data?.removeAllListeners();
  }, [realm]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="plus"
          onPress={() => navigation.navigate('NewBook')}
          hasTVPreferredFocus={undefined}
          tvParallaxProperties={undefined}
        />
      ),
    });
  }, [navigation]);

  return (
    <ScrollView style={style.container}>
      {books?.map((book) => (
        <BookItem key={book._id} book={book} />
      ))}
    </ScrollView>
  );
};

export default HomeScreen;

const style = StyleSheet.create({
  container: {
    padding: 8,
  },
});
