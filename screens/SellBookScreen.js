import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Linking,
    Clipboard,
    Alert,
    Image,
} from 'react-native';

function DonateScreen() {
    const browserUrl = 'https://www.facebook.com/tusachtutam';
    const facebookUrl = 'fb://page/111296164047565';
    const messengerUrl = 'fb-messenger://user/111296164047565';
    const telUrl = 'tel://0877876877';
    const [copied, setCopied] = useState(false);

    const openMessenger = async () => {
        const supported = await Linking.canOpenURL(messengerUrl);

        if (supported) {
            await Linking.openURL(messengerUrl);
        } else {
            Alert.alert(
                'Ứng dụng không được hỗ trợ',
                'Bạn vui lòng cài đặt ứng dụng Messenger'
            );
        }
    };

    const openInBrowser = async () => {
        const supported = await Linking.canOpenURL(facebookUrl);

        if (supported) {
            await Linking.openURL(facebookUrl);
        } else {
            await Linking.openURL(browserUrl);
        }
    };

    const makeCall = async () => {
        const supported = await Linking.canOpenURL(telUrl);

        if (supported) {
            await Linking.openURL(telUrl);
        } else {
            Alert.alert('Ứng dụng không được hỗ trợ');
        }
    };

    const handleCopy = () => {
        Clipboard.setString('0877876877');
        setCopied(true);
    };

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#fff',
                paddingHorizontal: 35,
                paddingVertical: 10,
                // justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Text
                style={{
                    fontSize: 21,
                    lineHeight: 25,
                    fontWeight: 'bold',
                    color: '#383838',
                    textAlign: 'center',
                    marginTop: 15,
                }}
            >
                Bạn vui lòng liên hệ bán sách qua các kênh bên dưới:
            </Text>
            <View style={{ flexDirection: 'column', marginTop: 15 }}>
                <Image
                    source={require('../assets/fbicon.png')}
                    style={{ height: 30 }}
                    resizeMode='contain'
                />
                <Text
                    style={{ fontSize: 17, textAlign: 'center', marginTop: 10 }}
                >
                    www.facebook.com/tusachtutam
                </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                    onPress={openMessenger}
                    style={{
                        paddingVertical: 7,
                        paddingHorizontal: 15,
                        borderWidth: 1,
                        borderRadius: 5,
                        color: '#383838',
                        marginTop: 15,
                    }}
                >
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                        Gửi tin nhắn
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={openInBrowser}
                    style={{
                        paddingVertical: 7,
                        paddingHorizontal: 15,
                        borderWidth: 1,
                        borderRadius: 5,
                        color: '#383838',
                        marginTop: 15,
                        marginLeft: 15,
                    }}
                >
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                        Mở Facebook
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: 50 }}>
                <Image
                    source={require('../assets/callicon.png')}
                    style={{ height: 30 }}
                    resizeMode='contain'
                />
                <Text
                    style={{ fontSize: 17, textAlign: 'center', marginTop: 10 }}
                >
                    Hotline: 0877.876.877
                </Text>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <TouchableOpacity
                    onPress={handleCopy}
                    style={{
                        paddingVertical: 7,
                        paddingHorizontal: 15,
                        borderWidth: 1,
                        borderRadius: 5,
                        color: '#383838',
                        marginTop: 15,
                        marginRight: 15,
                    }}
                >
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                        {copied ? 'Đã sao chép' : 'Sao chép'}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={makeCall}
                    style={{
                        paddingVertical: 7,
                        paddingHorizontal: 15,
                        borderWidth: 1,
                        borderRadius: 5,
                        color: '#383838',
                        marginTop: 15,
                    }}
                >
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                        Gọi ngay
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default DonateScreen;
