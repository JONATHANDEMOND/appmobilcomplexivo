import React, { useState } from 'react'
import { Text,View } from 'react-native'
import { styles } from '../theme/styles'
import { Button, Snackbar, TextInput } from 'react-native-paper'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { CommonActions, useNavigation } from '@react-navigation/native';


//interface - formlogin
interface FormLogin{
    email: string;
    password: string;

}
//INTERFACE - PARA MENSAJES
interface ShowMessage{
    visible:boolean;
    message: string;
    color:string;

}

export const LoginScreen = () => {
//hook use state: cambiar el estado del formulario
const [formLogin, setFormLogin] = useState<FormLogin>({
    email:"",
    password:""
})
//hook para cambiar el estado del mensaje
const [showMessage, setShowMessage] = useState<ShowMessage>({
    visible:false,
    message:"",
    color:"#44D62C"
})

//funcion: actualizr el estado del formulario 
const handleSetValues =(key: string, value:string)=>{
    setFormLogin({...formLogin,[key]:value});

}
//funcion para hacer visible el password 
const [hiddenPassword, sethiddenPassword] = useState<boolean>(true);

//hook useNavigation - permite la navaegacion de un screen a otro
const navigation = useNavigation();


//funcion para iniciar secion con el usaurio registrado
const handleSignIn= async ()=>{
    //validando q los campos se encuenren llenos
    if(!formLogin.email || !formLogin.password){
        setShowMessage({
            visible: true,
            message:'Completa los campos',
            color: '#CE0056'
        })
        return;
    }
    console.log(formLogin);
    try{
    const response= await signInWithEmailAndPassword(
        auth,
        formLogin.email,
        formLogin.password
    );
       //Navegar al home
       navigation.dispatch(CommonActions.navigate({name:'Home'}))
        

}catch(e){
    //console.log(e);
    setShowMessage({
        visible:true,
        message:'Correo y/o contraseña incorrecta',
        color:'rgb(206, 0, 86)'
    })
    
}

}


  return (
    <View style={styles.root} >
    <Text style={styles.text}>Inicia Sesion</Text>
    <TextInput
      label="Correo"
     mode='outlined'
     placeholder='Escribe tu correo'
     onChangeText={(value)=>handleSetValues('email',value)}
    />
    <TextInput
      label="Contraseña"
     mode='outlined'
     placeholder='Escribe tu contraseña'
     secureTextEntry= {hiddenPassword}
     onChangeText={(value)=>handleSetValues('password',value)}
     right={<TextInput.Icon icon="eye" onPress={()=>sethiddenPassword(!hiddenPassword)}/>}
    />
     <Button icon="account" mode="contained" onPress={handleSignIn}>
      Iniciar Sesión 
     </Button>
     <Text style={styles.textRedirect}
     onPress={()=>navigation.dispatch(CommonActions.navigate({name:'Register'}))}>
     No tienes una cuenta? Registrate Ahora
     </Text>
     <Snackbar
        visible={showMessage.visible}
        onDismiss={()=>setShowMessage({...showMessage, visible:false})}
        style={{...styles.message,
            backgroundColor:showMessage.color
        }}>
      {showMessage.message}
      </Snackbar>
     
    </View>
  )
}


