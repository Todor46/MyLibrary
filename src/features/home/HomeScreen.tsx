import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useLayoutEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import BookItem from '../../core/components/BookItem';
import useBooks from '../../core/hooks/useBooks';
import { RootStackParamList } from '../../core/navigation/RootNavigator';
import { Book } from '../../core/schemas/BookSchema';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: Props) => {
  const { books } = useBooks();

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

  const renderItem = ({ item }: { item: Book }) => {
    return <BookItem book={item} />;
  };

  return (
    <FlatList
      data={books}
      keyExtractor={(book) => book._id}
      renderItem={renderItem}
      style={style.container}
    />
  );
};

export default HomeScreen;

const style = StyleSheet.create({
  container: {
    padding: 8,
  },
});
