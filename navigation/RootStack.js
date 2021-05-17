import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeTabs from './HomeTabs';

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import DetailScreen from '../screens/DetailScreen';
import SearchScreen from '../screens/SearchScreen';
import CartScreen from '../screens/CartScreen';
import OrderScreen from '../screens/OrderScreen';
import ScanScreen from '../screens/ScanScreen';
import AllCategoriesScreen from '../screens/AllCategoriesScreen';
import PaymentScreen from '../screens/PaymentScreen';
import AllBooksScreen from '../screens/AllBooksScreen';
import DescriptionScreen from '../screens/DescriptionScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import DetailPostScreen from '../screens/DetailPostScreen';
import DetailEventScreen from '../screens/DetailEventScreen';
import CommentScreen from '../screens/CommentScreen';
import ReviewScreen from '../screens/ReviewScreen';
import JoinEventScreen from '../screens/JoinEventScreen';
import MyOrdersScreen from '../screens/MyOrdersScreen';
import MyEventsScreen from '../screens/MyEventsScreen';
import MyDonationsScreen from '../screens/MyDonationsScreen';
import UpdateInfoScreen from '../screens/UpdateInfoScreen';
import DonateScreen from '../screens/DonateScreen';
import AllBestsellerScreen from '../screens/AllBestsellerScreen';
import AllFavoriteBooksScreen from '../screens/AllFavoriteBooksScreen';
import StationScreen from '../screens/StationScreen';
import AllStationsScreen from '../screens/AllStationsScreen';
import AllOrdersScreen from '../screens/AllOrdersScreen';
import SellBookScreen from '../screens/SellBookScreen';
import AllBookReviewsScreen from '../screens/AllBookReviewsScreen';
import DetailOrderScreen from '../screens/DetailOrderScreen';

const Stack = createStackNavigator();

export default function RootStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='HomeTabScreen'
                component={HomeTabs}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='SignInScreen'
                component={SignInScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='SignUpScreen'
                component={SignUpScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='DetailScreen'
                component={DetailScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='SearchScreen'
                component={SearchScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='CartScreen'
                component={CartScreen}
                options={{ headerShown: true, title: 'Giỏ hàng' }}
            />
            <Stack.Screen
                name='OrderScreen'
                component={OrderScreen}
                options={{
                    headerShown: true,
                    title: 'Đặt sách',
                    headerStyle: { backgroundColor: '#4287f5' },
                    headerTitleStyle: {},
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: '#66c2ff',
                    },
                    headerTintColor: '#fff',
                }}
            />
            <Stack.Screen
                name='ScanScreen'
                component={ScanScreen}
                options={{ headerShown: false, title: 'Quét sách' }}
            />
            <Stack.Screen
                name='AllCategoriesScreen'
                component={AllCategoriesScreen}
                options={{ headerShown: true, title: 'Tất cả danh mục' }}
            />
            <Stack.Screen
                name='PaymentScreen'
                component={PaymentScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='AllBooksScreen'
                component={AllBooksScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='DescriptionScreen'
                component={DescriptionScreen}
                options={{ headerShown: true, title: 'Mô tả' }}
            />
            <Stack.Screen
                name='CategoriesScreen'
                component={CategoriesScreen}
                options={{ headerShown: true, title: 'Sách theo danh mục' }}
            />
            <Stack.Screen
                name='DetailPostScreen'
                component={DetailPostScreen}
                options={{ headerShown: true, title: 'Bài viết' }}
            />
            <Stack.Screen
                name='DetailEventScreen'
                component={DetailEventScreen}
                options={{ headerShown: true, title: 'Chi tiết hoạt động' }}
            />
            <Stack.Screen
                name='CommentScreen'
                component={CommentScreen}
                options={{ headerShown: true, title: 'Bình luận' }}
            />
            <Stack.Screen
                name='ReviewScreen'
                component={ReviewScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='JoinEventScreen'
                component={JoinEventScreen}
                options={{ headerShown: true, title: 'Xác nhận tham gia' }}
            />
            <Stack.Screen
                name='MyOrdersScreen'
                component={MyOrdersScreen}
                options={{
                    headerShown: true,
                    title: 'Hoạt động mua sách của bạn',
                }}
            />
            <Stack.Screen
                name='MyDonationsScreen'
                component={MyDonationsScreen}
                options={{
                    headerShown: true,
                    title: 'Hoạt động quyên góp của bạn',
                }}
            />
            <Stack.Screen
                name='MyEventsScreen'
                component={MyEventsScreen}
                options={{
                    headerShown: true,
                    title: 'Hoạt động tình nguyện của bạn',
                }}
            />
            <Stack.Screen
                name='UpdateInfoScreen'
                component={UpdateInfoScreen}
                options={{
                    headerShown: true,
                    title: 'Cập nhật thông tin',
                }}
            />
            <Stack.Screen
                name='DonateScreen'
                component={DonateScreen}
                options={{
                    headerShown: true,
                    title: 'Quyên góp',
                }}
            />
            <Stack.Screen
                name='AllBestsellerScreen'
                component={AllBestsellerScreen}
                options={{
                    headerShown: true,
                    title: 'Sách được đọc nhiều',
                }}
            />
            <Stack.Screen
                name='AllFavoriteBooksScreen'
                component={AllFavoriteBooksScreen}
                options={{
                    headerShown: true,
                    title: 'Sách được yêu thích',
                }}
            />
            <Stack.Screen
                name='StationScreen'
                component={StationScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name='AllStationsScreen'
                component={AllStationsScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name='AllOrdersScreen'
                component={AllOrdersScreen}
                options={{
                    headerShown: true,
                    title: 'Quản lý đặt sách',
                }}
            />
            <Stack.Screen
                name='SellBookScreen'
                component={SellBookScreen}
                options={{
                    headerShown: true,
                    title: 'Liên hệ bán sách',
                }}
            />
            <Stack.Screen
                name='AllBookReviewsScreen'
                component={AllBookReviewsScreen}
                options={{
                    headerShown: true,
                    title: 'Tất cả đánh giá',
                }}
            />
            <Stack.Screen
                name='DetailOrderScreen'
                component={DetailOrderScreen}
                options={{
                    headerShown: true,
                    title: 'Chi tiết đơn sách',
                }}
            />
        </Stack.Navigator>
    );
}
