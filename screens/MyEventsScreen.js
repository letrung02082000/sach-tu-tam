import React, { useState, useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';
import { userApi } from '../api';

function MyEventsScreen() {
    const [myEvents, setMyEvents] = useState([]);

    useEffect(() => {
        userApi.getAllEvents().then((res) => {
            if (res.type == 'Valid') {
                setMyEvents(res.data);
            } else {
                console.log(res.err);
            }
        });
    }, []);

    const renderItem = ({ item }) => {
        console.log(item);
        return (
            <View>
                <Text>
                    {item.eventId.title} +{' '}
                    {item.joined ? item.eventId.point : 'đang chờ duyệt'}
                </Text>
            </View>
        );
    };

    return (
        <View>
            <FlatList
                data={myEvents}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
            />
        </View>
    );
}

export default MyEventsScreen;
