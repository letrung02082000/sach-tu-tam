import React from 'react';
import { View, Text } from 'react-native';

import AppLink from 'react-native-app-link';

function PaymentScreen() {
    const handlePayOrder = () => {
        const url = 'https://nhantien.momo.vn/0326637150/20000';
        //const url = 'momo://0326637150/20000';

        const config = {
            appName: 'MoMo',
            appStoreId: '918751511',
            appStoreLocale: 'vi',
            playStoreId: 'com.mservice.momotransfer',
        };
        AppLink.maybeOpenURL(url, config)
            .then(() => {
                setOpenedMomo(true);
            })
            .catch((err) => setOpenedMomo(false));
        // AppLink.openInStore(config)
        //     .then(() => console.log('aa'))
        //     .catch((err) => console.log(err));
    };

    return (
        <View>
            <Text>PaymentScreen</Text>
        </View>
    );
}

export default PaymentScreen;
