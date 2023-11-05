import React, { useState, useEffect } from 'react';
import { View, Text, Modal, Button, TextInput, Alert, RefreshControl, StyleSheet, TouchableOpacity, Switch, Dimensions, FlatList, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { API_IP } from "@env";
import { useNavigation } from '@react-navigation/native';

const mobileW = Dimensions.get('window').width;

const TempAxis = ({ route }) => {

    const navigator = useNavigation();

    const item = route.params;
    const EventName = route.params.eventName;
    const userId = route.params.userId;
    const eventId = route.params.eventId;


    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [data, setData] = useState(null);
    const [email, setEmail] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [noStudentAccess, setNoStudentAccess] = useState(false);

    const openModal = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    const handleEmailInput = (text) => {
        setEmail(text);
    };

    const handleSubmit = () => {
        // You can perform validation or further processing here
        console.log('Entered email:', email);

        AddTempStudent();
        // Close the modal
        closeModal();
    };

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        console.log("hello");
        fetchData();
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);

    const AddTempStudent = async () => {
        console.log('Adding Student');

        const apiUrl = `${API_IP}faculty/createstudentaccess`;

        console.log(email);

        await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                studentEmail: email,
                facultyId: userId,
                eventId: eventId,
            }),
        })
            .then((Response) => Response.json())
            .then((json) => {
                console.log(json);
                if (json.message) {
                    alert(json.message);
                    setEmail('');
                    fetchData();
                }
                if (json.error) {
                    alert(json.error);
                }
            })
    };

    const EditAccess = async ({ studentAcessId }) => {
        console.log('Deleting Faculty');

        const apiUrl = `${API_IP}faculty/editstudentaccess`;

        console.log(studentAcessId);

        await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                studentAccessId: studentAcessId,
            }),
        })
            .then((Response) => Response.json())
            .then((json) => {
                console.log(json);
                if (json.message) {
                    alert(json.message);
                    fetchData();
                }
                if (json.error) {
                    alert(json.error);
                }
            })
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        console.log(data);
    }, [data]);


    const fetchData = async () => {
        console.log(userId);
        console.log(eventId);
        console.log(API_IP + 'faculty/getstudentaccess/' + eventId);
        try {
            const response = await fetch(API_IP + 'faculty/getstudentaccess/' + eventId); // Replace with your API endpoint
            const result = await response.json();
            if (result.message) {
                setNoStudentAccess(false);
            }
            if (result.studentAccess) {
                setNoStudentAccess(true);
                console.log(result);
                setData(result.studentAccess);
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const sendDataToAPI = async () => {
        setIsLoading(true);
        console.log('Delete Club');

        const apiUrl = `${API_IP}admin/deleteclub/${item._id}`;

        await fetch(apiUrl, {
            method: 'POST',
            // headers: {
            //     'Content-Type': 'application/json',
            // },
            // body: JSON.stringify({
            //     name: clubName,
            //     facultyEmail: facultyEmail,
            // }),
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

    const handleShowAlert = () => {
        setShowAlert(true);
    };

    const renderAlert = () => {
        Alert.alert(
            'Are you sure?',
            'You want to Delete this Club?',
            [
                {
                    text: 'No',
                    onPress: () => setShowAlert(false),
                    style: 'cancel',
                },
                {
                    text: 'Yupp!',
                    onPress: () => {
                        sendDataToAPI();
                        setShowAlert(false);
                    },
                },
            ],
            { cancelable: false },
        );
    };

    return (
        <View style={styles.container}>
            {showAlert && renderAlert()}
            <Modal visible={isModalVisible} animationType="slide" transparent={true}>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <View style={{ backgroundColor: 'gray', height: mobileW * 0.35, width: mobileW * 0.9, borderWidth: 1, borderColor: 'black', borderRadius: 10, padding: 10 }}>
                        <Text style={styles.lable}>Enter Student Email</Text>
                        <TextInput
                            placeholder="Email"
                            value={email}
                            onChangeText={handleEmailInput}
                            keyboardType="email-address"
                            color={'white'}
                            style={{
                                borderColor: 'white',
                                borderWidth: mobileW * .005,
                                marginHorizontal: mobileW * 0.02,
                                borderRadius: 10,
                                marginTop: mobileW * 0.01,
                                padding: "2%",
                            }}
                        />
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1 }} />
                            <TouchableOpacity onPress={closeModal} style={{ padding: '3%', backgroundColor: 'lightgray', borderWidth: 2, borderRadius: 20, marginVertical: 4, marginRight: 3 }}>
                                <Text style={{ color: 'black' }}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleSubmit} style={{ padding: '3%', backgroundColor: 'lightgray', borderWidth: 2, borderRadius: 20, marginVertical: 4, marginRight: 3 }}>
                                <Text style={{ color: 'black' }}>Continue</Text>
                            </TouchableOpacity>
                        </View>
                        {/* <Button title="Submit" onPress={handleSubmit} />
                        <Button title="Cancel" onPress={closeModal} /> */}
                    </View>
                </View>
            </Modal>
            <View style={{ flexDirection: 'row', marginVertical: mobileW * 0.03 }}>
                <Text style={[styles.header, { flex: 1 }]}>{EventName}</Text>

            </View>

            <View style={{ flexDirection: 'row', marginBottom: '3%', }}>
                <Text style={[styles.header, { color: 'black', fontSize: 25, marginTop: 0, marginBottom: '3%', flex: 1 }]}>Temporary Access</Text>
                <TouchableOpacity
                    onPress={openModal}
                    style={{
                        // marginHorizontal: mobileW * 0.04,
                        // marginTop: mobileW * 0.04,
                        alignSelf: 'center',
                        backgroundColor: 'rgba(62, 168, 232,1)',
                        height: 30,
                        width: 30,
                        borderRadius: 15,
                        justifyContent: 'center',
                        alignItems: 'center',
                        elevation: 2,
                        marginRight: '4%'
                    }}>
                    <Icon name="person-add-outline" size={20} color="white" />
                </TouchableOpacity>
            </View>
            {
                data ?
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => (
                            <View style={styles.venueContainer}>
                                <Text style={[styles.lable, { flex: 1, padding: '2%' }]}>
                                    {item.studentId.name}
                                </Text>
                                <Switch
                                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                                    thumbColor={item.editable ? '#f5dd4b' : '#f4f3f4'}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={() => EditAccess({ studentAcessId: item._id })}
                                    value={item.editable}
                                />
                            </View>
                        )}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                    /> :
                    null
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
        fontSize: 20,
        fontWeight: '600',
        color: 'black',
        marginHorizontal: mobileW * 0.02,
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

export default TempAxis;  