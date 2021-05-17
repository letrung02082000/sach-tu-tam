import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    Alert,
    Dimensions,
    ActivityIndicator,
    StyleSheet,
    RefreshControl,
} from 'react-native';
import { bookApi } from '../api';
import BookItem from '../components/Home/BookItem';

function AllFavoriteBooksScreen({ navigation }) {
    const window = Dimensions.get('window');
    const [favoriteBooks, setFavoriteBooks] = useState([]);
    const [fetching, setFetching] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const bookPerPage = 30;

    useEffect(() => {
        bookApi.getFavorite(1, bookPerPage).then((res) => {
            setFetching(true);
            if (res.type == 'Valid') {
                setFavoriteBooks(res.data);
                setCurrentPage(1);
            } else {
                console.log(res.err);
                Alert.alert('Có lỗi xảy ra. Vui lòng thử lại!');
            }

            setFetching(false);
        });
    }, []);

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

    const handleLoadMore = () => {
        bookApi.getFavorite(currentPage + 1, bookPerPage).then((res) => {
            if (res.type == 'Valid') {
                if (res.data.length == 0) {
                    setLoadingMore(false);
                } else {
                    setFavoriteBooks([...favoriteBooks, ...res.data]);
                    setCurrentPage(currentPage + 1);
                }
            } else {
                setLoadingMore(false);
            }
        });
    };

    const onRefresh = () => {
        setRefreshing(true);

        bookApi.getFavorite(1, bookPerPage).then((res) => {
            if (res.type == 'Valid') {
                setFavoriteBooks(res.data);
                setCurrentPage(1);
                setLoadingMore(true);
            } else {
                console.log(res.err);
                Alert.alert('Có lỗi xảy ra. Vui lòng thử lại!');
            }
        });

        setRefreshing(false);
    };

    const renderFooter = () => {
        if (!loadingMore) return null;
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

    if (fetching)
        return (
            <View
                style={{
                    flex: 1,
                    paddingTop: 25,
                    alignItems: 'center',
                    backgroundColor: '#fff',
                }}
            >
                <Text>Đang tải dữ liệu...</Text>
            </View>
        );

    return (
        <View style={styles.container}>
            <FlatList
                data={favoriteBooks}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                onEndReachedThreshold={0.5}
                onEndReached={handleLoadMore}
                ListFooterComponent={() => renderFooter()}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingVertical: 25,
                    backgroundColor: '#fff',
                }}
                refreshControl={
                    <RefreshControl
                        onRefresh={onRefresh}
                        refreshing={refreshing}
                    />
                }
            />
        </View>
    );
}

export default AllFavoriteBooksScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
