import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, View } from 'react-native';
import { RootParamList, Screens as S } from './Constants';
import { axiosInstance as pokeApi, BASE_URL } from '../utils/pokeapiClient'
import Title from '../components/PaddedTitle.component';

import PokemonSpriteCarouselComponent from '../components/PokemonDetails/PokemonSpriteCarousel.component';
import PokemonStatsComponent from '../components/PokemonDetails/PokemonStats.component';
import EvolutionChainComponent from '../components/PokemonDetails/EvolutionChain.component';
import { StyleSheet } from 'react-native';

const scrollView = React.createRef<ScrollView>();

const styles = StyleSheet.create({
  footer: {
    paddingBottom: 16
  }
})

const PokemonDetailsScreen: React.FC = () => {
  const route = useRoute<RouteProp<RootParamList, typeof S.PokemonDetails>>()
  const navigation = useNavigation<NavigationProp<RootParamList, typeof S.PokemonDetails>>()
  const [pokemon, setPokemon] = useState<any>(null)
  const [species, setSpecies] = useState<any>(null)

  useEffect(() => {
    async function run() {
      const pokemonResponse = await pokeApi.get(`${BASE_URL}/pokemon/${route.params.name}`)
      setPokemon(pokemonResponse.data);

      const speciesResponse = await pokeApi.get(pokemonResponse.data.species.url)
      setSpecies(speciesResponse.data);
    }

    run()
  }, [route.params.name])

  useEffect(() => {
    if (species) {
      navigation.setParams({
        title: species.names.find((name: any) => name.language.name === 'en').name
      })
    }
  }, [species])

  return (
    <ScrollView ref={scrollView}>
      <View style={styles.footer}>
        <Title>Retro Gallery</Title>
        <PokemonSpriteCarouselComponent sprites={pokemon?.sprites || {}}/>
        <Title>PokeStats</Title>
        <PokemonStatsComponent
          stats={pokemon?.stats || []}
          types={pokemon?.types || []}
          onTypePressed={(type) => {
            navigation.navigate(S.PokemonTypeDetails, {
              name: type,
              title: type,
            })
          }}
        />
        <Title>Evolution Chain</Title>
        <EvolutionChainComponent
          evolutionChain={species?.evolution_chain}
          currentPokemon={pokemon?.name}
          loading={!!species && !!pokemon}
          onEvolutionPressed={(pokemon) => {
            scrollView.current?.scrollTo({y: 0, animated: true});
            navigation.navigate(S.PokemonDetails, {
              name: pokemon.name,
              title: pokemon.name,
            })
          }}
        />
      </View>
    </ScrollView>
  );
}

export default PokemonDetailsScreen
