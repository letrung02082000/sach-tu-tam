import React, { useState, useCallback } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { Rating } from 'react-native-elements';
// import ViewMoreText from 'react-native-view-more-text';

function ReviewPost(props) {
    const child = props.post;
    const NUM_OF_LINES = 5;

    const [showMore, setShowMore] = useState(false);
    const [textShown, setTextShown] = useState(false);

    const onTextLayout = useCallback((e) => {
        setShowMore(e.nativeEvent.lines.length > NUM_OF_LINES);
    }, []);

    return (
        <View
            key={child._id}
            style={{
                backgroundColor: '#fff',
                padding: 15,
                borderBottomWidth: 1,
                borderColor: '#f5f5f5',
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <Image
                        source={{ uri: child.user.avt }}
                        style={{
                            height: 30,
                            width: 30,
                            borderRadius: 50,
                        }}
                    />
                    <Text
                        style={{
                            fontSize: 15,
                            marginLeft: 5,
                        }}
                    >
                        {child.user.name}
                    </Text>
                </View>
                <Rating imageSize={20} readonly startingValue={5} />
            </View>
            <Text
                numberOfLines={2}
                style={{
                    marginTop: 15,
                    fontWeight: 'bold',
                    fontSize: 17,
                    color: '#303030',
                }}
            >
                {child.title}
            </Text>
            <View>
                <Text
                    numberOfLines={textShown ? undefined : NUM_OF_LINES}
                    style={{ fontSize: 15 }}
                    onTextLayout={onTextLayout}
                >
                    {child.content}
                </Text>
                {textShown ? (
                    <TouchableOpacity onPress={() => setTextShown(false)}>
                        <Text>Ẩn bớt</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={() => setTextShown(true)}>
                        <Text>Xem thêm</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

export default ReviewPost;
