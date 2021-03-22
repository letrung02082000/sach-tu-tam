import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

function DescriptionScreen({ route }) {
    const book = route.params;
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.text}>{book.description}</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        flex: 1,
    },
    text: {
        fontSize: 17,
        lineHeight: 25,
    },
});

export default DescriptionScreen;
