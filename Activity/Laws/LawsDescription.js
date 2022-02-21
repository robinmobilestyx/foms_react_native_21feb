import React from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  StyleSheet,
  Touchable,
  ScrollView,
} from 'react-native';

import LawsDescriptionStyle from '../Css/LawsDescriptionStyle';

class LawsDescription extends React.Component {
  render() {
    const actno = this.props.route.params.actno;
    const acttitle = this.props.route.params.acttitle;
    const payment = this.props.route.params.payment;
    const description = this.props.route.params.description;
    const set_fine = this.props.route.params.set_fine;
    const demerit_points = this.props.route.params.demerit_points;

    return (
      <>
        {/*Main Container */}
        <View style={LawsDescriptionStyle.maincontainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={LawsDescriptionStyle.lawsheaderview}>
              <Text style={LawsDescriptionStyle.lawsdescriptionheader}>
                {actno}
              </Text>
            </View>

            <View>
              <Text style={LawsDescriptionStyle.lawsacttitletext}>
                {acttitle}
              </Text>
              <Text style={LawsDescriptionStyle.lawssetfinetext}>
                {'Set Fine:- ' + set_fine}
              </Text>
              <Text style={LawsDescriptionStyle.lawspayabletext}>
                {'Total payable * ' + payment}
              </Text>
              <Text style={LawsDescriptionStyle.lawsdemeritspointtext}>
                {'Demerit Points:- ' + demerit_points}
              </Text>
            </View>
            <View>
              <Text style={LawsDescriptionStyle.lawsdescriptiontext}>
                {description}
              </Text>
            </View>
          </ScrollView>
        </View>
      </>
    );
  }
}

export default LawsDescription;
