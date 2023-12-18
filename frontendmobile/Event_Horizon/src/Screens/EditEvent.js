import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import CheckBox from '@react-native-community/checkbox';
import { launchImageLibrary } from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import ImagePicker from 'react-native-image-crop-picker';
import { API_IP } from "@env";


let mobileW = Dimensions.get('window').width;

const dummyCheckbox = [ // Dummy data array for eligibility options
    { label: 'CSE', checked: false },
    { label: 'IT', checked: false },
    { label: 'CSIT', checked: false },
    { label: 'CS-DS', checked: false },
    { label: 'CS-IOT', checked: false },
    { label: 'CS-AIML', checked: false },
    { label: 'EC', checked: false },
    { label: 'ME', checked: false },
    { label: 'CIVIL', checked: false },
];

const EditEventPage = ({ route }) => {
    const item = route.params.item;
    console.log("item");
    console.log(item);
    const navigator = useNavigation();

    const checkedLabels = item.event.targetedDept;
    const convertedData = dummyCheckbox.map(item => {
        if (checkedLabels.includes(item.label)) {
            item.checked = true;
        }
        return item;
    });

    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0];
    // Initialize state variables for editable fields
    const [lastDate, setLastDate] = useState(item.event.registrationDeadline.split('T')[0]);
    const [eligibility, setEligibility] = useState(convertedData);
    const [eventPoster, setEventPoster] = useState({ uri: API_IP + item.event.banner });
    const [description, setDescription] = useState(item.event.description);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedImages, setSelectedImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        // Find the selected venue's booked dates
        console.log(eventPoster);
    }, [eventPoster]);

    useEffect(() => {
        // Find the selected venue's booked dates
        console.log(selectedFile);
    }, [selectedFile]);

    useEffect(() => {
        // Find the selected venue's booked dates
        console.log(selectedImages);
    }, [selectedImages]);

    const toggleCheckBox = (index) => {
        const updatedEligibility = [...eligibility];
        updatedEligibility[index].checked = !updatedEligibility[index].checked;
        setEligibility(updatedEligibility);
    };

    const HandleSubmit = async () => {
        setIsLoading(true);
        console.log('Update Event');

        const apiUrl = `${API_IP}admin/createevent`;
        const formData = new FormData();

        let temp = "";
        eligibility.forEach(dept => {
            if (dept.checked) {
                if (temp) {
                    temp += ",";
                }
                temp += dept.label;
            }
        });

        formData.append('id', item.event._id);
        formData.append('description', description);
        formData.append('targetedDept', temp);
        formData.append('registrationDeadline', lastDate);
        formData.append('logo', API_IP + item.event.logo);
        formData.append('banner', eventPoster);
        formData.append('images', startDate);
        formData.append('reportFile', endDate);
        formData.append(`logo`, {
            uri: logoImage.uri,
            type: logoImage.type,
            name: logoImage.fileName,
        });
        formData.append('banner', {
            uri: eventPoster.uri,
            type: eventPoster.type,
            name: eventPoster.fileName,
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

                    navigator.navigate('Home');
                }
                if (json.error) {
                    alert(json.error);
                }
            })
            .finally(() => {
                setIsLoading(false); // Set loading state to false when API call is complete
            });

    }

    const pickDocument = async () => {
        try {
            const result = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            console.log(result);
            // if ((result[0].type === "application/pdf") || (result[0].type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
            //     setSelectedFile(result);
            // } 
            if (result[0].type === "application/pdf") {
                setSelectedFile(result);
            }
            else {
                // The selected file is not a PDF or a DOCX file.
                // alert('Please select a PDF or DOCX file.');
                alert('Please select a PDF file.');
            }
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker
            } else {
                throw err;
            }
        }
    };

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

    const selectImage = (type) => {
        const options = {
            mediaType: type,
            selectionLimit: 1,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image selection');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                if (type === 'mixed') {
                    setEventPoster({ uri: response.assets[0].uri });
                }
            }
        });
    };

    return (
        <View style={styles.AppBg}>
            <ScrollView style={styles.AppBg}>
                <View style={[styles.container, { marginTop: mobileW * .05 }]}>
                    <View style={{ flexDirection: 'row', marginHorizontal: 4, marginTop: 4 }}>
                        <Image
                            source={{
                                uri: API_IP + item.event.logo,
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
                            <Text style={styles.eventName}>{item.event.name}</Text>
                            <View style={{ flexDirection: 'row', flex: 1, marginTop: mobileW * 0.02 }}>
                                <Icon
                                    name="building-o"
                                    size={20}
                                    // color='rgba(62, 168, 232, 1)'
                                    color='gray'
                                />
                                <Text style={styles.club}>{item.clubName}</Text>
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
                        <Text style={styles.club}>{item.venueName}</Text>
                    </View>
                </View>
                <Text style={styles.label}>Edit Last Date to Register</Text>
                <Calendar
                    enableSwipeMonths
                    onDayPress={(date) => {
                        setLastDate(date.dateString);
                    }}
                    style={{
                        borderWidth: 2,
                        borderColor: 'gray',
                        margin: mobileW * 0.04,
                        borderRadius: 5,
                    }}
                    markedDates={{
                        [lastDate]: { selected: true, selectedColor: 'rgba(62, 168, 232, 1)' }, // Adjust the color as needed
                    }}
                    minDate={formattedToday}
                    maxDate={item.event.startDate}
                />

                <Text style={styles.label}>Edit Eligibility:</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', margin: mobileW * 0.04, }}>
                    {eligibility.map((item, index) => (
                        <View key={index} style={styles.checkboxContainer}>
                            <Text style={styles.checkboxLabel}>{item.label}</Text>
                            <CheckBox
                                value={item.checked}
                                onValueChange={() => toggleCheckBox(index)}
                                tintColors={{ true: 'rgba(62, 168, 232, 1)', false: 'rgba(62, 168, 232, 1)' }}
                            />
                        </View>
                    ))}
                </View>

                {/* Poster image picker */}
                <Text style={styles.label}>Edit Event Poster:</Text>
                <TouchableOpacity style={styles.fileInputButton} onPress={() => selectImage('mixed')}>
                    <Text style={styles.fileInputText}>Choose File</Text>
                </TouchableOpacity>
                {eventPoster && (
                    <Image source={eventPoster} style={styles.imagePreview} />
                )}

                {/* Event desc input */}
                <Text style={styles.label}>Description :</Text>
                <TextInput
                    color={'black'}
                    style={styles.input}
                    onChangeText={setDescription}
                    value={description}
                    multiline={true}
                    numberOfLines={10}
                    placeholder={'Enter Event Description'}
                    placeholderTextColor={'rgba(0,0,0,0.5)'}
                />

                <Text style={styles.label}>Upload Event Report:</Text>
                <TouchableOpacity style={styles.fileInputButton} onPress={pickDocument}>
                    <Text style={styles.fileInputText}>Choose File</Text>
                </TouchableOpacity>
                {
                    selectedFile ?
                        <View>
                            <Text style={styles.label}>Selected File</Text>
                            <Text style={styles.selectedfile}>{selectedFile[0].name}</Text>
                        </View>
                        : null}
                <Text style={styles.label}>Event Images:</Text>
                <TouchableOpacity onPress={pickImages} style={styles.fileInputButton}>
                    <Text style={styles.fileInputText}>Select</Text>
                </TouchableOpacity>

                {
                    selectedImages.length != 0 ?
                        <View>
                            <Text style={styles.label}>Selected Images</Text>
                            <View style={styles.imageContainer}>
                                {selectedImages.map((image, index) => (
                                    <Image key={index} source={{ uri: image.path }} style={styles.imagePreviewx} />
                                ))}
                            </View>
                        </View>
                        : null
                }

                <TouchableOpacity style={styles.Button}
                    onPress={() => {
                        HandleSubmit();
                    }}
                >
                    {isLoading ? (
                        <ActivityIndicator size="small" color="white" /> // Show the progress indicator when loading
                    ) : (
                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: mobileW * .05,
                            color: 'white'
                        }}>Update Event</Text>
                    )}
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    AppBg: {
        flex: 1,
        backgroundColor: 'white',
    },
    input: {
        borderColor: 'rgba(61,156,211,0.5)',
        borderWidth: mobileW * .005,
        marginHorizontal: mobileW * 0.04,
        borderRadius: 10,
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
    container: {
        backgroundColor: 'white',
        margin: mobileW * 0.03,
        elevation: 5,
        borderRadius: 8,
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
    divider: {
        height: 7,
        backgroundColor: 'rgba(228,233,237,1)',
    },
    saveButton: {
        backgroundColor: 'rgba(62, 168, 232,1)',
        borderRadius: 5,
        width: mobileW * 0.4,
        height: mobileW * 0.08,
        alignItems: 'center',
        justifyContent: "center",
        margin: mobileW * 0.05,
        alignSelf: 'center',
    },
    saveButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: mobileW * 0.05,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 20
    },
    checkboxLabel: {
        color: 'black',
        marginRight: 2,
    },
    fileInputButton: {
        backgroundColor: 'rgba(62, 168, 232, 1)',
        padding: 10,
        marginBottom: mobileW * 0.008,
        width: mobileW * 0.3,
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    fileInputText: {
        color: 'black',
    },
    imagePreview: {
        width: mobileW * 0.8,
        height: mobileW,
        resizeMode: 'cover',
        alignSelf: 'center',
    },
    selectedfile: {
        marginTop: 5,
        color: 'black',
        margin: mobileW * 0.04,
        backgroundColor: 'rgba(62, 168, 232, 1)',
        padding: 5,
        borderRadius: 5,
    },
    imageContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center'
    },
    imagePreviewx: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        marginRight: 10,
        marginBottom: 10,
    },
});

export default EditEventPage;
