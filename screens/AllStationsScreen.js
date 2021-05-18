import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text, Image } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

function AllStationsScreen({ route, navigation }) {
    const [data, setData] = useState(route.params);
    const [location, setLocation] = useState({
        coords: { latitude: 15, longitude: 106.781314 },
    });
    const [success, setSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

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

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            setSuccess(true);
        })();
    }, []);

    return (
        <View>
            {success ? (
                <MapView
                    initialRegion={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
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
                    <Marker
                        coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        }}
                        title={'Vị trí của bạn'}
                    >
                        <Image
                            source={require('../assets/location.png')}
                            style={{ width: 45, height: 45 }}
                            resizeMode='contain'
                        />
                    </Marker>
                </MapView>
            ) : (
                <MapView
                    initialRegion={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
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
            )}
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
