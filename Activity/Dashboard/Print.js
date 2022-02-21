import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Button, BackHandler} from 'react-native';
import PdfViewStyle from '../Css/PdfViewStyle';
import Pdf from 'react-native-pdf';
import RNPrint from 'react-native-print';
import TicketController from '../Controller/TicketController';
import Global_Attributes from '../../Utility/Global_Attributes';
import Dashboardstyle from '../Css/Dashboardstyle';
import {request, PERMISSIONS, RESULTS, check} from 'react-native-permissions';
import NumVerificationController from '../Controller/NumVerificationController';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from './Loader';

const PLATEFORM_BLUETOOTH_PERMISSION = {
  ios: PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL,
  android: PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
};

const REQUEST_PERMISSION_TYPE = {
  bluetooth: PLATEFORM_BLUETOOTH_PERMISSION,
};

const PERMISSION_TYPE = {
  bluetooth: 'bluetooth',
};

class Print extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uname: ' ',
    };
    this.addCharge = this.addCharge.bind(this);
    this.backAction = this.backAction.bind(this);
    console.log('uname' + this.state.uname);
    this.getUname();
  }

  getUname = async () => {
    try {
      const username = await AsyncStorage.getItem('userName');
      if (username != null) {
        this.setState({uname: username});
      } else {
        this.props.navigation.navigate('NumberVerification', {
          isVisible: false,
        });
      }
    } catch (error) {
      console.log(error);
      NumVerificationController.errorDialog(error);
    }
  };

  // Permission check

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
        this.printRemotePDF();
        return true;
      }

      return this.requestPermission(permission);
    } catch (error) {
      console.log(error);
    }
  };

  //Request permission

  requestPermission = async permission => {
    try {
      const result = await request(permission);
      console.log('permission request', result);
      this.printRemotePDF();
      return result === RESULTS.GRANTED;
    } catch (error) {
      console.log('App permission result fail ' + error);
      return false;
    }
  };

  async printRemotePDF() {
    await RNPrint.print({filePath: this.props.route.params.url});
  }

  addCharge = async () => {
    //new Dashboard().updateTicketBucket("Print",this.state.apiUrl);
    Global_Attributes.loading = true;
    this.setState({isLoading: true});
    let paramsBody = {
      user: Global_Attributes.User,
      pass: Global_Attributes.Pass,
      pat_user_id: this.state.uname,
    };

    const controller = await new TicketController().ticketApi(
      paramsBody,
      this.props,
      'PonPrint',
      Global_Attributes.ponTicketApiUrl,
    );
    controller;
    this.setState({isLoading: false});

    //   }
  };
  
  backAction() {
    this.props.navigation.replace('Dashboard');
    return true;
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backAction);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backAction);
  }

  render() {

    var url = {uri: this.props.route.params.url};
    var module = this.props.route.params.module;

    return (
      <View style={PdfViewStyle.maincontainer}>
        <View style={{flex: 5}}>
          <Loader loading={Global_Attributes.loading} />
          {/* <View style={PdfViewStyle.upppercontainer}> */}
          <Pdf
            source={url}
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`number of pages: ${numberOfPages}`);
            }}
            // onPageChanged={(page,numberOfPages)=>{
            //     console.log(`current page: ${page}`);
            // }}
            onError={error => {
              console.log(error);
            }}
            style={PdfViewStyle.pdf}
          />
        </View>
        <View
          style={{
            flex: 0.6,
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity
            style={PdfViewStyle.touchableOpacity1}
            onPress={() => {
              this.checkPermission(PERMISSION_TYPE.bluetooth);
            }}>
            <Text style={PdfViewStyle.text}>PRINT</Text>
          </TouchableOpacity>
          {module == 'PonInfo' ? (
            <TouchableOpacity
              style={PdfViewStyle.touchableOpacity2}
              onPress={() => {
                this.addCharge();
              }}>
              {module == 'PonInfo' ? (
                <Text style={PdfViewStyle.text}>ADDITIONAL CHARGE</Text>
              ) : (
                <Text style={PdfViewStyle.text}>ADDITIONAL WARNING</Text>
              )}
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  }
}

export default Print;
