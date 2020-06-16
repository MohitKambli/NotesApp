import React, { useState, useEffect } from 'react';
import {Text, StyleSheet, Animated, ImageBackground } from 'react-native';
import { StackActions } from '@react-navigation/native';

export default function SplashScreen({navigation}) {
    const [fadeAnim] = useState(new Animated.Value(0));

    useEffect(() =>{
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000
        }).start(() => {
            navigation.dispatch(
                StackActions.replace('Notes')
            );
        });
    }, []);
    
    return (
        <Animated.View
            style={
                {
                    flex: 1,
                    backgroundColor: '#000',
                    justifyContent: 'center',
                    alignItems:'center',
                    opacity: fadeAnim
                }
            }
        >
        <ImageBackground style={styles.background_image} source={require('../assets/images/app_background_7.jpg')}>
            <Text style={styles.text}>
                Notes App
            </Text>
        </ImageBackground>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
    },
    text: {
        color: '#fff',
        fontSize: 56,
        fontFamily: 'DancingScript-Bold',
        paddingTop: 220,
        paddingLeft: 50
    },
    image: {
        height: 250,
        width: 250
    },
    background_image: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
})
