import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { Surface, Text, Title, TouchableRipple } from 'react-native-paper'
import capitalize from '../../utils/capitalize'
import { axiosInstance as pokeApi } from '../../utils/pokeapiClient'
import PokemonSpriteComponent from '../PokemonSprite.component'

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  surface: {
    width: '45%',
    aspectRatio: 1,
    elevation: 4,
  },
  ripple: {
    width: '100%',
    height: '100%',
    padding: 8,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
  }
})

type Props = {
  evolutionChain: {
    url: string
  }
  currentPokemon: string
  loading: boolean,
  onEvolutionPressed?: (pokemon: { name: string }) => void
}

type ChainStep = { name: string, url: string, sprite: string }

const resolveChain = async (evolutionChain: any, pokemon: string): Promise<[ChainStep?, ChainStep?]> => {
  let result: Partial<ChainStep>[] = []
  let currentStep = evolutionChain.chain;

  while (currentStep) {
    result.push({
      name: currentStep.species.name,
      url: `https://pokeapi.co/api/v2/pokemon/${currentStep.species.name}`
    })

    currentStep = currentStep.evolves_to[0];
  }

  const pokemonIndex = result.findIndex(step => step.name === pokemon)

  if (pokemonIndex >= 0) {
    result = [result[pokemonIndex - 1], result[pokemonIndex + 1]]
  } else {
    return [undefined, undefined];
  }

  result = await Promise.all(result.map(async (chainStep) => {
    if (chainStep) {
      const pokemonResult = await pokeApi.get(chainStep.url as string)
      return {...chainStep, sprite: pokemonResult.data.sprites.front_default}
    } else return undefined
  })) as Partial<ChainStep>[]

  return result as [ChainStep?, ChainStep?];
}

const EvolutionChainComponent: React.FC<Props> = (props) => {
  const [chain, setChain] = useState<[ChainStep?, ChainStep?]>([undefined, undefined])

  useEffect(() => {
    if (props.loading) {
      const run = async () => {
        const evolutionChainResponse = await pokeApi.get(props.evolutionChain.url)
        const resolvedEvolutionChain = await resolveChain(evolutionChainResponse.data, props.currentPokemon)
  
        setChain(resolvedEvolutionChain);
      }
  
      run()
    }
  }, [props])


  return (
    <View style={styles.root}>
      {
        chain.map((pokemon, index) => (
          <Surface style={styles.surface} key={index}>
            <TouchableRipple
              style={styles.ripple}
              disabled={!pokemon || !props.onEvolutionPressed}
              onPress={() => {
               props.onEvolutionPressed?.({name: pokemon?.name || ''})
              }
            }>
              <>
                <Title>
                  {index ? 'After' : 'Before'}
                </Title>
                <>
                  <PokemonSpriteComponent
                    name={pokemon?.name || ''}
                    gender="default"
                    shiny={false}
                    orientation="front"
                    size={80}
                  />
                  <Text>{capitalize(pokemon?.name || 'End of the list')}</Text>
                </>
              </>
            </TouchableRipple>
          </Surface>
        ))
      }
    </View>
  )
}

export default EvolutionChainComponent;