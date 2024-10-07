import { StyleSheet } from 'react-native';

export const styles=StyleSheet.create({
    root:{
        flex:1,
        justifyContent:'center',
        padding:20,
        gap:10
    },
    text:{
        fontSize:20,
        fontWeight: 'bold',
        textAlign:'center'
    },
    message:{
        
        width: '100%',
       
    },
    textRedirect:{
        marginTop:20,
        textAlign:'center',
        fontSize:15,
        fontWeight:'bold',
        color:'#705aa9'
    },
    rootActivity:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    rootHome:{
        flex:1,
        marginHorizontal:30,
        marginVertical:50,
       
    },
    header:{
        flexDirection:'row',
        gap:15,
        alignItems:'center'
    },
    icon:{
        alignItems:"flex-end",
        flex:1
    },
    modal:{
        padding:20,
        marginHorizontal:20,
        backgroundColor:'#fff',
        borderRadius:10,
        gap:10
    },
    rootListProduct:{
       marginTop:10,
        flexDirection:'row',
        padding:10,
        alignItems:'center',
        gap:20
    },
    fabProduct: {
        position: 'absolute',
        margin: 16,
        right: 10,
        bottom: 20,
      },
      rootInputsProduct:{
        flexDirection:'row',
        gap:35
      },
      rootDetail:{
        flex:1,
        gap:20,
        paddingHorizontal:20,
        backgroundColor:'#fff'
      },
      inputStyle: {
        width: '28%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
      },
      rootInputsProduct1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
        gap: 10, // Separación entre los elementos
      },
      rootDetail1: {
        flex: 1,
        gap: 20,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
      },
      inputContainer: {
        marginVertical: 15,
      },
      inputStyle1: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 10,
        textAlignVertical: 'top', // Alinea el texto en la parte superior
        backgroundColor: '#f9f9f9',
      },
      codeContainer: {
        marginVertical: 10,
      },
      nameContainer: {
        marginVertical: 10,
      },
      inputStyleCode: {
        borderColor: '#bbb',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 8,
        paddingVertical: 5,
        backgroundColor: '#f5f5f5',
      },
      inputStyleName: {
        borderColor: '#aaa',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 8,
        paddingVertical: 5,
        backgroundColor: '#eef2f3',
      },
      dividerStyle: {
        marginVertical: 8,
        backgroundColor: '#ddd',
      },
      iconSignOut:{
        marginTop:20
      }
})