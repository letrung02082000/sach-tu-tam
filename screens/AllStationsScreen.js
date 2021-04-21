import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
// import { stationApi } from '../api';

function AllStationsScreen({ route, navigation }) {
    const [data, setData] = useState(route.params);

    // useEffect(() => {
    //     stationApi
    //         .getStations()
    //         .then((res) => {
    //             if (res.type == 'Valid') {
    //                 setData(res.data);
    //             } else {
    //                 console.log(res.err);
    //             }
    //         })
    //         .catch((err) => console.log(err));
    // }, []);

    return (
        <View>
            <MapView
                initialRegion={{
                    latitude: 15,
                    longitude: 106.781314,
                    latitudeDelta: 11,
                    longitudeDelta: 11,
                }}
                style={styles.map}
            >
                {data.map((child) => {
                    return (
                        <Marker
                            key={child._id}
                            coordinate={{
                                latitude: child.latitude,
                                longitude: child.longitude,
                            }}
                            title={child.title}
                            description={child.description}
                        />
                    );
                })}
            </MapView>
        </View>
    );
}

export default AllStationsScreen;

const styles = StyleSheet.create({
    mapContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});
