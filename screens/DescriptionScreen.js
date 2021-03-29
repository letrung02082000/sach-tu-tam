import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

function DescriptionScreen({ route }) {
    const book = route.params;
    return (
        <View
            style={{
                backgroundColor: '#fff',
                flex: 1,
                paddingVertical: 15,
                paddingHorizontal: 15,
            }}
        >
            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.text}>{book.description}</Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    text: {
        fontSize: 17,
        lineHeight: 25,
    },
});

export default DescriptionScreen;
