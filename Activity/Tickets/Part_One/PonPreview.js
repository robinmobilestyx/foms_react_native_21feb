import React, {Component} from 'react';
import Global_Attributes from '../../../Utility/Global_Attributes';
import TicketsModulesApi from '../../Controller/TicketsModulesApi';

import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
  Picker,
} from 'react-native';

import CheckBox from 'react-native-checkbox-animated';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {RadioButton, TextInput, Button} from 'react-native-paper';
import DashboardFooter from '../../Dashboard/DashboardFooter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import packageJson from '../../../package.json';
import previewStyle from '../../Css/ponPreviewStyle';
import ponstyle from '../../Css/PonInfoStyle';
import Loader from '../../Dashboard/Loader';


export default class PonPreview extends Component {

  constructor(props) {
    super(props);
    this.generatePon = this.generatePon.bind(this);
    this.back = this.back.bind(this);
    this.state = {
      motorInvolved: null,
      collision: null,
      withnesses: null,
      cvor: null,
      nsc: null,
      commercial: null,
      loading: Global_Attributes.loading,
      isLoading: Global_Attributes.loading,
    };
  }

  back = () => {
    this.props.navigation.navigate('PonInfo');
  };

  generatePon = async (url, type) => {

    Global_Attributes.loading = true;
    this.setState({isLoading: true});
    const DATE = new Date();
    let hours = DATE.getHours();
    let am_pm = hours >= 12 ? 'PM' : 'AM';
    if (hours > 12) {
      hours -= 12;
    } else if (hours == '00') {
      hours = 12;
    }

    const CURR_TIME = hours + ':' + DATE.getMinutes() + ' ' + am_pm;
    const CURR_DATE =
      DATE.getFullYear() + '/' + (DATE.getMonth() + 1) + '/' + DATE.getDate();
    console.log('ticket' + Global_Attributes.PonOneBean['offenceNumber']);
    const OFFENCE_NUMBER = Global_Attributes.PonOneBean['offenceNumber'];
    const DEVICE_ID = DeviceInfo.getDeviceId();
    const USER_NAME = await AsyncStorage.getItem('userName');
    const PHONE_NUMBER = await AsyncStorage.getItem('phoneNumber');
    const USER = Global_Attributes.User;
    const PASS = Global_Attributes.Pass;

    var splashBody = {
      user: USER,
      pass: PASS,
      offence_no: OFFENCE_NUMBER,
      location_code: Global_Attributes.PonOneBean['locationCode'],
      curr_date: Global_Attributes.PonOneBean['date'],
      curr_time: Global_Attributes.PonOneBean['time'],
      family: Global_Attributes.PonOneBean['family'],
      given: Global_Attributes.PonOneBean['given'],
      initials: Global_Attributes.PonOneBean['initials'],
      street_no: Global_Attributes.PonOneBean['street'],
      municipality: Global_Attributes.PonOneBean['municipality'],
      po: Global_Attributes.PonOneBean['po'],
      province: Global_Attributes.PonOneBean['province'],
      postal_code: Global_Attributes.PonOneBean['postl'],
      licence_no: Global_Attributes.PonOneBean['lisenceNumber'],
      juris: Global_Attributes.PonOneBean['juris'],
      dob: Global_Attributes.PonOneBean['dob'],
      rad: Global_Attributes.PonOneBean['gender'],
      vehicle_involvement: Global_Attributes.PonOneBean['motorInvolved']
        ? 'Y'
        : 'N',
      witness: Global_Attributes.PonOneBean['withnesses'] ? 'Y' : 'N',
      collision_involve: Global_Attributes.PonOneBean['collision'] ? 'Y' : 'N',
      line1: Global_Attributes.PonOneBean['atOne'],
      line2: Global_Attributes.PonOneBean['atTwo'],
      near: Global_Attributes.PonOneBean['atTwo'],
      area: Global_Attributes.PonOneBean['atThree'],
      contr_to: Global_Attributes.PonOneBean['contrary'],
      speeding: Global_Attributes.PonOneBean['speeding'] ? 'Y' : 'N',
      km_over: Global_Attributes.PonOneBean['km_over'],
      schedule: Global_Attributes.PonOneBean['schedule'],
      actual_speed: Global_Attributes.PonOneBean['speedActual'],
      speed_limit: Global_Attributes.PonOneBean['speedLimit'],
      speed_over_limit: Global_Attributes.PonOneBean['chargedSpeed'],
      schedule_selected: Global_Attributes.PonOneBean['schedule'],
      speeding_zone: Global_Attributes.PonOneBean['schld2Rb'],
      did_comm: Global_Attributes.PonOneBean['didCommit'],
      sect: Global_Attributes.PonOneBean['sect'],
      plate_no: Global_Attributes.PonOneBean['plateNumber'],
      juris2: Global_Attributes.PonOneBean['juris'],
      code: Global_Attributes.PonOneBean['code'],
      commercial_stat: Global_Attributes.PonOneBean['commercial'] ? 'Y' : 'N',
      nsc: Global_Attributes.PonOneBean['nsc'] ? 'Y' : 'N',
      cvor: Global_Attributes.PonOneBean['cvor'] ? 'Y' : 'N',
      cvor_no: Global_Attributes.PonOneBean['covrNumer'],
      set_fine: Global_Attributes.PonOneBean['fine'],
      total_pay: Global_Attributes.PonOneBean['payable'],
      issued_date: Global_Attributes.PonOneBean['issuedDate'],
      uname: USER_NAME,
      mobile_no: PHONE_NUMBER,
      device_name: DEVICE_ID,
      device_version: packageJson.version,
      imei_no: DEVICE_ID,
      service_date: CURR_DATE,
      state: Global_Attributes.gpsAddress['gpsState'],
      pincode: Global_Attributes.gpsAddress['gpsPincode'],
      lat: Global_Attributes.PonOneBean['lat'],
      long: Global_Attributes.PonOneBean['long'],
      ticketState: Global_Attributes.gpsAddress['gpsState'],
      ticketDist: Global_Attributes.PonOneBean['gpsDistrict'],
      ticketCity: Global_Attributes.PonOneBean['gpsCity'],
      act_title: Global_Attributes.PonOneBean['didCommit'],
      titel_parent: Global_Attributes.PonOneBean['contrary'],
    };

    new TicketsModulesApi().api_call(splashBody, this.props, type, url);
    // Global_Attributes.loading= true;
  };

