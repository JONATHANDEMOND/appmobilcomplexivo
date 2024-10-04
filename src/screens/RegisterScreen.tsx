import React, { useState } from 'react'
import { View, } from 'react-native';
import { Button, Snackbar, Text, TextInput } from 'react-native-paper';
import { styles } from '../theme/styles';
import { getAuth,createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebaseConfig'
import { CommonActions, useNavigation } from '@react-navigation/native';

//intefce -FormRegister
interface FormRegister{
    email: string,
    password: string

}
//interface - Message
interface ShowMessage{
    visible:boolean;
    message: string;
    color:string;

}


const RegisterScreen = () => {
//hook useState: cambiar el estado del formulario

const [formRegister, setformRegister] = useState<FormRegister>({
    email:"",
    password:""
})

//hokk USestate cambiaer el estadodel mensaje

const [showMessage, setShowMessage] = useState<ShowMessage>({
    visible:false,
    message:"",
    color:"#44D62C"
})
//hook use state : cambiar el password de visible a no visible
const [hiddenPassword, sethiddenPassword] = useState<boolean>(true);
//hook useNavigation - permite la navaegacion de un screen a otro
const navigation = useNavigation();


//funcion: actulizar el estado del formulario o setear

const handleSetValues=(key:string, value:string)=>{
    setformRegister({...formRegister, [key]: value});
}
  
///funcion: registrar a nuevos usuarios
const handleRegister= async()=>{
    if(!formRegister.email || !formRegister.password){
        setShowMessage({visible:true, message:'Completa todos los Campos', color:'rgb(242,13,13)'});
        return;
    }
    console.log(formRegister);
    try{
    const response = await createUserWithEmailAndPassword(
        auth,
        formRegister.email,
        formRegister.password
    );
    setShowMessage({
        visible:true,
        message:'Registro Exitoso',
        color:'#44D62C'
    })
    }catch(e){
        console.log(e);
        setShowMessage({
            visible: true,
            message: 'No se logro completar la transacción, intente mas tarde',
            color: 'hsl(52, 100%, 50%)'
        });
        

    }
    
}


return (
    <View style={styles.root} >
    <Text style={styles.text}>Registrate</Text>
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
     <Button icon="home" mode="contained" onPress={handleRegister}>
      Registrar
     </Button>
     <Text style={styles.textRedirect}
     onPress={()=>navigation.dispatch(CommonActions.navigate({name:'Login'}))}>
     Ya tienes una cuenta? Inicia Sesion Ahora...
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

export default RegisterScreen
