import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Entypo from 'react-native-vector-icons/Entypo';
import { userApi } from '../api';

function ReviewScreen({ route, navigation }) {
    const book = route.params;
    const contentRef = useRef(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const postReview = () => {
        if (title.trim().length == 0 && content.trim().length == 0) {
            return Alert.alert(
                'Vui lòng nhập đầy đủ tiêu đề và nội dung bài viết'
            );
        }

        const post = {
            title,
            content,
            book: book._id,
        };

        userApi.postReview(post).then((res) => {
            if (res.type == 'Valid') {
                book['loadReview'] = !book.loadReview;
                navigation.navigate('DetailScreen', book);
            } else {
                console.log(res.err);
                return Alert.alert('Có lỗi xảy ra. Vui lòng thử laij!');
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
            'Bạn vẫn muốn hủy bỏ bài viết?',
            [
                {
                    text: 'Xác nhận',
                    onPress: () => {
                        if (navigation.canGoBack()) {
                            navigation.goBack();
                        }
                    },
                    style: 'cancel',
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
        <SafeAreaView>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={goBack}>
                        <Entypo name='chevron-thin-left' size={25} />
                    </TouchableOpacity>
                    <Text>Viết bài đánh giá</Text>
                </View>
                <TouchableOpacity onPress={postReview}>
                    <Text>Đăng</Text>
                </TouchableOpacity>
            </View>
            <View>
                <View>
                    <TextInput
                        placeholder='Nhập tiêu đề '
                        numberOfLines={5}
                        returnKeyType={'next'}
                        onSubmitEditing={() => contentRef.current.focus()}
                        value={title}
                        onChangeText={(val) => setTitle(val)}
                    />
                </View>
                <View>
                    <TextInput
                        placeholder='Nhập nội dung đánh giá'
                        numberOfLines={15}
                        textAlignVertical='top'
                        style={{ backgroundColor: '#ccc' }}
                        multiline={true}
                        ref={contentRef}
                        value={content}
                        onChangeText={(val) => setContent(val)}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

export default ReviewScreen;
