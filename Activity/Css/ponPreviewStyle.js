import {StyleSheet} from 'react-native';

const previewStyle = StyleSheet.create({

  mainView: {
    backgroundColor: '#DEE6E1',
    flex: 1,
  },

  Scrollview: {
    flex: 1,
    alignSelf: 'center',
    margin: '3%',
    backgroundColor: '#FFFFFF',
  },

  locationView: {
    flex: 1,
    flexDirection: 'row',
    padding: '3%',
  },

  loc_code_view: {
    flex: 1,
    flexDirection: 'column',
  },

  loc_code_text: {
    color: '#11246F',
    fontWeight: 'bold',
  },

  loc_code_no: {
    fontWeight: 'bold',
    justifyContent: 'center',
    textAlign: 'center',
    color: 'black',
  },

  loc_code_no1: {
    fontWeight: 'bold',
    justifyContent: 'center',
    color: 'black',
    marginLeft: '10%',
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
    bottom: 12,
  },
  
  sec_status: {
    backgroundColor: '#30D20D',
    color: 'white',
    borderRadius: 60 / 2,
    height: 20,
    width: '5.5%',
    textAlign: 'center',
    alignSelf: 'center',
    bottom: 32,
  },

  third_status: {
    backgroundColor: '#30D20D',
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

  inputTextStyleView: {
    flex: 1,
    flexDirection: 'row',
  },

  main_text_views: {
    // flex: 0.5,
    // flexDirection: 'column',
    // justifyContent: 'center',
    // marginTop: '-2%',
    flex: 0.5,
    flexDirection: 'column',
    margin: '3%',
    justifyContent: 'center',
  },

  main_text_views1: {
    flex: 0.5,
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: '0%',
  },

  inputTextStyleOne: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginLeft: '2%',
    fontSize: 12,
  },

  inputTextStyleTwo: {
    // flex: 0.4,
    justifyContent: 'flex-start',
    // width: '46%',
    backgroundColor: '#ffffff',
    margin: '3%',
    height: 55,
    fontSize: 12,
  },

  inputTextStyleThree: {
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    margin: '8%',
    height: 55,
    fontSize: 12,
  },

  inputTextStyleView1: {
    flex: 0.33,
    flexDirection: 'column',
    marginTop: '-3%',
  },

  inputTextStyleView2: {
    flex: 0.33,
    flexDirection: 'column',
    marginTop: '-3%',
  },

  inputTextStyleView3: {
    flex: 0.33,
    flexDirection: 'column',
    marginTop: '-3%',
  },

  inputTextStyleThrees: {
    flex: 1,
    backgroundColor: '#ffffff',
    fontSize: 12,
    marginStart: '1%',
    marginEnd: '4%',
  },

  sexStyle: {
    width: '50%',
    marginLeft: '4%',
    flexDirection: 'column',
    marginTop: '14%',
  },

  blankInputTextStyle: {
    flex: 1,
    backgroundColor: '#ffffff',
    top: '-2%',
    marginLeft: '1%',
    marginRight: '4%',
    fontSize: 12,
    // marginBottom: "2%"
  },

  mv_view: {
    flex: 1,
    flexDirection: 'row',
    // marginStart: "4%",
    paddingTop: '8%',
  },

  mvi_view: {
    flexDirection: 'column',
    width: '34%',
    paddingTop: '1%',
  },
  mvi_txt: {
    textAlign: 'center',
    color: '#7B7B7B',
    fontSize: 14,
  },

  cols_view: {
    flexDirection: 'column',
    width: '34%',
    paddingTop: '2.5%',
  },
  colsn_txt: {
    textAlign: 'center',
    color: '#7B7B7B',
    fontSize: 14,
    paddingTop: '11%',
  },

  firstCheckbx: {
    marginStart: '8%',
    flexDirection: 'row',
  },
  secCheckbx: {
    // paddingTop: "0%",
    flexDirection: 'row',
  },
  thirdCheckbx: {
    // paddingTop: "0%",
    marginStart: '18%',
    flexDirection: 'row',
  },

  atNearView: {
    flexDirection: 'row',
    height: 55,
    marginTop: '4%',
    marginStart: '2%',
    marginEnd: '1%',
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
  },
  blankTextView: {
    flex: 1,
    flexDirection: 'row',
    margin: '2%',
    marginTop: '-1%',
    // flexDirection: 'row', height: 55, marginTop: 10, marginStart: 12, marginEnd: 12, bottom: 5
  },

  inputTextcodeView: {
    flex: 1,
    flexDirection: 'row',
    margin: '1%',
    marginTop: '-2%',
  },

  cvorView: {
    flexDirection: 'column',
    height: 55,
    marginTop: '1%',
    marginStart: '2%',
    marginEnd: '4%',
  },
  inputTextStyle: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginLeft: '2%',
    marginRight: '4%',
    fontSize: 12,
    marginBottom: '2%',
  },

  secCheckboxView: {
    flexDirection: 'row',
    flex: 1,
    marginTop: '2%',
    // marginEnd: "10%",
    marginBottom: '2%',
  },
  cvorText: {
    // textAlign: 'center',
    paddingLeft: 10,
    color: '#7B7B7B',
    fontSize: 14,
  },
  // nscText: {
  //     // textAlign: 'center',
  //     color: '#7B7B7B',
  //     paddingLeft:10,
  //     // marginStart: "-7%",
  //     fontSize: 14
  // },
  // commrText: {
  //     // textAlign: 'center',
  //     color: '#7B7B7B',
  //     paddingLeft:10,
  //     // marginStart: "5%",
  //     fontSize: 14,
  // },

  inputTextcodeVieww: {
    flexDirection: 'column',
    height: 55,
    marginTop: '-2%',
    marginStart: '2%',
    marginEnd: '4%',
  },
  inputTextStylee: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginLeft: '2%',
    marginRight: '2%',
    fontSize: 12,
    marginEnd: '1%',
  },

  fineBoxView: {
    flexDirection: 'row',
    flex: 1,
    // marginTop: "5%",
    justifyContent: 'center',
    // marginBottom: "5%"
  },
  insidefineBoxView: {
    flexDirection: 'column',
    flex: 0.5,
    justifyContent: 'center',
    margin: '4%',
    // marginStart: "4%",
    // marginEnd: "4%"
  },
  insidefineBoxView1: {
    flexDirection: 'column',
    flex: 0.5,
    margin: '4%',
    paddingRight: '1%',
    // marginStart: "4%",
    // marginEnd: "4%"
  },
  boxstyle: {
    height: 40,
    width: '100%',
    backgroundColor: '#ffffff',
    marginBottom: '5%',
    alignSelf: 'flex-end',
  },

  btnView: {
    flex: 1,
    flexDirection: 'row',
  },

  btnView1: {
    flex: 1,
    flexDirection: 'row',
    bottom: '2%',
  },
  insideBtnView1: {
    flex: 0.5,
    flexDirection: 'column',
  },
  // insideBtnView2:{
  //     flex:0.5,
  //     flexDirection:'column',

  // },

  editBtn: {
    backgroundColor: '#CF1043',
    alignSelf: 'flex-start',
    width: '90%',
    margin: '6%',
    height: 40,
    borderRadius: 10,
  },
  insideBtnView: {
    flexDirection: 'row',
    marginTop: '3%',
  },
  warBtn: {
    backgroundColor: '#f4c20d',
    margin: '6%',
    justifyContent: 'center',
    width: '90%',
    height: 40,
    borderRadius: 10,
  },
  tckBtn: {
    backgroundColor: '#30D20D',
    justifyContent: 'center',
    width: '90%',
    height: 40,
    borderRadius: 10,
    margin: '6%',
    marginLeft: '1%',
  },
  warBtntxt: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
  bottomView: {
    flex: 0.1,
  },
  // tckBtntxt:{
  //     textAlign: 'center', color: '#FFFFFF', fontWeight: 'bold', fontSize: 13
  // },
});

export default previewStyle;
