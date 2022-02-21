import { StyleSheet } from 'react-native';


const LoginScreenFooterStyle = StyleSheet.create({
    container: {
        position: 'absolute',
        flex: 0.1,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#dc3546',
        flexDirection: 'row',
        height: 90,
        alignItems: 'center',
    },
    checkin: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'center'
    },
    image: { 
        width: 42,
        height: 42,
        alignSelf: 'center',
        tintColor:"white",
        bottom:10
    },
    off_image: { 
        width: 42,
        height: 42,
        alignSelf: 'center',
        tintColor:"white",
        bottom:5
    },
    
    offence: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'center'
    },
    law: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'center'
    },
    support: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'center'
    },
    text: {
        color: '#ffffff',
        fontSize: 14,
        alignSelf: 'center',
        textAlign:'center',
        top:5,
    }
});
export default LoginScreenFooterStyle;