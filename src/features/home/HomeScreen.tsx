import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { IconButton } from 'react-native-paper';
import useRealm from '../../core/hooks/useRealm';
import { RootStackParamList } from '../../core/navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: Props) => {
  const [books, setBooks] = useState<
    Realm.Results<Realm.Object> | Object[] | undefined
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
    <ScrollView>
      <Text>Hello</Text>
      <Text>{JSON.stringify(books, null, 2)}</Text>
    </ScrollView>
  );
};

export default HomeScreen;
