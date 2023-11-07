import React, { Component, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // You may need to import the appropriate icon library

let mobileW = Dimensions.get('window').width;

const MyTabs = ({ isSwitchOn, setIsSwitchOn }) => {

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
                {
                    isSwitchOn ? <Image
                        source={require('./../../assets/icons/completeC.png')}
                        style={{ width: mobileW * .08, height: mobileW * .08, resizeMode: 'contain', }}
                    /> : <Image
                        source={require('./../../assets/icons/complete.png')}
                        style={{ width: mobileW * .08, height: mobileW * .08, resizeMode: 'contain', }}
                    />
                }
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
                    Past
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
                {
                    isSwitchOn ? <Image
                        source={require('./../../assets/icons/party.png')}
                        style={{ width: mobileW * .08, height: mobileW * .08, resizeMode: 'contain', }}
                    /> : <Image
                        source={require('./../../assets/icons/partyC.png')}
                        style={{ width: mobileW * .08, height: mobileW * .08, resizeMode: 'contain', }}
                    />
                }
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
                    Upcoming
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
        marginHorizontal: mobileW * .05,
        marginTop: mobileW * 0.03,
        flexDirection: 'row',
        borderRadius: 25,
        // borderWidth: 1,
        borderColor: 'rgba(62, 168, 232,1)',

    },
    tab: {
        flex: 1,
        flexDirection: 'row',
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

export default MyTabs;
