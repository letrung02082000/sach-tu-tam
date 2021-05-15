import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { userApi } from '../api';

import { useSelector } from 'react-redux';

function DonateScreen() {
    const user = useSelector((state) => state.authReducer);

    const [tel, setTel] = useState(user.tel);
    const [address, setAddress] = useState(user.address);
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(true);

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
        if (!tel) return Alert.alert('Vui lòng nhập số điện thoại!');
        if (tel.length != 10) return Alert.alert('Số điện thoại không hợp lệ!');
        if (!address) return Alert.alert('Vui lòng nhập địa chỉ liên hệ!');
        if (!content) return Alert.alert('Vui lòng nhập nội dung quyên góp!');
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
                Alert.alert('Có lỗi xảy ra! Vui lòng thử lại.');
                setLoading(false);
            }
        });
    };

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#fff',
                paddingHorizontal: 5,
                paddingVertical: 10,
            }}
        >
            {success ? (
                <View>
                    <Text>Gửi yêu cầu thành công</Text>
                </View>
            ) : (
                <View>
                    <Text>Số điện thoại</Text>
                    <TextInput
                        value={tel}
                        placeholder='Nhập số điện thoại liên hệ của bạn'
                        onChangeText={(val) => handleTelChange(val)}
                        keyboardType={
                            Platform.OS === 'android' ? 'numeric' : 'number-pad'
                        }
                    />
                    <Text>Địa chỉ</Text>
                    <TextInput
                        placeholder='Nhập địa chỉ liên hệ của bạn'
                        onChangeText={handleAddressChange}
                        value={address}
                    />
                    <Text>Nội dung quyên góp</Text>
                    <TextInput
                        placeholder='Sách vở, quần áo hay đồ dùng thiết yếu'
                        onChangeText={handleContentChange}
                    />
                    {loading ? (
                        <Text>Vui lòng chờ...</Text>
                    ) : (
                        <Button title='Xác nhận' onPress={confirmDonation} />
                    )}
                </View>
            )}
        </View>
    );
}

export default DonateScreen;
