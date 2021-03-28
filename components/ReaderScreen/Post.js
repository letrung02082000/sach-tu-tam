import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { postApi } from '../../api/post.api';

function Post({ post }) {
    const navigation = useNavigation();
    const [loved, setLoved] = useState(post.postlike);
    console.log(loved);
    const user = useSelector((state) => state.authReducer);

    const addPostToFavorite = () => {
        if (!user.isLoggedIn) {
            return navigation.navigate('SignInScreen');
        }

        setLoved(!loved);
        postApi
            .likePost(post._id, user._id, user.token)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    };

    const navigateToDetailPostScreen = () => {
        navigation.navigate('DetailPostScreen', { post });
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
                                'https://scontent.fsgn5-1.fna.fbcdn.net/v/t1.0-9/120235410_1238559176485707_6637949935409294661_o.jpg?_nc_cat=104&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=Ic2Om2HgoYEAX9YCQko&_nc_ht=scontent.fsgn5-1.fna&oh=c6fd95b6386af5ae65f3b2e024353a45&oe=607DCA61',
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
                style={{ marginTop: 15, marginBottom: 5, marginHorizontal: 5 }}
            >
                <TouchableOpacity onPress={addPostToFavorite}>
                    <MaterialIcons
                        name={loved ? 'favorite' : 'favorite-border'}
                        size={25}
                        color={loved ? '#e32d2d' : '#1f1f1f'}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Post;
