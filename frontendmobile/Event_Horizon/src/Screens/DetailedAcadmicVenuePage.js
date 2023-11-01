import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, RefreshControl, Alert, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { API_IP } from "@env";

let mobileW = Dimensions.get('window').width;

const DetaailedAcadmicEventsPage = ({ route }) => {
    const navigation = useNavigation();

    const [showAlert, setShowAlert] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    const { item } = route.params;

    console.log(item);

    const handleShowAlert = () => {
        setShowAlert(true);
    };

    const renderAlert = () => {
        Alert.alert(
            'Are you sure?',
            'You want to Delete this Club?',
            [
                {
                    text: 'No',
                    onPress: () => setShowAlert(false),
                    style: 'cancel',
                },
                {
                    text: 'Yupp!',
                    onPress: () => {
                        // sendDataToAPI();
                        setShowAlert(false);
                    },
                },
            ],
            { cancelable: false },
        );
    };

    return (
        <View style={styles.container}>
            {showAlert && renderAlert()}
            <View style={{ flexDirection: 'row', marginVertical: mobileW * 0.03 }}>
                <Text style={[styles.header, { flex: 1 }]}>{item.name}</Text>
                <TouchableOpacity
                    onPress={handleShowAlert}
                    style={[styles.deletebutton, { flexDirection: 'row', elevation: 2 }]}
                >
                    {isLoading ? (
                        <ActivityIndicator size="small" color="white" /> // Show the progress indicator when loading
                    ) : (
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: 'white', alignSelf: 'center', padding: 3 }}>Delete Event</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>
            <View style={styles.ContainerX}>
                <Text style={[styles.header, { fontSize: 24, marginTop: 10, margin: 10 }]}>
                    Duration
                </Text>
                {
                    item.startDate == item.endDate
                        ? <Text style={styles.lable}>{item.startDate.split('T')[0]} </Text>
                        : <Text style={styles.lable}>{item.startDate.split('T')[0]} to {item.endDate.split('T')[0]}</Text>
                }
            </View>
            <View style={styles.ContainerX}>
                <Text style={[styles.header, { fontSize: 24, marginTop: 10, margin: 10 }]}>
                    Targated Departments
                </Text>
                <Text style={styles.lable}>{item.targetedDept.join(", ")}</Text>
            </View>
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
        color: 'rgba(62, 168, 232,1)',
        marginHorizontal: mobileW * 0.04,
        marginTop: mobileW * 0.04,
        alignSelf: 'flex-start',
    },
    deletebutton: {
        color: 'white',
        backgroundColor: 'red',
        alignSelf: 'center',
        padding: 5,
        marginHorizontal: mobileW * 0.04,
        marginTop: mobileW * 0.04,
        borderRadius: 7,
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
        fontSize: 16,
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

export default DetaailedAcadmicEventsPage;
