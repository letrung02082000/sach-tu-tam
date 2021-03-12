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
    const imageUrl = `https://sach-tu-tam.herokuapp.com/${book.imageurl}`;

    const dispatch = useDispatch();

    const [quantity, setQuantity] = useState(1);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        if (book.quantity == 0) {
            setMsg('Sản phẩm hiện đã hết hàng.');
            setQuantity(0);
        }
    });

    const decreaseQuantity = () => {
        if (quantity <= 1) return;

        if (quantity <= 5) {
            setMsg('');
        }

        setQuantity(quantity - 1);
    };

    const increaseQuantity = () => {
        if (quantity == 0) return;

        if (quantity >= 5) {
            setMsg('Số lượng không được vượt quá 5.');
            setQuantity(5);
            return;
        }

        if (quantity >= book.quantity) {
            setMsg('Đã đạt số lượng còn lại trong kho.');
            setQuantity(book.quantity);
            return;
        }
        setQuantity(quantity + 1);
    };

    const removeItem = () => {
        dispatch(cartActions.removeFromCartAction(book));
    };

    return (
        <View style={{ flexDirection: 'row', height: 100 }}>
            <Image
                source={{ uri: imageUrl }}
                style={{
                    flex: 2,
                    resizeMode: 'cover',
                }}
            />
            <View
                style={{
                    flex: 5,
                    height: '100%',
                }}
            >
                <Text numberOfLines={2}>{book.name}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={decreaseQuantity}>
                        <Feather name='minus' size={25} />
                    </TouchableOpacity>
                    <Text style={{ width: 50, textAlign: 'center' }}>
                        {quantity}
                    </Text>
                    <TouchableOpacity onPress={increaseQuantity}>
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

    return (
        <View style={{ flex: 1 }}>
            {quantity == 0 ? (
                <View>
                    <Text>Giỏ hàng trống</Text>
                    <TouchableOpacity onPress={navigateToHomeScreen}>
                        <Text>Quay lại trang chủ</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={{ flex: 1 }}>
                    <View>
                        {cart.map((item) => (
                            <CartItem key={item._id} book={item} />
                        ))}
                    </View>
                    {loading ? (
                        <View
                            style={[
                                styles.orderButtonContainer,
                                { width: '100%' },
                            ]}
                        >
                            <ActivityIndicator size='small' color='white' />
                        </View>
                    ) : (
                        <View
                            style={[
                                styles.orderButtonContainer,
                                { width: '100%' },
                            ]}
                        >
                            <TouchableOpacity
                                onPress={orderBooks}
                                style={{ width: '100%', height: '100%' }}
                            >
                                <Text>Tiến Hành Đặt Sách</Text>
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
        backgroundColor: 'red',
        bottom: 0,
        height: 50,
    },
});

export default CartScreen;
