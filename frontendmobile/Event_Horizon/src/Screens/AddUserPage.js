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
import AddUserTabs from '../Components/AdduserTab';
import AddSingleUser from '../Components/AddSingleUser';
import AddMultipleUser from '../Components/AddMultipleUser';
import { ScrollView } from 'react-native-gesture-handler';

const mobileW = Dimensions.get('window').width;


// Main EventPage component
const AddUserPage = () => {
    const navigation = useNavigation();
    const [isSwitchOn, setIsSwitchOn] = useState(true);

    return (
        <ScrollView style={styles.PageStyle}>
            <Text style={styles.TitleStyle}>Add User</Text>
            <AddUserTabs isSwitchOn={isSwitchOn} setIsSwitchOn={setIsSwitchOn} />
            <View style={styles.container}>
                {
                    isSwitchOn ? <AddMultipleUser /> : <AddSingleUser />
                }
            </View>
        </ScrollView>
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
    },
    TitleStyle: {
        color: 'black',
        fontSize: mobileW * 0.075,
        marginTop: mobileW * 0.03,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: mobileW * 0.03,
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

export default AddUserPage;
