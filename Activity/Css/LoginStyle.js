import {StyleSheet} from 'react-native';
import Global_Attributes from '../../Utility/Global_Attributes';

const externalStyle = StyleSheet.create({
  
  mainContainer: {
    flex: 1,
    backgroundColor: '#cacaca',
  },

  bgView: {
    position: 'relative',
  },

  bg_image: {
    height: 150,
    width: 420,
    resizeMode: 'stretch',
  },

  uppercontainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  enterPinText: {
    width: 20,
    height: 20,
    color: '#11246F',
  },
  enterPinImage: {
    width: 20,
    height: 20,
    tintColor: '#11246F',
  },
  buttontext: {
    textAlign: 'center',
    fontSize: 14,
    color: '#ffff',
    fontFamily: Global_Attributes.fixfontstyle,
  },
  forgotText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#11246f',
    fontFamily: Global_Attributes.fixfontstyle,
  },

  Btn: {
    backgroundColor: '#11246f',
    top: 15,
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 2,
    width: 145,
  },

  middlecontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    marginStart: 100,
    top: 30,
  },

  bottomcontainer: {
    alignSelf: 'center',
    // marginVertical: 20,
    width: 100,
    height: 80,
    top: 15,
  },

  textinput: {
    color: 'black',
    top: 30,
    fontSize: 18,
    borderBottomWidth: 1,
    width: 200,
    padding: 0,
    borderColor: '#11246F',
    fontFamily: Global_Attributes.fixfontstyle,
  },

  text: {
    top: 15,
    fontSize: 25,
    color: '#11246F',
    alignItems: 'center',
    fontFamily: Global_Attributes.fixfontstyle,
  },

  image: {
    top: 10,
    width: 60,
    height: 60,
  },

  fingerprintimage: {
    width: 70,
    height: 70,
    top: 30,
    alignSelf: 'center',
  },

  fingertext: {
    fontSize: 14,
    top: 40,
    color: 'black',
    textAlign: 'center',
    fontFamily: Global_Attributes.fixfontstyle,
  },
  
  loader: {
    backgroundColor: '#ffffff',
    height: 60,
    width: 300,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D81B60',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
});

export default externalStyle;
