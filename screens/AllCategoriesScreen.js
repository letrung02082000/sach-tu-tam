import React from 'react';
import {
    SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    Text,
    StatusBar,
    Dimensions,
} from 'react-native';

import { useSelector } from 'react-redux';

import AntDesign from 'react-native-vector-icons/AntDesign';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const Item = ({ title, style, index }) => {
    const color = [
        '#E1515A',
        '#46b1c9',
        '#2D82B7',
        '#42E2B8',
        '#D33F49',
        '#D7C0D0',
        '#EFF0D1',
        '#77BA99',
        '#858AE3',
    ];
    var colorValue = color[index % 7];

    return (
        <TouchableWithoutFeedback>
            <View style={[styles.item, style, { backgroundColor: colorValue }]}>
                <View>
                    <Text style={styles.title}>{title}</Text>
                </View>
                <View>
                    <AntDesign name='rightcircleo' size={25} color='white' />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const AllCategoriesScreen = () => {
    const allCategories = useSelector((state) => state.categoryReducer.data);
    const window = Dimensions.get('window');

    const renderItem = ({ item, index }) => (
        <Item
            title={item.name}
            style={{ width: window.width / 2 - 14 }}
            index={index}
        />
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={allCategories}
                renderItem={renderItem}
                keyExtractor={(item) => item._id.toString()}
                numColumns={2}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 0,
        backgroundColor: '#fff',
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 25,
        marginTop: 15,
        marginHorizontal: 7,
        borderRadius: 5,
        shadowColor: '#d8d4d5',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 5,
        backgroundColor: '#ccc',
    },
    title: {
        fontSize: 17,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default AllCategoriesScreen;
