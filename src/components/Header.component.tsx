import React from 'react'

import { NativeStackHeaderProps } from '@react-navigation/native-stack/lib/typescript/src/types'
import { StatusBar } from 'react-native'
import { Appbar } from 'react-native-paper'
import useStatusBarHeight from '../utils/useStatusBarHeight'

type Props = NativeStackHeaderProps

const HeaderComponent: React.FC<Props> = ({ route, options, navigation }) => {
  const statusBarHeight = useStatusBarHeight()

  return (
    <>
      <StatusBar hidden={false} translucent={true} backgroundColor={"transparent"} barStyle="dark-content"/>
      <Appbar.Header
        statusBarHeight={statusBarHeight}
      >
        { navigation.canGoBack() && <Appbar.BackAction onPress={() => navigation.goBack()} /> }
        <Appbar.Content title={(route.params as any)?.title || options.title || route.name} />
      </Appbar.Header>
    </>
  )
}

export default HeaderComponent