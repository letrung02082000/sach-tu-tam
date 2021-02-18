import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeTabs from './HomeTabs';

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import CustomTabHeader from '../components/CustomTabHeader';

const Stack = createStackNavigator();

export default function RootStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='HomeTabScreen'
                component={HomeTabs}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='SignInScreen'
                component={SignInScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='SignUpScreen'
                component={SignUpScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}
