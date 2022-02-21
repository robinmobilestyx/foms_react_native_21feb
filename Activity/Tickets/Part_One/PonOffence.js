import React, {Component} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
  LogBox,
  TouchableOpacity,
  FlatList,
  Alert,
  Keyboard,
  SectionList,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import CheckBox from 'react-native-checkbox-animated';
import {ScrollView} from 'react-native-gesture-handler';
import {RadioButton, Button, TextInput} from 'react-native-paper';
import checkIn from '../../assets/checkin.png';
import prevsLocation from '../../assets/prs_location.png';
import Global_Attributes from '../../../Utility/Global_Attributes';
// import Geolocation from '@react-native-community/geolocation';
import {request, PERMISSIONS, RESULTS, check} from 'react-native-permissions';
import ModalDropdown from 'react-native-modal-dropdown';
import Modal from 'react-native-modals';
import Autocomplete from 'react-native-autocomplete-input';
import LawsController from '../../Controller/LawsController';
import Dropdownarrow from '../../assets/downarrow.png';
import Viewdetails from '../../assets/cloud4.png';
import SearchIcon from '../../assets/search.png';
import DropDownPicker from 'react-native-dropdown-picker';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoder';
import DashboardFooter from '../../Dashboard/DashboardFooter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TicketsModulesApi from '../../Controller/TicketsModulesApi';
import LawsSearch from '../../Laws/LawsSearch';
import ponsoffnStyle from '../../Css/ponOffenseStyle';
import {PopoverContainer, Popover} from 'react-native-simple-popover';
import Loader from '../../Dashboard/Loader';
// import SearchableDropdown from 'react-native-searchable-dropdown';

const PLATEFORM_LOCATION_PERMISSION = {
  ios: PERMISSIONS.IOS.LOCATION_ALWAYS,
  android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
};

const REQUEST_PERMISSION_TYPE = {
  location: PLATEFORM_LOCATION_PERMISSION,
};

const PERMISSION_TYPE = {
  location: 'location',
};

export default class PonOffence extends Component {

