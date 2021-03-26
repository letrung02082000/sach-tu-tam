import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';

function DetailEventScreen({ route, navigation }) {
    const window = Dimensions.get('window');
    const event = route.params;

    return (
        <View>
            <View style={{ padding: 5 }}>
                <Image
                    source={{ uri: event.imgurl }}
                    style={{ height: window.width / 2, resizeMode: 'contain' }}
                />
            </View>
            <Text>{event.title}</Text>
            <Text>{event.content}</Text>
            <Text>Số lượng: {event.limit}</Text>
            <Text>Đã đăng ký: {event.joinlist.length}</Text>
            <Text>Hạn đăng ký: {event.deadline}</Text>
            <Text>Ngày bắt đầu: {event.startdate}</Text>
            <Text>
                Ngày kết thúc:&nbsp;
                {event.finishdate ? event.finishdate : 'Đang cập nhật'}
            </Text>
        </View>
    );
}

export default DetailEventScreen;
