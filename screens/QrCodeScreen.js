import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
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
                    <TouchableOpacity
                        style={styles.scanButton}
                        onPress={() => navigation.navigate('SignInScreen')}
                    >
                        <Text style={styles.btnText}>Đăng nhập</Text>
                    </TouchableOpacity>
                </View>
            )}

            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <TouchableOpacity
                    onPress={() => navigation.navigate('ScanScreen')}
                    style={styles.scanButton}
                >
                    <Text style={styles.btnText}>Quét sách</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default QrCodeScreen;

const styles = StyleSheet.create({
    scanButton: {
        //flex: 1,
        backgroundColor: '#4287f5',
        marginBottom: '30%',
        padding: 15,
        color: '#fff',
        borderRadius: 100,
        width: 150,
    },

    btnText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
