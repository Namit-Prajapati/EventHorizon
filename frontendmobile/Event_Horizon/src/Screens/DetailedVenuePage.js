import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { Calendar } from 'react-native-calendars';
import { API_IP } from "@env";
import { useNavigation } from '@react-navigation/native';
import EventCard from '../Components/EventCard';

let mobileW = Dimensions.get('window').width;

const DummyData = [
    {
        id: 1,
        EName: 'AppVenture1',
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
        EName: 'AppVenture2',
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
    {
        id: 3,
        EName: 'AppVenture3',
        Club: 'AITR ACM',
        EPoster: 'https://media.licdn.com/dms/image/C4E0BAQEwo11qmwiB7A/company-logo_100_100/0/1647099390145?e=1704931200&v=beta&t=lC3icTuWJOLGYqAWQOCL5cbNml535EmvpIEXKpxXuCE',
        LastDate: '2023-10-12',
        RegisteredStudents: '10',
        Venue: 'Lab-121',
        StartEventDate: '2023-10-25',
        EndEventDate: '2023-10-27',
        Banner: 'https://media.licdn.com/dms/image/D5622AQE_BnpXpEfP6A/feedshare-shrink_800/0/1695916378491?e=1698883200&v=beta&t=uZadVZteGEzb3uVMKOdr3cz_orIPb_ESkqkQwXzyWNU',
        Eligibility: ['CSE', 'IT'],
        Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis enim dignissim, imperdiet dolor at, hendrerit sem. Vestibulum consequat porta enim, molestie finibus risus congue at. Ut iaculis feugiat varius. Phasellus pellentesque enim et metus volutpat, quis sodales lorem consequat. Duis a sapien massa. Praesent bibendum consequat ex et pulvinar. Nulla mauris enim, varius tempus iaculis vel, tempor id nisi. Ut sagittis tortor neque, vel porttitor purus congue in. Fusce sit amet sodales erat. Etiam quam quam, aliquet id euismod sed, elementum id nibh. Suspendisse nunc nibh, placerat gravida ligula eu, laoreet tincidunt nulla. Fusce accumsan turpis vel ipsum molestie, laoreet bibendum nibh iaculis. Duis et feugiat turpis, at volutpat augue. Pellentesque massa nisi, sodales in laoreet sit amet, elementum sed metus. Nam tincidunt, enim sit amet iaculis gravida, lorem metus dictum orci, et laoreet ex dui eget mi. Mauris in nibh sit amet dui efficitur facilisis nec ac neque.',
    },
    {
        id: 4,
        EName: 'AppVenture4',
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
        id: 5,
        EName: 'AppVenture5',
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
    {
        id: 6,
        EName: 'AppVenture6',
        Club: 'AITR ACM',
        EPoster: 'https://media.licdn.com/dms/image/C4E0BAQEwo11qmwiB7A/company-logo_100_100/0/1647099390145?e=1704931200&v=beta&t=lC3icTuWJOLGYqAWQOCL5cbNml535EmvpIEXKpxXuCE',
        LastDate: '2023-10-12',
        RegisteredStudents: '10',
        Venue: 'Lab-121',
        StartEventDate: '2023-10-25',
        EndEventDate: '2023-10-27',
        Banner: 'https://media.licdn.com/dms/image/D5622AQE_BnpXpEfP6A/feedshare-shrink_800/0/1695916378491?e=1698883200&v=beta&t=uZadVZteGEzb3uVMKOdr3cz_orIPb_ESkqkQwXzyWNU',
        Eligibility: ['CSE', 'IT'],
        Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis enim dignissim, imperdiet dolor at, hendrerit sem. Vestibulum consequat porta enim, molestie finibus risus congue at. Ut iaculis feugiat varius. Phasellus pellentesque enim et metus volutpat, quis sodales lorem consequat. Duis a sapien massa. Praesent bibendum consequat ex et pulvinar. Nulla mauris enim, varius tempus iaculis vel, tempor id nisi. Ut sagittis tortor neque, vel porttitor purus congue in. Fusce sit amet sodales erat. Etiam quam quam, aliquet id euismod sed, elementum id nibh. Suspendisse nunc nibh, placerat gravida ligula eu, laoreet tincidunt nulla. Fusce accumsan turpis vel ipsum molestie, laoreet bibendum nibh iaculis. Duis et feugiat turpis, at volutpat augue. Pellentesque massa nisi, sodales in laoreet sit amet, elementum sed metus. Nam tincidunt, enim sit amet iaculis gravida, lorem metus dictum orci, et laoreet ex dui eget mi. Mauris in nibh sit amet dui efficitur facilisis nec ac neque.',
    },
];

const DetailedVenuePage = ({ route }) => {

    const navigation = useNavigation();

    const { item } = route.params;
    const [VenueImages, setVenueImages] = useState(null);
    const [markedDates, setMarkedDates] = useState(null);

    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0];

    useEffect(() => {
        setMarkedDates(
            item.bookedOn.reduce((result, date) => {
                result[date.split('T')[0]] = { selected: true, selectedColor: 'red' };
                return result;
            }, {}))
        console.log("check");
    }, []);

    useEffect(() => {
        let Images = [];
        item.venueImages.forEach(element => {
            Images.push(
                {
                    url: API_IP + element
                }
            );
        });
        setVenueImages(Images);
    }, []);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>{item.name} </Text>
            {
                VenueImages ? <View style={[styles.ContainerX, { height: mobileW * 0.9, }]}>
                    <ImageViewer
                        imageUrls={VenueImages}
                        enableSwipeDown
                    />
                </View> : null
            }
            <View style={[styles.ContainerX, { flexDirection: 'row', alignContent: 'center', padding: 10 }]}>
                <View style={{
                    backgroundColor: 'rgba(62, 168, 232,1)',
                    height: 35,
                    width: 8,
                    // position: 'absolute',
                    // marginTop: '200'
                    marginLeft: -10
                }} />
                <Text style={[styles.lable, { alignSelf: 'center' }]}>Capacity :</Text>
                <Text style={[styles.lableDescription, { alignSelf: 'center', marginHorizontal: mobileW * 0.005, }]}>{item.capacity} </Text>
            </View>
            <View style={[styles.ContainerX, { alignContent: 'center', padding: 10 }]}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{
                        backgroundColor: 'rgba(62, 168, 232,1)',
                        height: 30,
                        width: 8,
                        position: 'absolute',
                        marginLeft: -10
                    }} />
                    <Text style={[styles.lable, {}]}>Description :</Text>
                </View>
                <Text style={[styles.lableDescription, { alignSelf: 'center', marginTop: 10 }]}>{item.description} </Text>
            </View>
            <View style={[styles.ContainerX, { alignContent: 'center', padding: 10 }]}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{
                        backgroundColor: 'rgba(62, 168, 232,1)',
                        height: 30,
                        width: 8,
                        position: 'absolute',
                        marginLeft: -10
                    }} />
                    <Text style={[styles.lable, {}]}>Available Dates :</Text>
                </View>
                <Calendar
                    enableSwipeMonths
                    style={{
                        borderWidth: 2,
                        borderColor: 'gray',
                        margin: mobileW * 0.04,
                        borderRadius: 5,
                    }}
                    markedDates={{ ...markedDates }}
                    minDate={formattedToday}
                // maxDate={startDate}
                />
            </View>
            <View style={[styles.ContainerX, { alignContent: 'center', padding: 10 }]}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{
                        backgroundColor: 'rgba(62, 168, 232,1)',
                        height: 30,
                        width: 8,
                        position: 'absolute',
                        marginLeft: -10
                    }} />
                    <Text style={[styles.lable, {}]}>Resent Events :</Text>
                </View>
                <View>
                    {DummyData.slice(-5).reverse().map((item) => (
                        <View key={item.id}>
                            <EventCard
                                item={item}
                                onPress={() => navigation.navigate('DetailedEvent', { item })}
                            />
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'rgba(62, 168, 232,1)',
        marginHorizontal: mobileW * 0.04,
        marginTop: mobileW * 0.04,
        alignSelf: 'flex-start',
    },
    venueContainer: {
        marginHorizontal: mobileW * 0.04,
        marginBottom: mobileW * 0.04,
        flexDirection: 'row',
        // borderWidth: .1,
        elevation: 2,
        padding: 5,
        borderRadius: mobileW * 0.03,
        backgroundColor: 'rgb(236, 247, 253)',
    },
    image: {
        width: mobileW * 0.2,
        height: mobileW * 0.2,
        marginRight: 10,
        borderRadius: mobileW * 0.03,
    },
    venueInfo: {
        flex: 1,
        // flexDirection : 'row'
    },
    lable: {
        fontSize: 22,
        fontWeight: '600',
        color: 'black',
        marginHorizontal: mobileW * 0.04,
    },
    lableDescription: {
        fontSize: 18,
        color: 'black',
        marginHorizontal: mobileW * 0.04,
    },
    venueCapacity: {
        fontSize: 14,
        color: 'black',
    },
    ContainerX: {
        // flex: 1,
        // alignItems: 'center',
        backgroundColor: 'white',
        margin: mobileW * .03,
        // marginHorizontal: mobileW * .03,
        // marginTop: mobileW * .03,
        // marginBottom: mobileW * .03,
        elevation: 5,
        borderRadius: 8,
    },
});

export default DetailedVenuePage;
