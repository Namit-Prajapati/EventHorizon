import React, { useRef, useState, useEffect } from 'react';
import { View, Text, DrawerLayoutAndroid, TouchableHighlight, ScrollView, FlatList, Dimensions } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import styles from '../Stylesheet/stylesheet';
import { API_IP } from "@env";

const mobileW = Dimensions.get('window').width;


const DummyData1 = [
    { _id: "4", type: "N", name: 'Test' },
    { _id: "5", type: "N", name: 'Test' },
    { _id: "6", type: "N", name: 'Test' },
];

function addTypeProperty(array) {
    for (let i = 0; i < array.length; i++) {
        array[i].type = "A";
    }
    return array;
}

const Home = () => {
    const navigator = useNavigation();

    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0];
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = daysOfWeek[today.getDay()];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const currentMonth = months[today.getMonth()];

    const [data, setData] = useState([]);
    const [Today, setToday] = useState([]);
    const [noramlEventDates, setNoramlEventDates] = useState(null);
    const [acadmicEventDates, setAcadmicEventDates] = useState(null);
    const [mergedData, setmergedData] = useState(null);

    useEffect(() => {
        fetchAllAcadmicEventData();
        fetchTodayAcadmicEventData();
    }, []);

    useEffect(() => {
        console.log(data);
        const dateArray = [];

        data.forEach(event => {
            const startDate = new Date(event.startDate);
            const endDate = new Date(event.endDate);
            const currentDate = new Date(startDate);

            while (currentDate <= endDate) {
                dateArray.push(currentDate.toISOString().split('T')[0]);
                currentDate.setDate(currentDate.getDate() + 1);
            }
        });

        console.log(dateArray);

        setAcadmicEventDates(
            dateArray.reduce((result, date) => {
                result[date.split('T')[0]] = { marked: true, dotColor: 'red' };
                return result;
            }, {}));

    }, [data]);

    useEffect(() => {
        console.log(Today);
        const resultArray = addTypeProperty(Today);
        setmergedData([...resultArray, ...DummyData1]);
    }, [Today]);

    const fetchAllAcadmicEventData = async () => {
        console.log("hello this is fetch");
        try {
            const response = await fetch(API_IP + 'admin/getallacadevent/'); // Replace with your API endpoint
            const result = await response.json();

            setData(result.academicEvents);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchTodayAcadmicEventData = async () => {
        console.log("hello this is fetch");
        try {
            const response = await fetch(API_IP + 'admin/acadeventcurrdate/' + formattedToday);
            console.log(API_IP + 'admin/acadeventcurrdate/' + formattedToday) // Replace with your API endpoint
            const result = await response.json();

            setToday(result.academicEvents);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleDayPress = async (day) => {

        // Perform any asynchronous operations here if needed
        await someAsyncOperation();

        // Navigate to the next screen
        navigator.navigate('EHome', { date: day.dateString, AcadmicEvent: data });
    };

    const renderEventCard = ({ item }) => {
        return (
            <View style={{
                borderWidth: 1, borderColor: 'lightgray', marginHorizontal: '2%', padding: 10, flexDirection: 'row',
                borderRadius: 5,
            }}>
                <View style={{ height: 20, width: 20, borderRadius: 20, alignSelf: 'center', backgroundColor: (item.type == 'A') ? 'red' : 'rgba(62, 168, 232,1)' }} />
                <View style={{ alignContent: 'center', justifyContent: 'center', marginLeft: '5%' }}>
                    <Text style={{ color: 'black', fontSize: 18, fontWeight: '400' }}>{item.name}</Text>
                    {item.type == 'N' ? <Text style={{ color: 'gray', fontSize: 14 }}>Venue</Text> : null}
                </View>
            </View>
        );
    };

    const flatListItemSeparator = () => {
        return <View style={{ height: mobileW * 0.01 }} />;
    };

    const someAsyncOperation = async () => {
        // Simulate an asynchronous operation (e.g., API call)
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Async operation completed');
                resolve();
            }, 1000); // Simulate a delay of 1 second
        });
    };

    return (
        <View style={styles.AppBg}>
            {/* <NavBar onPress={() => { navigator.openDrawer() }} /> */}
            {/* <NavBar /> */}
            {/* <Text style={styles.TextStyle}>Hello World!</Text> */}
            <View style={styles.AppBg}>
                <Calendar
                    enableSwipeMonths
                    style={{
                        borderWidth: 2,
                        borderColor: 'gray',
                        margin: '2%',
                        borderRadius: 5,
                    }}
                    onDayPress={handleDayPress}
                    markedDates={{
                        ...acadmicEventDates,
                        // Marked dates logic here
                    }}
                />
                <Text style={[styles.TextStyle, { marginLeft: '2%', fontWeight: '600', marginVertical: 20, fontFamily: 'Montserrat', }]}>{currentDay + ", " + date + ' ' + currentMonth + " " + year}</Text>
                <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                    {/* <Icon name='calendar-outline' size={24} color="rgba(0, 0, 0, .7)" style={{ marginLeft: '2%', alignSelf: 'center' }} /> */}
                    <Text style={[styles.TextStyle, { marginLeft: '2%', fontWeight: '400' }]}>Today's Event </Text>
                </View>
                <View style={{ height: mobileW * 0.5 }}>
                    <FlatList
                        data={mergedData}
                        renderItem={renderEventCard}
                        keyExtractor={(item) => item._id}
                        ItemSeparatorComponent={flatListItemSeparator}
                    />
                </View>
            </View>
            {/* <BNavBar onPress={() => { drawer.current.openDrawer() }} /> */}
        </View>
    );
};

export default Home;
