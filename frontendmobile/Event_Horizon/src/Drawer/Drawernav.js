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
import CreateClubPage from '../Screens/CreateClubPage';
import CreateAcadmicEventPage from '../Screens/CreateAcadmicEventPage';
import EditClubPage from '../Screens/EditClubPage';
import ListAcadmicEventsPage from '../Screens/AcadmicEventList';
import AddUserPage from '../Screens/AddUserPage';
import RegisteredEventPage from '../Screens/RegisteredEventByStudent';
import RequestedEvents from '../Screens/RequestedEvent';
import MyEvents from '../Screens/MyEvents';
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
                name="CreateClubPage"
                component={CreateClubPage}
                options={{
                    header: () => <NavBar />,
                }}
            />
            <Drawer.Screen
                name="EditClubPage"
                component={EditClubPage}
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
                name="CreateAcadmicEventPage"
                component={CreateAcadmicEventPage}
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
            <Drawer.Screen
                name="ListAcadmicEventsPage"
                component={ListAcadmicEventsPage}
                options={{
                    header: () => <NavBar />,
                }}
            />
            <Drawer.Screen
                name="AddUserPage"
                component={AddUserPage}
                options={{
                    header: () => <NavBar />,
                }}
            />
            <Drawer.Screen
                name="RegisteredEventPage"
                component={RegisteredEventPage}
                options={{
                    header: () => <NavBar />,
                }}
            />
            <Drawer.Screen
                name="RequestedEvents"
                component={RequestedEvents}
                options={{
                    header: () => <NavBar />,
                }}
            />
            <Drawer.Screen
                name="MyEvents"
                component={MyEvents}
                options={{
                    header: () => <NavBar />,
                }}
            />
        </Drawer.Navigator>
    );
};

export default Xyz;