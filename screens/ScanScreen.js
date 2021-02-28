import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Button,
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
                    <Text>Scan successfully. Waiting for fetching data...</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <BarCodeScanner
                    onBarCodeScanned={
                        scanned ? undefined : handleBarCodeScanned
                    }
                    style={StyleSheet.absoluteFillObject}
                />
                {scanned && (
                    <Button
                        title={'Tap to Scan Again'}
                        onPress={() => setScanned(false)}
                    />
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
