import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    Dimensions,
} from 'react-native';

import convertToDate from '../../utils/convertToDate';
import { useNavigation } from '@react-navigation/native';

function Event({ event }) {
    const navigation = useNavigation();
    const window = Dimensions.get('window');

    const navigateToDetailEventScreen = () => {
        navigation.navigate('DetailEventScreen', event);
    };

    return (
        <View style={styles.container}>
            <View style={{ padding: 5 }}>
                <Image
                    source={{ uri: event.imgurl }}
                    style={{ height: window.width / 2, resizeMode: 'contain' }}
                />
            </View>

            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Text
                    style={{ fontSize: 15, fontWeight: 'bold', paddingTop: 5 }}
                >
                    {convertToDate(event.deadline)}
                </Text>
                <Text
                    style={{ fontSize: 15, fontWeight: 'bold', paddingTop: 5 }}
                >
                    {event.joinlist.length}/{event.limit} đã tham gia
                </Text>
            </View>
            <Text
                style={{ fontSize: 21, fontWeight: 'bold', paddingTop: 5 }}
                numberOfLines={2}
            >
                {event.title}
            </Text>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 15,
                    marginBottom: 5,
                }}
            >
                <View
                    style={{ flexDirection: 'row', justifyContent: 'center' }}
                >
                    <TouchableOpacity
                        style={[
                            { backgroundColor: '#00abfa' },
                            styles.buttonContainer,
                        ]}
                        onPress={navigateToDetailEventScreen}
                    >
                        <Text style={styles.buttonText}>Xem chi tiết</Text>
                    </TouchableOpacity>
                    {event.joinlist.length < event.limit ? (
                        <TouchableOpacity
                            style={[
                                { backgroundColor: '#32C532', marginLeft: 15 },
                                styles.buttonContainer,
                            ]}
                        >
                            <Text style={styles.buttonText}>Tham gia</Text>
                        </TouchableOpacity>
                    ) : null}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginTop: 15,
        marginHorizontal: 5,
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        justifyContent: 'space-between',
    },

    buttonContainer: {
        borderRadius: 3,
        padding: 7,
        width: 130,
    },

    buttonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
        paddingVertical: 2,
        paddingHorizontal: 5,
        textAlign: 'center',
    },
});

export default Event;
