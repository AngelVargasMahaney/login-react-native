import React, { Component, useContext, useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    ImageBackground,

    ActivityIndicator,
    Alert,
    Image,
    LogBox
} from "react-native";

import axios from "axios"
import { getTroubleShootingById } from '../services/servicios';
import { AuthContext } from "./context/AuthContext";
import { useParams } from "react-router-native";
import { useNavigation } from "@react-navigation/native";

export default function DetailScreen(props) {

    const { tokencito } = useContext(AuthContext)
    console.log(tokencito)
    const [loading, setLoading] = useState()
    const [data, setData] = useState([])
    const params = useParams()

    const getDataByID = () => {
        const idUrl = props.route.params.id;
        getTroubleShootingById(idUrl, tokencito).then(rpta => {

            setData(rpta.data.data)
            console.log(rpta.data.data)
        })
    }
    const navigation = useNavigation();
    useEffect(() => {
        getDataByID()
    }, [])
    if (loading) {
        <View>
            <ActivityIndicator size="large" color="#547485" />
        </View>
    }
    return (
        <ScrollView style={styles.container}>
            <View style={styles.rect}>
                {/* <Text style={styles.tituloIncidente}>Registro de incidente Revisión</Text>
                <Text style={styles.fechaTag1}>Fecha</Text>
                <Text style={styles.fecha2}>{data.fecha}</Text>
                <Text style={styles.horaTag1}>Hora</Text>
                <Text style={styles.hora2}>{data.hora}</Text>
                <Text style={styles.supeintendente1}>Supeintendente</Text>
                <Text style={styles.superintendenteEntrada}>{data.superintendente}</Text> */}
                <Text style={styles.supervisores1}>EVENT</Text>
                <Text style={styles.ingreseSupervisores}>{data.event}</Text>
                {/* <Text style={styles.supervisores1}>Supervisores</Text>
                <Text style={styles.ingreseSupervisores}>{data.supervisor}</Text> */}
                {/* <Text style={styles.operadores1}>Operadores</Text>
                <Text style={styles.ingreseOperadores}>{data.operadores}</Text>
                <Text style={styles.equipo1}>Equipo</Text>
                <Text style={styles.ingreseEquipo}>{data.equipo}</Text>
                <Text style={styles.tiempoDeParada}>Tiempo de parada</Text>
                <Text style={styles.horas}>{data.tiempoParada}</Text>
                <Text style={styles.detalleDeParada1}>Detalle de Parada</Text>
                <Text style={styles.ingreseDetalles}>{data.detalleParada}</Text>
                <Text style={styles.evento}>Evento</Text>
                <Text style={styles.detallesEvento}>{data.evento}</Text>
                <Text style={styles.causa}>Causa</Text>
                <Text style={styles.detallesCausa}>{data.causa}</Text>
                <Text style={styles.accionesTomadas}>Acciones Tomadas</Text>
                <Text style={styles.accionesDetalle}>{data.accionesTomadas}</Text>
                <Text style={styles.resultados}>Resultados</Text>
                <Text style={styles.resultadosDetalle}>{data.resultado}</Text>
                <Text style={styles.conclusiones}>Conclusiones</Text>
                <Text style={styles.conclusionesDetalle}>{data.conclusiones}</Text>
                <Text style={styles.detallesDeCapturas}>Detalles de capturas</Text>
                <Text style={styles.detallesDeLaFotos}>{data.evidenciaDetalle}</Text>
                <View style={styles.imagen_1}>{!!data.foto1 && (
                    <Image source={{ uri: data.foto1 }}
                        style={{
                            width: 310,
                            height: 210,
                            marginLeft: 20,
                            marginRight: 20,
                            opacity: 0.9,
                        }} />)}
                </View>
                <View style={styles.imagen_2}>{!!data.foto2 && (
                    <Image source={{ uri: data.foto2 }}
                        style={{
                            width: 310,
                            height: 210,
                            marginLeft: 20,
                            marginRight: 20,
                            opacity: 0.9,
                        }} />)}
                </View> */}
                <TouchableOpacity
                    style={[styles.containerBotonGuardar, styles.guardarDataReporte]}
                    onPress={() => navigation.goBack()}>
                    <Text style={styles.guardarReporte}>Finalizar Revision</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    rect: {
        backgroundColor: "rgba(255,255,255,1)",
        borderWidth: 1,
        borderColor: "rgba(197,196,196,1)",
        borderRadius: 36,
        shadowColor: "rgba(7,252,21,1)",
        shadowOffset: {
            width: 0,
            height: 3
        },
        elevation: 5,
        shadowOpacity: 0.41,
        shadowRadius: 0,
        marginBottom: 25,
        marginTop: 30,
        marginRight: 10,
        marginLeft: 10
    },
    tituloIncidente: {
        textAlign: "center",
        color: "#121212",
        fontSize: 24,
        opacity: 0.75,
        marginTop: 30,
    },
    fechaTag1: {

        color: "#121212",
        fontSize: 12,
        opacity: 0.6,
        marginTop: 22,
        marginLeft: 30
    },
    fecha2: {

        color: "#121212",
        opacity: 0.8,
        borderBottomWidth: 1,
        borderColor: "rgba(1,123,146,255)",
        width: 89,
        height: 19,
        textAlign: "center",
        marginTop: 8,
        marginLeft: 30,
        marginRight: 111

    },
    horaTag1: {

        color: "#121212",
        opacity: 0.6,
        fontSize: 12,
        marginTop: 10,
        marginLeft: 30
    },
    hora2: {

        color: "#121212",
        height: 21,
        opacity: 0.8,
        borderBottomWidth: 1,
        borderColor: "rgba(1,123,146,255)",
        width: 89,
        marginLeft: 30,
        marginRight: 109,
        borderBottomWidth: 1,
        textAlign: "center",
        marginTop: 10
    },
    supeintendente1: {

        color: "#121212",
        opacity: 0.7,
        marginTop: 20,
        marginLeft: 30
    },
    superintendenteEntrada: {

        color: "#121212",
        width: 282,
        borderBottomWidth: 1,
        borderColor: "rgba(1,123,146,255)",
        opacity: 0.8,
        marginTop: 10,
        marginLeft: 30
    },
    supervisores1: {

        color: "#121212",
        opacity: 0.7,
        marginTop: 20,
        marginLeft: 30
    },
    ingreseSupervisores: {

        color: "#121212",
        width: 282,
        borderBottomWidth: 1,
        borderColor: "rgba(1,123,146,255)",
        opacity: 0.8,
        marginTop: 10,
        marginLeft: 30
    },
    operadores1: {

        color: "#121212",
        opacity: 0.7,
        marginTop: 20,
        marginLeft: 30
    },
    ingreseOperadores: {

        color: "#121212",
        width: 282,
        borderBottomWidth: 1,
        borderColor: "rgba(1,123,146,255)",
        opacity: 0.8,
        marginTop: 10,
        marginLeft: 30
    },
    equipo1: {

        color: "#121212",
        width: 83,
        opacity: 0.6,
        fontSize: 12,
        marginTop: 20,
        marginLeft: 30
    },
    ingreseEquipo: {

        color: "#121212",
        width: 282,
        borderBottomWidth: 1,
        borderColor: "rgba(1,123,146,255)",
        opacity: 0.8,
        marginTop: 10,
        marginLeft: 30
    },
    tiempoDeParada: {

        color: "#121212",
        lineHeight: 12,
        opacity: 0.6,
        width: 112,
        fontSize: 12,
        marginTop: 20,
        marginLeft: 30
    },
    horas: {

        color: "#121212",
        width: 83,
        textAlign: "center",
        borderBottomWidth: 1,
        borderColor: "rgba(1,123,146,255)",
        opacity: 0.8,
        marginTop: 10,
        marginLeft: 30
    },
    detalleDeParada1: {

        color: "#121212",
        width: 110,
        fontSize: 12,
        opacity: 0.6,
        marginTop: 20,
        marginLeft: 30
    },
    ingreseDetalles: {

        color: "#121212",
        width: 282,
        borderBottomWidth: 1,
        borderColor: "rgba(1,123,146,255)",
        opacity: 0.8,
        marginTop: 10,
        marginLeft: 30
    },
    evento: {

        color: "#121212",
        width: 113,
        opacity: 0.6,
        fontSize: 12,
        marginTop: 20,
        marginLeft: 30
    },
    detallesEvento: {

        color: "#121212",
        width: 282,
        opacity: 0.6,
        borderBottomWidth: 1,
        borderColor: "rgba(1,123,146,255)",
        marginTop: 10,
        marginLeft: 30
    },
    causa: {

        color: "#121212",
        width: 282,
        opacity: 0.6,
        fontSize: 12,
        marginTop: 20,
        marginLeft: 30
    },
    detallesCausa: {

        color: "#121212",
        width: 282,
        opacity: 0.6,
        borderBottomWidth: 1,
        borderColor: "rgba(1,123,146,255)",
        marginTop: 10,
        marginLeft: 30
    },
    accionesTomadas: {

        color: "#121212",
        width: 200,
        opacity: 0.6,
        fontSize: 12,
        marginTop: 20,
        marginLeft: 30
    },
    accionesDetalle: {

        color: "#121212",
        width: 282,
        opacity: 0.6,
        borderBottomWidth: 1,
        borderColor: "rgba(1,123,146,255)",
        marginTop: 10,
        marginLeft: 30
    },
    resultados: {

        color: "#121212",
        width: 113,
        opacity: 0.6,
        fontSize: 12,
        marginTop: 20,
        marginLeft: 30
    },
    resultadosDetalle: {

        color: "#121212",
        width: 282,
        opacity: 0.6,
        borderBottomWidth: 1,
        borderColor: "rgba(1,123,146,255)",
        marginTop: 10,
        marginLeft: 30
    },
    conclusiones: {

        color: "#121212",
        width: 120,
        opacity: 0.6,
        fontSize: 12,
        marginTop: 20,
        marginLeft: 30
    },
    conclusionesDetalle: {

        color: "#121212",
        width: 282,
        opacity: 0.6,
        borderBottomWidth: 1,
        borderColor: "rgba(1,123,146,255)",
        marginTop: 10,
        marginLeft: 30
    },
    detallesDeCapturas: {

        color: "#121212",
        width: 282,
        fontSize: 14,
        opacity: 0.6,
        marginTop: 20,
        marginLeft: 30
    },
    detallesDeLaFotos: {

        color: "#121212",
        width: 282,
        borderBottomWidth: 1,
        borderColor: "rgba(1,123,146,255)",
        opacity: 0.8,
        marginTop: 10,
        marginLeft: 30
    },
    imagen_1: {
        marginTop: 25,
        marginLeft: 40,
        marginRight: 40,
        alignItems: 'center'
    },
    imagen_2: {
        marginTop: 25,
        marginLeft: 40,
        marginRight: 40,
        alignItems: 'center'
    },
    guardarDataReporte: {
        height: 36,
        width: 198,
        marginTop: 40,
        marginLeft: 78
    },
    containerBotonGuardar: {
        backgroundColor: "rgba(1,123,146,1)",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.35,
        shadowRadius: 5,
        elevation: 2,
        minWidth: 88,
        paddingLeft: 16,
        paddingRight: 16,
        marginBottom: 20
    },
    guardarReporte: {
        color: "#fff",
        fontSize: 14
    },
    image: {
        width: 360,
        backgroundColor: "rgba(15,15, 15,0.0732)",
        marginTop: 1
    },
    image_imageStyle: {
        opacity: 0.61
    },
});
