import React, { useRef, useState, useEffect } from 'react';
import { View, Text, RefreshControl, TouchableHighlight, ScrollView, FlatList, Dimensions, Touchable } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import styles from '../Stylesheet/stylesheet';
import { API_IP } from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';

const mobileW = Dimensions.get('window').width;

function addTypeProperty(array) {
    for (let i = 0; i < array.length; i++) {
        array[i].type = "A";
    }
    return array;
}
function addTypeNProperty(array) {
    for (let i = 0; i < array.length; i++) {
        array[i].type = "N";
    }
    return array;
}

const Home = () => {
    const navigator = useNavigation();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        console.log("hello");
        getData();
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);

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
    const [nEData, setNEData] = useState([]);
    const [Today, setToday] = useState([]);
    const [TodayAcd, setTodayAcd] = useState([]);
    const [NToday, setNToday] = useState([]);
    const [NTodayData, setNTodayData] = useState([]);
    const [noramlEventDates, setNoramlEventDates] = useState(null);
    const [acadmicEventDates, setAcadmicEventDates] = useState(null);

    const [storedData, setStoredData] = useState([]);
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        console.log(storedData);
        const convertedData = {};
        storedData.forEach((item) => {
            const { key, value } = item;
            convertedData[key] = value;
        });
        setUserInfo(convertedData);
    }, [storedData])

    useEffect(() => {
        console.log("Role : ");
        console.log(userInfo.department);
        if (userInfo.role == 'student') {
            console.log(API_IP + 'student/getallacadevent?department=' + userInfo.department);
        } else {
            console.log(API_IP + 'faculty/geteventbyid?userId=' + userInfo.userId);
        }
        FetchTodaysEvent();
        fetchAllAcadmicEventData();
        fetchTodayAcadmicEventData();
        FetchAllEvents();
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
    useEffect(() => {
        console.log("nEData");
        console.log(nEData);
        const dateArray = [];

        nEData.forEach(event => {
            const startDate = new Date(event.startDate);
            const endDate = new Date(event.endDate);
            const currentDate = new Date(startDate);

            while (currentDate <= endDate) {
                dateArray.push(currentDate.toISOString().split('T')[0]);
                currentDate.setDate(currentDate.getDate() + 1);
            }
        });

        console.log(dateArray);

        setNoramlEventDates(
            dateArray.reduce((result, date) => {
                result[date.split('T')[0]] = { marked: true, dotColor: 'blue' };
                return result;
            }, {}));

    }, [nEData]);


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
        console.log("Today");
        console.log(Today);
        const resultArray = addTypeProperty(Today);
        setTodayAcd([...resultArray]);
        // setmergedData([...resultArray, ...DummyData1]);
    }, [Today]);

    useEffect(() => {
        console.log("TodayAcd")
        console.log(TodayAcd)
    }, [TodayAcd])


    useEffect(() => {
        console.log("NToday");
        console.log(NToday);
        const resultArray = addTypeNProperty(NToday);
        setNTodayData([...resultArray]);
    }, [NToday])

    useEffect(() => {
        console.log("NTodayData")
        console.log(NTodayData)
    }, [NTodayData])


    const FetchTodaysEvent = async () => {
        console.log("hello this is FetchTodaysEvent");
        if (userInfo.role == 'student') {
            try {
                const response = await fetch(API_IP + 'student/eventcurrdate/' + formattedToday + '?department=' + userInfo.department); // Replace with your API endpoint
                const result = await response.json();
                setNToday(result.eventByDept);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        } else {
            try {
                const response = await fetch(API_IP + 'faculty/geteventoncurrentdate/' + formattedToday); // Replace with your API endpoint
                const result = await response.json();
                setNToday(result.events);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }

    const FetchAllEvents = async () => {
        console.log("hello this is FetchAllEvents");
        if (userInfo.role == 'student') {
            try {
                const response = await fetch(API_IP + 'student/getallevent?department=' + userInfo.department); // Replace with your API endpoint
                const result = await response.json();

                setNEData(result.eventByDept);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        } else {
            try {
                const response = await fetch(API_IP + 'faculty/getallevent'); // Replace with your API endpoint
                const result = await response.json();
                setNEData(result.events);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }

    const fetchAllAcadmicEventData = async () => {
        console.log("hello this is fetch");
        if (userInfo.role == 'student') {
            try {
                const response = await fetch(API_IP + 'student/getallacadevent?department=' + userInfo.department); // Replace with your API endpoint
                const result = await response.json();

                setData(result.acadEventByDept);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        } else {
            try {
                const response = await fetch(API_IP + 'admin/getallacadevent/'); // Replace with your API endpoint
                const result = await response.json();
                setData(result.academicEvents);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    };

    const fetchTodayAcadmicEventData = async () => {
        console.log("hello this is fetch");
        if (userInfo.role == 'student') {
            try {
                const response = await fetch(API_IP + 'student/acadeventcurrdate/' + formattedToday + '?department=' + userInfo.department);
                console.log(API_IP + 'admin/acadeventcurrdate/' + formattedToday) // Replace with your API endpoint
                const result = await response.json();
                setToday(result.acadEventByDept);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        } else {
            try {
                const response = await fetch(API_IP + 'admin/acadeventcurrdate/' + formattedToday);
                console.log(API_IP + 'admin/acadeventcurrdate/' + formattedToday) // Replace with your API endpoint
                const result = await response.json();
                setToday(result.academicEvents);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

    };

    const getMarkedDates = () => {
        const markedDates = {};

        // Loop through academic event data and mark dates with red dots
        data.forEach(event => {
            const startDate = new Date(event.startDate);
            const endDate = new Date(event.endDate);
            const currentDate = new Date(startDate);

            while (currentDate <= endDate) {
                const dateKey = currentDate.toISOString().split('T')[0];
                if (markedDates[dateKey]) {
                    // If the date is already marked, increment the dot count for academic events
                    markedDates[dateKey].dots = markedDates[dateKey].dots ? [...markedDates[dateKey].dots, { color: 'red' }] : [{ color: 'red' }];
                } else {
                    // If the date is not marked, create a new entry with a red dot for academic events
                    markedDates[dateKey] = { marked: true, dots: [{ color: 'red' }] };
                }
                currentDate.setDate(currentDate.getDate() + 1);
            }
        });

        // Loop through non-academic event data and mark dates with blue dots
        nEData.forEach(event => {
            const startDate = new Date(event.startDate);
            const endDate = new Date(event.endDate);
            const currentDate = new Date(startDate);

            while (currentDate <= endDate) {
                const dateKey = currentDate.toISOString().split('T')[0];
                if (markedDates[dateKey]) {
                    // If the date is already marked, increment the dot count for non-academic events
                    markedDates[dateKey].dots = markedDates[dateKey].dots ? [...markedDates[dateKey].dots, { color: 'blue' }] : [{ color: 'blue' }];
                } else {
                    // If the date is not marked, create a new entry with a blue dot for non-academic events
                    markedDates[dateKey] = { marked: true, dots: [{ color: 'blue' }] };
                }
                currentDate.setDate(currentDate.getDate() + 1);
            }
        });

        return markedDates;
    };


    const handleDayPress = async (day) => {

        // Perform any asynchronous operations here if needed
        await someAsyncOperation();

        // Navigate to the next screen
        navigator.navigate('EHome', { date: day.dateString, AcadmicEvent: data, NormalEvent: nEData });
    };

    const renderEventCard = ({ item }) => {
        return (
            <TouchableOpacity

                onPress={() => { item.type == 'N' ? navigator.navigate('DetailedEvent', { item: { id: item._id } }) : navigator.navigate('DetaailedAcadmicEventsPage', { item }) }}
                style={{
                    borderWidth: 1, borderColor: 'lightgray', marginHorizontal: '2%', padding: 10, flexDirection: 'row',
                    borderRadius: 5,
                }}>
                <View style={{ height: 20, width: 20, borderRadius: 20, alignSelf: 'center', backgroundColor: (item.type == 'A') ? 'red' : 'rgba(62, 168, 232,1)' }} />
                <View style={{ alignContent: 'center', justifyContent: 'center', marginLeft: '5%' }}>
                    <Text style={{ color: 'black', fontSize: 18, fontWeight: '400' }}>{item.name}</Text>
                    {item.type == 'N' ? <Text style={{ color: 'gray', fontSize: 14 }}>Lab 121</Text> : null}
                </View>
            </TouchableOpacity>
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
                        ...noramlEventDates,
                        // Marked dates logic here
                    }}
                />
                <Text style={[styles.TextStyle, { marginLeft: '2%', fontWeight: '600', marginVertical: 20, fontFamily: 'Montserrat', }]}>{currentDay + ", " + date + ' ' + currentMonth + " " + year}</Text>
                <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                    {/* <Icon name='calendar-outline' size={24} color="rgba(0, 0, 0, .7)" style={{ marginLeft: '2%', alignSelf: 'center' }} /> */}
                    <Text style={[styles.TextStyle, { marginLeft: '2%', fontWeight: '400' }]}>Today's Event </Text>
                </View>
                <View style={{ height: mobileW * 0.5 }}>
                    {[...TodayAcd, ...NTodayData].length == 0 ?
                        <View>
                            <Text style={{
                                color: 'black',
                                fontSize: mobileW * 0.06,
                                fontWeight: '500',
                                alignSelf: 'center',
                                marginTop: mobileW * 0.2,
                            }}>No events found for Today!</Text>
                        </View> : <FlatList
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                />
                            }
                            data={[...TodayAcd, ...NTodayData]}
                            renderItem={renderEventCard}
                            keyExtractor={(item) => item._id}
                            ItemSeparatorComponent={flatListItemSeparator}
                        />}

                </View>
            </View>
            {/* <BNavBar onPress={() => { drawer.current.openDrawer() }} /> */}
        </View>
    );
};

export default Home;
