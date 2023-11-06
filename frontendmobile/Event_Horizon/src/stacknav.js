import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, Modal, DrawerLayoutAndroid, ScrollView, Text, Button, StyleSheet, ActivityIndicator, Dimensions, Switch, TextInput, SafeAreaView, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Screens/login';
import EHome from './Screens/EventHome';
import Xyz from './Drawer/Drawernav';
import DetailedEventPage from './Screens/DetailedEventPage';
import EditEventPage from './Screens/EditEvent';
import DetailedVenuePage from './Screens/DetailedVenuePage';
import EditVenuePage from './Screens/EditVenuePage';
import EditClubByIDPage from './Screens/EditClubById';
import DetaailedAcadmicEventsPage from './Screens/DetailedAcadmicVenuePage';
import EditAcadmicEventPage from './Screens/EditAcdEvent';
import TempAxis from './Screens/TemporaryAxisPage';
import EventByClub from './Screens/EventByClubs';

const Stack = createNativeStackNavigator();

const Stacknav = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
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
                <Stack.Screen name="EditClubByIDPage" component={EditClubByIDPage} options={{ headerShown: false }} />
                <Stack.Screen name="DetaailedAcadmicEventsPage" component={DetaailedAcadmicEventsPage} options={{ headerShown: false }} />
                <Stack.Screen name="EditAcadmicEventPage" component={EditAcadmicEventPage} options={{ headerShown: false }} />
                <Stack.Screen name="TempAxis" component={TempAxis} options={{ headerShown: false }} />
                <Stack.Screen name="EventByClub" component={EventByClub} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};


export default Stacknav;