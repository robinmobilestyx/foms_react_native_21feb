import { StyleSheet } from 'react-native';


const LawsSearchStyle = StyleSheet.create({
    maincontainer: {
        flex: 1,
        backgroundColor: "#fafafa"
    },
    headercontainer: {
        height: 80,
        backgroundColor: "#112470",
    },
    container: {
        padding: 10,
        backgroundColor: '#fafafa'
    },
    autocompleteContainer: {
        backgroundColor: '#ffffff',
        borderWidth: 0,
        marginLeft: 10,
        marginRight: 10,
    },
    inputContainer: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
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
    },
    searchIcon: {
        paddingRight: 10,
        backgroundColor: 'transparent',
        width: 25,
        height: 25
    },

    compulsoryautomobilecontainer: {
        flex: 1,
        paddingTop: 15
    },
    touchbleopacity: {
        borderBottomWidth: 1,
        borderBottomColor: '#232358',
        flexDirection: 'row'
    },
    text: {
        color: '#000000',
        fontSize: 18,
        fontWeight: '500',
        marginLeft: 10,
        marginRight: 50,
    },
    downarrow: {
        width: 35,
        height: 35
    },

});

export default LawsSearchStyle;