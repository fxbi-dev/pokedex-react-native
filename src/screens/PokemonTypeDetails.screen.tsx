import { useNavigation, NavigationProp, RouteProp, useRoute } from '@react-navigation/native'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { FlatList, ScrollView, StyleSheet, View } from 'react-native'
import PaddedTitle from '../components/PaddedTitle.component'
import PokemonTypeBadgeComponent, { PokemonTypesType } from '../components/PokemonTypeBadge.component'
import { RootParamList, Screens as S } from './Constants'
import { axiosInstance as pokeApi, BASE_URL } from '../utils/pokeapiClient'
import capitalize from '../utils/capitalize'
import PokemonRowComponent from '../components/PokemonList/PokemonRow.component'
import { Divider } from 'react-native-paper'
import DamageRelationsComponent from '../components/PokemonTypeDetails/DamageRelations.component'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useCallback } from 'react'

const styles = StyleSheet.create({
  badgeContainer: {
    alignItems: 'center',
    width: '100%',
  }
})


const PokemonTypeDetailsScreen: React.FC = () => {
  const route = useRoute<RouteProp<RootParamList, typeof S.PokemonTypeDetails>>()
  const navigation = useNavigation<NativeStackNavigationProp<RootParamList, typeof S.PokemonTypeDetails>>()

  const [pokeType, setPokeType] = useState<any>(null)

  const handleTypePressed = useCallback((type: PokemonTypesType) => {
    navigation.push(S.PokemonTypeDetails, {
      name: type,
      title: type,
    })
  }, [])

  const handlePokemonPressed = useCallback((pokemon: string) => {
    navigation.push(S.PokemonDetails, { name: pokemon, title: capitalize(pokemon)})
  }, [])

  useEffect(() => {
    const run = async () => {
      const pokeTypeResponse = await pokeApi.get(`${BASE_URL}/type/${route.params.name}`);

      setPokeType(pokeTypeResponse.data);
      navigation.setParams({
        title: pokeTypeResponse.data.names.find((name: any) => name.language.name === 'en').name
      })
    }

    run();
  }, [route.params.name])

  return (
    <ScrollView>
      <PaddedTitle>Badge</PaddedTitle>
      <View style={styles.badgeContainer}>
        <PokemonTypeBadgeComponent type={route.params.name as PokemonTypesType} size={120}/>
      </View>
      <PaddedTitle>Damage Relations</PaddedTitle>
      <DamageRelationsComponent
        damageRelations={pokeType?.damage_relations || {}}
        onTypePressed={handleTypePressed}
      /> 
      <PaddedTitle>{capitalize(route.params.name)} Type Pokemon</PaddedTitle>
      <View>
        {
          pokeType?.pokemon.map((item: any) => (
            <React.Fragment key={item.pokemon.name}>
              <PokemonRowComponent {...item.pokemon} onPress={handlePokemonPressed}/>
              <Divider />
            </React.Fragment>
          ))
        }
      </View>
    </ScrollView>
  )
}

export default PokemonTypeDetailsScreen