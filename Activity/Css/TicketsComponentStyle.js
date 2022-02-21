import {StyleSheet} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Global_Attributes from '../../Utility/Global_Attributes';

const TicketsComponentStyle = StyleSheet.create({
  main_container: {
    flex: 1,
    // marginBottom: 27
  },
  offender_officer_court_button: {
    margin: 15,
    width: '27%',
    alignContent: 'center',
    justifyContent: 'center',
  },
  offender_officer_court_button_text: {
    backgroundColor: '#11246e',
    color: '#ffffff',
    padding: 10,
    textAlign: 'center',
    borderRadius: 10,
    fontWeight: 'bold',
    padding: 11,
    fontSize: 12,
    fontFamily: Global_Attributes.fixfontstyle,
  },
  cancel_roadside_button: {
    top: 5,
    width: 150,
    alignSelf: 'center',
  },
  cancel_roadside_button_text: {
    backgroundColor: '#ca1342',
    color: '#ffffff',
    padding: 11,
    alignSelf: 'center',
    borderRadius: 10,
    fontWeight: '900',
    fontSize: 12,
  },
  modal_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('100%'),
    height: hp('120%'),
  },
  modal_body: {
    backgroundColor: 'white',
    height: 230,
    width: '90%',
    borderRadius: 0.5,
    shadowColor: 'black',
    shadowOpacity: 100,
    elevation: 20,
  },
  modal_title: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    padding: 10,
    fontWeight: '900',
  },
  modal_textinput: {
    left: 20,
    top: 0,
    position: 'absolute',
    borderWidth: 1,
    borderRadius: 10,
    width: '78%',
    height: 100,
    fontSize: 17,
    textAlignVertical: 'top',
  },
  modal_mic_icon: {
    width: 35,
    height: 35,
    borderRadius: 11,
    position: 'absolute',
    right: 10,
    top: 25,
    backgroundColor: '#e2e4e1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal_bottom_container: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  submit_button: {
    top: '25%',
    height: 150,
    marginRight: 30,
    marginTop: 10,
  },
  cancel_button: {
    top: '25%',
    marginLeft: 30,
    marginTop: 10,
  },
  submit_cancel_text: {
    backgroundColor: '#11246e',
    color: '#ffffff',
    // height: hp("15%"),
    width: 100,
    padding: 13,
    textAlign: 'center',
    borderRadius: 10,
    fontWeight: '900',
  },

  cancel_roadside_modal_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('100%'),
    // height: 500
  },

  cancel_roadside_modal_textinput: {
    left: 20,
    top: 0,
    position: 'absolute',
    borderWidth: 1,
    borderRadius: 10,
    width: '90%',
    height: 100,
    fontSize: 17,
    textAlignVertical: 'top',
  },

  cancel_roadside_modal_body: {
    backgroundColor: 'white',
    height: '40%',
    width: '90%',
    borderRadius: 0.5,
    shadowColor: 'black',
    shadowOpacity: 100,
    elevation: 20,
  },

  cancel_roadside_modal_bottom_container: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: '-22%',
  },
  
});
export default TicketsComponentStyle;
