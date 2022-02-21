import { StyleSheet } from 'react-native';
import Global_Attributes from '../../Utility/Global_Attributes';



const LawsParentTitleStyle = StyleSheet.create({
    maincontainer: {
        flex: 1,
        backgroundColor: "#fafafa"
    },
    headercontainer: {
        height: 80,
        backgroundColor: "#112470",
    },
    container: {
        backgroundColor: '#ffffff',
        marginBottom: 70,
    },
    autocompleteContainer: {
        backgroundColor: '#ffffff',
        marginLeft: 10,
        marginRight: 10,
        color:'black',
    },
    inputContainer: {
        backgroundColor: '#ffffff',
        borderColor: '#ffffff',
        borderWidth: 0,
        color:'black',
    },
    searchSection: {
        height: 45,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        shadowColor: '#f0f0f0',
        shadowRadius: 2,
        shadowOpacity: 0.5,
        elevation: 1.5,
        margin: 10,
        borderWidth: 0.5,
        color:'black',
    },
    searchIcon: {
        width: 25,
        height: 25,
        tintColor: 'grey'
    },

    compulsoryautomobilecontainer: {
        flex: 1,
        paddingTop: 15,
    },
    touchbleopacity: {
        borderBottomWidth: 0.8,
        borderBottomColor: '#11246F',
        flexDirection: 'row',
        paddingTop: 10
    },
    text: {
        color: '#000000',
        fontSize: 18,
        fontWeight: '700',
        marginLeft: 10,
        
        fontFamily:Global_Attributes.fixfontstyle
    },
    downarrow: {
        width: 25,
        height: 25,
        position: 'absolute',
        right: 10,
        top: 10
    },

});

export default LawsParentTitleStyle;