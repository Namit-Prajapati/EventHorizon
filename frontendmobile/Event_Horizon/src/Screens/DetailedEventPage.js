import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Alert, View, Dimensions, Image, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomCard from '../Components/smallcard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BNavBar from '../Components/bottomnavbar';
import ImageViewer from 'react-native-image-zoom-viewer';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_IP } from "@env";


let mobileW = Dimensions.get('window').width;

const DummyImages = [
    {
        url: 'https://www.adobe.com/content/dam/www/us/en/events/overview-page/eventshub_evergreen_opengraph_1200x630_2x.jpg',
    },
    {
        url: 'https://www.eventbrite.ie/blog/wp-content/uploads/2022/09/dance-event.jpg',
    },
];

const DetailedEventPage = ({ route }) => {
    const { item } = route.params;
    const navigator = useNavigation();

    const [showAlert, setShowAlert] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [storedData, setStoredData] = useState([]);
    const [userInfo, setUserInfo] = useState({});
    const [data, setData] = useState(null);

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
        console.log("hello");
        if (userInfo.role == 'student') {
            console.log(API_IP + 'student/getevent?userId=' + userInfo.userId + '&eventId=' + item.id);
        } else {
            console.log(API_IP + 'faculty/geteventbyid?userId=' + userInfo.userId + '&eventId=' + item.id);
        }
        fetchData();
    }, [userInfo])

    useEffect(() => {
        console.log(data);
    }, [data])


    const fetchData = async () => {
        console.log("hello this is fetch data for event by id");
        if (userInfo.role == 'student') {
            try {
                const response = await fetch(API_IP + 'student/getevent?userId=' + userInfo.userId + '&eventId=' + item.id); // Replace with your API endpoint
                const result = await response.json();
                if (result.event) {
                    setData(result);
                }
                if (result.error) {
                    alert(result.error);
                    navigator.goBack();
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        } else {
            try {
                const response = await fetch(API_IP + 'faculty/geteventbyid?userId=' + userInfo.userId + '&eventId=' + item.id); // Replace with your API endpoint
                const result = await response.json();
                if (result.event) {
                    setData(result);
                }
                // setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    };

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

    const ApproveEvent = async () => {
        console.log('Approved');
        const apiUrl = `${API_IP}admin/approve`;
        await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                eventId: item.id,
            }),
        })
            .then((Response) => Response.json())
            .then((json) => {
                console.log(json);
                if (json.name) {
                    alert("Approved Succesfully");
                }
                if (json.error) {
                    alert(json.error);
                }
            })
            .finally(() => {
                setIsLoading(false); // Set loading state to false when API call is complete
                getData();
            });
    };

    const RejectEvent = async () => {
        console.log('Reject');
        const apiUrl = `${API_IP}admin/reject`;
        await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                eventId: item.id,
            }),
        })
            .then((Response) => Response.json())
            .then((json) => {
                console.log(json);
                if (json.name) {
                    alert("Rejected Succesfully");
                }
                if (json.error) {
                    alert(json.error);
                }
            })
            .finally(() => {
                setIsLoading(false); // Set loading state to false when API call is complete
                getData();
            });
    };

    const sendDataToAPI = async () => {
        setIsLoading(true);
        console.log('Registering');

        const apiUrl = `${API_IP}student/registerevent`;

        console.log()

        await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                eventId: item.id,
                studentId: userInfo.userId,
            }),
        })

            .then((Response) => Response.json())
            .then((json) => {
                console.log(json);
                if (json.message) {
                    alert(json.message);
                }
                if (json.error) {
                    alert(json.error);
                }
            })
            .finally(() => {
                setIsLoading(false); // Set loading state to false when API call is complete
                getData();
            });
    };

    const handleShowAlert = () => {
        setShowAlert(true);
    };

    const deleteEvent = async () => {
        setIsLoading(true);
        console.log('Delete Event');

        const apiUrl = `${API_IP}admin/deleteacadevent/${item._id}`;

        await fetch(apiUrl, {
            method: 'POST',
        })
            .then((Response) => Response.json())
            .then((json) => {
                console.log(json);
                if (json.message) {
                    alert(json.message);
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
                        deleteEvent();
                        setShowAlert(false);
                    },
                },
            ],
            { cancelable: false },
        );
    };

    const navigateToEditEvent = () => {
        navigator.navigate('EditEvent', { item }); // Assuming you have set up 'EditEvent' as the screen name for EditEventPage in your navigator.
    };

    return (
        <View style={styles.AppBg}>
            {
                data ? <View style={styles.AppBg}>
                    <ScrollView style={styles.AppBg}>
                        {showAlert && renderAlert()}
                        <View style={[styles.container, { marginTop: mobileW * .05 }]}>
                            <View style={{ flexDirection: 'row', marginHorizontal: 4, marginTop: 4 }}>
                                <Image
                                    source={{
                                        uri: API_IP + data.event.logo,
                                    }}
                                    style={{
                                        width: mobileW * 0.2,
                                        height: mobileW * 0.2,
                                        resizeMode: 'contain',
                                        margin: mobileW * 0.02,
                                        alignSelf: 'flex-start',
                                        // borderWidth: 1,
                                        borderColor: 'gray',
                                        borderRadius: 5,
                                        // elevation: 1
                                    }}
                                />
                                <View style={{ marginHorizontal: mobileW * 0.01 }}>
                                    <View style={{ flexDirection: 'row', flex: 1 }}>
                                        <Text style={styles.eventName}>{data.event.name}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', flex: 1, marginTop: mobileW * 0.02 }}>
                                        <Icon
                                            name="building-o"
                                            size={20}
                                            // color='rgba(62, 168, 232, 1)'
                                            color='gray'
                                        />
                                        <Text style={styles.club}>{data.clubName}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                margin: mobileW * 0.02,
                                marginLeft: 12,
                            }}>
                                <Icon
                                    name="map-marker"
                                    size={20}
                                    // color='rgba(62, 168, 232, 1)'
                                    color='gray'
                                />
                                <Text style={styles.club}>{data.venueName}</Text>
                            </View>
                            <View style={[styles.divider, { height: 2, marginHorizontal: 12 }]}></View>
                            <View style={[styles.container, { alignItems: 'center', elevation: 0 }]}>
                                <View style={{ flexDirection: 'row', }}>
                                    <CustomCard iconName="calendar-check-o" text="Date" desc={(data.event.startDate == data.event.endDate) ? data.event.startDate.split('T')[0] : data.event.startDate.split('T')[0] + " to " + data.event.endDate.split('T')[0]} />
                                    <CustomCard iconName="clock-o" text="Registrtion Deadline" desc={data.event.registrationDeadline.split('T')[0]} />
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <CustomCard iconName="users" text="Registered" desc={data.event.registrations.length.toString()} />
                                    <CustomCard iconName="sticky-note-o" text="Eligiblity" desc={data.event.targetedDept.join(", ")} />
                                </View>
                            </View>
                        </View>
                        <View style={styles.divider}></View>
                        <Image
                            source={{
                                uri: API_IP + data.event.banner,
                            }}
                            style={{
                                height: mobileW * 1.35,
                                width: mobileW * 0.94,
                                resizeMode: 'contain',
                                alignSelf: 'center',
                                borderRadius: 8,
                                marginVertical: 8
                            }}
                        />
                        <View style={styles.divider}></View>
                        <View style={styles.container}>
                            <View style={{
                                flexDirection: 'row',
                                marginTop: mobileW * .03,
                            }}>
                                <View style={{
                                    backgroundColor: 'rgba(62, 168, 232,1)',
                                    height: 35,
                                    width: 8,
                                }}>

                                </View>
                                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20, marginTop: 4, marginLeft: 4 }}>
                                    Description
                                </Text>
                            </View>
                            <Text style={styles.desc}>
                                {data.event.description}
                            </Text>
                        </View>
                        {/* <View style={styles.container}>
                    <View style={{ height: mobileW * 0.9, backgroundColor: 'white' }}>
                        <View style={{
                            flexDirection: 'row',
                            marginVertical: mobileW * .03,
                        }}>
                            <View style={{
                                backgroundColor: 'rgba(62, 168, 232,1)',
                                height: 35,
                                width: 8,
                            }}>

                            </View>
                            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20, marginTop: 4, marginLeft: 4 }}>
                                Event Images
                            </Text>
                        </View>
                        <ImageViewer
                            imageUrls={DummyImages}
                            enableSwipeDown
                        />
                    </View>
                </View> */}
                    </ScrollView >
                    {
                        userInfo.role == 'admin' ?
                            data.event.status == 'requested' ?
                                <View style={{ height: mobileW * 0.12, backgroundColor: 'rgba(62, 168, 232,1)', justifyContent: 'center' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                        <View style={{ flex: 1 }} />
                                        <TouchableOpacity onPress={RejectEvent} >
                                            <View style={{ backgroundColor: 'white', borderRadius: 5, width: mobileW * 0.2, height: mobileW * 0.08, alignItems: 'center', justifyContent: "center" }}>
                                                <Text style={{ color: 'red', fontWeight: 'bold' }}>Reject</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={ApproveEvent} >
                                            <View style={{ backgroundColor: 'white', borderRadius: 5, width: mobileW * 0.2, height: mobileW * 0.08, alignItems: 'center', justifyContent: "center", marginHorizontal: 20 }}>
                                                <Text style={{ color: 'black', fontWeight: 'bold' }}>Approve</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>


                                </View> : null
                            : null
                    }
                    {
                        userInfo.role != 'student' ? null : <View style={{ height: mobileW * 0.12, backgroundColor: 'rgba(62, 168, 232,1)', justifyContent: 'center' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                <TouchableOpacity style={{ flex: 1 }}>
                                    <Ionicons
                                        name="chatbubbles-outline"
                                        size={35}
                                        color='white'
                                        // color='gray'
                                        style={{ marginHorizontal: 20 }}
                                    />
                                </TouchableOpacity>
                                {
                                    data.event.status == 'completed' ?
                                        <View style={{ backgroundColor: 'white', borderRadius: 5, width: mobileW * 0.25, height: mobileW * 0.08, alignItems: 'center', justifyContent: "center", marginRight: 20 }}>
                                            <Text style={{ color: 'black', fontWeight: 'bold' }}>Completed!</Text>
                                        </View> :
                                        data.isRegistered ?
                                            <View style={{ backgroundColor: 'rgba(62, 168, 232,1)', borderRadius: 5, width: mobileW * 0.2, height: mobileW * 0.08, alignItems: 'center', justifyContent: "center", marginRight: 20 }}>
                                                <Text style={{ color: 'white', fontWeight: 'bold' }}>Registered</Text>
                                            </View>
                                            : data.canRegister ? <TouchableOpacity onPress={sendDataToAPI}>
                                                <View style={{ backgroundColor: 'white', borderRadius: 5, width: mobileW * 0.2, height: mobileW * 0.08, alignItems: 'center', justifyContent: "center", marginRight: 20 }}>
                                                    <Text style={{ color: 'black', fontWeight: 'bold' }}>Register</Text>
                                                </View>
                                            </TouchableOpacity> : <View style={{ backgroundColor: 'white', borderRadius: 5, width: mobileW * 0.4, height: mobileW * 0.08, alignItems: 'center', justifyContent: "center", marginRight: 20 }}>
                                                <Text style={{ color: 'black', fontWeight: 'bold' }}>Registeration Ended</Text>
                                            </View>
                                }

                                {/* {
                                    data.hasAccess ?
                                        // <TouchableOpacity
                                        //     onPress={handleShowAlert}
                                        //     style={[styles.deletebutton, { flexDirection: 'row', elevation: 2 }]}
                                        // >
                                        //     {isLoading ? (
                                        //         <ActivityIndicator size="small" color="white" /> // Show the progress indicator when loading
                                        //     ) : (
                                        //         <View style={{ flexDirection: 'row' }}>
                                        //             <Text style={{ color: 'white', alignSelf: 'center', padding: 3 }}>Delete Event</Text>
                                        //         </View>
                                        //     )}
                                        // </TouchableOpacity>
                                        null : null
                                } */}

                            </View>
                        </View>
                    }
                    {
                        userInfo.role != 'student' ? <TouchableOpacity
                            onPress={() => navigator.navigate('TempAxis', { userId: userInfo.userId, eventId: item.id, eventName: data.event.name })}
                            style={{ height: mobileW * 0.12, width: mobileW * 0.12, backgroundColor: 'rgba(62, 168, 232,1)', position: 'absolute', alignSelf: 'flex-start', marginTop: mobileW * 1.85, borderRadius: mobileW * 0.12, marginLeft: mobileW * 0.68, alignItems: 'center' }}>
                            <Ionicons
                                name="person-add-sharp"
                                size={24}
                                color='white'
                                style={{ justifyContent: 'center', alignSelf: 'center', marginVertical: 10 }}
                            />
                        </TouchableOpacity> : null
                    }
                    {
                        data.hasAccess ?
                            <TouchableOpacity
                                onPress={navigateToEditEvent}
                                style={{ height: mobileW * 0.12, width: mobileW * 0.12, backgroundColor: 'rgba(62, 168, 232,1)', position: 'absolute', alignSelf: 'flex-start', marginTop: mobileW * 1.85, borderRadius: mobileW * 0.12, marginLeft: mobileW * 0.83, alignItems: 'center' }}>
                                <Icon
                                    name="pencil"
                                    size={28}
                                    color='white'
                                    style={{ justifyContent: 'center', alignSelf: 'center', marginVertical: 8 }}
                                />
                            </TouchableOpacity>
                            : null
                    }
                </View> : <ActivityIndicator size='large' color="cyan" style={{ flex: 1 }} />
            }

        </View >
    );
};

const styles = StyleSheet.create({
    AppBg: {
        flex: 1,
        backgroundColor: 'white',
    },
    deletebutton: {
        color: 'white',
        backgroundColor: 'red',
        alignSelf: 'center',
        padding: 5,
        marginHorizontal: mobileW * 0.08,
        // marginTop: mobileW * 0.04,
        borderRadius: 7,
    },
    container: {
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
    eventImage: {
        width: mobileW * 0.5,
        height: mobileW * 0.5,
        resizeMode: 'contain',
        marginTop: mobileW * 0.1,
    },
    eventName: {
        color: 'black',
        fontSize: mobileW * 0.08,
        fontWeight: 'bold',
        marginTop: mobileW * 0.02,
    },
    club: {
        color: 'gray',
        fontSize: mobileW * 0.04,
        fontWeight: '600',
        marginHorizontal: mobileW * 0.02,
    },
    registeredStudents: {
        color: 'black',
        fontSize: mobileW * 0.03,
        fontWeight: '500',
        marginTop: mobileW * 0.02,
    },
    lastDate: {
        color: 'black',
        fontSize: mobileW * 0.03,
        fontWeight: '500',
        marginTop: mobileW * 0.02,
    },
    divider: {
        height: 7, // Adjust the height of the divider as needed
        backgroundColor: 'rgba(228,233,237,1)',
        // borderBottomEndRadius: 20,
        // borderBottomStartRadius: 20,
        // elevation: 5,
        // flex: 1 // Change the color of the divider as needed
    },
    verticalDivider: {
        width: 3, // Adjust the width as needed
        backgroundColor: 'gray', // You can change the color to your preference
    },
    desc: {
        color: 'gray',
        fontSize: mobileW * 0.04,
        fontWeight: '600',
        marginHorizontal: mobileW * 0.02,
        // justifyContent: 'center',
        textAlign: 'justify',
        marginTop: 10,
    },
});

export default DetailedEventPage;
