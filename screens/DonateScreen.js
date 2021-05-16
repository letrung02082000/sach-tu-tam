import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    Alert,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    Image,
    TouchableOpacity,
} from 'react-native';
import { userApi } from '../api';

import { useSelector } from 'react-redux';

function DonateScreen({ navigation }) {
    const user = useSelector((state) => state.authReducer);

    const [tel, setTel] = useState(user.tel);
    const [address, setAddress] = useState(user.address);
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleTelChange = (val) => {
        const cleanNumber = val.replace(/[^0-9]/g, '');
        setTel(cleanNumber);
    };

    const handleAddressChange = (val) => {
        setAddress(val);
    };

    const handleContentChange = (val) => {
        setContent(val);
    };

    const confirmDonation = () => {
        if (!tel) return Alert.alert('Vui lòng nhập số điện thoại');
        if (tel.length != 10)
            return Alert.alert(
                'Số điện thoại hợp lệ phải là số điện thoại 10 số'
            );
        if (!address) return Alert.alert('Vui lòng nhập địa chỉ liên hệ');
        if (!content) return Alert.alert('Vui lòng nhập nội dung quyên góp');
        setLoading(true);

        const donation = {
            tel,
            address,
            content,
        };

        userApi.postDonation(donation).then((res) => {
            if (res.type == 'Valid') {
                setLoading(false);
                setSuccess(true);
            } else {
                Alert.alert(
                    'Có lỗi xảy ra. Nếu bạn cho rằng hệ thống gặp lỗi, hãy liên hệ cho chúng mình tại mục Báo lỗi'
                );
                setLoading(false);
            }
        });
    };

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: '#fff',
                paddingHorizontal: 10,
            }}
        >
            {success ? (
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#f7f7f7',
                    }}
                >
                    <Image
                        source={require('../assets/donationicon1.png')}
                        style={{ height: 150 }}
                        resizeMode='contain'
                    />
                    <Text style={{ fontSize: 17 }}>
                        Sách Từ Tâm xin cảm ơn bạn!
                    </Text>
                    <Text style={{ fontSize: 17 }}>
                        Chúng mình sẽ liên hệ lại cho bạn sớm nhất.
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('HomeScreen')}
                    >
                        <Text
                            style={{
                                paddingHorizontal: 15,
                                paddingVertical: 10,
                                backgroundColor: '#03ada0',
                                marginVertical: 21,
                                borderRadius: 5,
                                fontSize: 17,
                                fontWeight: 'bold',
                                color: '#fff',
                            }}
                        >
                            Về trang chủ
                        </Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <ScrollView keyboardShouldPersistTaps='always'>
                    <View style={{ marginTop: 15 }}>
                        <Text style={{ fontSize: 21 }}>
                            Số điện thoại của bạn
                        </Text>
                        <TextInput
                            value={tel}
                            placeholder='Nhập số điện thoại liên hệ của bạn'
                            onChangeText={(val) => handleTelChange(val)}
                            keyboardType={
                                Platform.OS === 'android'
                                    ? 'numeric'
                                    : 'number-pad'
                            }
                            style={{
                                padding: 15,
                                fontSize: 15,
                                marginTop: 15,
                                borderWidth: 1,
                                borderColor: '#ccc',
                                borderRadius: 5,
                            }}
                        />
                    </View>
                    <View style={{ marginTop: 15 }}>
                        <Text style={{ fontSize: 21 }}>Địa chỉ</Text>
                        <TextInput
                            placeholder='Nhập địa chỉ liên hệ của bạn'
                            onChangeText={handleAddressChange}
                            value={address}
                            style={{
                                padding: 15,
                                fontSize: 15,
                                marginTop: 15,
                                borderWidth: 1,
                                borderColor: '#ccc',
                                borderRadius: 5,
                            }}
                        />
                    </View>
                    <View style={{ marginTop: 15 }}>
                        <Text style={{ fontSize: 21 }}>Nội dung quyên góp</Text>
                        <TextInput
                            placeholder='Sách vở, quần áo hay đồ dùng thiết yếu'
                            onChangeText={handleContentChange}
                            numberOfLines={5}
                            multiline={true}
                            style={{
                                padding: 15,
                                fontSize: 15,
                                marginTop: 15,
                                borderWidth: 1,
                                borderColor: '#ccc',
                                borderRadius: 5,
                                fontSize: 17,
                            }}
                        />
                    </View>
                    <View style={{ marginVertical: 15 }}>
                        {loading ? (
                            <Button title='Vui lòng chờ...' />
                        ) : (
                            <Button
                                title='Xác nhận'
                                onPress={confirmDonation}
                            />
                        )}
                    </View>
                </ScrollView>
            )}
        </SafeAreaView>
    );
}

export default DonateScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
