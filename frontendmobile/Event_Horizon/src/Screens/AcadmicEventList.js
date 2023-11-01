import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, RefreshControl, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { API_IP } from "@env";

let mobileW = Dimensions.get('window').width;

const ListAcadmicEventsPage = ({ route }) => {
    const navigation = useNavigation();

    const [refreshing, setRefreshing] = useState(false);
    const [data, setData] = useState(null);

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
            const response = await fetch(API_IP + 'admin/getallacadevent/'); // Replace with your API endpoint
            const result = await response.json();

            setData(result.academicEvents);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Acadmic Events</Text>
            {
                data ?
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
                    /> :
                    null
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
    },
});

export default ListAcadmicEventsPage;
