import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Dimensions,
    TextInput,
    SafeAreaView,
    Image,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LoginStyles from '../Stylesheet/loginStyles';
import { API_IP } from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';

const mobileW = Dimensions.get('window').width;

const Login = ({ route }) => {

    const navigator = useNavigation();

    const [Email, setEmail] = useState('');
    const [EResult, setEResult] = useState('');
    const [Password, setPassword] = useState('');
    const [PResult, setPResult] = useState('');
    const [Hide, setHide] = useState(true);

    useEffect(() => {
        AsyncStorage.getItem('token')
            .then((token) => {
                if (token) {
                    // Data found, navigate to the home screen
                    goToHome();
                } else {
                    // No data found, stay on the login screen
                }
            })
            .catch((error) => {
                console.error('Error checking AsyncStorage:', error);
            });
    }, [])

    const handelLoginUser = () => {
        const url = `${API_IP}auth/login`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: Email,
                password: Password
            })
        })
            .then((Response) => Response.json())
            .then((json) => {
                if (json.token) {
                    console.log(json.token);
                    AsyncStorage.setItem('token', json.token);
                    console.log(json.userId);
                    AsyncStorage.setItem('userId', json.userId);
                    console.log(json.department);
                    AsyncStorage.setItem('department', json.department);
                    console.log(json.role);
                    AsyncStorage.setItem('role', json.role);
                    console.log(json.name);
                    AsyncStorage.setItem('name', json.name);
                    console.log(json.email);
                    AsyncStorage.setItem('email', json.email);
                    goToHome();
                }
                if (json.message) {
                    console.log(json.message)
                    if (Email == '') {
                        setEResult('* Email can not be empty')
                    } else {
                        setEResult('')
                    }
                    if (Password == '') {
                        setPResult('* Password can not be empty')
                    } else {
                        setPResult('* Invalid Email or Password')
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }

    const HideButton = () => {
        setHide(!Hide);
    }

    const goToHome = () => {
        // navigator.navigate('Xyz');
        navigator.reset({
            index: 0,
            routes: [{ name: 'Xyz' }],
        });
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <View
                    style={[LoginStyles.container]}>
                    <View
                        style={{ marginTop: '3%' }}>
                    </View>
                    <Image
                        source={require('./../../assets/Logo/Logo.png')}
                        style={{ width: mobileW * .8, height: mobileW * .5, resizeMode: 'contain', margin: mobileW * .1, }}
                    />
                    {/* <Text style={[
                        LoginStyles.Hedding
                    ]}>Event Horizon</Text> */}
                    <View
                        style={{ marginTop: '5%' }}>
                    </View>
                    <Text style={[
                        LoginStyles.Login
                    ]}>Login</Text>
                    <Text style={[
                        LoginStyles.LoginDesc
                    ]}>Please sign in to continue.</Text>
                    <View style={[LoginStyles.Box]}>
                        <Image
                            source={require('./../../assets/icons/email.png')}
                            style={{ width: mobileW * .08, height: mobileW * .08, margin: mobileW * .02, flex: 1, opacity: 0.5 }}
                        />
                        <TextInput
                            color={'black'}
                            placeholderTextColor={'rgba(0,0,0,0.5)'}
                            value={Email}
                            onChangeText={(Email) => setEmail(Email)}
                            placeholder={'Enter Your Email'}
                            style={{
                                flex: 8
                            }} />
                    </View>
                    {/* <View style={[LoginStyles.Box]}>
                        <TextInput
                            color={'black'}
                            placeholderTextColor={'black'}
                            value={Email}
                            onChangeText={(Email) => setEmail(Email)}
                            placeholder={'Enter Your Email'}
                            style={{
                                flex: 8
                            }} />
                    </View> */}
                    {EResult ? <Text style={[LoginStyles.Warning]}>{EResult}</Text> : null}
                    {/* <Text style={[LoginStyles.Warning]}>{EResult}</Text> */}
                    {/* <View style={[LoginStyles.Box]}>
                        <TextInput
                            color={'black'}
                            placeholderTextColor={'rgba(0,0,0,0.5)'}
                            value={Password}
                            secureTextEntry={Hide}
                            onChangeText={(Password) => setPassword(Password)}
                            placeholder={'Enter Your Password'}
                            style={{
                                flex: 7,
                            }} />
                        <TouchableOpacity onPress={HideButton}><Image
                            source={require('./../../assets/icons/hide.png')}
                            style={{ width: mobileW * .08, height: mobileW * .08, margin: mobileW * .02, flex: 1 }}
                        /></TouchableOpacity>
                    </View> */}

                    <View style={[LoginStyles.Box]}>
                        <Image
                            source={require('./../../assets/icons/padlock.png')}
                            style={{ width: mobileW * .08, height: mobileW * .08, margin: mobileW * .02, flex: 1, opacity: 0.5 }}
                        />
                        <TextInput
                            color={'black'}
                            placeholderTextColor={'rgba(0,0,0,0.5)'}
                            value={Password}
                            secureTextEntry={Hide}
                            onChangeText={(Password) => setPassword(Password)}
                            placeholder={'Enter Your Password'}
                            style={{
                                flex: 7
                            }} />
                        <TouchableOpacity onPress={HideButton}><Image
                            source={require('./../../assets/icons/hide.png')}
                            style={{ width: mobileW * .08, height: mobileW * .08, margin: mobileW * .02, flex: 1, opacity: 0.5 }}
                        /></TouchableOpacity>
                    </View>

                    {PResult ? <Text style={[LoginStyles.Warning]}>{PResult}</Text> : null}

                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <TouchableOpacity style={[LoginStyles.LoignButton]} onPress={handelLoginUser}>
                            <Text style={{
                                fontWeight: 'bold',
                                fontSize: mobileW * .05,
                                color: 'white'
                            }}>Login</Text>
                        </TouchableOpacity>
                    </View>



                    {/* <View style={{
                        height: mobileW * 0.4
                    }}>
                    </View> */}
                    {/* <View style={[LoginStyles.SignUp]}>
                        <Text style={{ color: 'black' }}>Don't have an account? </Text>
                        <TouchableOpacity><Text style={{ color: 'blue' }}>Sign up</Text></TouchableOpacity>
                    </View>
                    <View style={{
                        height: mobileW * 0.15
                    }}>
                    </View> */}
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}


export default Login;