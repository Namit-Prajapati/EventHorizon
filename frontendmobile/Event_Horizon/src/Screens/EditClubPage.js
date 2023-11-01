import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, RefreshControl, StyleSheet, TouchableOpacity, ScrollView, Dimensions, FlatList, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { API_IP } from "@env";
import { useNavigation } from '@react-navigation/native';

const mobileW = Dimensions.get('window').width;

const EditClubPage = () => {

    const navigator = useNavigation();

    const [clubName, setclubName] = useState('');
    const [facultyEmail, setFacultyEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [data, setData] = useState(null);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        console.log("hello");
        fetchData();
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        console.log(data);
    }, [data]);

    const fetchData = async () => {
        console.log("hello this is fetch");
        try {
            const response = await fetch(API_IP + 'admin/getallclub'); // Replace with your API endpoint
            const result = await response.json();

            setData(result.clubs);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const sendDataToAPI = async () => {
        setIsLoading(true);
        console.log('Create Venue');
        // console.log(selectedImages[0].path);
        // console.log(selectedImages[0].mime);
        // console.log(`Image.${selectedImages[0].mime.split("/")[1]}`);
        // console.log(venueDescription);
        // console.log(capacity);

        const apiUrl = `${API_IP}admin/createclub`;
        // const formData = new FormData();

        console.log(clubName);
        console.log(facultyEmail);

        // formData.append('name', clubName);
        // formData.append('facultyEmail', facultyEmail);

        await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: clubName,
                facultyEmail: facultyEmail,
            }),
            // body : formData,
        })

            .then((Response) => Response.json())
            .then((json) => {
                console.log(json);
                if (json.message) {
                    alert(json.message);
                    setclubName('');
                    setFacultyEmail('');
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
        <View style={styles.container}>
            <Text style={styles.heading}>Edit Club</Text>
            {
                data ?
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.venueContainer} onPress={() => { navigator.navigate('EditClubByIDPage', { item }) }}>
                                <View style={styles.club}>
                                    <Text style={styles.label}>{item.name}</Text>
                                    <Icon name='enter-outline' size={24} color="rgba(0, 0, 0, .7)" style={{ marginRight: 10 }} />
                                </View>
                            </TouchableOpacity>
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
    heading: {
        fontSize: 28,
        marginVertical: "4%",
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
        // marginTop: 5,
        color: 'black',
        marginLeft: mobileW * 0.04,
        fontWeight: '600',
        flex: 1,
    },
    club: {
        borderColor: 'rgba(61,156,211,0.5)',
        borderWidth: mobileW * .005,
        marginHorizontal: mobileW * 0.04,
        borderRadius: 10,
        marginBottom: mobileW * 0.03,
        padding: "2%",
        flexDirection: 'row'
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

export default EditClubPage;  