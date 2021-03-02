import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { useSelector } from "react-redux";
import { ColorSchemeName } from 'react-native';
import LoginScreen from '../screens/LoginScreen';
import { RootStackParamList } from '../../types';
import MainScreen from '../screens/MainScreen';
import { api, userPreferences } from "../ducks";

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  const token = useSelector(api.selectors.getToken) 
  const address = useSelector(userPreferences.selectors.getServerAddress)
  const hasLoggedIn = token && address
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {hasLoggedIn ? (
        <Stack.Screen name="Main" component={MainScreen} />
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
}
