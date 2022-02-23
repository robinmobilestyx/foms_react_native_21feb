
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {StyleSheet} from 'react-native';

import Global_Attributes from '../../Utility/Global_Attributes';

const ponstyle = StyleSheet.create({
  
  mainView: {
    backgroundColor: '#DEE6E1',
    flex: 1,
  },

  Scrollview: {
    // alignSelf: 'center',
    // height: '95%',
    // width: '95%',
    // marginBottom: '20%',
    // marginTop: '3%',
    // backgroundColor: '#FFFFFF',
    // paddingBottom:'10%'
    flex: 0.9,
    alignSelf: 'center',
    margin: '1%',
    marginTop: '3%',
    width: '95%',
    backgroundColor: '#FFFFFF',
    marginBottom: '20%',
  },

  bottomView: {
    flex: 0.1,
  },

  locationView: {
    flex: 1,
    flexDirection: 'row',
    padding: '3%',
  },

  loc_code_view: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },

  loc_code_text: {
    color: '#11246F',
    fontWeight: 'bold',
  },

  loc_code_no: {
    fontWeight: 'bold',
    color: 'black',
  },

  loc_code_no1: {
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 20,
  },

  offn_views: {
    flex: 0,
    flexDirection: 'column',
    backgroundColor: '#000000',
    width: '0.4%',
    height: '100%',
    marginRight: '5%',
  },

  offn_view: {
    flex: 2,
    flexDirection: 'column',
  },

  offr_name_view: {
    flex: 1,
  },

  offr_name: {
    color: '#000000',
    padding: '4%',
  },

  main_view_status: {
    flex: 1,
    height: 60,
    marginTop: '-4%',
    marginBottom: '4%',
  },

  view_status: {
    backgroundColor: '#DEE6E1',
    height: 4,
    width: '50%',
    alignSelf: 'center',
    marginTop: '6%',
  },

  first_status: {
    backgroundColor: '#30D20D',
    color: 'white',
    borderRadius: 60 / 2,
    height: 20,
    width: '5.5%',
    textAlign: 'center',
    marginStart: '23%',
    bottom: '20%',
  },

  sec_status: {
    backgroundColor: '#DEE6E1',
    color: 'white',
    borderRadius: 60 / 2,
    height: 20,
    width: '5.5%',
    textAlign: 'center',
    alignSelf: 'center',
    bottom: '55%',
  },

  third_status: {
    backgroundColor: '#DEE6E1',
    color: 'white',
    borderRadius: 60 / 2,
    height: 20,
    width: '5.5%',
    textAlign: 'center',
    bottom: '86%',
    alignSelf: 'flex-end',
    marginRight: '24%',
  },

  info_txt: {
    color: '#11246F',
    bottom: '80%',
    start: '23%',
    fontSize: 12,
  },

  offn_txt: {
    color: '#11246F',
    bottom: '105%',
    alignSelf: 'center',
    fontSize: 12,
  },

  review_txt: {
    color: '#11246F',
    bottom: '130%',
    start: '68%',
    fontSize: 12,
  },

  flash_view: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 55,
    marginTop: '3%',
    marginStart: '2%',
    marginEnd: '3%',
  },

  sdl_txt: {
    color: '#11246F',
    marginTop: '5%',
  },

  flash_txt: {
    marginTop: '5%',
    color: '#000000',
    right: 10,
    left: 18,
    marginRight: 20,
  },

  scan_btn: {
    borderWidth: 1.2,
    borderColor: '#11246F',
    borderRadius: 9,
    height: '70%',
    width: '30%',
    alignSelf: 'center',
    marginStart: '2%',
  },

  scan_txt: {
    color: '#11246F',
    textAlign: 'left',
    marginTop: '10%',
    marginStart: '10%',
    fontWeight:'bold',
    position: 'absolute',
    // width: '50%',
  },

  scan_img: {
    height: '100%',
    width: '30%',
    // alignSelf: 'center',
    marginLeft:'60%'
  },

  main_text_view: {
    flex: 1,
    flexDirection: 'row',
  },

  main_text_views: {
    flex: 0.5,
    flexDirection: 'column',
    marginTop: '-5%',
  },

  main_text_views_dln: {
    flex: 0.7,
    flexDirection: 'column',
    marginTop: '-2%',
  },

  main_text_views_juris: {
    flex: 0.2,
    flexDirection: 'column',
    marginTop: '-2%',
  },

  main_text_viewss: {
    flex: 0.5,
    flexDirection: 'column',
  },

  birthView: {
    flex: 0.5,
    flexDirection: 'column',
  },

  inputTextStyleTwo: {
    height: 55,
    backgroundColor: '#ffffff',
    margin: '5%',
    fontSize: 12,
    color: '#11246F',
  },

  inputTextStyleThreeView: {
    flex: 0.33,
    flexDirection: 'column',
    top: '-2%',
  },

  inputTextStyleThree: {
    height: 55,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    margin: '6%',
    fontSize: 12,
  },

  mainbirthView: {
    flex: 1,
    direction: 'row',
  },

  gend_view: {
    flex: 0.5,
    flexDirection: 'column',
    marginTop: '6%',
  },

  sex_txt: {
    paddingLeft: '4%',
    fontSize: 12,
    color: '#11246F',
  },

  sec_gend_view: {
    flexDirection: 'row',
  },

  nxt_btnView: {
    flex: 1,
  },

  nxt_btnView1: {
    flex: 0.5,
    flexDirection: 'column',
  },

  nxt_btnView1: {
    flex: 0.5,
    flexDirection: 'column',
  },

  nxt_btn: {
    backgroundColor: '#30D20D',
    alignSelf: 'flex-end',
    width: '30%',
    borderRadius: 10,
    margin: '4%',
  },
  
});

export default ponstyle;
