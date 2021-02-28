import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import AllBooksScreen from '../screens/AllBooksScreen';

const Stack = createStackNavigator();

export default function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='HomeScreen'
                component={HomeScreen}
                options={{ title: 'Trang chủ' }}
            />
            <Stack.Screen name='AllBooksScreen' component={AllBooksScreen} />
        </Stack.Navigator>
    );
}
