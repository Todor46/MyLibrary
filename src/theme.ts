import {
  DefaultTheme as PaperTheme,
  DarkTheme as PaperThemeDark,
} from 'react-native-paper';

import {
  DefaultTheme as NavigationTheme,
  DarkTheme as NavigationThemeDark,
} from '@react-navigation/native';

export const getPaperTheme = (isDarkMode: boolean) => {
  if (isDarkMode) {
    return {
      ...PaperThemeDark,
    };
  }
  return {
    ...PaperTheme,
  };
};

export const getNavigationTheme = (isDarkMode: boolean) => {
  if (isDarkMode) {
    return {
      ...NavigationThemeDark,
    };
  }
  return {
    ...NavigationTheme,
  };
};
