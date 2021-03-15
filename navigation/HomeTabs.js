import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeStackScreen from '../navigation/HomeStack';
import ProfileStackScreen from './ProfileStack';
import QrCodeScreen from '../screens/QrCodeScreen';
import ReaderStack from './ReaderStack';
import EventStack from './EventStack';

import CustomTabBar from '../components/CustomTabBar';

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
    return (
        <Tab.Navigator
            initialRouteName='HomeStackScreen'
            tabBar={(props) => <CustomTabBar {...props} />}
        >
            <Tab.Screen name='HomeStackScreen' component={HomeStackScreen} />
            <Tab.Screen name='EventStackScreen' component={EventStack} />
            <Tab.Screen name='QrCodeScreen' component={QrCodeScreen} />
            <Tab.Screen name='ReaderStackScreen' component={ReaderStack} />
            <Tab.Screen
                name='ProfileStackScreen'
                component={ProfileStackScreen}
            />
        </Tab.Navigator>
    );
}
