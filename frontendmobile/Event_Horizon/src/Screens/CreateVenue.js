import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions, FlatList, ActivityIndicator } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { API_IP } from "@env";
import { useNavigation } from '@react-navigation/native';

const mobileW = Dimensions.get('window').width;

const CreateVenuePage = () => {

    const navigator = useNavigation();

    const [venueName, setVenueName] = useState('');
    const [venueDescription, setVenueDescription] = useState('');
    const [capacity, setCapacity] = useState('');
    const [selectedImages, setSelectedImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const pickImages = async () => {
        try {
            const images = await ImagePicker.openPicker({
                multiple: true,
                mediaType: 'photo',
            });

            setSelectedImages(images);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // Find the selected venue's booked dates
        console.log(selectedImages);

    }, [selectedImages]);

    const sendDataToAPI = async () => {
        setIsLoading(true);
        console.log('Create Venue');
        // console.log(selectedImages[0].path);
        // console.log(selectedImages[0].mime);
        // console.log(`Image.${selectedImages[0].mime.split("/")[1]}`);
        // console.log(venueDescription);
        // console.log(capacity);

        const apiUrl = `${API_IP}admin/addvenue`;
        const formData = new FormData();

        formData.append('name', venueName);
        formData.append('description', venueDescription);
        formData.append('capacity', capacity);

        selectedImages.forEach((image, index) => {
            formData.append(`image`, {
                uri: image.path,
                type: image.mime,
                name: `image${index}.${image.mime.split("/")[1]}`
            });
        });


        await fetch(apiUrl, {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })

            .then((Response) => Response.json())
            .then((json) => {
                console.log(json);
                if (json.message) {
                    alert(json.message);
                    setVenueName('');
                    setVenueDescription('');
                    setCapacity('');
                    setSelectedImages([]);
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
            <Text style={styles.heading}>Create Venue</Text>
            <Text style={styles.label}>Venue Name:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setVenueName}
                value={venueName}
                placeholder={'Enter Venue Name'}
                color={'black'}
                placeholderTextColor={'rgba(0,0,0,0.5)'}
            />

            <Text style={styles.label}>Venue Description:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setVenueDescription}
                value={venueDescription}
                placeholder={'Enter Venue Description'}
                color={'black'}
                placeholderTextColor={'rgba(0,0,0,0.5)'}
                multiline
                numberOfLines={4}
            />

            <Text style={styles.label}>Capacity of Venue:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setCapacity}
                value={capacity}
                placeholder={'Enter Capacity (Numeric Value)'}
                color={'black'}
                placeholderTextColor={'rgba(0,0,0,0.5)'}
                keyboardType="numeric"
            />

            <Text style={styles.label}>Venue Images:</Text>
            <TouchableOpacity style={styles.fileInputButton} onPress={pickImages}>
                <Text style={styles.fileInputText}>Choose Files</Text>
            </TouchableOpacity>

            <View style={styles.imageContainer}>
                {selectedImages.map((image, index) => (
                    <Image key={index} source={{ uri: image.path }} style={styles.imagePreview} />
                ))}
            </View>
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
                    }}>Create Venue</Text>
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

export default CreateVenuePage;  