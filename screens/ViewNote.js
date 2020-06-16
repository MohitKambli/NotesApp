import React, { useState, useEffect } from 'react';
import { AsyncStorage, TextInput, StatusBar, Text, StyleSheet, ToastAndroid, ScrollView, View, Alert, BackHandler, ImageBackground } from 'react-native';
import { HeaderBackButton } from '@react-navigation/stack';

export default function ViewNote({route, navigation}) {
    const {key} = route.params;
    const {tempTitle} = route.params;
    const {tempDescription} = route.params;

    const [title, setTitle] = useState(tempTitle);
    const [description, setDescription] = useState(tempDescription);
    const [header, setHeader] = useState('EDIT');
    const [headerTitle, setHeaderTitle] = useState('View Note');

    const changeTitleHandler = (val) => {
      setTitle(val);
    }
    
    const changeDescriptionHandler = (val) => {
      setDescription(val);
    }

    const callToast = (message) => {
      ToastAndroid.showWithGravityAndOffset(
        message,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    }

    const handleHeaderText = () => {
      if(header == 'EDIT'){
        setHeaderTitle('Edit Note')
        setHeader('SAVE');
        callToast('Editing...');
      }
      else if (header == 'SAVE') 
        saveNote();
    }

    const backAction = () => {
      if(title != tempTitle || description != tempDescription) {
        Alert.alert("Edited note not saved!", "Are you sure you want to go back?", [
          { text: "NO" },
          { text: "YES", onPress: () => navigation.goBack() }
        ]);
      } else {
        navigation.goBack();
      }
      return true;
    };
  
    useEffect(() => {
      BackHandler.addEventListener("hardwareBackPress", backAction);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, [backAction]);

    var saveNote = async() => {
      var note = {
        title: title,
        description: description,
      };
      if(title == tempTitle && description == tempDescription){
        navigation.goBack();
        callToast('Note saved');
      }
      else if (title != '' && description != '') {
        await AsyncStorage.setItem(key, JSON.stringify(note));
        navigation.goBack();
        callToast('Note edited');
      } else if (title == '' && description == '') {
        callToast('Fill the Title and Description Prompt');
      } else if(title == '') {
        callToast('Fill Title Prompt');
      } else if(description == '') {
        callToast('Fill Description Prompt');
      }
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: headerTitle,
            headerRight: () => (
              <Text 
                style={styles.headerText}
                onPress={handleHeaderText}
              >
                {header}
              </Text>
            ),
            headerLeft: () => (
              <HeaderBackButton
                tintColor= '#fff'
                onPress={() => {
                  if (title != tempTitle || description != tempDescription) {
                    Alert.alert(
                      'Edited note not saved!',
                      'Are you sure you want to go back?',
                      [
                        {text: 'No', onPress: () => {}},
                        {text: 'Yes', onPress: () => {navigation.goBack()}}
                      ]
                    )
                  } else {
                    navigation.goBack();
                  }
                }}
              />
            ),
        });
    });

  return (
    <View style={styles.view}>
      <StatusBar hidden />
      <ImageBackground style={styles.background_image} source={require('../assets/images/app_background_13.jpg')}>
        {
          header == 'SAVE' ? (<TextInput 
            style={[{fontFamily: 'Lato-Regular'}, {fontSize: 24}, styles.input]}
            onChangeText={changeTitleHandler}
            value={title}
          />) : 
          (<Text style={[{fontFamily: 'Lato-Regular'}, {fontSize: 24}, styles.input]}>
            {title}
          </Text>)
        }
        {
          header == 'SAVE' ? (
            <TextInput 
              style={[{maxHeight: 500, fontFamily: 'Roboto-Light', fontSize: 20}, styles.input]}
              onChangeText={changeDescriptionHandler}
              value={description}
              multiline
            />
          ) : 
          (
            <ScrollView>
                <Text 
                  style={[{fontFamily: 'Roboto-Light', fontSize: 20}, styles.input]}
                >
                  {description}
                </Text>
            </ScrollView>
          )
        }
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
    headerText: {
      borderColor: '#251F47',
      borderWidth: 2,
      borderStyle: 'solid',
      color: '#FFF',
      padding: 10,
      fontSize: 16,
      borderRadius: 5,
      backgroundColor: '#2593BB',
      alignSelf: 'center',
      justifyContent: 'center',
      fontFamily: 'Montserrat-SemiBold'
    },  
    view: {
      flex: 1,
    },
    background_image: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
    input: {
      color: '#fff',
      padding: 10,
      borderColor: '#fff',
      borderWidth: 1,
      borderStyle: "solid",
      borderRadius: 5,
      textAlignVertical: 'top',
    },
  });
