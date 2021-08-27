import React from 'react'
import { StyleSheet } from 'react-native'
import { Title } from 'react-native-paper'

const styles = StyleSheet.create({
  title: {
    padding: 16
  }
})

const PaddedTitleComponent: React.FC = (props) => {
  return (
    <Title style={styles.title}>
      {props.children}
    </Title>
  )
}

export default PaddedTitleComponent