import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import LoginScreenFooterStyle from '../Css/LoginScreenFooterStyle';

class LoginScreenFooter extends Component {
  supportDialog = () => {
    Alert.alert(
      'Information',
      ' To contact support,email us at\n\n support@mobilestyx.co.in',
      [
        {
          text: 'Go To mail',
          onPress: () => Linking.openURL('mailto:support@mobilestyx.co.in'),
        },
        {text: 'Cancel', onPress: () => console.log('OK Pressed')},
      ],
    );
  };

  render() {
    return (
      <View style={LoginScreenFooterStyle.container}>
        {/*CheckIn Container*/}
        <View style={LoginScreenFooterStyle.checkin}>
          {/* <TouchableOpacity > */}
          <Image
            style={LoginScreenFooterStyle.image}
            source={require('../assets/checkin.png')}
          />
          <Text style={LoginScreenFooterStyle.text}>Check In</Text>
          {/* </TouchableOpacity> */}
        </View>

        {/*Offence Container*/}
        {/* <View style={LoginScreenFooterStyle.offence}>
            <TouchableOpacity>
            <Image
                style={LoginScreenFooterStyle.off_image}
                source={require('../assets/offence.png')                  
                }/>
                <Text style={LoginScreenFooterStyle.text}>Intiate{"\n"}Offence</Text>

                </TouchableOpacity>
            </View> */}

        {/*Laws Container*/}
        <View style={LoginScreenFooterStyle.law}>
          <TouchableOpacity
            onPress={() => {
              alert('Please login to continue !');
            }}>
            <Image
              style={LoginScreenFooterStyle.image}
              source={require('../assets/law.png')}
            />
            <Text style={LoginScreenFooterStyle.text}>Laws</Text>
          </TouchableOpacity>
        </View>

        {/*Support Container*/}
        <View style={LoginScreenFooterStyle.support}>
          <TouchableOpacity
            onPress={() => {
              this.supportDialog();
            }}>
            <Image
              style={LoginScreenFooterStyle.image}
              source={require('../assets/support.png')}
            />
            <Text style={LoginScreenFooterStyle.text}>Support</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default LoginScreenFooter;
