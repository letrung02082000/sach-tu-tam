import React from 'react';
import { View, Button, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen({ navigation }) {
    return (
        <SafeAreaView>
            <View>
                <Text>Home Screen</Text>
            </View>
        </SafeAreaView>
    );
}
