import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Button, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Calendar } from 'react-native-calendars';
import { launchImageLibrary } from 'react-native-image-picker';
import CheckBox from '@react-native-community/checkbox';

const mobileW = Dimensions.get('window').width;

const dummyVenues = [
    { id: 1, name: 'Venue 1', value: 'venue-1', bookedDates: ['2023-10-25'] },
    { id: 2, name: 'Venue 2', value: 'venue-2', bookedDates: ['2023-10-20', '2023-10-22'] },
    { id: 3, name: 'Venue 3', value: 'venue-3', bookedDates: [] },
];

const dummyClubs = [
    { id: 1, name: 'ACM', value: 'acm' },
    { id: 2, name: 'GDSC', value: 'gdsc' },
    { id: 3, name: 'UiPath', value: 'uipath' },
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
    const [eventName, setEventName] = useState('');
    const [description, setDescription] = useState('');
    const [organizer, setOrganizer] = useState('');
    const [logoImage, setLogoImage] = useState(null);
    const [eventPoster, setEventPoster] = useState(null);
    const [eligibility, setEligibility] = useState(dummyCheckbox);
    const [eligibilityAr, setEligibilityAr] = useState(dummyCheckbox);
    const [selectedVenue, setSelectedVenue] = useState(dummyVenues[0].value);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [lastDate, setLastDate] = useState(null);
    const [disabledDate, setDisabledDate] = useState(null);
    const [markedDates, setMarkedDates] = useState(null);

    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0];

    // console.log("formattedToday " + formattedToday);
    // console.log("Start date " + startDate);

    const HandleSubmit = () => {
        let temp = "";
        eligibility.forEach(dept => {
            if (dept.checked) {
                if (temp) {
                    temp += ",";
                }
                temp += dept.label;
            }
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
                    setLogoImage({ uri: response.assets[0].uri });
                } else if (type === 'mixed') {
                    setEventPoster({ uri: response.assets[0].uri });
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
        const venue = dummyVenues.find((venue) => venue.value === selectedVenue);
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
                    result[date] = { disabled: true };
                    return result;
                }, {}))
        }
    }, [disabledDate]);

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
        return dummyVenues.map((item) => (
            <Picker.Item key={item.id} value={item.value} label={item.name} />
        ));
    };

    const renderPickerItemsClubs = () => {
        return dummyClubs.map((item) => (
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
                <Image source={logoImage} style={styles.imagePreviewLogo} />
            )}

            {/* Poster image picker */}
            <Text style={styles.label}>Upload Event Poster:</Text>
            <TouchableOpacity style={styles.fileInputButton} onPress={() => selectImage('mixed')}>
                <Text style={styles.fileInputText}>Choose File</Text>
            </TouchableOpacity>
            {eventPoster && (
                <Image source={eventPoster} style={styles.imagePreview} />
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
                    alert(`Requested for ${selectedVenue} at ${startDate}`);
                }}
                disabled={startDate ? false : true}
            >
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: mobileW * .05,
                    color: 'white'
                }}>Create Event</Text>
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
        fontSize: 28,
        marginTop: 10,
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