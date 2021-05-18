import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Alert,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

//import for theme
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from '@react-navigation/native';

//import redux
import { useDispatch, useSelector } from 'react-redux';
import { eventActions, userActions } from '../redux/actions';

//import screen
import LoadingScreen from './LoadingScreen';
import { postActions } from '../redux/actions/post.actions';
import { userApi } from '../api';

function SignInScreen({ navigation }) {
    const user = useSelector((state) => state.authReducer);
    const dispatch = useDispatch();
    const { colors } = useTheme();

    console.log(user);

    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secure, setSecure] = useState(true);
    const [validEmail, setValidEmail] = useState(false);
    const [invalidText, setInvalidText] = useState(false);
    const [validPassword, setValidPassword] = useState(true);

    useEffect(() => {
        if (user.isLoggedIn) {
            dispatch(postActions.refreshingAction());
            dispatch(postActions.getAllPostsAction(1, 10));
            dispatch(eventActions.refreshingAction());
            dispatch(eventActions.getAllEventsAction(1, 10));

            if (navigation.canGoBack()) {
                navigation.goBack();
            } else {
                navigation.navigate('ProfileStackScreen');
            }
        }
    });

    if (user.isLoggedIn) {
        return (
            <View style={{ flex: 1, alignItems: 'center', marginTop: 25 }}>
                <Text>Đăng nhập thành công</Text>
            </View>
        );
    }

    const validateEmail = (email) => {
        var ret =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return ret.test(email);
    };

    const textInputChange = (val) => {
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
        if (val.trim().length >= 8) {
            setPassword(val);
            setValidPassword(true);
        } else {
            setPassword(val);
            setValidPassword(false);
        }
    };

    const updateSecureTextEntry = () => {
        setSecure(!secure);
    };

    const handleLogin = () => {
        if (email.trim().length === 0) {
            return Alert.alert('Bạn chưa nhập địa chỉ email');
        }

        if (!validateEmail(email))
            return Alert.alert('Địa chỉ email không hợp lệ');

        if (password.length < 8)
            return Alert, alert('Mật khẩu phải tối thiểu 8 ký tự');

        setLoading(true);

        userApi.login(email, password).then((res) => {
            if (res.type == 'Valid') {
                if (res.status == 'Success') {
                    setLoading(false);
                    dispatch(userActions.loginSuccessAction(res.data));
                } else {
                    setLoading(false);
                    Alert.alert(
                        'Đăng nhập thất bại',
                        'Email hoặc mật khẩu không đúng'
                    );
                }
            } else {
                Alert.alert(
                    'Đăng nhập thất bại',
                    'Email hoặc mật khẩu không đúng'
                );
                setLoading(false);
            }
        });
    };

    const navigateToHomeTabs = () => {
        navigation.navigate('HomeTabScreen');
    };

    return (
        <SafeAreaView>
            <ScrollView keyboardShouldPersistTaps={'handled'}>
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
                        style={[
                            styles.footer,
                            {
                                backgroundColor: colors.background,
                            },
                        ]}
                    >
                        <Text
                            style={[
                                styles.text_footer,
                                {
                                    color: colors.text,
                                },
                            ]}
                        >
                            Tên đăng nhập
                        </Text>
                        <View style={styles.action}>
                            <FontAwesome
                                name='user-o'
                                color={colors.text}
                                size={20}
                            />
                            <TextInput
                                placeholder='Nhập địa chỉ email'
                                placeholderTextColor='#666666'
                                style={[
                                    styles.textInput,
                                    {
                                        color: colors.text,
                                    },
                                ]}
                                autoCapitalize='none'
                                onChangeText={(val) => textInputChange(val)}
                                value={email}
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
                                styles.text_footer,
                                {
                                    color: colors.text,
                                    marginTop: 35,
                                },
                            ]}
                        >
                            Mật khẩu
                        </Text>
                        <View style={styles.action}>
                            <Feather
                                name='lock'
                                color={colors.text}
                                size={20}
                            />
                            <TextInput
                                placeholder='Nhập mật khẩu'
                                placeholderTextColor='#666666'
                                secureTextEntry={secure ? true : false}
                                style={[
                                    styles.textInput,
                                    {
                                        color: colors.text,
                                    },
                                ]}
                                autoCapitalize='none'
                                onChangeText={(val) =>
                                    handlePasswordChange(val)
                                }
                            />
                            <TouchableOpacity onPress={updateSecureTextEntry}>
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
                                    Mật khẩu phải dài ít nhất 8 ký tự
                                </Text>
                            </Animatable.View>
                        )}

                        {/* <TouchableOpacity>
                            <Text style={{ color: '#009387', marginTop: 15 }}>
                                Khôi phục mật khẩu
                            </Text>
                        </TouchableOpacity> */}
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
                                        handleLogin();
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
                                            Đăng nhập
                                        </Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            )}

                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('SignUpScreen')
                                }
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
                                    Đăng ký ngay
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Animatable.View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default SignInScreen;

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
        flex: 3,
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

    action: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
    },

    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5,
    },

    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : 5,
        padding: 10,
        color: '#05375a',
    },

    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
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

    xButton: {
        width: 30,
        zIndex: 99,
    },
});
