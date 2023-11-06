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
import Icon from 'react-native-vector-icons/Ionicons';

const mobileW = Dimensions.get('window').width;


// Main EventPage component
const EventByClub = ({ route }) => {

    const item = route.params.item;

    console.log(item);

    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState(false);
    const [upcommingData, setUpcommingData] = useState([]);
    const [upcommingEventData, setUpcommingEventData] = useState([]);

    useEffect(() => {
        fetchUpcommingData();
    }, [])



    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        console.log("hello");
        fetchUpcommingData();
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);

    useEffect(() => {
        console.log(upcommingData);
        const convertedData = upcommingData.map(item => ({
            id: item._id,
            name: item.name,
        }));

        console.log(convertedData);
        setUpcommingEventData(convertedData);
    }, [upcommingData]);

    // useEffect(() => {
    //     console.log(upcommingEventData);
    // }, [upcommingEventData])

    const fetchUpcommingData = async () => {
        console.log("hello this is fetch data for past events");
        try {
            const response = await fetch(API_IP + 'faculty/eventsbyclub/' + item._id); // Replace with your API endpoint
            const result = await response.json();
            console.log(result);
            if (result) {
                setUpcommingData(result);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Function to render each event card in the FlatList
    const renderEventCard = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => { navigation.navigate('DetailedEvent', { item }) }}>
                <View style={styles.club}>
                    <Text style={styles.label}>{item.name}</Text>
                    <Icon name='enter-outline' size={24} color="rgba(0, 0, 0, .7)" style={{ marginRight: 10 }} />
                </View>
            </TouchableOpacity>
        );
    };

    // Function to render a separator between event cards
    const flatListItemSeparator = () => {
        return <View style={{ height: mobileW * 0.01 }} />;
    };


    return (
        <View style={styles.PageStyle}>
            <Text style={styles.TitleStyle}>Events By {item.name}</Text>
            {
                upcommingEventData.length == 0 ?
                    <View style={{ marginTop: mobileW * 0.6 }}>
                        <Text style={{
                            color: 'black',
                            fontSize: mobileW * 0.06,
                            fontWeight: '500',
                            alignSelf: 'center'
                        }}>No Events Found</Text>
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
                    </View>
                    : <FlatList
                        data={upcommingEventData}
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
    }, label: {
        color: 'black',
        marginRight: 10,
        fontSize: 18,
        flex: 1,
    },
    PageStyle: {
        flex: 1,
        backgroundColor: 'white',
        // alignItems: 'center',
    },
    TitleStyle: {
        color: 'black',
        fontSize: mobileW * 0.1,
        fontWeight: 'bold',
        alignSelf: 'center',
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
    Text: {
        color: 'black',
        fontSize: mobileW * 0.03,
        fontWeight: '500',
    },
});

export default EventByClub;
