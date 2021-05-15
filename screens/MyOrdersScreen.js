import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { userApi } from '../api';

function MyOrdersScreen() {
    const [myOrders, setMyOrders] = useState([]);

    useEffect(() => {
        userApi.getAllOrders().then((res) => {
            if (res.type == 'Valid') {
                setMyOrders(res.data);
            }
        });
    }, []);

    const renderItem = ({ item }) => {
        console.log(item);
        return (
            <View>
                <Text>
                    Mã đơn sách: {item.orderId} + {item.point}
                </Text>
            </View>
        );
    };

    return (
        <View>
            <FlatList
                data={myOrders}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
            />
        </View>
    );
}

export default MyOrdersScreen;
