import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Button, TouchableOpacity, TextInput, ScrollView, Image, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Calendar } from 'react-native-calendars';
import { launchImageLibrary } from 'react-native-image-picker';
import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from '@react-navigation/native';
import { API_IP } from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';

const mobileW = Dimensions.get('window').width;

const dummyVenues = [
    { id: 1, name: 'Venue 1', value: 'venue-1', bookedDates: ['2023-10-25'] },
    { id: 2, name: 'Venue 2', value: 'venue-2', bookedDates: ['2023-10-20', '2023-10-22'] },
    { id: 3, name: 'Venue 3', value: 'venue-3', bookedDates: [] },
];

const dummyClubs = [
    { id: 1, name: 'ACM', value: 'ACM' },
    { id: 2, name: 'GDSC', value: 'GDSC' },
    { id: 3, name: 'UiPath', value: 'UIPATH' },
];

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

const CreateEventPage = () => {

    const navigator = useNavigation();

    const [venueInfo, setVenueInfo] = useState([]);
    const [clubInfo, setClubInfo] = useState([]);
    const [eventName, setEventName] = useState('');
    const [description, setDescription] = useState('');
    const [organizer, setOrganizer] = useState('');
    const [logoImage, setLogoImage] = useState(null);
    const [eventPoster, setEventPoster] = useState(null);
    const [eligibility, setEligibility] = useState(dummyCheckbox);
    const [eligibilityAr, setEligibilityAr] = useState(dummyCheckbox);
    const [selectedVenue, setSelectedVenue] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [lastDate, setLastDate] = useState(null);
    const [disabledDate, setDisabledDate] = useState(null);
    const [markedDates, setMarkedDates] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [Cdata, setCData] = useState([]);
    const [storedData, setStoredData] = useState([]);
    const [userInfo, setUserInfo] = useState({});


    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        // console.log(data);
        const convertedData = data.map(venue => ({
            id: venue._id,
            name: venue.name,
            value: venue._id,
            bookedDates: venue.bookedOn
        }));
        console.log("Venue Data");
        console.log(convertedData);
        setVenueInfo(convertedData);
    }, [data]);

    useEffect(() => {
        // console.log("Clubs");
        // console.log(Cdata);
        if (Cdata) {
            const transformedData = Cdata.map(item => ({
                id: item._id,
                name: item.name,
                value: item._id
            }));
            setClubInfo(transformedData);
        }
    }, [Cdata]);

    useEffect(() => {
        // console.log("Clubs Info");
        // console.log(clubInfo);
    }, [clubInfo]);

    const fetchCData = async () => {
        // console.log("hello this is Club Data");
        // console.log(API_IP + 'faculty/getclubsoffaculty/' + userInfo.userId);
        try {
            const response = await fetch(API_IP + 'faculty/getclubsoffaculty/' + userInfo.userId); // Replace with your API endpoint
            const result = await response.json();

            setCData(result.facultyClubs);
        } catch (error) {
            // console.error('Error fetching data:', error);
        }
    };

    const fetchData = async () => {
        // console.log("hello this is fetch");
        try {
            const response = await fetch(API_IP + 'admin/getallvenue/'); // Replace with your API endpoint
            const result = await response.json();

            setData(result.venues);
        } catch (error) {
            // console.error('Error fetching data:', error);
        }
    };


    useEffect(() => {
        // console.log(storedData);
        const convertedData = {};
        storedData.forEach((item) => {
            const { key, value } = item;
            convertedData[key] = value;
        });
        setUserInfo(convertedData);

    }, [storedData])

    useEffect(() => {
        fetchData();
        fetchCData();
        // console.log(userInfo);
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

    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0];



    const HandleSubmit = async () => {
        setIsLoading(true);
        console.log('Create venue');

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

        console.log(eventName);
        console.log(description);
        console.log(temp);
        console.log(selectedVenue);
        console.log(organizer);
        console.log(userInfo.userId);
        console.log(lastDate);
        console.log(startDate);
        console.log(endDate);
        console.log("uri:" + logoImage.uri)
        console.log("type:" + logoImage.type)
        console.log("name:" + logoImage.fileName)
        console.log("uri:" + eventPoster.uri)
        console.log("type:" + eventPoster.type)
        console.log("name:" + eventPoster.fileName)


        formData.append('name', eventName);
        formData.append('description', description);
        formData.append('targetedDept', temp);
        formData.append('venueId', selectedVenue);
        formData.append('clubId', organizer);
        formData.append('facultyId', userInfo.userId);
        formData.append('registrationDeadline', lastDate);
        formData.append('startDate', startDate);
        formData.append('endDate', endDate);
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
                    setEventName('');
                    setDescription('');
                    setOrganizer('');
                    setLogoImage('');
                    setEventPoster('');
                    setEligibility(dummyCheckbox);
                    // setSelectedVenue('');
                    setStartDate(null);
                    setEndDate(null);
                    setLastDate(null);
                    setDisabledDate(null);
                    setMarkedDates(null);
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
                if (type === 'photo') {
                    setLogoImage(response.assets[0]);
                } else if (type === 'mixed') {
                    setEventPoster(response.assets[0]);
                }
            }
        });
    };

    const toggleCheckBox = (index) => {
        const updatedEligibility = [...eligibility];
        updatedEligibility[index].checked = !updatedEligibility[index].checked;
        setEligibility(updatedEligibility);
    };

    // const handleLogoImageUpload = (event) => {
    //     const selectedImage = event.target.files[0];
    //     setLogoImage(URL.createObjectURL(selectedImage));
    // };

    useEffect(() => {
        // Find the selected venue's booked dates
        const venue = venueInfo.find((venue) => venue.value === selectedVenue);
        if (venue) {
            console.log(selectedVenue);
            setDisabledDate(venue.bookedDates);
            setStartDate(null);
        }
    }, [selectedVenue]);

    useEffect(() => {
        console.log(disabledDate);
        if (disabledDate) {
            setMarkedDates(
                disabledDate.reduce((result, date) => {
                    result[date.split('T')[0]] = { disabled: true };
                    return result;
                }, {}))
        }
    }, [disabledDate]);

    useEffect(() => {
        console.log(markedDates)

    }, [markedDates])


    const handleDayPress = (date) => {
        setStartDate(date.dateString);
    };

    useEffect(() => {
        console.log(startDate);
    }, [startDate]);

    useEffect(() => {
        console.log(eligibility);
    }, [eligibility]);

    const renderPickerItemsVenues = () => {
        return venueInfo.map((item) => (
            <Picker.Item key={item.id} value={item.value} label={item.name} />
        ));
    };

    const renderPickerItemsClubs = () => {
        return clubInfo.map((item) => (
            <Picker.Item key={item.id} value={item.value} label={item.name} />
        ));
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>Create Event</Text>

            {/* Event Namee input */}
            <Text style={styles.label}>Event Name :</Text>
            <TextInput
                color={'black'}
                placeholderTextColor={'rgba(0,0,0,0.5)'}
                style={styles.input}
                onChangeText={setEventName}
                value={eventName}
                placeholder={'Enter Event Name'}
            />

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
            {/* Organizers Club name input */}
            <Text style={styles.label}>Organized By:</Text>
            <Picker
                selectedValue={organizer}
                onValueChange={(itemValue) => setOrganizer(itemValue)}
                style={styles.picker}
            >
                {renderPickerItemsClubs()}
            </Picker>

            {/* Club logo image picker */}
            <Text style={styles.label}>Upload Club Logo:</Text>
            <TouchableOpacity style={styles.fileInputButton} onPress={() => selectImage('photo')}>
                <Text style={styles.fileInputText}>Choose File</Text>
            </TouchableOpacity>
            {logoImage && (
                <Image source={{ uri: logoImage.uri }} style={styles.imagePreviewLogo} />
            )}

            {/* Poster image picker */}
            <Text style={styles.label}>Upload Event Poster:</Text>
            <TouchableOpacity style={styles.fileInputButton} onPress={() => selectImage('mixed')}>
                <Text style={styles.fileInputText}>Choose File</Text>
            </TouchableOpacity>
            {eventPoster && (
                <Image source={{ uri: eventPoster.uri }} style={styles.imagePreview} />
            )}

            <Text style={styles.label}>Eligibility:</Text>
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

            {/* Select venue from picker dropdown */}
            <Text style={styles.label}>Select Venue</Text>
            <Picker
                selectedValue={selectedVenue}
                onValueChange={(itemValue) => setSelectedVenue(itemValue)}
                style={styles.picker}
            >
                {renderPickerItemsVenues()}
            </Picker>

            {/* Start date selection */}
            <Text style={styles.label}>Select Start Date</Text>
            <Calendar
                enableSwipeMonths
                onDayPress={handleDayPress}
                style={{
                    borderWidth: 2,
                    borderColor: 'gray',
                    margin: mobileW * 0.04,
                    borderRadius: 5,
                }}
                markedDates={{
                    [startDate]: { selected: true, selectedColor: 'rgba(62, 168, 232, 1)' }, // Adjust the color as needed
                    ...markedDates, // Include other marked dates
                }}
                minDate={formattedToday}
            />

            {/* End date selection */}
            <Text style={styles.label}>Select End Date</Text>
            <Calendar
                enableSwipeMonths
                onDayPress={(date) => {
                    setEndDate(date.dateString);
                }}
                style={{
                    borderWidth: 2,
                    borderColor: 'gray',
                    margin: mobileW * 0.04,
                    borderRadius: 5,
                }}
                markedDates={{
                    [endDate]: { selected: true, selectedColor: 'rgba(62, 168, 232, 1)' }, // Adjust the color as needed
                    ...markedDates, // Include other marked dates
                }}
                minDate={startDate ? startDate : formattedToday}
            />

            {/* last date selection */}
            <Text style={styles.label}>Select Last Date to Register</Text>
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
                    // ...markedDates, // Include other marked dates
                }}
                minDate={formattedToday}
                maxDate={startDate}
            />

            <TouchableOpacity style={styles.Button}
                onPress={() => {
                    HandleSubmit();
                }}
                disabled={startDate ? false : true}
            >
                {isLoading ? (
                    <ActivityIndicator size="small" color="white" /> // Show the progress indicator when loading
                ) : (
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: mobileW * .05,
                        color: 'white'
                    }}>Create Event</Text>
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
    label: {
        fontSize: 20,
        marginTop: 5,
        color: 'black',
        marginLeft: mobileW * 0.04,
        fontWeight: '600',
    },
    picker: {
        margin: mobileW * 0.04,
        color: 'white',
        backgroundColor: 'rgba(62, 168, 232, 1)',
        borderRadius: 30,
    },
    datePicker: {
        width: mobileW,
        marginTop: 20,
        backgroundColor: 'rgba(62, 168, 232, 1)'
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
        marginBottom: mobileW * 0.008,
        width: mobileW * 0.3,
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    fileInputText: {
        color: 'black',
    },
    imagePreviewLogo: {
        width: mobileW * 0.4,
        height: mobileW * 0.4,
        resizeMode: 'cover',
        alignSelf: 'center',
        borderRadius: 10,
    },
    imagePreview: {
        width: mobileW * 0.8,
        height: mobileW,
        resizeMode: 'cover',
        alignSelf: 'center',
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
});

export default CreateEventPage;