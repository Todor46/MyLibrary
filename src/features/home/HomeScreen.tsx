import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { setListener } from 'appcenter-crashes';
import React, { useLayoutEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import MaterialTabs from 'react-native-material-tabs';
import { IconButton } from 'react-native-paper';
import BookItem from '../../core/components/BookItem';
import useBooks from '../../core/hooks/useBooks';
import { RootStackParamList } from '../../core/navigation/RootNavigator';
import { Book } from '../../core/schemas/BookSchema';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: Props) => {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const { books } = useBooks();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="plus"
          onPress={() => navigation.navigate('NewBook')}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={style.container}>
      <MaterialTabs
        items={['All', 'Unread']}
        selectedIndex={selectedTab}
        onChange={setSelectedTab}
      />
      <FlatList
        data={selectedTab === 0 ? books : books.filter((book) => !book.read)}
        keyExtractor={(book) => book._id}
        renderItem={renderItem}
        style={style.list}
      />
    </View>
  );
};

const renderItem = ({ item }: { item: Book }) => {
  return <BookItem book={item} />;
};

const style = StyleSheet.create({
  list: {
    padding: 8,
  },
  container: {
    flex: 1,
  },
});

export default HomeScreen;
export { renderItem };
