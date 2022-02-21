import React, {Component} from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
  StyleSheet,
  Modal,
  Alert,
} from 'react-native';

import Ticketsuser from '../assets/userspeaks.png';
import Mic from '../assets/mic.png';
import TicketsComponentStyle from '../Css/TicketsComponentStyle';
import TicketsStyle from '../Css/TicketsStyle';
import Global_Attributes from '../../Utility/Global_Attributes';
import {TicketListController} from '../Controller/TicketListController';

class PonReports_old extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
      Alert_Visibility: false,
      colorId: 0,
      onPress: 0,
      currentIndex: '1',
      searchVal: '',
    };
  }

  Show_Custom_Alert(visible) {
    this.setState({Alert_Visibility: visible});
  }

  submit_Button = () => {
    Alert.alert('Submit Button Clicked.');
  };

  onPress = id => {
    this.setState({colorId: id});
  };

  render() {
    const ticketObj = this.props.route.params.TicketData;
    const Length = this.props.route.params.Length;
    const Ticket_Index = ticketObj['index_text'];
    var output = [];
    console.log('Length:' + Length);

    for (let i = 0; i < Length; i++) {
      Global_Attributes.TicketId = ticketObj['ticket_no' + i];
      Global_Attributes.Name =
        ticketObj['fname' + i + 'lname' + i + 'mname' + i];
      Global_Attributes.Date = ticketObj['form_date' + i];

      console.log(
        Global_Attributes.TicketId +
          ' ' +
          Global_Attributes.Name +
          ' ' +
          Global_Attributes.Date +
          ' ' +
          Global_Attributes.PonPdf,
      );

      var TempItem = (
        <View key={i} style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 5,
              marginStart: 10,
              marginEnd: 10,
            }}>
            <Text style={{fontSize: 17, fontWeight: 'bold', flex: 1}}>
              {Global_Attributes.TicketId}{' '}
            </Text>
            <Text
              style={{
                fontSize: 17,
                fontWeight: 'bold',
                flex: 1,
                textAlign: 'right',
              }}>
              {Global_Attributes.Date}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 16,
              marginStart: 10,
              marginEnd: 10,
            }}>
            <Text style={{fontSize: 17, flex: 1}}>
              {Global_Attributes.Name}
            </Text>
            <TouchableOpacity
              onPress={() => {
                this.Show_Custom_Alert(true);
              }}
              style={{alignSelf: 'flex-end'}}>
              <Image
                source={Ticketsuser}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: '#d50b16',
                  alignSelf: 'flex-end',
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Print', {
                  url: ticketObj['offender_copy' + i],
                });
              }}
              style={TicketsComponentStyle.offender_officer_court_button}>
              <Text
                style={
                  TicketsComponentStyle.offender_officer_court_button_text
                }>
                OFFENDER
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Print', {
                  url: ticketObj['OfficerPonPdf' + i],
                });
              }}
              style={TicketsComponentStyle.offender_officer_court_button}>
              <Text
                style={
                  TicketsComponentStyle.offender_officer_court_button_text
                }>
                OFFICER
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Print', {
                  url: ticketObj['CourtPonPdf' + i],
                });
              }}
              style={TicketsComponentStyle.offender_officer_court_button}>
              <Text
                style={
                  TicketsComponentStyle.offender_officer_court_button_text
                }>
                COURT
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={TicketsComponentStyle.cancel_roadside_button}>
            <Text style={TicketsComponentStyle.cancel_roadside_button_text}>
              CANCEL ROADSIDE
            </Text>
          </TouchableOpacity>

          {/* Horizantal Line */}
          <View
            style={{
              backgroundColor: '#13226b',
              height: 1,
              marginRight: 25,
              marginLeft: 25,
              marginBottom: 10,
              marginTop: 10,
            }}
          />
        </View>
      );
      output[i] = TempItem;
    }
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            placeholder="Search Tickets"
            style={TicketsStyle.textinput}
            onChangeText={text => this.setState({searchVal: text})}></TextInput>

          <TouchableOpacity
            style={TicketsStyle.search_button}
            onPress={() => {
              this.apiCall();
            }}>
            <Text style={TicketsStyle.search_button_text}>SEARCH</Text>
          </TouchableOpacity>
        </View>

        <View style={TicketsStyle.flatListconatiner}>
          <FlatList data={[{key: 'i'}]} renderItem={() => output} />
          {/* {output} */}
        </View>

        <View style={TicketsStyle.bottom_container}>
          <TouchableOpacity style={TicketsStyle.prev_button}>
            <Text style={TicketsStyle.prev_button_text}>PREV</Text>
          </TouchableOpacity>

          <Text style={{bottom: -5, left: 30, fontSize: 17, color: '#707070'}}>
            {' '}
            {Ticket_Index}
          </Text>

          <TouchableOpacity style={TicketsStyle.next_button}>
            <Text style={TicketsStyle.next_button_text}>NEXT</Text>
          </TouchableOpacity>
        </View>
        <Modal
          visible={this.state.Alert_Visibility}
          transparent={true}
          animationType={'fade'}
          onRequestClose={() => {
            this.Show_Custom_Alert(!this.state.Alert_Visibility);
          }}>
          {/* Modal Main Conatiner */}
          <View style={TicketsComponentStyle.modal_container}>
            {/* Modal Body Container */}
            <View style={TicketsComponentStyle.modal_body}>
              <Text style={TicketsComponentStyle.modal_title}>Add Notes</Text>
              <View style={{flex: 1}}>
                <TextInput
                  placeholder="Tap to Speak"
                  multiline={true}
                  style={TicketsComponentStyle.modal_textinput}
                />

                <TouchableOpacity
                  style={TicketsComponentStyle.modal_mic_icon}
                  onPress={() => this.onPress(1)}>
                  <Image
                    source={Mic}
                    style={
                      this.state.colorId === 1 ? styles.red : styles.button
                    }
                  />
                </TouchableOpacity>
              </View>

              {/* Modal Bottom Container */}
              <View style={TicketsComponentStyle.modal_bottom_container}>
                <TouchableOpacity
                  style={TicketsComponentStyle.submit_button}
                  onPress={this.submit_Button}
                  activeOpacity={0.7}>
                  <Text style={TicketsComponentStyle.submit_cancel_text}>
                    {' '}
                    SUBMIT{' '}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={TicketsComponentStyle.cancel_button}
                  onPress={() => {
                    this.Show_Custom_Alert(!this.state.Alert_Visibility);
                  }}
                  activeOpacity={0.7}>
                  <Text style={TicketsComponentStyle.submit_cancel_text}>
                    {' '}
                    CANCEL{' '}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  Alert_Main_View: {},

  Alert_Title: {},
  red: {
    tintColor: '#d50b16',
    alignItems: 'center',
    padding: 15,
    width: 30,
    height: 30,
    backgroundColor: '#e2e4e1',
    borderRadius: 12,
  },
  button: {
    tintColor: 'black',
    alignItems: 'center',
    padding: 15,
    width: 30,
    height: 30,
    backgroundColor: '#e2e4e1',
    borderRadius: 12,
  },
});

export default PonReports_old;
