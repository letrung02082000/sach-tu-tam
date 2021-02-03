import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Modal from 'react-native-modal';

export default function CustomTabBar(props) {
    const { state, descriptors, navigation } = props;

    const selectedIndex = state.index;

    const [isSignedIn, setIsSignedIn] = useState(false);

    const navigateToHomeScreen = () => {
        navigation.navigate('HomeScreen');
    };

    const navigateToProfileScreen = () => {
        if (isSignedIn) {
            navigation.navigate('ProfileScreen');
        } else {
            navigation.navigate('SignInScreen');
        }
    };

    const navigateToScanScreen = () => {
        navigation.navigate('ScanScreen');
    };

    return (
        <View style={styles.TabBarMainContainer}>
            <TouchableOpacity
                onPress={navigateToHomeScreen}
                activeOpacity={0.6}
                style={styles.button}
            >
                <MaterialCommunityIcons
                    name='home'
                    color={selectedIndex == 0 ? '#4287f5' : '#5c5555'}
                    size={25}
                />
                <Text
                    style={
                        selectedIndex == 0
                            ? styles.profileText
                            : styles.defaultText
                    }
                >
                    Trang chủ
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={navigateToScanScreen}
                activeOpacity={0.6}
                style={styles.scanButton}
            >
                <MaterialCommunityIcons
                    name='barcode-scan'
                    color={selectedIndex == 1 ? '#4287f5' : '#5c5555'}
                    size={35}
                    style={styles.scanIcon}
                />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={navigateToProfileScreen}
                activeOpacity={0.6}
                style={styles.button}
            >
                <MaterialCommunityIcons
                    name='account-circle'
                    color={selectedIndex == 2 ? '#4287f5' : '#5c5555'}
                    size={25}
                />
                <Text
                    style={
                        selectedIndex == 2
                            ? styles.profileText
                            : styles.defaultText
                    }
                >
                    Cá nhân
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    TabBarMainContainer: {
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 50,
        flexDirection: 'row',
        width: '100%',
    },

    button: {
        height: 50,
        width: 50,
        // paddingTop: 5,
        // paddingBottom: 5,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
        fontSize: 15,
        // borderTopWidth: 3,
        // borderTopColor: '#ccc',
    },

    scanButton: {
        height: 65,
        width: 65,
        color: '#000',
        backgroundColor: '#fff',
        borderColor: '#5c5555',
        borderRadius: 50,
        borderWidth: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 21,
    },

    homeText: {
        fontSize: 11,
        color: '#4287f5',
    },

    scanText: {
        fontSize: 11,
        color: '#4287f5',
    },

    profileText: {
        fontSize: 11,
        color: '#4287f5',
    },

    defaultText: {
        fontSize: 11,
        color: '#5c5555',
    },

    scanIcon: {
        //backgroundColor: '#ccc',
    },
});
