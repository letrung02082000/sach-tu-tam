import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import EventScreen from '../screens/EventScreen';

const Stack = createStackNavigator();

export default function EventStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='EventScreen'
                component={EventScreen}
                options={{ headerShown: true }}
            />
        </Stack.Navigator>
    );
}
