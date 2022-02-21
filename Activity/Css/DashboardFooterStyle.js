import { StyleSheet } from 'react-native';

const DashboardFooterStyle = StyleSheet.create({

    container: {
        position: 'absolute',
        flex: 0.1,
        left: 0,
        right: 0,
        bottom: -3,
        backgroundColor: '#dc3546',
        flexDirection: 'row',
        height: 70,
        alignItems: 'center',
    },
    image: {
        width: 30,
        height: 30,
        alignSelf: 'center',
        marginBottom: 5,
        tintColor:"white"
    },
    me: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'center'
    },
    speeding: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'center',
        marginRight: 20
    },
    offence: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'center'
    },
    help: {
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
        fontSize: 11,
        alignSelf: 'center',
        bottom:5
    }
});
export default DashboardFooterStyle;