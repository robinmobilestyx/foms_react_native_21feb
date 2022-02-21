import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Global_Attributes from '../../Utility/Global_Attributes';
import {Alert} from 'react-native';
import {Linking} from 'react-native';
import RNExitApp from 'react-native-exit-app';
import packageJson from '../../package.json';
//import { StackActions } from '@react-navigation/native';
import {StackActions, NavigationActions} from '@react-navigation/native';
import Loader from '../Dashboard/Loader';

// import App from "../../../app.json";

const TAG = 'NumberveriController :';
var userName = ' ';

export default class NumVerificationController extends Component {
  constructor(props) {
    super(props);
  }
  //9136373912

  _createLoginSession = async (userName, fingerPrint) => {
    try {
      await AsyncStorage.setItem('userName', userName);
      await AsyncStorage.setItem('fpenroll', fingerPrint);
      // console.log( TAG+"Session pass:"+fingerPrint);
      console.log(TAG + 'Session Values:' + userName + ' : ' + fingerPrint);
      this.props.navigation.replace('LoginPage');
    } catch (error) {
      console.log(TAG + error);
      //this.errorDialog(error);
    }
  };

  ProfileData = async myAccountDetails => {
    try {
      await AsyncStorage.setItem(
        'officer_name',
        myAccountDetails['officer_name'],
      );
      await AsyncStorage.setItem('officer_no', myAccountDetails['officer_no']);
      await AsyncStorage.setItem('platoon', myAccountDetails['platoon']);
      await AsyncStorage.setItem('fname', myAccountDetails['fname']);
      await AsyncStorage.setItem('lname', myAccountDetails['lname']);
      await AsyncStorage.setItem('email', myAccountDetails['email']);
      await AsyncStorage.setItem('signature', myAccountDetails['signature']);
      await AsyncStorage.setItem('user_id', myAccountDetails['user_id']);
      await AsyncStorage.setItem('level', myAccountDetails['level']);

      // await AsyncStorage.setItem("country_code",myAccountDetails['country_code']);
      // await AsyncStorage.setItem("branch",myAccountDetails['branch']);
      await AsyncStorage.setItem('city', myAccountDetails['city']);
      // await AsyncStorage.setItem("state",myAccountDetails['state']);
      await AsyncStorage.setItem('department', myAccountDetails['department']);
      await AsyncStorage.setItem(
        'laws_version',
        myAccountDetails['laws_version'],
      );
      await AsyncStorage.setItem('Sign_Path', '');

      if (await AsyncStorage.getItem('signature')) {
        this.props.navigation.replace('Dashboard');
      } else {
        this.props.navigation.navigate('Profile');
      }
    } catch (error) {
      console.log(error);
      this.errorDialog(error);
    }
  };

  checkLogin = async () => {
    try {
      const uname = await AsyncStorage.getItem('userName');
      const phone = await AsyncStorage.getItem('phoneNumber');

      if (uname != null && phone != null) {
        this.props.navigation.replace('LoginPage');
      } else {
        this.props.navigation.replace('NumberVerification', {isVisible: false});
      }
    } catch (error) {
      console.log(error);
      this.errorDialog(error);
    }
  };

  sendToCreatePin = async () => {
    const number = await AsyncStorage.getItem('phoneNumber');
    Global_Attributes.loading = false;
    this.toCreatePin(number);
  };

  handleClick = async (bodyParameters, props, previouScreen, apiUrl) => {
    this.props = props;

    let formBody = [];
    for (var key in bodyParameters) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(bodyParameters[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    var requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      body: formBody,
    };

    await fetch(apiUrl, requestOptions)
      .then(response => response.json())
      .then(responseJson => {
        Global_Attributes.loading = false;
        if (responseJson.status == '200' || responseJson.status == 'success') {
          console.log(' Response in handle:' + responseJson.status);
          switch (previouScreen) {
            case 'splash':
              console.log(' Response' + responseJson.data['version']);
              this.checkUpdate(
                responseJson.data['version'],
                responseJson.data['url'],
              );
              //let version = responseJson.data.version;
              break;

            case 'NumberVerification':
              var number = bodyParameters['mobile_no'];
              this.toEnterOtp(number);
              // this.props.navigation.navigate('Enter_Otp',{number:number});
              break;

            case 'Enter_Otp':
              userName = responseJson.data[0].pat_user_id;
              phone = responseJson.data[1].pat_user_mobile_no;
              this.toCreatePin(phone);
              break;

            case 'Create_Pin':
              const fpEnroll = bodyParameters['fingerprint_concent'];

              this._createLoginSession(userName, fpEnroll);
              break;

            case 'Login':
              let myAccountDetails = [];
              Global_Attributes.PonOneBean['locationCode'] =
                responseJson.prefilled_data['location_code'];
              Global_Attributes.PonOneBean['officerName'] =
                responseJson.data['fname'].charAt(0) +
                ' ' +
                responseJson.data['lname'];
              myAccountDetails['officer_name'] =
                responseJson.prefilled_data['officer_name'];
              myAccountDetails['officer_no'] = responseJson.data['officer_no'];
              myAccountDetails['platoon'] = responseJson.data['platoon'];
              myAccountDetails['level'] = responseJson.data['level'];
              myAccountDetails['fname'] = responseJson.data['fname'];
              myAccountDetails['lname'] = responseJson.data['lname'];
              myAccountDetails['email'] = responseJson.data['email'];
              myAccountDetails['signature'] = responseJson.data['signature'];
              myAccountDetails['user_id'] = responseJson.data['user_id'];
              // myAccountDetails['country_code'] = responseJson.data['country_code'];
              // myAccountDetails['branch'] = responseJson.data['branch'];
              myAccountDetails['city'] = responseJson.data['city'];
              // myAccountDetails['state'] = responseJson.data['state'];
              myAccountDetails['department'] = responseJson.data['department'];
              myAccountDetails['laws_version'] =
                responseJson.data['laws_version'];
              this.ProfileData(myAccountDetails);

              break;
            default:
              break;
          }
        } else if (
          responseJson.msg ===
          'Your device is not registered yet. Please contact support for more info.'
        ) {
          Alert.alert('Alert', '' + responseJson.msg, [
            {text: 'OK', onPress: () => this.sendToCreatePin()},
          ]);
        } else {
          alert(' ' + responseJson.msg);
        }
      })
      .catch(error => this.errorDialog(error));
  };
  playstore = url => {
    Linking.openURL(url);
    RNExitApp.exitApp();
  };

  checkUpdate = (apiVersion, url) => {
    this.checkLogin();
  };

  errorDialog = error => {
    console.log('error in response', error);
    Global_Attributes.loading = false;
    if (error instanceof TypeError) {
      alert('Please check your Internet Connection !');
    } else {
      alert('Failed to connect to the Server. Please try again !');
    }
  };

  toEnterOtp = number => {
    this.props.navigation.replace('Enter_Otp', {number: number});
  };

  toCreatePin = number => {
    this.props.navigation.replace('Create_Pin', {number: number});
  };

  toDashboard = myAccountDetails => {
    this.props.navigation.replace('Dashboard', {
      myAccountDetails: myAccountDetails,
    });
  };

  render() {}
}
