import React, { useEffect, useState } from 'react';
import {
    View,
    FlatList,
    RefreshControl,
    ActivityIndicator,
    Text,
} from 'react-native';
import Post from '../components/ReaderScreen/Post';
import { useSelector, useDispatch } from 'react-redux';
import { postActions } from '../redux/actions/post.actions';

function ReaderScreen() {
    const user = useSelector((state) => state.authReducer);
    const posts = useSelector((state) => state.postReducer);
    const dispatch = useDispatch();
    const pageLimit = 10;

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
        // dispatch(postActions.getAllPostsAction(1, pageLimit));
    }, []);

    const onRefresh = () => {
        dispatch(postActions.refreshingAction());
        dispatch(postActions.getAllPostsAction(1, pageLimit));
    };

    const handleLoadMore = () => {
        dispatch(postActions.loadMoreAction(posts.currentPage + 1, pageLimit));
    };

    const renderItem = ({ item }) => {
        return <Post post={item} />;
    };

    const renderFooter = () => {
        if (posts.endOfList)
            return (
                <View
                    style={{
                        alignItems: 'center',
                        paddingTop: 15,
                        paddingBottom: 25,
                    }}
                >
                    <Text>Đã hết bài viết</Text>
                </View>
            );
        return (
            <View
                style={{
                    alignItems: 'center',
                    paddingTop: 15,
                    paddingBottom: 25,
                }}
            >
                <Text>Đang tải dữ liệu...</Text>
            </View>
        );
    };

    if (posts.isFetching) {
        return (
            <View style={{ marginTop: 25, flex: 1, alignItems: 'center' }}>
                <Text>Đang tải dữ liệu...</Text>
            </View>
        );
    }

    return (
        <View>
            <FlatList
                data={posts.data}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                refreshControl={
                    <RefreshControl
                        onRefresh={onRefresh}
                        refreshing={posts.isFetching}
                    />
                }
                onEndReachedThreshold={0.5}
                onEndReached={handleLoadMore}
                ListFooterComponent={() => renderFooter()}
            />
        </View>
    );
}

export default ReaderScreen;
