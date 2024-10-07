import React, { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import { Avatar, Button, Divider, FAB, IconButton, MD3Colors, Modal, Portal, Text, TextInput } from 'react-native-paper';
import { styles } from '../../theme/styles';
import { auth, dbRealTime } from '../../config/firebaseConfig';
import firebase, { signOut } from '@firebase/auth';
import { updateProfile } from 'firebase/auth';
import { ProductCardConponent } from './Components/ProductCardConponent';
import { NewProductComponent } from './NewProductComponent';
import { onValue, ref } from 'firebase/database';
import { CommonActions, useNavigation } from '@react-navigation/native';
//interface -FormUser
interface FormUser{
  name: string;
}
//inteface formulario productos
export interface Product{
  id:string;
  placa: string;
  marca:string;
  price:number;
  description:string;
}


export const HomeScreen = () => {
  const navigation = useNavigation();
  
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
 
]);


  //hook useEffect: // obtener infomracion usuario autenticado
  useEffect(()=>{
    //cambiar de null a la data del usuario autenticado
    setUserData(auth.currentUser); 
    setFormUser({name:auth.currentUser?.displayName ?? ''})
    //llamar la funcion par ala lista d eproductos
    getAllProducts();
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
  //FUNCION CERRAR SESION
  const handleSignOut = async () => {
    try{
    await signOut(auth);
    navigation.dispatch(CommonActions.reset({index:0, routes:[{name:'Login'}]}))
  }catch(e){
    console.log(e);
    
  }
  }
  

  //fucnion qu nos va a permitir obltener los productos para listarlos
  const getAllProducts = ()=>{
    // 1 Direccionar a la tabla de la base de datos
    const dbRef=ref(dbRealTime,'productos/'+ auth.currentUser?.uid)
    //acceder a la data
    onValue(dbRef,(snapshot)=>{
      //capturar la data
      const data=snapshot.val();//obtener la data en un fomrato esperado
      //VERIFICAR SI ESXISTE DATOS
      if(!data)return;
      //4. Obtener las keys de cada dato
      const getKeys=Object.keys(data);
      //5. Crear un arreglo para almacenar cada producto que se obtiene
      const listProduct: Product[] = [];
      //6. recorrer las keys oara acceder a cada producto
      getKeys.forEach((key)=>{
        const value={...data[key], id:key}
        listProduct.push(value);
      });
      //7. Actualizar la data obtenida en el arreglo del hook Use satat
      setProducts(listProduct);
   })
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
              mode="contained"
              onPress={() => setShowModalProfile(true)}
            />
          </View>
        </View>
        <View>
          <FlatList
            data={products}
            renderItem={({ item }) => <ProductCardConponent product={item} />}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
      <Portal>
        <Modal visible={showModalProfile} contentContainerStyle={styles.modal}>
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
            mode="outlined"
            label="Nombre"
            value={formUser.name}
            onChangeText={(value) => handleSetValues("name", value)}
          />
          <TextInput
            mode="outlined"
            label="Correo"
            disabled
            value={userData?.email!}
          />
          <Button mode="contained" onPress={handleUpdateUser}>
            Actualizar
          </Button>
          <View style={styles.iconSignOut}>
            <IconButton
              icon="logout-variant"
              size={30}
              mode="contained"
              onPress={handleSignOut}
            />
          </View>
        </Modal>
      </Portal>
      <FAB
        icon="plus"
        style={styles.fabProduct}
        onPress={() => setShowModalProduct(true)}
      />
      <NewProductComponent
        showModalProduct={showModalProduct}
        setShowModalProduct={setShowModalProduct}
      />
    </>
  );
};