  constructor(props) {
    super(props);

    this.next = this.next.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.prevLocation = this.prevLocation.bind(this);
    this.back = this.back.bind(this);

    this.state = {

      motorInvolved: Global_Attributes.PonOneBean['motorInvolved'],
      collision: Global_Attributes.PonOneBean['collision'],
      withnesses: Global_Attributes.PonOneBean['withnesses'],
      atOne: Global_Attributes.PonOneBean['atOne'],
      atTwo: Global_Attributes.PonOneBean['atTwo'],
      atThree: Global_Attributes.PonOneBean['atThree'],
      atFour: Global_Attributes.PonOneBean['atFour'],
      atFive: Global_Attributes.PonOneBean['atFive'],
      manualLocation: Global_Attributes.PonOneBean['manualLocation'],
      didCommit: Global_Attributes.PonOneBean['didCommit'],
      contrary: Global_Attributes.PonOneBean['contrary'],
      sect: Global_Attributes.PonOneBean['sect'],
      plateNumber: Global_Attributes.PonOneBean['plateNumber'],
      juris: Global_Attributes.PonOneBean['juris'],
      commercial: Global_Attributes.PonOneBean['commercial'],
      cvor: Global_Attributes.PonOneBean['cvor'],
      nsc: Global_Attributes.PonOneBean['nsc'],
      code: Global_Attributes.PonOneBean['code'],
      fine: Global_Attributes.PonOneBean['fine'],
      payable: Global_Attributes.PonOneBean['payable'],
      covrNumer: Global_Attributes.PonOneBean['covrNumer'],
      km_over: Global_Attributes.PonOneBean['km_over'],
      schedule: Global_Attributes.PonOneBean['schedule'],
      schld2Rb: Global_Attributes.PonOneBean['schld2Rb'],
      comunitySafZone: Global_Attributes.PonOneBean['communitysafeZone'],
      constZOne: Global_Attributes.PonOneBean['constZOne'],
      speedLimit: Global_Attributes.PonOneBean['speedLimit'],
      chargedSpeed: Global_Attributes.PonOneBean['chargedSpeed'],
      speedActual: Global_Attributes.PonOneBean['speedActual'],
      speedingCb: Global_Attributes.PonOneBean['speedingCb'],

      issuedDate: Global_Attributes.PonOneBean['issuedDate'],
      concent: false,
      acttitlevalue: '',
      actnovalue: '',
      check: '',
      keyboardStatus: 'Keyboard Hidden',
      // query: "",
      // query1:"",
      act_title: '',
      setFine: '',
      totalPayable: '',
      AT: '',
      NEAR: '',
      attextinputvalue: Global_Attributes.PonOneBean['atOne'] ,
      neartextinputvalue: Global_Attributes.PonOneBean['atTwo'] ,
      open: false,
      value: null,
      items: null,
      atmodalVisible: false,
      nearmodalVisible: false,
      ATfocus: false,
      NEARfocus: false,
      isPopoverVisible: false,
      popoverPlacement: 'auto',
      isLoading: Global_Attributes.loading,
    };

    // console.log("see that")
    // this.getLocation();

    console.log('globlelat:', Global_Attributes.lat);
    console.log('globlelog', Global_Attributes.log);

    this.getLocation();

    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      Geolocation.getCurrentPosition(
        info => (Global_Attributes.lat = info.coords.latitude),
      );
      Geolocation.getCurrentPosition(
        position => (Global_Attributes.log = position.coords.longitude),
      );

      return true;
    });
  }

  back = () => {
    this.props.navigation.navigate('PonInfo');
  };

  getLocation = () => {
    this.checkPermission(PERMISSION_TYPE.location).catch(error =>
      alert('your error is:' + error),
    );

    Geolocation.getCurrentPosition(
      info => (Global_Attributes.lat = info.coords.latitude),
    );

    Geolocation.getCurrentPosition(
      position => (Global_Attributes.log = position.coords.longitude),
    );

    var pos = {
      lat: Global_Attributes.lat,
      lng: Global_Attributes.log,
    };

    Geocoder.geocodePosition(pos)
      .then(res => {
        Global_Attributes.loading = false;
        this.setState({isLoading: false});

        console.log(res[0]);

        const pinCode = res[0].pincode;
        Global_Attributes.gpsAddress['gpsPincode'] = pinCode;

        let loc = res[0].locality;
        Global_Attributes.gpsAddress['gpsCity'] = loc;

        if (loc != null) {
          console.log('city:' + loc.toUpperCase());
          this.setState({atThree: loc.toUpperCase()});
        }

        let Streen_name = res[0].streetName;

        if (Streen_name != null) {
          console.log('street name:' + Streen_name.toUpperCase());
          this.setState({attextinputvalue: Streen_name.toUpperCase()});
        }

        let state = res[0].adminArea;
        this.setState({states: state});
        console.log('State:' + state);
        Global_Attributes.gpsAddress['gpsState'] = state;

        let subA = res[0].subAdminArea;
        this.setState({district: res[0].subAdminArea});
        console.log('district:' + subA);
      })
      .catch(error => console.log('your error is:' + error));
  };

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
        return true;
      }

      return this.requestPermission(permission);
    } catch (error) {
      console.log(error);
    }
  };

  requestPermission = async permission => {
    try {
      const result = await request(permission);
      console.log('permission request', result);
      Geolocation.getCurrentPosition(info => console.log('geolocation', info));
      return result === RESULTS.GRANTED;
    } catch (error) {
      console.log('App permission result fail ' + error);
      return false;
    }
  };

  checkBoxChanged() {
    this.setState({concent: !this.state.concent});
  }

  sppeedigCheckBoxChanged() {
    this.setState({speedingCb: !this.state.speedingCb});
  }

  motorCheckBoxChanged() {
    this.setState({motorInvolved: !this.state.motorInvolved});
  }

  collisionCheckBoxChanged() {
    this.setState({collision: !this.state.collision});
  }

  WitnesCheckBoxChanged() {
    this.setState({withnesses: !this.state.withnesses});
  }

  CvorCheckBoxChanged() {
    this.setState({cvor: !this.state.cvor});
  }

  NscCheckBoxChanged() {
    this.setState({nsc: !this.state.nsc});
  }

  commercialCheckBoxChanged() {
    this.setState({commercial: !this.state.commercial});
  }

  setBeans = () => {
    console.log("neartextvalue: ", this.state.neartextinputvalue)


    Global_Attributes.PonOneBean['motorInvolved'] = this.state.motorInvolved;
    Global_Attributes.PonOneBean['withnesses'] = this.state.withnesses;
    Global_Attributes.PonOneBean['atTwo'] = this.state.neartextinputvalue;
    Global_Attributes.PonOneBean['atOne'] = this.state.attextinputvalue;
    Global_Attributes.PonOneBean['collision'] = this.state.collision;
    Global_Attributes.PonOneBean['atThree'] = this.state.atThree;
    Global_Attributes.PonOneBean['atFour'] = this.state.atFour;
    Global_Attributes.PonOneBean['atFive'] = this.state.atFive;
    Global_Attributes.PonOneBean['manualLocation'] = this.state.manualLocation;
    // Global_Attributes.PonOneBean['didCommit'] = this.state.didCommit;
    Global_Attributes.PonOneBean['contrary'] =
      Global_Attributes.PonLaws['parent_law'][0];
    //    Global_Attributes.PonOneBean['sect'] = this.state.sect;
    Global_Attributes.PonOneBean['plateNumber'] = this.state.plateNumber;
    Global_Attributes.PonOneBean['juris'] = this.state.juris;
    Global_Attributes.PonOneBean['commercial'] = this.state.commercial;
    Global_Attributes.PonOneBean['cvor'] = this.state.cvor;
    Global_Attributes.PonOneBean['nsc'] = this.state.nsc;
    Global_Attributes.PonOneBean['code'] = this.state.code;
    Global_Attributes.PonOneBean['fine'] = this.state.fine;
    Global_Attributes.PonOneBean['payable'] = this.state.payable;
    Global_Attributes.PonOneBean['covrNumer'] = this.state.covrNumer;
    Global_Attributes.PonOneBean['km_over'] = this.state.km_over;
    Global_Attributes.PonOneBean['schedule'] = this.state.schedule;
    Global_Attributes.PonOneBean['speedLimit'] = this.state.speedLimit;
    Global_Attributes.PonOneBean['chargedSpeed'] = this.state.chargedSpeed;
    Global_Attributes.PonOneBean['speedActual'] = this.state.speedActual;
    Global_Attributes.PonOneBean['speedingCb'] = this.state.speedingCb;
    Global_Attributes.PonOneBean['schld2Rb'] = this.state.schld2Rb;
    Global_Attributes.PonOneBean['issuedDate'] = this.state.issuedDate;
    
    console.log("global atribute: ", Global_Attributes.PonOneBean['atTwo'])
     
    this.props.navigation.navigate('PonPreview');

    console.log(
      'chckbox value' + Global_Attributes.PonOneBean['motorInvolved'],
    );

  };

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      console.log('show data');
      this.getLocation();
      return true;
    });
    this.timing();
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    LogBox.ignoreLogs(['Encountered two children with the same key']);
    this.fetchLawsTitle(Global_Attributes.PonLaws['parent_law_id'][0]);
    console.log(
      'parent law id in poninfo:',
      Global_Attributes.PonLaws['parent_law_id'][0],
    );
    // this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide',this._keyboardDidHide);
  }

  _keyboardDidHide = () => {
    this.setState({nearmodalVisible: false, atmodalVisible: false});
  };

  componentWillUnmount() {
    // this.keyboardDidShowSubscription.remove();
    // this.keyboardDidHideSubscription.remove();
    Global_Attributes.PonOffencePayable = '';
    Global_Attributes.PonffenceFine = '';
  }

  fetchLawsTitle = id => {
    // console.log(id)
    var user = Global_Attributes.User;
    var pass = Global_Attributes.Pass;

    let All_acts = {
      user: user,
      pass: pass,
      id: id,
    };

    new LawsController().getAllActs(
      All_acts,
      this.props,
      'PonOffence',
      Global_Attributes.laws,
    );

  };

  AT = searchvalue => {
    if (searchvalue) {
      var user = Global_Attributes.User;
      var pass = Global_Attributes.Pass;
      let All_acts = {
        user: user,
        pass: pass,
        search_value: searchvalue,
      };
      new LawsController().getATvalues(
        All_acts,
        this.props,
        'AT',
        Global_Attributes.nearValues,
      );
      this.setState({
        AT: Global_Attributes.PonLaws['ATNEARvalues'],
        atmodalVisible: true,
        ATfocus: true,
      });
    } else {
      this.setState({AT: '', atmodalVisible: false, ATfocus: true});
    }
  };

  NEAR = searchvalue => {

    if (searchvalue) {
      var user = Global_Attributes.User;
      var pass = Global_Attributes.Pass;

      let All_acts = {
        user: user,
        pass: pass,
        search_value: searchvalue,
      };

      new LawsController().getATvalues(
        All_acts,
        this.props,
        'AT',
        Global_Attributes.nearValues,
      );

      this.setState({
        NEAR: Global_Attributes.PonLaws['ATNEARvalues'],
        nearmodalVisible: true,
        NEARfocus: true,
      });

    } else {
      this.setState({NEAR: '', nearmodalVisible: false, NEARfocus: true});
    }
  };

  timing() {
    setInterval(() => {
      this.setState({
        fine: Global_Attributes.PonOneBean['fine'],
        payable: Global_Attributes.PonOneBean['payable'],
      });
    }, 1000);
  }

  setOpen(open) {
    this.setState({
      open,
    });
  }

  setValue(callback) {
    this.setState(state => ({
      value: state,
    }));
  }

  setItems(callback) {
    this.setState(state => ({
      items: state,
    }));
  }

  emptyFields = () => {
    var fields = [];
    if (this.state.neartextinputvalue == '') {
      fields.push('2ND Street Name');
    }
    if (this.state.plateNumber.trim() == '') {
      fields.push('Plate Number');
    }

    return fields;``
  };

  next = () => {

    if (this.state.attextinputvalue == '') {
      alert('Please check address !');
    } else if (Global_Attributes.PonOneBean['didCommit'] == '') {
      alert('Enter Did Commmit !');
    } else if (Global_Attributes.PonOneBean['sect'] == '') {
      alert('Enter Section !');
    } else if (!this.state.concent) {
      alert('Please Accept Terms And Conditions !');
    } else {
      if (this.emptyFields().length > 0) {
        Alert.alert(
          'Notice',
          'The following field(s) are missing:\n\n' +
            this.emptyFields() +
            '\n\n Do you wish to continue?',
          [
            {
              text: 'YES',
              onPress: () => {
                this.setBeans();
              },
            },
            {
              text: 'No',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
          ],
        );
      } else {
        this.setBeans();
      }
    }

  };

  prevLocation = async () => {

    Global_Attributes.loading = true;
    this.setState({isLoading: true});

    const ticketId = await AsyncStorage.getItem('insertId');
    const uname = await AsyncStorage.getItem('userName');

    console.log('ticketId: ', ticketId);

    let ticketBody = {
      user: Global_Attributes.User,
      pass: Global_Attributes.Pass,
      ticket_no: ticketId,
      uname: uname,
    };

    new TicketsModulesApi().api_call(
      ticketBody,
      this.props,
      'prevLocation',
      Global_Attributes.prsLocation,
    );

  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: wp('100%'),
          backgroundColor: '#CED0CE',
        }}
      />
    );
  };

  render() {
    const {navigation} = this.props;
    const {didCommit, sect, keyboardStatus} = this.state;

    // const act_title = this.searchActs(didCommit, true);
    // const act_no = this.searchActs(sect, false);

    return (
      <SafeAreaView style={ponsoffnStyle.mainView}>
        <ScrollView
          scrollEnabled={true}
          nestedScrollEnabled={true}
          style={ponsoffnStyle.Scrollview}>
          <View style={{flex: 1}}>
            <View style={ponsoffnStyle.locationView}>
              <View style={ponsoffnStyle.main_view_loc}>
                <Text style={ponsoffnStyle.loc_code_txt}>Location Code</Text>
                <Text style={ponsoffnStyle.loc_code}>
                  {Global_Attributes.PonOneBean['locationCode']}
                </Text>
              </View>
              <View style={ponsoffnStyle.sec_main_view}></View>
              <View style={ponsoffnStyle.secc_main_view}>
                <Text style={ponsoffnStyle.offn_no}>Offence Number</Text>
                <Text style={ponsoffnStyle.loc_code1}>
                  {Global_Attributes.PonOneBean['formatted']}
                </Text>
              </View>
            </View>
            <View style={ponsoffnStyle.offr_name_view}>
              <Text style={ponsoffnStyle.offr_name}>
                Officer Name : {Global_Attributes.PonOneBean['officerName']}
              </Text>
            </View>
            <View style={ponsoffnStyle.main_view_status}>
              <View style={ponsoffnStyle.view_status}></View>
              <Text style={ponsoffnStyle.first_status}>1</Text>
              <Text style={ponsoffnStyle.sec_status}>2</Text>
              <Text style={ponsoffnStyle.third_status}>3</Text>
              <Text style={ponsoffnStyle.info_txt}>Info</Text>
              <Text style={ponsoffnStyle.offn_txt}>Offence</Text>
              <Text style={ponsoffnStyle.review_txt}>Review</Text>
            </View>
            <View style={ponsoffnStyle.mv_view}>
              <View style={ponsoffnStyle.mvi_view}>
                <Text style={ponsoffnStyle.mvi_txt}>
                  Motor Vehicle Involved
                </Text>
                <View style={ponsoffnStyle.firstCheckbx}>
                  <CheckBox
                    checked={this.state.motorInvolved}
                    // style={{ marginStart: 30, marginTop: 10 }}
                    onValueChange={() => this.motorCheckBoxChanged()}
                    unCheckedBorderColor={'#808080'}
                    checkedBackgroundColor={'#11246F'}
                    checkedBorderColor={'#11246F'}
                    borderWidth={2}
                    checkMarkColor={'white'}
                    checkMarkSize={18}
                    animationType={'left'}
                    size={18}
                    rippleEffect={false}
                    label="NO"
                    labelStyle={{
                      color: '#11246e',
                      fontFamily: Global_Attributes.fixfontstyle,
                    }}></CheckBox>
                  {/* <Text style={{ paddingTop: "8%", color: 'darkblue' }}>No</Text> */}
                </View>
              </View>
              <View style={ponsoffnStyle.cols_view}>
                <Text style={ponsoffnStyle.colsn_txt}>Collision Involved</Text>
                <View style={ponsoffnStyle.secCheckbx}>
                  <CheckBox
                    checked={this.state.collision}
                    style={{marginStart: 30, marginTop: 20}}
                    // checkBoxColor='#11246F'
                    onValueChange={() => this.collisionCheckBoxChanged()}
                    checkedBackgroundColor={'#11246F'}
                    checkedBorderColor={'#11246F'}
                    unCheckedBorderColor={'#808080'}
                    borderWidth={2}
                    checkMarkColor={'white'}
                    checkMarkSize={18}
                    animationType={'left'}
                    size={18}
                    rippleEffect={false}
                    label="YES"
                    labelStyle={{
                      color: '#11246e',
                      fontFamily: Global_Attributes.fixfontstyle,
                    }}></CheckBox>
                  {/* <Text style={{ paddingTop: "8%", color: 'darkblue' }}>No</Text> */}
                </View>
              </View>
              <View style={ponsoffnStyle.wittn_view}>
                <Text style={ponsoffnStyle.colsn_txt}>Witnesses</Text>
                <View style={ponsoffnStyle.thirdCheckbx}>
                  <CheckBox
                    checked={this.state.withnesses}
                    style={{marginStart: 30, marginTop: 10}}
                    checkBoxColor={'#11246F'}
                    onValueChange={() => this.WitnesCheckBoxChanged()}
                    checkedBackgroundColor={'#11246F'}
                    checkedBorderColor="#11246F"
                    borderWidth={2}
                    unCheckedBorderColor={'#808080'}
                    checkMarkColor={'white'}
                    checkMarkSize={18}
                    animationType={'left'}
                    size={18}
                    rippleEffect={false}
                    label="YES"
                    labelStyle={{
                      color: '#11246e',
                      fontFamily: Global_Attributes.fixfontstyle,
                    }}></CheckBox>
                  {/* <Text style={{ paddingTop: "8%", color: 'darkblue' }}>No</Text> */}
                </View>
              </View>
            </View>

            <View style={ponsoffnStyle.atNearView}>
              <View style={ponsoffnStyle.main_text_views}>
                <PopoverContainer>
                  <Popover
                    placement={'auto'}
                    arrowHeight={0}
                    isVisible={this.state.atmodalVisible}
                    pointerEvents="auto"
                    disablePortal={false}
                    component={() => (
                      <ScrollView
                        style={{
                          shadowColor: 'black',
                          shadowOpacity: 0.5,
                          backgroundColor: 'white',
                          elevation: 10,
                          height: '250%',
                          width: '100%',
                        }}>
                        <FlatList
                          nestedScrollEnabled={true}
                          keyboardShouldPersistTaps={'handled'}
                          data={this.state.AT}
                          renderItem={({item}) => {
                            return (
                              <View style={{left: 10, right: 10}}>
                                <TouchableOpacity
                                  onPress={() =>
                                    this.setState({
                                      attextinputvalue: item,
                                      AT: '',
                                      atmodalVisible: false,
                                    })
                                  }>
                                  <Text style={ponsoffnStyle.itemText}>
                                    {item}
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            );
                          }}
                          ItemSeparatorComponent={this.renderSeparator}
                          keyExtractor={item => item}
                        />
                      </ScrollView>
                    )}>
                    <TextInput
                      value={this.state.attextinputvalue}
                      style={ponsoffnStyle.inputAT}
                      onChangeText={text =>
                        this.setState({attextinputvalue: this.AT(text)})
                      }
                      label="AT*"
                      labelStyle={{
                        fontSize: 12,
                        fontFamily: Global_Attributes.fixfontstyle,
                      }}
                      underlineColor={'#000000'}
                    />
                  </Popover>
                </PopoverContainer>
              </View>

              <View style={ponsoffnStyle.main_text_views}>
                <PopoverContainer>
                  <Popover
                    placement={'auto'}
                    arrowHeight={0}
                    isVisible={this.state.nearmodalVisible}
                    pointerEvents="auto"
                    component={() => (
                      <ScrollView
                        style={{
                          shadowColor: 'black',
                          shadowOpacity: 0.5,
                          backgroundColor: 'white',
                          elevation: 10,
                          height: '250%',
                          width: '100%',
                        }}>
                        <FlatList
                          nestedScrollEnabled={true}
                          keyboardShouldPersistTaps={'always'}
                          data={this.state.NEAR}
                          renderItem={({item}) => {
                            return (
                              <View style={{left: 10, right: 10}}>
                                <TouchableOpacity
                                  onPress={() =>
                                    this.setState({
                                      neartextinputvalue: item,
                                      NEAR: '',
                                      nearmodalVisible: false,
                                    })
                                  }>
                                  <Text style={ponsoffnStyle.itemText}>
                                    {item}
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            );
                          }}
                          ItemSeparatorComponent={this.renderSeparator}
                          keyExtractor={item => item}
                        />
                      </ScrollView>
                    )}>
                    <TextInput
                      value={this.state.neartextinputvalue}
                      style={ponsoffnStyle.inputAT}
                      onChangeText={text =>
                        this.setState({neartextinputvalue: this.NEAR(text)})
                      }
                      label="NEAR"
                      labelStyle={{
                        fontSize: 12,
                        fontFamily: Global_Attributes.fixfontstyle,
                      }}
                      underlineColor={'#000000'}
                    />
                  </Popover>
                </PopoverContainer>
              </View>
            </View>

            <View style={ponsoffnStyle.blankTextView}>
              <View style={ponsoffnStyle.blankTextView1}>
                <TextInput
                  style={{
                    width: '95%',
                    backgroundColor: '#ffffff',
                    fontSize: 12,
                    height: 55,
                    fontFamily: Global_Attributes.fixfontstyle,
                  }}
                  theme={{colors: {text: '#11246F'}}}
                  underlineColor={'#000000'}
                  value={this.state.atThree}
                  onChangeText={text => {
                    this.setState({atThree: text});
                  }}></TextInput>
              </View>
              <View style={ponsoffnStyle.blankTextView2}>
                <TouchableOpacity onPress={() => this.getLocation()}>
                  <Image style={ponsoffnStyle.loc_img} source={checkIn}></Image>
                </TouchableOpacity>
              </View>
              <View style={ponsoffnStyle.blankTextView3}>
                <TouchableOpacity onPress={() => this.prevLocation()}>
                  <Image
                    style={ponsoffnStyle.refr_img}
                    source={prevsLocation}>
                  </Image>
                </TouchableOpacity>
              </View>
            </View>

            <View style={ponsoffnStyle.contrView}>
              <Text
                style={{
                  color: '#7B7B7B',
                  fontSize: 14,
                  bottom: 10,
                  fontFamily: Global_Attributes.fixfontstyle,
                }}>
                CONTRARY TO*
              </Text>
              <View>
                <ModalDropdown
                  dropdownStyle={{height: 50}}
                  dropdownTextStyle={{fontSize: 17, color: 'black'}}
                  textStyle={{
                    color: 'black',
                    fontSize: 17,
                    fontFamily: Global_Attributes.fixfontstyle,
                  }}
                  animated={true}
                  defaultIndex={0}
                  defaultValue={Global_Attributes.PonLaws['parent_law'][0]}
                  options={Global_Attributes.PonLaws['parent_law']}
                  onSelect={id => {
                    this.fetchLawsTitle(
                      Global_Attributes.PonLaws['parent_law_id'][id],
                    );
                  }}
                />
                <Image
                  source={Dropdownarrow}
                  style={ponsoffnStyle.drpImgStyle}
                />
              </View>
            </View>

            <LawsSearch PonOffence={true} navigation={this.props.navigation} />

            <View style={ponsoffnStyle.inputTextView}>
              <View style={ponsoffnStyle.main_text_views}>
                <TextInput
                  style={ponsoffnStyle.inputTextStyleTwo}
                  label="PLATE NUMBER"
                  underlineColor={'#000000'}
                  labelStyle={{fontFamily: Global_Attributes.fixfontstyle}}
                  value={this.state.plateNumber}
                  maxLength={8}
                  onChangeText={text => {
                    this.setState({plateNumber: text});
                  }}></TextInput>
              </View>

              <View style={ponsoffnStyle.main_text_views}>
                <TextInput
                  style={ponsoffnStyle.inputTextStyleTwo}
                  placeholderTextColor="red"
                  label="JURIS"
                  labelStyle={{fontFamily: Global_Attributes.fixfontstyle}}
                  theme={{colors: {text: '#11246F'}}}
                  value="ON"
                  underlineColor={'#000000'}
                />
              </View>
            </View>

            <View style={ponsoffnStyle.inputTextcodeView}>
              <TextInput
                style={ponsoffnStyle.inputTextStyle}
                value={this.state.code}
                labelStyle={{fontFamily: Global_Attributes.fixfontstyle}}
                placeholder="username"
                onChangeText={text => {
                  this.setState({code: text});
                }}
                label="CODE"
                underlineColor={'#000000'}></TextInput>
            </View>

            <View style={ponsoffnStyle.secCheckboxView}>

              <View style={{flexDirection: 'column', flex: 1, marginTop: '5%'}}>
                {/* <View style={{ flex:0.5, flexDirection: 'row' }}> */}
                <Text style={ponsoffnStyle.cvorText}>CVOR</Text>
                <View style={{paddingLeft: '15%'}}>
                  <CheckBox
                    checked={this.state.cvor}
                    // style={{ marginStart: 30, marginTop: 10 }}
                    checkBoxColor={'#11246F'}
                    onValueChange={() => this.CvorCheckBoxChanged()}
                    checkedBackgroundColor={'#11246F'}
                    checkedBorderColor="#11246F"
                    borderWidth={2}
                    unCheckedBorderColor={'#808080'}
                    checkMarkColor={'white'}
                    checkMarkSize={18}
                    animationType={'left'}
                    size={18}
                    rippleEffect={false}
                    label="YES"
                    labelStyle={{
                      color: '#11246F',
                      fontFamily: Global_Attributes.fixfontstyle,
                    }}></CheckBox>
                  {/* <Text style={{ paddingTop: "8%", color: 'darkblue' }}>Yes</Text> */}
                </View>
              </View>

              <View style={{flexDirection: 'column', flex: 1, marginTop: '5%'}}>
                <Text style={ponsoffnStyle.nscText}>NSC</Text>
                <View style={{marginLeft: '17%'}}>
                  <CheckBox
                    checked={this.state.nsc}
                    style={{marginStart: 30, marginTop: 10}}
                    checkBoxColor={'#11246F'}
                    onValueChange={() => this.NscCheckBoxChanged()}
                    checkedBackgroundColor={'#11246F'}
                    checkedBorderColor="#11246F"
                    borderWidth={2}
                    unCheckedBorderColor={'#808080'}
                    checkMarkColor={'white'}
                    checkMarkSize={18}
                    animationType={'left'}
                    size={18}
                    rippleEffect={false}
                    label="YES"
                    labelStyle={{
                      color: '#11246F',
                      fontFamily: Global_Attributes.fixfontstyle,
                    }}></CheckBox>
                  {/* <Text style={{ paddingTop: "8%", color: 'darkblue' }}>Yes</Text> */}
                </View>
              </View>

              <View style={{flexDirection: 'column', flex: 1, marginTop: '5%'}}>
                <Text style={ponsoffnStyle.commrText}>Commercial</Text>
                <View style={{marginLeft: '15%'}}>
                  <CheckBox
                    checked={this.state.commercial}
                    style={{marginStart: 30, marginTop: 10}}
                    checkBoxColor={'#11246F'}
                    onValueChange={() => this.commercialCheckBoxChanged()}
                    checkedBackgroundColor={'#11246F'}
                    checkedBorderColor="#11246F"
                    borderWidth={2}
                    unCheckedBorderColor={'#808080'}
                    checkMarkColor={'white'}
                    checkMarkSize={18}
                    animationType={'left'}
                    size={18}
                    rippleEffect={false}
                    label="YES"
                    labelStyle={{
                      color: '#11246F',
                      fontFamily: Global_Attributes.fixfontstyle,
                    }}>
                  </CheckBox>
                  {/* <Text style={{ paddingTop: "8%", color: 'darkblue' }}>Yes</Text> */}
                </View>
              </View>
            </View>

            {this.state.cvor || this.state.nsc ? (
              <View style={ponsoffnStyle.inputTextcodeView}>
                <TextInput
                  style={ponsoffnStyle.inputTextStyle}
                  value={this.state.covrNumer}
                  onChangeText={text => {
                    this.setState({covrNumer: text});
                  }}
                  labelStyle={{fontFamily: Global_Attributes.fixfontstyle}}
                  label="CVOR/NSC Number*"
                  underlineColor={'#000000'}></TextInput>
              </View>
            ) : null}

            <View style={ponsoffnStyle.fineBoxView}>
              <View style={ponsoffnStyle.insidefineBoxView}>
                <Text
                  style={{
                    color: '#7B7B7B',
                    fontSize: 12,
                    fontFamily: Global_Attributes.fixfontstyle,
                  }}>
                  SET FINE OF*
                </Text>

                <TextInput
                  value={this.state.fine}
                  mode="outlined"
                  outlineColor="#11246F"
                  selectionColor={'#7B7B7B'}
                  style={ponsoffnStyle.boxstyle}
                />

                {/* <TextInput value={this.state.fine} style={ponsoffnStyle.boxstyle} ></TextInput> */}
              </View>
              <View style={ponsoffnStyle.insidefineBoxView1}>
                <Text
                  style={{
                    color: '#7B7B7B',
                    fontSize: 12,
                    fontFamily: Global_Attributes.fixfontstyle,
                  }}>
                  TOTAL PAYABLE*
                </Text>
                <TextInput
                  value={this.state.payable}
                  mode="outlined"
                  outlineColor="#11246F"
                  selectionColor={'#7B7B7B'}
                  style={ponsoffnStyle.boxstyle}></TextInput>
                {/* <TextInput value={this.state.payable} style={ponsoffnStyle.boxstyle}></TextInput> */}
              </View>
            </View>

            <View style={ponsoffnStyle.tnCView1}>
              <View style={{marginLeft: '1%', flexDirection: 'row'}}>
                <CheckBox
                  checked={this.state.concent}
                  checkBoxColor={'#11246F'}
                  onValueChange={() => this.checkBoxChanged()}
                  checkedBackgroundColor={'#11246F'}
                  checkedBorderColor={'#11246F'}
                  borderWidth={2}
                  checkMarkColor={'white'}
                  unCheckedBorderColor={'#808080'}
                  checkMarkSize={18}
                  animationType={'left'}
                  checkboxContainerStyle={{bottom: 25}}
                  size={18}
                  rippleEffect={false}></CheckBox>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                    color: '#11246F',
                  }}>
                  BY CHECKING THIS BOX, I ACKNOWLEDGE THAT I HAVE REVIEWED ALL
                  THE INFORMATION CONTAINED WITHIN THIS DOCUMENT AND CONFIRM IT
                  TO BE ACCURATE.
                </Text>
              </View>
            </View>

            <View style={{flexDirection: 'row', flex: 1, marginTop: '5%'}}>
              <Button
                mode="contained"
                style={ponsoffnStyle.backBtn}
                onPress={() => {
                  this.back();
                }}>
                BACK
              </Button>

              <Button
                mode="contained"
                style={ponsoffnStyle.nxtBtn}
                onPress={() => {
                  this.next();
                }}>
                NEXT
              </Button>
            </View>
          </View>

          <Loader loading={Global_Attributes.loading} />
        </ScrollView>
        {/* {keyboardStatus === 'Keyboard Hidden' ?
              
            <View style={ponsoffnStyle.bottomView}>  */}
        <DashboardFooter
          navigation={navigation}
          style={{position: 'absolute', bottom: 0}}
        />
        {/* </View>
                : null} */}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  popoverContainer: {
    width: wp('90%'),
    maxHeight: hp('60%'),
    shadowColor: 'black',
    shadowOpacity: 0.5,
    backgroundColor: 'white',
    elevation: 10,
    shadowColor: 'black',
    marginLeft: 10,
    marginRight: 10,
  },
  popoverText: {
    color: 'red',
  },
});

const styles2 = StyleSheet.create({
  cardBox: {
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#d0d0d0',
    width: '94%',
    alignSelf: 'center',
    height: 200,
    position: 'relative',
    borderRadius: 15,
    overflow: 'visible', // doesn't do anything
  },
  cardContent: {
    textAlign: 'right',
    backgroundColor: 'transparent',
    marginTop: 15,
    alignSelf: 'flex-end',
    padding: 5,
  },
  cardHeader: {
    color: '#fff',
    fontFamily: 'Vazir',
    fontSize: 12,
  },
  cardItem: {
    backgroundColor: '#3c4252',
    borderRadius: 3,
    position: 'absolute',
    top: -10,
    right: -5,
    width: 50,
    height: 20,
    paddingRight: 5,
  },
});
