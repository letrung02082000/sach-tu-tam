import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';

import { userApi } from '../api';

function MyEventsScreen({ navigation }) {
    const [myEvents, setMyEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        userApi.getAllEvents().then((res) => {
            if (res.type == 'Valid') {
                setMyEvents(res.data);
            } else {
                console.log(res.err);
            }
            setLoading(false);
        });
    }, []);

    const renderItem = ({ item }) => {
        console.log(item);
        return (
            <View
                style={{
                    paddingVertical: 15,
                    marginTop: 9,
                    paddingHorizontal: 15,
                    backgroundColor: '#fff',
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignContent: 'center',
                    }}
                >
                    <Text
                        style={{
                            fontSize: 17,
                            fontWeight: 'bold',
                            color: '#383838',
                        }}
                    >
                        {item.eventId.title}
                    </Text>
                    {item.joined ? (
                        <Text style={{ fontSize: 15 }}>
                            +{item.eventId.point}
                        </Text>
                    ) : null}
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                    }}
                >
                    <Text>Trạng thái:</Text>
                    <Text>
                        {item.joined ? 'Đã tham gia' : 'Đang chờ duyệt'}
                    </Text>
                </View>
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate(
                                'DetailEventScreen',
                                item.eventId
                            )
                        }
                    >
                        <Text
                            style={{
                                paddingVertical: 7,
                                paddingHorizontal: 21,
                                borderWidth: 1,
                                borderRadius: 5,
                                fontSize: 15,
                                color: '#03ada0',
                                borderColor: '#03ada0',
                                marginTop: 15,
                            }}
                        >
                            Xem hoạt động
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    if (loading)
        return (
            <View
                style={{
                    flex: 1,
                    paddingTop: 25,
                    alignItems: 'center',
                    backgroundColor: '#fff',
                }}
            >
                <Text>Đang tải dữ liệu...</Text>
            </View>
        );

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
