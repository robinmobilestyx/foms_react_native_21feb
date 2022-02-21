import React, {Component} from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
  StyleSheet,
  Modal,
  Alert,
  Button,
  PermissionsAndroid,
  Linking,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Ticketsuser from '../assets/userspeaks.png';
import Mic from '../assets/mic.png';
import Checkbox from 'react-native-checkbox-animated';
import TicketsComponentStyle from '../Css/TicketsComponentStyle';
import TicketsStyle from '../Css/TicketsStyle';
import Global_Attributes from '../../Utility/Global_Attributes';
import {ReportsController} from '../Controller/ReportsController';
import Voice from '@react-native-community/voice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {request, PERMISSIONS, RESULTS, check} from 'react-native-permissions';
import Loader from '../Dashboard/Loader';

const PLATEFORM_RECORD_AUDIO_PERMISSION = {
  ios: PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL,
  android: PERMISSIONS.ANDROID.RECORD_AUDIO,
};
const REQUEST_PERMISSION_TYPE = {
  record_audio: PLATEFORM_RECORD_AUDIO_PERMISSION,
};

const PERMISSION_TYPE = {
  record_audio: 'record_audio',
};

class PonReports extends Component {
  constructor(props) {
    super(props);

    Voice.onSpeechResults = this.onSpeechResults;

    this.state = {
      Alert_Visibility: false,
      Cancel_Roadside: false,
      colorId: 0,
      onPress: 0,
      currentIndex: '1',
      searchVal: '',
      results: [],
      partialResults: [],
      placeholder: 'Tap to Speak',
      newresults: '',
      ticket_no: [],
      pon_id: '',
      check: false,
      remarks: '',
      newtickets: {},
      count: 1,
      status: '',
    };
  }

  checkPermission = async type => {
    const permission = REQUEST_PERMISSION_TYPE[type][Platform.OS];
    if (!permission) {
      return true;
    }
    try {
      const result = await check(permission);
      console.log('permission check = ', result);
      if (result === RESULTS.GRANTED) {
        this.setState({status: 'granted'});
        await AsyncStorage.setItem('status', 'granted');
        return true;
      } else if (result === RESULTS.BLOCKED) {
        Alert.alert(
          'Permissions Required ',
          'Required permisssion(s) have been set not to ask agian! Please provide them from settings',
          [
            {text: 'Cancel'},
            {text: 'SETTING', onPress: () => this.OpenSetting()},
          ],
        );
        await AsyncStorage.setItem('status', '');
        return true;
      } else if (result === RESULTS.UNAVAILABLE) {
        Alert.alert(
          'Alert ! ',
          'This feature is not supported to this Smartphone',
        );
        return true;
      } else {
        this.requestPermission(permission);
      }
    } catch (error) {
      console.log(error);
    }
  };

  requestPermission = async permission => {
    try {
      const result = await request(permission);
      console.log('permission request', result);
      if (result === RESULTS.DENIED) {
        this.setState({status: 'denied'});
        Alert.alert(
          'Permissions Required ',
          'Audio permission is required to use this feature !',
          [
            {text: 'Cancel'},
            {text: 'Ok', onPress: () => this.setState({status: 'blocked'})},
          ],
        );
        await AsyncStorage.setItem('status', '');
        return true;
      }

      return result === RESULTS.GRANTED;
    } catch (error) {
      console.log('App permission result fail ' + error);
      return false;
    }
  };

