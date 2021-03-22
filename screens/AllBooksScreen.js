import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    Text,
    Dimensions,
} from 'react-native';
import { bookApi } from '../api';
import BookItem from '../components/Home/BookItem';

const AllBooksScreen = ({ route, navigation }) => {
    const window = Dimensions.get('window');
    const catId = route.params.id;
    const catTitle = route.params.title;

    const [data, setData] = useState(null);

    const navigateToDetailScreen = (item) => {
        navigation.navigate('DetailScreen', { book: item });
    };

    const renderItem = ({ item }) => (
        <BookItem
            item={item}
            style={{ width: window.width / 2 - 5 }}
            onPress={() => navigateToDetailScreen(item)}
        />
    );

    useEffect(() => {
        bookApi.getBooksByCategory(catId).then((res) => {
            if (res.type == 'Valid') {
                setData(res.data);
            }
        });
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.headerText}>{catTitle}</Text>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                numColumns={2}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 25,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
    headerText: {
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

export default AllBooksScreen;
