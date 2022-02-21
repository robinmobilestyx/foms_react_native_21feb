import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Global_Attributes from '../../Utility/Global_Attributes';
import { StyleSheet } from 'react-native';


const NumberVerificationStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#CDCDCD',
     },
    uppercontainer:{
        //   alignItems: 'center',
        // justifyContent: 'center',
    },
     bgView:{
        position:'relative',
    },

     bg_image:{
        height:150,
        width:420,
        resizeMode:'stretch'
    },

     logoView:{
        resizeMode:'stretch',
        position:'relative',
        bottom:130,
        start:20
    },

    logo:{
        height:70,
        width:60,    
    },

    middlecontainer:{
         alignItems: 'center',
        justifyContent: 'center',
    },

    bottomcontainer:{
        alignSelf: 'center',
        top:15,
    },
    
      textView:{
        justifyContent:'center',
        alignItems:'center',
         bottom:40,
         width:"100%"
    },
    text: {
        color: "#11246F",
        fontWeight: "bold",
        position:'absolute',
        fontSize:20,
        textAlign:'center',
        fontFamily:Global_Attributes.fixfontstyle,
        
    },
    inputView:{
        backgroundColor: "#ffffff",
        borderRadius: 10,
        height: 45,
        marginBottom: 20,
        width:200,
        alignSelf:'center',
    },
    inputText:{
        color: "#000000",
        fontSize: 18,
        padding:10,
        textAlign:'center',
        fontFamily:Global_Attributes.fixfontstyle,
        
    },
    nextButtonView: {
        
        backgroundColor: "#11246f",
        borderRadius: 10,
        height: 50,
        alignSelf: "center",
        justifyContent: "center",
        marginBottom: 2,
        width:200,
      },

       goToLoginView: {
        width:"50%",
        // backgroundColor: "#11246f",
        // borderRadius: 10,
        borderColor:'transparent',
       
        alignSelf: "center",
        //justifyContent: "center",
        // marginBottom: 2,
         marginTop:12
        //width:200,
      },
      nextButtonText:{
        alignContent: 'center',
        marginLeft: '1%',
        fontSize: 14,
        fontWeight:'bold',
        color:'#ffff',
        alignSelf:'center',
        fontFamily:Global_Attributes.fixfontstyle,
      },
      goToLoginText:{
        alignContent: 'center',
        // marginLeft: '1%',
        fontSize: 16,
        fontWeight:'bold',
        color:'#11246f',
        alignSelf:'center',
        fontFamily:Global_Attributes.fixfontstyle,
        
      },
     
       ORText:{
       alignContent: 'center',
        marginTop:12,
        // marginLeft: '1%',
        fontSize: 16,
        fontWeight:'bold',
        // color:'#ffff',
        alignSelf:'center',
        color:'black',
      },
      supportText:{
          fontSize:20,
          alignSelf:'center',
          top:70,
          color:'black',
          textAlign:'center',
          fontFamily:Global_Attributes.fixfontstyle,
      },
      supportTexts:{

        fontSize:20,
        alignSelf:'center',
        top:80,
        color:'blue',
        textAlign:'center',
        textDecorationLine:'underline',
        fontFamily:Global_Attributes.fixfontstyle,
    },

});

export default NumberVerificationStyle;