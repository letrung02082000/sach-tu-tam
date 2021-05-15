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

import { useDispatch, useSelector } from 'react-redux';
import { userApi } from '../api';
import { userActions } from '../redux/actions';
import { postActions } from '../redux/actions/post.actions';

export default function ProfileScreen({ navigation }) {
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

    const navigateToSellBookScreen = () => {
        navigation.navigate('SellBookScreen');
    };

    const navigateToAllOrdersScreen = () => {
        navigation.navigate('AllOrdersScreen');
    };

    const handleLogin = () => {
        navigation.navigate('SignInScreen');
    };

    const handleLogout = () => {
        dispatch(userActions.logout());
        dispatch(postActions.refreshingAction());
        dispatch(postActions.getAllPostsAction(1, 10));
    };

    if (user.isLoggedIn) {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.profileContainer}>
                    <Image source={{ uri: user.avt }} style={styles.avt} />
                    <Text style={styles.nameText}>{user.name}</Text>

                    <View style={styles.updateInfoContainer}>
                        <TouchableOpacity onPress={navigateToUpdateInfoScreen}>
                            <Text style={{ fontSize: 15 }}>
                                Cập nhật thông tin
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View
                        style={[styles.updateInfoContainer, { marginTop: 15 }]}
                        onPress={navigateToUpdateInfoScreen}
                    >
                        <TouchableOpacity>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                Danh sách yêu thích
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.pointContainer}>
                    <View style={[styles.totalPoint, { marginTop: 15 }]}>
                        <Text style={styles.totalPointText}>
                            {orderPoint + donationPoint + eventPoint} điểm
                        </Text>
                    </View>
                    <View style={styles.detailPointContainer}>
                        <TouchableOpacity
                            style={styles.orderPoint}
                            onPress={navigateToMyOrdersScreen}
                        >
                            <Text>{orderPoint}</Text>
                            <Text>Mua sách</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.orderPoint}
                            onPress={() =>
                                navigation.navigate('MyDonationsScreen')
                            }
                        >
                            <Text>{donationPoint}</Text>
                            <Text>Quyên góp</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.orderPoint}
                            onPress={() =>
                                navigation.navigate('MyEventsScreen')
                            }
                        >
                            <Text>{eventPoint}</Text>
                            <Text>Tình nguyện</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={navigateToDonateScreen}
                    style={styles.donationContainer}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={styles.donationText}>Quyên góp</Text>
                    </View>
                    <SimpleLineIcons
                        name='arrow-right'
                        size={15}
                        style={{
                            paddingHorizontal: 15,
                        }}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={navigateToSellBookScreen}
                    style={styles.donationContainer}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={styles.donationText}>
                            Liên hệ bán sách
                        </Text>
                    </View>
                    <SimpleLineIcons
                        name='arrow-right'
                        size={15}
                        style={{
                            paddingHorizontal: 15,
                        }}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.donationContainer, { marginBottom: 9 }]}
                    onPress={navigateToAllOrdersScreen}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={styles.donationText}>
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
                </TouchableOpacity>
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

    profileContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 15,
    },

    avt: {
        width: 100,
        height: 100,
        borderWidth: 1,
        borderRadius: 100,
    },

    nameText: {
        fontSize: 17,
        fontWeight: 'bold',
        marginVertical: 10,
    },

    updateInfoContainer: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 15,
        paddingVertical: 5,
    },

    pointContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginTop: 5,
    },

    totalPoint: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    detailPointContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 25,
    },

    orderPoint: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },

    totalPointText: {
        fontSize: 17,
        fontWeight: 'bold',
    },

    donationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        marginTop: 5,
    },

    donationText: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        fontSize: 17,
        color: '#383838',
        fontWeight: 'bold',
    },
});
