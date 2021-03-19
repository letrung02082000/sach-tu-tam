import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    Dimensions,
    TouchableOpacity,
    Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Searchbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { bookApi } from '../api/book.api';

import BookItem from '../components/Home/BookItem';

function SearchScreen() {
    const navigation = useNavigation();
    const window = Dimensions.get('window');

    const [searchValue, setSearchValue] = useState('');
    const [searchData, setSearchData] = useState(false);
    const [loading, setLoading] = useState(false);
    const [empty, setEmpty] = useState(false);

    const searchBook = () => {
        setSearchData([]);
        setEmpty(false);
        setLoading(true);
        bookApi.search(searchValue).then((res) => {
            if (res.type == 'Valid') {
                setLoading(false);
                setSearchData(res.data);
            } else {
                setLoading(false);
                setEmpty(true);
            }
        });
    };

    const handleTextChange = (value) => {
        setSearchValue(value);
    };

    const renderItem = ({ item }) => {
        return (
            <View style={{ flex: 1 }}>
                <BookItem
                    item={item}
                    onPress={() =>
                        navigation.navigate('DetailScreen', {
                            book: item,
                        })
                    }
                    style={{ width: window.width / 2 }}
                />
            </View>
        );
    };

    const Header = () => {
        return (
            <View
                style={{
                    backgroundColor: '#fff',
                    marginVertical: 35,
                    marginHorizontal: 25,
                }}
            >
                <Text
                    style={{
                        color: '#4287f5',
                        backgroundColor: '#fff',
                        paddingVertical: 10,
                        fontSize: 17,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        borderWidth: 1,
                        borderRadius: 5,
                        borderColor: '#4287f5',
                    }}
                >
                    Kết quả tìm kiếm
                </Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <Searchbar
                    icon={() => {
                        return (
                            <FontAwesome5
                                name='arrow-left'
                                size={15}
                                color='#ccc'
                            />
                        );
                    }}
                    onIconPress={() => navigation.goBack()}
                    placeholder='Bạn cần tìm sách gì'
                    onChangeText={handleTextChange}
                    value={searchValue}
                    autoFocus
                    onSubmitEditing={searchBook}
                />
                {/* <View
                    style={{ justifyContent: 'center', alignItems: 'center' }}
                >
                    <TouchableOpacity>
                        <Text
                            style={{
                                backgroundColor: '#4287f5',
                                padding: 10,
                                fontSize: 15,
                                fontWeight: 'bold',
                                borderRadius: 5,
                                color: '#fff',
                                marginTop: 15,
                            }}
                            onPress={searchBook}
                        >
                            Tìm kiếm
                        </Text>
                    </TouchableOpacity>
                </View> */}
                {loading ? (
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: '#E7DFDD',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text>Đang tìm kiếm...</Text>
                        <Image
                            source={require('../assets/loadingcat.gif')}
                            style={{
                                width: window.width - 250,
                                height: 150,
                                resizeMode: 'contain',
                            }}
                        />
                    </View>
                ) : null}
                {empty ? (
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: '#E7DFDD',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Image
                            source={require('../assets/fatcat.gif')}
                            style={{
                                width: window.width - 250,
                                height: 150,
                                resizeMode: 'contain',
                            }}
                        />
                        <Text
                            style={{
                                marginTop: 50,
                                fontSize: 17,
                                fontWeight: 'bold',
                                color: '#2e3338',
                            }}
                        >
                            Rất tiếc!
                        </Text>
                        <Text style={{ fontSize: 15, marginTop: 15 }}>
                            Mình hông tìm thấy quyển sách bạn muốn
                        </Text>
                    </View>
                ) : null}

                {searchData.length > 0 ? (
                    <FlatList
                        data={searchData}
                        renderItem={renderItem}
                        keyExtractor={(item) => item._id.toString()}
                        extraData={searchData}
                        numColumns={2}
                        ListHeaderComponent={Header}
                        contentContainerStyle={{
                            paddingBottom: 35,
                        }}
                    />
                ) : null}
            </View>
        </SafeAreaView>
    );
}

export default SearchScreen;
