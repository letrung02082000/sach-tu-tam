import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { postApi } from '../api';
import ReviewPost from '../components/DetailScreen/ReviewPost';

function AllBookReviewsScreen({ route, navigation }) {
    const book = route.params.book;
    const [bookReviews, setBookReviews] = useState([]);

    useEffect(() => {
        postApi.getPostsByBookId(1, 10, book._id).then((res) => {
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

    return (
        <View>
            <FlatList
                data={bookReviews}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
            />
        </View>
    );
}

export default AllBookReviewsScreen;
