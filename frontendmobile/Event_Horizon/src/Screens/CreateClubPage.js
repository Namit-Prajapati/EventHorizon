import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions, FlatList, ActivityIndicator } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { API_IP } from "@env";
import { useNavigation } from '@react-navigation/native';

const mobileW = Dimensions.get('window').width;

const CreateClubPage = () => {

    const navigator = useNavigation();

    const [clubName, setclubName] = useState('');
    const [facultyEmail, setFacultyEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);


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
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>Create Club</Text>
            <Text style={styles.label}>Club Name:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setclubName}
                value={clubName}
                placeholder={'Enter Club Name'}
                color={'black'}
                placeholderTextColor={'rgba(0,0,0,0.5)'}
            />
            <View style={{ flexDirection: 'row', justifyContent: "space-between", marginTop: 20 }}></View>

            <Text style={styles.label}>Faculty Email:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setFacultyEmail}
                value={facultyEmail}
                placeholder={'Enter Faculty Email'}
                color={'black'}
                placeholderTextColor={'rgba(0,0,0,0.5)'}
            />

            <TouchableOpacity style={styles.Button}
                onPress={sendDataToAPI}
            >
                {isLoading ? (
                    <ActivityIndicator size="small" color="white" /> // Show the progress indicator when loading
                ) : (
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: mobileW * .05,
                        color: 'white'
                    }}>Create Club</Text>
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

export default CreateClubPage;  