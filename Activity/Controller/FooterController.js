import React from 'react';
import {Component} from 'react';
import Global_Attributes from '../../Utility/Global_Attributes';

export default class FooterController extends Component {
  helpData = async (bodyParameters, navigation, previouScreen, apiUrl) => {
    // const {navigation} = props;
    let faqdata = [];
    let exp = {};
    let value = {};

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
      .then(responseJSON => {
        Global_Attributes.loading = false;
        if (responseJSON.status == '200') {
          //  console.log(" Response"+responseJSON.status);

          let i;
          let titleval = responseJSON.data.faq_data.length;

          // console.log(titleval);

          for (i = 0; i < titleval; i++) {
            faqdata['title' + i] = responseJSON.data.faq_data[i].title;
            faqdata['ans' + i] = responseJSON.data.faq_data[i].ans;
            exp['ans' + i] = responseJSON.data.faq_data[i].ans.length;

            // console.log("Title " + faqdata["title" + i]);
            for (let j = 0; j < exp['ans' + i]; j++) {
              value['ans' + j] = responseJSON.data.faq_data[i].ans[j];
              // console.log(value["ans" + j]);
            }
          }
          // console.log("controller length"+titleval)

          navigation.navigate('Help', {faqdata: faqdata, lengths: titleval});
        } else {
          // alert(responseJSON.msg);
          // console.log(responseJSON.msg);
        }
      })
      .catch(error => {
        console.error('Error:', error);

        Global_Attributes.loading = false;
      });
  };
  render() {}
}
