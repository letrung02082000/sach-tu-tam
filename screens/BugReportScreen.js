import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Clipboard,
    Linking,
    Alert,
} from 'react-native';

function BugReportScreen() {
    const [copied, setCopied] = useState(false);
    const email = 'letrung02082000@gmail.com';
    const url = 'https://zalo.me/0961083049';

    const handleCopy = () => {
        Clipboard.setString(email);
        setCopied(true);
    };

    const openZalo = async () => {
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert('Không thể mở ứng dụng');
        }
    };

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#fff',
                alignItems: 'center',
            }}
        >
            <Text
                style={{
                    fontSize: 21,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginTop: 50,
                    color: '#03ada0',
                }}
            >
                Cảm ơn bạn đã sử dụng ứng dụng của chúng mình
            </Text>
            <Image
                source={require('../assets/loveicon1.png')}
                style={{ height: 150, marginVertical: 25 }}
                resizeMode='contain'
            />
            <View
                style={{
                    alignItems: 'center',
                    padding: 15,
                }}
            >
                <Text
                    style={{
                        fontSize: 17,
                        textAlign: 'center',
                        color: '#383838',
                        paddingHorizontal: 50,
                    }}
                >
                    Để báo lỗi, vui lòng gửi hình ảnh và mô tả lỗi về email:
                </Text>
                <View
                    style={{
                        alignItems: 'center',
                        marginTop: 9,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 17,
                            textAlign: 'center',
                            color: '#383838',
                        }}
                    >
                        {email}
                    </Text>
                    <TouchableOpacity
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        onPress={handleCopy}
                    >
                        <Text
                            style={{
                                fontSize: 15,
                                fontWeight: 'bold',
                                paddingVertical: 5,
                                paddingHorizontal: 15,
                                borderWidth: 1,
                                borderRadius: 5,
                                marginTop: 15,
                            }}
                        >
                            {copied ? 'Đã sao chép' : 'Sao chép'}
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text
                    style={{
                        fontSize: 17,
                        textAlign: 'center',
                        color: '#383838',
                        marginTop: 35,
                    }}
                >
                    Để được hỗ trợ trực tiếp, vui lòng liên hệ:
                </Text>
                <TouchableOpacity onPress={openZalo}>
                    <Text
                        style={{
                            paddingVertical: 10,
                            paddingHorizontal: 17,
                            backgroundColor: '#0567FC',
                            color: '#fff',
                            borderRadius: 5,
                            marginTop: 15,
                            fontSize: 17,
                            fontWeight: 'bold',
                        }}
                    >
                        Mở bằng Zalo
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default BugReportScreen;
