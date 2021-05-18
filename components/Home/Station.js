import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const domainUrl = 'https://sach-tu-tam.herokuapp.com';

const Station = ({ item, onPress, style }) => {
    const imgUrl = item.imgurl;
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.item, style]}>
                <Image
                    style={{
                        width: '100%',
                        height: 170,
                        resizeMode: 'cover',
                        borderRadius: 9,
                    }}
                    source={{
                        uri: imgUrl,
                    }}
                />
                <Text numberOfLines={2} style={styles.title}>
                    {item.title}
                </Text>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text numberOfLines={1}>{item.address}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default Station;

const styles = StyleSheet.create({
    item: {
        padding: 5,
        //marginVertical: 8,
        backgroundColor: '#fff',
        flex: 1,
    },
    title: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#383838',
    },
});
