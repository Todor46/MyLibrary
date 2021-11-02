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
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './core/navigation/RootNavigator';
import { Provider as PaperProvider } from 'react-native-paper';
import Realm from 'realm';
import { BookSchema } from './core/schemas/BookSchema';
import RealmProvider from './core/providers/RealmProvider';

const App = () => {
  const realm = new Realm({ schema: [BookSchema] });

  return (
    <SafeAreaProvider>
      <RealmProvider realm={realm}>
        <PaperProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </PaperProvider>
      </RealmProvider>
    </SafeAreaProvider>
  );
};

export default App;
