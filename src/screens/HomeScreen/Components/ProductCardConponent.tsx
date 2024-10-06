import React from 'react'
import { View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import { styles } from '../../../theme/styles'

export const ProductCardConponent = () => {
  return (
    <View style={styles.rootListProduct}>
        <View >
        <Text variant="labelLarge">Nombre: </Text>
        <Text variant="bodyMedium">Precio: </Text>
        </View>
        <View style={styles.icon}>
        <IconButton
    icon="arrow-right-bold-box"
    size={25}
     mode='contained'
    onPress={() => console.log('Pressed')}
  />
        </View>
    </View>
    
  )
}

