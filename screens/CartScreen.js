import React, { useState, useEffect } from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
    Dimensions,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useSelector, useDispatch } from 'react-redux';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { cartActions } from '../redux/actions/cart.actions';
import { bookApi } from '../api';

const CartItem = ({ book }) => {
    const imageUrl = book.imageurl;
    const quantity = parseInt(book.orderQuantity);

    const dispatch = useDispatch();

    const [msg, setMsg] = useState('');

    useEffect(() => {
        console.log(book.quantity);
        if (book.quantity <= 0) {
            setMsg('Sản phẩm hiện đã hết hàng');
            dispatch(cartActions.updateCartAction(book._id, 0));
        }
    }, []);

    const decreaseQuantity = () => {
        if (quantity <= 1) return;

        if (quantity <= 5) {
            setMsg('');
        }

        dispatch(cartActions.updateCartAction(book._id, quantity - 1));
    };

    const increaseQuantity = () => {
        if (quantity == 0) return;

        if (quantity >= 5) {
            setMsg('Số lượng không được vượt quá 5');
            return;
        }

        if (quantity >= book.quantity) {
            setMsg('Đã đạt số lượng còn lại trong kho');
            return;
        }

        dispatch(cartActions.updateCartAction(book._id, quantity + 1));
    };

    const removeItem = () => {
        dispatch(cartActions.removeFromCartAction(book));
    };

    return (
        <View
            style={{
                flexDirection: 'row',
                height: 125,
                marginTop: 10,
                backgroundColor: '#fff',
                paddingVertical: 9,
            }}
        >
            <Image
                source={{ uri: imageUrl }}
                style={{
                    flex: 2,
                    resizeMode: 'contain',
                }}
            />
            <View
                style={{
                    flex: 5,
                    height: '100%',
                    marginLeft: 9,
                }}
            >
                <Text numberOfLines={2} style={{ fontSize: 15 }}>
                    {book.name}
                </Text>
                <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                    <Text
                        style={{
                            fontSize: 15,
                            color: '#f33f3f',
                            fontWeight: 'bold',
                            marginRight: 9,
                        }}
                    >
                        {book.newprice}đ
                    </Text>
                    <Text
                        style={{
                            color: '#a5a2a2',
                            textDecorationLine: 'line-through',
                            fontSize: 15,
                        }}
                    >
                        {book.oldprice}đ
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={decreaseQuantity}
                        style={{ backgroundColor: '#ccc' }}
                    >
                        <Feather name='minus' size={25} />
                    </TouchableOpacity>
                    <Text
                        style={{
                            width: 50,
                            textAlign: 'center',
                            textAlignVertical: 'center',
                            backgroundColor: '#e8e8e8',
                            height: '100%',
                        }}
                    >
                        {quantity}
                    </Text>
                    <TouchableOpacity
                        onPress={increaseQuantity}
                        style={{ backgroundColor: '#ccc' }}
                    >
                        <Feather name='plus' size={25} />
                    </TouchableOpacity>
                </View>
                <Text>{msg}</Text>
            </View>
            <View
                style={{
                    flex: 1,
                    height: '100%',
                    justifyContent: 'flex-start',
                }}
            >
                <TouchableOpacity onPress={removeItem}>
                    <Feather name='x' size={25} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

function CartScreen({ navigation }) {
    const [loading, setLoading] = useState(false);
    const cart = useSelector((state) => state.cartReducer.data);
    const quantity = useSelector((state) => state.cartReducer.quantity);
    const dispatch = useDispatch();

    const window = Dimensions.get('window');
    console.log('a');

    useEffect(() => {
        dispatch(cartActions.refreshCartAction(cart));
    }, []);

    const orderBooks = async () => {
        setLoading(true);
        for (let book of cart) {
            const response = await bookApi.getBookById(book._id);
            const newBook = response.data;

            if (!newBook.quantity || newBook.quantity <= 0) {
                Alert.alert(
                    `Quyển sách ${newBook.name} hiện đã hết. Vui lòng loại bỏ khỏi giỏ hàng!`
                );
                setLoading(false);
                return;
            }
        }

        setLoading(false);
        navigation.navigate('OrderScreen');
    };

    const navigateToHomeScreen = () => {
        navigation.navigate('HomeScreen');
    };

    const navigateToSearchScreen = () => {
        navigation.navigate('SearchScreen');
    };

    return (
        <View style={{ flex: 1 }}>
            {quantity == 0 ? (
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1,
                    }}
                >
                    <View
                        style={{
                            flex: 2,
                            justifyContent: 'center',
                            alignItems: 'center',
                            //backgroundColor: '#fff',
                        }}
                    >
                        <Image
                            source={require('../assets/emptycart.png')}
                            style={{
                                width: 210,
                                height: 190,
                                resizeMode: 'contain',
                            }}
                        />
                        <Text style={{ fontSize: 15, textAlign: 'center' }}>
                            Giỏ hàng trống
                        </Text>
                    </View>
                    <View
                        style={{
                            flex: 3,
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            //backgroundColor: '#fff',
                            flexDirection: 'row',
                        }}
                    >
                        <TouchableOpacity onPress={navigateToHomeScreen}>
                            <Text
                                style={{
                                    backgroundColor: '#009387',
                                    fontSize: 17,
                                    padding: 10,
                                    color: '#fff',
                                    borderRadius: 5,
                                    fontWeight: 'bold',
                                    width: 110,
                                    textAlign: 'center',
                                }}
                            >
                                Quay lại
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={navigateToSearchScreen}
                            style={{
                                backgroundColor: '#009387',
                                marginLeft: 15,
                                borderRadius: 5,
                                width: 130,
                                padding: 10,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignContent: 'center',
                            }}
                        >
                            <FontAwesome
                                name='search'
                                size={15}
                                style={{
                                    // backgroundColor: '#fff',
                                    marginRight: 7,
                                    color: '#fff',
                                    marginTop: 4,
                                }}
                            />
                            <Text
                                style={{
                                    fontSize: 17,
                                    padding: 0,
                                    margin: 0,
                                    color: '#fff',
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                }}
                            >
                                Tìm kiếm
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <View style={{ flex: 1 }}>
                    <View>
                        {cart.map((item) => {
                            return <CartItem key={item._id} book={item} />;
                        })}
                    </View>
                    {loading ? (
                        <View
                            style={[
                                styles.orderButtonContainer,
                                { width: '100%' },
                            ]}
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
                                    margin: 10,
                                }}
                            >
                                Vui lòng chờ...
                            </Text>
                        </View>
                    ) : (
                        <View
                            style={[
                                styles.orderButtonContainer,
                                { width: '100%' },
                            ]}
                        >
                            <TouchableOpacity onPress={orderBooks}>
                                <Text
                                    style={{
                                        fontWeight: '500',
                                        color: '#fff',
                                        backgroundColor: '#f33f3f',
                                        fontSize: 21,
                                        padding: 7,
                                        textAlign: 'center',
                                        borderRadius: 5,
                                        margin: 10,
                                    }}
                                >
                                    Tiến Hành Đặt Sách
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    orderButtonContainer: {
        position: 'absolute',
        backgroundColor: '#fff',
        bottom: 0,
    },
});

export default CartScreen;
