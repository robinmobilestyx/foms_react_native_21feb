import {StyleSheet, Dimensions} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Global_Attributes from '../../Utility/Global_Attributes';

const ponsoffnStyle = StyleSheet.create({
  mainView: {
    backgroundColor: '#DEE6E1',
    flex: 1,
  },
  Scrollview: {
    // // alignSelf: 'center',
    // margin: '3%',
    // width: '95%',
    // flex: 0.8,
    // // marginBottom: "3%",
    // backgroundColor: '#FFFFFF',
    // marginBottom: "17.5%"
    flex: 1,
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

  autocompleteView: {
    marginTop: '4%',
    width: wp('86%'),
    borderBottomWidth: 1,
    fontSize: 12,
    // paddingLeft:"10%",
    marginLeft: '4%',
    marginRight: '2%',
  },
  autocompleteViews: {
    marginTop: '2%',
    width: wp('86%'),
    borderBottomWidth: 1,
    fontSize: 12,
    // paddingLeft:"10%",
    marginLeft: '4%',
    marginRight: '2%',
    marginTop: '4%',
  },
  autocompletecontainer: {
    backgroundColor: '#ffffff',
    borderColor: '#ffffff',
    borderWidth: 0,
  },
  autocompleteinnercontainer: {
    backgroundColor: '#ffffff',
    borderColor: '#ffffff',
    borderBottomWidth: 1,
    maxWidth: '85%',
  },
  searchIcon: {
    width: '8%',
    height: '40%',
    tintColor: 'grey',
    position: 'absolute',
    right: '1%',
    marginTop: '3%',
  },
  itemText: {
    fontSize: 15,
    fontWeight: '800',
    marginVertical: '5%',
    color: 'black',
    alignSelf: 'stretch',
    fontFamily: Global_Attributes.fixfontstyle,
  },
  actTitleFlatlist: {
    maxWidth: '100%',
    borderRadius: 0.5,
    shadowColor: 'black',
    shadowOpacity: '100%',
    elevation: '10%',
    paddingTop: '15%',
    paddingBottom: '8%',
  },
  locationView: {
    flex: 1,
    flexDirection: 'row',
    padding: '3%',
  },
  main_view_loc: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    // flexDirection: 'column',
    // width: "25%",
    // marginStart: "4%"
  },
  loc_code_txt: {
    color: '#11246F',
    fontWeight: 'bold',
    fontFamily: Global_Attributes.fixfontstyle,
  },
  loc_code: {
    fontWeight: 'bold',
    color: 'black',

    alignSelf: 'center',
  },
  loc_code1: {
    fontWeight: 'bold',
    color: 'black',
    alignItems: 'center',
    marginLeft: 20,
  },
  sec_main_view: {
    flex: 0,
    flexDirection: 'column',
    backgroundColor: '#000000',
    width: '0.4%',
    height: '100%',
    marginRight: '5%',
  },
  secc_main_view: {
    flex: 2,
    flexDirection: 'column',
  },
  offn_no: {
    color: '#11246F',
    fontWeight: 'bold',
    fontFamily: Global_Attributes.fixfontstyle,
  },
  // formt_txt: {
  //     fontWeight: 'bold',
  //     // alignSelf: 'center'
  // },
  offr_name_view: {
    flex: 1,
  },

  offr_name: {
    color: '#000000',
    padding: '4%',
    fontFamily: Global_Attributes.fixfontstyle,
  },
  main_view_status: {
    flex: 1,
    height: 60,
  },
  view_status: {
    backgroundColor: '#DEE6E1',
    height: 4,
    width: '65%',
    alignSelf: 'center',
    marginTop: '5%',
  },

  first_status: {
    backgroundColor: '#30D20D',
    color: 'white',
    borderRadius: 60 / 2,
    height: 20,
    width: '5.5%',
    textAlign: 'center',
    marginStart: '15%',
    bottom: '20%',
    fontFamily: Global_Attributes.fixfontstyle,
  },
  sec_status: {
    backgroundColor: '#30D20D',
    color: 'white',
    borderRadius: 60 / 2,
    height: 20,
    width: '5.5%',
    textAlign: 'center',
    alignSelf: 'center',
    bottom: '55%',
    fontFamily: Global_Attributes.fixfontstyle,
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
    marginRight: '16%',
    fontFamily: Global_Attributes.fixfontstyle,
  },

  info_txt: {
    color: '#11246F',
    bottom: '80%',
    start: '15%',
    fontSize: 12,
    fontFamily: Global_Attributes.fixfontstyle,
  },
  offn_txt: {
    color: '#11246F',
    bottom: '105%',
    alignSelf: 'center',
    fontSize: 12,
    fontFamily: Global_Attributes.fixfontstyle,
  },
  review_txt: {
    color: '#11246F',
    bottom: '130%',
    start: '76%',
    fontSize: 12,
    fontFamily: Global_Attributes.fixfontstyle,
  },
  mv_view: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: '-2%',
    // backgroundColor:'yellow',
  },

  mvi_view: {
    flex: 1,
    flexDirection: 'column',
    padding: '4%',
    paddingLeft: '8%',
  },

  mvi_txt: {
    justifyContent: 'flex-start',
    textAlign: 'center',
    // paddingLeft:"2%",
    color: '#7B7B7B',
    fontSize: 14,
    fontFamily: Global_Attributes.fixfontstyle,
  },

  colsn_txt: {
    // textAlign: 'center',
    justifyContent: 'center',
    color: '#7B7B7B',
    fontSize: 14,
    fontFamily: Global_Attributes.fixfontstyle,
    // paddingTop: "11%",
  },

  firstCheckbx: {
    marginLeft: '-9%',
  },

  secCheckbx: {
    // justifyContent: 'flex-start',
    marginLeft: '-9%',
  },

  thirdCheckbx: {
    // flexDirection: 'column',
    // justifyContent: 'flex-start'
    marginLeft: '-9%',
  },

  cols_view: {
    flex: 1.3,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: '5%',
  },

  wittn_view: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: '5%',
  },

  atNearView: {
    flex: 1,
    flexDirection: 'row',
    marginTop: '-5%',
  },

  main_text_views: {
    flex: 0.5,
    flexDirection: 'column',
    margin: '3%',
    width: '90%',
  },

  at_txt: {
    flex: 1,
    maxWidth: '50%',
    borderRadius: 0.5,
    shadowColor: 'black',
    backgroundColor: 'white',
    shadowOpacity: '100%',
    elevation: '10%',
    alignSelf: 'flex-start',
    marginLeft: '10%',
  },

  inputAT: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginLeft: '1%',
    fontSize: 12,
    marginEnd: '2%',
    height: 55,
    fontFamily: Global_Attributes.fixfontstyle,
    color: 'black',
  },

  blankTextView: {
    flex: 1,
    flexDirection: 'row',
    marginTop: '-2%',
    height: 60,
  },

  blankTextView1: {
    flex: 0.77,
    flexDirection: 'column',
    marginLeft: '3%',
  },

  blankTextView2: {
    flex: 0.1,
    flexDirection: 'column',
  },

  blankTextView3: {
    flex: 0.1,
    flexDirection: 'column',
  },

  inputTextView: {
    flex: 1,
    flexDirection: 'row',
    marginTop: '-2%',
  },

  inputTextStyle: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginLeft: '2%',
    marginRight: '2%',
    fontSize: 12,
    height: 55,
    fontFamily: Global_Attributes.fixfontstyle,
  },

  inputTextStyleTwo: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginLeft: '1%',
    fontSize: 12,
    marginEnd: '2%',
    height: 60,
    fontFamily: Global_Attributes.fixfontstyle,
  },

  loc_img: {
    height: '55%',
    width: '85%',
    alignSelf: 'flex-end',
    marginTop: '65%',
  },

  refr_img: {
    height: '55%',
    width: '85%',
    alignSelf: 'flex-end',
    marginTop: '65%',
  },

  contrView: {
    flexDirection: 'column',
    height: 55,
    marginTop: '10%',
    marginStart: '4%',
    marginEnd: '2%',
  },

  drpImgStyle: {
    width: '4%',
    height: 12,
    position: 'absolute',
    right: '9%',
    bottom: '100%',
  },

  inputTextcodeView: {
    flex: 1,
    flexDirection: 'row',
    margin: '2%',
    marginTop: '-2%',
  },

  cvorText: {
    paddingLeft: '23%',
    color: '#7B7B7B',
    fontSize: 14,
    fontFamily: Global_Attributes.fixfontstyle,
  },

  nscText: {
    paddingLeft: '25%',
    color: '#7B7B7B',
    fontSize: 14,
    fontFamily: Global_Attributes.fixfontstyle,
  },

  commrText: {
    textAlign: 'center',
    color: '#7B7B7B',
    marginStart: '5%',
    fontSize: 14,
    fontFamily: Global_Attributes.fixfontstyle,
  },

  secCheckboxView: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-start',
  },

  fineBoxView: {
    flexDirection: 'row',
    flex: 1,
    paddingTop: '1%',
    paddingLeft: '1%',
  },

  insidefineBoxView: {
    flexDirection: 'column',
    flex: 0.5,
    justifyContent: 'center',
    margin: '4%',
  },

  insidefineBoxView1: {
    flexDirection: 'column',
    flex: 0.5,
    margin: '4%',
    paddingRight: '1%',
  },

  boxstyle: {
    height: 40,
    width: '100%',
    backgroundColor: '#ffffff',
    marginBottom: '5%',
    fontFamily: Global_Attributes.fixfontstyle,
    alignSelf: 'flex-end',
    color: 'black',
  },

  tnCView: {
    flexDirection: 'row',
    flex: 1,
    marginTop: '2%',
    marginStart: '2%',
    marginEnd: '10%',
  },

  tnCView1: {
    marginStart: '2%',
    marginEnd: '10%',
  },

  tncText: {
    color: 'darkblue',
    fontWeight: 'bold',
    textAlign: 'justify',
    marginTop: '-5%',
    paddingRight: '5%',
  },

  backBtn: {
    backgroundColor: '#CF1043',
    alignSelf: 'flex-start',
    width: '31%',
    margin: '4%',
    borderRadius: 10,
    fontFamily: Global_Attributes.fixfontstyle,
  },

  nxtBtn: {
    backgroundColor: '#30D20D',
    justifyContent: 'flex-end',
    margin: '4%',
    width: '31%',
    marginLeft: '26%',
    borderRadius: 10,
    fontFamily: Global_Attributes.fixfontstyle,
  },
});

export default ponsoffnStyle;
