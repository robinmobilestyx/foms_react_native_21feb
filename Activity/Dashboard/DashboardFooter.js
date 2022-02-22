import React, {useState, useEffect} from 'react';

import {
  Image,
  View,
  TouchableOpacity,
  Text,
  Alert,
  Linking,
} from 'react-native';

import {useLinkProps, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Global_Attributes from '../../Utility/Global_Attributes';
import FooterController from '../Controller/FooterController';
import Loader from '../Dashboard/Loader';
import DashboardFooterStyle from '../Css/DashboardFooterStyle';
import Dialog from "react-native-dialog";

function DashboardFooter() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    Linking.openURL('mailto:support@mobilestyx.co.in')
    setVisible(false);
  };

  const handleDelete = () => {
    setVisible(false);
  };

  getHelpData = async () => {
    try {
      Global_Attributes.loading = true;
      setIsLoading(true);
      const uname = await AsyncStorage.getItem('userName');
      if (uname != null) {
        let paramsBody = {
          user: Global_Attributes.User,
          pass: Global_Attributes.Pass,
          pat_user_id: uname,
        };
        const abc = await new FooterController().helpData(
          paramsBody,
          navigation,
          'help',
          Global_Attributes.faq_data,
        );
        abc;
        setIsLoading(false);
      } else {
        alert('Failed to get data!');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={DashboardFooterStyle.container}>
      <Loader loading={Global_Attributes.loading} />
      {/*CheckIn Container*/}
      <View style={DashboardFooterStyle.me}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            navigation.navigate('Profile');
          }}>
          <Image
            style={DashboardFooterStyle.image}
            source={require('../assets/me.png')}
          />
          <Text style={DashboardFooterStyle.text}>Me</Text>
        </TouchableOpacity>
      </View>

      {/*Help Container*/}
      <View style={DashboardFooterStyle.help}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            getHelpData();
            // Alert.alert("Information","Module under development.");
          }}>
          <Image
            style={DashboardFooterStyle.image}
            source={require('../assets/help.png')}
          />
          <Text style={DashboardFooterStyle.text}>Help</Text>
        </TouchableOpacity>
      </View>

      {/*Support Container*/}
      <View style={DashboardFooterStyle.support}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            showDialog()
            // Alert.alert(
            //   'Information',
            //   ' To contact support,email us at\n\n support@mobilestyx.co.in',
            //   [
            //     {
            //       text: 'Go To Mail',
            //       onPress: () =>
            //         Linking.openURL('mailto:support@mobilestyx.co.in'),
            //     },
            //     {text: 'Cancel', onPress: () => console.log('OK Pressed')},
            //   ],
            // );
          }}>

        <Dialog.Container visible={visible}>
        <Dialog.Title>Information</Dialog.Title>
        <Dialog.Description>
          To contact support,email us at\n\n support@mobilestyx.co.in
        </Dialog.Description>
        <Dialog.Button label="Go To MAIL" onPress={handleCancel} color="#05249d" />
        <Dialog.Button label="Cancel" onPress={handleDelete} color="#05249d"  />
        </Dialog.Container>

          <Image
            style={DashboardFooterStyle.image}
            source={require('../assets/support.png')}
          />
          <Text style={DashboardFooterStyle.text}>Support</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

export default DashboardFooter;
