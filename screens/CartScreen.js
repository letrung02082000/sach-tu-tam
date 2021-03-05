import React, { useState, useEffect } from 'react';
import { View, Image, FlatList, Text, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useSelector, useDispatch } from 'react-redux';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { cartActions } from '../redux/actions/cart.actions';
import { cartConstants } from '../redux/constants';

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

function CartScreen() {
    const cart = useSelector((state) => state.cartReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(cartActions.refreshCartAction(cart));
    }, []);

    return (
        <View>
            {cart.map((item) => (
                <CartItem key={item._id} book={item} />
            ))}
        </View>
    );
}

export default CartScreen;
