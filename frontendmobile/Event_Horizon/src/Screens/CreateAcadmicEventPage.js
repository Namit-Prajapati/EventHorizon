import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import { Calendar } from 'react-native-calendars';
import CheckBox from '@react-native-community/checkbox';
import { API_IP } from "@env";
import { useNavigation } from '@react-navigation/native';

const mobileW = Dimensions.get('window').width;

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

const CreateAcadmicEventPage = () => {

    const navigator = useNavigation();

    const [eventName, setEventName] = useState('');
    const [eligibility, setEligibility] = useState(dummyCheckbox);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0];

    // console.log("formattedToday " + formattedToday);
    // console.log("Start date " + startDate);

    const HandleSubmit = async () => {
        setIsLoading(true);
        console.log('Create Acadmic Event');

        const apiUrl = `${API_IP}admin/addacadevent`;

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
        console.log(startDate);
        console.log(endDate);
        console.log(temp);

        await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: eventName,
                startDate: startDate,
                endDate: endDate,
                targetedDept: temp,
            }),
        })
            .then((Response) => Response.json())
            .then((json) => {
                console.log(json);
                if (json.message) {
                    alert(json.message);
                    setEventName('');
                    setEligibility(dummyCheckbox);
                    setStartDate(null);
                    setEndDate(null);
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

    const toggleCheckBox = (index) => {
        const updatedEligibility = [...eligibility];
        updatedEligibility[index].checked = !updatedEligibility[index].checked;
        setEligibility(updatedEligibility);
    };



    const handleDayPress = (date) => {
        setStartDate(date.dateString);
    };

    useEffect(() => {
        console.log(eligibility);
    }, [eligibility]);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>Create Acadmic Event</Text>

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

            <Text style={styles.label}>Targeted Department:</Text>
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
                }}
                minDate={startDate ? startDate : formattedToday}
            />

            <TouchableOpacity style={styles.Button}
                onPress={HandleSubmit}
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
        alignSelf: 'center',
        marginBottom: '2%',
    },
    label: {
        fontSize: 20,
        marginTop: '3%',
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

export default CreateAcadmicEventPage;