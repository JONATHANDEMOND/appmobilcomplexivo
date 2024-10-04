import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Avatar, Text } from 'react-native-paper'
import { styles } from '../../theme/styles';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';
//interface -USerauth
interface UserAuth{
  name: string;
}


export const HomeScreen = () => {
  
  //hook nos va a permitir cambiar  el estado del fomrulario
  const [userAuth, setUserAuth] = useState<UserAuth>({
    name:""
  });
  //hook useEffect: valdiar el estado de autenticacion
  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
      if (user){  //verificar si existe autenticacion
        setUserAuth({name: user.displayName ?? 'NA'})

      }
    })
  },[]);
  return (
    <View style={styles.rootHome}>
      <View style={styles.headerHome}>     
         <Avatar.Text size={50} label="IM" />
      <View>
        <Text variant="bodySmall">Bienvenid@</Text>
        <Text variant="labelLarge">{userAuth.name}</Text>
      </View>
      </View>

    </View>
  );
};


