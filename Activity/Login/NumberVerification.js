import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  View,
  TextInput,
  TouchableOpacity,
  Div,
  ActivityIndicator,
  Alert,
  Plateform,
  Linking,
} from 'react-native';
import NumVerificationController from '../Controller/NumVerificationController';
// import logo from '../assets/app_icon.png';
import {Config} from 'react-native-config';
import bg_Image from '../assets/bg.png';
import Global_Attributes from '../../Utility/Global_Attributes';
import DeviceInfo from 'react-native-device-info';
import Loader from '../Dashboard/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NumberVerificationStyle from '../Css/NumberVerificationStyle';
import NetInfo from '@react-native-community/netinfo';
import {request, PERMISSIONS, RESULTS, check} from 'react-native-permissions';

// import { AsyncStorage } from 'react-native';

const PLATEFORM_PERMISSION = {
  android: PERMISSIONS.ANDROID.READ_PHONE_STATE,
};
const REQUEST_PERMISSION_TYPE = {
  phone_state: PLATEFORM_PERMISSION,
};

const PERMISSION_TYPE = {
  phone_state: 'phone_state',
};

export default class NumberVerification extends Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.state = {
      ph_No: '',
      isLoading: Global_Attributes.loading,
      apiUrl: Global_Attributes.numberVerify,
    };
    let deviceId = DeviceInfo.getUniqueId();
    console.log(deviceId);
  }
  permissionDialog = () => {
    Alert.alert(
      'Permission Required',
      'Telephonic permission is required to use this feature !',
      [
        {
          text: 'OK',
          textColor: '#11246F',
          onPress: () => {
            this.checkPermission(PERMISSION_TYPE.phone_state);
          },
        },
      ],
    );
  };
  checkPermission = async type => {
    const permission = REQUEST_PERMISSION_TYPE[type];
    console.log('permission', permission);
    if (!permission) {
      return true;
    }
    try {
      const result = await check(permission);
      console.log('permission check ', result);

      if (result === RESULTS.GRANTED) {
        this.api_call();
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
      this.api_call();
      return result === RESULTS.GRANTED;
    } catch (error) {
      console.log('App permission result fail ' + error);
      return false;
    }
  };
  
  _clearSession = async () => {
    try {
      const uname = await AsyncStorage.getItem('userName');
      console.log('Session Values:' + uname);
      if (uname == null) {
        AsyncStorage.clear();
        console.log('Session clear');
      } else {
        console.log('Session already empty!');
      }
    } catch (error) {
      console.log(error);
    }
  };

  next = () => {
    if (this.state.ph_No == '') {
      alert(' Please Enter Mobile Number !');
    } else if (this.state.ph_No.length < 10) {
      alert(' Mobile Number should be of 10 digit !');
    } else {
      //  if(Plateform.OS ==='android')
      //         {
      //             this.checkPermission(PERMISSION_TYPE.phone_state)
      //         }
      //         else{

      //           this.api_call();
      //         }
      Global_Attributes.loading = true;
      this.checkPermission(PERMISSION_TYPE.phone_state);
    }
  };

  api_call = async () => {
    this.setState({isLoading: true});
    this._clearSession();
    var user = Global_Attributes.User;
    var pass = Global_Attributes.Pass;
    let deviceId = DeviceInfo.getUniqueId();

    //console.log("Phone num on controller :"+no);
    let numberVerBody = {
      user: user,
      pass: pass,
      mobile_no: this.state.ph_No,
      otp_action: 'otp_sent',
      otp: '',
      device_id: Global_Attributes.deviceID,
      // device_id:"115f39720dbec252"
    };
    console.log('numbervarification api: ', numberVerBody);
    const abc = await new NumVerificationController().handleClick(
      numberVerBody,
      this.props,
      'NumberVerification',
      Global_Attributes.numberVerify,
    );
    abc;
    this.setState({isLoading: false});
  };

  get App_icon() {
    switch (Config.BUILD) {
      case 'production':
        return require('../assets/app_icon_prod.png');
      case 'uat':
        return require('../assets/app_icon.png');
    }
  }

  render() {

    return (
      <SafeAreaView style={NumberVerificationStyle.container}>
        <View style={NumberVerificationStyle.uppercontainer}>
          <View style={NumberVerificationStyle.bgView}>
            <Image
              style={NumberVerificationStyle.bg_image}
              source={bg_Image}></Image>
          </View>

          <View style={NumberVerificationStyle.logoView}>
            <Image
              style={NumberVerificationStyle.logo}
              source={this.App_icon}></Image>
          </View>
        </View>

        <View style={NumberVerificationStyle.middlecontainer}>
          <View style={NumberVerificationStyle.textView}>
            <Text style={NumberVerificationStyle.text}>
              Enter {'\n'}Phone Number
            </Text>
          </View>

          <View style={NumberVerificationStyle.inputView}>
            <TextInput
              style={NumberVerificationStyle.inputText}
              maxLength={10}
              selectionColor={'#11246F'}
              numeric
              keyboardType={'numeric'}
              clearButtonMode="always"
              value={this.state.ph_No ? this.state.ph_No.trim() : null}
              onChangeText={numeric => this.setState({ph_No: numeric})}
            />
          </View>

          <Loader loading={Global_Attributes.loading} />

          <View style={NumberVerificationStyle.nextButtonView}>
            <TouchableOpacity
              onPress={() => {
                //this.props.navigation.navigate('Enter_Otp')
                this.next();
              }}>
              <Text style={NumberVerificationStyle.nextButtonText}>NEXT</Text>
            </TouchableOpacity>
          </View>
          {this.props.route.params.isVisible ? (
            <View>
              <Text style={NumberVerificationStyle.ORText}>OR</Text>

              <TouchableOpacity
                style={NumberVerificationStyle.goToLoginView}
                onPress={() => {
                  this.props.navigation.navigate('LoginPage');
                }}>
                <Text style={NumberVerificationStyle.goToLoginText}>
                  Go To Login Page
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
        <View style={NumberVerificationStyle.bottomcontainer}>
          <Text style={NumberVerificationStyle.supportText}>
            To contact support, email us at{' '}
          </Text>
          <TouchableOpacity
            onPress={() => Linking.openURL('mailto:support@mobilestyx.co.in')}>
            <Text style={NumberVerificationStyle.supportTexts}>
              support@mobilestyx.ca{' '}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

}
