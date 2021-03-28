import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import Post from '../components/ReaderScreen/Post';
import { postApi } from '../api/post.api';
import { useSelector, useDispatch } from 'react-redux';
import { postActions } from '../redux/actions/post.actions';

function ReaderScreen() {
    const [postList, setPostList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);
    const user = useSelector((state) => state.authReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        // setLoading(true);
        // postApi.getPosts(1, 10, user._id, user.token).then((res) => {
        //     if (res.type == 'Valid') {
        //         setPostList(res.data);
        //         setLoading(false);
        //     } else {
        //         console.log(res.err);
        //         setLoading(false);
        //     }
        // });
        dispatch(postActions.getAllPostsAction(1, 10));
    }, []);

    const onRefresh = () => {
        console.log('refreshing');
        console.log(user);
        setFetching(true);
        postApi.getPosts(1, 10, user._id, user.token).then((res) => {
            if (res.type == 'Valid') {
                console.log(res.data[0]);
                setPostList(res.data);
                setFetching(false);
                console.log(res.data.length);
            } else {
                console.log(res.err);
                setFetching(false);
            }
        });
    };

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
                    refreshControl={
                        <RefreshControl
                            onRefresh={onRefresh}
                            refreshing={fetching}
                        />
                    }
                />
            )}
        </View>
    );
}

export default ReaderScreen;
