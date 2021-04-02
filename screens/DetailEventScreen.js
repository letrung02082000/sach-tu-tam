import React from 'react';
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native';
import convertToDate from '../utils/convertToDate';

function DetailEventScreen({ route, navigation }) {
    const window = Dimensions.get('window');
    const event = route.params;

    return (
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
            <View style={{ padding: 5, marginVertical: 15 }}>
                <Image
                    source={{ uri: event.imgurl }}
                    style={{ height: window.width / 2, resizeMode: 'contain' }}
                />
            </View>
            <View style={{ padding: 5, marginBottom: 15 }}>
                <Text style={styles.titleText}>{event.title}</Text>
            </View>
            <View style={{ padding: 5, marginBottom: 15 }}>
                <Text style={styles.contentText}>{event.content}</Text>
            </View>
            <View style={{ padding: 5, marginBottom: 15 }}>
                <Text style={styles.text}>Số lượng: {event.limit}</Text>
                <Text style={styles.text}>Đã đăng ký: {event.joinnumber}</Text>
                <Text style={styles.text}>
                    Hạn đăng ký: {convertToDate(event.deadline)}
                </Text>
                <Text style={styles.text}>
                    Ngày bắt đầu: {convertToDate(event.startdate)}
                </Text>
                <Text style={styles.text}>
                    Ngày kết thúc:&nbsp;
                    {event.finishdate
                        ? convertToDate(event.finishdate)
                        : 'Đang cập nhật'}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    titleText: {
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'center',
    },
    contentText: {
        fontSize: 17,
        textAlign: 'center',
    },
    text: {
        textAlign: 'center',
        marginBottom: 5,
        fontSize: 15,
    },

    deadlineText: {
        textAlign: 'center',
    },
    limitText: { textAlign: 'center' },
    joinlistText: { textAlign: 'center' },
    startdateText: { textAlign: 'center' },
    finishText: { textAlign: 'center' },
});

export default DetailEventScreen;
