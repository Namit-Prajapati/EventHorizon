import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    FlatList,
    Image,
    TouchableOpacity,
    Switch,
    RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MyTabs from '../Components/Tab';
import EventCard from '../Components/EventCard';
import { API_IP } from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';

const mobileW = Dimensions.get('window').width;


// Main EventPage component
const EventPage = () => {
    const navigation = useNavigation();
    const [isSwitchOn, setIsSwitchOn] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [pastData, setPastData] = useState([]);
    const [upcommingData, setUpcommingData] = useState([]);
    const [pastEventData, setPastEventData] = useState([]);
    const [upcommingEventData, setUpcommingEventData] = useState([]);
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
        console.log(userInfo);
        fetchPastData();
        fetchUpcommingData();
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


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        console.log("hello");
        getData();
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);


    useEffect(() => {
        console.log(pastData);
        const convertedData = pastData.map(item => ({
            id: item._id,
            EName: item.name,
            Club: item.clubId.name,
            EPoster: API_IP + item.logo,
            LastDate: item.registrationDeadline.split('T')[0],
            RegisteredStudents: item.registrations.length.toString(),
            Venue: item.venueId.name,
            StartEventDate: item.startDate.split('T')[0],
            EndEventDate: item.endDate.split('T')[0],
            Eligibility: item.targetedDept,
            Banner: API_IP + item.banner,
            Description: item.description,
        }));

        console.log(convertedData);
        setPastEventData(convertedData);
    }, [pastData]);

    useEffect(() => {
        console.log(upcommingData);
        const convertedData = upcommingData.map(item => ({
            id: item._id,
            EName: item.name,
            Club: item.clubId.name,
            EPoster: API_IP + item.logo,
            LastDate: item.registrationDeadline.split('T')[0],
            RegisteredStudents: item.registrations.length.toString(),
            Venue: item.venueId.name,
            StartEventDate: item.startDate.split('T')[0],
            EndEventDate: item.endDate.split('T')[0],
            Eligibility: item.targetedDept,
            Banner: API_IP + item.banner,
            Description: item.description,
        }));

        console.log(convertedData);
        setUpcommingEventData(convertedData);
    }, [upcommingData]);

    useEffect(() => {
        console.log(pastEventData);
    }, [pastEventData])
    useEffect(() => {
        console.log(upcommingEventData);
    }, [upcommingEventData])


    const fetchPastData = async () => {
        console.log("hello this is fetch data for past events");
        if (userInfo.role == 'student') {
            try {
                const response = await fetch(API_IP + 'student/getpastevent/' + userInfo.department); // Replace with your API endpoint
                const result = await response.json();
                setPastData(result.eventByDept);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        } else {
            try {
                const response = await fetch(API_IP + 'faculty/getpastevents'); // Replace with your API endpoint
                const result = await response.json();
                setPastData(result.events);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    };

    const fetchUpcommingData = async () => {
        console.log("hello this is fetch data for past events");
        if (userInfo.role == 'student') {
            try {
                const response = await fetch(API_IP + 'student/getupcomingevent/' + userInfo.department); // Replace with your API endpoint
                const result = await response.json();
                setUpcommingData(result.eventByDept);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        } else {
            try {
                const response = await fetch(API_IP + 'faculty/getupcomingevents'); // Replace with your API endpoint
                const result = await response.json();

                setUpcommingData(result.events);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    };

    // Function to render each event card in the FlatList
    const renderEventCard = ({ item }) => {
        return (
            <EventCard
                item={item}
                onPress={() => navigation.navigate('DetailedEvent', { item })}
            />
        );
    };

    // Function to render a separator between event cards
    const flatListItemSeparator = () => {
        return <View style={{ height: mobileW * 0.01 }} />;
    };


    return (
        <View style={styles.PageStyle}>
            <Text style={styles.TitleStyle}>Events</Text>
            <MyTabs isSwitchOn={isSwitchOn} setIsSwitchOn={setIsSwitchOn} />
            {isSwitchOn ? upcommingEventData.length == 0 ? <View style={{ marginTop: mobileW * 0.6 }}>
                <Text style={{
                    color: 'black',
                    fontSize: mobileW * 0.06,
                    fontWeight: '500',
                    alignSelf: 'center'
                }}>No registered events found!</Text>
                <Text style={{
                    color: 'black',
                    fontSize: mobileW * 0.04,
                    fontWeight: '500',
                    alignSelf: 'center'
                }}>Click Below to refresh</Text>
                <TouchableOpacity onPress={onRefresh} style={{ alignSelf: 'center' }}>
                    <View style={{ backgroundColor: 'rgba(62, 168, 232,1)', borderRadius: 5, width: mobileW * 0.2, height: mobileW * 0.08, alignItems: 'center', justifyContent: "center", margin: 20 }}>
                        <Text style={{ color: 'black', fontWeight: 'bold' }}>Refresh</Text>
                    </View>
                </TouchableOpacity>
            </View> : <FlatList
                data={upcommingEventData}
                renderItem={renderEventCard}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={flatListItemSeparator}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
                :
                pastData.length == 0 ?
                    <View style={{ marginTop: mobileW * 0.6 }}>
                        <Text style={{
                            color: 'black',
                            fontSize: mobileW * 0.06,
                            fontWeight: '500',
                            alignSelf: 'center'
                        }}>No events found!</Text>
                        <Text style={{
                            color: 'black',
                            fontSize: mobileW * 0.04,
                            fontWeight: '500',
                            alignSelf: 'center'
                        }}>Click Below to refresh</Text>
                        <TouchableOpacity onPress={onRefresh} style={{ alignSelf: 'center' }}>
                            <View style={{ backgroundColor: 'rgba(62, 168, 232,1)', borderRadius: 5, width: mobileW * 0.2, height: mobileW * 0.08, alignItems: 'center', justifyContent: "center", margin: 20 }}>
                                <Text style={{ color: 'black', fontWeight: 'bold' }}>Refresh</Text>
                            </View>
                        </TouchableOpacity>
                    </View> :
                    <FlatList
                        data={pastEventData}
                        renderItem={renderEventCard}
                        keyExtractor={(item) => item.id}
                        ItemSeparatorComponent={flatListItemSeparator}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                    />
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        color: 'black',
        marginRight: 10,
        fontSize: 18,
    },
    PageStyle: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    TitleStyle: {
        color: 'black',
        fontSize: mobileW * 0.06,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: mobileW * 0.03,
    },
    EventCardStyle: {
        marginTop: mobileW * 0.03,
        borderWidth: mobileW * 0.005,
        width: mobileW * 0.9,
        borderRadius: mobileW * 0.05,
        borderColor: 'gray',
    },
    EventName: {
        color: 'black',
        fontSize: mobileW * 0.05,
        fontWeight: '800',
        marginBottom: mobileW * 0.005,
    },
    Club: {
        color: 'black',
        fontSize: mobileW * 0.04,
        fontWeight: '600',
        marginBottom: mobileW * 0.009,
    },
    Text: {
        color: 'black',
        fontSize: mobileW * 0.03,
        fontWeight: '500',
    },
});

export default EventPage;
