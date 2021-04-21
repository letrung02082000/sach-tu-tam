import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Modal from 'react-native-modal';
import { DataTable } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../redux/actions';
import { postApi } from '../api';

export default function DetailScreen({ route, navigation }) {
    const [imgWidth, setImgWidth] = useState(0);
    const [imgHeight, setImgHeight] = useState(0);
    const [msg, setMsg] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [reviewsList, setReviewsList] = useState([]);

    const book = route.params.book;
    const imgUrl = book.imageurl;

    if (!book.quantity) {
        book.quantity = 0;
    }

    console.log(book);
    Image.getSize(imgUrl, (width, height) => {
        const screenWidth = Dimensions.get('window').width;
        const scaleFactor = width / screenWidth;
        const imageHeight = height / scaleFactor;
        setImgHeight(imageHeight);
        setImgWidth(screenWidth);
    });

    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cartReducer.data);
    const user = useSelector((state) => state.authReducer);

    useEffect(() => {
        postApi
            .getPostsByBookId(1, 10, book._id)
            .then((res) => {
                if (res.type == 'Valid') {
                    setReviewsList(res.data);
                } else {
                    console.log(res.err);
                }
            })
            .catch((error) => console.log(error));
    }, [book.loadReview]);

    const handleBuyBook = () => {
        if (book.quantity <= 0) {
            setMsg('Không đủ sách trong kho');
            setModalVisible(true);
            return;
        }
        for (var item of cart) {
            if (item._id.toString() == book._id.toString()) {
                setMsg('Sách đã có trong giỏ hàng');
                setModalVisible(true);
                return;
            }
        }

        dispatch(cartActions.addToCartAction(book));
        setMsg('Đã thêm sách vào giỏ hàng');
        setModalVisible(true);
    };

    const navigateToCart = () => {
        setModalVisible(false);
        navigation.navigate('CartScreen');
    };

    const readMore = () => {
        navigation.navigate('DescriptionScreen', book);
    };

    const backToHome = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        }
    };

    const navigateToReviewScreen = () => {
        if (!user.isLoggedIn) return navigation.navigate('SignInScreen');
        navigation.navigate('ReviewScreen', book);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Modal
                isVisible={modalVisible}
                onSwipeComplete={() => setModalVisible(false)}
                swipeDirection={['down']}
                style={styles.modalContainer}
            >
                <View style={styles.modalViewContainer}>
                    <View style={styles.modalHeader}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginLeft: 10,
                            }}
                        >
                            <Feather
                                name='check-circle'
                                color='#006600'
                                size={15}
                            />
                            <Text style={styles.modalMsg}>{msg}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.closeModal}
                            onPress={() => setModalVisible(false)}
                        >
                            <Feather
                                name='x'
                                size={17}
                                color='#000'
                                style={{ padding: 5 }}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Image
                            style={{
                                height: 100,
                                width: 70,
                                resizeMode: 'contain',
                            }}
                            source={{ uri: imgUrl }}
                        />
                        <View
                            style={{
                                justifyContent: 'flex-start',
                                flex: 1,
                                padding: 5,
                            }}
                        >
                            <Text numberOfLines={2} fontSize={15}>
                                {book.name}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 17,
                                    fontWeight: 'bold',
                                }}
                            >
                                {book.newprice}&nbsp;
                                <Text
                                    style={{
                                        textDecorationLine: 'underline',
                                    }}
                                >
                                    đ
                                </Text>
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.goToCartBtn}
                        onPress={navigateToCart}
                    >
                        <Text style={styles.goToCartText}>Xem Giỏ Hàng</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <View style={{ flex: 1 }}>
                <View style={{ backgroundColor: 'transparent', height: 50 }}>
                    <TouchableOpacity
                        style={{ marginLeft: 10, marginTop: 11 }}
                        onPress={backToHome}
                    >
                        <MaterialCommunityIcons
                            name='arrow-left'
                            color='#000'
                            size={30}
                        />
                    </TouchableOpacity>
                </View>
                <ScrollView style={{ flex: 1 }}>
                    <View
                        style={{
                            backgroundColor: '#f5f5f5',
                        }}
                    >
                        <Image
                            style={{
                                width: '100%',
                                height: 350,
                                resizeMode: 'contain',
                            }}
                            source={{
                                uri: imgUrl,
                            }}
                        />
                    </View>
                    <View
                        style={{
                            backgroundColor: '#fff',
                            paddingVertical: 15,
                            paddingHorizontal: 15,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 17,
                                //fontWeight: 'bold',
                                marginBottom: 15,
                            }}
                        >
                            {book.name}
                        </Text>
                        <Text
                            style={{
                                fontSize: 17,
                                color: '#4d4d4d',
                                marginBottom: 9,
                            }}
                        >
                            <Text style={{ fontWeight: 'bold' }}>
                                Giá bìa:&nbsp;
                            </Text>
                            <Text
                                style={{
                                    textDecorationLine: 'line-through',
                                }}
                            >
                                {book.oldprice}&nbsp;đ
                            </Text>
                        </Text>
                        <Text
                            style={{
                                fontSize: 23,
                                fontWeight: 'bold',
                                color: '#4d4d4d',
                                marginBottom: 9,
                            }}
                        >
                            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
                                Giá bán:&nbsp;
                            </Text>
                            {book.newprice}&nbsp;
                            <Text
                                style={{
                                    textDecorationLine: 'underline',
                                }}
                            >
                                đ
                            </Text>
                        </Text>
                        <Text
                            style={{
                                fontSize: 23,
                                fontWeight: 'bold',
                                color: '#4d4d4d',
                            }}
                        >
                            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
                                Tủ sách/Điểm đọc:&nbsp;
                            </Text>
                        </Text>
                    </View>
                    <View style={{ backgroundColor: '#fff', marginTop: 9 }}>
                        <Text
                            style={{
                                fontSize: 17,
                                fontWeight: 'bold',
                                paddingVertical: 10,
                                paddingHorizontal: 10,
                                color: '#4d4d4d',
                            }}
                        >
                            Mô tả sách
                        </Text>
                        <Text
                            style={{
                                fontSize: 15,
                                lineHeight: 21,
                                paddingHorizontal: 19,
                                paddingBottom: 10,
                            }}
                            numberOfLines={10}
                        >
                            {book.description}
                        </Text>
                        <TouchableOpacity
                            style={{ paddingVertical: 10 }}
                            onPress={readMore}
                        >
                            <Text
                                style={{
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    color: '#0050a6',
                                }}
                            >
                                Đọc tiếp >
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            backgroundColor: '#fff',
                            marginTop: 9,
                            marginBottom: 15,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 17,
                                fontWeight: 'bold',
                                paddingVertical: 10,
                                paddingHorizontal: 10,
                                color: '#4d4d4d',
                            }}
                        >
                            Thông tin chi tiết
                        </Text>
                        {book.others && (
                            <DataTable>
                                {book.others.map((item, index) => {
                                    return (
                                        <DataTable.Row key={index.toString()}>
                                            <DataTable.Cell>
                                                {item['key']}
                                            </DataTable.Cell>
                                            <DataTable.Cell>
                                                {item['value']}
                                            </DataTable.Cell>
                                        </DataTable.Row>
                                    );
                                })}
                            </DataTable>
                        )}
                    </View>
                    <View>
                        <View
                            style={{
                                backgroundColor: '#fff',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    marginVertical: 15,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                onPress={navigateToReviewScreen}
                            >
                                <Text
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        padding: 9,
                                        borderRadius: 5,
                                        borderWidth: 2,
                                        fontSize: 17,
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        color: '#03ada0',
                                        borderColor: '#03ada0',
                                    }}
                                >
                                    <SimpleLineIcons
                                        name='note'
                                        color='#03ada0'
                                        size={17}
                                        style={{ marginRight: 15 }}
                                    />
                                    &nbsp;&nbsp;Viết Review
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {reviewsList.map((child, index) => {
                            return (
                                <View
                                    key={child._id}
                                    style={{
                                        height: 150,
                                        backgroundColor: '#fff',
                                    }}
                                >
                                    <Text>{child.user.username}</Text>
                                    <Text numberOfLines={5}>
                                        {child.content}
                                    </Text>
                                    <TouchableOpacity>
                                        <Text>Đọc tiếp</Text>
                                    </TouchableOpacity>
                                </View>
                            );
                        })}
                    </View>
                </ScrollView>
                {/* <View style={{ flex: 1 }}>
                    <TouchableOpacity
                        //style={styles.positionInBottom}
                        onPress={handleBuyBook}
                    >
                        <Text>Mua sách</Text>
                    </TouchableOpacity>
                </View> */}
                <TouchableOpacity
                    style={{ height: 50, marginHorizontal: 5 }}
                    onPress={handleBuyBook}
                >
                    <Text style={styles.goToCartText}>Mua sách</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    // container: {
    //     minHeight: Dimensions.get('window').height - 70,
    // },

    header: {
        //height: 50,
        flex: 1,
    },

    // positionInBottom: {
    //     position: 'absolute',
    //     flex: 1,
    //     flexDirection: 'row',
    //     width: Dimensions.get('window').width,
    //     height: 50,
    //     bottom: 39,
    //     backgroundColor: 'red',
    //     zIndex: 100,
    // },

    modalContainer: {
        justifyContent: 'flex-end',
        margin: 0,
    },

    modalViewContainer: {
        height: 270,
        backgroundColor: '#fff',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingTop: 10,
        paddingHorizontal: 10,
        justifyContent: 'space-between',
    },

    closeModal: {
        height: 30,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },

    goToCartBtn: {
        height: 50,
    },

    goToCartText: {
        fontWeight: '500',
        color: '#fff',
        backgroundColor: '#f33f3f',
        fontSize: 17,
        padding: 10,
        textAlign: 'center',
        borderRadius: 5,
    },

    modalMsg: {
        textAlign: 'center',
        fontSize: 15,
        marginLeft: 7,
        color: '#006600',
    },

    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});
