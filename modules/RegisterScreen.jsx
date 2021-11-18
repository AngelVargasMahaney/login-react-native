import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Image, Text, TextInput, View, StyleSheet, useColorScheme, ScrollView } from 'react-native'
import { guardarJobs, postCrearImagen, postCreateData } from '../services/servicios';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import base64 from 'react-native-base64'



const RegisterScreen = () => {

    const [tokenV, setTokenV] = useState("")
    const [imageUri, setimageUri] = useState("");
    const [imageUriGallary, setimageUriGallary] = useState("");
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);


    const isDarkMode = useColorScheme() === 'dark'
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.primary : Colors.secondary,
    };

    const checkToken = async () => {
        const token = await AsyncStorage.getItem('token')
        setTokenV(token)
        // console.log("TOEKOTEK " + token);
    }

    useEffect(() => {
        checkToken()
    }, [])

    axios.defaults.headers.common = {
        'Authorization': 'Bearer ' + tokenV
    };
    const [dataFoto, setDataFoto] = useState([
        {

            model_type: 2,
            attachmentable_type: "App\\Models\\equipos\\Troubleshooting",
            attachmentable_id: 1,
            base64: ""

        }
    ])



    const [formulario, setFormulario] = useState({
        event: "",
        date: "",
        description: "",
        attributed_cause: "",
        superintendent: "",
        supervisor: "",
        operators: "",
        downtime: "",
        details: "",
        take_actions: "",
        results: "",
        equipment_id: "",
        attachments: dataFoto
        // password: ""
    })


    const handleChangeText = (nombre, value) => {
        setFormulario({ ...formulario, [nombre]: value })

    };

    const handleSubmit = () => {

        postCreateData(formulario).then((rpta) => {
          
            if (rpta.status === 200) {
                console.warn("Subida extitosa")
            } else {
                console.warn("Subida errónea")
                
            }
        }).catch(err => {
            console.log("ERROR EN EL SERVICIO CREARDATA")
            console.warn(err)
        })
        // guardarJobs(formulario).then((rpta) => {
        //     console.warn(rpta)
        // })
        // postCrearImagen(dataFoto).then((rpta) => {
        //     console.log(rpta)
        //     if (rpta.status === 200) {
        //         console.warn("Subida extitosa de la foto")
        //         alert("Carga Exitosa")
        //         console.warn(rpta)
        //         console.warn(rpta.data)
        //     } else {
        //         console.warn("Subida errónea de la foto")
        //         alert("Carga no se cargó")
        //     }
        // }).catch((err) => {
        //     console.log(err)
        // })
    }


    const showImagePicker2 = async () => {
        //permisos
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Te has negado a permitir que esta aplicación acceda a tus fotos.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: false,
            base64: true,
        });


        if (!result.cancelled) {
            setimageUriGallary(result.uri);


            const source = { uri: 'data:image/jpeg;base64,' + result.base64 };
            // console.warn(source.uri);
            dataFoto[0].base64 = source.uri
        }

    }
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');

        setDate(currentDate);
      };
    
      const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
      };
    
      const showDatepicker = () => {
        showMode('date');
      };
    
    
    return (
        <>
            <ScrollView style={{ margin: 20, marginTop: 100 }}>
                <TextInput
                    placeholder="event"
                    onChangeText={(value) => handleChangeText('event', value)}
                />
                <TextInput
                    placeholder="date"
                    type="date"
                    onChangeText={(value) => handleChangeText('date', value)} />
                    <Button title="FECHA" onPress={() =>showDatepicker()}>FECHA</Button>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange} />
                )}

                <TextInput
                    placeholder="description"
                    onChangeText={(value) => handleChangeText('description', value)}
                />
                <TextInput
                    placeholder="attributed_cause"
                    onChangeText={(value) => handleChangeText('attributed_cause', value)} />
                <TextInput
                    placeholder="superintendent"
                    onChangeText={(value) => handleChangeText('superintendent', value)}
                />
                <TextInput
                    placeholder="supervisor"
                    onChangeText={(value) => handleChangeText('supervisor', value)} />
                <TextInput
                    placeholder="operators"
                    onChangeText={(value) => handleChangeText('operators', value)} />
                <TextInput
                    placeholder="downtime"
                    onChangeText={(value) => handleChangeText('downtime', value)}
                />
                <TextInput
                    placeholder="details"
                    onChangeText={(value) => handleChangeText('details', value)} />
                <TextInput
                    placeholder="take_actions"
                    onChangeText={(value) => handleChangeText('take_actions', value)}
                />
                <TextInput
                    placeholder="results"
                    onChangeText={(value) => handleChangeText('results', value)} />
                <TextInput
                    placeholder="equipment_id"
                    onChangeText={(value) => handleChangeText('equipment_id', value)}
                />

                {/* 
                <Button title="Guardar" onPress={handleSubmit}> Guardar </Button> */}

                {/* <Button title="CEERDO" onPress={() => openCamera()} />

                <Text style={{ margin: 20, marginTop: 20 }}>BARRA SEPARADORA</Text>

                <Image
                    source={imageUri}
                    style={{
                        height: 100,
                        width: 100,
                        borderRadius: 100,
                        borderWidth: 2,
                        borderColor: 'black',
                    }}
                /> */}
                <Button
                    title={'Open Gallary'}
                    onPress={() => {
                        showImagePicker2();
                    }}
                />
                <View style={styles.imageContainer}>
                    <Text style={styles.evidenciasFoto}>Evidencia Captura 2</Text>
                    {
                        imageUriGallary !== '' && <Image
                            source={{ uri: imageUriGallary }}
                            style={styles.image}
                        />
                    }
                </View>
                <Button
                    title={'Enviardata'}
                    onPress={() => {
                        handleSubmit();
                    }}
                />



            </ScrollView>
        </>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    containerGuardarDataInicial: {
        backgroundColor: "rgba(1,123,146,1)",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 5,
        paddingLeft: 16,
        paddingRight: 16,

    },
    guardarInformacion: {
        color: "#fff",
        fontSize: 17,
    },

    containerButton: {
        backgroundColor: "rgba(1,123,146,1)",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 5,
        paddingLeft: 16,
        paddingRight: 16

    },
    headerRegistro1: {
        height: 39,
        marginTop: 21,
        borderBottomWidth: 1,
        borderColor: "rgba(1,123,146,1)",
        backgroundColor: "rgba(1,123,146,1)",

    },
    camera: {
        color: "rgba(128,128,128,0.65)",
        fontSize: 32,
        height: 44,
        width: 40
    },
    archivos: {
        color: "rgba(128,128,128,0.65)",
        fontSize: 32,
        height: 44,
        width: 40
    },
    iconos: {
        width: 40,
        marginTop: 9,
        marginBottom: 9
    },
    fotosConjunto: {
        height: 106,
        flexDirection: "row",
        marginTop: 25,
        marginLeft: 37,
        marginRight: 53
    },
    image1: {
        width: 360,
        backgroundColor: "rgba(15,15, 15,0.0732)",
        height: 679,
        marginTop: 1,
        paddingBottom: 5

    },
    iconoFoto: {
        height: 106,
        flexDirection: "row",
        marginTop: 19,
        marginLeft: 37,
        marginRight: 53
    },
    fotoTomada: {
        width: 164,
        height: 106,
        backgroundColor: "#FFFFFF",
        marginLeft: 27
    },
    image1_imageStyle: {
        opacity: 0.61
    },
    rect: {
        height: 660,
        backgroundColor: "rgba(255,255,255,1)",
        borderWidth: 1,
        borderColor: "rgba(197,196,196,1)",
        borderRadius: 36,
        shadowColor: "rgba(1,123,146,1)",
        shadowOffset: {
            width: 0,
            height: 3
        },
        elevation: 5,
        shadowOpacity: 0.41,
        shadowRadius: 0,
        marginTop: 30,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 30
    },
    iconStack: {
        width: 40,
        marginTop: 10,
        marginBottom: 8
    },
    Foto1: {
        width: 164,
        height: 106,
        backgroundColor: "#FFFFFF",
        marginLeft: 27
    },
    titulo1: {
        color: "#121212",
        fontSize: 24,
        textAlign: "center",
        opacity: 0.78,
        height: 29,
        marginTop: 26,
    },
    evidencias: {
        color: "#121212",
        opacity: 0.6,
        fontSize: 12,
        marginTop: 27,
        marginLeft: 20
    },
    evidenciasFoto: {
        color: "#121212",
        opacity: 0.6,
        fontSize: 12,
    },
    textInput: {
        color: "#121212",
        width: 268,
        borderBottomWidth: 1,
        borderColor: "rgba(1,123,146,1)",
        opacity: 0.6,
        textAlign: "left",
        marginTop: 18,
        marginLeft: 20
    },
    icon: {
        color: "rgba(128,128,128,0.65)",
        fontSize: 32,
        height: 44,
        width: 40
    },
    icon1: {
        color: "rgba(128,128,128,0.65)",
        fontSize: 32,
        height: 44,
        width: 40
    },
    cupertinoButtonSuccess: {
        height: 50,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 92,

    },
    container1: {
        flexDirection: "row",
        backgroundColor: "rgba(1,123,146,1)",
        height: 40,
        paddingRight: 8,
        paddingLeft: 8
    },
    header_Registro: {
        height: 39,
        borderWidth: 1,
        borderColor: "rgba(1,123,146,255)",
        backgroundColor: "rgba(1,123,146,255)",
    },
    leftWrapper: {
        flex: 0.28,
        alignItems: "flex-start",
        justifyContent: "center"
    },
    leftIconButton: {
        flexDirection: "row"
    },
    leftIcon: {
        color: "rgba(255,255,255,255)",
        fontSize: 23
    },
    leftText: {
        fontSize: 15,
        color: "rgba(255,255,255,255)",
        paddingLeft: 5,
        alignSelf: "center"
    },
    textWrapper: {
        flex: 0.44,
        alignItems: "center",
        justifyContent: "center"
    },
    ingresoDeDatos: {
        fontSize: 15,
        lineHeight: 17,
        color: "rgba(255,255,255,255)",
        textAlign: "center"
    },
    rightWrapper: {
        flex: 0.28,
        alignItems: "flex-end",
        justifyContent: "center"
    },
    rightIconButton: {},
    buttonContainer: {
        marginTop: 10,
        width: 320,
        flexDirection: 'row',
        justifyContent: "center",
    },
    imageContainer: {
        alignItems: 'center',
        padding: 15
    },
    image: {
        width: 200,
        height: 150,
        marginBottom: 5,
        resizeMode: 'cover'
    }
});

export const Colors = {
    primary: '#fff',
    secondary: '#000',
}