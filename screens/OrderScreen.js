import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    ScrollView,
    StyleSheet,
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import { useSelector } from 'react-redux';

export default function OrderScreen() {
    const [phoneNumber, setPhoneNumber] = useState(false);
    const [deliveryChecked, setDeliveryChecked] = useState('first');
    const [payChecked, setPayChecked] = useState('first');
    const [openedMomo, setOpenedMomo] = useState(null);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [address, setAddress] = useState(null);

    const userInfo = useSelector((state) => state.authReducer);
    const cart = useSelector((state) => state.cartReducer);

    const handlePhoneNumber = (val) => {
        const cleanNumber = val.replace(/[^0-9]/g, '');
        setPhoneNumber(cleanNumber);
    };

    const handleAddressChange = (val) => {
        setAddress(val);
    };

    const confirmOrder = () => {
        setConfirmLoading(true);
        const orderInfo = {
            tel: phoneNumber,
            address: address,
            user: userInfo.isLoggedIn ? userInfo._id : null,
            shipping: deliveryChecked == 'first' ? false : true, //false: nhận tại tủ, true: giao tận nơi
            payment: payChecked == 'first' ? false : true, //false: momo, true: trực tiếp
            bookList,
        };
    };

    return (
        <View style={styles.container}>
            <ScrollView style={{ marginBottom: 100 }}>
                <View style={styles.phoneContainer}>
                    <Text style={styles.phoneText}>Số điện thoại liên hệ</Text>
                    <TextInput
                        placeholder='Nhập số điện thoại người nhận'
                        placeholderTextColor='#666666'
                        keyboardType={
                            Platform.OS === 'android' ? 'numeric' : 'number-pad'
                        }
                        onChangeText={(val) => handlePhoneNumber(val)}
                        style={styles.phoneInputText}
                    />
                </View>
                <View style={styles.deliveryContainer}>
                    <Text style={styles.deliveryText}>
                        Chọn hình thức nhận sách
                    </Text>
                    <View>
                        <TouchableOpacity
                            style={[
                                styles.deliveryButtonContainer,
                                {
                                    backgroundColor:
                                        deliveryChecked == 'first'
                                            ? '#e6e6e6'
                                            : '#fff',
                                },
                            ]}
                            onPress={() => setDeliveryChecked('first')}
                        >
                            <RadioButton
                                value='first'
                                status={
                                    deliveryChecked === 'first'
                                        ? 'checked'
                                        : 'unchecked'
                                }
                                onPress={() => setDeliveryChecked('first')}
                            />
                            <Text style={styles.deliveryButtonText}>
                                Nhận sách tại tủ sách
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.deliveryButtonContainer,
                                {
                                    backgroundColor:
                                        deliveryChecked == 'second'
                                            ? '#e6e6e6'
                                            : '#fff',
                                },
                            ]}
                            onPress={() => setDeliveryChecked('second')}
                        >
                            <RadioButton
                                value='second'
                                status={
                                    deliveryChecked === 'second'
                                        ? 'checked'
                                        : 'unchecked'
                                }
                                onPress={() => setDeliveryChecked('second')}
                            />
                            <Text style={styles.deliveryButtonText}>
                                Giao sách tận nơi
                            </Text>
                        </TouchableOpacity>
                        {deliveryChecked === 'second' ? (
                            <View style={{ marginTop: 15 }}>
                                <TextInput
                                    placeholder='Nhập địa chỉ người nhận'
                                    placeholderTextColor='#666666'
                                    onChangeText={(val) =>
                                        handleAddressChange(val)
                                    }
                                    style={styles.phoneInputText}
                                    value={address}
                                />
                            </View>
                        ) : null}
                    </View>
                </View>

                <View style={styles.deliveryContainer}>
                    <Text style={styles.deliveryText}>
                        Chọn hình thức thanh toán
                    </Text>
                    <View>
                        <TouchableOpacity
                            style={styles.deliveryButtonContainer}
                            onPress={() => setPayChecked('first')}
                        >
                            <RadioButton
                                value='first'
                                status={
                                    payChecked === 'first'
                                        ? 'checked'
                                        : 'unchecked'
                                }
                                onPress={() => setPayChecked('first')}
                            />
                            <Text style={styles.deliveryButtonText}>
                                Thanh toán bằng Momo
                            </Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity
                            style={{
                                flex: 1,
                                marginVertical: 15,
                                marginHorizontal: 5,
                            }}
                            onPress={handlePayOrder}
                        >
                            <Text
                                style={{
                                    fontSize: 17,
                                    padding: 5,
                                    backgroundColor: '#EC2997',
                                    color: '#fff',
                                    textAlign: 'center',
                                    paddingVertical: 10,
                                    width: 170,
                                    alignSelf: 'center',
                                    borderRadius: 5,
                                }}
                            >
                                Thanh toán ngay
                            </Text>
                        </TouchableOpacity> */}
                        {deliveryChecked === 'second' ? (
                            <TouchableOpacity
                                style={styles.deliveryButtonContainer}
                                onPress={() => setPayChecked('second')}
                            >
                                <RadioButton
                                    value='second'
                                    status={
                                        payChecked === 'second'
                                            ? 'checked'
                                            : 'unchecked'
                                    }
                                    onPress={() => setPayChecked('second')}
                                />
                                <Text style={styles.deliveryButtonText}>
                                    Thanh toán trực tiếp khi nhận sách
                                </Text>
                            </TouchableOpacity>
                        ) : null}
                    </View>
                </View>
            </ScrollView>
            <View style={styles.confirmContainer}>
                <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={confirmOrder}
                >
                    <Text style={styles.confirmText}>
                        {confirmLoading
                            ? 'Vui lòng chờ...'
                            : 'Xác Nhận Đặt Sách'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },

    confirmContainer: {
        position: 'absolute',
        bottom: 0,
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
    },

    confirmButton: { flex: 1, margin: 13 },

    confirmText: {
        fontWeight: '500',
        color: '#fff',
        backgroundColor: '#f33f3f',
        fontSize: 21,
        padding: 7,
        textAlign: 'center',
        borderRadius: 5,
    },

    phoneContainer: {
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 15,
        paddingHorizontal: 15,
    },

    phoneText: {
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333333',
    },

    phoneInputText: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        fontSize: 15,
    },

    deliveryContainer: {
        flex: 1,
        marginVertical: 10,
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
    },

    deliveryText: {
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333333',
    },

    deliveryButtonContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 9,
        borderRadius: 5,
        marginBottom: 5,
    },

    deliveryButtonText: { fontSize: 17, paddingHorizontal: 5 },
});
