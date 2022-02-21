import React, {Component} from 'react';
import Global_Attributes from '../../../Utility/Global_Attributes';

import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
  Platform,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';

import Checkbox from 'react-native-checkbox-animated';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {RadioButton, TextInput, Button} from 'react-native-paper';
import camera from '../../assets/ic_menu_camera.png';
import LawsController from '../../Controller/LawsController';
import DateTimePicker from '@react-native-community/datetimepicker';
import Geolocation from 'react-native-geolocation-service';

import ponstyle from '../../Css/PonInfoStyle';
import DashboardFooter from '../../Dashboard/DashboardFooter';
import Scanner from '../../Dashboard/Scanner';

const New_DL_CustomerFirstName = 'DAC',
  New_DL_CustomerMiddleName = 'DAD',
  Customer_Family_Name = 'DCS',
  Customer_Given_Name = 'DCT',
  Name_Suffix = 'DCU',
  Street_Address_1 = 'DAG',
  City = 'DAI',
  Jurisdction_Code = 'DAJ',
  Postal_Code = 'DAK',
  Country_Identification = 'DCG',
  Customer_Id_Number = 'DAQ',
  Class = 'DCA',
  Restrictions = 'DCB',
  Date_Of_Birth = 'DBB',
  Sex = 'DBC',
  Issue_Date = 'DBD';

var allKeys = [
  New_DL_CustomerFirstName,
  New_DL_CustomerMiddleName,
  Customer_Family_Name,
  Street_Address_1,
  Customer_Given_Name,
  Name_Suffix,
  City,
  Jurisdction_Code,
  Postal_Code,
  Country_Identification,
  Customer_Id_Number,
  Class,
  Restrictions,
  Date_Of_Birth,
  Sex,
  Issue_Date,
];

var myData = {};

export default class PonInfo extends Component {
  constructor(props) {
    super(props);

    this.next = this.next.bind(this);
    this.discoverDeviceHandler = this.discoverDeviceHandler.bind(this);

    this.state = {
      family: Global_Attributes.PonOneBean['family'],
      given: Global_Attributes.PonOneBean['given'],
      initials: Global_Attributes.PonOneBean['initials'],
      street: Global_Attributes.PonOneBean['street'],
      muncipality: Global_Attributes.PonOneBean['muncipality'],
      po: Global_Attributes.PonOneBean['po'],
      province: Global_Attributes.PonOneBean['province'],
      postl: Global_Attributes.PonOneBean['postl'],
      lisenceNumber: Global_Attributes.PonOneBean['lisenceNumber'],
      juris: Global_Attributes.PonOneBean['juris'],
      dob: Global_Attributes.PonOneBean['dob'],
      gender: Global_Attributes.PonOneBean['gender'],
      date: Global_Attributes.PonOneBean['date'],
      time: Global_Attributes.PonOneBean['time'],
      show: false,
      mode: null,
      currDate: new Date(),
      flash: false,
      showTimeCal: false,
      dobCal: false,
      bd: null,
      bde: new Date(new Date().setFullYear(new Date().getFullYear() - 16)),
      keyboardStatus: 'Keyboard Hidden',
    };
  }

  checkBoxChanged() {
    this.setState({flash: !this.state.flash});
  }

