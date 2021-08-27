import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import { RootParamList, Screens as S } from './screens/Constants'
import PokemonList from './screens/PokemonList.screen';
import { StatusBar } from 'react-native';
import PokemonDetailsScreen from './screens/PokemonDetails.screen';
import HeaderComponent from './components/Header.component';
import PokemonTypeDetailsScreen from './screens/PokemonTypeDetails.screen';

const Stack = createNativeStackNavigator<RootParamList>()

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#fccc02'
  }
}

const Root: React.FC = () => {

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={S.PokemonList}
          screenOptions={{
            header: HeaderComponent,
            statusBarHidden: false,
          }}

        >
          <Stack.Screen
            name={S.PokemonList}
            component={PokemonList}
            options={{
              title: 'Welcome to the Pokedex (...ish)'
            }}
          />

          <Stack.Screen
            name={S.PokemonDetails}
            component={PokemonDetailsScreen}
          />

          <Stack.Screen
            name={S.PokemonTypeDetails}
            component={PokemonTypeDetailsScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider >
  )
}

export default Root