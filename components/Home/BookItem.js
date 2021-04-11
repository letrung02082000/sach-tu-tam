import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const domainUrl = 'https://sach-tu-tam.herokuapp.com';

const BookItem = ({ item, onPress, style }) => {
    const imgUrl = item.imageurl;
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.item, style]}>
                <Image
                    style={{
                        width: '100%',
                        height: 210,
                        resizeMode: 'contain',
                    }}
                    source={{
                        uri: imgUrl,
                    }}
                />
                <Text numberOfLines={2} style={styles.title}>
                    {item.name}
                </Text>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text numberOfLines={1} style={styles.price}>
                        {item.newprice}&nbsp;
                    </Text>
                    <Text
                        style={{
                            textDecorationLine: 'underline',
                            fontWeight: 'bold',
                            fontSize: 16,
                        }}
                    >
                        đ
                    </Text>
                    <Text>
                        {' '}
                        -
                        {100 -
                            Math.round(
                                (item.newprice / item.oldprice) * 100,
                                0
                            )}
                        %
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default BookItem;

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
    },

    price: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});
