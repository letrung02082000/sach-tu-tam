import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    ScrollView,
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import AppLink from 'react-native-app-link';

export default function OrderScreen() {
    const [phoneNumber, setPhoneNumber] = useState(false);
    const [deliveryChecked, setDeliveryChecked] = useState('first');
    const [payChecked, setPayChecked] = useState('first');
    const [openedMomo, setOpenedMomo] = useState(null);
    const [confirmedOrder, setConfirmedOrder] = useState(false);

    const textInputChange = (val) => {
        const cleanNumber = val.replace(/[^0-9]/g, '');
        setPhoneNumber(cleanNumber);
    };

    const handlePayOrder = () => {
        const url = 'https://nhantien.momo.vn/0326637150/20000';
        //const url = 'momo://0326637150/20000';

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

    const confirmOrder = () => {
        setConfirmedOrder(true);
    };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ marginBottom: 100 }}>
                <View
                    style={{
                        flex: 1,
                        marginVertical: 15,
                        marginHorizontal: 10,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 21,
                            fontWeight: 'bold',
                            marginBottom: 15,
                        }}
                    >
                        Số điện thoại liên hệ
                    </Text>
                    <TextInput
                        placeholder='Nhập số điện thoại người nhận'
                        placeholderTextColor='#666666'
                        keyboardType={
                            Platform.OS === 'android' ? 'numeric' : 'number-pad'
                        }
                        onChangeText={(val) => textInputChange(val)}
                        style={{
                            height: 50,
                            borderWidth: 1,
                            borderColor: '#ccc',
                            borderRadius: 10,
                        }}
                    />
                </View>
                <View
                    style={{
                        flex: 1,
                        marginVertical: 15,
                        marginHorizontal: 10,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 21,
                            fontWeight: 'bold',
                            marginBottom: 15,
                        }}
                    >
                        Hình thức nhận sách
                    </Text>
                </View>
                <View>
                    <TouchableOpacity
                        style={{ flex: 1, flexDirection: 'row' }}
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
                        <Text>Nhận sách tại tủ sách</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ flex: 1, flexDirection: 'row' }}
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
                        <Text>Giao sách tận nơi</Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        flex: 1,
                        marginVertical: 5,
                        marginHorizontal: 10,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 21,
                        }}
                    >
                        Hình thức thanh toán
                    </Text>
                </View>
                <View>
                    <TouchableOpacity
                        style={{ flex: 1, flexDirection: 'row' }}
                        onPress={() => setPayChecked('first')}
                    >
                        <RadioButton
                            value='first'
                            status={
                                payChecked === 'first' ? 'checked' : 'unchecked'
                            }
                            onPress={() => setPayChecked('first')}
                        />
                        <Text>Thanh toán bằng momo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
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
                    </TouchableOpacity>
                    {deliveryChecked === 'second' ? (
                        <TouchableOpacity
                            style={{ flex: 1, flexDirection: 'row' }}
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
                            <Text>Thanh toán trực tiếp khi nhận sách</Text>
                        </TouchableOpacity>
                    ) : null}
                </View>
            </ScrollView>
            <View
                style={{
                    position: 'absolute',
                    bottom: 0,
                    flex: 1,
                    width: '100%',
                    backgroundColor: '#fff',
                }}
            >
                <TouchableOpacity
                    style={{ flex: 1, margin: 13 }}
                    onPress={confirmOrder}
                >
                    <Text
                        style={{
                            fontWeight: '500',
                            color: '#fff',
                            backgroundColor: '#f33f3f',
                            fontSize: 21,
                            padding: 7,
                            textAlign: 'center',
                            borderRadius: 5,
                        }}
                    >
                        Xác Nhận Đặt Sách
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
