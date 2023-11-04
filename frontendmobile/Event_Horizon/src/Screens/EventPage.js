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

const mobileW = Dimensions.get('window').width;


const DummyData1 = [
    {
        id: 1,
        EName: 'AppVenture',
        Club: 'AITR ACM',
        EPoster: 'https://media.licdn.com/dms/image/C4E0BAQEwo11qmwiB7A/company-logo_100_100/0/1647099390145?e=1704931200&v=beta&t=lC3icTuWJOLGYqAWQOCL5cbNml535EmvpIEXKpxXuCE',
        LastDate: '2023-10-12',
        RegisteredStudents: '10',
        Venue: 'Lab-121 Block 2 First floor AITR',
        StartEventDate: '2023-10-25',
        EndEventDate: '2023-10-27',
        Eligibility: ['CSE', 'IT'],
        Banner: 'https://media.licdn.com/dms/image/D5622AQE_BnpXpEfP6A/feedshare-shrink_800/0/1695916378491?e=1698883200&v=beta&t=uZadVZteGEzb3uVMKOdr3cz_orIPb_ESkqkQwXzyWNU',
        Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis enim dignissim, imperdiet dolor at, hendrerit sem. Vestibulum consequat porta enim, molestie finibus risus congue at. Ut iaculis feugiat varius. Phasellus pellentesque enim et metus volutpat, quis sodales lorem consequat. Duis a sapien massa. Praesent bibendum consequat ex et pulvinar. Nulla mauris enim, varius tempus iaculis vel, tempor id nisi. Ut sagittis tortor neque, vel porttitor purus congue in. Fusce sit amet sodales erat. Etiam quam quam, aliquet id euismod sed, elementum id nibh. Suspendisse nunc nibh, placerat gravida ligula eu, laoreet tincidunt nulla. Fusce accumsan turpis vel ipsum molestie, laoreet bibendum nibh iaculis. Duis et feugiat turpis, at volutpat augue. Pellentesque massa nisi, sodales in laoreet sit amet, elementum sed metus. Nam tincidunt, enim sit amet iaculis gravida, lorem metus dictum orci, et laoreet ex dui eget mi. Mauris in nibh sit amet dui efficitur facilisis nec ac neque.',
    },
    {
        id: 2,
        EName: 'AppVenture',
        Club: 'AITR ACM',
        EPoster: 'https://media.licdn.com/dms/image/C4E0BAQEwo11qmwiB7A/company-logo_100_100/0/1647099390145?e=1704931200&v=beta&t=lC3icTuWJOLGYqAWQOCL5cbNml535EmvpIEXKpxXuCE',
        LastDate: '2023-10-12',
        RegisteredStudents: '10',
        Venue: 'Lab-121',
        StartEventDate: '2023-10-25',
        EndEventDate: '2023-10-27',
        Eligibility: ['CSE', 'IT'],
        Banner: 'https://media.licdn.com/dms/image/D5622AQE_BnpXpEfP6A/feedshare-shrink_800/0/1695916378491?e=1698883200&v=beta&t=uZadVZteGEzb3uVMKOdr3cz_orIPb_ESkqkQwXzyWNU',
        Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis enim dignissim, imperdiet dolor at, hendrerit sem. Vestibulum consequat porta enim, molestie finibus risus congue at. Ut iaculis feugiat varius. Phasellus pellentesque enim et metus volutpat, quis sodales lorem consequat. Duis a sapien massa. Praesent bibendum consequat ex et pulvinar. Nulla mauris enim, varius tempus iaculis vel, tempor id nisi. Ut sagittis tortor neque, vel porttitor purus congue in. Fusce sit amet sodales erat. Etiam quam quam, aliquet id euismod sed, elementum id nibh. Suspendisse nunc nibh, placerat gravida ligula eu, laoreet tincidunt nulla. Fusce accumsan turpis vel ipsum molestie, laoreet bibendum nibh iaculis. Duis et feugiat turpis, at volutpat augue. Pellentesque massa nisi, sodales in laoreet sit amet, elementum sed metus. Nam tincidunt, enim sit amet iaculis gravida, lorem metus dictum orci, et laoreet ex dui eget mi. Mauris in nibh sit amet dui efficitur facilisis nec ac neque.',
    },
];

// Main EventPage component
const EventPage = () => {
    const navigation = useNavigation();
    const [isSwitchOn, setIsSwitchOn] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [pastData, setPastData] = useState([]);
    const [upcommingData, setUpcommingData] = useState([]);
    const [pastEventData, setPastEventData] = useState([]);
    const [upcommingEventData, setUpcommingEventData] = useState([]);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        console.log("hello");
        fetchPastData();
        fetchUpcommingData();
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);

    useEffect(() => {
        fetchPastData();
        fetchUpcommingData();
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
        try {
            const response = await fetch(API_IP + 'faculty/getpastevents'); // Replace with your API endpoint
            const result = await response.json();

            setPastData(result.events);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchUpcommingData = async () => {
        console.log("hello this is fetch data for past events");
        try {
            const response = await fetch(API_IP + 'faculty/getupcomingevents'); // Replace with your API endpoint
            const result = await response.json();

            setUpcommingData(result.events);
        } catch (error) {
            console.error('Error fetching data:', error);
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
            <Text style={styles.TitleStyle}>Event Page</Text>
            <MyTabs isSwitchOn={isSwitchOn} setIsSwitchOn={setIsSwitchOn} />
            {isSwitchOn ? upcommingEventData ? <FlatList
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
            /> : <Text style={{ color: "black" }}>Hello</Text>
                :
                pastData ?
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
                    /> : <Text style={{ color: "black" }}>Hello</Text>
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
