import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { userApi } from '../api';
import OrderItem from '../components/PendingOrdersScreen/OrderItem';

function MyOrdersScreen() {
    const [myOrders, setMyOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        userApi.getConfirmedOrders().then((res) => {
            if (res.type == 'Valid') {
                setMyOrders(res.data);
            }
            setLoading(false);
        });
    }, []);

    const renderItem = ({ item }) => {
        return <OrderItem order={item} />;
    };

    if (loading)
        return (
            <View
                style={{
                    flex: 1,
                    paddingTop: 25,
                    alignItems: 'center',
                    backgroundColor: '#fff',
                }}
            >
                <Text>Đang tải dữ liệu...</Text>
            </View>
        );

    if (myOrders.length <= 0) {
        return (
            <View
                style={{
                    flex: 1,
                    paddingTop: 25,
                    alignItems: 'center',
                    backgroundColor: '#fff',
                }}
            >
                <Text>Không có dữ liệu</Text>
            </View>
        );
    }

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
