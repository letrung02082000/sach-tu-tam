import React from 'react';
import {
    View,
    FlatList,
    TouchableOpacity,
    Image,
    Text,
    StyleSheet,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SeeMoreButton = () => {
    return (
        <TouchableOpacity>
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
            'https://cf.shopee.co.id/file/65164c330fe5dcd4b549c26ba132b082_mdpi',
        title2: 'Kỹ năng sống',
        image2:
            'https://cf.shopee.co.id/file/c5b56ff42e59c067f6ff42b7f8bf8ebb_mdpi',
    },
    {
        id: 2,
        title: 'Văn học',
        title2: 'Học ngoại ngữ',
        image:
            'https://cf.shopee.co.id/file/28af3bde68e263fbb22cf7e721995aca_mdpi',
        image2:
            'https://cf.shopee.co.id/file/45d56e0479139407d21058ebf0db2c18_mdpi',
    },
    {
        id: 3,
        image:
            'https://cf.shopee.co.id/file/67f3e3f21980f16e56708f90ac824677_mdpi',
        title: 'Giáo khoa - giáo trình',
        image2:
            'https://cf.shopee.co.id/file/1adc3f8eb48e266fbb2c7a6f96b07632_mdpi',
        title2: 'Văn hoá - địa lý',
    },
    {
        id: 4,
        image:
            'https://cf.shopee.co.id/file/2141bfac013f0ddec9edcead24c5dd3a_mdpi',
        title: 'Khoa học - kỹ thuật',
        image2:
            'https://cf.shopee.co.id/file/73cd5727e938469f3a76e75063b38651_mdpi',
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
                        marginTop: 15,
                        marginBottom: 15,
                        justifyContent: 'center',
                        width: 85,
                        height: 85,
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
                            style={{ width: 50, height: 50 }}
                        />
                        <Text
                            numberOfLines={2}
                            style={{
                                fontSize: 13,
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
                        width: 85,
                        height: 85,
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
                            style={{ width: 50, height: 50 }}
                        />
                        <Text
                            style={{
                                fontSize: 13,
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
