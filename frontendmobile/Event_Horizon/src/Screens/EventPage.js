import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    FlatList,
    Image,
    TouchableOpacity,
    Switch,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MyTabs from '../Components/Tab';

const mobileW = Dimensions.get('window').width;

const DummyData = [
    {
        id: 1,
        EName: 'AppVenture',
        Club: 'AITR ACM',
        EPoster: 'https://media.licdn.com/dms/image/C4E0BAQEwo11qmwiB7A/company-logo_100_100/0/1647099390145?e=1704931200&v=beta&t=lC3icTuWJOLGYqAWQOCL5cbNml535EmvpIEXKpxXuCE',
        LastDate: '2023-10-12',
        RegisteredStudents: '10',
        Venue: 'Lab-121 Block 2 First floor AITR',
        StartEventDate: 'date',
        EndEventDate: 'date',
        Eligibility: 'Department',
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
        StartEventDate: 'date',
        EndEventDate: 'date',
        Eligibility: 'Department',
        Banner: 'https://media.licdn.com/dms/image/D5622AQE_BnpXpEfP6A/feedshare-shrink_800/0/1695916378491?e=1698883200&v=beta&t=uZadVZteGEzb3uVMKOdr3cz_orIPb_ESkqkQwXzyWNU',
        Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis enim dignissim, imperdiet dolor at, hendrerit sem. Vestibulum consequat porta enim, molestie finibus risus congue at. Ut iaculis feugiat varius. Phasellus pellentesque enim et metus volutpat, quis sodales lorem consequat. Duis a sapien massa. Praesent bibendum consequat ex et pulvinar. Nulla mauris enim, varius tempus iaculis vel, tempor id nisi. Ut sagittis tortor neque, vel porttitor purus congue in. Fusce sit amet sodales erat. Etiam quam quam, aliquet id euismod sed, elementum id nibh. Suspendisse nunc nibh, placerat gravida ligula eu, laoreet tincidunt nulla. Fusce accumsan turpis vel ipsum molestie, laoreet bibendum nibh iaculis. Duis et feugiat turpis, at volutpat augue. Pellentesque massa nisi, sodales in laoreet sit amet, elementum sed metus. Nam tincidunt, enim sit amet iaculis gravida, lorem metus dictum orci, et laoreet ex dui eget mi. Mauris in nibh sit amet dui efficitur facilisis nec ac neque.',
    },
    {
        id: 3,
        EName: 'AppVenture',
        Club: 'AITR ACM',
        EPoster: 'https://media.licdn.com/dms/image/C4E0BAQEwo11qmwiB7A/company-logo_100_100/0/1647099390145?e=1704931200&v=beta&t=lC3icTuWJOLGYqAWQOCL5cbNml535EmvpIEXKpxXuCE',
        LastDate: '2023-10-12',
        RegisteredStudents: '10',
        Venue: 'Lab-121',
        StartEventDate: 'date',
        EndEventDate: 'datea',
        Banner: 'https://media.licdn.com/dms/image/D5622AQE_BnpXpEfP6A/feedshare-shrink_800/0/1695916378491?e=1698883200&v=beta&t=uZadVZteGEzb3uVMKOdr3cz_orIPb_ESkqkQwXzyWNU',
        Eligibility: 'Department',
        Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis enim dignissim, imperdiet dolor at, hendrerit sem. Vestibulum consequat porta enim, molestie finibus risus congue at. Ut iaculis feugiat varius. Phasellus pellentesque enim et metus volutpat, quis sodales lorem consequat. Duis a sapien massa. Praesent bibendum consequat ex et pulvinar. Nulla mauris enim, varius tempus iaculis vel, tempor id nisi. Ut sagittis tortor neque, vel porttitor purus congue in. Fusce sit amet sodales erat. Etiam quam quam, aliquet id euismod sed, elementum id nibh. Suspendisse nunc nibh, placerat gravida ligula eu, laoreet tincidunt nulla. Fusce accumsan turpis vel ipsum molestie, laoreet bibendum nibh iaculis. Duis et feugiat turpis, at volutpat augue. Pellentesque massa nisi, sodales in laoreet sit amet, elementum sed metus. Nam tincidunt, enim sit amet iaculis gravida, lorem metus dictum orci, et laoreet ex dui eget mi. Mauris in nibh sit amet dui efficitur facilisis nec ac neque.',
    },
];

