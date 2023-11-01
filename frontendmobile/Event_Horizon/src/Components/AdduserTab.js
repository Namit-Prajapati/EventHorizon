import React, { Component, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // You may need to import the appropriate icon library

let mobileW = Dimensions.get('window').width;

const AddUserTabs = ({ isSwitchOn, setIsSwitchOn }) => {

    // const [isSwitchOn, setIsSwitchOn] = useState(true);

    return (
        // <View style={styles.container}>
        <View style={styles.tabContainer}>
            <TouchableOpacity
                style={[
                    styles.tab,
                    {
                        backgroundColor: isSwitchOn ? '#FFFFFF' : 'rgba(62, 168, 232,1)',
                        // backgroundColor: isSwitchOn ? 'rgba(62, 168, 232,1)' : '#FFFFFF',
                        // height: isSwitchOn ? mobileW * 0.0 : null,
                        elevation: isSwitchOn ? null : 10,
                    },
                ]}
                onPress={() => setIsSwitchOn(false)}
            >
                <Text
                    style={[
                        styles.tabText,
                        {
                            color: isSwitchOn ? 'rgba(62, 168, 232,1)' : '#FFFFFF',
                            fontWeight: isSwitchOn ? null : '900',
                            fontSize: isSwitchOn ? null : 17,
                        },
                    ]}
                >
                    Single
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[
                    styles.tab,
                    {
                        backgroundColor: isSwitchOn ? 'rgba(62, 168, 232,1)' : '#FFFFFF',
                        // height: isSwitchOn ? mobileW * 0.0 : null,
                        elevation: isSwitchOn ? 10 : null,
                    },
                ]}
                onPress={() => setIsSwitchOn(true)}
            >
                <Text
                    style={[
                        styles.tabText,
                        {
                            color: isSwitchOn ? '#FFFFFF' : 'rgba(62, 168, 232,1)',
                            fontWeight: isSwitchOn ? '900' : null,
                            fontSize: isSwitchOn ? 17 : null,
                        },
                    ]}
                >
                    Multiple
                </Text>
            </TouchableOpacity>
        </View>
        // </View >
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 42,
        height: 42,
        width: 220,
        marginTop: 5
    },
    tabContainer: {
        margin: mobileW * .05,
        flexDirection: 'row',
        borderRadius: 25,
        // borderWidth: 1,
        borderColor: 'rgba(62, 168, 232,1)',

    },
    tab: {
        flex: 1,
        // flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 42,
        borderRadius: 25,
        // margin: 10,
    },
    tabText: {
        fontFamily: 'Plus Jakarta Sans',
        fontWeight: '600',
        marginLeft: 8,
    },
});

export default AddUserTabs;
