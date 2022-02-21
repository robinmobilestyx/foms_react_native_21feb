import {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Global_Attributes from '../../Utility/Global_Attributes';

class TicketsModulesApi extends Component {
    
  constructor(props) {
    super(props);
  }

  ticketIdNo = async (responseJson, link, uname, props) => {

    const ticketId = JSON.stringify(responseJson.insert_id);
    console.log("ticketID: ", ticketId)

    await AsyncStorage.setItem('insertId', ticketId);
    props.navigation.replace('Print', {
      url: link,
      module: 'PonInfo',
      uname: uname,
    });
  };

  api_call = (bodyParameters, props, previouScreen, apiUrl) => {

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

    fetch(apiUrl, requestOptions)
      .then(response => response.json())
      .then(responseJson => {
        Global_Attributes.loading = false;
        if (responseJson.status == '200' || responseJson.status == 'success') {
          console.log(' Response:' + responseJson.status);

          switch (previouScreen) {

            case 'PonInfo':
              console.log(' pdf link:' + responseJson.pdf_link);
              console.log(responseJson)
              const uname = bodyParameters['uname'];
              this.ticketIdNo(
                responseJson,
                responseJson.pdf_link,
                uname,
                props,
              );
              // api response
              break;

            case 'warning':
              console.log(' pdf link:' + responseJson.pdf_link);
              const name = bodyParameters['uname'];
              props.navigation.replace('Print', {
                url: responseJson.pdf_link,
                module: 'warning',
                uname: name,
              });
              // api response
              break;
              
            case 'prevLocation':
              console.log(' pdf link:' + responseJson);

              Global_Attributes.PonOneBean['atOne'] = responseJson.data.line1;
              Global_Attributes.PonOneBean['atTwo'] = responseJson.data.near;
              Global_Attributes.PonOneBean['atThree'] = responseJson.data.area;
              Global_Attributes.gpsAddress['gpsPincode'] =
                responseJson.data.pincode;
              Global_Attributes.gpsAddress['gpsCity'] =
                responseJson.data.gpsCity;
              Global_Attributes.gpsAddress['gpsDistrict'] =
                responseJson.data.gpsDistrict;
              Global_Attributes.gpsAddress['gpsState'] =
                responseJson.data.gpsState;
                
              // Global_Attributes.PonOneBean['atOne'] =  responseJson.data.gpsCity;
              console.log(Global_Attributes.gpsAddress['gpsCity']);
              console.log(Global_Attributes.gpsAddress['gpsDistrict']);
              console.log(Global_Attributes.gpsAddress['gpsState']);
              console.log('my prevLocation on the Screen');

              console.log("atone: ", responseJson.data.line1)
              console.log("atTwo: ", responseJson.data.near)
              console.log("atThree: ", responseJson.data.area)

              break;

            default:
              break;
          }
        } else {
          console.log('response:' + responseJson.msg);

          alert(responseJson.msg);
        }
      })
      .catch(error => this.errorDialog(error));
  };

  errorDialog = error => {
    Global_Attributes.loading = false;
    console.log('error in response', error);
    if (error instanceof TypeError) {
      alert('Please check your Internet Connection !');
    } else {
      alert('Failed to connect to the Server. Please try again Later!');
    }
  };

  render() {}
}

export default TicketsModulesApi;
