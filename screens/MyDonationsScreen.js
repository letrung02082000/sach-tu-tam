import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { userApi } from '../api';

function MyDonationsScreen() {
    const [myDonations, setMyDonations] = useState([]);

    useEffect(() => {
        userApi.getAllDonations().then((res) => {
            if (res.type == 'Valid') {
                setMyDonations(res.data);
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
                    {item.content} +{' '}
                    {item.pending ? 'đang chờ duyệt' : item.point}
                </Text>
            </View>
        );
    };

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
