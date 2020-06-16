import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, AsyncStorage, ToastAndroid, BackHandler, Alert, ImageBackground} from 'react-native';
import { HeaderBackButton } from '@react-navigation/stack';

export default function AddNote({navigation})  {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

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

  const backAction = () => {
    if (title != '' || description != '') {
      Alert.alert(
        'Edited note not added!',
        'Are you sure you want to go back?',
        [
          {text: 'No', onPress: () => {}},
          {text: 'Yes', onPress: () => {navigation.goBack()}}
        ]
      )
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
    if(title != '' && description != ''){
      var key = new Date().toString();
      await AsyncStorage.setItem(key, JSON.stringify(note));
      navigation.goBack();
      callToast('Note Added');
    } else {
      if(title == '' && description == '') {
        callToast('Fill the Title and Description Prompt');
      } else if(title == ''){
        callToast('Fill Title Prompt');
      } else if (description == '') {
        callToast('Fill Description Prompt');
      }
    }
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text
          style={styles.headerText}
          onPress={() => 
            saveNote()
          }
        >
          ADD
        </Text>
      ),
      headerLeft: () => (
        <HeaderBackButton
          tintColor="#FFF"
          onPress={() => {
            if (title != '' || description != '') {
              Alert.alert(
                'Edited note not added!',
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
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor="#fff"
            style={[{fontFamily: 'Lato-Regular'}, {fontSize: 24} ,styles.input]}
            placeholder="Enter Title..."
            onChangeText={changeTitleHandler}
            value={title}
          />
          <TextInput 
            placeholderTextColor="#fff"
            style={[{maxHeight: 500, fontFamily: 'Roboto-Light', fontSize: 20}, styles.input]}
            placeholder="Enter Description..."
            onChangeText={changeDescriptionHandler}
            value={description}
            multiline
            scrollEnabled
            numberOfLines={20}
          />
        </View>
      </ImageBackground>
    </View>
  );
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
  }
});