import Global_Attributes from '../../Utility/Global_Attributes';
import {StyleSheet} from 'react-native';

const Dashboardstyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
  },
  buttonstyle: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  gridMainView: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5F5F5',
    borderWidth: 0.5,
    borderColor: '#CDCDCD',
    //  borderRadius:3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    marginBottom: 5,
    elevation: 2,
    position: 'relative',
  },
  gridrowView: {
    flex: 1,
    flexDirection: 'row',
  },
  gridItems: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 0.5,
    borderColor: 'grey',
  },
  gridItems1: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 0,
    borderColor: 'grey',
  },
  gridText: {
    color: '#11246f',
    fontSize: 9,
    top: 30,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginLeft: 5,
    marginRight: 5,
    fontFamily: Global_Attributes.fixfontstyle,
  },
  gridImage: {
    height: 40,
    width: 40,
    alignSelf: 'center',
    top: 15,
  },
});

export default Dashboardstyle;
