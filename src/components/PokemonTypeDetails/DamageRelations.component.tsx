import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Divider, TouchableRipple } from 'react-native-paper'
import capitalize from '../../utils/capitalize'
import PokemonTypeBadgeComponent, { PokemonTypesType } from '../PokemonTypeBadge.component'

export type SingleDamageRelationType = {
  name: PokemonTypesType,
  url: string
}

export type DamageRelationsType = {
  double_damage_from: SingleDamageRelationType[],
  double_damage_to: SingleDamageRelationType[],
  half_damage_from: SingleDamageRelationType[],
  half_damage_to: SingleDamageRelationType[],
  no_damage_from: SingleDamageRelationType[],
  no_damage_to: SingleDamageRelationType[],
}

const resolveDamageRelationName = (key: keyof DamageRelationsType) => {
  return capitalize(key.replace(/_/g, ' '))
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    alignItems: 'center',
    minHeight: 38,
  },
  statText: {
    fontSize: 16,
  },
  badgeContainer: {
    flexDirection: 'row-reverse'
  }
})

type Props = {
  damageRelations: DamageRelationsType,
  onTypePressed?: (type: PokemonTypesType) => void,
}

const DamageRelationsComponent: React.FC<Props> = (props) => {

  return (
    <View style={styles.root}>
      {
        Object.keys(props.damageRelations).map((key: string) => {
          const typedKey = key as keyof DamageRelationsType

          return (
            <React.Fragment key={typedKey}>
              <View style={styles.row}>
                <Text style={styles.statText}>{resolveDamageRelationName(typedKey)}:</Text>
                <View style={styles.badgeContainer}>
                  {
                   props.damageRelations[typedKey].map(pokeType => (
                      <TouchableRipple key={pokeType.name} onPress={() => {props.onTypePressed?.(pokeType.name)}}>
                        <PokemonTypeBadgeComponent type={pokeType.name} size={30}/>
                      </TouchableRipple>
                    ))
                  }
                </View>
              </View>
              <Divider />
            </React.Fragment>
          )
        })
      }
    </View>
  )
}

export default DamageRelationsComponent;