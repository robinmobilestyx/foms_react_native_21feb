import React, {Component} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Platform,
  BackHandler,
  Alert,
} from 'react-native';

import PropTypes from 'prop-types';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// import pon from '../assets/app_icon.png';

import Config from 'react-native-config';
import location from '../assets/location.png';
import Global_Attributes from '../../Utility/Global_Attributes';
import {TextInput, Button, Colors} from 'react-native-paper';
import UpdateUserDataController from '../Controller/UpdateUserDataController';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from './Loader';

export default class Profile extends Component {
  constructor() {
    super();
    this.backAction = this.backAction.bind(this);

    this.state = {
      editable: false,
      TouchableOpacityDisable: true,
      showUpdateBtn: false,
      officername: '',
      platoon: '',
      officerno: '',
      phonenumber: '',
      fname: '',
      lname: '',
      email: '',
      Sign: 'data:image/png;base64,',
      SignPath: '',
      city: '',
      focus: false,
    };
  }

  componentDidMount = async () => {
    BackHandler.addEventListener('hardwareBackPress', this.backAction);
    this.Profiledata();
    AsyncStorage.setItem('Sign_Path', '');

    this.props.navigation.addListener('focus', () => {
      this.Signupdate();
    });
    if ((await AsyncStorage.getItem('signature')) == null) {
      Alert.alert(
        'Alert!',
        'OTP Verified. Please set your signature in profile !',
      );
      this.setState({
        showUpdateBtn: true,
        editable: true,
        TouchableOpacityDisable: false,
      });
    }
  };

