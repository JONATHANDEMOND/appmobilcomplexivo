import React from 'react'
import { View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import { styles } from '../../../theme/styles'
import { Product } from '../HomeScreen'
import { CommonActions, useNavigation } from '@react-navigation/native'
//interface - props
interface Props{
  product: Product;
}

export const ProductCardConponent = ({product}:Props) => {
  ///hook useNavigator nos va a permitir navegar de un screen  a otro
const navigation = useNavigation();
  return (
    <View style={styles.rootListProduct}>
        <View >
        <Text variant="labelLarge">Marca del Vehiculo: {product.marca}</Text>
        <Text variant="bodyMedium">Precio: ${product.price} </Text>
        </View>
        <View style={styles.icon}>
        <IconButton
    icon="arrow-right-bold-box"
    size={25}
     mode='contained'
    onPress={() => navigation.dispatch(CommonActions.navigate({name:'Detail', params:{product}}))}
  />
        </View>
    </View>
    
  )
}

