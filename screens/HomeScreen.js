import React, { useState, useEffect } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    StatusBar,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useDispatch, useSelector } from 'react-redux';
import { bookActions } from '../redux/actions/book.actions';

const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
        <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
);

export default function HomeScreen({ navigation }) {
    const [selectedId, setSelectedId] = useState(null);

    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';

        return (
            <Item
                item={item}
                onPress={() => setSelectedId(item.id)}
                style={{ backgroundColor }}
            />
        );
    };

    const dispatch = useDispatch();
    const allBooks = useSelector((state) => state.bookReducer);

    useEffect(() => {
        dispatch(bookActions.getAllBooksAction());
    }, []);

    if (allBooks.isFetching) {
        return (
            <View>
                <Text>is fetching...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView>
            <Text style={styles.headerTitle}>Sách Từ Tâm</Text>
            <Text>Tất cả sách</Text>
            {allBooks.hasError ? (
                <Text>Some errors occured</Text>
            ) : (
                <FlatList
                    data={allBooks.data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id}
                    extraData={selectedId}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    headerTitle: {
        backgroundColor: 'blue',
        color: '#fff',
        textAlign: 'center',
    },
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});
