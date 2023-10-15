import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, Modal, DrawerLayoutAndroid, ScrollView, Text, Button, StyleSheet, ActivityIndicator, Dimensions, Switch, TextInput, SafeAreaView, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Screens/Home';
import Login from './Screens/login';
import EHome from './Screens/EventHome';
import NavBar from './Components/navbar';
import BNavBar from './Components/bottomnavbar';
import Xyz from './Drawer/Drawernav';

const Stack = createNativeStackNavigator();

const Stacknav = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Xyz">
                <Stack.Screen
                    name="Xyz"
                    component={Xyz}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="EHome" component={EHome} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};


export default Stacknav;