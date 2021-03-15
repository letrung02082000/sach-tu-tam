import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import CategoryList from './CategoryList';
import BestSellerList from './BestSellerList';

// const DATA = [
//     {
//         id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//         title: 'First Item',
//     },
//     {
//         id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
//         title: 'Second Item',
//     },
//     {
//         id: '58694a0f-3da1-471f-bd96-145571e29d72',
//         title: 'Third Item',
//     },
// ];

export default function Header() {
    const navigation = useNavigation();

    const navigateToDetail = () => {
        navigation.navigate('DetailScreen', { book: { name: 'a' } });
    };

    const navigateToAllCategoriesScreen = () => {
        navigation.navigate('AllCategoriesScreen');
    };

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={navigateToDetail}>
                <View>
                    <Text>{item.title}</Text>
                </View>
            </TouchableOpacity>
        );
    };
    return (
        <View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                <Text>Danh mục nổi bật</Text>
                <TouchableOpacity onPress={navigateToAllCategoriesScreen}>
                    <Text>Xem tất cả</Text>
                </TouchableOpacity>
            </View>
            <CategoryList />
            <Text>Được yêu thích</Text>
            <BestSellerList />
            <Text>Được đọc nhiều</Text>
            <BestSellerList />
            <Text>Tất cả sách</Text>
        </View>
    );
}
