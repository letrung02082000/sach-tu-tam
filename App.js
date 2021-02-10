import React, { useState, useRef } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './navigation/RootStack';
import store from './redux/store';

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
        <Provider store={store}>
            <SafeAreaProvider>
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
            </SafeAreaProvider>
        </Provider>
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
