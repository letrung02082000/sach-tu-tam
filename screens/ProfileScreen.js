import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';

import { useDispatch, useSelector } from 'react-redux';
import { userApi } from '../api';
import { eventActions, userActions } from '../redux/actions';
import { postActions } from '../redux/actions/post.actions';

export default function ProfileScreen({ navigation }) {
    const [orderPoint, setOrderPoint] = useState(0);
    const [donationPoint, setDonationPoint] = useState(0);
    const [eventPoint, setEventPoint] = useState(0);
    const [pointLoading, setPointLoading] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);

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
                    }
                }

                setEventPoint(point);
            } else {
                setEventPoint(0);
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
            } else {
                setEventPoint(0);
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
            } else {
                setEventPoint(0);
            }
            setPointLoading(false);
        });
    }, [user.isLoggedIn]);

    const onRefresh = () => {
        setRefreshing(true);
        setPointLoading(true);
        userApi.getAllEvents().then((res) => {
            if (res.type == 'Valid') {
                let point = 0;

                for (let event of res.data) {
                    if (event.joined) {
                        point += event.eventId.point;
                    }
                }

                setEventPoint(point);
            } else {
                setEventPoint(0);
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
            } else {
                setOrderPoint(0);
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
            } else {
                setDonationPoint(0);
            }
            setPointLoading(false);
        });

        setRefreshing(false);
    };

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

    const navigateToBugReportScreen = () => {
        navigation.navigate('BugReportScreen');
    };

    const navigateToAllOrdersScreen = () => {
        navigation.navigate('AllOrdersScreen');
    };

    const navigateToCartScreen = () => {
        navigation.navigate('CartScreen');
    };

    const navigateToScanScreen = () => {
        navigation.navigate('ScanScreen');
    };

    const handleLogin = () => {
        navigation.navigate('SignInScreen');
    };

    const handleLogout = () => {
        dispatch(userActions.logout());
        dispatch(postActions.refreshingAction());
        dispatch(postActions.getAllPostsAction(1, 10));
        dispatch(eventActions.refreshingAction());
        dispatch(eventActions.getAllEventsAction(1, 10));
    };

    if (user.isLoggedIn) {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView
                    style={{ flex: 1 }}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
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

                        {/* <View
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
                        </View> */}
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
                    {/* <TouchableOpacity
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
                    </TouchableOpacity> */}
                    <TouchableOpacity
                        style={[styles.donationContainer, { marginBottom: 9 }]}
                        onPress={navigateToBugReportScreen}
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
                    <View style={{ marginBottom: 35, marginTop: 10 }}>
                        <Button title='Đăng xuất' onPress={handleLogout} />
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <LinearGradient
                    colors={['#009387', '#00edda']}
                    start={{ x: 1.8, y: 0 }}
                    end={{ x: -0.7, y: 0 }}
                    locations={[0.3, 0.8]}
                >
                    <View
                        style={{
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            paddingVertical: 10,
                            flexDirection: 'row',
                        }}
                    >
                        <TouchableOpacity
                            style={{ marginRight: 25 }}
                            onPress={navigateToCartScreen}
                        >
                            <FontAwesome
                                name='shopping-cart'
                                color='#fff'
                                size={25}
                            />
                        </TouchableOpacity>
                    </View>
                    <Text
                        style={{
                            fontSize: 21,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            color: '#fff',
                        }}
                    >
                        Chào mừng bạn đến với Sách Từ Tâm
                    </Text>
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginVertical: 17,
                        }}
                    >
                        <TouchableOpacity onPress={handleLogin}>
                            <Text
                                style={{
                                    paddingVertical: 9,
                                    paddingHorizontal: 15,
                                    borderWidth: 1,
                                    borderColor: '#fff',
                                    borderRadius: 5,
                                    fontSize: 15,
                                    color: '#fff',
                                    fontWeight: 'bold',
                                }}
                            >
                                Đăng nhập/Tạo tài khoản ngay
                            </Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>

                <View style={[styles.pointContainer, { marginBottom: 5 }]}>
                    <View style={[styles.totalPoint, { marginTop: 15 }]}>
                        <Text style={styles.totalPointText}>
                            Đăng nhập ngay để tích luỹ điểm thiện nguyện
                        </Text>
                    </View>
                    <View style={styles.detailPointContainer}>
                        <TouchableOpacity
                            style={styles.orderPoint}
                            onPress={handleLogin}
                        >
                            <Text style={styles.pointText}>0</Text>
                            <Text style={styles.pointText}>Mua sách</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.orderPoint}
                            onPress={handleLogin}
                        >
                            <Text style={styles.pointText}>0</Text>
                            <Text style={styles.pointText}>Quyên góp</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.orderPoint}
                            onPress={handleLogin}
                        >
                            <Text style={styles.pointText}>0</Text>
                            <Text style={styles.pointText}>Tình nguyện</Text>
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
                        <Text style={styles.donationText}>Gửi quyên góp</Text>
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
                    onPress={handleLogin}
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
                {/* <TouchableOpacity
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
                    </TouchableOpacity> */}
                <TouchableOpacity
                    style={[styles.donationContainer, { marginBottom: 9 }]}
                    onPress={navigateToBugReportScreen}
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
        color: '#383838',
        textAlign: 'center',
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
