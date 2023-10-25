import React, { useState, useEffect } from 'react';
import { View, ScrollView, TextInput, Text, Image, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { API_IP } from "@env";
import { useNavigation } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';

let mobileW = Dimensions.get('window').width;


const EditVenuePage = ({ route }) => {

    const { item } = route.params;
    const navigation = useNavigation();

    const [venueName, setVenueName] = useState(item.name);
    const [venueDescription, setVenueDescription] = useState(item.description);
    const [capacity, setCapacity] = useState(item.capacity);
    const [selectedImages, setSelectedImages] = useState([]);
    const [newSelectedImages, setNewSelectedImages] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let Images = [];
        item.venueImages.forEach(element => {
            Images.push(
                API_IP + element
            );
        });
        setSelectedImages(Images);
    }, []);

    const pickImages = async () => {
        try {
            const images = await ImagePicker.openPicker({
                multiple: true,
                mediaType: 'photo',
            });

            setNewSelectedImages(images);
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

        const apiUrl = `${API_IP}admin/addVenueImage/${item._id}`;
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
                    // navigator.navigate('Home');
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
                <Text style={styles.header}>{item.name} </Text>

                <View style={[styles.ContainerX, { alignContent: 'center', padding: 10 }]}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{
                            backgroundColor: 'rgba(62, 168, 232,1)',
                            height: 35,
                            width: 8,
                            // position: 'absolute',
                            // marginTop: '200'
                            marginLeft: -10
                        }} />
                        <Text style={[styles.lable, { alignSelf: 'center' }]}>Edit Capacity :</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        onChangeText={setCapacity}
                        value={capacity.toString()}
                        placeholder={'Enter Capacity (Numeric Value)'}
                        color={'black'}
                        placeholderTextColor={'rgba(0,0,0,0.5)'}
                        keyboardType="numeric"
                    />
                </View>
                <View style={[styles.ContainerX, { alignContent: 'center', padding: 10 }]}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{
                            backgroundColor: 'rgba(62, 168, 232,1)',
                            height: 30,
                            width: 8,
                            position: 'absolute',
                            marginLeft: -10
                        }} />
                        <Text style={[styles.lable, {}]}>Description :</Text>
                    </View>
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
                </View>
                <View style={[styles.ContainerX, { alignContent: 'center', padding: 10 }]}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{
                            backgroundColor: 'rgba(62, 168, 232,1)',
                            height: 30,
                            width: 8,
                            position: 'absolute',
                            marginLeft: -10
                        }} />
                        <Text style={[styles.lable, {}]}>Edit Venue Images :</Text>
                    </View>
                    {
                        newSelectedImages ? <View style={styles.imageContainer}>
                            {newSelectedImages.map((image, index) => (
                                <Image key={index} source={{ uri: image.path }} style={styles.imagePreview} />
                            ))}
                        </View> : <View style={styles.imageContainer}>
                            {selectedImages.map((image, index) => (
                                <Image key={index} source={{ uri: image }} style={styles.imagePreview} />
                            ))}
                        </View>
                    }
                    <TouchableOpacity style={styles.fileInputButton} onPress={pickImages}>
                        <Text style={styles.fileInputText}>Choose Files</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.Button}
                // onPress={sendDataToAPI}
                >
                    {isLoading ? (
                        <ActivityIndicator size="small" color="white" /> // Show the progress indicator when loading
                    ) : (
                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: mobileW * .05,
                            color: 'white'
                        }}>Edit Venue</Text>
                    )}

                </TouchableOpacity>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
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
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'rgba(62, 168, 232,1)',
        marginHorizontal: mobileW * 0.04,
        marginTop: mobileW * 0.04,
        alignSelf: 'flex-start',
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
        fontSize: 22,
        fontWeight: '600',
        color: 'black',
        marginHorizontal: mobileW * 0.04,
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

export default EditVenuePage;
