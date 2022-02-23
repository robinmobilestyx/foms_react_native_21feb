import React, { Component,useEffect,useState } from 'react';
import Global_Attributes from '../../Utility/Global_Attributes';

import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator,
  Text
} from 'react-native';


const Loader = (props) => {

  const {
    loading,
  } = props;
  
  function  CloseModal ()  {
    console.log(loading);
  }
  
  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {CloseModal()}}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            animating={loading}
            size="large"
            color="#11246F"
            />
          <Text style={{color:'black'}}>Please wait ! This may take time</Text>  
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: '10%',
    width: '80%',
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth:1,
    borderColor:'red'
  }
});

export default Loader;

