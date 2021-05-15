import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { postApi } from '../api';
import ReviewPost from '../components/DetailScreen/ReviewPost';

function AllBookReviewsScreen({ route, navigation }) {
    const book = route.params.book;
    const [bookReviews, setBookReviews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [endOfList, setEndOfList] = useState(false);
    const pageLimit = 10;

    useEffect(() => {
        postApi.getPostsByBookId(1, pageLimit, book._id).then((res) => {
            if (res.type == 'Valid') {
                setBookReviews(res.data);
            } else {
                console.log(res.err);
            }
        });
    }, []);

    const renderItem = ({ item }) => {
        return <ReviewPost post={item} />;
    };

    const renderFooter = () => {
        if (endOfList) return null;
        return (
            <View style={{ flex: 1, marginTop: 5 }}>
                <Text style={{ textAlign: 'center' }}>Đang tải dữ liệu...</Text>
            </View>
        );
    };

    const handleLoadMore = () => {
        console.log(currentPage);
        postApi
            .getPostsByBookId(currentPage + 1, pageLimit, book._id)
            .then((res) => {
                if (res.type == 'Valid') {
                    setBookReviews([...bookReviews, ...res.data]);
                    setCurrentPage(currentPage + 1);
                } else {
                    setEndOfList(true);
                }
            });
    };

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={bookReviews}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                onEndReachedThreshold={0.5}
                onEndReached={handleLoadMore}
                ListFooterComponent={() => renderFooter()}
            />
        </View>
    );
}

export default AllBookReviewsScreen;
