import { StyleSheet } from 'react-native';


const HelpStyle = StyleSheet.create({
    maincontainer: {
        flex: 1,
        backgroundColor: "#fafafa"
    },
    headercontainer: {
        height: 80,
        backgroundColor: "#112470",
    },
    bottomcontainer: {
        flex: 0.1,
        paddingBottom: 15
    },
    FAQcontainer: {
        alignSelf: 'center',
        flexDirection: 'row',
    },
    FAQimage: {
        width: 30,
        height: 30,
        marginVertical: 25,
        marginRight: 10
    },
    FAQtext: {
        fontSize: 50,
        marginVertical: 25,
        fontSize: 25,
        fontWeight: "600",
        color: '#112470',
    },
    scrollviewcontainer: {
        flex: 1

    },
    scrollView: {
        marginHorizontal: 10,
    },
    collapsibletext: {
        fontSize: 16,
       
        padding: 1,
        color:'#000'
    },
    collasibletitle: {
        shadowColor: '#f9f9f9',
        shadowRadius: 2,
        shadowOpacity: 0.5,
        elevation: 1.5,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        borderWidth: 0
    },
});

export default HelpStyle;