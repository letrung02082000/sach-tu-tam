import React from 'react';
import {
    View,
    Text,
    StatusBar,
    Image,
    TouchableOpacity,
    Platform,
    Linking,
    Alert,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
                Alert.alert(
                    'Ứng dụng không được hỗ trợ',
                    'Vui lòng cài đặt ứng dụng Google Maps'
                );
            }
        });
    };

    return (
        <SafeAreaView>
            <ScrollView>
                <View>
                    <Image
                        source={{ uri: station.imgurl }}
                        style={{ width: '100%', height: 170 }}
                        resizeMode='contain'
                    />
                    <Text
                        style={{
                            fontSize: 21,
                            textAlign: 'center',
                            fontWeight: 'bold',
                            margin: 15,
                            color: '#383838',
                        }}
                    >
                        {station.title}
                    </Text>
                    <Text
                        style={{
                            fontSize: 15,
                            textAlign: 'center',
                            fontWeight: 'bold',
                            color: '#383838',
                        }}
                    >
                        {station.address}
                    </Text>
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 15,
                        }}
                    >
                        <TouchableOpacity
                            onPress={openMaps}
                            style={{
                                borderRadius: 5,
                                borderWidth: 1,
                                borderColor: '#009387',
                                paddingVertical: 10,
                                paddingHorizontal: 15,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                    color: '#009387',
                                }}
                            >
                                <Image
                                    source={require('../assets/mapicon.png')}
                                    style={{
                                        width: 17,
                                        height: 17,
                                    }}
                                    resizeMode='contain'
                                />{' '}
                                Xem vị trí trên bản đồ
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default StationScreen;
