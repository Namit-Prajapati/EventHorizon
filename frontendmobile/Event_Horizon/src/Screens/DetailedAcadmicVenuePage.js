import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ScrollView, ActivityIndicator, Alert, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { API_IP } from "@env";
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

let mobileW = Dimensions.get('window').width;

const DetaailedAcadmicEventsPage = ({ route }) => {
    const navigation = useNavigation();

    const [showAlert, setShowAlert] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
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


    const { item } = route.params;

    console.log(item);

    const handleShowAlert = () => {
        setShowAlert(true);
    };

    const renderAlert = () => {
        Alert.alert(
            'Are you sure?',
            'You want to Delete this Event?',
            [
                {
                    text: 'No',
                    onPress: () => setShowAlert(false),
                    style: 'cancel',
                },
                {
                    text: 'Yupp!',
                    onPress: () => {
                        deleteAcadmicEvent();
                        setShowAlert(false);
                    },
                },
            ],
            { cancelable: false },
        );
    };

    const deleteAcadmicEvent = async () => {
        setIsLoading(true);
        console.log('Delete Club');

        const apiUrl = `${API_IP}admin/deleteacadevent/${item._id}`;

        await fetch(apiUrl, {
            method: 'POST',
        })
            .then((Response) => Response.json())
            .then((json) => {
                console.log(json);
                if (json.message) {
                    alert(json.message);
                    navigation.navigate('Home');
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
        <View style={styles.container}>
            <ScrollView style={styles.container}>
                {showAlert && renderAlert()}
                <View style={{ flexDirection: 'row', marginVertical: mobileW * 0.03 }}>
                    <Text style={[styles.header, { flex: 1 }]}>{item.name}</Text>
                    {
                        userInfo.role == 'admin' ?
                            <TouchableOpacity
                                onPress={handleShowAlert}
                                style={[styles.deletebutton, { flexDirection: 'row', elevation: 2 }]}
                            >
                                {isLoading ? (
                                    <ActivityIndicator size="small" color="white" /> // Show the progress indicator when loading
                                ) : (
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ color: 'white', alignSelf: 'center', padding: 3 }}>Delete Event</Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                            : null
                    }
                </View>
                <View style={styles.ContainerX}>
                    <Text style={[styles.header, { fontSize: 24, marginTop: 10, margin: 10 }]}>
                        Duration
                    </Text>
                    {
                        item.startDate == item.endDate
                            ? <Text style={styles.lable}>{item.startDate.split('T')[0]} </Text>
                            : <Text style={styles.lable}>{item.startDate.split('T')[0]} to {item.endDate.split('T')[0]}</Text>
                    }
                </View>
                <View style={styles.ContainerX}>
                    <Text style={[styles.header, { fontSize: 24, marginTop: 10, margin: 10 }]}>
                        Targated Department
                    </Text>
                    <Text style={styles.lable}>{item.targetedDept.join(", ")}</Text>
                </View>
            </ScrollView>
            {
                userInfo.role == 'admin' ?
                    <TouchableOpacity
                        onPress={() => { navigation.navigate('EditAcadmicEventPage', { item }) }}
                        style={{ height: mobileW * 0.12, width: mobileW * 0.12, backgroundColor: 'rgba(62, 168, 232,1)', position: 'absolute', alignSelf: 'flex-start', marginTop: mobileW * 1.95, borderRadius: mobileW * 0.12, marginLeft: mobileW * 0.83, alignItems: 'center' }}>
                        <Icon
                            name="pencil"
                            size={28}
                            color='white'
                            style={{ justifyContent: 'center', alignSelf: 'center', marginVertical: 8 }}
                        />
                    </TouchableOpacity>
                    : null
            }

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'rgba(62, 168, 232,1)',
        marginHorizontal: mobileW * 0.04,
        marginTop: mobileW * 0.04,
        alignSelf: 'flex-start',
    },
    deletebutton: {
        color: 'white',
        backgroundColor: 'red',
        alignSelf: 'center',
        padding: 5,
        marginHorizontal: mobileW * 0.04,
        marginTop: mobileW * 0.04,
        borderRadius: 7,
    },
    venueContainer: {
        marginHorizontal: mobileW * 0.04,
        marginBottom: mobileW * 0.04,
        flexDirection: 'row',
        // borderWidth: .1,
        elevation: 2,
        padding: 5,
        borderRadius: mobileW * 0.03,
        backgroundColor: 'rgb(236, 247, 253)',
    },
    image: {
        width: mobileW * 0.2,
        height: mobileW * 0.2,
        marginRight: 10,
        borderRadius: mobileW * 0.03,
    },
    venueInfo: {
        flex: 1,
        // flexDirection : 'row'
    },
    lable: {
        fontSize: 16,
        fontWeight: '600',
        color: 'black',
        marginHorizontal: mobileW * 0.04,
        marginBottom: 10
    },
    lableDescription: {
        fontSize: 18,
        color: 'black',
        marginHorizontal: mobileW * 0.04,
    },
    venueCapacity: {
        fontSize: 14,
        color: 'black',
    },
    ContainerX: {
        // flex: 1,
        // alignItems: 'center',
        backgroundColor: 'white',
        margin: mobileW * .03,
        // marginHorizontal: mobileW * .03,
        // marginTop: mobileW * .03,
        // marginBottom: mobileW * .03,
        elevation: 5,
        borderRadius: 8,
    },
});

export default DetaailedAcadmicEventsPage;
