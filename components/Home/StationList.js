import React, { useEffect, useState } from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { stationApi } from '../../api';

import Station from './Station';

function StationList() {
    const navigation = useNavigation();
    const window = Dimensions.get('window');
    const [data, setData] = useState([]);

    useEffect(() => {
        stationApi
            .getStations()
            .then((res) => {
                if (res.type == 'Valid') {
                    setData(res.data);
                } else {
                    console.log(res.err);
                }
            })
            .catch((err) => console.log(err));
    }, []);

    const renderItem = ({ item }) => {
        return (
            <Station
                item={item}
                onPress={() =>
                    navigation.navigate('DetailScreen', { book: item })
                }
                style={{ width: (window.width * 5) / 7 }}
            />
        );
    };

    return (
        <View>
            <FlatList
                data={data}
                horizontal={true}
                keyExtractor={(item) => item._id.toString()}
                renderItem={renderItem}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
}

export default StationList;
