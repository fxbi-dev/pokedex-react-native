import React, { useState, useEffect, memo } from 'react'
import { axiosInstance as pokeApi } from '../../utils/pokeapiClient'

import { StyleSheet, View, Image } from 'react-native'
import { Text, TouchableRipple } from 'react-native-paper'
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import capitalize from '../../utils/capitalize'
import { useCallback } from 'react'
import { RootParamList, Screens as S } from '../../screens/Constants'
import PokemonTypeBadge, { PokemonTypesType } from '../PokemonTypeBadge.component'
import PokemonSpriteComponent from '../PokemonSprite.component'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nameWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sprite: {
    height: 75,
    width: 75
  },
  typesWrapper: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  type: {
    height: 30,
    width: 30,
  }
})

type Props = {
  url: string,
  name: string,
  onPress?: (name: string) => void
}

const PokemonRowComponent: React.FC<Props> = ({ url, name, onPress }) => {
  const [pokemonDetails, setPokemonDetails] = useState<any>(null);

  useEffect(() => {
    const run = async () => {
      const pokemonDetails = await pokeApi.get(url);

      setPokemonDetails(pokemonDetails.data)
    }

    run();
  }, [])


  return (
    <TouchableRipple
      onPress={() => onPress?.(pokemonDetails?.name)}
    >
      <View style={styles.row}>
        <View style={styles.nameWrapper}>
          <PokemonSpriteComponent
            name={pokemonDetails?.name}
            gender="default"
            shiny={false}
            orientation="front"
            size={75}
          />
          <Text>{capitalize(name)}</Text>
        </View>
        <View style={styles.typesWrapper}>
          {
            (pokemonDetails?.types || []).map((typeEntry: any) => (
              <PokemonTypeBadge
                key={typeEntry.type.name}
                type={typeEntry.type.name}
                size={30}
              />
            ))
          }
        </View>
      </View>
    </TouchableRipple>
  ) 

}

export default memo(PokemonRowComponent);