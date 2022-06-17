import * as React from 'react';
import {LogBox, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import AppNavigator from './src/navigation';
//
LogBox.ignoreAllLogs();
LogBox.ignoreLogs([
  "ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types'.",
  'NativeBase: The contrast ratio of',
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
  'source.uri should not be an empty string', 'Trying to load empty source'
]);

export default function App() {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'black',
      accent: 'yellow',
    },
  };

  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="#FFF"
          translucent={true}
        />
        <AppNavigator />
      </PaperProvider>
    </NavigationContainer>
  );
}
