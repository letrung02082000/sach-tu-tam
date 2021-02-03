import React from 'react';
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
    Alert,
    SafeAreaView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

function SignUpScreen({ navigation }) {
    const [data, setData] = React.useState({
        username: '',
        password: '',
        confirm_password: '',
        check_textInputChange: true,
        isValidUser: false,
        isValidPassword: true,
        isMatchPassword: true,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
    });

    const validateEmail = (email) => {
        var ret = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return ret.test(email);
    };

    const textInputChange = (val) => {
        if (validateEmail(val)) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true,
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false,
            });
        }
    };

    const handlePasswordChange = (val) => {
        if (val.length >= 8) {
            setData({
                ...data,
                password: val,
                isValidPassword: true,
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false,
            });
        }
    };

    const handleConfirmPasswordChange = (val) => {
        if (val === data.password) {
            setData({
                ...data,
                confirm_password: val,
                isMatchPassword: true,
            });
        } else {
            setData({
                ...data,
                confirm_password: val,
                isMatchPassword: false,
            });
        }
    };

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry,
        });
    };

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry,
        });
    };

    const handleSignupBtn = (username, password) => {
        if (data.isMatchPassword && password.length >= 8 && data.isValidUser) {
            navigation.navigate('AuthEmailScreen');
        } else {
            Alert.alert('Thông tin không hợp lệ. Vui lòng kiểm tra lại.');
        }
    };

    const navigateToHomeTabs = () => {
        navigation.navigate('HomeTabScreen');
    };

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <StatusBar
                        backgroundColor='#009387'
                        barStyle='light-content'
                    />
                    <View style={styles.header}>
                        <TouchableOpacity
                            onPress={navigateToHomeTabs}
                            style={styles.xButton}
                        >
                            <Feather name='x' color='#fff' size={25} />
                        </TouchableOpacity>
                        <Text style={styles.text_header}>Xin chào!</Text>
                    </View>
                    <Animatable.View
                        animation='fadeInUpBig'
                        style={styles.footer}
                    >
                        <ScrollView>
                            <Text style={styles.text_footer}>
                                Tên đăng nhập
                            </Text>
                            <View style={styles.action}>
                                <FontAwesome
                                    name='user-o'
                                    color='#05375a'
                                    size={20}
                                />
                                <TextInput
                                    placeholder='Nhập địa chỉ email'
                                    style={styles.textInput}
                                    autoCapitalize='none'
                                    onChangeText={textInputChange}
                                />
                                {data.isValidUser ? (
                                    <Animatable.View animation='bounceIn'>
                                        <FontAwesome
                                            name='check-circle'
                                            color='green'
                                            size={20}
                                        />
                                    </Animatable.View>
                                ) : null}
                            </View>

                            {data.check_textInputChange ? null : (
                                <Animatable.View
                                    animation='fadeInLeft'
                                    duration={500}
                                >
                                    <Text style={styles.errorMsg}>
                                        Địa chỉ email không hợp lệ
                                    </Text>
                                </Animatable.View>
                            )}

                            <Text
                                style={[
                                    styles.text_footer,
                                    {
                                        marginTop: 25,
                                    },
                                ]}
                            >
                                Mật khẩu
                            </Text>
                            <View style={styles.action}>
                                <Feather
                                    name='lock'
                                    color='#05375a'
                                    size={20}
                                />
                                <TextInput
                                    placeholder='Nhập mật khẩu'
                                    secureTextEntry={
                                        data.secureTextEntry ? true : false
                                    }
                                    style={styles.textInput}
                                    autoCapitalize='none'
                                    onChangeText={handlePasswordChange}
                                />
                                <TouchableOpacity
                                    onPress={updateSecureTextEntry}
                                >
                                    {data.secureTextEntry ? (
                                        <Feather
                                            name='eye-off'
                                            color='grey'
                                            size={20}
                                        />
                                    ) : (
                                        <Feather
                                            name='eye'
                                            color='grey'
                                            size={20}
                                        />
                                    )}
                                </TouchableOpacity>
                            </View>

                            {data.isValidPassword ? null : (
                                <Animatable.View
                                    animation='fadeInLeft'
                                    duration={500}
                                >
                                    <Text style={styles.errorMsg}>
                                        Mật khẩu phải dài hơn 8 ký tự
                                    </Text>
                                </Animatable.View>
                            )}

                            <Text
                                style={[
                                    styles.text_footer,
                                    {
                                        marginTop: 35,
                                    },
                                ]}
                            >
                                Xác nhận mật khẩu
                            </Text>
                            <View style={styles.action}>
                                <Feather
                                    name='lock'
                                    color='#05375a'
                                    size={20}
                                />
                                <TextInput
                                    placeholder='Nhập lại mật khẩu của bạn'
                                    secureTextEntry={
                                        data.confirm_secureTextEntry
                                            ? true
                                            : false
                                    }
                                    style={styles.textInput}
                                    autoCapitalize='none'
                                    onChangeText={(val) =>
                                        handleConfirmPasswordChange(val)
                                    }
                                />
                                <TouchableOpacity
                                    onPress={updateConfirmSecureTextEntry}
                                >
                                    {data.secureTextEntry ? (
                                        <Feather
                                            name='eye-off'
                                            color='grey'
                                            size={20}
                                        />
                                    ) : (
                                        <Feather
                                            name='eye'
                                            color='grey'
                                            size={20}
                                        />
                                    )}
                                </TouchableOpacity>
                            </View>

                            {data.isMatchPassword ? null : (
                                <Animatable.View
                                    animation='fadeInLeft'
                                    duration={500}
                                >
                                    <Text style={styles.errorMsg}>
                                        Mật khẩu không khớp
                                    </Text>
                                </Animatable.View>
                            )}

                            <View style={styles.textPrivate}>
                                <Text style={styles.color_textPrivate}>
                                    Bằng cách nhấn Đăng ký, bạn đồng ý với
                                </Text>
                                <Text
                                    style={[
                                        styles.color_textPrivate,
                                        { fontWeight: 'bold' },
                                    ]}
                                >
                                    {' '}
                                    Điều khoản
                                </Text>
                                <Text style={styles.color_textPrivate}>
                                    {' '}
                                    và
                                </Text>
                                <Text
                                    style={[
                                        styles.color_textPrivate,
                                        { fontWeight: 'bold' },
                                    ]}
                                >
                                    {' '}
                                    Chính sách
                                </Text>
                                <Text style={styles.color_textPrivate}>
                                    {' '}
                                    của chúng tôi.
                                </Text>
                            </View>
                            <View style={styles.button}>
                                <TouchableOpacity
                                    style={styles.signIn}
                                    onPress={() => {
                                        handleSignupBtn(
                                            data.username,
                                            data.password
                                        );
                                    }}
                                >
                                    <LinearGradient
                                        colors={['#08d4c4', '#01ab9d']}
                                        style={styles.signIn}
                                    >
                                        <Text
                                            style={[
                                                styles.textSign,
                                                {
                                                    color: '#fff',
                                                },
                                            ]}
                                        >
                                            Đăng ký
                                        </Text>
                                    </LinearGradient>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => navigation.goBack()}
                                    style={[
                                        styles.signIn,
                                        {
                                            borderColor: '#009387',
                                            borderWidth: 1,
                                            marginTop: 15,
                                        },
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.textSign,
                                            {
                                                color: '#009387',
                                            },
                                        ]}
                                    >
                                        Đăng nhập
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </Animatable.View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387',
    },

    header: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 50,
    },

    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,
    },

    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30,
    },

    text_footer: {
        color: '#05375a',
        fontSize: 18,
    },

    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },

    action: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
    },

    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : 5,
        padding: 10,
        color: '#05375a',
    },

    button: {
        alignItems: 'center',
        marginTop: 50,
    },

    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },

    textSign: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20,
    },

    color_textPrivate: {
        color: 'grey',
    },

    successMsg: {
        color: 'green',
        fontSize: 14,
    },

    xButton: {
        width: 30,
    },
});
