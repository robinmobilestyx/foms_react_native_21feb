import React, {Component} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  BackHandler,
} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import NumVerificationController from '../Controller/NumVerificationController';
import ReactNativeBiometrics from 'react-native-biometrics';
import profile from '../assets/profile.png';
import fingerprint from '../assets/fingerprint.png';
import lock_image from '../assets/lock.png';
import LoginStyle from '../Css/LoginStyle';
import Global_Attributes from '../../Utility/Global_Attributes';
import DeviceInfo from 'react-native-device-info';
import LoginScreenFooter from '../Login/LoginScreenFooter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNExitApp from 'react-native-exit-app';
import Loader from '../Dashboard/Loader';

const TAG = 'LoginPage';

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.goToNumberVer = this.goToNumberVer.bind(this);

    this.state = {
      pin: ' ',
      isLoading: Global_Attributes.loading,
      loginSession: '',
      Keyboard: false,
    };
  }

  componentDidMount = async () => {
    // this.backHandler = BackHandler.addEventListener(
    //   "hardwareBackPress",
    //   RNExitApp.exitApp()
    // );

    this._unsubscribe = this.props.navigation.addListener('focus', async () => {
      console.log('im focused');
      const fp = await AsyncStorage.getItem('fpenroll');
      if (fp === 'Yes') {
        this.setState({loginSession: 'Yes'});
        this.fingerPrints();
      } else {
        this.setState({loginSession: 'No'});
      }
    });
  };

  componentWillUnmount() {
    // this.backHandler.remove();
    console.log('im unfocused');
    Global_Attributes.loading = false;
    //  this.unsubscribe();
    // BackHandler.removeEventListener("hardwareBackPress", this.backAction);
  }

  next = async type => {
    Global_Attributes.loading = true;
    this.setState({isLoading: true});

    let pinAction;
    let pinNo;
    let fingerPrintConcent;

    if (type === 'pin') {
      pinAction = 'check_pin';
      pinNo = this.state.pin;
      fingerPrintConcent = 'Y';
    } else {
      pinAction = 'check_fingerprint_concent';
      pinNo = '';
      fingerPrintConcent = '';
    }

    var user = Global_Attributes.User;
    var pass = Global_Attributes.Pass;
    let deviceId = DeviceInfo.getUniqueId();

    let numberVerBody = {
      user: user,
      pass: pass,
      mobile_no: '',
      pin_action: pinAction,
      pin_no: pinNo,
      device_id: Global_Attributes.deviceID,
      fingerprint_concent: fingerPrintConcent,
    };

    const abc = await new NumVerificationController().handleClick(
      numberVerBody,
      this.props,
      'Login',
      Global_Attributes.enterPin,
    );

    this.setState({isLoading: false});
  };

  goToNumberVer = () => {
    this.props.navigation.navigate('NumberVerification', {isVisible: true});
  };

  fingerPrints() {
    ReactNativeBiometrics.isSensorAvailable().then(resultObject => {
      const {available, biometryType} = resultObject;

      if (available && biometryType === ReactNativeBiometrics.TouchID) {
        console.log('TouchID is supported');
      } else if (available && biometryType === ReactNativeBiometrics.FaceID) {
        console.log('FaceID is supported');
      } else if (
        available &&
        biometryType === ReactNativeBiometrics.Biometrics
      ) {
        console.log('fingerprints is supported');
        try {
          ReactNativeBiometrics.simplePrompt({
            promptMessage: 'Confirm fingerprint',
          })
            .then(resultObject => {
              const {success} = resultObject;
              if (success) {
                console.log('successful fingerprints provided' + success);
                Global_Attributes.pinSuccess = success;
                // console.log(Global_Attributes.pinSuccess);
                this.next('fingerprint');
              } else {
                console.log('user cancelled fingerprints prompt');
              }
            })
            .catch(() => {
              console.log('fingerprints failed');
            });
        } catch (e) {
          console.log('Device not Support Fingerprint');
        }
      } else {
        console.log('fingerprints not supported');
      }
    });
  }

  render() {
    return (
      <SafeAreaView style={LoginStyle.mainContainer}>
        <View style={LoginStyle.uppercontainer}>
          <Image style={LoginStyle.image} source={profile} />
          <Text style={LoginStyle.text}>
            Enter Pin{' '}
            <Image style={LoginStyle.enterPinImage} source={lock_image} />
          </Text>
          <TextInput
            secureTextEntry={true}
            selectionColor={'#11246F'}
            style={LoginStyle.textinput}
            keyboardType="numeric"
            maxLength={4}
            onFocus={() => this.setState({Keyboard: true})}
            onSubmitEditing={() => this.setState({Keyboard: false})}
            value={this.state.pin ? this.state.pin.trim() : null}
            onChangeText={numeric => this.setState({pin: numeric})}
          />
        </View>

        <View style={LoginStyle.middlecontainer}>
          <TouchableOpacity
            onPress={() => {
              this.goToNumberVer();
            }}>
            <Text style={LoginStyle.forgotText}>FORGOT PIN ?</Text>
          </TouchableOpacity>
        </View>

        <View style={LoginStyle.bottomcontainer}>
          <View style={LoginStyle.Btn}>
            <TouchableOpacity
              onPress={() => {
                this.next('pin');
              }}>
              <Text style={LoginStyle.buttontext}>LOGIN</Text>
            </TouchableOpacity>
          </View>
        </View>

        {this.state.loginSession == 'Yes' ? (
          <View>
            <Image style={LoginStyle.fingerprintimage} source={fingerprint} />
            <Text style={LoginStyle.fingertext}>
              Login Using Fingerprint Place your finger on fingerprint{'\n'}
              scanner to login
            </Text>
          </View>
        ) : null}

        {/* {this.state.Keyboard ? null :  */}
        <LoginScreenFooter style={{position: 'absolute', bottom: 0}} />
        {/* } */}
        {/* <View >
        
        </View> */}
        <Loader loading={Global_Attributes.loading} />
      </SafeAreaView>
    );
  }
}
