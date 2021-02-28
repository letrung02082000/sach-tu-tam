import React from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useSelector } from 'react-redux';

import BookItem from './BookItem';

const DATA = [
    { id: 1, name: 'Cay cam ngot cua toi', price: 5000 },
    { id: 2, name: 'Vui ve khong quau nha', price: 5000 },
    { id: 3, name: 'Con chim xanh biec bay ve', price: 5000 },
];

function BestSellerList() {
    const navigation = useNavigation();
    const window = Dimensions.get('window');

    const data = useSelector((state) => state.bestsellerReducer.data);

    const renderItem = ({ item }) => {
        return (
            <BookItem
                item={item}
                onPress={() =>
                    navigation.navigate('DetailScreen', { book: item })
                }
                style={{ width: window.width / 2 }}
            />
        );
    };

    return (
        <View style={{ height: 250 }}>
            <FlatList
                data={data}
                horizontal={true}
                keyExtractor={(item) => item._id.toString()}
                renderItem={renderItem}
            />
        </View>
    );
}

export default BestSellerList;
