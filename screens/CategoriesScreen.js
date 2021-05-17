import React, { useEffect, useState } from 'react';
import {
    View,
    SafeAreaView,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { bookApi } from '../api';

import BookItem from '../components/Home/BookItem';

function CategoriesScreen({ navigation }) {
    const [catBooks, setCatBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const window = Dimensions.get('window');

    useEffect(() => {
        setLoading(true);
        bookApi.getBooksByCategories().then(
            (res) => {
                if (res.type == 'Valid') {
                    setCatBooks(res.data);
                    setLoading(false);
                } else {
                }
            },
            (err) => console.log(err)
        );
    }, []);

    const navigateToAllBooksScreen = (id, title) => {
        navigation.navigate('AllBooksScreen', { id, title });
    };

    const navigateToDetailScreen = (item) => {
        navigation.navigate('DetailScreen', { book: item });
    };

    if (loading)
        return (
            <View
                style={{
                    flex: 1,
                    paddingTop: 25,
                    alignItems: 'center',
                    backgroundColor: '#fff',
                }}
            >
                <Text>Đang tải dữ liệu...</Text>
            </View>
        );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{ flex: 1 }}>
                {catBooks.map((child, index) => {
                    if (child.data.length == 0) return null;
                    return (
                        <View
                            key={child.title}
                            style={{
                                alignItems: 'center',
                                marginBottom: 15,
                                marginTop: 25,
                            }}
                        >
                            <Text style={styles.headerIext}>{child.title}</Text>
                            <View style={styles.bookList}>
                                {child.data.map((item, index) => {
                                    return (
                                        <BookItem
                                            item={item}
                                            key={item._id}
                                            style={{
                                                width: window.width / 2 - 10,
                                            }}
                                            onPress={() =>
                                                navigateToDetailScreen(item)
                                            }
                                        />
                                    );
                                })}
                            </View>
                            {child.data.length > 0 ? (
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: '#fff',
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        padding: 15,
                                    }}
                                    onPress={() =>
                                        navigateToAllBooksScreen(
                                            child.id,
                                            child.title
                                        )
                                    }
                                >
                                    <Text
                                        style={{
                                            textTransform: 'uppercase',
                                            color: '#003399',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        Xem tất cả
                                    </Text>
                                </TouchableOpacity>
                            ) : null}
                        </View>
                    );
                })}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    bookList: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
    },

    headerIext: {
        justifyContent: 'center',
        padding: 10,
        marginBottom: 25,
        borderRadius: 9,
        borderWidth: 2,
        fontSize: 21,
        fontWeight: 'bold',
        textAlign: 'center',
        width: 250,
        color: '#03ada0',
        borderColor: '#03ada0',
    },
});

export default CategoriesScreen;
