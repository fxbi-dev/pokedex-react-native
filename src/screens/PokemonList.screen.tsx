import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useCallback } from 'react';
import { FlatList } from 'react-native';
import { Divider } from 'react-native-paper';
import PokemonRowComponent from '../components/PokemonList/PokemonRow.component';
import capitalize from '../utils/capitalize';
import { axiosInstance as pokeApi, BASE_URL } from '../utils/pokeapiClient';
import { RootParamList, Screens as S } from './Constants';

let isUpdating = false;

const StartScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>()

  const goToDetails = (name: string) => {
    navigation.push(S.PokemonDetails, { name, title: capitalize(name)})
  }
  
  const [pokemon, setPokemon] = useState<any[]>([]);
  const [nextPageUrl, setNextPageUrl] = useState<string>(`${BASE_URL}/pokemon`);

  const nextPage = useCallback(async () => {
    if (!isUpdating) {
      isUpdating = true;
      const result = await pokeApi.get(nextPageUrl);
      setNextPageUrl(result.data.next)
      setPokemon(pokemon => pokemon.concat(result.data.results))
      isUpdating = false;
    } else {
      // A throtle if it is loading too fast
      console.warn('Already updating')
    }
  }, [nextPageUrl])

  useEffect(() => {
    if (!pokemon.length && pokeApi) {
      nextPage()
    }
  }, [pokeApi, pokemon])

  return (
    <FlatList
      data={pokemon}
      renderItem={({ item }) => ( <PokemonRowComponent {...item} onPress={goToDetails} /> )}
      keyExtractor={item => item.name}
      onEndReached={nextPage}
      onEndReachedThreshold={0.1}
      ItemSeparatorComponent={Divider}
    />
  );
}

export default StartScreen
