import React, { useState } from 'react';
import Notes from './screens/Notes';
import AddNote from './screens/AddNote';
import ViewNote from './screens/ViewNote';
import SplashScreen from './screens/SplashScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';

const Stack = createStackNavigator();

const getFonts = async () => 
  Font.loadAsync({
    'Lato-Regular': require('./assets/fonts/Lato-Regular.ttf'),
    'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
    'DancingScript-Bold' : require('./assets/fonts/Roboto-Light.ttf'),
    'Montserrat-SemiBold' : require('./assets/fonts/Montserrat-SemiBold.ttf'),
    'Raleway-Medium' : require('./assets/fonts/Raleway-Medium.ttf'),
  });

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  if(fontsLoaded){
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="SplashScreen" 
            component={SplashScreen} 
            options={
              {headerShown: false}
            }
          />
          <Stack.Screen 
            name="Notes" 
            component={Notes} 
            options={
              {
                title: 'My Notes', 
                headerStyle: {backgroundColor: '#FE7B76'}, 
                headerTintColor: '#000', 
                headerLeft: null,
                headerTitleStyle: {fontFamily: 'Raleway-Medium', fontSize: 30}
              }
            } 
          />
          <Stack.Screen 
            name="AddNote" 
            component={AddNote} 
            options={
              {
                title: 'Add Note', 
                headerStyle: {backgroundColor: '#160416'}, 
                headerTintColor: '#FFF',
                headerTitleStyle: {fontFamily: 'Raleway-Medium', fontSize: 30}
              }
            } 
          />
          <Stack.Screen 
            name="ViewNote" 
            component={ViewNote} 
            options={
              {
                headerStyle: {backgroundColor: '#160416'}, 
                headerTintColor: '#FFF',
                headerTitleStyle: {fontFamily: 'Raleway-Medium', fontSize: 30},
              }
            } 
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => setFontsLoaded(true)}
      /> 
    );
  }
}