  render() {

    const {navigation} = this.props;

    return (
      <SafeAreaView style={previewStyle.mainView}>
        <ScrollView style={previewStyle.Scrollview}>

          <View style={previewStyle.locationView}>

            <View style={previewStyle.loc_code_view}>
              <Text style={previewStyle.loc_code_text}>Location Code</Text>
              <Text style={previewStyle.loc_code_no}>
                {Global_Attributes.PonOneBean['locationCode']}
              </Text>
            </View>

            <View style={previewStyle.offn_views}></View>

            <View style={previewStyle.offn_view}>
              <Text style={previewStyle.loc_code_text}>Offence Number</Text>
              <Text style={previewStyle.loc_code_no1}>
                {Global_Attributes.PonOneBean['formatted']}
              </Text>
            </View>

          </View>

          <View style={previewStyle.offr_name_view}>
            <Text style={previewStyle.offr_name}>
              Officer Name : {Global_Attributes.PonOneBean['officerName']}
            </Text>
          </View>

          <View style={{flex: 1, height:60}}>

            <View style={previewStyle.view_status}></View>
            <Text style={previewStyle.first_status}>1</Text>
            <Text style={previewStyle.sec_status}>2</Text>
            <Text style={previewStyle.third_status}>3</Text>

            <Text
              style={{
                color: '#11246F',
                bottom: '80%',
                start: '23%',
                fontSize: 12,
              }}>
              Info
            </Text>

            <Text
              style={{
                color: '#11246F',
                bottom: '105%',
                alignSelf: 'center',
                fontSize: 12,
              }}>
              Offence
            </Text>

            <Text
              style={{
                color: '#11246F',
                bottom: '130%',
                start: '68%',
                fontSize: 12,
              }}>
              Review
            </Text>

          </View>

          <View style={previewStyle.inputTextStyleView}>

            <View style={previewStyle.main_text_views}>
              <TextInput
                style={previewStyle.inputTextStyleTwo}
                value={Global_Attributes.PonOneBean['date']}
                editable={false}
                label="DATE"
                underlineColor={'#7B7B7B'}>
              </TextInput>
              <Image
                source={require('../../assets/ic_menu_my_calendar.png')}
                style={{
                  width: 35,
                  height: 35,
                  position: 'absolute',
                  left: 130,
                  bottom: 2,
                }}
              />
            </View>

            <View style={previewStyle.main_text_views1}>
              <TextInput
                style={previewStyle.inputTextStyleTwo}
                value={Global_Attributes.PonOneBean['time']}
                editable={false}
                label="TIME"
                underlineColor={'#7B7B7B'}></TextInput>
              <Image
                source={require('../../assets/ic_menu_my_calendar.png')}
                style={{
                  width: 35,
                  height: 35,
                  position: 'absolute',
                  left: 120,
                  bottom: 12,
                }}
              />
            </View>

          </View>

          <View style={previewStyle.inputTextStyleView}>

            <View style={previewStyle.inputTextStyleView1}>
              <TextInput
                style={previewStyle.inputTextStyleThree}
                editable={false}
                value={Global_Attributes.PonOneBean['family']}
                label="FAMILY*"
                underlineColor={'#7B7B7B'}>
              </TextInput>
            </View>

            <View style={previewStyle.inputTextStyleView2}>
              <TextInput
                style={previewStyle.inputTextStyleThree}
                editable={false}
                label="GIVEN"
                underlineColor={'#7B7B7B'}
                value={Global_Attributes.PonOneBean['given']}></TextInput>
            </View>

            <View style={previewStyle.inputTextStyleView3}>
              <TextInput
                style={previewStyle.inputTextStyleThree}
                editable={false}
                label="INITIALS"
                underlineColor={'#7B7B7B'}
                value={Global_Attributes.PonOneBean['initials']}></TextInput>
            </View>

          </View>

          <View style={previewStyle.inputTextStyleView}>
            <View style={previewStyle.main_text_views}>
              <TextInput
                style={previewStyle.inputTextStyleTwo}
                editable={false}
                value={Global_Attributes.PonOneBean['street']}
                label="NUMBER AND STREET"
                underlineColor={'#7B7B7B'}></TextInput>
            </View>
            <View style={previewStyle.main_text_views1}>
              <TextInput
                style={previewStyle.inputTextStyleTwo}
                editable={false}
                label="MUNCIPALITY"
                underlineColor={'#7B7B7B'}
                value={Global_Attributes.PonOneBean['muncipality']}></TextInput>
            </View>
          </View>

          <View style={previewStyle.inputTextStyleView}>
            <View style={previewStyle.inputTextStyleView1}>
              <TextInput
                style={previewStyle.inputTextStyleThree}
                editable={false}
                value={Global_Attributes.PonOneBean['po']}
                label="PO"
                underlineColor={'#7B7B7B'}></TextInput>
            </View>
            <View style={previewStyle.inputTextStyleView2}>
              <TextInput
                style={previewStyle.inputTextStyleThree}
                editable={false}
                value={Global_Attributes.PonOneBean['province']}
                label="PROVINCE"
                underlineColor={'#7B7B7B'}></TextInput>
            </View>
            <View style={previewStyle.inputTextStyleView3}>
              <TextInput
                style={previewStyle.inputTextStyleThree}
                editable={false}
                value={Global_Attributes.PonOneBean['postl']}
                label="POSTAL CODE"
                underlineColor={'#7B7B7B'}></TextInput>
            </View>
          </View>

          <View style={previewStyle.inputTextStyleView}>
            <View style={previewStyle.main_text_views}>
              <TextInput
                style={previewStyle.inputTextStyleTwo}
                editable={false}
                value={Global_Attributes.PonOneBean['lisenceNumber']}
                label="DRIVERS LICENSE NUMBER"
                underlineColor={'#7B7B7B'}></TextInput>
            </View>
            <View style={previewStyle.main_text_views1}>
              <TextInput
                style={previewStyle.inputTextStyleTwo}
                editable={false}
                value={Global_Attributes.PonOneBean['juris']}
                // theme={{ colors: { text: "#11246F",} }}
                label="JURIS"
                underlineColor={'#7B7B7B'}></TextInput>
            </View>
          </View>
          <View style={previewStyle.inputTextStyleView}>
            <View style={previewStyle.main_text_views}>
              <TextInput
                style={previewStyle.inputTextStyleTwo}
                editable={false}
                value={Global_Attributes.PonOneBean['dob']}
                label="DATE OF BIRTH"
                underlineColor={'#7B7B7B'}></TextInput>
              <Image
                source={require('../../assets/ic_menu_my_calendar.png')}
                style={{
                  width: 35,
                  height: 35,
                  position: 'absolute',
                  left: 140,
                  bottom: 4,
                }}
              />
            </View>

            <View style={previewStyle.main_text_views1}>
              <View style={previewStyle.sexStyle}>
                <Text style={{fontSize: 12, color: '#7B7B7B'}}>SEX*</Text>
                <Text style={{fontSize: 18, color: '#7B7B7B'}}>
                  {Global_Attributes.PonOneBean['gender']}
                </Text>
              </View>
            </View>
          </View>
          <View style={previewStyle.mv_view}>
            <View style={previewStyle.mvi_view}>
              <Text style={previewStyle.mvi_txt}>Motor Vehicle Involved</Text>
              <View style={previewStyle.firstCheckbx}>
                <View pointerEvents="none" style={{flex: 1}}>
                  <CheckBox
                    checked={Global_Attributes.PonOneBean['motorInvolved']}
                    // style={{ marginStart: 30, marginTop: 10 }}
                    unCheckedBorderColor={'#7B7B7B'}
                    checkedBackgroundColor={'#7B7B7B'}
                    checkedBorderColor={'#7B7B7B'}
                    borderWidth={2}
                    checkMarkColor={'white'}
                    checkMarkSize={18}
                    animationType={'left'}
                    size={18}
                    rippleEffect={false}
                    label="NO"
                    labelStyle={{
                      color: '#7B7B7B',
                      marginLeft: '-10%',
                    }}></CheckBox>
                </View>
                {/* <Text style={{ paddingTop: "8%", color: '#7B7B7B' }}>No</Text> */}
              </View>
            </View>

            <View style={previewStyle.cols_view}>
              <Text style={previewStyle.colsn_txt}>Collision Involved</Text>
              <View style={previewStyle.secCheckbx}>
                <View pointerEvents="none" style={{flex: 1}}>
                  <CheckBox
                    checked={Global_Attributes.PonOneBean['collision']}
                    // style={{ marginStart: 30, marginTop: 20 }}
                    unCheckedBorderColor={'#7B7B7B'}
                    checkedBackgroundColor={'#7B7B7B'}
                    checkedBorderColor={'#7B7B7B'}
                    borderWidth={2}
                    checkMarkColor={'white'}
                    checkMarkSize={18}
                    animationType={'left'}
                    size={18}
                    rippleEffect={false}
                    label="YES"
                    labelStyle={{
                      color: '#7B7B7B',
                      marginLeft: '-10%',
                    }}></CheckBox>
                </View>
                {/* <Text style={{ paddingTop: "8%", color: '#7B7B7B' }}>No</Text> */}
              </View>
            </View>
            
            <View style={previewStyle.cols_view}>
              <Text style={previewStyle.colsn_txt}>Witnesses</Text>
              <View style={previewStyle.thirdCheckbx}>
                <View pointerEvents="none" style={{flex: 1}}>
                  <CheckBox
                    checked={Global_Attributes.PonOneBean['withnesses']}
                    // style={{ marginStart: 30, marginTop: 10 }}
                    unCheckedBorderColor={'#7B7B7B'}
                    checkedBackgroundColor={'#7B7B7B'}
                    checkedBorderColor={'#7B7B7B'}
                    borderWidth={2}
                    checkMarkColor={'white'}
                    checkMarkSize={18}
                    animationType={'left'}
                    size={18}
                    rippleEffect={false}
                    label="YES"
                    labelStyle={{
                      color: '#7B7B7B',
                      marginLeft: '-10%',
                    }}></CheckBox>
                </View>
                {/* <Text style={{ paddingTop: "8%", color: '#7B7B7B' }}>No</Text> */}
              </View>
            </View>
          </View>

          <View style={previewStyle.inputTextStyleView}>

            <View style={previewStyle.main_text_views}>
              <TextInput
                style={previewStyle.inputTextStyleTwo}
                editable={false}
                label="AT*"
                underlineColor={'#7B7B7B'}
                value={Global_Attributes.PonOneBean['atOne']}></TextInput>
            </View>

            <View style={previewStyle.main_text_views1}>
              <TextInput
                style={previewStyle.inputTextStyleTwo}
                editable={false}
                label="NEAR"
                underlineColor={'#7B7B7B'}
                value={Global_Attributes.PonOneBean['atTwo']}></TextInput>
            </View>

          </View>

          <View style={previewStyle.blankTextView}>
            <TextInput
              style={previewStyle.blankInputTextStyle}
              editable={false}
              underlineColor={'#7B7B7B'}
              value={Global_Attributes.PonOneBean['atThree']}></TextInput>
          </View>

          <View style={previewStyle.inputTextcodeView}>
            <TextInput
              style={previewStyle.inputTextStyle}
              editable={false}
              label="CONTRARY TO"
              underlineColor={'#7B7B7B'}
              value={Global_Attributes.PonOneBean['contrary']}></TextInput>
          </View>
          <View style={previewStyle.inputTextcodeView}>
            <TextInput
              style={previewStyle.inputTextStyle}
              editable={false}
              label="DID COMMIT"
              underlineColor={'#7B7B7B'}
              value={Global_Attributes.PonOneBean['didCommit']}></TextInput>
          </View>
         
          <View style={previewStyle.inputTextcodeView}>
            <TextInput
              style={previewStyle.inputTextStyle}
              editable={false}
              label="SECT"
              underlineColor={'#7B7B7B'}
              value={Global_Attributes.PonOneBean['sect']}>
            </TextInput>
          </View>

          <View style={previewStyle.inputTextStyleView}>

            <View style={previewStyle.main_text_views}>
              <TextInput
                style={previewStyle.inputTextStyleTwo}
                editable={false}
                label="PLATE NUMBER"
                underlineColor={'#7B7B7B'}
                value={Global_Attributes.PonOneBean['plateNumber']}>
              </TextInput>
            </View>

            <View style={previewStyle.main_text_views}>
              <TextInput
                style={previewStyle.inputTextStyleTwo}
                editable={false}
                label="JURIS"
                underlineColor={'#7B7B7B'}
                value={Global_Attributes.PonOneBean['juris']}>
              </TextInput>
            </View>

          </View>

          <View style={previewStyle.inputTextcodeView}>
            <TextInput
              style={previewStyle.inputTextStyle}
              editable={false}
              label="CODE"
              underlineColor={'#7B7B7B'}
              value={Global_Attributes.PonOneBean['code']}></TextInput>
          </View>

          <View style={previewStyle.secCheckboxView}>
            <View
              style={{
                flexDirection: 'column',
                flex: 1.2,
                paddingLeft: '4%',
                marginTop: '5%',
              }}>
              <Text style={previewStyle.cvorText}>CVOR</Text>
              {/* <View style={{ marginStart: "25%", flexDirection: 'row' }}> */}
              <View pointerEvents="none">
                <CheckBox
                  checked={Global_Attributes.PonOneBean['cvor']}
                  // style={{ marginStart: 30, marginTop: 20 }}
                  unCheckedBorderColor={'#7B7B7B'}
                  checkedBackgroundColor={'#7B7B7B'}
                  checkedBorderColor={'#7B7B7B'}
                  borderWidth={2}
                  checkMarkColor={'white'}
                  checkMarkSize={18}
                  animationType={'left'}
                  size={18}
                  rippleEffect={false}
                  label="YES"
                  labelStyle={{color: '#7B7B7B'}}></CheckBox>
                {/* </View> */}
                {/* <Text style={{ paddingTop: "8%", color: '#7B7B7B' }}>Yes</Text> */}
              </View>
            </View>
            <View style={{flexDirection: 'column', flex: 1.2, marginTop: '5%'}}>
              <Text style={previewStyle.cvorText}>NSC</Text>
              {/* <View style={{ marginStart: "25%", flexDirection: 'row' }}> */}
              <View pointerEvents="none">
                <CheckBox
                  checked={Global_Attributes.PonOneBean['nsc']}
                  // style={{ marginStart: 30, marginTop: 20 }}
                  unCheckedBorderColor={'#7B7B7B'}
                  checkedBackgroundColor={'#7B7B7B'}
                  checkedBorderColor={'#7B7B7B'}
                  borderWidth={2}
                  checkMarkColor={'white'}
                  checkMarkSize={18}
                  animationType={'left'}
                  size={18}
                  rippleEffect={false}
                  label="YES"
                  labelStyle={{color: '#7B7B7B'}}></CheckBox>
                {/* </View> */}
                {/* <Text style={{ paddingTop: "8%", color: '#7B7B7B' }}>Yes</Text> */}
              </View>
            </View>
            <View style={{flexDirection: 'column', flex: 1.2, marginTop: '5%'}}>
              <Text style={previewStyle.cvorText}>Commercial</Text>
              {/* <View style={{ marginStart: "10%", flexDirection: 'row' }}> */}
              <View pointerEvents="none" style={{}}>
                <CheckBox
                  checked={Global_Attributes.PonOneBean['commercial']}
                  // style={{ marginStart: 30, marginTop: 20 }}
                  unCheckedBorderColor={'#7B7B7B'}
                  checkedBackgroundColor={'#7B7B7B'}
                  checkedBorderColor={'#7B7B7B'}
                  borderWidth={2}
                  checkMarkColor={'white'}
                  checkMarkSize={18}
                  animationType={'left'}
                  size={18}
                  rippleEffect={false}
                  label="YES"
                  labelStyle={{color: '#7B7B7B'}}></CheckBox>
                {/* </View> */}
                {/* <Text style={{ paddingTop: "8%", color: '#7B7B7B' }}>Yes</Text> */}
              </View>
            </View>
          </View>
          {Global_Attributes.PonOneBean['cvor'] ||
          Global_Attributes.PonOneBean['nsc'] ? (
            <View style={previewStyle.inputTextcodeView}>
              <TextInput
                style={previewStyle.inputTextStyle}
                label="CVOR/NSC Number*"
                underlineColor={'#7B7B7B'}
                editable={false}
                value={Global_Attributes.PonOneBean['covrNumer']}></TextInput>
            </View>
          ) : null}

          <View style={previewStyle.fineBoxView}>
            <View style={previewStyle.insidefineBoxView}>
              <Text style={{color: '#7B7B7B', fontSize: 12}}>SET FINE OF*</Text>
              <TextInput
                editable={false}
                mode="outlined"
                outlineColor="#11246F"
                selectionColor={'#7B7B7B'}
                style={previewStyle.boxstyle}
                value={Global_Attributes.PonOneBean['fine']}></TextInput>
            </View>
            <View style={previewStyle.insidefineBoxView1}>
              <Text style={{color: '#7B7B7B', fontSize: 12}}>
                TOTAL PAYABLE*
              </Text>
              <TextInput
                editable={false}
                mode="outlined"
                outlineColor="#11246F"
                selectionColor={'#7B7B7B'}
                style={previewStyle.boxstyle}
                value={Global_Attributes.PonOneBean['payable']}></TextInput>
            </View>
          </View>

          <View style={previewStyle.btnView}>
            <View style={previewStyle.insideBtnView1}>
              <Button
                mode="contained"
                style={previewStyle.editBtn}
                onPress={() => {
                  this.back();
                }}>
                EDIT
              </Button>
            </View>
            <View style={previewStyle.insideBtnView1}></View>
          </View>

          <View style={previewStyle.btnView1}>
            <View style={previewStyle.insideBtnView1}>
              <TouchableOpacity
                style={previewStyle.warBtn}
                onPress={() => {
                  this.generatePon(Global_Attributes.warningtick, 'warning');
                }}>
                <Text style={previewStyle.warBtntxt}>GENERATE WARNINGS</Text>
              </TouchableOpacity>
            </View>

            <View style={previewStyle.insideBtnView1}>
              <TouchableOpacity
                style={previewStyle.tckBtn}
                onPress={() => {
                  this.generatePon(Global_Attributes.submitPon, 'PonInfo');
                }}>
                <Text style={previewStyle.warBtntxt}>GENERATE TICKET</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <View style={previewStyle.bottomView}>
          <DashboardFooter
            navigation={navigation}
            style={{position: 'absolute', bottom: 0}}
          />
          <Loader loading={this.state.loading} />
        </View>
      </SafeAreaView>
    );
  }
}
