import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import SplashScreen from './src/screens/SplashScreen';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import TabNavigator from './TabNavigator'; 

const Stack = createNativeStackNavigator();

const options = {
  title: '',
  headerBackTitleVisible: false,
  headerStyle: {
    backgroundColor: '#121212', 
  },
  headerTintColor: '#8D6DE5'
};

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={options}
        >
          <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} /> 
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={options}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={options}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
