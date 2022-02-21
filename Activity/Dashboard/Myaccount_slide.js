import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Global_Attributes from '../../Utility/Global_Attributes';
import cloudImage from '../assets/cloud4.png';
import profileImage from '../assets/profile.png';
import verify_user from '../assets/verified_user4.png';
import watch_later from '../assets/watch_later4.png';
export default class Myaccount_slide extends Component {
  static propTypes = {
    officer_name: PropTypes.string.isRequired,
    officer_number: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
    platoon: PropTypes.string.isRequired,
  };

  render() {
    const {officer_name, officer_number, level, platoon} = this.props;
    return (
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.myAccountView}>
          <Text style={styles.accountText}>My Account Details</Text>
        </View>
        {/* Second  Main Flex */}
        <View style={{flex: 2, flexDirection: 'row'}}>
          {/* Second  sub Flex */}
          <View style={styles.iconAndTextView}>
            <View style={styles.singleItemsView}>
              <Image style={styles.profileimage} source={profileImage}></Image>
              <Text style={styles.officer_name}>{officer_name}</Text>
            </View>
            <View style={styles.singleItemsView}>
              <Image style={styles.profileimage} source={cloudImage}></Image>
              <Text style={styles.officer_name}>{level}</Text>
            </View>
            <View style={styles.singleItemsView}>
              <Image style={styles.profileimage} source={verify_user}></Image>
              <Text style={styles.officer_name}>
                Officer Number {officer_number}
              </Text>
            </View>
            <View style={styles.singleItemsView}>
              <Image style={styles.profileimage} source={watch_later}></Image>
              <Text style={styles.officer_name}>Platoon {platoon}</Text>
            </View>
          </View>
          {/* Second  sub Flex */}
          <View style={styles.largeprofileimageView}>
            <Image
              style={styles.largeprofileimage}
              source={profileImage}></Image>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#05249d',
    borderRadius: 12,
  },

  myAccountView: {
    top: 8,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  accountText: {
    color: '#ffffff',
    fontSize: 18,
    justifyContent: 'center',
    alignSelf: 'center',
    paddingLeft: 10,
    fontFamily: Global_Attributes.fixfontstyle,
  },

  profileimage: {
    height: 20,
    width: 20,
    tintColor: '#ffffff',
  },

  largeprofileimage: {
    height: 50,
    width: 50,
    tintColor: '#ffffff',
  },

  largeprofileimageView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconAndTextView: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'center',
    paddingTop: 20,
    paddingLeft: 20,
  },

  singleItemsView: {
    flex: 1,
    flexDirection: 'row',
  },

  officer_name: {
    color: '#ffffff',
    fontSize: 12,
    paddingLeft: 30,
    fontFamily: Global_Attributes.fixfontstyle,
  },
});
