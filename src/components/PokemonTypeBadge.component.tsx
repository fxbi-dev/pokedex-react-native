import React from 'react'
import { Image } from 'react-native'

export const pokemonTypeIconUrls = {
  'bug': 'https://static.wikia.nocookie.net/pokemongo/images/7/7d/Bug.png',
  'dark': 'https://static.wikia.nocookie.net/pokemongo/images/0/0e/Dark.png',
  'dragon': 'https://static.wikia.nocookie.net/pokemongo/images/c/c7/Dragon.png',
  'electric': 'https://static.wikia.nocookie.net/pokemongo/images/2/2f/Electric.png',
  'fairy': 'https://static.wikia.nocookie.net/pokemongo/images/4/43/Fairy.png',
  'fighting': 'https://static.wikia.nocookie.net/pokemongo/images/3/30/Fighting.png',
  'fire': 'https://static.wikia.nocookie.net/pokemongo/images/3/30/Fire.png',
  'flying': 'https://static.wikia.nocookie.net/pokemongo/images/7/7f/Flying.png',
  'ghost': 'https://static.wikia.nocookie.net/pokemongo/images/a/ab/Ghost.png',
  'grass': 'https://static.wikia.nocookie.net/pokemongo/images/c/c5/Grass.png',
  'ground': 'https://static.wikia.nocookie.net/pokemongo/images/8/8f/Ground.png',
  'ice': 'https://static.wikia.nocookie.net/pokemongo/images/7/77/Ice.png',
  'normal': 'https://static.wikia.nocookie.net/pokemongo/images/f/fb/Normal.png',
  'poison': 'https://static.wikia.nocookie.net/pokemongo/images/0/05/Poison.png',
  'psychic': 'https://static.wikia.nocookie.net/pokemongo/images/2/21/Psychic.png',
  'rock': 'https://static.wikia.nocookie.net/pokemongo/images/0/0b/Rock.png',
  'steel': 'https://static.wikia.nocookie.net/pokemongo/images/c/c9/Steel.png',
  'water': 'https://static.wikia.nocookie.net/pokemongo/images/9/9d/Water.png',
} as const

export type PokemonTypesType = keyof typeof pokemonTypeIconUrls

type Props = {
  type: PokemonTypesType
  size: number | string
}


const PokemonTypeBadgeComponent: React.FC<Props> = (props) =>  {
  return (
    <Image
      style={{
        aspectRatio: 1,
        height: props.size,
      }}
      source={{ uri: pokemonTypeIconUrls[props.type]}}
    />
  )
}

export default PokemonTypeBadgeComponent
