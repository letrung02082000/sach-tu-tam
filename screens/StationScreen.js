import React from 'react';
import {
    View,
    Text,
    StatusBar,
    Image,
    TouchableOpacity,
    Platform,
    Linking,
} from 'react-native';

const apiUrl = 'https://sachtutam.herokuapp.com/api';

function StationScreen({ route, navigation }) {
    const station = route.params.station;

    const scheme = Platform.select({
        ios: 'maps:0,0?q=',
        android: 'geo:0,0?q=',
    });
    const latLng = `${station.latitude},${station.longitude}`;
    const label = 'Custom Label';
    const url = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`,
    });

    const openMaps = () => {
        Linking.canOpenURL(url).then((supported) => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log("Don't know how to open URI: " + url);
            }
        });
    };

    return (
        <View>
            <StatusBar />
            <View style={{ marginTop: 5 }}>
                <Image
                    source={{ uri: station.imgurl }}
                    style={{ width: '100%', height: 170 }}
                    resizeMode='contain'
                />
                <Text>{station.title}</Text>
                <Text>{station.address}</Text>
            </View>
            <TouchableOpacity onPress={openMaps}>
                <Text>Xem vị trí trên Google Maps</Text>
            </TouchableOpacity>
        </View>
    );
}

export default StationScreen;
