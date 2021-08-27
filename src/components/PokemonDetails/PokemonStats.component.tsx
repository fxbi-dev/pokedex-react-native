import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Divider, Text, TouchableRipple } from 'react-native-paper'
import PokemonTypeBadgeComponent, { PokemonTypesType } from '../PokemonTypeBadge.component'

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 16
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statText: {
    fontSize: 18,
    marginTop: 8,
  },
  badgeContainer: {
    flexDirection: 'row-reverse'
  }
})

const resolveStatName = (statName: string) => {
  const resolvedStatNamesMap: { [key: string]: string } = {
    'hp': 'HP',
    'attack': 'Attack',
    'defense': 'Deffense',
    'special-attack': 'Special Attack',
    'special-defense': 'Special Defense',
    'speed': 'Speed',
    'types': 'Types',
  }

  return resolvedStatNamesMap[statName] ?? statName
}

type Props = {
  stats: {
    base_stat: number,
    effort: number,
    stat: {
      name: string,
      url: string
    }
  }[],
  types: {
    slot: number,
    type: {
      name: PokemonTypesType,
      url: string
    }
  }[],
  onTypePressed?: (type: PokemonTypesType) => void
}

const PokemonStatsComponent: React.FC<Props> = (props) => {
  return (
    <View style={styles.root}>
      {
        props.stats.map(stat => (
          <React.Fragment key={stat.stat.name}>
            <View style={styles.row}>
              <Text style={styles.statText}>{resolveStatName(stat.stat.name)}</Text>
              <Text style={styles.statText}>{stat.base_stat}</Text>
            </View>
            <Divider />
          </React.Fragment>
        ))
      }
      <View style={styles.row}>
        <Text style={styles.statText}>{resolveStatName('types')}</Text>
        <View style={styles.badgeContainer}>
          {
            props.types.map(pokeType => (
              <TouchableRipple key={pokeType.type.name} onPress={() => {props.onTypePressed?.(pokeType.type.name)}}>
                <PokemonTypeBadgeComponent type={pokeType.type.name} size={30}/>
              </TouchableRipple>
            ))
          }
        </View>
      </View>
      <Divider />
    </View>
  )
}

export default PokemonStatsComponent;