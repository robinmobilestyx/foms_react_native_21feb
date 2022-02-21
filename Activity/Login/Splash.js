import React from 'react';
import {Component} from 'react';

import {
  Platform,
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  Text,
  ActivityIndicator,
  platform,
  Alert,
  BackHandler,
  LogBox,
} from 'react-native';

import Config from 'react-native-config';
import NumVerificationController from '../Controller/NumVerificationController';
// import Global_Attributes from '../../../Utility/Global_Attributes';
import Global_Attributes from '../../Utility/Global_Attributes';
import packageJson from '../../package.json';
import Loader from '../Dashboard/Loader';
import NetInfo from '@react-native-community/netinfo';
import DeviceInfo from 'react-native-device-info';
import RNExitApp from 'react-native-exit-app';
import {request, PERMISSIONS, RESULTS, check} from 'react-native-permissions';

LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const PLATEFORM_STORAGE_PERMISSION = {
  ios: PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL,
  android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
};

const REQUEST_PERMISSION_TYPE = {
  storage: PLATEFORM_STORAGE_PERMISSION,
};

const PERMISSION_TYPE = {
  storage: 'storage',
};

export default class Splash extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: true,
      isLoading: Global_Attributes.loading,
    };
    this.getNetInfo();

    Global_Attributes.deviceID = DeviceInfo.getUniqueId();
    console.log('spalsh: ', Global_Attributes.deviceID);
  }

  // check login

  checkPermission = async type => {
    const permission = REQUEST_PERMISSION_TYPE[type][Platform.OS];
    console.log(permission);
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
      console.log(error);
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

  api_call = async () => {
    this.setState({isLoading: true});
    var user = Global_Attributes.User;
    var pass = Global_Attributes.Pass;
    var splashBody = {
      user: user,
      pass: pass,
      platform: 'android_version', // ios_version
    };
    const abc = await new NumVerificationController().handleClick(
      splashBody,
      this.props,
      'splash',
      Global_Attributes.splashUrl,
    );
    abc;
    this.setState({isLoading: false});
  };

  getNetInfo = () => {
    // To get the network state once
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        Global_Attributes.loading = true;
        this.checkPermission(PERMISSION_TYPE.storage);
      } else {
        Alert.alert('Alert', 'Please check your internet connection !', [
          {
            text: 'OK',
            onPress: () => RNExitApp.exitApp(),
          },
        ]);
      }
    });
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
      <SafeAreaView style={styles.MainContainer}>
        <View style={styles.SplashScreen_RootView}>
          <View style={styles.SplashScreen_ChildView}>
            <Image
              source={this.App_icon}
              style={{width: '70%', height: '70%', resizeMode: 'contain'}}
            />
            <Loader loading={Global_Attributes.loading} />
          </View>
          <View
            style={{
              alignSelf: 'flex-end',
              right: 0,
              margin: 5,
              bottom: 0,
              position: 'absolute',
            }}>
            <Text
              style={{
                fontSize: 14,
                margin: 5,
                fontWeight: 'bold',
                alignSelf: 'center',
              }}>
              Version {packageJson.version}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CDCDCD',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },

  SplashScreen_RootView: {
    justifyContent: 'center',
    flex: 1,
    margin: 10,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  SplashScreen_ChildView: {
    justifyContent: 'center',
    alignItems: 'center',
    //  backgroundColor: '#00BCD4',
    flex: 1,
  },
  logoContainer: {
    width: 220,
    height: 90,
    // alignSelf: "center",
    // alignItems:"center"
    // top: 10
  },

  logo: {
    position: 'absolute',
    // top:40,
    // height:200,
    // width:170,
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
    // position:'absolute'
  },
});
