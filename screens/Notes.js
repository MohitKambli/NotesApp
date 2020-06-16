import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Dimensions, StyleSheet, Text, View, StatusBar, AsyncStorage, Alert, ToastAndroid, ScrollView, TouchableHighlight, ImageBackground } from 'react-native';
import {SearchBar, Icon, Overlay} from 'react-native-elements';
import Card from '../components/Card';

const {width} = Dimensions.get('window');
const frameWidth = width;
const columnWidth = frameWidth / 2;

export default function Notes({ navigation })  {

    const [notes, setNotes] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [visible, setVisible] = useState(false);

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const filteredNotes = notes.filter( note => {
        return (note.title.toLowerCase().includes(searchValue.toLowerCase()) || 
        note.description.toLowerCase().includes(searchValue.toLowerCase()));
    })

    var deleteNote = async (key) => {
        try {
            await AsyncStorage.removeItem(key);
            var fetchedNotes = [];
            const keys = await AsyncStorage.getAllKeys();
            const result = await AsyncStorage.multiGet(keys);
            result.forEach((res) => {
                let parsed = JSON.parse(res[1]);
                fetchedNotes.push({
                    key: res[0],
                    title: parsed.title,
                    description: parsed.description
                });
            });
            setNotes(fetchedNotes);
        } catch(error) {
            alert(error);
        } 
    }

    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
                try {
                    var fetchedNotes = [];
                    const keys = await AsyncStorage.getAllKeys();
                    const result = await AsyncStorage.multiGet(keys);
                    result.forEach((res) => {
                        let parsed = JSON.parse(res[1]);
                        fetchedNotes.push({
                            key: res[0],
                            title: parsed.title,
                            description: parsed.description
                        });
                    });
                    setNotes(fetchedNotes);
                } catch(error) {
                    alert(error);
                }
            }   
            fetchData();
            return () => {};
        }, [])
    );

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <React.Fragment>
                    <View style={{flexDirection:"row", padding:8}}>
                        <Icon 
                            key={1}
                            name="info"
                            reversed
                            onPress={toggleOverlay}
                            size={45}
                            color= '#1E1939'                            
                        />
                        <Text>    </Text>
                        <Text
                            key={2}
                            style={styles.headerText}
                            onPress={() => 
                                navigation.navigate('AddNote')
                            }
                        >
                            ADD NOTE
                        </Text>
                    </View>
                </React.Fragment>
            ),
        });
    });

    return ( 
        <View style={styles.view}>
            <StatusBar hidden />
            <ImageBackground style={styles.background_image} source={require('../assets/images/app_background_6.jpg')}>
            <SearchBar 
                containerStyle={{backgroundColor:'#FE7B76'}}
                inputContainerStyle={{backgroundColor: '#F9F6F0', borderRadius: 10, borderWidth: 3, borderBottomWidth: 3, borderColor: '#2C112C'}}
                inputStyle={{color:'#000'}}
                placeholder="Search a note..."
                placeholderTextColor='#000'
                round
                searchIcon={{size: 24, color: '#000'}}
                onChangeText={setSearchValue}
                value={searchValue}
            />
            <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={{padding: 15, borderRadius: 6}}>
                <React.Fragment>
                    <Text style={{alignSelf: 'center', fontSize: 30, fontFamily: 'Raleway-Medium'}}>Instructions</Text>
                    <Text style={styles.heading}>•   Add a note</Text>
                    <Text style={styles.details}>Press the 'ADD NOTE' button, fill in the details and click 'ADD'.</Text>
                    <Text style={styles.heading}>•   Search a note</Text>
                    <Text style={styles.details}>Type some content of the note to be searched in the search bar.</Text>
                    <Text style={styles.heading}>•   View a note</Text>
                    <Text style={styles.details}>Press on a note and view it.</Text>
                    <Text style={styles.heading}>•   Edit a note</Text>
                    <Text style={styles.details}>Press on a note, click 'EDIT', make the required changes and click 'SAVE'.</Text>
                    <Text style={styles.heading}>•   Delete a note</Text>
                    <Text style={styles.details}>Press and hold the note to be deleted and click yes.</Text>
                </React.Fragment>
            </Overlay>
            <ScrollView>
                <View style={styles.list}>
                    {
                        filteredNotes.map((note) => {
                            return (
                                <TouchableHighlight
                                    underlayColor= '#000'
                                    style={styles.button} 
                                    key = {note.key}
                                    onLongPress ={() => {
                                        Alert.alert(
                                            'Delete',
                                            'Are you sure you want to delete Note: '+ note.title,
                                            [
                                                {text: 'No', onPress: () => {}},
                                                {text: 'Yes', onPress: () => {
                                                    deleteNote(note.key);
                                                    ToastAndroid.showWithGravityAndOffset(
                                                        "Note Deleted",
                                                        ToastAndroid.SHORT,
                                                        ToastAndroid.BOTTOM,
                                                        25,
                                                        50
                                                    );
                                                }}
                                            ]
                                        )
                                    }}
                                    onPress = {() => {
                                        navigation.navigate('ViewNote', {
                                            key: note.key,
                                            tempTitle: note.title,
                                            tempDescription: note.description,
                                        })
                                    }}
                                >
                                    <Card>
                                        <Text numberOfLines={1} style={styles.title}>{note.title}</Text>
                                        <Text numberOfLines={1} style={styles.description}>{note.description}</Text>
                                    </Card>
                                </TouchableHighlight>
                            );
                        })
                    }
                </View>
            </ScrollView>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    headerText: {
        borderColor: '#491D49',
        borderWidth: 2,
        borderStyle: 'solid',
        color: '#FFF',
        padding: 10,
        fontSize: 16,
        borderRadius: 5,
        backgroundColor: '#1E1939',
        alignSelf: 'center',
        justifyContent: 'center',
        fontFamily: 'Montserrat-SemiBold'
    },
    button:{
        width: columnWidth,
        padding: 5,
    },
    view: {
        flex: 1,
    },
    background_image: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    list: {
        marginTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems:'flex-start',
        justifyContent:'flex-start',
        width: frameWidth,
    },
    title: {
        fontSize: 22,
        color: '#F9F6F0',
        fontFamily: 'Lato-Regular',
    },
    description: {
        fontSize: 14,
        color: '#F9F6F0',
        fontFamily: 'Roboto-Light'
    },
    heading: {
        fontSize: 22,
        fontFamily: 'Lato-Regular',
    },
    details: {
        fontSize: 18,
        fontFamily: 'Roboto-Light'
    }
});