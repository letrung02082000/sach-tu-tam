import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useDispatch } from 'react-redux';
import { userActions } from '../redux/actions';

export default function ProfileScreen({ navigation }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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

    if (!isLoggedIn) {
        return (
            <SafeAreaView>
                <ScrollView>
                    <Text style={styles.headerTitle}>Cá nhân</Text>
                    <Text>Chào mừng bạn đến với Sách Từ Tâm</Text>
                    <Button title='Đăng nhập/Đăng ký' onPress={handleLogin} />
                </ScrollView>
            </SafeAreaView>
        );
    }

    return (
        <View>
            <Text>Đăng nhập thành công</Text>
            <Button title='Đăng xuất' onPress={handleLogout} />
        </View>
    );
}

const styles = StyleSheet.create({
    headerTitle: {
        color: '#fff',
        backgroundColor: 'blue',
    },
});
