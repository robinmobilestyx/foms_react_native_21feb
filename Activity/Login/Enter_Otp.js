import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import bg_Image from '../assets/bg.png';
import Config from 'react-native-config';
import NumVerificationController from '../Controller/NumVerificationController';
import Global_Attributes from '../../Utility/Global_Attributes';
import DeviceInfo from 'react-native-device-info';
import Loader from '../Dashboard/Loader';
import NetInfo from '@react-native-community/netinfo';
import ReactNativeBiometrics from 'react-native-biometrics';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Enter_Otp extends Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    var ph = this.props.route.params.number;
    this.state = {
      number: ph,
      isLoading: Global_Attributes.loading,
      otp: '',
      apiUrl: 'https://mdei.info/police_app_v1/api/login/login_proccess',
    };
  }

  checkConnection = () => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        Global_Attributes.loading = true;
        this.apiCall();
      } else {
        Alert.alert('Alert', 'Please check your internet connection !', [
          {
            text: 'OK',
            onPress: () => console.log('ok button pressed!'),
          },
        ]);
      }
    });
  };

  componentDidMount = () => {
    this._unsubscribe = this.props.navigation.addListener('focus', async () => {
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
          console.log('Biometrics is supported');
          Global_Attributes.pinSuccess = true;
        } else {
          console.log('Biometrics not supported');
        }
      });
      return true;
    });
  };

  next = async () => {
    // const phone = this.props.route.params.number;
    //console.log("Phone num from verification"+phone);
    //this.setState({number:phone})
    const number = this.state.number;
    await AsyncStorage.setItem('phoneNumber', number);

    if (this.state.otp == ' ') {
      alert(' Enter OTP !');
    } else if (this.state.otp.length != 6) {
      alert('OTP should of 6 digit !');
    } else {
      this.checkConnection();
    }
  };

  apiCall = async () => {
    this.setState({isLoading: true});
    console.log('Phone num on enter otp' + this.state.number);
    var phn = await AsyncStorage.getItem('phoneNumber');
    console.log('apicall', phn);
    var user = Global_Attributes.User;
    var pass = Global_Attributes.Pass;
    let deviceId = DeviceInfo.getUniqueId();
    let numberVerBody = {
      user: user,
      pass: pass,
      mobile_no: this.state.number,
      otp_action: 'verify_otp',
      otp: this.state.otp,
      device_id: Global_Attributes.deviceID,

      // device_id:"115f39720dbec252"
    };
    const abc = await new NumVerificationController().handleClick(
      numberVerBody,
      this.props,
      'Enter_Otp',
      Global_Attributes.enterOtp,
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
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.bgView}>
          <Image style={styles.bg_image} source={bg_Image}></Image>
        </View>
        <View style={styles.logoView}>
          <Image style={styles.logo} source={this.App_icon}></Image>
        </View>
        <View style={styles.textView}>
          <Text style={styles.text}>Enter OTP</Text>
        </View>

        <View stye={styles.inputView}>
          <TextInput
            style={styles.textInput}
            secureTextEntry={true}
            selectionColor={'#11246F'}
            maxLength={6}
            numeric
            keyboardType={'numeric'}
            clearButtonMode="always"
            value={this.state.otp ? this.state.otp.trim() : null}
            onChangeText={numeric => this.setState({otp: numeric})}
          />
        </View>
        <View style={styles.loginBtn}>
          <TouchableOpacity
            onPress={() => {
              this.next();
            }}>
            <Text style={styles.btnText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.loginBtn2}
          onPress={() => {
            this.props.navigation.navigate('NumberVerification', {
              isVisible: false,
            });
          }}>
          <Text style={styles.changeText}>Change/Edit Phone Number?</Text>
        </TouchableOpacity>

        <Loader loading={Global_Attributes.loading} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#CDCDCD',
  },
  bgView: {
    position: 'relative',
  },
  bg_image: {
    height: 150,
    width: 420,
    resizeMode: 'stretch',
  },
  logoView: {
    resizeMode: 'stretch',
    position: 'relative',
    bottom: 130,
    start: 20,
  },
  logo: {
    height: 70,
    width: 60,
  },
  textView: {
    position: 'absolute',
    alignSelf: 'center',
    top: 150,
  },
  text: {
    color: '#11246F',
    fontWeight: 'bold',
    fontSize: 22,
    fontFamily: Global_Attributes.fixfontstyle,
  },
  inputView: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: 200,
    height: 40,
  },
  textInput: {
    backgroundColor: '#ffffff',
    borderColor: '#11246F',
    color: 'black',
    fontSize: 18,
    height: 40,
    width: 200,
    borderRadius: 10,
    alignSelf: 'center',
    bottom: 30,
    textAlign: 'center',
    fontFamily: Global_Attributes.fixfontstyle,
  },
  loginBtn: {
    width: 100,
    backgroundColor: '#11246f',
    borderRadius: 10,
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    width: 200,
    bottom: 10,
  },
  loginBtn2: {
    // backgroundColor: "#11246f",
    borderRadius: 10,
    borderColor: 'transparent',
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    // width:200,
    bottom: 10,
  },
  btnText: {
    alignSelf: 'center',
    marginLeft: '1%',
    fontSize: 18,
    color: '#ffff',
    fontFamily: Global_Attributes.fixfontstyle,
  },
  changeText: {
    fontSize: 18,
    color: '#CE0F42',
    alignSelf: 'center',
    justifyContent: 'center',
    top: 20,
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
  },
});
