import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
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
const MyEvents = () => {
    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState(false);
    const [upcommingData, setUpcommingData] = useState([]);
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
        console.log(upcommingData);
    }, [upcommingData]);

    useEffect(() => {
        console.log(upcommingEventData);
    }, [upcommingEventData])

    const fetchUpcommingData = async () => {
        console.log("hello this is fetch data for past events");
        try {
            const response = await fetch(API_IP + 'faculty/getclubsoffaculty/' + userInfo.userId); // Replace with your API endpoint
            const result = await response.json();
            console.log(result);
            if (result.facultyClubs) {
                setUpcommingData(result.facultyClubs);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    return (
        <View style={styles.PageStyle}>
            <Text style={styles.TitleStyle}>My Clubs</Text>
            {
                upcommingData ?
                    <FlatList
                        data={upcommingData}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => { navigation.navigate('EventByClub', { item }) }}>
                                <View style={styles.club}>
                                    <Text style={styles.label}>{item.name}</Text>
                                    <Icon name='enter-outline' size={24} color="rgba(0, 0, 0, .7)" style={{ marginRight: 10 }} />
                                </View>
                            </TouchableOpacity>
                        )}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                    /> :
                    null
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
        flex: 1,
    },
    PageStyle: {
        flex: 1,
        backgroundColor: 'white',
    },
    club: {
        borderColor: 'rgba(61,156,211,0.5)',
        borderWidth: mobileW * .005,
        marginHorizontal: mobileW * 0.04,
        borderRadius: 10,
        marginBottom: mobileW * 0.03,
        padding: "2%",
        flexDirection: 'row',
        marginTop: '4%',
    },
    TitleStyle: {
        color: 'black',
        fontSize: mobileW * 0.075,
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

export default MyEvents;
