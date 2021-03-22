import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Clipboard } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AppLink from 'react-native-app-link';

function PaymentScreen({ route, navigation }) {
    const [openedMomo, setOpenedMomo] = useState(false);
    const [copied, setCopied] = useState(false);
    const order = route.params;
    const handlePayOrder = () => {
        const url = `https://nhantien.momo.vn/0877876877/${order.total}`;

        const config = {
            appName: 'MoMo',
            appStoreId: '918751511',
            appStoreLocale: 'vi',
            playStoreId: 'com.mservice.momotransfer',
        };
        AppLink.maybeOpenURL(url, config)
            .then(() => {
                setOpenedMomo(true);
            })
            .catch((err) => setOpenedMomo(false));
        // AppLink.openInStore(config)
        //     .then(() => console.log('aa'))
        //     .catch((err) => console.log(err));
    };

    const handleCopyButton = () => {
        Clipboard.setString(order.orderId);
        setCopied(true);
    };

    const navigateToHomeScreen = () => {
        navigation.navigate('HomeScreen');
    };

    return (
        <View
            style={{
                backgroundColor: '#fff',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 35,
                    marginHorizontal: 15,
                }}
            >
                <Ionicons
                    name='checkmark-done-circle-outline'
                    size={65}
                    color='#4BB543'
                />
                <Text style={{ fontSize: 15 }}>
                    Thành công! Đơn hàng của bạn đang được xử lý
                </Text>
            </View>
            <View style={{ flex: 1, marginHorizontal: 15 }}>
                <Text style={{ fontSize: 17 }}>
                    Vui lòng thanh toán với nội dung là mã đơn hàng bên dưới:
                </Text>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 15,
                    }}
                >
                    <Text style={{ fontSize: 21 }}>{order.orderId}</Text>
                    <TouchableOpacity
                        onPress={handleCopyButton}
                        style={{
                            borderWidth: 1,
                            marginLeft: 15,

                            borderRadius: 5,
                            borderColor: '#ccc',
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 15,
                                fontWeight: 'bold',
                                padding: 10,
                            }}
                        >
                            {copied ? 'Đã sao chép' : 'Sao chép'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <TouchableOpacity
                    style={{
                        backgroundColor: '#A50064',
                        padding: 15,
                        borderRadius: 5,
                    }}
                >
                    <Text
                        onPress={handlePayOrder}
                        style={{
                            fontSize: 17,
                            fontWeight: 'bold',
                            color: '#fff',
                        }}
                    >
                        Thanh toán ngay bằng Momo
                    </Text>
                </TouchableOpacity>
                {openedMomo ? (
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#009387',
                            padding: 15,
                            borderRadius: 5,
                            marginTop: 15,
                        }}
                    >
                        <Text
                            onPress={navigateToHomeScreen}
                            style={{
                                fontSize: 17,
                                fontWeight: 'bold',
                                color: '#fff',
                            }}
                        >
                            Về trang chủ
                        </Text>
                    </TouchableOpacity>
                ) : null}
            </View>
            {openedMomo ? null : (
                <View style={{ flex: 1, marginHorizontal: 15 }}>
                    <Text style={{ fontSize: 15 }}>
                        Lưu ý: Bạn vui lòng chờ một chút sau khi vào màn hình
                        chính của Momo nhé!
                    </Text>
                </View>
            )}
        </View>
    );
}

export default PaymentScreen;
