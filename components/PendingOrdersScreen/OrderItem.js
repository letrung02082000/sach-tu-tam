import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { bookApi } from '../../api';

function OrderItem({ order }) {
    const navigation = useNavigation();
    const firstItem = order.bookList[0].book;
    const otherBooksCount = order.bookList.length - 1;

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
                    marginBottom: 15,
                }}
            >
                <Text style={{ fontSize: 15 }}>
                    Mã đơn sách: {order.orderId}
                </Text>
                <Text style={{ fontSize: 15 }}>+{order.point}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <Image
                    source={{ uri: firstItem.imageurl }}
                    style={{ height: 50, width: 50 }}
                    resizeMode='contain'
                />
                <View style={{ marginLeft: 10 }}>
                    <Text
                        style={{
                            fontSize: 17,
                            fontWeight: 'bold',
                            color: '#383838',
                        }}
                    >
                        {firstItem.name}
                    </Text>
                    {otherBooksCount == 0 ? null : (
                        <Text style={{ fontSize: 15 }}>
                            và {otherBooksCount} quyển sách khác
                        </Text>
                    )}
                </View>
            </View>
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate('DetailOrderScreen', {
                            order,
                        })
                    }
                >
                    <Text
                        style={{
                            paddingVertical: 7,
                            paddingHorizontal: 21,
                            borderWidth: 1,
                            borderRadius: 5,
                            fontSize: 15,
                            color: '#03ada0',
                            borderColor: '#03ada0',
                        }}
                    >
                        Xem chi tiết
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default OrderItem;
