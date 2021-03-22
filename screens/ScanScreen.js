import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BarCodeScanner } from 'expo-barcode-scanner';
import { bookApi } from '../api';

export default function ScanScreen({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        console.log(data);
        setScanned(true);
        setIsFetching(true);
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
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.scanButton} onPress={goBack}>
                    <Text style={styles.btnText}>Quay lại</Text>
                </TouchableOpacity>
                {scanned && (
                    <TouchableOpacity
                        style={[styles.scanButton, { marginLeft: 25 }]}
                        onPress={() => setScanned(false)}
                    >
                        <Text style={styles.btnText}>Quét lại</Text>
                    </TouchableOpacity>
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    scanButton: {
        //flex: 1,
        backgroundColor: '#4287f5',
        marginBottom: '30%',
        padding: 15,
        color: '#fff',
        borderRadius: 100,
        width: 150,
    },

    btnText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
