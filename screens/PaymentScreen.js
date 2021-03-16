import React from 'react';
import { Button, Clipboard } from 'react-native';
import { View, Text, TouchableOpacity } from 'react-native';

import AppLink from 'react-native-app-link';

function PaymentScreen({ route, navigation }) {
    const [openedMomo, setOpenedMomo] = useState(false);
    const order = route.params;
    const handlePayOrder = () => {
        const url = `https://nhantien.momo.vn/0877876877/${order.total}`;

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

    const handleCopyButton = () => {
        Clipboard.setString(order.orderId);
    };

    return (
        <View>
            <Text>PaymentScreen</Text>
            <Text>Đặt sách thành công!</Text>
            <Text>{order.orderId}</Text>
            <Button title='Sao chép' onPress={handleCopyButton} />
            <TouchableOpacity>
                <Text onPress={handlePayOrder}>Thanh toán ngay</Text>
            </TouchableOpacity>
        </View>
    );
}

export default PaymentScreen;
