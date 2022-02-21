import {StyleSheet} from 'react-native';

const PdfViewStyle = StyleSheet.create({
  maincontainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  pdf: {
    flex: 1,
  },

  bottomcontainer: {
    position: 'absolute',
    flex: 1,
    backgroundColor: '#fafafa',
    flexDirection: 'row',
  },
  touchableOpacity1: {
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#112470',
    alignSelf: 'center',
    height: '60%',
    width: '40%',
  },
  touchableOpacity2: {
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#112470',
    alignSelf: 'center',

    height: '60%',
    width: '40%',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 12,
  },
});

export default PdfViewStyle;
