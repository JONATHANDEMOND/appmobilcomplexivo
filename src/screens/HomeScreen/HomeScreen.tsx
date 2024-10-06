import React, { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import { Avatar, Button, Divider, FAB, IconButton, MD3Colors, Modal, Portal, Text, TextInput } from 'react-native-paper';
import { styles } from '../../theme/styles';
import { auth } from '../../config/firebaseConfig';
import firebase from '@firebase/auth';
import { updateProfile } from 'firebase/auth';
import { ProductCardConponent } from './Components/ProductCardConponent';
import { NewProductComponent } from './NewProductComponent';
//interface -FormUser
interface FormUser{
  name: string;
}
//inteface formulario productos
interface Product{
  id:string;
  code: string;
  nameProduct:string;
  price:number;
  stock:number;
  description:string;
}


export const HomeScreen = () => {
  
  //hook nos va a permitir cambiar  el estado del fomrulario
  const [formUser, setFormUser] = useState<FormUser>({
    name:""
  });
  //hook usestate permitir q el modal se visualice o no
const [showModalProfile, setShowModalProfile] = useState<boolean>(false);

//hook USestate: permitir q el modal de producot se cisualice o no
const [showModalProduct, setShowModalProduct] = useState<boolean>(false);


// hook UseState: capturar y modificar la data del usuario autenticado

const [userData, setUserData] = useState<firebase.User | null>(null);
//hook: useState: gestionar la lista de productos
const [products, setProducts] = useState<Product[]>([
  {id:'1',code:'3asd13as2',nameProduct:'Teclado',price:25,stock:10, 
    description:'Teclado gaming RadioShack Striker Mecánico Negro'},
    {id:'2',code:'4das3as2',nameProduct:'Mose',price:30,stock:5, 
      description:'Mouse RadioShack 2604784 Negro'}
]);


  //hook useEffect: // obtener infomracion usuario autenticado
  useEffect(()=>{
    //cambiar de null a la data del usuario autenticado
    setUserData(auth.currentUser); 
    setFormUser({name:auth.currentUser?.displayName ?? ''})
    },[]);
  //funcion para actulizar el estado del fomrulario
  const handleSetValues=(key:string, value:string)=>{
    setFormUser({...formUser,[key]:value})
  }
//funciion para actilizar el producto
const handleUpdateProduct=()=>{
  setShowModalProduct(false)
}

  //funcion: actualiar la infomracion del usuario autenticado
  const handleUpdateUser=async()=>{
    try{
    await updateProfile(userData!,
      {displayName:formUser.name});
    }catch(e){
      console.log(e);
      
    }
    //cerrar el modal
    setShowModalProfile(false)
  }

  return (
    <>
    <View style={styles.rootHome}>
      <View style={styles.header}>     
         <Avatar.Text size={50} label="JD" />
      <View>
        <Text variant="bodySmall">Bienvenid@</Text>
        <Text variant="labelLarge">{userData?.displayName}</Text>
      </View>
      <View style={styles.icon}>
      <IconButton 
    icon="account-edit"
    size={30}
    mode='contained'
    onPress={() => setShowModalProfile(true)}
  />
      </View>
      </View>
      <View>
        <FlatList
         
         data={products}
         renderItem={({item}) => <ProductCardConponent />}
         keyExtractor={item => item.id}
       />
      </View>
    </View>
    <Portal>
    <Modal visible={showModalProfile}  contentContainerStyle={styles.modal}>
      <View style={styles.header}>
      <Text variant="headlineSmall">Mi Perfil</Text>
      <View style={styles.icon}>
      <IconButton
       icon="alpha-x-circle"
       size={30}
       onPress={() => setShowModalProfile(false)}
      />
     </View>
      </View>
      <Divider />
      <TextInput
      mode='outlined'
      label='Nombre'
      value={formUser.name}
      onChangeText={(value)=>handleSetValues('name',value)}
      />
       <TextInput
      mode='outlined'
      label='Correo'
      disabled
      value={userData?.email!}
      />
      <Button mode='contained' onPress={handleUpdateUser}>Actualizar</Button>
      
    </Modal>
  </Portal>
  <FAB
    icon="plus"
    style={styles.fabProduct}
    onPress={() => setShowModalProduct(true)}
  />
  <NewProductComponent showModalProduct={showModalProduct} setShowModalProduct={setShowModalProduct}/>
  </>
  );
};


