import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeStackScreen from '../navigation/HomeStack';
import ScanScreen from '../screens/ScanScreen';

import CustomTabBar from '../components/CustomTabBar';
import ProfileStackScreen from './ProfileStack';

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
    return (
        <Tab.Navigator
            initialRouteName='HomeStackScreen'
            tabBar={(props) => <CustomTabBar {...props} />}
        >
            <Tab.Screen name='HomeStackScreen' component={HomeStackScreen} />
            <Tab.Screen name='ScanScreen' component={ScanScreen} />
            <Tab.Screen
                name='ProfileStackScreen'
                component={ProfileStackScreen}
            />
        </Tab.Navigator>
    );
}
