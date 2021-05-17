import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    Alert,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { userApi } from '../api/user.api';
import { userActions } from '../redux/actions';

function UpdateInfoScreen() {
    const user = useSelector((state) => state.authReducer);
    const dispatch = useDispatch();

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
                dispatch(userActions.updateInfo(res.data));
                Alert.alert('Cập nhật thông tin thành công');
                setLoading(false);
            } else {
                Alert.alert(res.err);
                setLoading(false);
            }
        });
    };

    return (
        <ScrollView keyboardShouldPersistTaps='always'>
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <Text style={styles.titleText}>Tên đầy đủ</Text>
                <TextInput
                    style={styles.inputText}
                    placeholder='Nhập họ tên của bạn'
                    value={name}
                    onChangeText={handleChangeName}
                />
                <Text style={styles.titleText}>Email</Text>
                <Text style={[styles.inputText, { color: '#919191' }]}>
                    {user.email}
                </Text>
                {/* <Text style={styles.titleText}>Tên người dùng</Text>
            <TextInput
                style={styles.inputText}
                placeholder='Nhập tên người dùng'
                value={username}
                onChangeText={handleChangeUsername}
            /> */}
                <Text style={styles.titleText}>Số điện thoại</Text>
                <TextInput
                    style={styles.inputText}
                    placeholder='Nhập số điện thoại của bạn'
                    value={tel}
                    onChangeText={handleTelChange}
                />
                <Text style={styles.titleText}>Địa chỉ</Text>
                <TextInput
                    style={[styles.inputText, { marginBottom: 15 }]}
                    placeholder='Nhập địa chỉ của bạn'
                    value={address}
                    onChangeText={handleAddressChange}
                />
                <View style={{ padding: 5 }}>
                    {loading ? (
                        <Button title='Vui lòng chờ...' />
                    ) : (
                        <Button title='Cập nhật' onPress={updateUserInfo} />
                    )}
                </View>
            </View>
        </ScrollView>
    );
}

export default UpdateInfoScreen;

const styles = StyleSheet.create({
    titleText: {
        fontSize: 17,
        fontWeight: 'bold',
        paddingTop: 15,
        paddingHorizontal: 15,
        color: '#383838',
    },

    inputText: {
        fontSize: 17,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        color: '#383838',
        margin: 5,
    },
});
