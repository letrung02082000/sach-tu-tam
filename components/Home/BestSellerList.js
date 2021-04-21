import React from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useSelector } from 'react-redux';

import BookItem from './BookItem';

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
                style={{ width: (window.width * 7) / 16 }}
            />
        );
    };

    return (
        <View>
            <FlatList
                data={data}
                horizontal={true}
                keyExtractor={(item) => item._id.toString()}
                renderItem={renderItem}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
}

export default BestSellerList;
