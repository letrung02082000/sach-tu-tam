import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import { userApi } from '../api';
import OrderItem from '../components/PendingOrdersScreen/OrderItem';

function PendingOrdersScreen() {
    const [myOrders, setMyOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        userApi.getPendingOrders().then((res) => {
            if (res.type == 'Valid') {
                setMyOrders(res.data);
                setLoading(false);
            } else {
                Alert.alert('Có lỗi xảy ra. Vui lòng thử lại');
                setLoading(false);
            }
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

export default PendingOrdersScreen;
