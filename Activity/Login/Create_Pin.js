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
import Checkbox from 'react-native-checkbox-animated';
import Loader from '../Dashboard/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Create_Pin extends Component {

  constructor(props) {
    super(props);

    this.setAsyncdata();
    this.next = this.next.bind(this);

    this.state = {
      number: '',
      isChacked: false,
      isLoading: Global_Attributes.loading,
      pin_no: '',
      re_pin_no: '',
    };

  }

  checkBoxChanged() {
    this.setState({isChacked: !this.state.isChacked});
  }

  setAsyncdata = async () => {
    var phn = await AsyncStorage.getItem('phoneNumber');
    console.log('number in create pin:', phn);
    this.setState({number: phn});
  };

  next = async () => {

    if (this.state.pin_no == ' ') {
      alert('Enter Pin !');
    } else if (this.state.pin_no.length != 4) {
      alert('Pin no should be of 4 digit !');
    } else if (this.state.re_pin_no == ' ') {
      alert('Re-enter Pin !');
    } else if (this.state.re_pin_no.length != 4) {
      alert('Re-Pin no should be of 4 digit !');
    } else if (this.state.pin_no.localeCompare(this.state.re_pin_no) != 0) {
      alert('Pin does not match !');
    } else {

      Global_Attributes.fpenrolls = 'No';
      var fpenroll = 'No';

      if (this.state.isChacked) {

        fpenroll = 'Yes';
        Global_Attributes.fpenrolls = 'Yes';
        console.log('create pin fp' + Global_Attributes.fpenrolls);

      } else {

        fpenroll = 'No';
        Global_Attributes.fpenrolls = 'No';
        console.log('create pin fp' + Global_Attributes.fpenrolls);

      }

      Global_Attributes.loading = true;
      this.setState({isLoading: true});

    //   var user = Global_Attributes.User;
    //   var pass = Global_Attributes.Pass;
    //   let deviceId = DeviceInfo.getUniqueId();

      let numberVerBody = {
        user: Global_Attributes.User,
        pass: Global_Attributes.Pass,
        mobile_no: this.state.number,
        pin_action: 'create_pin',
        pin_no: this.state.pin_no,
        device_id: Global_Attributes.deviceID,
        fingerprint_concent: fpenroll,
      };

      console.log('fpEnroll send:' + this.state.isChacked + fpenroll);

      const abc = await new NumVerificationController().handleClick(
        numberVerBody,
        this.props,
        'Create_Pin',
        Global_Attributes.CreatePinAndLogin,
      );
      
      abc;
      this.setState({isLoading: false});
    }

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
          <Text style={styles.text}>Create New Pin</Text>
        </View>

        <View stye={styles.inputView}>
          <TextInput
            style={styles.textInput1}
            secureTextEntry={true}
            selectionColor={'#11246F'}
            value={this.state.pin_no ? this.state.pin_no.trim() : null}
            onChangeText={numeric => this.setState({pin_no: numeric})}
            maxLength={4}
            numeric
            keyboardType={'numeric'}
            clearButtonMode="always"
            placeholder="Enter Pin"
            placeholderTextColor="#999999"
          />
          <TextInput
            style={styles.textInput2}
            secureTextEntry={true}
            selectionColor={'#11246F'}
            value={this.state.re_pin_no ? this.state.re_pin_no.trim() : null}
            onChangeText={numeric => this.setState({re_pin_no: numeric})}
            maxLength={4}
            numeric
            keyboardType={'numeric'}
            clearButtonMode="always"
            placeholder="Re-enter Pin"
            placeholderTextColor="#999999"
          />
          <View style={styles.checkBoxView}>

            {Global_Attributes.pinSuccess ? (
              <Checkbox
                label={'FingerPrint Enrollment \n Authentication'}
                checked={this.state.isChacked}
                onValueChange={() => this.checkBoxChanged()}
                unCheckedBackgroundColor={'#CDCDCD'}
                checkedBackgroundColor={'#11246F'}
                checkedBorderColor={'#11246F'}
                borderWidth={2}
                checkMarkColor={'white'}
                checkMarkSize={18}
                animationType={'left'}
                size={18}
                labelStyle={{
                  paddingBottom: 5,
                  color: 'black',
                  fontFamily: Global_Attributes.fixfontstyle,
                }}
                rippleEffect={false}></Checkbox>
            ) : null}

          </View>
        </View>

        <View style={styles.loginBtn}>
          <TouchableOpacity
            onPress={() => {
              this.next();
            }}>
            <Text style={styles.btnText}>SET PIN</Text>
          </TouchableOpacity>
        </View>

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
    fontSize: 20,
    alignSelf: 'center',
    fontFamily: Global_Attributes.fixfontstyle,
  },

  inputView: {
    alignSelf: 'center',
    justifyContent: 'center',
  },

  textInput1: {
    backgroundColor: '#ffffff',
    borderColor: '#11246F',
    color: '#000000',
    fontSize: 16,
    height: 40,
    width: 200,
    borderRadius: 10,
    alignSelf: 'center',
    bottom: 30,
    textAlign: 'center',
    fontFamily: Global_Attributes.fixfontstyle,
  },

  textInput2: {
    backgroundColor: '#ffffff',
    borderColor: '#11246F',
    color: '#000000',
    fontSize: 16,
    height: 40,
    width: 200,
    borderRadius: 10,
    alignSelf: 'center',
    bottom: 15,
    textAlign: 'center',
    fontFamily: Global_Attributes.fixfontstyle,
  },

  checkBoxView: {
    alignSelf: 'center',
    width: 200,
    height: 50,
    color: '#11246f',
  },

  loginBtn: {
    width: 100,
    backgroundColor: '#11246f',
    borderRadius: 10,
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    width: 200,
    top: 10,
  },

  btnText: {
    alignSelf: 'center',
    marginLeft: '1%',
    fontSize: 16,
    color: '#ffff',
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
