import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { useDispatch, useSelector } from 'react-redux';
import { userApi } from '../api';
import { userActions } from '../redux/actions';
import { postActions } from '../redux/actions/post.actions';

export default function ProfileScreen({ navigation }) {
    // const [totalPoint, setTotalPoint] = useState(0);
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
    }, [user.isLoggedIn]);

    const navigateToUpdateInfoScreen = () => {
        navigation.navigate('UpdateInfoScreen');
    };

    const navigateToMyOrdersScreen = () => {
        navigation.navigate('MyOrdersScreen');
    };

    const navigateToDonateScreen = () => {
        navigation.navigate('DonateScreen');
    };

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
            <SafeAreaView style={{ flex: 1 }}>
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#fff',
                        paddingVertical: 15,
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
                    <TouchableOpacity
                        style={{
                            borderRadius: 5,
                            borderWidth: 1,
                            borderColor: '#ccc',
                            paddingHorizontal: 15,
                            paddingVertical: 5,
                        }}
                        onPress={navigateToUpdateInfoScreen}
                    >
                        <View style={{ flexDirection: 'row', width: 125 }}>
                            <Text style={{ fontSize: 15 }}>
                                Cập nhật thông tin
                            </Text>
                            {/* <AntDesign
                                name='edit'
                                size={21}
                                style={{ paddingHorizontal: 15 }}
                            /> */}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            borderRadius: 5,
                            borderWidth: 1,
                            borderColor: '#ccc',
                            paddingHorizontal: 15,
                            paddingVertical: 5,
                            marginTop: 15,
                        }}
                        onPress={navigateToUpdateInfoScreen}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                width: 125,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                Yêu thích
                            </Text>
                            <MaterialIcons
                                name='favorite'
                                size={21}
                                style={{ paddingLeft: 15 }}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#fff',
                        marginTop: 5,
                    }}
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
                                onPress={navigateToMyOrdersScreen}
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
                <TouchableOpacity onPress={navigateToDonateScreen}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            backgroundColor: '#fff',
                            marginTop: 5,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Text
                                style={{
                                    paddingVertical: 15,
                                    paddingHorizontal: 15,
                                    fontSize: 17,
                                    color: '#383838',
                                    fontWeight: 'bold',
                                }}
                            >
                                Quyên góp
                            </Text>
                        </View>
                        <SimpleLineIcons
                            name='arrow-right'
                            size={15}
                            style={{
                                paddingHorizontal: 15,
                            }}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={navigateToMyOrdersScreen}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            backgroundColor: '#fff',
                            marginTop: 5,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Text
                                style={{
                                    paddingVertical: 15,
                                    paddingHorizontal: 15,
                                    fontSize: 17,
                                    color: '#383838',
                                    fontWeight: 'bold',
                                }}
                            >
                                Quản lý đặt sách
                            </Text>
                        </View>
                        <SimpleLineIcons
                            name='arrow-right'
                            size={15}
                            style={{
                                paddingHorizontal: 15,
                            }}
                        />
                    </View>
                </TouchableOpacity>

                {/* <TouchableOpacity onPress={navigateToMyOrdersScreen}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            backgroundColor: '#fff',
                            marginTop: 5,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Text
                                style={{
                                    paddingVertical: 15,
                                    paddingHorizontal: 15,
                                    fontSize: 17,
                                    color: '#383838',
                                    fontWeight: 'bold',
                                }}
                            >
                                Sách yêu thích
                            </Text>
                        </View>
                        <SimpleLineIcons
                            name='arrow-right'
                            size={15}
                            style={{
                                paddingHorizontal: 15,
                            }}
                        />
                    </View>
                </TouchableOpacity> */}

                <Button title='Đăng xuất' onPress={handleLogout} />
            </SafeAreaView>
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
