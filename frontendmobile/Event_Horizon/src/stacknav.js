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
import DetailedEventPage from './Screens/DetailedEventPage';
import EditEventPage from './Screens/EditEvent';
import DetailedVenuePage from './Screens/DetailedVenuePage';
import EditVenuePage from './Screens/EditVenuePage';

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
                <Stack.Screen name="DetailedEvent" component={DetailedEventPage} options={{ headerShown: false }} />
                <Stack.Screen name="EditEvent" component={EditEventPage} options={{ headerShown: false }} />
                <Stack.Screen name="DetailedVenuePage" component={DetailedVenuePage} options={{ headerShown: false }} />
                <Stack.Screen name="EditVenuePage" component={EditVenuePage} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};


export default Stacknav;