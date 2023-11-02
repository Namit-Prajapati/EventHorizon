import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions, FlatList, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { API_IP } from "@env";
import { useNavigation } from '@react-navigation/native';

const mobileW = Dimensions.get('window').width;

const Departments = [
    { id: 1, name: 'CSE', value: 'CSE' },
    { id: 2, name: 'IT', value: 'IT' },
    { id: 3, name: 'CSIT', value: 'CSIT' },
    { id: 4, name: 'CS-DS', value: 'CS-DS' },
    { id: 5, name: 'CS-IOT', value: 'CS-IOT' },
    { id: 6, name: 'CS-AIML', value: 'CS-AIML' },
    { id: 7, name: 'EC', value: 'EC' },
    { id: 8, name: 'ME', value: 'ME' },
    { id: 9, name: 'CIVIL', value: 'CIVIL' },
];
const Roles = [
    { id: 1, name: 'Student', value: 'student' },
    { id: 2, name: 'Faculty', value: 'faculty' },
];

const AddSingleUser = () => {

    const navigator = useNavigation();


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [department, SetDepartment] = useState('CSE');
    const [enrollmentNo, setEnrollmentNo] = useState(""); //not necessory
    const [role, setRole] = useState("student");
    const [isLoading, setIsLoading] = useState(false);

    const renderPickerItemsDepartments = () => {
        return Departments.map((item) => (
            <Picker.Item key={item.id} value={item.value} label={item.name} />
        ));
    };

    const renderPickerItemsRoles = () => {
        return Roles.map((item) => (
            <Picker.Item key={item.id} value={item.value} label={item.name} />
        ));
    };

    const CreateUser = async () => {
        setIsLoading(true);
        console.log('Add User');

        const apiUrl = `${API_IP}admin/createuser`;
        // const formData = new FormData();

        // formData.append('name', name);
        // formData.append('email', email);
        // formData.append('password', password);
        // formData.append('department', department);
        // formData.append('enrollmentNo', enrollmentNo);
        // formData.append('role', role);

        // console.log(name);
        // console.log(email);
        // console.log(password);
        // console.log(enrollmentNo);
        // console.log(department);
        // console.log(role);

        await fetch(apiUrl, {
            method: 'POST',
            // body: formData,
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                department: department,
                enrollmentNo: enrollmentNo,
                role: role
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })

            .then((Response) => Response.json())
            .then((json) => {
                console.log(json);
                if (json.message) {
                    alert(json.message);
                    setName('');
                    setEmail('');
                    setPassword('');
                    setEnrollmentNo('');
                    SetDepartment('CSE');
                    setRole('student');
                    navigator.navigate('Home');
                }
                if (json.error) {
                    alert(json.error);
                }
            })
            .finally(() => {
                setIsLoading(false); // Set loading state to false when API call is complete
            });
    };


    return (
        <View style={styles.container}>
            {/* <Text style={styles.heading}>Single</Text> */}

            <Text style={styles.label}>Name:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setName}
                value={name}
                placeholder={'Enter Name'}
                color={'black'}
                placeholderTextColor={'rgba(0,0,0,0.5)'}
            />

            <Text style={styles.label}>Email:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder={'Enter Email'}
                color={'black'}
                placeholderTextColor={'rgba(0,0,0,0.5)'}
            />

            <Text style={styles.label}>Password:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder={'Enter Password'}
                color={'black'}
                placeholderTextColor={'rgba(0,0,0,0.5)'}
            />

            <Text style={styles.label}>Enrollment Number:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setEnrollmentNo}
                value={enrollmentNo}
                placeholder={'Enter Enrollment Number'}
                color={'black'}
                placeholderTextColor={'rgba(0,0,0,0.5)'}
            />

            <Text style={styles.label}>Department:</Text>
            <Picker
                selectedValue={department}
                onValueChange={(itemValue) => SetDepartment(itemValue)}
                style={styles.picker}
            >
                {renderPickerItemsDepartments()}
            </Picker>

            <Text style={styles.label}>Role:</Text>
            <Picker
                selectedValue={role}
                onValueChange={(itemValue) => setRole(itemValue)}
                style={styles.picker}
            >
                {renderPickerItemsRoles()}
            </Picker>



            <TouchableOpacity style={styles.Button}
                onPress={CreateUser}
            >
                {isLoading ? (
                    <ActivityIndicator size="small" color="white" /> // Show the progress indicator when loading
                ) : (
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: mobileW * .05,
                        color: 'white'
                    }}>Add</Text>
                )}

            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    heading: {
        fontSize: 28,
        marginTop: 10,
        color: 'black',
        marginLeft: mobileW * 0.04,
        fontWeight: '800',
        alignSelf: 'center'
    },
    picker: {
        marginHorizontal: mobileW * 0.04,
        color: 'white',
        backgroundColor: 'rgba(62, 168, 232, 1)',
        borderRadius: 30,
    },
    Button: {
        backgroundColor: 'rgba(4, 128, 200, 0.9)',
        height: mobileW * .1,
        width: mobileW * .4,
        borderRadius: mobileW * .02,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        margin: mobileW * .05
    },
    label: {
        fontSize: 20,
        marginTop: 10,
        marginBottom: 5,
        color: 'black',
        marginLeft: mobileW * 0.04,
        fontWeight: '600',
    },
    input: {
        borderColor: 'rgba(61,156,211,0.5)',
        borderWidth: mobileW * .005,
        marginHorizontal: mobileW * 0.04,
        borderRadius: 10,
        paddingLeft: 10,
    },
    fileInputButton: {
        backgroundColor: 'rgba(62, 168, 232, 1)',
        padding: 10,
        marginVertical: mobileW * 0.008,
        width: mobileW * 0.3,
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    fileInputText: {
        color: 'black',
    },
    imageContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center'
    },
    imagePreview: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        marginRight: 10,
        marginBottom: 10,
    },
});

export default AddSingleUser;  