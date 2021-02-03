import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import ScanScreen from './screens/ScanScreen';
import CustomTabBar from './components/CustomTabBar';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';

const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();

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
            <RootStack.Navigator>
                <RootStack.Screen
                    name='HomeTabScreen'
                    component={HomeTabsScreen}
                />
                <RootStack.Screen
                    name='SignInScreen'
                    component={SignInScreen}
                    options={{ headerShown: false }}
                />
                <RootStack.Screen
                    name='SignUpScreen'
                    component={SignUpScreen}
                    options={{ headerShown: false }}
                />
            </RootStack.Navigator>
        </NavigationContainer>
    );
}

const HomeTabsScreen = () => {
    return (
        <Tab.Navigator
            initialRouteName='HomeScreen'
            tabBar={(props) => <CustomTabBar {...props} />}
        >
            <Tab.Screen name='HomeScreen' component={HomeScreen} />
            <Tab.Screen name='ScanScreen' component={ScanScreen} />
            <Tab.Screen name='ProfileScreen' component={ProfileScreen} />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
