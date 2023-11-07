import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, RefreshControl, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { API_IP } from "@env";

let mobileW = Dimensions.get('window').width;

const ListAcadmicEventsPage = ({ route }) => {
    const navigation = useNavigation();
    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0];


    const [refreshing, setRefreshing] = useState(false);
    const [data, setData] = useState([]);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        console.log("hello");
        fetchAllAcadmicEventData();
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);

    useEffect(() => {
        fetchAllAcadmicEventData();
    }, []);

    useEffect(() => {
        console.log(data);
    }, [data]);

    const fetchAllAcadmicEventData = async () => {
        console.log("hello this is fetch");
        try {
            const response = await fetch(API_IP + 'admin/acadeventafterdate/' + formattedToday); // Replace with your API endpoint
            const result = await response.json();

            setData(result.academicEvents);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Academic Events</Text>
            {
                data.length == 0 ? <View style={{ marginTop: mobileW * 0.6 }}>
                    <Text style={{
                        color: 'black',
                        fontSize: mobileW * 0.06,
                        fontWeight: '500',
                        alignSelf: 'center'
                    }}>No Academic events found!</Text>
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
                </View> :
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.venueContainer} onPress={() => { navigation.navigate('DetaailedAcadmicEventsPage', { item }) }}>
                                {/* <Image source={{ uri: API_IP + item.venueImages[0] }} style={styles.image} /> */}
                                <View style={styles.venueInfo}>
                                    <Text style={styles.venueName}>{item.name}</Text>
                                    <Text style={styles.venueDescription}>From {item.startDate.split('T')[0]} to {item.endDate.split('T')[0]}</Text>
                                    <Text style={styles.venueCapacity}>Targeted Departments: {item.targetedDept.join(", ")}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
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
        flex: 1,
        backgroundColor: 'white',

    },
    header: {
        fontSize: mobileW * 0.075,
        fontWeight: 'bold',
        color: 'black',
        marginVertical: mobileW * 0.03,
        marginHorizontal: mobileW * 0.04,
        alignSelf: 'center',
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
        paddingHorizontal: 5,
        // flexDirection : 'row'
    },
    venueName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black',
        marginTop: mobileW * 0.02,
    },
    venueDescription: {
        fontSize: 16,
        color: 'black',
    },
    venueCapacity: {
        fontSize: 14,
        color: 'black',
        marginBottom: mobileW * 0.02,
    },
});

export default ListAcadmicEventsPage;
