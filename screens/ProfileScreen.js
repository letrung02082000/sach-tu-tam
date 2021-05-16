import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    ActivityIndicator,
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
    const [pointLoading, setPointLoading] = useState(false);

    const user = useSelector((state) => state.authReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        setPointLoading(true);
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
        setPointLoading(false);
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
                <ScrollView style={{ flex: 1 }}>
                    <View style={styles.profileContainer}>
                        <Image source={{ uri: user.avt }} style={styles.avt} />
                        <Text style={styles.nameText}>{user.name}</Text>

                        <View style={styles.updateInfoContainer}>
                            <TouchableOpacity
                                onPress={navigateToUpdateInfoScreen}
                            >
                                <Text style={{ fontSize: 15 }}>
                                    Cập nhật thông tin
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View
                            style={[
                                styles.updateInfoContainer,
                                { marginTop: 15 },
                            ]}
                            onPress={navigateToUpdateInfoScreen}
                        >
                            <TouchableOpacity>
                                <Text
                                    style={{ fontSize: 15, fontWeight: 'bold' }}
                                >
                                    Danh sách yêu thích
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[styles.pointContainer, { marginBottom: 5 }]}>
                        <View style={[styles.totalPoint, { marginTop: 15 }]}>
                            {pointLoading ? (
                                <ActivityIndicator size='small' color='#ccc' />
                            ) : (
                                <Text style={styles.totalPointText}>
                                    Bạn có{' '}
                                    {orderPoint + donationPoint + eventPoint}{' '}
                                    điểm thiện nguyện
                                </Text>
                            )}
                        </View>
                        <View style={styles.detailPointContainer}>
                            <TouchableOpacity
                                style={styles.orderPoint}
                                onPress={navigateToMyOrdersScreen}
                            >
                                <Text style={styles.pointText}>
                                    {orderPoint}
                                </Text>
                                <Text style={styles.pointText}>Mua sách</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.orderPoint}
                                onPress={() =>
                                    navigation.navigate('MyDonationsScreen')
                                }
                            >
                                <Text style={styles.pointText}>
                                    {donationPoint}
                                </Text>
                                <Text style={styles.pointText}>Quyên góp</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.orderPoint}
                                onPress={() =>
                                    navigation.navigate('MyEventsScreen')
                                }
                            >
                                <Text style={styles.pointText}>
                                    {eventPoint}
                                </Text>
                                <Text style={styles.pointText}>
                                    Tình nguyện
                                </Text>
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
                            <Text style={styles.donationText}>
                                Gửi quyên góp
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
                        style={[styles.donationContainer]}
                        onPress={navigateToAllOrdersScreen}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Text style={styles.donationText}>
                                Quản lý đơn đặt sách
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
                    <View
                        style={{
                            backgroundColor: '#fff',
                            marginTop: 15,
                            marginBottom: 5,
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
                            Mục khác
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={[styles.donationContainer]}
                        onPress={navigateToAllOrdersScreen}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Text style={styles.donationText}>
                                Báo cáo tài chính
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
                                Báo lỗi ứng dụng
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
                    <View style={{ marginBottom: 35 }}>
                        <Button title='Đăng xuất' onPress={handleLogout} />
                    </View>
                </ScrollView>
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
        fontSize: 21,
        fontWeight: 'bold',
    },

    donationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        marginBottom: 5,
    },

    donationText: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        fontSize: 17,
        color: '#383838',
        fontWeight: 'bold',
    },

    pointText: {
        fontSize: 15,
    },
});
