import React from 'react';
import {
    View,
    FlatList,
    TouchableOpacity,
    Image,
    Text,
    StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SeeMoreButton = () => {
    const navigation = useNavigation();
    const navigateToAllCategoriesScreen = () =>
        navigation.navigate('AllCategoriesScreen');
    return (
        <TouchableOpacity onPress={navigateToAllCategoriesScreen}>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#003399',
                        borderRadius: 100,
                        width: 50,
                        height: 50,
                    }}
                >
                    <FontAwesome name='angle-right' size={20} color='#fff' />
                </View>
                <Text style={{ color: '#003399', fontWeight: 'bold' }}>
                    Xem thêm
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const DATA = [
    {
        id: 1,
        title: 'Kinh tế',
        image:
            'https://cdn0.fahasa.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/i/m/image_181505.jpg',
        title2: 'Kỹ năng sống',
        image2:
            'https://cdn0.fahasa.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/u/n/untitled-2_67.jpg',
    },
    {
        id: 2,
        title: 'Văn học',
        title2: 'Học ngoại ngữ',
        image:
            'https://cdn0.fahasa.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/i/m/image_180771.jpg',
        image2:
            'https://cdn0.fahasa.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/i/m/image_216419.jpg',
    },
    {
        id: 3,
        image:
            'https://cdn0.fahasa.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/i/m/image_222872.jpg',
        title: 'Giáo khoa - giáo trình',
        image2:
            'https://cdn0.fahasa.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/i/m/image_195509_1_45299.jpg',
        title2: 'Văn hoá - địa lý',
    },
    {
        id: 4,
        image:
            'https://cdn0.fahasa.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/i/m/image_195509_1_32556.jpg',
        title: 'Khoa học - kỹ thuật',
        image2:
            'https://cdn0.fahasa.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/8/9/8936071674074_1_1.jpg',
        title2: 'Lịch sử',
    },
    // {
    //     id: 5,
    //     image:
    //         'https://cf.shopee.co.id/file/ed12a75188e87fa8e2abdd22987817cd_mdpi',
    //     title: '',
    //     image2:
    //         'https://cf.shopee.co.id/file/31ae2807a3ba16f6d178d790984ad364_mdpi',
    //     title2: 'Elektronik Center',
    // },
    // {
    //     id: 6,
    //     image:
    //         'https://cf.shopee.co.id/file/76d3682ef1e8d6509884396c76882b19_mdpi',
    //     title: 'Shopee Mart',
    //     image2:
    //         'https://cf.shopee.co.id/file/eda88d3aeb6b530fb474748b3745b2eb_mdpi',
    //     title2: 'Bayar Di Tempat',
    // },
    // {
    //     id: 7,
    //     image:
    //         'https://cf.shopee.co.id/file/02d68f4802d362eebc2651cf5fffc818_mdpi',
    //     title: 'Garansi',
    //     image2:
    //         'https://cf.shopee.co.id/file/089a2d01c0eec65b4dd8868eb9744457_mdpi',
    //     title2: 'Shopee24',
    // },
    // {
    //     id: 8,
    //     image:
    //         'https://cf.shopee.co.id/file/3cdb64f61f85872896dc005831022c5c_mdpi',
    //     title: 'Pastin Ada',
    //     image2:
    //         'https://cf.shopee.co.id/file/cbd3190664937ba29777128f396c54a7_mdpi',
    //     title2: 'Shopee Grosir',
    // },
    // {
    //     id: 9,
    //     image:
    //         'https://cf.shopee.co.id/file/739145261c83cb94365a04092a2a3d99_mdpi',
    //     title: 'Koin Receh',
    //     image2:
    //         'https://cf.shopee.co.id/file/92adf331a35427749be394080dcdb076_mdpi',
    //     title2: 'Promo Bank',
    // },
    // {
    //     id: 10,
    //     image:
    //         'https://cf.shopee.co.id/file/28f927fafe477945932b2cb571023be7_mdpi',
    //     title: 'More',
    //     image2:
    //         'https://cf.shopee.co.id/file/063614d109a1921becac69eb6fafdba7_mdpi',
    //     title2: 'Semua Promo',
    // },
];

export default function CategoryList() {
    const renderItem = ({ item }) => {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 5 }}>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        marginHorizontal: 10,
                        marginTop: 10,
                        marginBottom: 15,
                        justifyContent: 'center',
                        width: 100,
                        height: 100,
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                        }}
                    >
                        <Image
                            source={{ uri: item.image }}
                            style={{ width: 75, height: 75 }}
                        />
                        <Text
                            numberOfLines={2}
                            style={{
                                fontSize: 15,
                                textAlign: 'center',
                                color: '#000',
                            }}
                        >
                            {item.title}
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        marginHorizontal: 10,
                        marginBottom: 15,
                        justifyContent: 'center',
                        width: 100,
                        height: 100,
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                        }}
                    >
                        <Image
                            source={{ uri: item.image2 }}
                            style={{ width: 75, height: 75 }}
                        />
                        <Text
                            style={{
                                fontSize: 15,
                                textAlign: 'center',
                                color: '#000',
                            }}
                        >
                            {item.title2}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View>
            <FlatList
                data={DATA}
                horizontal={true}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                showsHorizontalScrollIndicator={false}
                ListFooterComponent={SeeMoreButton}
                ListFooterComponentStyle={styles.seeMoreContainer}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    seeMoreContainer: {
        justifyContent: 'center',
        backgroundColor: '#fff',
        width: 90,
    },
});
