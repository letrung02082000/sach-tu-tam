import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
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
import ReviewPost from '../components/DetailScreen/ReviewPost';

export default function DetailScreen({ route, navigation }) {
    const [imgWidth, setImgWidth] = useState(0);
    const [imgHeight, setImgHeight] = useState(0);
    const [msg, setMsg] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [reviewsList, setReviewsList] = useState([]);
    const [reviewLoading, setReviewLoading] = useState(true);

    const book = route.params.book;
    const imgUrl = book.imageurl;

    if (!book.quantity) {
        book.quantity = 0;
    }

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
            .getPostsByBookId(1, 5, book._id)
            .then((res) => {
                if (res.type == 'Valid') {
                    setReviewsList(res.data);
                } else {
                    console.log(res.err);
                }
            })
            .catch((error) => console.log(error));
        setReviewLoading(false);
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
                        <View style={styles.msgContainer}>
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

                    <View style={styles.imgContainer}>
                        <Image
                            style={styles.bookImage}
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
                                marginVertical: 10,
                            }}
                        >
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    color: '#303030',
                                    marginTop: 15,
                                    fontSize: 17,
                                }}
                            >
                                Bạn đã đọc cuốn sách này chưa?
                            </Text>
                            <TouchableOpacity
                                style={styles.reviewButton}
                                onPress={navigateToReviewScreen}
                            >
                                <Text style={styles.reviewText}>
                                    <SimpleLineIcons
                                        name='note'
                                        color='#fff'
                                        size={17}
                                        style={{ marginRight: 15 }}
                                    />
                                    &nbsp;&nbsp;Viết Review ngay
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {reviewLoading ? (
                            <View style={styles.reviewLoading}>
                                <ActivityIndicator size='large' color='#ccc' />
                                <Text style={styles.loadingText}>
                                    Đang tải đánh giá...
                                </Text>
                            </View>
                        ) : null}
                        {reviewsList.map((child, index) => {
                            return <ReviewPost post={child} />;
                        })}

                        <TouchableOpacity
                            style={{
                                paddingVertical: 15,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 5,
                                borderWidth: 2,
                                borderColor: '#03ada0',
                                marginTop: 5,
                                marginBottom: 15,
                                marginHorizontal: 15,
                                backgroundColor: '#fff',
                            }}
                            onPress={() =>
                                navigation.navigate('AllBookReviewsScreen', {
                                    book: book,
                                })
                            }
                        >
                            <Text
                                style={{
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                    color: '#03ada0',
                                }}
                            >
                                Xem tất cả đánh giá
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <TouchableOpacity
                    style={styles.buyButton}
                    onPress={handleBuyBook}
                >
                    <Text style={styles.goToCartText}>Mua sách</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        //height: 50,
        flex: 1,
    },

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

    msgContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
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

    bookImage: {
        height: 100,
        width: 70,
        resizeMode: 'contain',
    },

    buyButton: { height: 50, marginHorizontal: 5 },

    reviewText: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 9,
        borderRadius: 5,
        borderWidth: 2,
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
        borderColor: '#03ada0',
        backgroundColor: '#03ada0',
    },

    reviewButton: {
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 21,
    },

    reviewLoading: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingTop: 50,
        paddingBottom: 100,
    },

    loadingText: {
        marginTop: 5,
        fontSize: 17,
    },

    imgContainer: { flexDirection: 'row' },
});
