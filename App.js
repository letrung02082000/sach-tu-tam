import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import RootStack from './navigation/RootStack';

export default function App() {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);

    if (isLoading) {
        return (
            <View>
                <ActivityIndicator size='small' />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <RootStack />
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
