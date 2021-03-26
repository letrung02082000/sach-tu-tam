import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';

import { eventApi } from '../api/event.api';
import Event from '../components/EventScreen/Event';

function EventScreen() {
    const [eventList, setEventList] = useState([]);

    useEffect(() => {
        eventApi.getEvents(1, 10).then((res) => {
            if (res.type == 'Valid') {
                setEventList(res.data);
            } else {
                console.log(res);
            }
        });
    }, []);

    const renderItem = ({ item }) => {
        return <Event event={item} />;
    };

    return (
        <View>
            <FlatList
                data={eventList}
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: 25 }}
            />
        </View>
    );
}

export default EventScreen;
