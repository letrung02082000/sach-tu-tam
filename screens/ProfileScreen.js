import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    ScrollView,
    Image,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useDispatch, useSelector } from 'react-redux';
import { userApi } from '../api';
import { userActions } from '../redux/actions';
import { postActions } from '../redux/actions/post.actions';

export default function ProfileScreen({ navigation }) {
    const [totalPoint, setTotalPoint] = useState(0);
    const [orderPoint, setOrderPoint] = useState(0);
    const [donationPoint, setDonationPoint] = useState(0);
    const [eventPoint, setEventPoint] = useState(0);

    const user = useSelector((state) => state.authReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        userApi.getAllEvents().then((res) => {
            if (res.type == 'Valid') {
                let point = 0;

                for (let event of res.data) {
                    if (event.joined) {
                        point += event.eventId.point;
                        // console.log(event.eventId.point);
                    }
                }

                setEventPoint(point);
                // console.log(point);
            } else {
                console.log(res.err);
            }
        });

        userApi.getAllOrders().then((res) => {
            if (res.type == 'Valid') {
                let point = 0;

                for (let order of res.data) {
                    if (!order.pending) {
                        point += order.point;
                    }
                }

                setOrderPoint(point);
                // console.log(orderPoint);
            }
        });

        userApi.getAllDonations().then((res) => {
            if (res.type == 'Valid') {
                let point = 0;

                for (let donation of res.data) {
                    if (!donation.pending) {
                        point += parseInt(donation.point);
                    }
                }

                setDonationPoint(point);
                console.log(donationPoint);
            }
        });
    }, []);

    const handleLogin = () => {
        navigation.navigate('SignInScreen');
    };

    const handleLogout = () => {
        dispatch(userActions.logout());
        dispatch(postActions.refreshingAction());
        dispatch(postActions.getAllPostsAction(1, 10));
        // setTimeout(() => {
        //     navigation.navigate('SignInScreen');
        // }, 3000);
    };

    if (user.isLoggedIn) {
        return (
            <View style={{ backgroundColor: '#fff', flex: 1 }}>
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#fff',
                        marginVertical: 15,
                    }}
                >
                    <Image
                        source={{ uri: user.avt }}
                        style={{
                            width: 100,
                            height: 100,
                            borderWidth: 1,
                            borderRadius: 100,
                        }}
                    />
                    <Text
                        style={{
                            fontSize: 17,
                            fontWeight: 'bold',
                            marginVertical: 10,
                        }}
                    >
                        {user.name}
                    </Text>
                    {/* <TouchableOpacity
                        style={{
                            borderRadius: 5,
                            borderWidth: 1,
                            borderColor: '#ccc',
                            paddingHorizontal: 15,
                            paddingVertical: 5,
                        }}
                    ></TouchableOpacity> */}
                </View>
                <View
                    style={{ justifyContent: 'center', alignItems: 'center' }}
                >
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text>
                            {orderPoint + donationPoint + eventPoint} điểm
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            marginVertical: 25,
                        }}
                    >
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                onPress={() =>
                                    navigation.navigate('MyOrdersScreen')
                                }
                            >
                                <Text>{orderPoint}</Text>
                                <Text>Mua sách</Text>
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                // borderLeftWidth: 1,
                                // borderRightWidth: 1,
                                // borderLeftColor: '#333',
                                // borderRightColor: '#333',
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                onPress={() =>
                                    navigation.navigate('MyDonationsScreen')
                                }
                            >
                                <Text>{donationPoint}</Text>
                                <Text>Quyên góp</Text>
                            </TouchableOpacity>
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
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                onPress={() =>
                                    navigation.navigate('MyEventsScreen')
                                }
                            >
                                <Text>{eventPoint}</Text>
                                <Text>Tình nguyện</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <Button title='Đăng xuất' onPress={handleLogout} />
            </View>
        );
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <Text>Chào mừng bạn đến với Sách Từ Tâm</Text>
                <Button title='Đăng nhập/Đăng ký' onPress={handleLogin} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    headerTitle: {
        color: '#fff',
        backgroundColor: 'blue',
    },
});
