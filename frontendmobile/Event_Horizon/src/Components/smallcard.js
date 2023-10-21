import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Make sure to import the appropriate Icon library

let mobileW = Dimensions.get('window').width;

const CustomCard = ({ iconName, text, desc }) => {
    return (
        <View style={styles.smallCard}>
            <Icon name={iconName} size={24} color='gray' style={{ marginLeft: 5 }} />
            <View>
                <Text style={styles.Title}>{text}</Text>
                <Text style={styles.text}>{desc}</Text>
            </View>
        </View>
    );
};



const styles = StyleSheet.create({
    smallCard: {
        // margin: mobileW * 0.04,
        width: mobileW * 0.4,
        height: mobileW * 0.13,
        // borderWidth: 2,
        borderRadius: 5,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        // elevation: .5,
    },
    Title: {
        color: 'black',
        fontSize: mobileW * 0.03,
        fontWeight: '900',
        marginHorizontal: mobileW * 0.02,
    },
    text: {
        color: 'gray',
        fontSize: mobileW * 0.035,
        fontWeight: '600',
        marginHorizontal: mobileW * 0.02,
        marginRight: mobileW * 0.1,
    }
});

export default CustomCard;
