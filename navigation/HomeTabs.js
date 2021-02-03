import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import ScanScreen from '../screens/ScanScreen';
import ProfileScreen from '../screens/ProfileScreen';

import CustomTabBar from '../components/CustomTabBar';

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
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
}
