import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native';

let mobileW = Dimensions.get('window').width;

const NavBar = () => {

    const navigator = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => { navigator.openDrawer() }} style={{ flex: 1 }}>
                <MaterialIcons name='menu' size={25} color="white" />
            </TouchableOpacity>
            <Image
                source={require('./../../assets/Logo/ehwhite.png')}
                style={{ width: mobileW * 0.12, resizeMode: 'contain' }}
            />
            <Text style={styles.title}>EVENT HORIZON</Text>
            <View style={{ alignItems: 'flex-end', flex: 1 }}>
                <View style={{ alignItems: 'flex-end', flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => { }}>
                        <MaterialIcons name='notifications' size={25} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(62, 168, 232,1)',
        height: mobileW * 0.14,
        paddingHorizontal: 10,
    },
    backButton: {
        color: 'white',
        fontSize: 16,
        marginRight: 10,
    },
    title: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        // paddingLeft: "2%"
    },
});

export default NavBar;
