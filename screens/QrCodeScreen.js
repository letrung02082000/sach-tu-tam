import React from 'react';
import { View, Button, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useSelector } from 'react-redux';

import QRCode from 'react-native-qrcode-svg';

function QrCodeScreen({ navigation }) {
    const user = useSelector((state) => state.authReducer);
    const data = { ...user, token: 'hidden' };
    console.log(data);

    return (
        <SafeAreaView>
            {user.isLoggedIn ? (
                <View>
                    <Text>Mã QR của bạn</Text>
                    <View>
                        <QRCode
                            value={JSON.stringify(user)}
                            logoBackgroundColor='transparent'
                        />
                    </View>
                </View>
            ) : (
                <View>
                    <Text>Bạn chưa đăng nhập.</Text>
                    <Text>Đăng nhập ngay để nhận mã tại đây</Text>
                    <Button
                        title='Đăng nhập'
                        onPress={() => navigation.navigate('SignInScreen')}
                    />
                </View>
            )}

            <Button
                onPress={() => navigation.navigate('ScanScreen')}
                title='Scan'
            />
        </SafeAreaView>
    );
}

export default QrCodeScreen;
