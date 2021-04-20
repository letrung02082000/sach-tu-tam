import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

// import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';
import { bookApi } from '../api';

export default function ScanScreen({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [torch, setTorch] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        console.log(data);
        setScanned(true);
        setIsFetching(true);
        setTorch(false);
        bookApi
            .getBookBySku(data.toString())
            .then((response) => {
                setIsFetching(false);
                //console.log(response);
                if (response.type == 'Valid') {
                    navigation.navigate('DetailScreen', {
                        book: response.data[0],
                    });
                } else {
                    Alert.alert('Không tìm thấy sách trong kho!');
                }
            })
            .catch((error) => {
                setIsFetching(false);
                console.log(error);
                Alert.alert(`${error}`);
            });
    };

    const goBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        }
    };

    if (hasPermission === null) {
        return (
            <SafeAreaView>
                <View>
                    <Text>Requesting for camera permission</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (hasPermission === false) {
        return (
            <SafeAreaView>
                <View>
                    <Text>No access to camera</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (isFetching) {
        return (
            <SafeAreaView>
                <View>
                    <Text>Đang tìm kiếm! Bạn chờ chút nhé...</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar />
            {/* <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            /> */}
            <Camera
                style={StyleSheet.absoluteFillObject}
                flashMode={torch ? 'torch' : 'off'}
                autoFocus={'on'}
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            />

            <View style={{ position: 'absolute', top: 17, right: 15 }}>
                <TouchableOpacity
                    onPress={goBack}
                    style={{
                        backgroundColor: 'rgba(205, 205, 205, 0.5)',
                        padding: 5,
                        borderRadius: 50,
                    }}
                >
                    <Feather name='x' color='#fff' size={25} />
                </TouchableOpacity>
            </View>
            <View
                style={{
                    flex: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <View
                    style={{
                        width: 350,
                        height: 200,
                        backgroundColor: 'transparent',
                        borderColor: 'white',
                        borderWidth: 3,
                    }}
                ></View>
                <Text style={{ color: '#fff', marginTop: 15 }}>
                    Hướng camera vào mã ISBN in trên quyển sách
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                {scanned && (
                    <TouchableOpacity
                        style={[styles.scanButton]}
                        onPress={() => setScanned(false)}
                    >
                        <Text style={styles.btnText}>Nhấn để quét lại</Text>
                    </TouchableOpacity>
                )}
            </View>
            <View style={{ flex: 2 }}>
                <TouchableOpacity
                    onPress={() => {
                        setTorch(!torch);
                    }}
                >
                    <Ionicons
                        name='flashlight'
                        size={50}
                        color='#fff'
                        style={{
                            backgroundColor: 'rgba(205, 205, 205, 0.8)',
                            padding: 9,
                            borderRadius: 50,
                        }}
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },

    scanButton: {
        //flex: 1,
        backgroundColor: '#4287f5',
        paddingVertical: 15,
        paddingHorizontal: 25,
        color: '#fff',
        borderRadius: 100,
    },

    btnText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
