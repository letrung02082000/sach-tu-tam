import React from 'react';
import { View, Text } from 'react-native';

export default function CustomTabHeader({ title }) {
    console.log(title);
    return (
        <View>
            <Text>{title}</Text>
        </View>
    );
}
