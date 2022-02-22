import { StyleSheet } from 'react-native';

const TicketsStyle = StyleSheet.create({

    textinput: {
        borderBottomWidth: 1,
        width: '70%',
        marginLeft: 15,
        marginEnd: 1,
        fontSize: 17,
        textAlignVertical: "bottom",
        paddingBottom: 2,
        right: 10,
        color:'black'
    },
    search_button: {
        right: 7,
        top: 8,
        width: "25%"
    },
    search_button_text: {
        fontSize: 13,
        backgroundColor: '#112470',
        color: '#ffffff',
        padding: 10,
        borderRadius: 8,
        textAlign: 'center',
        fontWeight:'bold'
    },
    flatListconatiner: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#112470',
        marginTop: 15,
        marginBottom: 55,
        marginLeft: 5,
        marginRight: 5,
    },
    bottom_container: {
        flex: 0.1,
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row'
    },
    prev_button: {
        right: -20,
        bottom: 5,
        width: 100
    },
    prev_button_text: {
        fontSize: 15,
        backgroundColor: '#112470',
        color: '#ffffff',
        padding: 12,
        borderRadius: 8,
        textAlign: 'center'
    },
    next_button: {
        bottom: 5,
        right: 20,
        width: 100
    },
    next_button_text: {
        fontSize: 15,
        backgroundColor: '#112470',
        color: '#ffffff',
        padding: 12,
        borderRadius: 8,
        textAlign: 'center'
    }


});
export default TicketsStyle;