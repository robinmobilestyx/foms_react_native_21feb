import React, {Component} from 'react';
import {Alert, Image} from 'react-native';
import Global_Attributes from '../../Utility/Global_Attributes';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class UpdateUserDataController extends Component {
  //9136373912
  updatedProfileData = async responseJson => {
    await AsyncStorage.setItem('fname', responseJson.data['fname']);
    await AsyncStorage.setItem('lname', responseJson.data['lname']);
    const fname = await AsyncStorage.getItem('fname');
    const lname = await AsyncStorage.getItem('lname');
    await AsyncStorage.setItem('officer_name', fname + ' ' + lname);
    await AsyncStorage.setItem('signature', responseJson.data['signature']);

    Alert.alert('Alert !', 'Profile Updated Successfully.', [
      {
        text: 'Dashbord',
        onPress: () => {
          this.props.navigation.navigate('Dashboard');
        },
      },
      {text: 'ok'},
    ]);
    this.props.navigation.replace('Profile');
  };

  update = (bodyParameters, props, previouScreen, apiUrl) => {
    this.props = props;

    // let formBody =[];
    // for (var key in bodyParameters) {
    //     var encodedKey = encodeURIComponent(key);
    //     var encodedValue = encodeURIComponent(bodyParameters[key]);
    //     formBody.push(encodedKey + "=" + encodedValue);
    // }
    // formBody = formBody.join("&");

    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data; charset=utf-8',
      },
      body: bodyParameters,
    };

    fetch(apiUrl, requestOptions)
      .then(response => response.json())
      .then(responseJson => {
        Global_Attributes.loading = false;
        AsyncStorage.setItem('Sign_Path', '');
        if (responseJson.status == '200' || responseJson.status == 'success') {
          // console.log(" FirstName " + responseJson.data['fname'])
          // console.log(" LastName  " + responseJson.data['lname'])
          // console.log(" Signature " + responseJson.data['signature'])
          this.updatedProfileData(responseJson);
        } else {
          alert(' Error' + responseJson.msg);
          console.log('hear is response');
        }
      })
      .catch(function (error) {
        Global_Attributes.loading = false;
        console.log(
          'There has been a problem with your fetch operation: ' +
            error.message,
        );
      });
  };
  render() {
    // return(
    // );
  }
}
