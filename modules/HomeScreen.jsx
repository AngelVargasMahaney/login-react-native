import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Button } from 'react-native'
import { getTroubleShooting } from '../services/servicios';
import { ListItem, Avatar, Divider } from "react-native-elements";
import Icons from "react-native-vector-icons/Ionicons";
import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';
const HomeScreen = (props) => {


    const [Reportes, setReportes] = useState([])
    const [tokenV, setTokenV] = useState("")

    const checkToken = async () => {
        const token = await AsyncStorage.getItem('token')
        setTokenV(token)
        console.log("TOEKOTEK " + token);
    }
    useEffect(() => {
        checkToken()
    }, [])

    const traerTroubles = () => {
        getTroubleShooting(tokenV).then(rpta => {
            setReportes(rpta.data.data)
            console.log(rpta.data.data)
        })
    }

    useEffect(() => {
        traerTroubles()
    }, [])


    return (
        <><View style={[styles.container1, props.style]}>
            <View style={styles.leftWrapper}>
                <TouchableOpacity style={styles.leftIconButton}
                    onPress={() => props.navigation.navigate('Home')}
                >
                    <Icons name="ios-arrow-back" style={styles.leftIcon}

                    ></Icons>
                    <Text style={styles.leftText}>Back</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.textWrapper}>
                <Text numberOfLines={1} style={styles.ingresoDeDatos}>
                    Reportes Generados
                </Text>
            </View>
            <View style={styles.rightWrapper}>
                <TouchableOpacity style={styles.rightIconButton}></TouchableOpacity>
            </View>
        </View>


            <ScrollView style={styles.container}>

                {/* <Button title="Crear Usuario"
      onPress={() =>
        props.navigation.navigate('Crear Usuario')}>
    </Button> */}

                {//recorrer usuarios
                    Reportes.map(Reportes => {
                        return (
                            <ListItem style={styles.inputGroups} key={Reportes.id} buttonDivider
                                onPress={() => props.navigation.navigate('ReporteDetalle', {
                                    ReporteId: Reportes.id
                                })}>

                                <ListItem.Chevron /*es el icono*/ />
                                <Avatar source={{
                                    uri: 'https://yosirvoblog.files.wordpress.com/2016/05/fir-reporte-de-incidentes-de-edificios.png'
                                }}
                                    rounded />
                                <ListItem.Content>
                                    <ListItem.Title>{Reportes.event}</ListItem.Title>
                                    <ListItem.Subtitle>Fecha:{Reportes.date} Hora:{Reportes.date}</ListItem.Subtitle>
                                </ListItem.Content>

                            </ListItem>
                        );
                    })}
            </ScrollView>
            <Button title="presiona" onPress={() => traerTroubles()}></Button>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    listaReportes: {
        color: "#121212",
        fontSize: 22,
        opacity: 0.8,
        marginTop: 25,
        textAlign: "center"
    },
    inputGroups: {
        flex: 1,
        marginBottom: 15,
        marginTop: 10,
        marginLeft: 1,
        marginRight: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    },
    container1: {
        flexDirection: "row",
        backgroundColor: "rgb(37, 150, 190)",
        height: 40,
        paddingRight: 8,
        marginTop: 21,
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
    rightIconButton: {}
});

export default HomeScreen
