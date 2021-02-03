import React from 'react';
import { useState } from 'react';
import { View, Text, Button } from 'react-native';

export default function ProfileScreen({ navigation }) {
    const [isSignedIn, setIsSignedIn] = useState(false);

    const handleSignIn = () => {
        navigation.navigate('SignInScreen');
    };

    if (!isSignedIn) {
        return (
            <View>
                <Text>Bạn chưa đăng nhập?</Text>
                <Button title='Đăng nhập ngay' onPress={handleSignIn} />
            </View>
        );
    }

    return (
        <View>
            <Text>Đăng nhập thành công</Text>
        </View>
    );
}
