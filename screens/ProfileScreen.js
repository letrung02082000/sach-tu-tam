import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../redux/actions';

export default function ProfileScreen({ navigation }) {
    const user = useSelector((state) => state.authReducer);

    const dispatch = useDispatch();

    const handleLogin = () => {
        navigation.navigate('SignInScreen');
    };

    const handleLogout = () => {
        dispatch(userActions.logout());
        setTimeout(() => {
            navigation.navigate('SignInScreen');
        }, 3000);
    };

    if (user.isLoggedIn) {
        return (
            <View>
                <Text>Đăng nhập thành công</Text>
                <Button title='Đăng xuất' onPress={handleLogout} />
            </View>
        );
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <Text>Chào mừng bạn đến với Sách Từ Tâm</Text>
                <Button title='Đăng nhập/Đăng ký' onPress={handleLogin} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    headerTitle: {
        color: '#fff',
        backgroundColor: 'blue',
    },
});
