import React, { useEffect, useState } from 'react';
import {
    View,
    ActivityIndicator,
    FlatList,
    RefreshControl,
    Text,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

// import { eventApi } from '../api/event.api';
import Event from '../components/EventScreen/Event';
import { eventActions } from '../redux/actions';

function EventScreen() {
    // const [eventList, setEventList] = useState([]);
    const events = useSelector((state) => state.eventReducer);
    const dispatch = useDispatch();
    const limit = 10;
    useEffect(() => {
        // dispatch(eventActions.getAllEventsAction(1, limit));
        // eventApi.getEvents(1, 10).then((res) => {
        //     if (res.type == 'Valid') {
        //         setEventList(res.data);
        //     } else {
        //         console.log(res);
        //     }
        // });
    }, []);

    const handleLoadMore = () => {
        dispatch(eventActions.loadMoreAction(events.currentPage + 1, limit));
    };

    const onRefresh = () => {
        dispatch(eventActions.refreshingAction());
        dispatch(eventActions.getAllEventsAction(1, limit));
    };

    const renderFooter = () => {
        if (events.endOfList)
            return (
                <View
                    style={{
                        alignItems: 'center',
                        paddingTop: 15,
                        paddingBottom: 25,
                        // backgroundColor: '#fff',
                    }}
                >
                    <Text>Đã hết hoạt động</Text>
                </View>
            );
        return (
            <View
                style={{
                    alignItems: 'center',
                    paddingTop: 15,
                    paddingBottom: 25,
                }}
            >
                <Text>Đang tải dữ liệu...</Text>
            </View>
        );
    };

    const renderItem = ({ item }) => {
        return <Event event={item} />;
    };

    if (events.isFetching) {
        return (
            <View style={{ marginTop: 25, flex: 1, alignItems: 'center' }}>
                <Text>Đang tải dữ liệu...</Text>
            </View>
        );
    }

    return (
        <View>
            <FlatList
                data={events.data}
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
                // contentContainerStyle={{ paddingBottom: 25 }}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={() => renderFooter()}
                refreshControl={
                    <RefreshControl
                        onRefresh={onRefresh}
                        refreshing={events.isFetching}
                    />
                }
            />
        </View>
    );
}

export default EventScreen;
