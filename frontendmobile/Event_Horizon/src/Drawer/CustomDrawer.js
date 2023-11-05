// DrawerContent.js

import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // You can choose a different icon library
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const mobileW = Dimensions.get('window').width;

const CustomDrawer = ({ routes }) => {

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

    const clearAllData = async () => {
        try {
            await AsyncStorage.clear();
            console.log('AsyncStorage data cleared');
        } catch (error) {
            console.error('Error clearing AsyncStorage data:', error);
        }
    };

    const [isModalVisible, setModalVisible] = useState(false);
    const navigator = useNavigation();

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <View style={{ alignItems: 'flex-start' }}>
                <Image
                    source={require('./../../assets/Logo/ehblue.png')}
                    style={{ height: mobileW * .18, resizeMode: 'contain', width: mobileW * 0.22, marginTop: mobileW * 0.07, marginBottom: mobileW * 0.009 }}
                />
                <Text style={{ color: 'black', fontWeight: '700', fontSize: 20, marginHorizontal: 10, marginTop: 5, marginBottom: 2 }}>{userInfo.name}</Text>
                <Text style={{ color: 'black', fontWeight: '400', fontSize: 14, marginHorizontal: 10 }}>{userInfo.email}</Text>
            </View>
            <View style={styles.divider} />
            <View>
                <CustomTouchable text="Home" onClick={() => { navigator.navigate('Home'); }} icon={'home-outline'} />
                <CustomTouchable text="Events" onClick={() => { navigator.navigate('EventPage'); }} icon={'calendar-number-outline'} />
                <CustomTouchable text="Acadmic Events" onClick={() => { navigator.navigate('ListAcadmicEventsPage'); }} icon={'business-outline'} />
            </View>
            
            {
                userInfo.role != 'student' ?
                    <View>
                        <CustomTouchable text="Venue List" onClick={() => { navigator.navigate('ListVenuePage'); }} icon={'business-outline'} />
                        <CustomTouchable text="Create Event" onClick={() => { navigator.navigate('CreateEventPage'); }} icon={'add-circle-outline'} />
                    </View>
                    : null

            }
            {
                userInfo.role == 'admin' ?
                    <View>
                        <CustomTouchable text="Edit Club" onClick={() => { navigator.navigate('EditClubPage'); }} icon={'pencil'} />
                        <CustomTouchable text="Create Club" onClick={() => { navigator.navigate('CreateClubPage'); }} icon={'add-circle-outline'} />
                        <CustomTouchable text="Create Acadmic Event" onClick={() => { navigator.navigate('CreateAcadmicEventPage'); }} icon={'add-circle-outline'} />
                        <CustomTouchable text="Create Venue" onClick={() => { navigator.navigate('CreateVenuePage'); }} icon={'add-circle-outline'} />
                        <CustomTouchable text="Add User" onClick={() => { navigator.navigate('AddUserPage'); }} icon={'add-circle-outline'} />

                    </View>
                    : null

            }
            <View style={styles.divider} />
            <Text style={{ color: 'gray', fontWeight: '700', fontSize: 14, marginHorizontal: 10, marginVertical: 10 }}>My Account</Text>
            {
                userInfo.role == 'student' ?
                    <View>
                        <CustomTouchable text="Registered Events" onClick={() => { navigator.navigate('RegisteredEventPage'); }} icon={'calendar-number-outline'} />
                    </View>
                    : null
            }
            {
                userInfo.role == 'student' ?
                    <CustomTouchable text="QR code" onClick={toggleModal} icon={'qr-code-outline'} />
                    : null
            }

            <Modal isVisible={isModalVisible}>
                <View style={styles.modalContainer}>
                    <Image source={{ uri: 'https://www.unitag.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ftemplate_classic.746b0922.png&w=3840&q=75' }} style={styles.fullImage} />
                    <TouchableOpacity onPress={toggleModal} style={{ backgroundColor: '#262626', height: 55, width: 55, alignItems: 'center', justifyContent: 'center', borderRadius: 35 }}>
                        <Icon name={'close'} size={33} color="white" />
                    </TouchableOpacity>
                </View>
            </Modal>

            <CustomTouchable text="Logout" onClick={() => {
                clearAllData();
                navigator.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                });
            }} icon={'log-out-outline'} />
        </ScrollView >
    );
}

const CustomTouchable = ({ text, onClick, icon }) => {
    return (
        <TouchableOpacity
            style={styles.touchable}
            onPress={onClick}
        >
            <View style={styles.buttonContainer}>
                <Icon name={icon} size={24} color="rgba(0, 0, 0, .7)" style={{ marginRight: 10 }} />
                <Text style={styles.text}>{text}</Text>
            </View>
            {/* <Icon name={icon} size={24} color="black" />
            <Text style={styles.text}>{text}</Text> */}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    touchable: {
        backgroundColor: 'white', // Add a white background color
        // borderRadius: 10, // Adjust the border radius as needed
        // elevation: 3, // Adjust the elevation as needed
        padding: 10,
        marginVertical: 3,
        // marginHorizontal: 15,
        // borderWidth: 2
    },
    text: {
        fontSize: 20,
        fontWeight: '500',
        color: 'rgba(0, 0, 0, .7)',
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    divider: {
        borderBottomWidth: .5,
        borderBottomColor: 'rgba(0, 0, 0, 0.2)',
        marginVertical: 10,
        borderColor: 'gray',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullImage: {
        width: '80%',
        height: '80%',
        resizeMode: 'contain',
    },
    closeButton: {
        color: 'blue',
        fontSize: 20,
    },
});

export default CustomDrawer;
