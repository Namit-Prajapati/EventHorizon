import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';

const mobileW = Dimensions.get('window').width;

const EventCard = ({ item, onPress }) => {
    const mobileW = 200; // Adjust this value as needed

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.EventCardStyle}>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <Image
                        source={{
                            uri: item.EPoster,
                        }}
                        style={{
                            width: mobileW * 0.38,
                            height: mobileW * 0.38,
                            resizeMode: 'contain',
                            margin: mobileW * 0.02,
                            borderRadius: mobileW * 0.02,
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

const styles = StyleSheet.create({
    EventCardStyle: {
        // Add your styles for the event card container here
        marginTop: mobileW * 0.03,
        borderWidth: mobileW * 0.005,
        width: mobileW * 0.9,
        borderRadius: mobileW * 0.05,
        borderColor: 'gray',
    },
    EventName: {
        // Add your styles for the event name text here
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

export default EventCard;
