import React from 'react';

import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';

import Global_Attributes from '../../Utility/Global_Attributes';
import LawsActTitleStyle from '../Css/LawsActTitleStyle';

class LawsActTitle extends React.Component {

  constructor(props) {
    super(props);
  }

  lawsDescription = (no, title, pay, des, fine, demerits) => {

    Global_Attributes.loading = false;
    let actno = no;
    let acttitle = title;
    let payment = pay;
    let description = des;
    let set_fine = fine;
    let demerit_points = demerits;

    this.props.navigation.navigate('LawsDescription', {
      actno: actno,
      acttitle: acttitle,
      payment: payment,
      description: description,
      set_fine: set_fine,
      demerit_points: demerit_points,
    });
    
  };

  render() {
    const Length = this.props.route.params.Length;
    var output = [];
    let i;
    //  console.log('length is:-'+Length)
    for (i = 0; i < Length; i++) {
      let no = Global_Attributes.LawSection_ActTitle['actno'][i];
      let title = Global_Attributes.LawSection_ActTitle['acttitle'][i];
      let des = Global_Attributes.LawSection_ActTitle['actdes'][i];
      let fine = Global_Attributes.LawSection_ActTitle['actsetfine'][i];
      let pay = Global_Attributes.LawSection_ActTitle['actpayble'][i];
      let demerits = Global_Attributes.LawSection_ActTitle['actdemerits'][i];
      var tempItem = (
        <View key={i}>
          <TouchableOpacity
            onPress={() => {
              this.lawsDescription(no, title, pay, des, fine, demerits);
            }}
            style={LawsActTitleStyle.touchbleopacity}>
            <Text style={LawsActTitleStyle.lawheaderacttext}>{no}</Text>
            <Image
              style={LawsActTitleStyle.downarrow}
              source={require('../assets/downarrow.png')}
            />
            <Text style={LawsActTitleStyle.lawcontenttext}>{title}</Text>
          </TouchableOpacity>
        </View>
      );
      output[i] = tempItem;
    }
    return (
      <>
        {/*Main Container */}
        <View style={LawsActTitleStyle.maincontainer}>
          <StatusBar backgroundColor="#112470" />
          <FlatList data={[{key: 'i'}]} renderItem={() => output} />
        </View>
      </>
    );
  }
}

export default LawsActTitle;
