import React, { useState } from 'react'
import {
    StyleSheet,
    View,
    Image,
    ImageBackground,
    TextInput,
    Button,
    Text,
    TouchableOpacity,
    Alert
} from "react-native";
import axios from "axios"
import Asyncstorage from "@react-native-async-storage/async-storage"
import { postLogin } from '../services/servicios';

const LoginScreen = (props) => {
    const [formulario, setFormulario] = useState({
        email: "",
        password: ""
    })

    const handleChangeText = (nombre, value) => {
        setFormulario({ ...formulario, [nombre]: value })

    };
    const doLogin = () => {
        postLogin(formulario).then(response => {
            console.warn(response)
            Asyncstorage.setItem("token", JSON.stringify(response.data.token)).then(response => {
                props.navigation.navigate('Home')
                alert("Login exitosos")
            })

        }, err => {
            console.warn(err)
            alert("Usuario no encontrado")


        })
    }
    return (
        <>
            <View style={styles.container}>
                <TextInput placeholder="name" name="email" label="Email"
                    onChangeText={(value) => handleChangeText('email', value)} />
                <TextInput placeholder="password" name="password" label="Password"
                    onChangeText={(value) => handleChangeText('password', value)} />

                <Button title="Submit" onPress={doLogin} />

            </View>
        </>
    )
}

export default LoginScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(251,251,251,1)",
        alignItems: "center",
        justifyContent: "center"
    }
})
