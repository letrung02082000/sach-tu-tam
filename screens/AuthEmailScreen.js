import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

function AuthEmailScreen() {
    return (
        <View>
            <Text>Nhập mã được gửi đến địa chỉ Email</Text>
            <TextInput />
            <Button title='Xác nhận' />
        </View>
    );
}

export default AuthEmailScreen;
