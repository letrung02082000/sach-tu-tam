import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

function DetailPostScreen({ route, navigation }) {
    const post = route.params.post;
    const [loved, setLoved] = useState(false);

    const addPostToFavorite = () => {
        setLoved(!loved);
    };
    return (
        <ScrollView
            style={{
                marginHorizontal: 9,
                marginVertical: 5,
                backgroundColor: '#fff',
                borderRadius: 5,
                padding: 7,
                flex: 1,
            }}
            showsVerticalScrollIndicator={false}
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
                    style={{ lineHeight: 25, fontSize: 15, marginBottom: 15 }}
                >
                    {post.content}
                </Text>
            </View>

            <View>
                <Image
                    style={{
                        width: '100%',
                        height: 250,
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
                    marginHorizontal: 15,
                    paddingVertical: 15,
                    flex: 1,
                }}
            >
                <TouchableOpacity onPress={addPostToFavorite}>
                    <MaterialIcons
                        name={loved ? 'favorite' : 'favorite-border'}
                        size={25}
                        color={loved ? '#e32d2d' : '#1f1f1f'}
                    />
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

export default DetailPostScreen;
