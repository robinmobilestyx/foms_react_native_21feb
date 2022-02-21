import React, {Component} from 'react';
import Global_Attributes from '../../Utility/Global_Attributes';

export default class TicketController extends Component {
  constructor(props) {
    super(props);
    this.ticketApi = this.ticketApi.bind(this);
  }

  ticketApi = async (bodyParameters, props, previouScreen, apiUrl) => {
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

    await fetch(apiUrl, requestOptions)
      .then(response => response.json())
      .then(responseJson => {
        Global_Attributes.loading = false;
        if (responseJson.status == '200' || responseJson.status == '409') {
          console.log(' Response on Ticket:' + responseJson.msg);
          switch (previouScreen) {
            case 'PonTicket':
            case 'PonPrint':
              console.log(previouScreen + responseJson.data['ticket_no']);
              const ticket = responseJson.data['ticket_no'];
              const formatted_no = responseJson.data['formatted_no'];
              Global_Attributes.PonOneBean['offenceNumber'] = ticket;
              Global_Attributes.PonOneBean['formatted'] = formatted_no;
              //  console.log(previouScreen +);
              console.log(
                'add to bean' + Global_Attributes.PonOneBean['offenceNumber'],
              );
              console.log(
                'add to bean' + Global_Attributes.PonOneBean['formatted'],
              );
              if (previouScreen == 'PonPrint') {
                props.navigation.navigate('PonOffence');
              } else {
                props.navigation.navigate('PonInfo');
              }
              break;

            case 'Summon3':
              console.log(previouScreen + responseJson.data['ticket_no']);
              break;
            case 'Print':
              console.log(previouScreen + responseJson.data['ticket_no']);
              break;
            case 'User_Tickets':
              let userTickets = [];
              Global_Attributes.myticketDetails['total_tickets_used'] =
                responseJson.data['total_tickets_used'];
              Global_Attributes.myticketDetails['total_tickets'] =
                responseJson.data['total_tickets'];
              Global_Attributes.myticketDetails['warning_tickets_count'] =
                responseJson.data['warning_tickets_count'];
            //new Dashboard().getUserTicket(userTickets);
            case 'prsLocation':

            default:
              break;
          }
        } else {
          alert(' ' + responseJson.msg);
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
    //   return(<>)
  }
}