  backAction() {
    this.props.navigation.navigate('Dashboard');
    return true;
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backAction);
  }

  Signupdate = async () => {
    const Sign_Path = await AsyncStorage.getItem('Sign_Path');
    this.setState({SignPath: Sign_Path});
  };

  changeEditbtn = () => {
    this.setState({
      editable: true,
      TouchableOpacityDisable: false,
      showUpdateBtn: true,
    });
  };

  Profiledata = async () => {
    try {
      const officername = await AsyncStorage.getItem('officer_name');

      const officerno = await AsyncStorage.getItem('officer_no');
      const platoon = await AsyncStorage.getItem('platoon');
      const phonenumber = await AsyncStorage.getItem('phoneNumber');
      const fname = await AsyncStorage.getItem('fname');
      const lname = await AsyncStorage.getItem('lname');
      const email = await AsyncStorage.getItem('email');
      const Sign = await AsyncStorage.getItem('signature');
      const city = await AsyncStorage.getItem('city');
      this.setState({
        officername: officername,
        officerno: officerno,
        platoon: platoon,
        phonenumber: phonenumber,
        fname: fname,
        lname: lname,
        email: email,
        Sign: Sign,
        city: city,
        isLoading: Global_Attributes.loading,
      });
    } catch (error) {
      console.log('hey' + error);
      this.errorDialog(error);
    }
  };

  updateBtn = async () => {
    if (this.state.fname.trim() === '') {
      alert(' First name is required');
    } else if (this.state.lname.trim() == '') {
      alert('Last name is required');
    } else {
      Global_Attributes.loading = true;
      this.setState({isLoading: true});
      let formData = new FormData();

      // Update the formData object
      formData.append('user', Global_Attributes.User);
      formData.append('pass', Global_Attributes.Pass);

      formData.append('uname', await AsyncStorage.getItem('userName'));
      formData.append('fname', this.state.fname);
      formData.append('lname', this.state.lname);
      formData.append('region_type', 'City');
      formData.append('email', this.state.email);
      formData.append('user_id', await AsyncStorage.getItem('user_id'));
      formData.append('officer_no', this.state.officerno);
      formData.append('mobile_no', this.state.phonenumber);
      formData.append(
        'country_code',
        await AsyncStorage.getItem('country_code'),
      );
      formData.append('platoon', this.state.platoon);
      formData.append('level', await AsyncStorage.getItem('level'));
      formData.append('branch', await AsyncStorage.getItem('branch'));
      formData.append('city', this.state.city);
      formData.append('state', await AsyncStorage.getItem('state'));
      formData.append('department', await AsyncStorage.getItem('department'));
      formData.append(
        'laws_version',
        await AsyncStorage.getItem('laws_version'),
      );

      if ((await AsyncStorage.getItem('Sign_Path')) == null) {
        console.log('Signature not Change');
        formData.append('change_signature', 'N');
      } else {
        console.log('Signature Change');
        formData.append('change_signature', 'Y');
        const timestamp = new Date().getTime().toString();
        const signature = {
          uri:
            Platform.OS === 'android'
              ? 'file://' + (await AsyncStorage.getItem('Sign_Path'))
              : await AsyncStorage.getItem('Sign_Path').replace('file://', ''), //path of image
          name:
            (await AsyncStorage.getItem('userName')) + '_' + timestamp + '.png', // name of the image
          type: 'image/jpeg', // image type
        };
        formData.append('signature_img', signature);
      }

      new UpdateUserDataController().update(
        formData,
        this.props,
        'Profile',
        Global_Attributes.profile,
      );
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
        <View style={styles.View}>
          <View style={styles.mainView}>
            <Image style={styles.ponLogo} source={this.App_icon}></Image>
            <Text style={styles.officer_name_text}>{this.state.officerno}</Text>
            <Text style={styles.profile_platoon}>
              {'Platoon-' + this.state.platoon}
            </Text>
            <View style={styles.profile_view}>
              <Text style={styles.profile_name}>{this.state.officername}</Text>
              <Text style={styles.profile_email}>{this.state.email}</Text>
              <Text style={styles.profile_number}>
                {this.state.phonenumber}
              </Text>
              <Text style={styles.profile_city}>{this.state.city}</Text>
              <Image style={styles.profile_city_logo} source={location}></Image>
            </View>
            <View style={styles.textInputView}>
              <TextInput
                style={styles.firstnametextInput}
                label={'First Name'}
                value={this.state.fname}
                onChangeText={text => this.setState({fname: text})}
                clearButtonMode="always"
                underlineColor={'#11246F'}
                selectionColor={'#11246F'}
                editable={this.state.editable}></TextInput>
              <TextInput
                style={styles.lastnametextInput}
                label={'Last Name'}
                value={this.state.lname}
                onChangeText={text => this.setState({lname: text})}
                clearButtonMode="always"
                underlineColor={'#11246F'}
                selectionColor={'#11246F'}
                editable={this.state.editable}></TextInput>
            </View>
            <View style={{bottom: 60}}>
              <View style={styles.signview}>
                <TouchableOpacity
                  disabled={this.state.TouchableOpacityDisable}
                  style={{flex: 1}}
                  onPress={() => {
                    this.props.navigation.navigate('SignPad');
                  }}>
                  {!this.state.showUpdateBtn ? (
                    <Text></Text>
                  ) : (
                    <Text style={styles.signtext}>Tap to Sign</Text>
                  )}

                  {!this.state.SignPath ? (
                    <Image
                      style={styles.signImage}
                      source={{uri: this.state.Sign}}
                    />
                  ) : (
                    <Image
                      style={styles.signImage}
                      source={{uri: 'file://' + this.state.SignPath}}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            {!this.state.showUpdateBtn ? (
              <TouchableOpacity
                style={styles.updatebtn}
                onPress={this.changeEditbtn}>
                <Text
                  style={{
                    color: 'white',
                    alignSelf: 'center',
                    fontSize: 15,
                    fontWeight: '700',
                  }}>
                  EDIT
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.updatebtn}
                onPress={this.updateBtn}>
                <Text
                  style={{
                    color: 'white',
                    alignSelf: 'center',
                    fontSize: 15,
                    fontWeight: '700',
                  }}>
                  UPDATE
                </Text>
              </TouchableOpacity>
            )}
            <Loader loading={Global_Attributes.loading} />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F9F6F6',
  },
  View: {
    backgroundColor: '#11246F',
    height: hp('18%'),
    width: wp('100%'),
  },
  mainView: {
    backgroundColor: '#ffffff',
    height: hp('18'),
    width: wp('90%'),
    borderRadius: 10,
    top: 70,
    alignSelf: 'center',
  },
  ponLogo: {
    height: hp('10%'),
    width: wp('18%'),
    alignSelf: 'center',
    bottom: 40,
  },
  officer_name_text: {
    paddingStart: 4,
    paddingEnd: 4,
    paddingLeft: 4,
    paddingRight: 4,
    height: 22,
    fontSize: 16,
    start: 8,
    position: 'absolute',
    color: 'black',
    fontWeight: 'bold',
  },
  profile_platoon: {
    paddingStart: 4,
    paddingEnd: 4,
    paddingLeft: 4,
    paddingRight: 4,
    height: 22,
    fontSize: 16,
    alignSelf: 'flex-end',
    end: 5,
    position: 'absolute',
    color: 'black',
    fontWeight: 'bold',
  },
  profile_view: {
    width: wp('90%'),
    alignSelf: 'center',
    flexDirection: 'column',
    height: hp('20'),
  },
  profile_name: {
    paddingStart: 4,
    paddingEnd: 4,
    paddingLeft: 4,
    paddingRight: 4,

    fontSize: 20,
    textAlign: 'center',
    bottom: 30,
    color: 'black',
    fontWeight: 'bold',
  },
  profile_email: {
    fontSize: 15,
    marginLeft: 10,

    bottom: 25,
    color: 'black',
    fontWeight: 'bold',
  },
  profile_number: {
    alignSelf: 'flex-end',
    bottom: 45,
    marginRight: 10,
    color: 'black',
    fontWeight: 'bold',
  },
  profile_city: {
    alignSelf: 'center',
    fontSize: 16,
    bottom: 35,
    color: 'black',
    paddingBottom: 5,
    fontWeight: 'bold',
  },
  profile_city_logo: {
    alignSelf: 'center',
    bottom: 63,
    tintColor: '#11246F',
    start: 65,
  },
  textInputView: {
    flexDirection: 'row',
    bottom: hp('11%'),
  },
  firstnametextInput: {
    width: wp('42%'),
    backgroundColor: '#F9F6F6',
  },
  lastnametextInput: {
    width: wp('42%'),
    backgroundColor: '#F9F6F6',
    start: 20,
    end: 20,
  },
  signview: {
    height: hp('35%'),
    width: wp('90%'),
    borderRadius: 20,
    borderWidth: 0.6,
    padding: 5,
    alignSelf: 'center',
  },
  signtext: {
    alignSelf: 'center',
    fontWeight: '500',
    color: 'black',
  },
  updatebtn: {
    height: hp('7%'),
    width: wp('30%'),
    borderRadius: 8,
    backgroundColor: '#11246f',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: hp('5%'),
  },
  signImage: {
    flex: 1,
    borderRadius: 10,
  },
});
