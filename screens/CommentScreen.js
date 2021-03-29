import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    ActivityIndicator,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { postApi } from '../api/post.api';

function CommentScreen({ route, navigation }) {
    const user = useSelector((state) => state.authReducer);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [myComment, setMyComment] = useState('');
    const [postingComment, setPostingComment] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        setLoading(true);
        postApi
            .getComments(route.params.postId)
            .then((res) => {
                setComments(res.data);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }, []);

    const onChangeText = (text) => {
        setMyComment(text);
    };

    const handleWriteComment = () => {
        setPostingComment(true);
        postApi
            .postComment(route.params.postId, myComment)
            .then((res) => {
                if (res.type == 'Valid') {
                    res.data.user = {
                        _id: user._id,
                        username: user.username,
                        avt: user.avt,
                    };
                    setComments([res.data, ...comments]);
                }
                setPostingComment(false);
                setMyComment('');
            })
            .catch((error) => {
                setPostingComment(false);
                console.log(error);
            });
    };

    const onRefresh = () => {
        setRefreshing(true);
        postApi
            .getComments(route.params.postId)
            .then((res) => {
                setComments(res.data);
                setRefreshing(false);
            })
            .catch((error) => {
                setRefreshing(false);
                console.log(error);
            });
    };

    const renderItem = ({ item }) => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    flex: 1,
                    backgroundColor: '#fff',
                    marginHorizontal: 15,
                    marginVertical: 15,
                    alignItems: 'center',
                }}
            >
                <View
                    style={{
                        height: 35,
                        width: 35,
                        overflow: 'hidden',
                        borderRadius: 35 / 2,
                        borderColor: '#ccc',
                        borderWidth: 2,
                        marginRight: 15,
                    }}
                >
                    <Image
                        style={{ height: 35, width: 35 }}
                        resizeMode={'cover'}
                        source={{
                            uri: item.user.avt,
                        }}
                    />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontWeight: 'bold' }}>
                        {item.user.username}
                    </Text>
                    <Text style={{ marginLeft: 5 }}>{item.comment}</Text>
                </View>
            </View>
        );
    };

    if (loading) {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <ActivityIndicator size='large' color='#ccc' />
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <FlatList
                data={comments}
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
                onRefresh={onRefresh}
                refreshing={refreshing}
            />
            <View
                style={{
                    marginBottom: 9,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <TextInput
                    style={{
                        backgroundColor: '#ededed',
                        paddingHorizontal: 15,
                        borderRadius: 50,
                        marginHorizontal: 10,
                        paddingVertical: 9,
                        flex: 1,
                    }}
                    placeholder='Viết bình luận...'
                    onChangeText={onChangeText}
                    value={myComment}
                />
                {myComment.trim().length > 0 ? (
                    postingComment ? (
                        <ActivityIndicator
                            size='small'
                            color='#32B0EA'
                            style={{ marginRight: 15 }}
                        />
                    ) : (
                        <TouchableOpacity onPress={handleWriteComment}>
                            <Ionicons
                                name='ios-send'
                                size={25}
                                color='#32B0EA'
                                style={{ marginRight: 15 }}
                            />
                        </TouchableOpacity>
                    )
                ) : null}
            </View>
        </View>
    );
}

export default CommentScreen;
