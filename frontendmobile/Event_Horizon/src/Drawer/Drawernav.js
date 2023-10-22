import { View, Text } from 'react-native';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './CustomDrawer';
import Home from '../Screens/Home';
import NavBar from '../Components/navbar';
import EventPage from '../Screens/EventPage';
import DetailedEventPage from '../Screens/DetailedEventPage';
import CreateEventPage from '../Screens/CreateEventPage';
import CreateVenuePage from '../Screens/CreateVenue';
import ListVenuePage from '../Screens/ListVenuePage';
const Drawer = createDrawerNavigator();
const Xyz = ({ navigation }) => {
    return (
        <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
            <Drawer.Screen
                name="Home"
                component={Home}
                options={{
                    header: () => <NavBar />,
                }}
            />
            <Drawer.Screen
                name="EventPage"
                component={EventPage}
                options={{
                    header: () => <NavBar />,
                }}
            />
            <Drawer.Screen
                name="CreateEventPage"
                component={CreateEventPage}
                options={{
                    header: () => <NavBar />,
                }}
            />
            <Drawer.Screen
                name="CreateVenuePage"
                component={CreateVenuePage}
                options={{
                    header: () => <NavBar />,
                }}
            />
            <Drawer.Screen
                name="ListVenuePage"
                component={ListVenuePage}
                options={{
                    header: () => <NavBar />,
                }}
            />
        </Drawer.Navigator>
    );
};

export default Xyz;