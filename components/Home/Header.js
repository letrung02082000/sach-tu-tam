import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import CategoryList from './CategoryList';
import BestSellerList from './BestSellerList';
import FavoriteList from './FavoriteList';

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
            <View style={styles.categoryContainer}>
                <View
                    style={{
                        backgroundColor: '#fff',
                        borderRadius: 5,
                        marginTop: 7,
                        marginHorizontal: 5,
                        paddingBottom: 10,
                    }}
                >
                    <View style={styles.categoryHeader}>
                        <Text style={styles.headerText}>Danh mục nổi bật</Text>
                        <TouchableOpacity
                            onPress={navigateToAllCategoriesScreen}
                        >
                            <Text
                                style={{
                                    textTransform: 'uppercase',
                                    color: '#003399',
                                    fontWeight: 'bold',
                                    marginRight: 5,
                                }}
                            >
                                Tất cả
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <CategoryList />
                </View>
            </View>
            <View style={styles.categoryContainer}>
                <View
                    style={{
                        backgroundColor: '#fff',
                        borderRadius: 5,
                        marginTop: 7,
                        marginHorizontal: 5,
                        paddingBottom: 10,
                    }}
                >
                    <Text
                        style={[
                            styles.headerText,
                            { paddingVertical: 15, paddingHorizontal: 10 },
                        ]}
                    >
                        Được Yêu Thích
                    </Text>
                    <FavoriteList />
                </View>
            </View>
            <View style={styles.categoryContainer}>
                <View
                    style={{
                        backgroundColor: '#fff',
                        borderRadius: 5,
                        marginVertical: 7,
                        marginHorizontal: 5,
                        paddingBottom: 10,
                    }}
                >
                    <Text
                        style={[
                            styles.headerText,
                            { paddingVertical: 15, paddingHorizontal: 10 },
                        ]}
                    >
                        Được Đọc Nhiều
                    </Text>
                    <BestSellerList />
                </View>
            </View>
            <View style={styles.allBookHeader}>
                <Text
                    style={[
                        styles.headerText,
                        { paddingVertical: 15, paddingHorizontal: 10 },
                    ]}
                >
                    Tất Cả Sách
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    categoryContainer: {
        backgroundColor: '#ccc',
    },

    categoryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 9,
        paddingVertical: 15,
    },

    headerText: { fontSize: 17, fontWeight: 'bold' },

    allBookHeader: {
        marginHorizontal: 10,
        marginTop: 10,
        backgroundColor: '#fff',
    },
});
