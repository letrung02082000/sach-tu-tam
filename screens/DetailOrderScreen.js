import React from 'react';
import { View, Text, Image } from 'react-native';
import convertToDate from '../utils/convertToDate';
import { useSelector } from 'react-redux';

function DetailOrderScreen({ route, navigation }) {
    const order = route.params.order;
    const date = convertToDate(order.orderDate);
    console.log(order);
    const user = useSelector((state) => state.authReducer);

    return (
        <View>
            <View>
                <Text>Mã đơn sách: {order.orderId}</Text>
                <Text>Ngày đặt: {date}</Text>
                <Text>
                    {order.pending ? 'Đang xử lý' : 'Giao sách thành công'}
                </Text>
            </View>
            <View>
                <Text>Thông tin người nhận</Text>
                <Text>{user ? user.name : null}</Text>
                <Text>{order.tel}</Text>
                <Text>{order.address}</Text>
            </View>
            <View>
                <Text>Thông tin sách</Text>
                {order.bookList.map((child) => {
                    return (
                        <View
                            style={{ flexDirection: 'row', marginBottom: 10 }}
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
            <View>
                <Text>Hình thức đặt sách</Text>
                <Text>
                    {order.shipping
                        ? 'Giao sách tận nơi'
                        : 'Nhận sách tại tủ sách'}
                </Text>
            </View>
            <View>
                <Text>Hình thức thanh toán</Text>
                <Text>
                    {order.payment
                        ? 'Thanh toán trực tiếp'
                        : 'Thanh toán bằng Momo'}
                </Text>
            </View>
            <View>
                <Text>Tạm tính: {order.total}</Text>
                <Text>
                    Phí giao hàng:{' '}
                    {order.shipping ? (
                        <Text>
                            {order.shippingfee
                                ? order.shippingfee
                                : 'Đang cập nhật'}
                        </Text>
                    ) : (
                        'Không có'
                    )}
                </Text>
            </View>
            <View>
                <Text>Tổng cộng: {order.total + order.shippingfee}</Text>
            </View>
        </View>
    );
}

export default DetailOrderScreen;
