import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/Home/Home';
import FavoritesScreen from './screens/Favorites/Favorites';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Peliculas">
        <Stack.Screen name="Peliculas" component={HomeScreen} />
        <Stack.Screen name="Favoritos" component={FavoritesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
