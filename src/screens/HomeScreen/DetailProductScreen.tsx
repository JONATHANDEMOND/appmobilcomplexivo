import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, Divider, Text } from 'react-native-paper';
import { styles } from '../../theme/styles';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Product } from './HomeScreen';
import { ref, remove, update } from 'firebase/database';
import { auth, dbRealTime } from '../../config/firebaseConfig';

 export const DetailProductScreen = () => {
    //hook useRoot: acceder a toda la infomracion de navegacion
    const route = useRoute();
    //console.log(route);
    //@ts-ignore
    const {product}=route.params;
    //console.log(product);
    //hook use State: cambiar el estao del fomrualrio de editar y eliminar 
    const [FormEdit, setFormEdit] = useState<Product>({
            id:'',
            placa:'',
            marca:'',
            price:0,
            description:''
    });
    //hook usenavigation:permite navegar de u n screen a otro
    const navigation = useNavigation();
    
    // hook useEffect: cargar y mostrar la data en el fomrulario de detalle
    useEffect(()=>{
        //actulizar los datos en el fomrulario
        setFormEdit(product);
    },[])


    //funcion q nos perita actulizar losd atowsd esde el formulario

    const handleSetValues =(key:string,value:string)=>{
        setFormEdit({...FormEdit,[key]:value})

    }
    //funcion: actulizar la data del producto 
    const handleUpdateProduct=async()=>{
        //console.log(FormEdit);
        //1. direcccionar a la tabla  y actualizar el dato sellecionado
        const dbRef=ref(dbRealTime,'productos/' +auth.currentUser?.uid + '/'+ FormEdit.id)
        //2. actulizar el dato seleccionado
        try{
        await update(dbRef,{
            code:FormEdit.placa,
            nameProduct:FormEdit.marca,
            price:FormEdit.price,
            description:FormEdit.description
        });
        //3regresar al anterior Screen
        navigation.goBack();
    }catch(e){
        console.log(e);
        
    }
        
    }

    //funcion: eliminar  la data del producto
    const handleDeleteProduct= async()=>{
        const dbRef=ref(dbRealTime, 'productos/'+ auth.currentUser?.uid + '/' + FormEdit.id);
        try{
        await remove(dbRef);
        navigation.goBack();
    }catch(e){
        console.log(e);
        
    }
    }
    
  return (
    <View style={styles.rootDetail1}>
        <View style={styles.codeContainer}>
            <Text variant="headlineSmall">Placa del Vehiculo:</Text>
            <TextInput
             value={FormEdit.placa}
            onChangeText={(value)=>handleSetValues('placa', value)}
            style={styles.inputStyleCode}/>
            <Divider style={styles.dividerStyle} />
        </View>
        <View style={styles.nameContainer}>
            <Text variant="bodyLarge">Marca:</Text>
            <TextInput 
            value={FormEdit.marca}
            onChangeText={(value)=>handleSetValues('marca', value)}
            style={styles.inputStyleName}/>
            <Divider style={styles.dividerStyle}/>
        </View>
        <View style={styles.rootInputsProduct1}>
            <Text variant="titleMedium">Precio:</Text>
            <TextInput
             value={FormEdit.price.toString()}
            style={styles.inputStyle}
            onChangeText={(value)=>handleSetValues('price', value)}/>
        </View>
        <View style={styles.inputContainer}>
        <Text variant="titleMedium">Descripción</Text>
            <TextInput 
            value={FormEdit.description}
            onChangeText={(value)=>handleSetValues('description', value)}
            multiline
            numberOfLines={5}
            style={styles.inputStyle1}/>
        </View>
    
            <Button 
            mode='contained' 
            icon='motorbike'
            onPress={handleUpdateProduct}>
                Actualizar
                </Button>
            <Button 
            mode='contained'
             icon="delete-empty"
             onPress={handleDeleteProduct}
             >Eliminar
             </Button>
        
    </View>
  )
}


