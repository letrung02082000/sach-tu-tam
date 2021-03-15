import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ReaderScreen from '../screens/ReaderScreen';

const Stack = createStackNavigator();

export default function ReaderStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='ReaderScreen'
                component={ReaderScreen}
                options={{ headerShown: true }}
            />
        </Stack.Navigator>
    );
}
