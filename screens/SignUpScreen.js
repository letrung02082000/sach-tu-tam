import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../redux/actions';

function SignUpScreen({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [invalidText, setInvalidText] = useState(false);
    const [validPassword, setValidPassword] = useState(true);
    const [isMatchPassword, setIsMatchPassword] = useState(true);
    const [secure, setSecure] = useState(true);
    const [confirmSecure, setConfirmSecure] = useState(true);

    const dispatch = useDispatch();

    const user = useSelector((state) => state.registerReducer);

    useEffect(() => {
        if (user.isFetching) {
            setLoading(true);
        } else {
            if (user.type == 'Valid') {
                if (user.status == 'Success') {
                    dispatch(userActions.registerRefresh());
                    setLoading(false);
                    Alert.alert(
                        'Đăng ký thành công',
                        'Vui lòng đăng nhập để tiếp tục'
                    );
                    navigation.navigate('SignInScreen');
                } else if (user.status == 'Fail') {
                    setLoading(false);
                    Alert.alert(
                        'Địa chỉ email đã tồn tại',
                        'Bạn có thể khôi phục mật khẩu'
                    );
                }
            } else {
                setLoading(false);
                Alert.alert('Thông tin không hợp lệ');
            }
        }
    });

    const validateEmail = (email) => {
        var ret =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return ret.test(email);
    };

    const handleNameChange = (val) => {
        const tmp = val.trim();
        setName(tmp);
    };

    const handleEmailChange = (val) => {
        if (validateEmail(val)) {
            setEmail(val);
            setValidEmail(true);
            setInvalidText(false);
        } else {
            setEmail(val);
            setValidEmail(false);
            setInvalidText(true);
        }
    };

    const handlePasswordChange = (val) => {
        if (val.length >= 8) {
            setPassword(val);
            setValidPassword(true);
        } else {
            setPassword(val);
            setValidPassword(false);
        }
    };

    const handleConfirmPasswordChange = (val) => {
        if (val === password) {
            setConfirmPassword(val);
            setIsMatchPassword(true);
        } else {
            setConfirmPassword(val);
            setIsMatchPassword(false);
        }
    };

    const updateSecure = () => {
        setSecure(!secure);
    };

    const updateConfirmSecure = () => {
        setConfirmSecure(!confirmSecure);
    };

    const handleSignupBtn = () => {
        if (name.length <= 0) {
            return Alert.alert('Vui lòng nhập tên của bạn');
        }
        if (!validEmail) {
            return Alert.alert('Địa chỉ email không hợp lệ');
        }

        if (password.length < 8) {
            return Alert.alert('Mật khẩu phải tối thiểu 8 kí tự');
        }
        if (password !== confirmPassword) {
            return Alert.alert('Mật khẩu không khớp');
        }

        dispatch(userActions.registerAction(name, email, password));
    };

    const navigateToHomeTabs = () => {
        navigation.navigate('HomeTabScreen');
    };

    return (
        <SafeAreaView>
            <ScrollView keyboardShouldPersistTaps='always'>
                <View style={styles.container}>
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
                            <Text style={styles.titleText}>Tên của bạn</Text>
                            <View style={styles.action}>
                                <FontAwesome
                                    name='user-o'
                                    color='#05375a'
                                    size={20}
                                />
                                <TextInput
                                    placeholder='Nhập họ tên đầy đủ'
                                    style={styles.textInput}
                                    autoCapitalize='words'
                                    onChangeText={handleNameChange}
                                />
                            </View>
                            <Text
                                style={[
                                    styles.titleText,
                                    {
                                        marginTop: 25,
                                    },
                                ]}
                            >
                                Địa chỉ Email
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
                                    onChangeText={handleEmailChange}
                                />

                                {validEmail ? (
                                    <Animatable.View animation='bounceIn'>
                                        <FontAwesome
                                            name='check-circle'
                                            color='green'
                                            size={20}
                                        />
                                    </Animatable.View>
                                ) : null}
                            </View>

                            {invalidText ? (
                                <Animatable.View
                                    animation='fadeInLeft'
                                    duration={500}
                                >
                                    <Text style={styles.errorMsg}>
                                        Địa chỉ email không hợp lệ
                                    </Text>
                                </Animatable.View>
                            ) : null}

                            <Text
                                style={[
                                    styles.titleText,
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
                                    secureTextEntry={secure}
                                    style={styles.textInput}
                                    autoCapitalize='none'
                                    onChangeText={handlePasswordChange}
                                />
                                <TouchableOpacity onPress={updateSecure}>
                                    {secure ? (
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

                            {validPassword ? null : (
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
                                    styles.titleText,
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
                                        confirmSecure ? true : false
                                    }
                                    style={styles.textInput}
                                    autoCapitalize='none'
                                    onChangeText={(val) =>
                                        handleConfirmPasswordChange(val)
                                    }
                                />
                                <TouchableOpacity onPress={updateConfirmSecure}>
                                    {confirmSecure ? (
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

                            {isMatchPassword ? null : (
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
                                {loading ? (
                                    <TouchableOpacity style={styles.signIn}>
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
                                                Vui lòng chờ...
                                            </Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity
                                        style={styles.signIn}
                                        onPress={() => {
                                            handleSignupBtn();
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
                                )}

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

    titleText: {
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
