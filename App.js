import React, { useState, useRef } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import RootStack from './navigation/RootStack';

export default function App() {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);

    const navigationRef = useRef();
    const routeNameRef = useRef();

    if (isLoading) {
        return (
            <View>
                <ActivityIndicator size='small' />
            </View>
        );
    }

    return (
        <NavigationContainer
            ref={navigationRef}
            onReady={() =>
                (routeNameRef.current = navigationRef.current.getCurrentRoute().name)
            }
            onStateChange={async () => {
                const previousRouteName = routeNameRef.current;
                const currentRouteName = navigationRef.current.getCurrentRoute()
                    .name;

                routeNameRef.current = currentRouteName;
            }}
        >
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