  discoverDeviceHandler = flash => {
    Scanner.callDeviceDiscovery(
      flash,
      sucess => {
        console.log('Android Result:' + ' ' + sucess);
        // this.parsScanData(sucess);
        const lines = sucess.split(', '); //\\r?\\n
        console.log('Lines' + lines + lines.length);
        for (var i = 0; i < lines.length; i++) {
          let values = lines[i];
          if (values.includes('ANSI')) {
            values = values.substring(values.indexOf('DL'));
            let str = values.split('DL');
            if (str.length > 1) {
              values = str[str.length - 1];
            }
          }
          console.log('Values before compare:' + values);
          if (
            values.length > 3 ||
            values.substring(3).localeCompare('NONE') == -1
          ) {
            var key = values.substring(0, 3);
            var value = values.substring(3);
            console.log('value' + value, 'key' + key);
            myData[key] = value;
            if (allKeys.includes(key)) {
              if (value.localeCompare('NONE') == -1) {
                const keys = allKeys.find(data => data == key);
                myData[keys] = value;
                console.log('myData values:' + keys + '=' + value);
              }
            }
          }
        }
        console.log(myData[City]);
        if (myData[Customer_Family_Name] != undefined) {
          const family = myData[Customer_Family_Name].split(',');
          this.setState({family: family[0]});
        }
        if (myData[New_DL_CustomerMiddleName] != undefined) {
          this.setState({initials: myData[New_DL_CustomerMiddleName]});
        }
        if (myData[New_DL_CustomerMiddleName] != undefined) {
          this.setState({initials: myData[New_DL_CustomerMiddleName]});
        }
        if (myData[Customer_Given_Name] != undefined) {
          var name = myData[Customer_Given_Name];
          const fullName = name.split(',');
          const given = fullName[0];
          const initials = fullName[1];
          this.setState({given: given});
          this.setState({initials: initials});
        }
        if (myData[New_DL_CustomerFirstName] != undefined) {
          var name = myData[New_DL_CustomerFirstName];

          this.setState({given: name});
        }
        if (myData[Street_Address_1] != undefined) {
          this.setState({street: myData[Street_Address_1]});
        }
        if (myData[City] != undefined) {
          this.setState({muncipality: myData[City]});
        }
        if (myData[Jurisdction_Code] != undefined) {
          this.setState({province: myData[Jurisdction_Code]});
        }
        if (myData[Postal_Code] != undefined) {
          this.setState({postl: myData[Postal_Code]});
        }
        if (myData[Customer_Id_Number] != undefined) {
          this.setState({lisenceNumber: myData[Customer_Id_Number]});
        }
        if (myData[Sex] != undefined) {
          if (myData[Sex] == 1) {
            this.setState({gender: 'M'});
          } else if (myData[Sex] == 2 || myData[Sex] == 0) {
            this.setState({gender: 'F'});
          } else {
            this.setState({gender: 'O'});
          }
        }
        if (myData[Date_Of_Birth] != undefined) {
          // const b = myData[Date_Of_Birth];
          let formate =
            myData[Date_Of_Birth].slice(0, 4) +
            '-' +
            myData[Date_Of_Birth].slice(4, 6) +
            '-' +
            myData[Date_Of_Birth].slice(6, 8);
          let ld = new Date(formate);
          console.log(ld.toDateString());
          console.log(
            'lic',
            ld.getFullYear(),
            '/',
            ld.getMonth() + 1,
            '/',
            ld.getDate(),
          );
          this.setState({bd: ld});
        }
      },
      failure => {
        console.log('Android Failure:' + ' ' + failure);
      },
    );
  };

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      console.log('lat and log');
      Geolocation.getCurrentPosition(
        info => (Global_Attributes.lat = info.coords.latitude),
      );
      Geolocation.getCurrentPosition(
        position => (Global_Attributes.log = position.coords.longitude),
      );
      return true;
    });
    let setcurTime = new Date();
    //Global_Attributes.PonOneBean['time'] ;
    // alert(setcurTime);

    let hours = setcurTime.getHours();
    let am_pm = hours >= 12 ? 'PM' : 'AM';
    if (hours > 12) {
      hours -= 12;
    } else if (hours == '00') {
      hours = 12;
    }
    let getTime = hours + ':' + setcurTime.getMinutes() + ' ' + am_pm;
    // alert(getTime);
    this.setState({time: getTime});
    console.log('getting Parents Laws title .....Done');
    let All_acts = {
      user: Global_Attributes.User,
      pass: Global_Attributes.Pass,
      id: 'all_acts',
    };
    new LawsController().getAllActs(
      All_acts,
      this.props,
      'PonInfo',
      Global_Attributes.laws,
    );
  }

  emptyFields = () => {
    var fields = [];

    if (this.state.given.trim() == '') {
      fields.push('Given Name');
    }
    if (this.state.initials.trim() == '') {
      fields.push('Initials Name');
    }
    if (this.state.street.trim() == '') {
      fields.push('Number & Street');
    }
    if (this.state.muncipality.trim() == '') {
      fields.push('Muncipality');
    }
    if (this.state.province.trim() == '') {
      fields.push('Province');
    }
    if (this.state.postl.trim() == '') {
      fields.push('Postal code');
    }
    if (this.state.lisenceNumber.trim() == '') {
      fields.push('DL Number');
    }
    if (this.state.juris.trim() == '') {
      fields.push('Juris');
    }
    if (this.state.dob == null) {
      fields.push('Date of Birth');
    } else {
    }
    return fields;
  };

  next = () => {
    Geolocation.getCurrentPosition(
      info => (Global_Attributes.lat = info.coords.latitude),
    );

    Geolocation.getCurrentPosition(
      position => (Global_Attributes.log = position.coords.longitude),
    );

    this.emptyFields();
    if (this.state.family.trim() == '') {
      alert('Enter family name !');
    } else {
      if (this.emptyFields().length > 0) {
        Alert.alert(
          'Notice',
          'The following field(s) are missing:\n\n' +
            this.emptyFields() +
            '\n\n Do you wish to continue?',
          [
            {
              text: 'YES',
              onPress: () => {
                this.setBeans();
              },
            },
            {
              text: 'No',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
          ],
        );
      } else {
        this.setBeans();
      }
    }
  };

  setBeans = () => {
    Global_Attributes.PonOneBean['date'] = this.state.date;
    Global_Attributes.PonOneBean['time'] = this.state.time;
    Global_Attributes.PonOneBean['family'] = this.state.family;
    Global_Attributes.PonOneBean['given'] = this.state.given;
    Global_Attributes.PonOneBean['initials'] = this.state.initials;
    Global_Attributes.PonOneBean['street'] = this.state.street;
    Global_Attributes.PonOneBean['muncipality'] = this.state.muncipality;
    Global_Attributes.PonOneBean['po'] = this.state.po;
    Global_Attributes.PonOneBean['province'] = this.state.province;
    Global_Attributes.PonOneBean['postl'] = this.state.postl;
    Global_Attributes.PonOneBean['lisenceNumber'] = this.state.lisenceNumber;
    Global_Attributes.PonOneBean['juris'] = this.state.juris;
    Global_Attributes.PonOneBean['dob'] = this.state.dob;
    Global_Attributes.PonOneBean['gender'] = this.state.gender;
    this.props.navigation.navigate('PonOffence');
  };

  checkPermission = async type => {
    const permission = REQUEST_PERMISSION_TYPE[type][Platform.OS];

    console.log('permission', permission);
    if (!permission) {
      return true;
    }
    try {
      const result = await check(permission);
      console.log('permission check ', result);

      if (result === RESULTS.GRANTED) {
        // BarcodeScanModule.getBarcodeDetails()
        return true;
      }
      return this.requestPermission(permission);
    } catch (error) {
      console.log('error while check' + error);
    }
  };

  requestPermission = async permission => {
    try {
      const result = await request(permission);
      console.log('permission request', result);
      BarcodeScanModule.getBarcodeDetails();
      return result === RESULTS.GRANTED;
    } catch (error) {
      console.log('App permission result fail ' + error);
      return false;
    }
  };
  showDatepicker = () => {
    // this.showMode('date');
    this.setState({show: true});
    this.setState({mode: 'date'});
  };

  showTimepicker = () => {
    //  this.showMode('Time');
    this.setState({show: true});
    this.setState({mode: 'time'});
  };

  onDateTimeChange = (_event, selectedDate) => {
    const currentDate = selectedDate || this.state.currDate;
    let storeDate =
      currentDate.getFullYear() +
      '/' +
      (currentDate.getMonth() + 1) +
      '/' +
      currentDate.getDate();
    // alert(storeDate);

    let hours = currentDate.getHours();
    let am_pm = hours >= 12 ? 'PM' : 'AM';
    if (hours > 12) {
      hours -= 12;
    } else if (hours == '00') {
      hours = 12;
    }
    let storeTime = hours + ':' + currentDate.getMinutes() + ' ' + am_pm;
    this.setState({show: Platform.OS === 'ios'});
    this.setState({date: storeDate});
    this.setState({time: storeTime});
    this.setState({currDate: currentDate});
  };

  dobChange = (_event, selectedDate) => {
    //  this.setState({shw : false});
    let BdDate =
      selectedDate.getFullYear() +
      '/' +
      (selectedDate.getMonth() + 1) +
      '/' +
      selectedDate.getDate();
    // alert(BdDate);

    this.setState({dobCal: Platform.OS === 'ios'});
    this.setState({dob: BdDate});
    this.setState({bd: selectedDate});
  };

  render() {

    const {navigation} = this.props;
    const {keyboardStatus, bd} = this.state;
    let current = this.state.currDate;
    let hours = current.getHours();
    let am_pm = hours >= 12 ? 'PM' : 'AM';

    if (hours > 12) {
      hours -= 12;
    } else if (hours == '00') {
      hours = 12;
    }

    let cTime = hours + ':' + current.getMinutes() + ' ' + am_pm;

    let cDate = current.getFullYear() + '/' + (current.getMonth() + 1) + '/' + current.getDate();

    return (
      <SafeAreaView style={ponstyle.mainView}>
        <ScrollView
          scrollEnabled={true}
          nestedScrollEnabled={true}
          style={ponstyle.Scrollview}>
          {/* <View style={ponstyle.respobox}> */}

          <View style={ponstyle.locationView}>
            <View style={ponstyle.loc_code_view}>
              <Text style={ponstyle.loc_code_text}>Location Code</Text>
              <Text style={ponstyle.loc_code_no}>
                {Global_Attributes.PonOneBean['locationCode']}
              </Text>
            </View>
            <View style={ponstyle.offn_views}></View>
            <View style={ponstyle.offn_view}>
              <Text style={ponstyle.loc_code_text}>Offence Number</Text>
              <Text style={ponstyle.loc_code_no1}>
                {Global_Attributes.PonOneBean['formatted']}
              </Text>
            </View>
          </View>

          <View style={ponstyle.offr_name_view}>
            <Text style={ponstyle.offr_name}>
              Officer Name : {Global_Attributes.PonOneBean['officerName']}
            </Text>
          </View>

          <View style={ponstyle.main_view_status}>
            <View style={ponstyle.view_status}></View>
            <Text style={ponstyle.first_status}>1</Text>
            <Text style={ponstyle.sec_status}>2</Text>
            <Text style={ponstyle.third_status}>3</Text>
            <Text style={ponstyle.info_txt}>Info</Text>
            <Text style={ponstyle.offn_txt}>Offence</Text>
            <Text style={ponstyle.review_txt}>Review</Text>
          </View>

          <View style={ponstyle.main_text_view}>
            <View style={ponstyle.main_text_views}>
              <TextInput
                style={ponstyle.inputTextStyleTwo}
                label="DATE"
                labelStyle={{color: ''}}
                underlineColor={'#000000'}
                value={cDate}
                theme={{colors: {text: '#11246F'}}}
                onChangeText={text => {
                  this.setState({date: text});
                }}
                onFocus={this.showDatepicker}
                keyboardType="numeric"></TextInput>
              <Image
                source={require('../../assets/ic_menu_my_calendar.png')}
                style={{
                  width: 35,
                  height: 35,
                  position: 'absolute',
                  left: 130,
                  bottom: 6,
                }}
              />
            </View>

            <View style={ponstyle.main_text_views}>
              <TextInput
                style={ponstyle.inputTextStyleTwo}
                label="TIME"
                underlineColor={'#000000'}
                theme={{colors: {text: '#11246F'}}}
                onFocus={this.showTimepicker}
                onChangeText={text => {
                  this.setState({time: text});
                }}
                value={cTime}
                keyboardType="numeric"></TextInput>
              <Image
                source={require('../../assets/ic_menu_my_calendar.png')}
                style={{
                  width: 35,
                  height: 35,
                  position: 'absolute',
                  left: 130,
                  bottom: 6,
                }}
              />
            </View>
          </View>

          <View style={ponstyle.flash_view}>

            <Text style={ponstyle.sdl_txt}>Scan Driving License</Text>

            <View style={{left: 18}}>
              <Checkbox
                onValueChange={() => this.checkBoxChanged()}
                labelStyle={{color: '#11246F'}}
                checked={this.state.flash}
                style={{marginTop: '5%', alignSelf: 'center', marginLeft: 10}}
                // boxStyle={{borderColor:'#A9A9A9'}}
                checkedBackgroundColor={'#11246F'}
                checkedBorderColor={'#11246F'}
                borderWidth={2}
                checkMarkColor={'white'}
                checkMarkSize={16}
                // checkMarkColor={'black'}
                animationType={'left'}
                unCheckedBorderColor={'#808080'}
                size={16}
                rippleEffect={false}>
              </Checkbox>
            </View>

          <Text style={ponstyle.flash_txt}>Flash</Text>

            <View style={ponstyle.scan_btn}>
              <TouchableOpacity
                onPress={() => {
                  this.discoverDeviceHandler(this.state.flash);
                }}>
                <Text style={ponstyle.scan_txt}>SCAN</Text>
                <Image source={camera} style={ponstyle.scan_img}></Image>
              </TouchableOpacity>
            </View>

          </View>

          <View style={ponstyle.main_text_view}>
            <View style={ponstyle.inputTextStyleThreeView}>
              <TextInput
                style={ponstyle.inputTextStyleThree}
                label="FAMILY*"
                underlineColor={'#000000'}
                value={this.state.family}
                onChangeText={text =>
                  this.setState({family: text})
                }></TextInput>
            </View>

            <View style={ponstyle.inputTextStyleThreeView}>
              <TextInput
                style={ponstyle.inputTextStyleThree}
                label="GIVEN"
                underlineColor={'#000000'}
                value={this.state.given}
                onChangeText={text => this.setState({given: text})}></TextInput>
            </View>

            <View style={ponstyle.inputTextStyleThreeView}>
              <TextInput
                style={ponstyle.inputTextStyleThree}
                label="INITIALS"
                underlineColor={'#000000'}
                value={this.state.initials}
                onChangeText={text =>
                  this.setState({initials: text})
                }></TextInput>
            </View>
          </View>

          <View style={ponstyle.main_text_view}>
            <View style={ponstyle.main_text_views}>
              <TextInput
                style={ponstyle.inputTextStyleTwo}
                label={
                  <Text
                    style={{
                      width: '20%',
                      fontFamily: Global_Attributes.fixfontstyle,
                    }}>
                    NUMBER AND STREET
                  </Text>
                }
                underlineColor={'#000000'}
                value={this.state.street}
                onChangeText={text =>
                  this.setState({street: text})
                }></TextInput>
            </View>
            <View style={ponstyle.main_text_views}>
              <TextInput
                style={ponstyle.inputTextStyleTwo}
                label="MUNCIPALITY"
                underlineColor={'#000000'}
                value={this.state.muncipality}
                onChangeText={text =>
                  this.setState({muncipality: text})
                }></TextInput>
            </View>
          </View>

          <View style={ponstyle.main_text_view}>
            <View style={ponstyle.inputTextStyleThreeView}>
              <TextInput
                style={ponstyle.inputTextStyleThree}
                label="PO"
                underlineColor={'#000000'}
                value={this.state.po}
                onChangeText={text => this.setState({po: text})}></TextInput>
            </View>
            <View style={ponstyle.inputTextStyleThreeView}>
              <TextInput
                style={ponstyle.inputTextStyleThree}
                label="PROVINCE"
                underlineColor={'#000000'}
                value={this.state.province}
                onChangeText={text =>
                  this.setState({province: text})
                }></TextInput>
            </View>
            <View style={ponstyle.inputTextStyleThreeView}>
              <TextInput
                style={ponstyle.inputTextStyleThree}
                label="POSTAL CODE"
                underlineColor={'#000000'}
                value={this.state.postl}
                onChangeText={text => this.setState({postl: text})}></TextInput>
            </View>
          </View>

          <View style={ponstyle.main_text_view}>
            <View style={ponstyle.main_text_views}>
              <TextInput
                style={{
                  height: 55,
                  width: '115%',
                  backgroundColor: '#ffffff',
                  margin: '5%',
                  fontSize: 12,
                  color: '#11246F',
                }}
                maxLength={17}
                label="DRIVERS LICENSE NUMBER"
                underlineColor={'#000000'}
                labelStyle={{}}
                value={this.state.lisenceNumber}
                onChangeText={text =>
                  this.setState({lisenceNumber: text})
                }></TextInput>
            </View>

            <View style={ponstyle.main_text_views}>
              <TextInput
                style={{
                  height: 55,
                  //   width: '46%',
                  marginLeft: 50,
                  backgroundColor: '#ffffff',
                  margin: '5%',
                  fontSize: 12,
                }}
                label="JURIS"
                value="ON"
                theme={{colors: {text: '#11246F'}}}
                underlineColor={'#000000'}
                value={this.state.juris}
                onChangeText={text => this.setState({juris: text})}></TextInput>
            </View>
          </View>

          <View style={ponstyle.main_text_view}>
            <View style={ponstyle.birthView}>
              <TextInput
                style={ponstyle.inputTextStyleTwo}
                label="DATE OF BIRTH"
                underlineColor={'#000000'}
                labelStyle={{}}
                editable={true}
                value={
                  bd &&
                  bd.getFullYear() +
                    '/' +
                    (bd.getMonth() + 1) +
                    '/' +
                    bd.getDate()
                }
                onFocus={() => this.setState({dobCal: true})}
                onChangeText={text => this.setState({dob: text})}></TextInput>
              <Image
                source={require('../../assets/ic_menu_my_calendar.png')}
                style={{
                  width: 35,
                  height: 35,
                  position: 'absolute',
                  left: 130,
                  bottom: 7,
                }}
              />
            </View>

            <View style={ponstyle.gend_view}>
              <Text style={ponstyle.sex_txt}>SEX*</Text>

              <View style={ponstyle.sec_gend_view}>
                <RadioButton.Group
                  onValueChange={value => this.setState({gender: value})}
                  value={this.state.gender}>
                  <View style={{flexDirection: 'row'}}>
                    <RadioButton value="M" color="#11246F"></RadioButton>
                    <Text
                      style={{
                        alignSelf: 'center',
                        color: '#11246F',
                        fontSize: 12,
                        fontFamily: Global_Attributes.fixfontstyle,
                      }}>
                      M
                    </Text>
                    <RadioButton value="F" color="#11246F"></RadioButton>
                    <Text
                      style={{
                        alignSelf: 'center',
                        color: '#11246F',
                        fontSize: 12,
                        fontFamily: Global_Attributes.fixfontstyle,
                      }}>
                      F
                    </Text>
                    <RadioButton value="O" color="#11246F"></RadioButton>
                    <Text
                      style={{
                        alignSelf: 'center',
                        color: '#11246F',
                        fontSize: 12,
                        fontFamily: Global_Attributes.fixfontstyle,
                      }}>
                      OTHER
                    </Text>
                  </View>
                </RadioButton.Group>
              </View>
            </View>
          </View>

          <View style={ponstyle.nxt_btnView}>
            <View style={ponstyle.nxt_btnView1}></View>
            <View style={ponstyle.nxt_btnView2}>
              <Button
                mode="contained"
                style={ponstyle.nxt_btn}
                // style={{
                //     backgroundColor: '#30D20D', alignSelf: 'flex-end', width: '30%'
                //     , marginEnd: 12, marginTop: 25, borderRadius: 10
                // }}
                onPress={() => {
                  this.next();
                }}>
                NEXT
              </Button>
            </View>
          </View>

          {this.state.show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={this.state.currDate}
              mode={this.state.mode}
              is24Hour={false}
              display="default"
              onChange={this.onDateTimeChange}
              maximumDate={new Date()}
            />
          )}
          {this.state.dobCal ? (
            <DateTimePicker
              testID="datePicker"
              value={this.state.bde}
              mode="date"
              display="default"
              onChange={this.dobChange}
              maximumDate={this.state.bde}
            />
          ) : null}

          {/* </View> */}
        </ScrollView>

        <DashboardFooter
          navigation={navigation}
          style={{position: 'absolute', bottom: 0}}
        />
      </SafeAreaView>
    );
  }
}
