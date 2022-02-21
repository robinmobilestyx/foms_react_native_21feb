

import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer} from '@react-navigation/native'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {StatusBar,TextInput,Text} from 'react-native';
import Splash from './Activity/Login/Splash';
import LoginPage from './Activity/Login/LoginPage';
import NumberVerification from './Activity/Login/NumberVerification';
import Enter_Otp from './Activity/Login/Enter_Otp';
import Create_Pin from './Activity/Login/Create_Pin';
import Dashboard from './Activity/Dashboard/Dashboard';
import Profile from './Activity/Dashboard/Profile';
import { ModalPortal } from 'react-native-modals';
import Help from './Activity/Dashboard/Help';
import PonInfo from './Activity/Tickets/Part_One/PonInfo';
import PonPreview from './Activity/Tickets/Part_One/PonPreview';
import PonOffence from './Activity/Tickets/Part_One/PonOffence';
import Print from './Activity/Dashboard/Print';
import appJson from './app.json';
import Logout from './Activity/Dashboard/Logout';
import PonReports from './Activity/Reports/PonReports';
import PonWarning from './Activity/Reports/PonWarning';
import PonReleaseForm from './Activity/Reports/PonReleaeForm';
import PonSummons from './Activity/Reports/PonSummons';
import LawsSearch from './Activity/Laws/LawsSearch';
import LawsTest from './Activity/Laws/LawsTest';
import LawsParentTitle from './Activity/Laws/LawsParentTitle';
import LawsDescription from './Activity/Laws/LawsDescription';
import LawsActTitle from './Activity/Laws/LawsActTitle';
import SignPad from './Activity/Dashboard/SignPad';
import Modals from "./Activity/Dashboard/Modals";
import Config from "react-native-config";
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';


const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  // Specify custom property
  myOwnProperty: true,
  // Specify custom property in nested object
  colors: {
   // myOwnColor: "#11246F",
   ...DefaultTheme.colors,
   primary: '#11246F',
   
  }
};

// Text.defaultProps = Text.defaultProps || {}
// Text.defaultProps.style =  { fontFamily: 'monospace' }

// let oldRender = Text.render;
// Text.render = function (...args) {
//     let origin = oldRender.call(this, ...args);
//     return React.cloneElement(origin, {
//         style: [{color: 'red', fontFamily: 'sans-serif-thin'}, origin.props.style]
//     });
// };

// let oldRender1 = TextInput.render;
// TextInput.render = function (...args) {
//     let origin = oldRender1.call(this, ...args);
//     return React.cloneElement(origin, {
//         style: [{color: 'blue', fontFamily: 'sans-serif-medium'}, origin.props.style]
//     });
// };

Text.defaultProps = {
  ...(Text.defaultProps || {}),
  allowFontScaling: false,

 
};

TextInput.defaultProps = {
  ...(TextInput.defaultProps || {}),
  allowFontScaling: false,
};


   export default function App() {
    console.log("data heare")
            return( 
              
              <PaperProvider theme={theme} >
                <NavigationContainer>
                <StatusBar backgroundColor="#11246F"/>
                  <Stack.Navigator 
                  screenOptions={{
                  headerShown: true,
                  title:Config.APP_NAME,
                  headerTintColor: '#fefcfd',
                   headerStyle: {
                      backgroundColor:"#11246F",
                      
                    },
                    // headerLeft: () => { 
                    // return <></>; 
                    // }
                  }}
                  >
          
                    <Stack.Screen name="Splash" component={Splash} options={{headerShown: false}}/>
                    <Stack.Screen name="Modals" component={Modals} options={{headerShown: false}}/>
                    <Stack.Screen name="NumberVerification" component={NumberVerification} options={{headerShown: false}} />
                    <Stack.Screen name="Enter_Otp" component={Enter_Otp}  options={{headerLeft: () => {return <></>} }} />
                    <Stack.Screen name="Create_Pin" component={Create_Pin} options={{headerLeft: () => {return <></>} }}/>
                    <Stack.Screen name="LoginPage" component={LoginPage} 
                     options={{
                    title: 'Welcome',
                    headerTitleAlign: 'center',
                    headerStatusBarHeight:25,
                    headerStyle: {
                      backgroundColor:"#11246F",
                      fontWeight:'bold'
                      
                    },
                    headerLeft: () => {return <></>;},
                    headerTitleStyle: {
                      fontSize:25,
                      fontWeight:'bold'  
                    },headerTintColor: '#fefcfd',
                    
                     }}
                   />
                   <Stack.Screen name="Dashboard" component={Dashboard} options={{headerLeft: () => {return <></>},headerRight: () => {return <Logout/>} }}/>
                   <Stack.Screen name="Profile" component={Profile} options={{headerShown: false}}/>
                   <Stack.Screen name="SignPad" component={SignPad} options={{headerLeft: () => {return <></>} }}/>
                   <Stack.Screen name="Help" component={Help}  options={{headerRight: () => {return <Logout/>}}}/>
                  
                   
                   <Stack.Screen name="PonInfo" component={PonInfo} options={{headerRight: () => {return <Logout/>}}}/>
                   <Stack.Screen name="PonOffence" component={PonOffence} options={{headerRight: () => {return <Logout/>}}}/>
                   <Stack.Screen name="PonPreview" component={PonPreview} options={{headerRight: () => {return <Logout/>}}}/>
                   
                   <Stack.Screen name="Print" component={Print} options={{headerLeft: () => {return <></>} }}/>
                   <Stack.Screen name="LawsParentTitle" component={LawsParentTitle} options={{headerLeft: () => {return <></>} }}/>
                   <Stack.Screen name="LawsActTitle" component={LawsActTitle} options={{headerLeft: () => {return <></>} }}/>
                   <Stack.Screen name="LawsDescription" component={LawsDescription} options={{headerLeft: () => {return <></>} }}/>
                   <Stack.Screen name="PonReports" component={PonReports} options={{headerLeft: () => {return <></>} }}/>
                   <Stack.Screen name="PonWarning" component={PonWarning} options={{headerLeft: () => {return <></>} }}/>
                   <Stack.Screen name="PonReleaseForm" component={PonReleaseForm} options={{headerLeft: () => {return <></>} }}/>
                   <Stack.Screen name="PonSummons" component={PonSummons} options={{headerLeft: () => {return <></>} }}/>
                   <Stack.Screen name="LawsSearch" component={LawsSearch} options={{headerLeft: () => {return <></>} }}/>
                   <Stack.Screen name="LawsTest" component={LawsTest} options={{headerShown: false}}/>
                    
                  </Stack.Navigator>
                  <ModalPortal/>
                </NavigationContainer>
                </PaperProvider>
              );  
}
   