import React, { useState, useEffect } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    Dimensions,
    TouchableWithoutFeedback,
    FlatList,
    RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { useDispatch, useSelector } from 'react-redux';
import { bookActions } from '../redux/actions/book.actions';
import { bestsellerActions } from '../redux/actions/bestseller.actions';
import { categoryActions } from '../redux/actions/category.actions';

import Header from '../components/Home/Header';
import BookItem from '../components/Home/BookItem';
import { favoriteActions } from '../redux/actions/favorite.actions';

import authHeader from '../utils/authHeader';

// const domainUrl = 'https://sach-tu-tam.herokuapp.com';

// const Item = ({ item, onPress, style }) => {
//     const imgUrl = `${domainUrl}/${item.imageurl}`;
//     return (
//         <TouchableOpacity onPress={onPress}>
//             <View style={[styles.item, style]}>
//                 <Image
//                     style={{
//                         width: '100%',
//                         height: 210,
//                         resizeMode: 'cover',
//                     }}
//                     source={{
//                         uri: imgUrl,
//                     }}
//                 />
//                 <Text style={styles.title}>{item.name}</Text>
//             </View>
//         </TouchableOpacity>
//     );
// };

export default function HomeScreen({ navigation }) {
    const window = Dimensions.get('window');

    const dispatch = useDispatch();

    const allBooks = useSelector((state) => state.bookReducer);
    const currentPage = useSelector((state) => state.bookReducer.currentPage);
    const endOfList = useSelector((state) => state.bookReducer.endOfList);

    const renderFooter = () => {
        if (endOfList) return null;
        return (
            <View
                style={{
                    height: 150,
                    width: window.width,
                }}
            >
                <ActivityIndicator size='small' color='#0000ff' />
            </View>
        );
    };

    const bookPerPage = 10;

    const handleLoadMore = () => {
        dispatch(bookActions.loadMoreAction(currentPage + 1, bookPerPage));
    };

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

    useEffect(() => {
        dispatch(bookActions.getAllBooksAction(currentPage, bookPerPage));
        dispatch(bestsellerActions.getBestseller());
        dispatch(favoriteActions.getFavorite());
        dispatch(categoryActions.getAllCategoriesAction());
    }, []);

    // if (allBooks.isFetching) {
    //     return (
    //         <SafeAreaView>
    //             <View>
    //                 <Text>is fetching...</Text>
    //             </View>
    //         </SafeAreaView>
    //     );
    // }

    const onRefresh = () => {
        dispatch(bookActions.refreshingAction());
        dispatch(bookActions.getAllBooksAction(1, 10));
        dispatch(bestsellerActions.getBestseller());
        dispatch(favoriteActions.getFavorite());
        dispatch(categoryActions.getAllCategoriesAction());
    };

    const navigateToSearchScreen = () => navigation.navigate('SearchScreen');
    const navigateToCartScreen = () => navigation.navigate('CartScreen');

    return (
        <SafeAreaView>
            <View>
                <View style={styles.headerContainer}>
                    <View style={{ flex: 2 }}>
                        <TouchableWithoutFeedback
                            delayPressIn={0}
                            onPress={navigateToSearchScreen}
                        >
                            <View
                                style={{
                                    flexDirection: 'row',
                                    backgroundColor: '#fff',
                                    color: '#ccc',
                                    height: 39,
                                    borderRadius: 3,
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    paddingHorizontal: 15,
                                    marginHorizontal: 7,
                                }}
                            >
                                <FontAwesome name='search' size={15} />
                                <Text style={{ marginLeft: 10, fontSize: 15 }}>
                                    Bạn cần tìm sách gì?
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            flex: 1,
                            justifyContent: 'flex-end',
                            width: 100,
                        }}
                    >
                        <TouchableOpacity>
                            <FontAwesome5 name='bell' color='#fff' size={25} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ marginHorizontal: 25 }}
                            onPress={navigateToCartScreen}
                        >
                            <FontAwesome
                                name='shopping-cart'
                                color='#fff'
                                size={25}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {allBooks.hasError ? (
                    <Text>
                        Có lỗi xảy ra. Vui lòng kiểm tra kết nối internet!
                    </Text>
                ) : (
                    <FlatList
                        data={allBooks.data}
                        renderItem={renderItem}
                        keyExtractor={(item) => item._id}
                        onEndReachedThreshold={0.5}
                        onEndReached={handleLoadMore}
                        ListFooterComponent={() => renderFooter()}
                        numColumns={2}
                        ListHeaderComponent={Header}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingBottom: 150,
                            backgroundColor: '#fff',
                        }}
                        refreshControl={
                            <RefreshControl
                                onRefresh={onRefresh}
                                refreshing={allBooks.isFetching}
                            />
                        }
                    />
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#009387',
        textAlign: 'center',
        height: 55,
    },

    item: {
        padding: 5,
        //marginVertical: 8,
        //marginHorizontal: 16,
    },

    title: {
        fontSize: 16,
    },

    searchContainer: {},
});
