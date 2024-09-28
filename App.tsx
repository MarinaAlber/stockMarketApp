import React, {useEffect} from 'react';

import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';

import SplashScreen from 'react-native-splash-screen';
import {StocksList} from './src/components/StocksList';
import {BaseSpace, DarkTheme} from './src/theme';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="#fff"
      />
      <View style={styles.header}>
        <Image source={require('./src/assets/logo.png')} style={styles.logo} />
      </View>
      <StocksList />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DarkTheme.primaryColor_600,
    color: DarkTheme.secondaryColor,
  },
  header: {
    backgroundColor: DarkTheme.primaryColor_600,
    height: 60,
    padding: BaseSpace.lg as number,
    alignContent: 'center',
    justifyContent: 'flex-start',
  },
  logo: {
    height: 25,
    width: '25%',
  },
});

export default App;
