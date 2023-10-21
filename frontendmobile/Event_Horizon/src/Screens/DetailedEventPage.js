import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomCard from '../Components/smallcard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BNavBar from '../Components/bottomnavbar';
import ImageViewer from 'react-native-image-zoom-viewer';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


let mobileW = Dimensions.get('window').width;

const DummyImages = [
    {
        url: 'https://www.adobe.com/content/dam/www/us/en/events/overview-page/eventshub_evergreen_opengraph_1200x630_2x.jpg',
    },
    {
        url: 'https://www.eventbrite.ie/blog/wp-content/uploads/2022/09/dance-event.jpg',
    },
];

const DetailedEventPage = ({ route }) => {
    const { item } = route.params;
    const navigator = useNavigation();

    const navigateToEditEvent = () => {
        navigator.navigate('EditEvent', { item }); // Assuming you have set up 'EditEvent' as the screen name for EditEventPage in your navigator.
    };

    return (
        <View style={styles.AppBg}>
            <ScrollView style={styles.AppBg}>
                <View style={[styles.container, { marginTop: mobileW * .05 }]}>
                    <View style={{ flexDirection: 'row', marginHorizontal: 4, marginTop: 4 }}>
                        <Image
                            source={{
                                uri: item.EPoster,
                            }}
                            style={{
                                width: mobileW * 0.2,
                                height: mobileW * 0.2,
                                resizeMode: 'contain',
                                margin: mobileW * 0.02,
                                alignSelf: 'flex-start',
                                // borderWidth: 1,
                                borderColor: 'gray',
                                borderRadius: 5,
                                // elevation: 1
                            }}
                        />
                        <View style={{ marginHorizontal: mobileW * 0.01 }}>
                            <Text style={styles.eventName}>{item.EName}</Text>
                            <View style={{ flexDirection: 'row', flex: 1, marginTop: mobileW * 0.02 }}>
                                <Icon
                                    name="building-o"
                                    size={20}
                                    // color='rgba(62, 168, 232, 1)'
                                    color='gray'
                                />
                                <Text style={styles.club}>{item.Club}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        margin: mobileW * 0.02,
                        marginLeft: 12,
                    }}>
                        <Icon
                            name="map-marker"
                            size={20}
                            // color='rgba(62, 168, 232, 1)'
                            color='gray'
                        />
                        <Text style={styles.club}>{item.Venue}</Text>
                    </View>
                    <View style={[styles.divider, { height: 2, marginHorizontal: 12 }]}></View>
                    <View style={[styles.container, { alignItems: 'center', elevation: 0 }]}>
                        <View style={{ flexDirection: 'row', }}>
                            <CustomCard iconName="calendar-check-o" text="Date" desc={(item.StartEventDate == item.EndEventDate) ? item.StartEventDate : item.StartEventDate + " to " + item.EndEventDate} />
                            <CustomCard iconName="clock-o" text="Registrtion Deadline" desc={item.LastDate} />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <CustomCard iconName="users" text="Registered" desc={item.RegisteredStudents} />
                            <CustomCard iconName="sticky-note-o" text="Eligiblity" desc={item.Eligibility.join(", ")} />
                        </View>
                    </View>
                </View>
                <View style={styles.divider}></View>
                <Image
                    source={{
                        uri: item.Banner,
                    }}
                    style={{
                        height: mobileW * 1.35,
                        width: mobileW * 0.94,
                        resizeMode: 'contain',
                        alignSelf: 'center',
                        borderRadius: 8,
                        marginVertical: 8
                    }}
                />
                <View style={styles.divider}></View>
                <View style={styles.container}>
                    <View style={{
                        flexDirection: 'row',
                        marginTop: mobileW * .03,
                    }}>
                        <View style={{
                            backgroundColor: 'rgba(62, 168, 232,1)',
                            height: 35,
                            width: 8,
                        }}>

                        </View>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20, marginTop: 4, marginLeft: 4 }}>
                            Description
                        </Text>
                    </View>
                    <Text style={styles.desc}>
                        {item.Description}
                    </Text>
                </View>
                <View style={styles.container}>
                    <View style={{ height: mobileW * 0.9, backgroundColor: 'white' }}>
                        <View style={{
                            flexDirection: 'row',
                            marginVertical: mobileW * .03,
                        }}>
                            <View style={{
                                backgroundColor: 'rgba(62, 168, 232,1)',
                                height: 35,
                                width: 8,
                            }}>

                            </View>
                            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20, marginTop: 4, marginLeft: 4 }}>
                                Event Images
                            </Text>
                        </View>
                        <ImageViewer
                            imageUrls={DummyImages}
                            enableSwipeDown
                        />
                    </View>
                </View>
            </ScrollView >
            <View style={{ height: mobileW * 0.12, backgroundColor: 'rgba(62, 168, 232,1)', justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <TouchableOpacity style={{ flex: 1 }}>
                        <Ionicons
                            name="chatbubbles-outline"
                            size={35}
                            color='white'
                            // color='gray'
                            style={{ marginHorizontal: 20 }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={{ backgroundColor: 'white', borderRadius: 5, width: mobileW * 0.2, height: mobileW * 0.08, alignItems: 'center', justifyContent: "center", marginRight: 20 }}>
                            <Text style={{ color: 'black', fontWeight: 'bold' }}>Register</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity
                onPress={navigateToEditEvent}
                style={{ height: mobileW * 0.12, width: mobileW * 0.12, backgroundColor: 'rgba(62, 168, 232,1)', position: 'absolute', alignSelf: 'flex-start', marginTop: mobileW * 1.85, borderRadius: mobileW * 0.12, marginLeft: mobileW * 0.83, alignItems: 'center' }}>
                <Icon
                    name="pencil"
                    size={28}
                    color='white'
                    style={{ justifyContent: 'center', alignSelf: 'center', marginVertical: 8 }}
                />
            </TouchableOpacity>
        </View >
    );
};

const styles = StyleSheet.create({
    AppBg: {
        flex: 1,
        backgroundColor: 'white',
    },
    container: {
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
    eventImage: {
        width: mobileW * 0.5,
        height: mobileW * 0.5,
        resizeMode: 'contain',
        marginTop: mobileW * 0.1,
    },
    eventName: {
        color: 'black',
        fontSize: mobileW * 0.08,
        fontWeight: 'bold',
        marginTop: mobileW * 0.02,
    },
    club: {
        color: 'gray',
        fontSize: mobileW * 0.04,
        fontWeight: '600',
        marginHorizontal: mobileW * 0.02,
    },
    registeredStudents: {
        color: 'black',
        fontSize: mobileW * 0.03,
        fontWeight: '500',
        marginTop: mobileW * 0.02,
    },
    lastDate: {
        color: 'black',
        fontSize: mobileW * 0.03,
        fontWeight: '500',
        marginTop: mobileW * 0.02,
    },
    divider: {
        height: 7, // Adjust the height of the divider as needed
        backgroundColor: 'rgba(228,233,237,1)',
        // borderBottomEndRadius: 20,
        // borderBottomStartRadius: 20,
        // elevation: 5,
        // flex: 1 // Change the color of the divider as needed
    },
    verticalDivider: {
        width: 3, // Adjust the width as needed
        backgroundColor: 'gray', // You can change the color to your preference
    },
    desc: {
        color: 'gray',
        fontSize: mobileW * 0.04,
        fontWeight: '600',
        marginHorizontal: mobileW * 0.02,
        // justifyContent: 'center',
        textAlign: 'justify',
        marginTop: 10,
    },
});

export default DetailedEventPage;
