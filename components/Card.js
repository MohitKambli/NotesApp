import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function Card(props) {
    return(
        <View style={styles.card}>
            <View style={styles.cardContent}>
                { props.children }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        borderColor: '#000',
        borderWidth: 1.5,
        borderRadius: 6,
        elevation: 3,
        backgroundColor: 'rgba(0,0,0,0.65)',
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.3,
        marginHorizontal: 4,
        marginVertical: 6,
    },
    cardContent: {
        marginHorizontal: 10,
        marginVertical: 15,
    },
})