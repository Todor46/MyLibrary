/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './core/navigation/RootNavigator';
import { Provider as PaperProvider } from 'react-native-paper';
import realm from './core/lib/realm';
import { Book } from './core/schemas/BookSchema';
import BooksContext from './core/contexts/BooksContext';

const App = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const data = realm.objects<Book>('Book');
    setBooks([...data]);

    data.addListener(() => {
      setBooks([...data]);
    });

    return () => {
      // data.removeAllListeners();
      // realm.close();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <BooksContext.Provider value={{ books }}>
        <PaperProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </PaperProvider>
      </BooksContext.Provider>
    </SafeAreaProvider>
  );
};

export default App;