const DummyData1 = [
    {
        id: 1,
        EName: 'AppVenture',
        Club: 'AITR ACM',
        EPoster: 'https://media.licdn.com/dms/image/C4E0BAQEwo11qmwiB7A/company-logo_100_100/0/1647099390145?e=1704931200&v=beta&t=lC3icTuWJOLGYqAWQOCL5cbNml535EmvpIEXKpxXuCE',
        LastDate: '2023-10-12',
        RegisteredStudents: '10',
        Venue: 'Lab-121 Block 2 First floor AITR',
        StartEventDate: 'date',
        EndEventDate: 'date',
        Eligibility: 'Department',
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
        StartEventDate: 'date',
        EndEventDate: 'date',
        Eligibility: 'Department',
        Banner: 'https://media.licdn.com/dms/image/D5622AQE_BnpXpEfP6A/feedshare-shrink_800/0/1695916378491?e=1698883200&v=beta&t=uZadVZteGEzb3uVMKOdr3cz_orIPb_ESkqkQwXzyWNU',
        Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis enim dignissim, imperdiet dolor at, hendrerit sem. Vestibulum consequat porta enim, molestie finibus risus congue at. Ut iaculis feugiat varius. Phasellus pellentesque enim et metus volutpat, quis sodales lorem consequat. Duis a sapien massa. Praesent bibendum consequat ex et pulvinar. Nulla mauris enim, varius tempus iaculis vel, tempor id nisi. Ut sagittis tortor neque, vel porttitor purus congue in. Fusce sit amet sodales erat. Etiam quam quam, aliquet id euismod sed, elementum id nibh. Suspendisse nunc nibh, placerat gravida ligula eu, laoreet tincidunt nulla. Fusce accumsan turpis vel ipsum molestie, laoreet bibendum nibh iaculis. Duis et feugiat turpis, at volutpat augue. Pellentesque massa nisi, sodales in laoreet sit amet, elementum sed metus. Nam tincidunt, enim sit amet iaculis gravida, lorem metus dictum orci, et laoreet ex dui eget mi. Mauris in nibh sit amet dui efficitur facilisis nec ac neque.',
    },
];

// Component to render each event card
const EventCard = ({ item, onPress }) => {

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.EventCardStyle}>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <Image
                        source={{
                            uri: item.EPoster,
                        }}
                        style={{
                            width: mobileW * 0.2,
                            height: mobileW * 0.2,
                            resizeMode: 'contain',
                            margin: mobileW * 0.02,
                        }}
                    />
                    <View style={{ margin: mobileW * 0.01 }}>
                        <Text style={styles.EventName}>{item.EName}</Text>
                        <Text style={styles.Club}>Organized By: {item.Club}</Text>
                        <View style={{ flexDirection: 'row', flex: 1 }}>
                            {
                                (item.StartEventDate == item.EndEventDate) ?
                                    <Text style={styles.Text}>{item.StartEventDate}</Text> :
                                    <Text style={styles.Text}>{item.StartEventDate} - {item.EndEventDate}</Text>
                            }
                        </View>
                        <Text style={styles.Text}>Last Date to Register: {item.LastDate}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

// Main EventPage component
const EventPage = () => {
    const navigation = useNavigation();
    const [isSwitchOn, setIsSwitchOn] = useState(true);

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
        return <View style={{ height: mobileW * 0.05 }} />;
    };


    return (
        <View style={styles.PageStyle}>
            <Text style={styles.TitleStyle}>Event Page</Text>
            <MyTabs isSwitchOn={isSwitchOn} setIsSwitchOn={setIsSwitchOn} />
            {isSwitchOn ? <FlatList
                data={DummyData}
                renderItem={renderEventCard}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={flatListItemSeparator}
            /> : <FlatList
                data={DummyData1}
                renderItem={renderEventCard}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={flatListItemSeparator}
            />}
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
