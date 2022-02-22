import { StyleSheet } from 'react-native';

import Global_Attributes from '../../Utility/Global_Attributes';

const LawsDescriptionStyle = StyleSheet.create({

    maincontainer: {
        backgroundColor: "#fafafa",
        flex: 1
    },

    headercontainer: {
        height: 80,
        backgroundColor: "#112470",
    },

    lawsheaderview: {
        padding: 10,
        fontSize: 15,
        backgroundColor: '#dde6e1',
        flex: 0.2,
        alignContent: 'center'
    },

    lawsdescriptionheader: {
        fontSize: 20,
        fontWeight: '700',
        color: '#272f65',
        alignSelf: 'center',
        alignContent: 'center',
    },

    lawsacttitletext: {
        fontSize: 22,
        fontWeight: '700',
        marginTop: 40,
        margin: 15,
        marginLeft: 25,
        alignSelf: 'stretch',
        color: 'black',
    },

    lawssetfinetext: {
        fontSize: 22,
        fontWeight: '700',
        margin: 15,
        marginLeft: 25,
        alignSelf: 'stretch',
        color: 'black',
    },

    lawspayabletext: {
        fontSize: 22,
        fontWeight: '700',
        margin: 15,
        marginLeft: 25,
        alignSelf: 'stretch',
        color: 'black',
    },

    lawsdemeritspointtext: {
        fontSize: 22,
        fontWeight: '700',
        margin: 15,
        marginLeft: 25,
        alignSelf: 'stretch',
        color: 'black',
    },

    lawsdescriptiontext: {
        fontSize: 20,
        margin: 15,
        marginLeft: 25,
        fontWeight: '500',
        alignSelf: 'stretch',
        color: 'black',
    },
    
});

export default LawsDescriptionStyle;