import React, { useState, useEffect, useRef } from 'react';
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
import AntDesign from 'react-native-vector-icons/AntDesign';

import { useDispatch, useSelector } from 'react-redux';
import { bookActions } from '../redux/actions/book.actions';
import { bestsellerActions } from '../redux/actions/bestseller.actions';
import { categoryActions } from '../redux/actions/category.actions';

import Header from '../components/Home/Header';
import BookItem from '../components/Home/BookItem';
import { favoriteActions } from '../redux/actions/favorite.actions';
import { postActions } from '../redux/actions/post.actions';
import { eventActions } from '../redux/actions';

export default function HomeScreen({ navigation }) {
    const window = Dimensions.get('window');

    const dispatch = useDispatch();

    const allBooks = useSelector((state) => state.bookReducer);
    const currentPage = useSelector((state) => state.bookReducer.currentPage);
    const endOfList = useSelector((state) => state.bookReducer.endOfList);

    const listRef = useRef(null);
    const [contentVerticalOffset, setContentVerticalOffset] = useState(0);
    const CONTENT_OFFSET_THRESHOLD = 2100;

    const renderFooter = () => {
        if (endOfList) return null;
        return (
            <View
                style={{
                    height: 150,
                    width: window.width,
                }}
            >
                <ActivityIndicator size='large' color='#ccc' />
            </View>
        );
    };

    const bookPerPage = 30;

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
        dispatch(postActions.getAllPostsAction(1, 10));
        dispatch(eventActions.getAllEventsAction(1, 10));
    }, []);

    const onRefresh = () => {
        dispatch(bookActions.refreshingAction());
        dispatch(bookActions.getAllBooksAction(1, bookPerPage));
        dispatch(bestsellerActions.getBestseller());
        dispatch(favoriteActions.getFavorite());
        dispatch(categoryActions.getAllCategoriesAction());
    };

    const navigateToSearchScreen = () => navigation.navigate('SearchScreen');
    const navigateToCartScreen = () => navigation.navigate('CartScreen');
    const navigateToScanScreen = () => navigation.navigate('ScanScreen');

    return (
        <SafeAreaView>
            {contentVerticalOffset > CONTENT_OFFSET_THRESHOLD && (
                <TouchableOpacity
                    onPress={() => {
                        listRef.current.scrollToOffset({
                            offset: 0,
                            animated: true,
                        });
                    }}
                    style={styles.scrollTopButton}
                >
                    <AntDesign
                        name='totop'
                        size={25}
                        style={styles.scrollTopIcon}
                    />
                </TouchableOpacity>
            )}
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
                        alignContent: 'center',
                        width: 100,
                    }}
                >
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
                    <TouchableOpacity
                        style={{ marginRight: 25 }}
                        onPress={navigateToScanScreen}
                    >
                        <FontAwesome name='qrcode' color='#fff' size={25} />
                    </TouchableOpacity>
                </View>
            </View>

            <FlatList
                ref={listRef}
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
                onScroll={(event) => {
                    setContentVerticalOffset(event.nativeEvent.contentOffset.y);
                }}
            />
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

    scrollTopButton: {
        position: 'absolute',
        bottom: 90,
        right: 17,
        zIndex: 100,
    },

    scrollTopIcon: {
        color: '#fff',
        padding: 15,
        backgroundColor: '#009387',
        borderRadius: 50,
    },
});
