import React, {Component} from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  StyleSheet,
} from 'react-native';

import TicketsComponentStyle from '../Css/TicketsComponentStyle';
import TicketsStyle from '../Css/TicketsStyle';
import Global_Attributes from '../../Utility/Global_Attributes';
import {ReportsController} from '../Controller/ReportsController';
import AsyncStorage from '@react-native-async-storage/async-storage';

class PonReports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: '1',
      searchVal: '',
      count: 1,
      isLoading: Global_Attributes.loading,
    };
  }

  NextBtn = async () => {
    this.setState({count: this.state.count + 1, searchVal: ''});
    this.Search_btn();
  };

  PrevBtn = () => {
    this.setState({count: this.state.count - 1, searchVal: ''});
    this.Search_btn();
  };

  Search_btn = async () => {
    Global_Attributes.loading = true;
    this.setState({isLoading: true});

    var user = Global_Attributes.User;
    var pass = Global_Attributes.Pass;
    var Username = await AsyncStorage.getItem('userName');

    var currentIndex = this.state.count;
    var searchVal = this.state.searchVal;

    console.log('currentIndex ' + this.state.count);
    console.log('Search Value ' + searchVal);

    let ticketBody = {
      user: user,
      pass: pass,
      index: currentIndex,
      uname: Username,
      search_val: searchVal,
    };

    const abc = await new ReportsController().getTicketDetails(
      ticketBody,
      this.props,
      'PonReleaseForm',
      Global_Attributes.ponReleaseForm,
    );

    abc;

    this.setState({isLoading: false});
  };

  render() {
    const ticketObj = this.props.route.params.TicketData;
    const Length = this.props.route.params.Length;
    const Ticket_Index = ticketObj['index_text'];
    const Previous_Index = ticketObj['previous_index'];
    const Next_Index = ticketObj['next_index'];
    var output = [];

    //  console.log("Length:"+tickets);

    for (let i = 0; i < Length; i++) {
      Global_Attributes.CaseNo = ticketObj['case_no' + i];
      Global_Attributes.OffenderName = ticketObj['offender_name' + i];
      Global_Attributes.OffenceDate = ticketObj['offence_date' + i];

      var TempItem = (
        <View key={i} style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 5,
              marginStart: 10,
              marginEnd: 10,
            }}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: 'bold',
                flex: 1,
                color: 'black',
              }}>
              {Global_Attributes.CaseNo}{' '}
            </Text>
            <Text
              style={{
                fontSize: 17,
                fontWeight: 'bold',
                flex: 1,
                textAlign: 'right',
                color: 'black',
              }}>
              {Global_Attributes.OffenceDate}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 16,
              marginStart: 10,
              marginEnd: 10,
            }}>
            <Text style={{fontSize: 17, flex: 1, color: 'black'}}>
              {Global_Attributes.OffenderName}
            </Text>
          </View>

          <View style={{flexDirection: 'row', alignSelf: 'stretch'}}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Print', {
                  url: ticketObj['appearance_notice' + i],
                });
              }}
              style={TicketsComponentStyle.offender_officer_court_button}>
              <Text
                style={
                  TicketsComponentStyle.offender_officer_court_button_text
                }>
                FORM 9
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Print', {
                  url: ticketObj['affidivat_notice' + i],
                });
              }}
              style={TicketsComponentStyle.offender_officer_court_button}>
              <Text
                style={
                  TicketsComponentStyle.offender_officer_court_button_text
                }>
                SERVICE
              </Text>
            </TouchableOpacity>
          </View>

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
              this.Search_btn();
            }}>
            <Text style={TicketsStyle.search_button_text}>SEARCH</Text>
          </TouchableOpacity>
        </View>

        <View style={TicketsStyle.flatListconatiner}>
          <FlatList data={[{key: 'i'}]} renderItem={() => output} />
        </View>

        <View style={TicketsStyle.bottom_container}>
          {Previous_Index != '' ? (
            <TouchableOpacity
              style={TicketsStyle.prev_button}
              onPress={() => {
                this.PrevBtn();
              }}>
              <Text style={TicketsStyle.prev_button_text}>PREV</Text>
            </TouchableOpacity>
          ) : (
            <View style={TicketsStyle.prev_button}></View>
          )}
          <View style={{flex: 1}}>
            <Text
              style={
                Ticket_Index != '1 of 1' ? styles.text_Pages : styles.text_Page
              }>
              {Ticket_Index}
            </Text>
          </View>
          {Next_Index != '' ? (
            <TouchableOpacity
              style={TicketsStyle.next_button}
              onPress={() => {
                this.NextBtn();
              }}>
              <Text style={TicketsStyle.next_button_text}>NEXT</Text>
            </TouchableOpacity>
          ) : (
            <View style={TicketsStyle.prev_button}></View>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  red: {
    tintColor: '#d50b16',
    alignItems: 'center',
    padding: 15,
    width: 30,
    height: 30,
    borderRadius: 12,
  },
  button: {
    tintColor: 'black',
    alignItems: 'center',
    padding: 15,
    width: 30,
    height: 30,
    borderRadius: 12,
  },

  text_Page: {
    bottom: 20,
    alignSelf: 'center',
    fontSize: 17,
    color: 'black',
  },
  text_Pages: {
    alignSelf: 'center',
    fontSize: 17,
    color: 'black',
  },
});

export default PonReports;
