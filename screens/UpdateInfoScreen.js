import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { userApi } from '../api/user.api';

function UpdateInfoScreen() {
    const user = useSelector((state) => state.authReducer);

    const [name, setName] = useState(user.name);
    const [username, setUsername] = useState(user.username);
    const [tel, setTel] = useState(user.tel);
    const [address, setAddress] = useState(user.address);
    const [loading, setLoading] = useState(false);

    const handleChangeName = (val) => {
        setName(val);
    };

    const handleChangeUsername = (val) => {
        setUsername(val);
    };

    const handleTelChange = (val) => {
        setTel(val);
    };

    const handleAddressChange = (val) => {
        setAddress(val);
    };

    const updateUserInfo = () => {
        setLoading(true);
        const userInfo = {
            name,
            tel,
            address,
        };
        userApi.updateInfo(userInfo).then((res) => {
            console.log(res);
            if (res.type == 'Valid') {
                Alert.alert('Cập nhật thông tin thành công!');
                setLoading(false);
            } else {
                Alert.alert(res.err);
                setLoading(false);
            }
        });
    };

    return (
        <View>
            <Text>Tên đầy đủ</Text>
            <TextInput
                placeholder='Nhập họ tên của bạn'
                value={name}
                onChangeText={handleChangeName}
            />
            <Text>Tên người dùng</Text>
            <TextInput
                placeholder='Nhập tên người dùng'
                value={username}
                onChangeText={handleChangeUsername}
            />
            <Text>Số điện thoại</Text>
            <TextInput
                placeholder='Nhập số điện thoại của bạn'
                value={tel}
                onChangeText={handleTelChange}
            />
            <Text>Địa chỉ</Text>
            <TextInput
                placeholder='Nhập địa chỉ của bạn'
                value={address}
                onChangeText={handleAddressChange}
            />
            <Button title='Cập nhật' onPress={updateUserInfo} />
        </View>
    );
}

export default UpdateInfoScreen;
