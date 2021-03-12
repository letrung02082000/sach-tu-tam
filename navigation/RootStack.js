import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeTabs from './HomeTabs';

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import DetailScreen from '../screens/DetailScreen';
import SearchScreen from '../screens/SearchScreen';
import CartScreen from '../screens/CartScreen';
import OrderScreen from '../screens/OrderScreen';
import ScanScreen from '../screens/ScanScreen';

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
            <Stack.Screen
                name='DetailScreen'
                component={DetailScreen}
                options={{ headerShown: true }}
            />
            <Stack.Screen
                name='SearchScreen'
                component={SearchScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='CartScreen'
                component={CartScreen}
                options={{ headerShown: true, title: 'Giỏ hàng' }}
            />
            <Stack.Screen
                name='OrderScreen'
                component={OrderScreen}
                options={{ headerShown: true, title: 'Đặt sách' }}
            />
            <Stack.Screen
                name='ScanScreen'
                component={ScanScreen}
                options={{ headerShown: true, title: 'Quét sách' }}
            />
        </Stack.Navigator>
    );
}
