import React, {Component} from 'react';
import {Alert} from 'react-native';
import Global_Attributes from '../../Utility/Global_Attributes';
import DeviceInfo from 'react-native-device-info';
import {Navigation} from '@react-navigation/native';
import DashboardFooter from '../Dashboard/DashboardFooter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {act} from 'react-test-renderer';

const TAG = 'LawsController :';
var userName = ' ';
var mobile = ' ';

export default class LawsController extends Component {
  constructor(props) {
    super(props);
  }

  getAllActs = (bodyParameters, props, previouScreen, apiUrl) => {
    let formBody = [];
    let parentLaw = [];
    let parentLawid = [];
    let acttitle = [];
    let actno = [];
    let setfine = [];
    let totalPayable = [];
    let actDescription = [];
    let demerits = [];
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
        if (responseJson.status == '200') {
          switch (previouScreen) {
            case 'PonInfo':
              let Length = responseJson.data.parent_law.length;
              // console.log("sasdad " + Length);
              for (let i = 0; i < Length; i++) {
                parentLaw.push(responseJson.data.parent_law[i].title);
                parentLawid.push(responseJson.data.parent_law[i].id);
              }
              Global_Attributes.PonLaws['parent_law'] = parentLaw;
              Global_Attributes.PonLaws['parent_law_id'] = parentLawid;
              console.log('parent law id:', parentLawid);
              break;

            case 'PonOffence':
              let Length1 = responseJson.data.all_act.length;
              console.log('act length:', Length1);
              for (let i = 0; i < Length1; i++) {
                acttitle.push(responseJson.data.all_act[i].act_title);
                actno.push(responseJson.data.all_act[i].act_no);
                setfine.push(responseJson.data.all_act[i].set_fine);
                totalPayable.push(responseJson.data.all_act[i].total_payable);
                actDescription.push(
                  responseJson.data.all_act[i].act_description,
                );
                demerits.push(responseJson.data.all_act[i].demerit_points);
              }
              console.log('act title:', acttitle);
              Global_Attributes.PonLaws['act_length'] = Length1;
              Global_Attributes.PonLaws['act_title'] = acttitle;
              Global_Attributes.PonLaws['act_no'] = actno;
              Global_Attributes.PonLaws['set_fine'] = setfine;
              Global_Attributes.PonLaws['total_payable'] = totalPayable;
              Global_Attributes.PonLaws['act_des'] = actDescription;
              Global_Attributes.PonLaws['demerits'] = demerits;
              break;
          }
        }
      })
      .catch(error => console.log(error));
  };

  getATvalues = (bodyParameters, props, previouScreen, apiUrl) => {
    let formBody = [];
    let ATvalues = [];
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
        if (responseJson.status == '200' || responseJson.status == 'success') {
          let Length = responseJson.data.length;
          for (let i = 0; i < Length; i++) {
            ATvalues.push(responseJson.data[i].value);
          }
          Global_Attributes.PonLaws['ATNEARvalues'] = ATvalues;
        } else {
          console.log(' Response Status ' + responseJson.status);
        }
      })
      .catch(error => console.log(error));
  };

  handleClick = async (bodyParameters, props, previouScreen, apiUrl) => {
    console.log('my value');
    let formBody = [];
    let Respdata = [];
    let Respdataid = [];
    let acttitle = [];
    let actno = [];
    let actdes = [];
    let actapayable = [];
    let actsetfine = [];
    let actdemerit = [];
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
        console.log(responseJson);
        if (responseJson.status == '200') {
          switch (previouScreen) {
            case 'ParentLawsTitle':
              let titleval = responseJson.data.parent_law.length;
              // console.log(titleval);
              for (let i = 0; i < titleval; i++) {
                Respdata['title' + i] = responseJson.data.parent_law[i].title;
                Respdataid['id' + i] = responseJson.data.parent_law[i].id;
              }
              let actvalue = responseJson.data.all_act.length;
              // console.log(actvalue);
              for (let i = 0; i < actvalue; i++) {
                acttitle.push(responseJson.data.all_act[i].act_title);
                actno.push(responseJson.data.all_act[i].act_no);
                actdes.push(responseJson.data.all_act[i].act_description);
                actsetfine.push(responseJson.data.all_act[i].set_fine);
                actapayable.push(responseJson.data.all_act[i].total_payable);
                actdemerit.push(responseJson.data.all_act[i].demerit_points);
              }

              const response = responseJson.data.all_act;

              const RespdataLength = Object.keys(Respdata).length;
              const ActLength = Object.keys(response).length;
              (Global_Attributes.LawSection['acttitle'] = acttitle),
                (Global_Attributes.LawSection['actno'] = actno),
                (Global_Attributes.LawSection['actdes'] = actdes),
                (Global_Attributes.LawSection['actsetfine'] = actsetfine),
                (Global_Attributes.LawSection['actpayble'] = actapayable),
                (Global_Attributes.LawSection['actdemerits'] = actdemerit),
                // console.log(ActLength);
                props.navigation.navigate('LawsParentTitle', {
                  Respdata: Respdata,
                  Respdataid: Respdataid,
                  Length: RespdataLength,
                  ActLength: ActLength,
                });
              break;
            case 'ActLawsTitle':
              let actval = responseJson.data.all_act.length;
              // console.log(actval);
              for (let i = 0; i < actval; i++) {
                acttitle.push(responseJson.data.all_act[i].act_title);
                actno.push(responseJson.data.all_act[i].act_no);
                actdes.push(responseJson.data.all_act[i].act_description);
                actsetfine.push(responseJson.data.all_act[i].set_fine);
                actapayable.push(responseJson.data.all_act[i].total_payable);
                actdemerit.push(responseJson.data.all_act[i].demerit_points);
              }
              const ActdataLength = Object.keys(acttitle).length;
              Global_Attributes.LawSection_ActTitle['acttitle'] = acttitle;
              Global_Attributes.LawSection_ActTitle['actno'] = actno;
              Global_Attributes.LawSection_ActTitle['actdes'] = actdes;
              Global_Attributes.LawSection_ActTitle['actsetfine'] = actsetfine;
              Global_Attributes.LawSection_ActTitle['actpayble'] = actapayable;
              Global_Attributes.LawSection_ActTitle['actdemerits'] = actdemerit;
              props.navigation.navigate('LawsActTitle', {
                Length: ActdataLength,
              });
              break;
          }
        }
      })
      .catch(error => {
        console.log(error);
        alert('Connection Error ,Please try again later');
      });
  };

  render() {}
}
