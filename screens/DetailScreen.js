import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Button,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Modal from 'react-native-modal';
import Feather from 'react-native-vector-icons/Feather';

import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../redux/actions';

const domainUrl = 'https://sach-tu-tam.herokuapp.com';

export default function DetailScreen({ route, navigation }) {
    const [imgWidth, setImgWidth] = useState(0);
    const [imgHeight, setImgHeight] = useState(0);
    const [msg, setMsg] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);

    const book = route.params.book;
    const imgUrl = `${domainUrl}/${book.imageurl}`;

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
    const cart = useSelector((state) => state.cartReducer);

    const handleBuyBook = () => {
        if (book.quantity <= 0) {
            setMsg('Không đủ sách trong kho');
            setModalVisible(true);
            return;
        }
        for (var item of cart) {
            if (item._id.toString() == book._id.toString()) {
                setMsg('Bạn đã thêm quyển sách này vào giỏ hàng rồi');
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

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Modal
                    isVisible={modalVisible}
                    onSwipeComplete={() => setModalVisible(false)}
                    swipeDirection={['down']}
                    style={styles.modalContainer}
                >
                    <View style={styles.modalViewContainer}>
                        <TouchableOpacity
                            style={styles.closeModal}
                            onPress={() => setModalVisible(false)}
                        >
                            <Feather
                                name='x'
                                size={21}
                                color='#000'
                                style={{ padding: 5 }}
                            />
                        </TouchableOpacity>
                        <Text style={styles.modalMsg}>{msg}</Text>

                        <TouchableOpacity
                            style={styles.goToCartBtn}
                            onPress={navigateToCart}
                        >
                            <Text style={styles.goToCartText}>
                                Xem Giỏ Hàng
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <ScrollView>
                    <Image
                        style={{
                            width: imgWidth,
                            height: imgHeight,
                            resizeMode: 'cover',
                        }}
                        source={{
                            uri: imgUrl,
                        }}
                    />
                    <Text>{book.name}</Text>
                    <Text>{book.description}</Text>
                </ScrollView>
                <TouchableOpacity
                    style={styles.positionInBottom}
                    onPress={handleBuyBook}
                >
                    <Text>Mua sách</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        minHeight: Dimensions.get('window').height - 70,
    },

    positionInBottom: {
        position: 'absolute',
        flex: 1,
        flexDirection: 'row',
        width: Dimensions.get('window').width,
        height: 70,
        bottom: 0,
        backgroundColor: 'red',
        zIndex: 100,
    },

    modalContainer: {
        justifyContent: 'flex-end',
        margin: 0,
    },

    modalViewContainer: {
        height: 210,
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
    },

    goToCartBtn: {
        height: 50,
    },

    goToCartText: {
        fontWeight: '500',
        color: '#fff',
        backgroundColor: 'red',
        fontSize: 21,
        padding: 7,
        textAlign: 'center',
        //borderRadius: 5,
    },

    modalMsg: {
        textAlign: 'center',
        fontSize: 15,
    },
});
