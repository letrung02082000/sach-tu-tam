import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const domainUrl = 'https://sach-tu-tam.herokuapp.com';

const BookItem = ({ item, onPress, style }) => {
    const imgUrl = `${domainUrl}/${item.imageurl}`;
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.item, style]}>
                <Image
                    style={{
                        width: '100%',
                        height: 210,
                        resizeMode: 'cover',
                    }}
                    source={{
                        uri: imgUrl,
                    }}
                />
                <Text style={styles.title}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default BookItem;

const styles = StyleSheet.create({
    item: {
        padding: 5,
        //marginVertical: 8,
        //marginHorizontal: 16,
    },
    title: {
        fontSize: 16,
    },
});
