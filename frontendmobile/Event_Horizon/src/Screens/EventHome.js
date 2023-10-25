import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { CalendarProvider, Agenda } from 'react-native-calendars';
import styles from '../Stylesheet/stylesheet';
import EventStyles from '../Stylesheet/eventpagestyle';

const EHome = ({ route }) => {
    const [selectedDate, setSelectedDate] = useState(route.params.date);
    const [events, setEvents] = useState({});


    const AcadmicEventData = route.params.AcadmicEvent;

    console.log(AcadmicEventData);

    useEffect(() => {
        let events = {};
        AcadmicEventData.forEach(item => {
            const startDate = new Date(item.startDate);
            const endDate = new Date(item.endDate);

            // Calculate the number of days between the start and end date
            const daysDiff = (endDate - startDate) / (1000 * 60 * 60 * 24);

            // Iterate through the date range
            for (let i = 0; i <= daysDiff; i++) {
                const currentDate = new Date(startDate);
                currentDate.setDate(startDate.getDate() + i);
                const dateString = currentDate.toISOString().split('T')[0];

                const event = {
                    title: item.name,
                    description: `Targeted Depts: ${item.targetedDept.join(', ')}`,
                    startTime: startDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                    endTime: endDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                    type: 'A', // Adding the 'type' property with the value 'A'
                };

                if (!events[dateString]) {
                    events[dateString] = [event];
                } else {
                    events[dateString].push(event);
                }
            }
        });
        console.log(events);
        setEvents(events);
    }, []);


    // Calculate start date as selectedDate - 15 days
    const startDate = new Date(selectedDate);
    startDate.setDate(startDate.getDate());
    const formattedStartDate = startDate.toISOString().split('T')[0];

    // Calculate end date as selectedDate + 15 days
    const endDate = new Date(selectedDate);
    endDate.setDate(endDate.getDate() + 30);
    const formattedEndDate = endDate.toISOString().split('T')[0];

    // Update the selected date when route.params.date changes
    useEffect(() => {
        setSelectedDate(route.params.date);
    }, [route.params.date]);

    // Generate a range of dates for the agenda
    const dateRange = {};
    let currentDate = formattedStartDate;
    while (currentDate <= formattedEndDate) {
        dateRange[currentDate] = [];
        currentDate = new Date(currentDate);
        currentDate.setDate(currentDate.getDate() + 1);
        currentDate = currentDate.toISOString().split('T')[0];
    }

    // Merge events into the date range
    for (const date in events) {
        if (dateRange[date]) {
            dateRange[date] = events[date];
        }
    }

    return (
        <View style={styles.AppBg}>
            <Agenda
                items={dateRange}
                onDayPress={(day) => { setSelectedDate(day.dateString) }}
                selected={selectedDate}
                renderItem={(item) => (
                    <View style={EventStyles.eventItem}>
                        <Text style={EventStyles.TitleTextStyle}>{item.title}</Text>
                        {
                            item.type == 'A' ? <Text style={EventStyles.DesTextStyle}>Acadmic Event</Text> : null
                        }
                        <Text style={EventStyles.TimeTextStyle}>{item.description}</Text>
                    </View>
                )}
                rowHasChanged={(r1, r2) => r1 !== r2}
            />
        </View>
    );
};

export default EHome;
