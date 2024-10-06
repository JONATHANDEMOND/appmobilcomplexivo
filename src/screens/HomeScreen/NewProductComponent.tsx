import React, { useState } from 'react'
import { Button, Divider, IconButton, Modal,Portal, Snackbar, Text, TextInput } from 'react-native-paper'
import { styles } from '../../theme/styles';
import { View } from 'react-native';
import { dbRealTime } from '../../config/firebaseConfig';
import { push, ref, set } from 'firebase/database';
//interface - Props (propiedades q podemos enviar de un componente padrea un compnente hijo siempre hay q usar inerfaces)
interface Props{
    showModalProduct:boolean;
    setShowModalProduct: Function; //funcion del hook useState
}
//interface-FormProduct
interface FormProduct{
    code: string;
    nameProduct:string;
    price:number;
    stock:number;
    description:string;
}
//INTERFACE - PARA MENSAJES
interface ShowMessage{
    visible:boolean;
    message: string;
    color:string;

}



export const NewProductComponent = ({ showModalProduct, setShowModalProduct }: Props) => {

//hook para cambiar el estado del mensaje
    const [showMessage, setShowMessage] = useState<ShowMessage>({
        visible:false,
        message:"",
        color:"#44D62C"
    })

    //hook useState: para cambiar el estado del formulario
    const [formProduct, setFormProduct] = useState<FormProduct>({
        code:'',
        nameProduct:'',
        price:0,
        stock:0,
        description:''


    });

    //funcion: actulizar el estado del fomrulario
    const handleSetValues=(key:string, value:string)=>{
        setFormProduct({...formProduct, [key]:value});
    }
    ///funcion:  agregar los productos
    const handleSetProduct = async ()=>{
      if (
        !formProduct.code ||
        !formProduct.nameProduct ||
        !formProduct.price ||
        !formProduct.stock ||
        !formProduct.description
      ) {
        setShowMessage({
          visible: true,
          message: "Completa los campos!",
          color: "#CE0056",
        });
        return;
      }
      //1 crear  EL PATH la referencia qa la BD
      const dbRef = ref(dbRealTime, "productos");
      ///2. crear una coleccion q agregue los datos en la dbref
      const saveProduct = push(dbRef);
      //3 almacenar los datos en la base de datos
      try {
        await set(saveProduct, formProduct);
        //cerrar modal
        setShowModalProduct(false);
      } catch (e) {
        console.log(e);
        setShowMessage({
          visible: true,
          message: "No se completo la transaccion, intnetalo mas tarde!",
          color: "#CE0056",
        });
      }
    }

  return (
    <>
    <Portal>
      <Modal visible={showModalProduct} contentContainerStyle={styles.modal}>
        <View style={styles.header}>
          <Text variant="headlineSmall">Nuevo Producto</Text>
          <View style={styles.icon}>
            <IconButton icon="alpha-x-circle" 
            size={30} 
            onPress={()  => setShowModalProduct(false)} />
          </View>
        </View>
        <Divider/>
        <TextInput
        label='Codigo'
        mode='outlined'
        onChangeText={(value)=>handleSetValues('code',value)}
        />
        <TextInput
        label='Nombre Producto'
        mode='outlined'
        onChangeText={(value)=>handleSetValues('nameProduct',value)}
        />
        <View style={styles.rootInputsProduct}>
        <TextInput
        label='Precio'
        mode='outlined'
        keyboardType='numeric'
        style={{width:'45%'}}
        onChangeText={(value)=>handleSetValues('price',value)}
        />
        <TextInput
        label='Stock'
        mode='outlined'
        keyboardType='numeric'
        style={{width:'45%'}}
        onChangeText={(value)=>handleSetValues('stock',value)}
        />
        </View>
        <TextInput
        label='Description'
        mode='outlined'
        multiline
        numberOfLines={3}
        onChangeText={(value)=>handleSetValues('description',value)}
        />
        <Button mode='contained' onPress={handleSetProduct}>Agregar</Button>
      </Modal>
      <Snackbar
        visible={showMessage.visible}
        onDismiss={()=>setShowMessage({...showMessage, visible:false})}
        style={{...styles.message,
            backgroundColor:showMessage.color
        }}>
      {showMessage.message}
      </Snackbar>
    </Portal>
    
    </>
  );
};


