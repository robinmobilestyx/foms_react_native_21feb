import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import Global_Attributes from '../../Utility/Global_Attributes';

export class ReportsController extends Component {
  constructor(props) {
    super(props);
  }
  getTicketDetails = async (bodyParameters, props, previouScreen, apiUrl) => {
    let formBody = [];
    let TicketData = [];
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
        if (responseJson.status == '200') {
          switch (previouScreen) {
            case 'PonReports':
              let ticketValue = responseJson.data.length;
              // console.log(ticketValue);
              TicketData['index_text'] = responseJson.index_text;
              TicketData['previous_index'] = responseJson.previous_index;
              TicketData['next_index'] = responseJson.next_index;

              for (let i = 0; i < ticketValue; i++) {
                TicketData['pon_id' + i] = responseJson.data[i].pon_id;
                TicketData['ticket_no' + i] = responseJson.data[i].ticket_no;
                TicketData['fname' + i + 'lname' + i + 'mname' + i] =
                  responseJson.data[i].fname +
                  ' ' +
                  responseJson.data[i].lname +
                  ' ' +
                  responseJson.data[i].mname;
                TicketData['form_date' + i] = responseJson.data[i].form_date;
                TicketData['offender_copy' + i] =
                  responseJson.data[i].pdfs['pon'];
                TicketData['OfficerPonPdf' + i] =
                  responseJson.data[i].pdfs['pon_officer'];
                TicketData['CourtPonPdf' + i] =
                  responseJson.data[i].pdfs['pon_court'];
                TicketData['hold_status' + i] =
                  responseJson.data[i].hold_status;
                // console.log("Pon id=" + TicketData['pon_id' + i]);
                // console.log("Name=" + TicketData['fname' + i + 'lname' + i + 'mname' + i]);
                // console.log("ticket no " + TicketData['ticket_no' + i]);
              }
              // const DataLength = Object.keys(TicketData).length;
              props.navigation.navigate('PonReports', {
                TicketData: TicketData,
                Length: ticketValue,
              });
              break;

            case 'PonWarning':
              let ticketValue1 = responseJson.data.length;
              // console.log(ticketValue1);
              TicketData['index_text'] = responseJson.index_text;
              TicketData['previous_index'] = responseJson.previous_index;
              TicketData['next_index'] = responseJson.next_index;

              for (let i = 0; i < ticketValue1; i++) {
                TicketData['fname' + i + 'lname' + i + 'mname' + i] =
                  responseJson.data[i].fname +
                  ' ' +
                  responseJson.data[i].lname +
                  ' ' +
                  responseJson.data[i].mname;
                TicketData['form_date' + i] = responseJson.data[i].form_date;
                TicketData['offender_copy' + i] =
                  responseJson.data[i].pdfs['warning'];

                // console.log("Name=" + TicketData['fname' + i + 'lname' + i + 'mname' + i]);
                // console.log("Form Date=" + TicketData['form_date' + i]);
                // console.log("Offender copy=" + TicketData['offender_copy' + i]);
              }
              props.navigation.navigate('PonWarning', {
                TicketData: TicketData,
                Length: ticketValue1,
              });
              break;

            case 'PonReleaseForm':
              let ticketValue2 = responseJson.data.length;
              // console.log(ticketValue2);
              TicketData['index_text'] = responseJson.index_text;
              TicketData['previous_index'] = responseJson.previous_index;
              TicketData['next_index'] = responseJson.next_index;

              for (let i = 0; i < ticketValue2; i++) {
                TicketData['case_no' + i] = responseJson.data[i].case_no;
                TicketData['offender_name' + i] =
                  responseJson.data[i].offender_name;
                TicketData['offence_date' + i] =
                  responseJson.data[i].offence_date;
                TicketData['appearance_notice' + i] =
                  responseJson.data[i].pdfs['appearance_notice'];
                TicketData['affidivat_notice' + i] =
                  responseJson.data[i].pdfs['affidivat_notice'];

                // console.log("Case No =" + TicketData['case_no' + i]);
                // console.log("Name=" + TicketData['offender_name' + i]);
                // console.log("Offence Date=" + TicketData['offence_date' + i]);
                // console.log("Offender copy=" + TicketData['affidivat_notice' + i]);
              }
              props.navigation.navigate('PonReleaseForm', {
                TicketData: TicketData,
                Length: ticketValue2,
              });
              break;

            case 'PonSummons':
              let ticketValue3 = responseJson.data.length;

              TicketData['index_text'] = responseJson.index_text;
              TicketData['previous_index'] = responseJson.previous_index;
              TicketData['next_index'] = responseJson.next_index;

              for (let i = 0; i < ticketValue3; i++) {
                TicketData['pon_id' + i] = responseJson.data[i].pon_id;
                TicketData['ticket_no' + i] = responseJson.data[i].ticket_no;
                TicketData['form_date' + i] = responseJson.data[i].form_date;
                TicketData['fname' + i + 'lname' + i + 'mname' + i] =
                  responseJson.data[i].fname +
                  ' ' +
                  responseJson.data[i].lname +
                  ' ' +
                  responseJson.data[i].mname;
                TicketData['summon3_drivers' + i] =
                  responseJson.data[i].pdfs['summon3_drivers'];
                TicketData['summon3_officer' + i] =
                  responseJson.data[i].pdfs['summon3_officer'];
                TicketData['summon3_affidivat' + i] =
                  responseJson.data[i].pdfs['summon3_affidivat'];
                TicketData['hold_status' + i] =
                  responseJson.data[i].hold_status;
              }
              props.navigation.navigate('PonSummons', {
                TicketData: TicketData,
                Length: ticketValue3,
              });
              break;
            default:
              console.log('Response from ' + previouScreen);
          }
        }
      });
  };
  uploadNotes = async (bodyParameters, props, previouScreen, apiUrl) => {
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
          console.log(' Response Status ' + responseJson.status);
          console.log(' Response PDF ' + responseJson.pdf_path);
        } else {
          console.log(' Response Status ' + responseJson.status);
        }
      });
  };

  CancelRoadSide = async (bodyParameters, props, previouScreen, apiUrl) => {
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
          console.log(' Response Status ' + responseJson.status);
          console.log(' Response message ' + responseJson.msg);
        }
      });
  };
}
