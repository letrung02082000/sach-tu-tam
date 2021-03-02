import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Searchbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

function SearchScreen() {
    const navigation = useNavigation();

    const [searchValue, setSearchValue] = useState(null);
    const handleTextChange = (value) => {
        setSearchValue(value);
    };
    return (
        <SafeAreaView>
            <View>
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
                />
            </View>
        </SafeAreaView>
    );
}

export default SearchScreen;
