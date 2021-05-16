import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { bookApi } from '../../api';

function OrderItem({ order }) {
    console.log(order);
    const firstBook = order.bookList[0];
    const [firstItem, setFirstItem] = useState(false);

    useEffect(() => {
        bookApi.getBookById(firstBook.bookId).then((res) => {
            if (res.type == 'Valid') {
                setFirstItem(res.data);
            }
        });
    });

    return (
        <View
            style={{
                paddingVertical: 15,
                marginTop: 9,
                paddingHorizontal: 15,
                backgroundColor: '#fff',
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                <Text>Mã đơn sách: {order.orderId}</Text>
                <Text>{order.total} VNĐ</Text>
            </View>
            <View>
                <Text>{firstItem.name}</Text>
            </View>
        </View>
    );
}

export default OrderItem;
