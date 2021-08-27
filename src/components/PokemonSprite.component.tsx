import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { Image } from 'react-native'
import { Avatar } from 'react-native-paper'
import { axiosInstance as pokeApi } from '../utils/pokeapiClient'

const styles = StyleSheet.create({
  cancel: {
    backgroundColor: 'transparent'
  }
})

type Props = {
  name?: string,
  gender: 'default' | 'female',
  shiny: boolean,
  orientation: 'front' | 'back',
  size: number | string
}

const resolveSpriteKey = (keyProps: Omit<Omit<Props, 'name'>, 'size'>) => {
  return `${keyProps.orientation}_${keyProps.shiny ? 'shiny_' : ''}${keyProps.gender}`
}

const PokemonSpriteComponent: React.FC<Props> = (props) => {
  const [spriteUrl, setSpriteUrl] = useState<any>(null);

  useEffect(() => {
    if (props.name) {
      const run = async () => {
        const pokemon = await pokeApi.get(`https://pokeapi.co/api/v2/pokemon/${props.name}`)
  
        setSpriteUrl(pokemon.data.sprites[resolveSpriteKey(props)])
      };
  
      run();
    } else {
      setSpriteUrl(null)
    }
  }, [props])

  if (!spriteUrl) {
    return (
      <Avatar.Icon
        style={styles.cancel}
        color={'lightgray'}
        size={Number(props.size || 24)}
        icon="cancel"
      />
    )
  } else {
    return (
      <Image
        style={{
          aspectRatio: 1,
          height: props.size,
        }}
        source={{
          uri: spriteUrl
        }}
      />
    )
  }

}

export default PokemonSpriteComponent;