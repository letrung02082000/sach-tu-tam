import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import convertToDate from '../utils/convertToDate';
import { useSelector } from 'react-redux';

function DetailOrderScreen({ route, navigation }) {
    const order = route.params.order;
    const date = convertToDate(order.orderDate);
    console.log(order);
    const user = useSelector((state) => state.authReducer);

    return (
        <ScrollView>
            <View
                style={{
                    backgroundColor: '#fff',
                    padding: 15,
                }}
            >
                <Text
                    style={{
                        fontSize: 17,
                        fontWeight: 'bold',
                        color: '#383838',
                    }}
                >
                    Mã Đơn Sách: {order.orderId}
                </Text>
                <Text
                    style={{
                        color: '#595959',
                        marginTop: 5,
                        fontSize: 14,
                    }}
                >
                    Ngày đặt: {date}
                </Text>
                <Text
                    style={{
                        color: '#595959',
                        fontWeight: 'bold',
                        fontSize: 15,
                        marginTop: 5,
                    }}
                >
                    {order.pending ? 'Đang xử lý' : 'Giao sách thành công'}
                </Text>
            </View>
            <View
                style={{ backgroundColor: '#fff', padding: 15, marginTop: 10 }}
            >
                <Text
                    style={{
                        fontSize: 17,
                        fontWeight: 'bold',
                        color: '#383838',
                    }}
                >
                    Thông tin người nhận
                </Text>
                <Text
                    style={{
                        fontSize: 15,
                        color: '#383838',
                        marginTop: 5,
                    }}
                >
                    {user ? user.name : null}
                </Text>
                <Text
                    style={{
                        color: '#595959',
                        marginTop: 5,
                        fontSize: 14,
                    }}
                >
                    {order.tel}
                </Text>
                <Text
                    style={{
                        color: '#595959',
                        marginTop: 5,
                        fontSize: 14,
                    }}
                >
                    {order.address}
                </Text>
            </View>
            <View
                style={{ backgroundColor: '#fff', padding: 15, marginTop: 10 }}
            >
                <Text
                    style={{
                        fontSize: 17,
                        fontWeight: 'bold',
                        color: '#383838',
                    }}
                >
                    Thông tin sách
                </Text>
                {order.bookList.map((child, index) => {
                    return (
                        <View
                            style={{
                                flexDirection: 'row',
                                paddingVertical: 10,
                                borderColor: '#ccc',
                                borderTopWidth: index > 0 ? 1 : 0,
                            }}
                            key={child._id}
                        >
                            <Image
                                source={{ uri: child.book.imageurl }}
                                style={{ height: 50, width: 50 }}
                                resizeMode='contain'
                            />
                            <View style={{ marginLeft: 10 }}>
                                <Text
                                    style={{
                                        fontSize: 17,
                                        color: '#383838',
                                    }}
                                >
                                    {child.book.name}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 15,
                                        color: '#383838',
                                        fontWeight: 'bold',
                                        marginTop: 5,
                                    }}
                                >
                                    {child.book.newprice}đ x Số lượng{': '}
                                    {child.quantity}
                                </Text>
                            </View>
                        </View>
                    );
                })}
            </View>
            <View
                style={{ backgroundColor: '#fff', padding: 15, marginTop: 10 }}
            >
                <Text
                    style={{
                        fontSize: 17,
                        fontWeight: 'bold',
                        color: '#383838',
                    }}
                >
                    Hình thức đặt sách
                </Text>
                <Text
                    style={{
                        color: '#595959',
                        marginTop: 5,
                        fontSize: 14,
                    }}
                >
                    {order.shipping
                        ? 'Giao sách tận nơi'
                        : 'Nhận sách tại tủ sách'}
                </Text>
            </View>
            <View
                style={{ backgroundColor: '#fff', padding: 15, marginTop: 10 }}
            >
                <Text
                    style={{
                        fontSize: 17,
                        fontWeight: 'bold',
                        color: '#383838',
                    }}
                >
                    Hình thức thanh toán
                </Text>
                <Text
                    style={{
                        color: '#595959',
                        marginTop: 5,
                        fontSize: 14,
                    }}
                >
                    {order.payment
                        ? 'Thanh toán trực tiếp'
                        : 'Thanh toán bằng Momo'}
                </Text>
            </View>
            <View
                style={{ backgroundColor: '#fff', padding: 15, marginTop: 10 }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingVertical: 15,
                    }}
                >
                    <Text style={{ fontSize: 15 }}>Tạm tính</Text>
                    <Text style={{ fontSize: 15 }}>
                        {order.total}{' '}
                        <Text style={{ textDecorationLine: 'underline' }}>
                            đ
                        </Text>
                    </Text>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        borderTopWidth: 1,
                        borderColor: '#ccc',
                        paddingVertical: 15,
                    }}
                >
                    <Text style={{ fontSize: 15 }}>Phí giao hàng</Text>
                    <Text style={{ fontSize: 15 }}>
                        {order.shipping ? (
                            <Text>
                                {order.shippingfee ? (
                                    <Text>
                                        {order.shippingfee}{' '}
                                        <Text
                                            style={{
                                                textDecorationLine: 'underline',
                                            }}
                                        >
                                            đ
                                        </Text>
                                    </Text>
                                ) : (
                                    'Đang cập nhật'
                                )}
                            </Text>
                        ) : (
                            'Không có'
                        )}
                    </Text>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 5,
                        borderTopWidth: 1,
                        borderColor: '#ccc',
                        paddingVertical: 15,
                    }}
                >
                    <Text style={{ fontSize: 15 }}>Tổng cộng</Text>
                    <Text style={{ fontSize: 15 }}>
                        {order.shipping
                            ? order.total + order.shippingfee
                            : order.total}{' '}
                        <Text
                            style={{
                                textDecorationLine: 'underline',
                            }}
                        >
                            đ
                        </Text>
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}

export default DetailOrderScreen;
