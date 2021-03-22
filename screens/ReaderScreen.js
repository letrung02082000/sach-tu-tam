import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Post from '../components/ReaderScreen/Post';
import { postApi } from '../api/post.api';

function ReaderScreen() {
    const [postList, setPostList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        postApi.getPosts(1, 10).then((res) => {
            if (res.type == 'Valid') {
                setPostList(res.data);
                setLoading(false);
            } else {
                console.log(res.err);
                setLoading(false);
            }
        });
    }, []);

    const renderItem = ({ item }) => {
        return <Post post={item} />;
    };

    return (
        <View>
            {loading ? (
                <View>
                    <Text>loading...</Text>
                </View>
            ) : (
                <FlatList
                    data={postList}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id}
                />
            )}
        </View>
    );
}

export default ReaderScreen;
