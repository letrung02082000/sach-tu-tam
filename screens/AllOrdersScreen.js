import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StatusBar } from 'react-native';
import MyOrdersScreen from './MyOrdersScreen';

const Tab = createMaterialTopTabNavigator();

function AllOrdersScreen() {
    return (
        <>
            <StatusBar />
            <Tab.Navigator>
                <Tab.Screen
                    name='MyOrdersScreen'
                    component={MyOrdersScreen}
                    options={{ headerShown: true, title: 'Đang xử lý' }}
                />
                <Tab.Screen
                    name='ProcessingOrdersScreen'
                    component={MyOrdersScreen}
                    options={{ headerShown: true, title: 'Đã giao' }}
                />
            </Tab.Navigator>
        </>
    );
}

export default AllOrdersScreen;
