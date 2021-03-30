import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { postApi } from '../../api/post.api';

function Post({ post }) {
    const navigation = useNavigation();
    const [loved, setLoved] = useState(post.postlike);
    // console.log(post);
    const user = useSelector((state) => state.authReducer);

    const addPostToFavorite = () => {
        if (!user.isLoggedIn) {
            return navigation.navigate('SignInScreen');
        }

        if (loved) {
            postApi
                .removeLikePost(post._id)
                .then((res) => console.log(res))
                .catch((err) => console.log(err));
        } else {
            postApi
                .likePost(post._id)
                .then((res) => console.log(res))
                .catch((err) => console.log(err));
        }

        setLoved(!loved);
    };

    const navigateToDetailPostScreen = () => {
        navigation.navigate('DetailPostScreen', { post });
    };

    const navigateToCommentScreen = () => {
        navigation.navigate('CommentScreen', { postId: post._id });
    };

    const navigateToDetailScreen = () => {
        navigation.navigate('DetailScreen', { book: post.book });
    };

    return (
        <View
            style={{
                marginHorizontal: 9,
                marginTop: 10,
                marginBottom: 5,
                backgroundColor: '#fff',
                borderRadius: 5,
                padding: 7,
                flex: 1,
            }}
        >
            <View
                style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}
            >
                <View
                    style={{
                        height: 35,
                        width: 35,
                        overflow: 'hidden',
                        borderRadius: 35 / 2,
                        borderColor: '#ccc',
                        borderWidth: 2,
                    }}
                >
                    <Image
                        style={{ height: 35, width: 35 }}
                        resizeMode={'cover'}
                        source={{
                            uri:
                                post.user.avt ||
                                'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png',
                        }}
                    />
                </View>

                <Text
                    style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 10 }}
                >
                    {post.user.username}
                </Text>
            </View>

            <View>
                <Text style={{ marginVertical: 15, fontSize: 15 }}>
                    {post.title}
                </Text>
            </View>
            <View>
                <Text
                    style={{ lineHeight: 25, fontSize: 15 }}
                    numberOfLines={5}
                >
                    {post.content}
                </Text>
            </View>

            <TouchableOpacity onPress={navigateToDetailPostScreen}>
                <Text
                    style={{
                        lineHeight: 25,
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: '#003399',
                        paddingVertical: 15,
                        textAlign: 'center',
                    }}
                >
                    Đọc tiếp >
                </Text>
            </TouchableOpacity>

            <View>
                <Image
                    style={{
                        width: '100%',
                        height: 210,
                        resizeMode: 'contain',
                    }}
                    source={{
                        uri: post.book.imageurl,
                    }}
                />
            </View>

            <View
                style={{
                    marginTop: 15,
                    marginBottom: 5,
                    marginHorizontal: 5,
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                }}
            >
                <View>
                    <TouchableOpacity
                        style={{ marginBottom: 5 }}
                        onPress={addPostToFavorite}
                    >
                        <MaterialIcons
                            name={loved ? 'favorite' : 'favorite-border'}
                            size={25}
                            color={loved ? '#e32d2d' : '#1f1f1f'}
                        />
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={navigateToCommentScreen}>
                        <EvilIcons name='comment' size={30} />
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={navigateToDetailScreen}>
                        <AntDesign name='arrowright' size={25} />
                    </TouchableOpacity>
                </View>
            </View>
            {/* <Text style={{ fontWeight: 'bold' }}>{post.likecount} tim</Text> */}
            <View style={{ alignItems: 'center', marginTop: 17 }}>
                {loved ? (
                    <Text>Bạn đã &#9825; bài viết này</Text>
                ) : (
                    <Text>
                        Thả &#9825; nếu thấy hay để động viên người viết nhé!
                    </Text>
                )}
            </View>
        </View>
    );
}

export default Post;
