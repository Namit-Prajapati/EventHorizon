import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions, FlatList, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { API_IP } from "@env";
import { useNavigation } from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';

const mobileW = Dimensions.get('window').width;

const Roles = [
    { id: 1, name: 'Student', value: 'student' },
    { id: 2, name: 'Faculty', value: 'faculty' },
];

const AddMultipleUser = () => {

    const navigator = useNavigation();

    const [role, setRole] = useState("student");
    const [isLoading, setIsLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);


    const renderPickerItemsRoles = () => {
        return Roles.map((item) => (
            <Picker.Item key={item.id} value={item.value} label={item.name} />
        ));
    };

    const pickDocument = async () => {
        try {
            const result = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            console.log(result);
            if (result[0].type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
                setSelectedFile(result);
            } else {
                // The selected file is not a PDF or a DOCX file.
                alert('Please select an Excel file.');
            }
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker
            } else {
                throw err;
            }
        }
    };

    const CreateUser = async () => {
        setIsLoading(true);
        console.log('Add User');

        if (role == 'student') {
            const apiUrl = `${API_IP}admin/studentexcel`;
            const formData = new FormData();

            formData.append(`studentexcel`, {
                uri: selectedFile[0].uri,
                type: selectedFile[0].type,
                name: selectedFile[0].name,
            });

            await fetch(apiUrl, {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

                .then((Response) => Response.json())
                .then((json) => {
                    console.log(json);
                    if (json.message) {
                        alert(json.message);
                        setSelectedFile(null);
                        navigator.navigate('Home');
                    }
                    if (json.error) {
                        alert(json.error);
                    }
                })
                .finally(() => {
                    setIsLoading(false); // Set loading state to false when API call is complete
                });
        }
        else {
            const apiUrl = `${API_IP}admin/facultyexcel`;
            const formData = new FormData();

            formData.append(`facultyexcel`, {
                uri: selectedFile[0].uri,
                type: selectedFile[0].type,
                name: selectedFile[0].name,
            });

            await fetch(apiUrl, {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

                .then((Response) => Response.json())
                .then((json) => {
                    console.log(json);
                    if (json.message) {
                        alert(json.message);
                        setSelectedFile(null);
                        navigator.navigate('Home');
                    }
                    if (json.error) {
                        alert(json.error);
                    }
                })
                .finally(() => {
                    setIsLoading(false); // Set loading state to false when API call is complete
                });
        }


    };


    return (
        <View style={styles.container}>
            {/* <Text style={styles.heading}>Single</Text> */}

            <Text style={styles.label}>Role:</Text>
            <Picker
                selectedValue={role}
                onValueChange={(itemValue) => setRole(itemValue)}
                style={styles.picker}
            >
                {renderPickerItemsRoles()}
            </Picker>

            <Text style={styles.label}>Upload Excel:</Text>
            <TouchableOpacity style={styles.fileInputButton} onPress={pickDocument}>
                <Text style={styles.fileInputText}>Choose File</Text>
            </TouchableOpacity>
            {
                selectedFile ?
                    <View>
                        <Text style={styles.label}>Selected File</Text>
                        <Text style={styles.selectedfile}>{selectedFile[0].name}</Text>
                    </View>
                    : null
            }

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
    selectedfile: {
        marginTop: 5,
        color: 'black',
        margin: mobileW * 0.04,
        backgroundColor: 'rgba(62, 168, 232, 1)',
        padding: 5,
        borderRadius: 5,
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

export default AddMultipleUser;  