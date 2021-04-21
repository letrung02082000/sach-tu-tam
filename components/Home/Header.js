import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

import CategoryList from './CategoryList';
import BestSellerList from './BestSellerList';
import FavoriteList from './FavoriteList';
import StationList from './StationList';

export default function Header() {
    const navigation = useNavigation();
    const window = Dimensions.get('window');

    const navigateToDetail = () => {
        navigation.navigate('DetailScreen', { book: { name: 'a' } });
    };

    const navigateToCategoriesScreen = () => {
        navigation.navigate('CategoriesScreen');
    };

    const navigateToAllFavoriteBooksScreen = () => {
        navigation.navigate('AllFavoriteBooksScreen');
    };

    const navigateToAllBestsellerScreen = () => {
        navigation.navigate('AllBestsellerScreen');
    };

    return (
        <View>
            <View style={styles.categoryContainer}>
                <View
                    style={{
                        backgroundColor: '#fff',
                        borderRadius: 5,
                        marginTop: 7,
                        marginHorizontal: 5,
                        paddingBottom: 10,
                    }}
                >
                    <View style={styles.categoryHeader}>
                        <Text style={styles.headerText}>Danh mục</Text>
                        <TouchableOpacity onPress={navigateToCategoriesScreen}>
                            <Text style={styles.seeMoreText}>Tất cả</Text>
                        </TouchableOpacity>
                    </View>
                    <CategoryList />
                </View>
            </View>
            <View style={styles.mapContainer}></View>

            <View style={styles.categoryContainer}>
                <View
                    style={{
                        backgroundColor: '#fff',
                        borderRadius: 5,
                        marginTop: 7,
                        marginHorizontal: 5,
                        paddingBottom: 10,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingVertical: 15,
                            paddingHorizontal: 10,
                        }}
                    >
                        <Text style={[styles.headerText]}>Được Yêu Thích</Text>
                        <TouchableOpacity
                            onPress={navigateToAllFavoriteBooksScreen}
                        >
                            <Text style={styles.seeMoreText}>Xem thêm</Text>
                        </TouchableOpacity>
                    </View>
                    <FavoriteList />
                </View>
            </View>
            <View style={styles.categoryContainer}>
                <View
                    style={{
                        backgroundColor: '#fff',
                        borderRadius: 5,
                        marginVertical: 7,
                        marginHorizontal: 5,
                        paddingBottom: 10,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingVertical: 15,
                            paddingHorizontal: 10,
                        }}
                    >
                        <Text style={styles.headerText}>Được Đọc Nhiều</Text>
                        <TouchableOpacity
                            onPress={navigateToAllBestsellerScreen}
                        >
                            <Text style={styles.seeMoreText}>Xem thêm</Text>
                        </TouchableOpacity>
                    </View>
                    <BestSellerList />
                </View>
            </View>

            {/* <View style={styles.categoryContainer}>
                <View
                    style={{
                        backgroundColor: '#fff',
                        borderRadius: 5,
                        marginVertical: 7,
                        marginHorizontal: 5,
                        paddingBottom: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Text
                        style={[
                            styles.headerText,
                            { paddingVertical: 15, paddingHorizontal: 10 },
                        ]}
                    >
                        Tủ sách và Điểm đọc
                    </Text>
                    <MapView
                        initialRegion={{
                            latitude: 10.882413,
                            longitude: 106.781314,
                            latitudeDelta: 0.009,
                            longitudeDelta: 0.009,
                        }}
                        style={styles.map}
                    >
                        <Marker
                            key={'1'}
                            coordinate={{
                                latitude: 10.882413,
                                longitude: 106.781314,
                            }}
                            // title={'Tủ sách Từ Tâm'}
                            // description={marker.description}
                        />
                    </MapView>
                    <TouchableOpacity style={{ marginVertical: 5 }}>
                        <Text
                            style={{
                                fontSize: 15,
                                fontWeight: 'bold',
                                color: '#003399',
                                marginTop: 10,
                                padding: 10,
                            }}
                        >
                            Tìm điểm đọc gần bạn
                        </Text>
                    </TouchableOpacity>
                </View>
            </View> */}

            <View style={styles.categoryContainer}>
                <View
                    style={{
                        backgroundColor: '#fff',
                        borderRadius: 5,
                        marginVertical: 7,
                        marginHorizontal: 5,
                        paddingBottom: 10,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingVertical: 15,
                            paddingHorizontal: 10,
                        }}
                    >
                        <Text style={styles.headerText}>
                            Tủ sách và điểm đọc
                        </Text>
                        {/* <TouchableOpacity
                            onPress={navigateToAllBestsellerScreen}
                        >
                            <Text style={styles.seeMoreText}>Xem thêm</Text>
                        </TouchableOpacity> */}
                    </View>
                    <StationList />
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity style={{ marginVertical: 5 }}>
                            <Text
                                style={{
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                    color: '#003399',
                                    marginTop: 10,
                                    padding: 10,
                                }}
                            >
                                Tìm điểm đọc gần bạn
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={styles.allBookHeader}>
                <Text
                    style={[
                        styles.headerText,
                        { paddingVertical: 15, paddingHorizontal: 10 },
                    ]}
                >
                    Tất Cả Sách
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    categoryContainer: {
        backgroundColor: '#ccc',
    },

    categoryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 9,
        paddingVertical: 15,
    },

    headerText: { fontSize: 17, fontWeight: 'bold' },

    allBookHeader: {
        marginHorizontal: 10,
        marginTop: 10,
        backgroundColor: '#fff',
    },

    mapContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    map: {
        width: Dimensions.get('window').width - 20,
        height: 210,
    },

    seeMoreText: {
        textTransform: 'uppercase',
        color: '#003399',
        fontWeight: 'bold',
        marginRight: 5,
    },
});
