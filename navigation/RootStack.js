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
                options={{ headerShown: true, title: '' }}
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
        </Stack.Navigator>
    );
}
