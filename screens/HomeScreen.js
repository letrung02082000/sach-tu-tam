import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen({ navigation }) {
    return (
        <SafeAreaView>
            <View>
                <Text style={styles.headerTitle}>Sách Từ Tâm</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    headerTitle: {
        backgroundColor: 'blue',
        color: '#fff',
        textAlign: 'center',
    },
});
