import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions, FlatList, ActivityIndicator } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { API_IP } from "@env";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const mobileW = Dimensions.get('window').width;

const ChangePasswordPage = () => {

    const navigator = useNavigation();

    const [isLoading, setIsLoading] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [storedData, setStoredData] = useState([]);
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        console.log(storedData);
        const convertedData = {};
        storedData.forEach((item) => {
            const { key, value } = item;
            convertedData[key] = value;
        });
        setUserInfo(convertedData);
    }, [storedData])

    useEffect(() => {
        console.log(userInfo);
    }, [userInfo])

    const getData = async () => {
        AsyncStorage.getAllKeys()
            .then(async (allKeys) => {
                // Use multiGet to retrieve the corresponding values for each key
                const dataPairs = await AsyncStorage.multiGet(allKeys);
                // Convert the data to a format that can be displayed
                const data = dataPairs.map(([key, value]) => ({ key, value }));
                setStoredData(data);
            })
            .catch((error) => {
                console.error('Error retrieving data:', error);
            });
    }

    const handleChangePassword = () => {
        if (newPassword !== confirmPassword) {
            alert('Password Mismatch', 'New password and confirm password do not match.');
            return;
        } else {
            sendDataToAPI();
        }
    };



    const sendDataToAPI = async () => {
        setIsLoading(true);
        console.log('Update');

        const apiUrl = `${API_IP}changepassword`;

        await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userInfo.userId,
                currentPassword: currentPassword,
                newPassword: newPassword,
            }),
            // body : formData,
        })

            .then((Response) => Response.json())
            .then((json) => {
                console.log(json);
                if (json.message) {
                    alert(json.message);
                    setCurrentPassword('');
                    setNewPassword('');
                    setConfirmPassword('');
                    navigator.navigate('Home');
                }
                if (json.error) {
                    alert(json.error);
                }
            })
            .finally(() => {
                setIsLoading(false); // Set loading state to false when API call is complete
            });
    };


    return (
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>Change Password</Text>
            <Text style={styles.label}>Current Password:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setCurrentPassword}
                value={currentPassword}
                placeholder={'Enter Current Password'}
                color={'black'}
                placeholderTextColor={'rgba(0,0,0,0.5)'}
            />
            <Text style={styles.label}>New Password:</Text>
            <TextInput
                style={styles.input}
                // secureTextEntry={true}
                onChangeText={setNewPassword}
                value={newPassword}
                placeholder={'Enter New Password'}
                color={'black'}
                placeholderTextColor={'rgba(0,0,0,0.5)'}
            />
            <Text style={styles.label}>Confirm Password:</Text>
            <TextInput
                style={styles.input}
                // secureTextEntry={true}
                onChangeText={setConfirmPassword}
                value={confirmPassword}
                placeholder={'Confirm New Password'}
                color={'black'}
                placeholderTextColor={'rgba(0,0,0,0.5)'}
            />

            <TouchableOpacity style={styles.Button}
                onPress={handleChangePassword}
            >
                {isLoading ? (
                    <ActivityIndicator size="small" color="white" /> // Show the progress indicator when loading
                ) : (
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: mobileW * .05,
                        color: 'white'
                    }}>Update</Text>
                )}

            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    heading: {
        fontSize: mobileW * 0.075,
        marginTop: mobileW * 0.03,
        color: 'black',
        marginLeft: mobileW * 0.04,
        fontWeight: '800',
        alignSelf: 'center'
    },
    Button: {
        backgroundColor: 'rgba(4, 128, 200, 0.9)',
        height: mobileW * .1,
        width: mobileW * .4,
        borderRadius: mobileW * .02,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        margin: mobileW * .05
    },
    label: {
        fontSize: 20,
        marginTop: 5,
        color: 'black',
        marginLeft: mobileW * 0.04,
        fontWeight: '600',
    },
    input: {
        borderColor: 'rgba(61,156,211,0.5)',
        borderWidth: mobileW * .005,
        marginHorizontal: mobileW * 0.04,
        borderRadius: 10,
        paddingLeft: 10,
    },
    fileInputButton: {
        backgroundColor: 'rgba(62, 168, 232, 1)',
        padding: 10,
        marginVertical: mobileW * 0.008,
        width: mobileW * 0.3,
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    fileInputText: {
        color: 'black',
    },
    imageContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center'
    },
    imagePreview: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        marginRight: 10,
        marginBottom: 10,
    },
});

export default ChangePasswordPage;  