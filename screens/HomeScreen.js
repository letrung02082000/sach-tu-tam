import React, { useState, useEffect } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    StatusBar,
    ActivityIndicator,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useDispatch, useSelector } from 'react-redux';
import { bookActions } from '../redux/actions/book.actions';

const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
        <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
);

const renderFooter = (loadingMore) => {
    if (!loadingMore) return null;

    return (
        <View
            style={{
                position: 'relative',
                width: 150,
                height: 50,
                paddingVertical: 20,
                borderTopWidth: 1,
                marginTop: 10,
                marginBottom: 10,
                borderColor: '#000',
            }}
        >
            <ActivityIndicator animating size='large' />
        </View>
    );
};

export default function HomeScreen({ navigation }) {
    const [selectedId, setSelectedId] = useState(null);

    const dispatch = useDispatch();
    const allBooks = useSelector((state) => state.bookReducer);
    const currentPage = useSelector((state) => state.bookReducer.currentPage);
    //const loadingMore = useSelector((state) => state.bookReducer.loadingMore);
    //const endOfList = useSelector((state) => state.bookReducer.endOfList);
    const bookPerPage = 10;

    const handleLoadMore = () => {
        //if (endOfList) return;

        dispatch(bookActions.loadMoreAction(currentPage + 1, bookPerPage));
    };

    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';

        return (
            <Item
                item={item}
                onPress={() =>
                    navigation.navigate('DetailScreen', { book: item })
                }
                style={{ backgroundColor }}
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
                    extraData={selectedId}
                    onEndReachedThreshold={0.5}
                    onEndReached={handleLoadMore}
                    //ListFooterComponent={() => renderFooter(loadingMore)}
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
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});
