import React, { useState, useEffect } from 'react';
import {
    View,
    ScrollView,
    Text,
    Alert,
    TouchableOpacity,
    Image,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { eventApi } from '../api';
import { eventActions } from '../redux/actions';
import convertToDate from '../utils/convertToDate';

function JoinEventScreen({ route, navigation }) {
    const window = Dimensions.get('window');
    const [event, setEvent] = useState(route.params);
    const user = useSelector((state) => state.authReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        eventApi
            .getEventById(route.params._id)
            .then((res) => {
                if (res.type == 'Valid') {
                    setEvent(res.data);
                }
            })
            .catch((error) => console.log(error));
    }, []);

    const handleJoinEvent = () => {
        if (event.registered) {
            // eventApi
            //     .leaveEvent(event._id)
            //     .then((res) => {
            //         if (res.type == 'Valid') {
            //             eventApi
            //                 .getEventById(event._id)
            //                 .then((res) => {
            //                     if (res.type == 'Valid') {
            //                         setEvent(res.data);
            //                     }
            //                 })
            //                 .catch((error) => console.log(error));
            //             Alert.alert('Bạn đã huỷ tham gia hoạt động này!');
            //             dispatch(eventActions.getAllEventsAction(1, 10));
            //         } else {
            //             if (res.err == 'event closed') {
            //                 Alert.alert(
            //                     'Đã hết thời gian mở đăng ký. Nếu bạn muốn huỷ hoạt động, vui lòng liên hệ ban tổ chức.'
            //                 );
            //             }
            //         }
            //     })
            //     .catch((error) => {
            //         console.log(error);
            //         Alert.alert('Có lỗi xảy ra. Vui lòng thử lại!');
            //     });
        } else {
            eventApi
                .joinEvent(event._id)
                .then((res) => {
                    if (res.type == 'Valid') {
                        eventApi
                            .getEventById(event._id)
                            .then((res) => {
                                if (res.type == 'Valid') {
                                    setEvent(res.data);
                                }
                            })
                            .catch((error) => console.log(error));
                        Alert.alert('Đăng ký thành công!');
                        dispatch(eventActions.getAllEventsAction(1, 10));
                    } else {
                        if (res.err == 'event joined') {
                            Alert.alert('Bạn đã tham gia hoạt động này.');
                        } else if (res.err == 'event full') {
                            Alert.alert(
                                'Hoạt động đã đủ số lượng. Hãy tham gia các hoạt động khác.'
                            );
                        } else if (res.err == 'event closed') {
                            Alert.alert(
                                'Đã hết thời gian mở đăng ký. Hãy tham gia các hoạt động khác.'
                            );
                        } else {
                            Alert.alert('Có lỗi xảy ra! Vui lòng thử lại sau.');
                        }
                    }
                })
                .catch((error) => console.log(error));
        }
    };

    if (!user.isLoggedIn)
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                }}
            >
                <Text style={{ fontSize: 17 }}>
                    Vui lòng đăng nhập để đăng ký tham gia
                </Text>
                <TouchableOpacity
                    style={{ marginTop: 15 }}
                    onPress={() => navigation.navigate('SignInScreen')}
                >
                    <Text
                        style={{
                            paddingVertical: 10,
                            paddingHorizontal: 15,
                            borderWidth: 1,
                            borderRadius: 5,
                            fontSize: 17,
                        }}
                    >
                        Đăng nhập ngay
                    </Text>
                </TouchableOpacity>
            </View>
        );

    if (!user.email || !user.tel || !user.name)
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                }}
            >
                <Text style={{ fontSize: 17 }}>
                    Vui lòng cập nhật thông tin liên hệ để tham gia
                </Text>
                <TouchableOpacity
                    style={{ marginTop: 15 }}
                    onPress={() => navigation.navigate('UpdateInfoScreen')}
                >
                    <Text
                        style={{
                            paddingVertical: 10,
                            paddingHorizontal: 15,
                            borderWidth: 1,
                            borderRadius: 5,
                            fontSize: 17,
                        }}
                    >
                        Cập nhật thông tin
                    </Text>
                </TouchableOpacity>
            </View>
        );
    return (
        <View>
            <ScrollView>
                <View
                    style={{
                        backgroundColor: '#fff',
                        padding: 15,
                        borderRadius: 9,
                        margin: 10,
                    }}
                >
                    <Text style={styles.infoText}>Họ tên: {user.name}</Text>
                    <Text style={styles.infoText}>Email: {user.email}</Text>
                    <Text style={styles.infoText}>
                        Điện thoại liên hệ: {user.tel}
                    </Text>
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#32B0EA',
                                padding: 10,
                                borderRadius: 5,
                                marginTop: 15,
                            }}
                            onPress={() =>
                                navigation.navigate('UpdateInfoScreen')
                            }
                        >
                            <Text
                                style={{
                                    fontSize: 17,
                                    fontWeight: 'bold',
                                    color: '#fff',
                                }}
                            >
                                Thay đổi thông tin
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#32C532',
                                padding: 10,
                                borderRadius: 5,
                                marginTop: 15,
                            }}
                            onPress={handleJoinEvent}
                        >
                            <Text
                                style={{
                                    fontSize: 17,
                                    fontWeight: 'bold',
                                    color: '#fff',
                                }}
                            >
                                {event.registered
                                    ? 'Đã đăng ký'
                                    : 'Đăng ký tham gia hoạt động'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View
                    style={{
                        backgroundColor: '#fff',
                        padding: 15,
                        borderRadius: 9,
                        marginHorizontal: 10,
                        marginBottom: 10,
                    }}
                >
                    <Text style={{ textAlign: 'center', fontSize: 21 }}>
                        Thông tin hoạt động
                    </Text>
                    <View style={{ padding: 5, marginVertical: 15 }}>
                        <Image
                            source={{ uri: event.imgurl }}
                            style={{
                                height: window.width / 2,
                                resizeMode: 'contain',
                            }}
                        />
                    </View>
                    <View style={{ padding: 5, marginBottom: 15 }}>
                        <Text style={styles.titleText}>{event.title}</Text>
                    </View>
                    <View style={{ padding: 5, marginBottom: 15 }}>
                        <Text style={styles.contentText}>{event.content}</Text>
                    </View>
                    <View style={{ padding: 5, marginBottom: 15 }}>
                        <Text style={styles.text}>Số lượng: {event.limit}</Text>
                        <Text style={styles.text}>
                            Đã đăng ký: {event.joinnumber}
                        </Text>
                        <Text style={styles.text}>
                            Hạn đăng ký: {convertToDate(event.deadline)}
                        </Text>
                        <Text style={styles.text}>
                            Ngày bắt đầu: {convertToDate(event.startdate)}
                        </Text>
                        <Text style={styles.text}>
                            Ngày kết thúc:&nbsp;
                            {event.finishdate
                                ? convertToDate(event.finishdate)
                                : 'Đang cập nhật'}
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    titleText: {
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'center',
    },
    contentText: {
        fontSize: 17,
        textAlign: 'center',
    },
    text: {
        textAlign: 'center',
        marginBottom: 5,
        fontSize: 15,
    },
    infoText: {
        // textAlign: 'center',
        marginBottom: 10,
        fontSize: 17,
    },

    // deadlineText: {
    //     textAlign: 'center',
    // },
    // limitText: { textAlign: 'center' },
    // joinlistText: { textAlign: 'center' },
    // startdateText: { textAlign: 'center' },
    // finishText: { textAlign: 'center' },
});

export default JoinEventScreen;