  // Open Settings for app permission
  OpenSetting = async () => {
    Linking.openSettings();
    await AsyncStorage.setItem('status', 'granted');
  };

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }

  checkBoxChanged() {
    if (this.state.check == true) {
      this.setState({check: false});
    } else {
      this.setState({check: true});
    }
  }

  Show_Custom_Alert(visible, pon_id, ticket_no) {
    this.setState({
      Alert_Visibility: visible,
      pon_id: pon_id,
      ticket_no: ticket_no,
    });
  }

  submit_addnotes_Button = () => {
    if (this.state.results == '') {
      Alert.alert('Alert !', 'Please enter text.');
    } else {
      var user = Global_Attributes.User;
      var pass = Global_Attributes.Pass;
      var pon_id = this.state.pon_id;
      var ticket_no = this.state.ticket_no;
      var notes = this.state.results;
      console.log('Submit notes ' + notes);

      let addnotes = {
        user: user,
        pass: pass,
        pon_id: pon_id + ' ' + ticket_no,
        notes: notes,
      };

      new ReportsController().uploadNotes(
        addnotes,
        this.props,
        'PonReports',
        Global_Attributes.RSUploadNotes,
      );
      this.setState({Alert_Visibility: false, results: ''});
    }
  };

  oncancel_notes_Btn = async () => {
    this.setState({
      Alert_Visibility: false,
      placeholder: 'Tap to Speak',
      colorId: 0,
      status: '',
    });
    this._cancelRecognizing();
    this._destroyRecognizer();
    this._stopRecognizing();
  };

  Show_Cancel_Roadeside_Alert = (visible, ticket_no, id) => {
    this.setState({Cancel_Roadside: visible, ticket_no: ticket_no});
  };

  submit_cancelroadside_Button = () => {
    console.log('checkbox status:', this.state.check);

    if (this.state.remarks == '') {
      Alert.alert('Alert !', 'Please enter text.');
    } else if (this.state.check == false) {
      Alert.alert('Alert !', 'Please Check the box to continue.');
    } else {
      var user = Global_Attributes.User;
      var pass = Global_Attributes.Pass;
      var ticket_no = this.state.ticket_no;
      var status_change_reason = this.state.remarks;
      var newtickets = this.state.newtickets;

      let addremark = {
        user: user,
        pass: pass,
        ticket_no: ticket_no,
        status_change_reason: status_change_reason,
      };

      new ReportsController().CancelRoadSide(
        addremark,
        this.props,
        'PonReports',
        Global_Attributes.RSCancelRoadSide,
      );

      this.setState({Cancel_Roadside: false, remarks: '', check: ''});

      newtickets[`${ticket_no}`] = true;
      // console.log(newtickets)
    }
  };

  oncancel_addremark_Btn = () => {
    this.setState({Cancel_Roadside: false, remarks: ''});
  };

  // Voice Library Methods
  onSpeechResults = e => {
    let text = e.value[0];
    this.setState({
      results: this.state.results.concat(this.state.newresults) + text + '.',
      colorId: 0,
    });
  };

  _startRecognizing = async () => {
    this.checkPermission(PERMISSION_TYPE.record_audio);

    const status = await AsyncStorage.getItem('status');
    if (status == 'granted') {
      this.setState({
        placeholder: 'Listening...',
        newresults: this.state.results,
        results: [],
        colorId: 1,
      });
      try {
        await Voice.start('en-IN');
      } catch (e) {
        console.error(e);
      }
    }
  };

  _stopRecognizing = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  _cancelRecognizing = async () => {
    try {
      await Voice.cancel();
    } catch (e) {
      console.error(e);
    }
  };

  _destroyRecognizer = async () => {
    try {
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }
    this.setState({
      recognized: '',
      pitch: '',
      error: '',
      started: '',
      results: [],
      partialResults: [],
      end: '',
    });
  };

  NextBtn = async () => {
    this.setState({count: this.state.count + 1, searchVal: ''});
    this.Search_btn();
  };

  PrevBtn = () => {
    this.setState({count: this.state.count - 1, searchVal: ''});
    this.Search_btn();
  };

  Search_btn = async () => {

    var user = Global_Attributes.User;
    var pass = Global_Attributes.Pass;
    var Username = await AsyncStorage.getItem('userName');
    var currentIndex = this.state.count;
    var searchVal = this.state.searchVal;

    console.log('currentIndex ' + this.state.count);
    console.log('Search Value ' + searchVal);

    let ticketBody = {
      user: user,
      pass: pass,
      index: currentIndex,
      uname: Username,
      search_val: searchVal,
    };

    new ReportsController().getTicketDetails(
      ticketBody,
      this.props,
      'PonReports',
      Global_Attributes.RSGetTicketDetails,
    );

  };

  render() {

    const ticketObj = this.props.route.params.TicketData;
    const Length = this.props.route.params.Length;
    const Ticket_Index = ticketObj['index_text'];
    const Previous_Index = ticketObj['previous_index'];
    const Next_Index = ticketObj['next_index'];
    var output = [];

    // console.log("Length:"+tickets);

    if (Length == 1) {
      alert('no data');
    } else {
      
      for (let i = 0; i < Length; i++) {
        Global_Attributes.TicketId = ticketObj['ticket_no' + i];
        Global_Attributes.Name =
          ticketObj['fname' + i + 'lname' + i + 'mname' + i];
        Global_Attributes.Date = ticketObj['form_date' + i];
        Global_Attributes.HoldStatus = ticketObj['hold_status' + i];

        var TempItem = (
          <View key={i} style={{flex: 1}}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
                marginStart: 10,
                marginEnd: 10,
              }}>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: 'bold',
                  flex: 1,
                  color: 'black',
                }}>
                {Global_Attributes.TicketId}{' '}
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: 'bold',
                  flex: 1,
                  textAlign: 'right',
                  color: 'black',
                }}>
                {Global_Attributes.Date}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 16,
                marginStart: 10,
                marginEnd: 10,
              }}>
              <Text style={{fontSize: 17, flex: 1, color: 'black'}}>
                {Global_Attributes.Name}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  this.Show_Custom_Alert(
                    true,
                    ticketObj['pon_id' + i],
                    ticketObj['ticket_no' + i],
                  );
                }}
                style={{alignSelf: 'flex-end'}}>
                <Image
                  source={Ticketsuser}
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: '#d50b16',
                    alignSelf: 'flex-end',
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', alignSelf: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Print', {
                    url: ticketObj['offender_copy' + i],
                    module: 'Reports',
                  });
                }}
                style={TicketsComponentStyle.offender_officer_court_button}>
                <Text
                  style={
                    TicketsComponentStyle.offender_officer_court_button_text
                  }>
                  OFFENDER
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Print', {
                    url: ticketObj['OfficerPonPdf' + i],
                    module: 'Reports',
                  });
                }}
                style={TicketsComponentStyle.offender_officer_court_button}>
                <Text
                  style={
                    TicketsComponentStyle.offender_officer_court_button_text
                  }>
                  OFFICER
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Print', {
                    url: ticketObj['CourtPonPdf' + i],
                    module: 'Reports',
                  });
                }}
                style={TicketsComponentStyle.offender_officer_court_button}>
                <Text
                  style={
                    TicketsComponentStyle.offender_officer_court_button_text
                  }>
                  COURT
                </Text>
              </TouchableOpacity>
            </View>

            {ticketObj['hold_status' + i] == 'Y' ? (
              <TouchableOpacity
                style={TicketsComponentStyle.cancel_roadside_button}
                onPress={() => {
                  this.Show_Cancel_Roadeside_Alert(
                    true,
                    ticketObj['ticket_no' + i],
                  );
                }}>
                <Text style={TicketsComponentStyle.cancel_roadside_button_text}>
                  CANCEL ROADSIDE
                </Text>
              </TouchableOpacity>
            ) : null}

            {/* Horizantal Line */}
            <View
              style={{
                backgroundColor: '#13226b',
                height: 1,
                marginRight: 25,
                marginLeft: 25,
                marginBottom: 10,
                marginTop: 10,
              }}
            />
          </View>
        );

        var newtickets = this.state.newtickets;
        {
          newtickets[Global_Attributes.TicketId]
            ? (output[ticketObj['ticket_no' + i]] = TempItem)
            : (output[i] = TempItem);
        }
      }
    }

    return (
      <SafeAreaView style={{flex: 1}}>
        {Length == 0 ? (
          <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
            <Text style={{fontSize: 15, marginTop: 30, color: 'black'}}>
              No data available
            </Text>
          </SafeAreaView>
        ) : (
          <SafeAreaView style={{flex: 1}}>
            <View style={{flexDirection: 'row'}}>
              <TextInput
                placeholder="Search Tickets"
                placeholderTextColor={{color: 'black'}}
                style={TicketsStyle.textinput}
                onChangeText={text =>
                  this.setState({searchVal: text})
                }></TextInput>

              <TouchableOpacity
                style={TicketsStyle.search_button}
                onPress={() => {
                  this.Search_btn();
                }}>
                <Text style={TicketsStyle.search_button_text}>SEARCH</Text>
              </TouchableOpacity>
            </View>

            <View style={TicketsStyle.flatListconatiner}>
              <FlatList data={[{key: 'i'}]} renderItem={() => output} />
            </View>

            <View style={TicketsStyle.bottom_container}>
              {Previous_Index != '' ? (
                <TouchableOpacity
                  style={TicketsStyle.prev_button}
                  onPress={() => {
                    this.PrevBtn();
                  }}>
                  <Text style={TicketsStyle.prev_button_text}>PREV</Text>
                </TouchableOpacity>
              ) : (
                <View style={TicketsStyle.prev_button}></View>
              )}
              <View style={{flex: 1}}>
                <Text
                  style={
                    Ticket_Index != '1 of 1'
                      ? styles.text_Pages
                      : styles.text_Page
                  }>
                  {Ticket_Index}
                </Text>
              </View>
              {Next_Index != '' ? (
                <TouchableOpacity
                  style={TicketsStyle.next_button}
                  onPress={() => {
                    this.NextBtn();
                  }}>
                  <Text style={TicketsStyle.next_button_text}>NEXT</Text>
                </TouchableOpacity>
              ) : (
                <View style={TicketsStyle.prev_button}></View>
              )}
            </View>
          </SafeAreaView>
        )}

        <Modal
          visible={this.state.Alert_Visibility}
          transparent={true}
          animationType={'fade'}
          onRequestClose={() => {
            this.Show_Custom_Alert(!this.state.Alert_Visibility);
          }}>
          {/* Notes  Modal Main Conatiner */}
          <View style={TicketsComponentStyle.modal_container}>
            {/* Notes Modal Body Container */}
            <View style={TicketsComponentStyle.modal_body}>
              <Text style={TicketsComponentStyle.modal_title}>Add Notes</Text>
              <View style={{flex: 1}}>
                {this.state.results == '' ? (
                  <TextInput
                    placeholder={this.state.placeholder}
                    multiline={true}
                    style={TicketsComponentStyle.modal_textinput}
                  />
                ) : null}

                <TextInput
                  placeholder={this.state.placeholder}
                  multiline={true}
                  onChangeText={text => this.setState({results: text})}
                  style={TicketsComponentStyle.modal_textinput}>
                  {this.state.results}
                </TextInput>
                <TouchableOpacity
                  style={TicketsComponentStyle.modal_mic_icon}
                  onPress={this._startRecognizing}>
                  <Image
                    source={Mic}
                    style={
                      this.state.colorId === 1 ? styles.red : styles.button
                    }
                  />
                </TouchableOpacity>
              </View>

              {/* Notes Modal Bottom Container */}
              <View style={TicketsComponentStyle.modal_bottom_container}>
              
                <TouchableOpacity
                  style={TicketsComponentStyle.submit_button}
                  onPress={() => this.submit_addnotes_Button()}
                  activeOpacity={0.7}>
                  <Text style={TicketsComponentStyle.submit_cancel_text}>
                    {' '}
                    SUBMIT{' '}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={TicketsComponentStyle.cancel_button}
                  onPress={this.oncancel_notes_Btn}
                  activeOpacity={0.7}>
                  <Text style={TicketsComponentStyle.submit_cancel_text}>
                    {' '}
                    CANCEL{' '}
                  </Text>
                </TouchableOpacity>

              </View>
            </View>
          </View>
        </Modal>

        {/* Cancel Roadsides */}
        <Modal
          visible={this.state.Cancel_Roadside}
          transparent={true}
          animationType={'fade'}
          onRequestClose={() => {
            this.Show_Cancel_Roadeside_Alert(!this.state.Cancel_Roadside);
          }}>
          {/* CancelRoadSide  Modal Main Conatiner */}
          <View style={TicketsComponentStyle.cancel_roadside_modal_container}>

            {/* CancelRoadSide Modal Body Container */}
            <View style={TicketsComponentStyle.cancel_roadside_modal_body}>
              <Text style={TicketsComponentStyle.modal_title}>Add Remarks</Text>
              <View style={{flex: 1}}>
                <TextInput
                  placeholder=" Write remark here"
                  multiline={true}
                  onChangeText={text => this.setState({remarks: text})}
                  style={TicketsComponentStyle.cancel_roadside_modal_textinput}>
                  {this.state.remarks}
                </TextInput>
              </View>
              <View style={{marginTop: '27%', marginLeft: '5%'}}>
                <Checkbox
                  checked={this.state.check}
                  onValueChange={() => this.checkBoxChanged()}
                  checkedBackgroundColor={'#11246F'}
                  checkedBorderColor={'#11246F'}
                  borderWidth={2}
                  checkMarkColor={'white'}
                  checkMarkSize={18}
                  animationType={'left'}
                  size={18}
                  rippleEffect={false}
                  label="THIS TICKET WILL NOT BE SENT TO COURT!"
                  labelStyle={{color: '#11246e'}}></Checkbox>
              </View>

              {/* CancelRoadSide  Modal Bottom Container */}
              <View
                style={
                  TicketsComponentStyle.cancel_roadside_modal_bottom_container
                }>
                <TouchableOpacity
                  style={TicketsComponentStyle.submit_button}
                  onPress={() => this.submit_cancelroadside_Button()}
                  activeOpacity={0.7}>
                  <Text style={TicketsComponentStyle.submit_cancel_text}>
                    {' '}
                    SUBMIT{' '}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={TicketsComponentStyle.cancel_button}
                  onPress={this.oncancel_addremark_Btn}
                  activeOpacity={0.7}>
                  <Text style={TicketsComponentStyle.submit_cancel_text}>
                    {' '}
                    CANCEL{' '}
                  </Text>
                </TouchableOpacity>
              </View>
              
            </View>
          </View>
        </Modal>
        <Loader loading={Global_Attributes.loading} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  red: {
    tintColor: '#d50b16',
    alignItems: 'center',
    padding: 15,
    width: 30,
    height: 30,
    // backgroundColor:'#e2e4e1',
    borderRadius: 12,
  },

  button: {
    tintColor: 'black',
    alignItems: 'center',
    padding: 15,
    width: 30,
    height: 30,
    // backgroundColor:'#e2e4e1',
    borderRadius: 12,
  },

  text_Page: {
    bottom: 20,
    alignSelf: 'center',
    fontSize: 15,
    color: 'black',
  },

  text_Pages: {
    alignSelf: 'center',
    fontSize: 15,
    color: 'black',
  },
});

export default PonReports;
