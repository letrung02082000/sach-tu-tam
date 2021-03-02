import React, { useState, useEffect } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    StatusBar,
    ActivityIndicator,
    Dimensions,
    TouchableWithoutFeedback,
    FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SearchBar } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { useDispatch, useSelector } from 'react-redux';
import { bookActions } from '../redux/actions/book.actions';
import { bestsellerActions } from '../redux/actions/bestseller.actions';

import Header from '../components/Home/Header';
import BookItem from '../components/Home/BookItem';

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
    }, []);

    if (allBooks.isFetching) {
        return (
            <SafeAreaView>
                <View>
                    <Text>is fetching...</Text>
                </View>
            </SafeAreaView>
        );
    }

    const navigateToSearchScreen = () => navigation.navigate('SearchScreen');
    const navigateToCartScreen = () => navigation.navigate('CartScreen');

    return (
        <SafeAreaView>
            <View>
                <View style={styles.headerContainer}>
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
                                width: 250,
                                borderRadius: 3,
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                paddingHorizontal: 5,
                                marginHorizontal: 7,
                            }}
                        >
                            <FontAwesome name='search' />
                            <Text>Bạn cần tìm sách gì?</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity>
                            <FontAwesome5 name='bell' color='#fff' size={25} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={navigateToCartScreen}>
                            <FontAwesome
                                name='shopping-cart'
                                color='#fff'
                                size={25}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {allBooks.hasError ? (
                    <Text>Some errors occured</Text>
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
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
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
