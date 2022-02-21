import React from 'react';
import {Text} from 'react-native-paper';
import LawsController from '../Controller/LawsController';
import Global_Attributes from '../../Utility/Global_Attributes';

import {SafeAreaView} from 'react-native-safe-area-context';

class LawsTest extends React.Component {
  constructor(props) {
    super(props);
    this.apiCall = this.apiCall.bind(this);
    this.state = {
      id: this.props.route.params.id,
      screen: this.props.route.params.screen,
    };
  }

  apiCall = () => {
    var user = Global_Attributes.User;
    var pass = Global_Attributes.Pass;

    let numberVerBody = {
      user: user,
      pass: pass,
      id: this.state.id,
    };
    new LawsController().handleClick(
      numberVerBody,
      this.props,
      this.state.screen,
      Global_Attributes.laws,
    );
  };
  render() {
    this.apiCall();
    return (
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          margin: '30%',
        }}>
        <Text style={{flex: 1}}>Loading</Text>
      </SafeAreaView>
    );
  }
}
export default LawsTest;
