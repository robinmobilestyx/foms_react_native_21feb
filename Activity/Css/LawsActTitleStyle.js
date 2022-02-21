import { StyleSheet } from 'react-native';
import Global_Attributes from '../../Utility/Global_Attributes';

const LawsActTitleStyle = StyleSheet.create({
    maincontainer: {
        flex: 1,
        backgroundColor: "#fafafa"
    },
    headercontainer: {
        height: 80,
        backgroundColor: "#112470",
    },
    touchbleopacity: {
        borderBottomWidth: 2,
        borderBottomColor: '#e7e7e7',
    },
    lawheaderactnotext: {
        color: '#000000',
        fontSize: 18,
        fontWeight: '800',
        marginLeft: 5
    },
    lawheaderacttext: {
        color: '#000000',
        fontSize: 18,
        fontWeight: '700',
        marginLeft: 5,
       
        fontFamily:Global_Attributes.fixfontstyle
    },
    lawcontenttext: {
        margin: 8,
        fontSize: 15,
        fontWeight: '700',
        color: '#000000',
      
        fontFamily:Global_Attributes.fixfontstyle
    },
    downarrow: {
        height: 25,
        width: 25,
        position: "absolute",
        right: 10,
        top: 10
    },
});
export default LawsActTitleStyle;