import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

let mobileW = Dimensions.get('window').width;

const DetailedVenuePage = ({ route }) => {

    const { item } = route.params;

    const [VenueImages, setVenueImages] = useState(null);

    useEffect(() => {
        let Images = [];
        item.venueImages.forEach(element => {
            Images.push(
                {
                    url: 'http://16.16.202.127:4000/' + element
                }
            );
        });
        setVenueImages(Images);
    }, []);

    useEffect(() => {
        console.log(VenueImages);
    }, [VenueImages])

    console.log(item);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{item.name} </Text>
            <Text style={styles.capacityText}>Capacity : {item.capacity} </Text>
            {
                VenueImages ? <View style={styles.ImageContainer}>
                    <ImageViewer
                        imageUrls={VenueImages}
                        enableSwipeDown
                    />
                </View> : null
            }

        </View>
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
        color: 'black',
        margin: mobileW * 0.04,
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
    capacityText: {
        fontSize: 22,
        fontWeight: '600',
        color: 'black',
        marginTop: mobileW * 0.02,
        marginHorizontal: mobileW * 0.04,
    },
    venueDescription: {
        fontSize: 16,
        color: 'black',
    },
    venueCapacity: {
        fontSize: 14,
        color: 'black',
    },
    ImageContainer: {
        // flex: 1,
        // alignItems: 'center',
        backgroundColor: 'white',
        margin: mobileW * .03,
        height: mobileW * 0.9,
        // marginHorizontal: mobileW * .03,
        // marginTop: mobileW * .03,
        // marginBottom: mobileW * .03,
        elevation: 5,
        borderRadius: 8,
    },
});

export default DetailedVenuePage;
