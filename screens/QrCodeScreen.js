import React from 'react';
import { View, Button, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useSelector } from 'react-redux';

import QRCode from 'react-native-qrcode-svg';

function QrCodeScreen({ navigation }) {
    const user = useSelector((state) => state.authReducer);
    const data = { id: user._id, username: user.username, email: user.email };
    console.log(data);

    return (
        <SafeAreaView>
            {user.isLoggedIn ? (
                <View
                    style={{
                        height: 500,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ marginBottom: 15 }}>Mã QR của bạn</Text>
                    <View
                        style={{
                            width: 300,
                            height: 300,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <QRCode
                            size={200}
                            value={JSON.stringify(data)}
                            logoBackgroundColor='transparent'
                        />
                    </View>
                </View>
            ) : (
                <View
                    style={{
                        height: 500,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ marginBottom: 15 }}>
                        Đăng nhập ngay để nhận mã QR tại đây
                    </Text>
                    <Button
                        title='Đăng nhập'
                        onPress={() => navigation.navigate('SignInScreen')}
                    />
                </View>
            )}

            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Button
                    onPress={() => navigation.navigate('ScanScreen')}
                    title='Quét sách'
                />
            </View>
        </SafeAreaView>
    );
}

export default QrCodeScreen;
