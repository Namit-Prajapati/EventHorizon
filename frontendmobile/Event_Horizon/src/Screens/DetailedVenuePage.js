import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { Calendar } from 'react-native-calendars';
import { API_IP } from "@env";

let mobileW = Dimensions.get('window').width;

const DetailedVenuePage = ({ route }) => {

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
