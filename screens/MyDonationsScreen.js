import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { userApi } from '../api';

function MyDonationsScreen() {
    const [myDonations, setMyDonations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        userApi.getAllDonations().then((res) => {
            if (res.type == 'Valid') {
                setMyDonations(res.data);
            } else {
                console.log(res.err);
            }
            setLoading(false);
        });
    }, []);

    const renderItem = ({ item }) => {
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
                        {item.content}
                    </Text>
                    {item.pending ? null : (
                        <Text style={{ fontSize: 15 }}>+{item.point}</Text>
                    )}
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                    }}
                >
                    <Text>Trạng thái:</Text>
                    <Text>{item.pending ? 'Đang xử lý' : 'Đã nhận'}</Text>
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
                data={myDonations}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
            />
        </View>
    );
}

export default MyDonationsScreen;
