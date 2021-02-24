import React, { useState, useEffect } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    StatusBar,
    ActivityIndicator,
    Dimensions,
    Image,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useDispatch, useSelector } from 'react-redux';
import { bookActions } from '../redux/actions/book.actions';

const domainUrl = 'https://sach-tu-tam.herokuapp.com';

const Item = ({ item, onPress, style }) => {
    const imgUrl = `${domainUrl}/${item.imageurl}`;
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.item, style]}>
                <Image
                    style={{
                        width: '100%',
                        height: 210,
                        resizeMode: 'cover',
                    }}
                    source={{
                        uri: imgUrl,
                    }}
                />
                <Text style={styles.title}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    );
};

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
            <Item
                item={item}
                onPress={() =>
                    navigation.navigate('DetailScreen', { book: item })
                }
                style={{ backgroundColor: '#ccc', width: window.width / 2 }}
            />
        );
    };

    useEffect(() => {
        dispatch(bookActions.getAllBooksAction(currentPage, bookPerPage));
    }, []);

    if (allBooks.isFetching) {
        return (
            <View>
                <Text>is fetching...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView>
            <Text style={styles.headerTitle}>Sách Từ Tâm</Text>
            <Text>Tất cả sách</Text>
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
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    headerTitle: {
        backgroundColor: 'blue',
        color: '#fff',
        textAlign: 'center',
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
});
