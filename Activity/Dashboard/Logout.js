import React from 'react'
import { View, Image,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import Logoutimage from '../assets/logout_icon.png';
//navigation.replace("LoginPage")


function Logout() {
const navigation = useNavigation();
    return(
            <View>
                <TouchableOpacity
                    onPress={()=>{navigation.navigate("LoginPage")}}>
                <Image style={{width:30,height:30,tintColor:'white'}} source={Logoutimage}/>
                </TouchableOpacity>
            </View>
    )
}

export default Logout;