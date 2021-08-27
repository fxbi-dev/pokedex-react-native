import React, { useEffect, useState } from 'react'
import { FlatList, ImageBackground, View } from 'react-native'
import { Text } from 'react-native-paper';
import { useWindowDimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type ParsedSprite = {
  name: string,
  uri: string
}

type PokemonSpriteCarouselComponentProps = {
  sprites: Partial<{
    "back_default": string | null
    "back_female":  string | null
    "back_shiny":  string | null
    "back_shiny_female":  string | null
    "front_default":  string | null
    "front_female":  string | null
    "front_shiny":  string | null
    "front_shiny_female":  string | null
  }>
}

const resolveSpriteName = (spriteName: string): string => {
  const resolvedNamesMap: {[key: string]: string} = {
    "back_default": 'Default - Back',
    "back_female":  'Female - Back',
    "back_shiny":  'Default - Back (Shiny)',
    "back_shiny_female":  'Female - Back (Shiny)',
    "front_default":  'Default - Front',
    "front_female": 'Female - Front',
    "front_shiny":  'Default - Front (Shiny)',
    "front_shiny_female": 'Female - Front (Shiny)',
  }

  return resolvedNamesMap[spriteName] ?? spriteName;
}

const gradient = [
  '#000A',
  '#0000',
]

const PokemonSpriteCarouselImage: React.FC<ParsedSprite> = (props) => {
  const { width, height } = useWindowDimensions()

  return (
    <LinearGradient
      style={{
        width,
        height: height / 5,
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
      colors={ gradient }
      start={{ x: 0, y: 1 }}
      end={{ x: 0, y: 0.7 }}
    >
      <ImageBackground
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
        source={{
          uri: props.uri
        }}
        resizeMode="contain"
      >
        <Text
          style={{
            color: 'white',
            textAlign: 'center'
          }}>
          {resolveSpriteName(props.name)}
        </Text>
      </ImageBackground>
    </LinearGradient>
  )
}

const PokemonSpriteCarouselComponent: React.FC<PokemonSpriteCarouselComponentProps> = (props) => {
  const [sprites, setSprites] = useState<ParsedSprite[]>([]);

  useEffect(() => {
    const filteredSprites = Object.keys(props.sprites).reduce<ParsedSprite[]>((acc, key) => {
      const typedKey = key as keyof PokemonSpriteCarouselComponentProps['sprites']

      if (typeof props.sprites[typedKey] === 'string' && props.sprites[typedKey]) {
        
        return [...acc, {
          name: key,
          uri: props.sprites[typedKey] as string
        }]
      }
      return [...acc]
    }, [])

    setSprites(filteredSprites);
  }, [props.sprites])

  return (
    <FlatList<ParsedSprite>
      horizontal
      pagingEnabled
      renderItem={({ item }) => <PokemonSpriteCarouselImage {...item} />}
      keyExtractor={item => item.name}
      data={sprites}
    />
  )
}

export default PokemonSpriteCarouselComponent