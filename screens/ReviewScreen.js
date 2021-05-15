import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Entypo from 'react-native-vector-icons/Entypo';
import { Rating } from 'react-native-elements';
import { userApi } from '../api';

function ReviewScreen({ route, navigation }) {
    const book = route.params;
    const contentRef = useRef(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [rating, setRating] = useState(5);
    const [posting, setPosting] = useState(false);

    // useEffect(() => {
    //     navigation.addListener('beforeRemove', (e) => {
    //         e.preventDefault();

    //         if (title.trim().length == 0 && content.trim().length == 0) {
    //             return navigation.dispatch(e.data.action);
    //         }

    //         Alert.alert(
    //             'Bài viết của bạn chưa được lưu',
    //             'Bạn có muốn hủy bài viết không?',
    //             [
    //                 {
    //                     text: 'Có',
    //                     onPress: () => navigation.dispatch(e.data.action),
    //                     style: 'destructive',
    //                 },
    //                 {
    //                     text: 'Tiếp tục chỉnh sửa',
    //                     onPress: () => {
    //                         return;
    //                     },
    //                     style: 'cancel',
    //                 },
    //             ],
    //             {
    //                 cancelable: true,
    //                 onDismiss: () => {
    //                     return;
    //                 },
    //             }
    //         );
    //     });
    // }, []);

    const postReview = () => {
        if (title.trim().length == 0 || content.trim().length == 0) {
            return Alert.alert(
                'Vui lòng nhập đầy đủ tiêu đề và nội dung bài viết'
            );
        }

        setPosting(true);

        const post = {
            title,
            content,
            book: book._id,
            rating,
        };

        userApi.postReview(post).then((res) => {
            if (res.type == 'Valid') {
                book['loadReview'] = !book.loadReview;
                setPosting(false);
                navigation.navigate('DetailScreen', book);
            } else {
                setPosting(false);
                if ((res.err = 'post exist')) {
                    return Alert.alert(
                        'Bạn không thể đánh giá lại quyển sách này'
                    );
                }

                return Alert.alert('Không thể đăng bài viết. Vui lòng thử lại');
            }
        });
    };

    const goBack = () => {
        if (title.trim().length == 0 && content.trim().length == 0) {
            if (navigation.canGoBack()) {
                return navigation.goBack();
            }
        }
        Alert.alert(
            'Bài viết của bạn chưa được lưu',
            'Bạn có muốn hủy bài viết không?',
            [
                {
                    text: 'Có',
                    onPress: () => {
                        if (navigation.canGoBack()) {
                            navigation.goBack();
                        }
                    },
                    style: 'destructive',
                },
                {
                    text: 'Tiếp tục chỉnh sửa',
                    onPress: () => {
                        return;
                    },
                    style: 'cancel',
                },
            ],
            {
                cancelable: true,
                onDismiss: () => {
                    return;
                },
            }
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 15,
                    height: 55,
                }}
            >
                <TouchableOpacity onPress={goBack}>
                    <Entypo
                        name='chevron-thin-left'
                        size={25}
                        color='#03ada0'
                    />
                </TouchableOpacity>
                {/* <Text
                    style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: '#000',
                    }}
                >
                    Viết bài đánh giá
                </Text> */}
                {posting ? (
                    <View>
                        <Text
                            style={{
                                fontSize: 15,
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                                color: '#03ada0',
                            }}
                        >
                            Đang đăng...
                        </Text>
                    </View>
                ) : (
                    <TouchableOpacity onPress={postReview}>
                        <Text
                            style={{
                                fontSize: 15,
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                                color: '#03ada0',
                            }}
                        >
                            Đăng
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
            <View style={{ height: '100%' }}>
                <View
                    style={{
                        marginVertical: 10,
                        marginHorizontal: 9,
                        height: 55,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 5,
                    }}
                >
                    <TextInput
                        placeholder='Nhập tiêu đề '
                        returnKeyType={'next'}
                        onSubmitEditing={() => contentRef.current.focus()}
                        value={title}
                        onChangeText={(val) => setTitle(val)}
                        fontSize={17}
                        padding={9}
                    />
                </View>

                <View
                    style={{
                        borderWidth: 1,
                        borderRadius: 5,
                        borderColor: '#ccc',
                        height: '50%',
                        // marginVertical: 15,
                        marginHorizontal: 9,
                    }}
                >
                    <TextInput
                        placeholder='Nhập nội dung đánh giá'
                        numberOfLines={25}
                        textAlignVertical='top'
                        multiline={true}
                        ref={contentRef}
                        value={content}
                        onChangeText={(val) => setContent(val)}
                        height='100%'
                        fontSize={17}
                        padding={9}
                    />
                </View>

                <View
                    style={{
                        height: '100%',
                        marginTop: 25,
                        alignItems: 'center',
                    }}
                >
                    <Rating
                        imageSize={50}
                        startingValue={5}
                        showRating
                        onFinishRating={setRating}
                    />
                    <Text style={{ fontSize: 15, marginTop: 5 }}>
                        Kéo để đánh giá
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default ReviewScreen;
