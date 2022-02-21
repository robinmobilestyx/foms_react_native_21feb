import React from 'react';

import {
  View,
  Text,
  StatusBar,
  Image,
  ScrollView,
  Animated,
  BackHandler,
} from 'react-native';
import DashboardFooter from './DashboardFooter';
import HelpStyle from '../Css/HelpStyle';
import Global_Attributes from '../../Utility/Global_Attributes';
import CollapsibleView from '@eliav2/react-native-collapsible-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FooterController from '../Controller/FooterController';
import Downarrow from '../assets/downarrow.png';
import Loader from './Loader';

class Help extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setCollaps: '0',
    };
  }

  gotoBack = () => {
    this.props.navigation.goBack(null);
    return true;
  };

  componentDidMount = () => {
    // navigation.goBack(null);
    // return true;

    console.log('back button login');

    BackHandler.removeEventListener('hardwareBackPress', this.gotoBack);
    BackHandler.addEventListener('hardwareBackPress', this.gotoBack);
  };

  render() {
    const {navigation} = this.props;

    const faqobj = this.props.route.params.faqdata;
    const faqobjlength = this.props.route.params.lengths;
    console.log('your length is:' + faqobjlength);

    var output = [];
    //  let i;
    for (let i = 0; i < faqobjlength; i++) {
      let title = faqobj['title' + i];
      let ans = faqobj['ans' + [i]].join('\r\n');

      var tempItem = (
        <View
          key={i}
          style={{
            marginBottom: 3,
            borderRadius: 10,
            marginLeft: 10,
            marginRight: 10,
          }}>
          {/* <Text style={{flex:1, color: "#202020", fontSize: 17,padding:5,fontWeight:'bold'}}>{title}</Text>

           <Text style={HelpStyle.collapsibletext}>{ans}</Text> */}

          <CollapsibleView
            title={
              <>
                <Text
                  style={{flex: 1, padding: 5, color: 'black', fontSize: 19}}>
                  {title}
                </Text>
                <Image
                  source={Downarrow}
                  style={{width: 20, height: 20, marginRight: 0}}
                />
              </>
            }
            //  isRTL={true}
            noArrow={true}
            style={HelpStyle.collasibletitle}
            arrowStyling={{size: 20, rounded: true, thickness: 3}}
            //  touchableWrapperProps={{ onPress: () => setBGColor(i) }}
            //  expanded={this.state.setCollaps == i? true : false}
          >
            <Text style={HelpStyle.collapsibletext}>{ans}</Text>
          </CollapsibleView>
        </View>
      );

      output[i] = tempItem;
    }

    return (
      <>
        <View style={HelpStyle.maincontainer}>
          <StatusBar backgroundColor="#112470" />

          {/*Header Container */}

          {/*FAQ Container */}
          <View style={HelpStyle.FAQcontainer}>
            <Image
              source={require('../assets/faq.png')}
              style={HelpStyle.FAQimage}
            />
            <Animated.Text style={HelpStyle.FAQtext}>FAQ</Animated.Text>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={HelpStyle.scrollView}>
            {output}
          </ScrollView>
        </View>

        <View style={HelpStyle.bottomcontainer}>
          <DashboardFooter navigation={navigation} />
        </View>
        <Loader loading={Global_Attributes.loading} />
      </>
    );
  }
}

export default Help;
