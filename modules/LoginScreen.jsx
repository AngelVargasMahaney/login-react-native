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
import { useNavigation } from '@react-navigation/native';
import { useAuth } from './context/AuthContext';

const LoginScreen = () => {
    const [formulario, setFormulario] = useState({
        email: "",
        password: ""
    })

    const { tokencito, setTokencito } = useAuth()
    const navigation = useNavigation();

    const handleChangeText = (nombre, value) => {
        setFormulario({ ...formulario, [nombre]: value })

    };
    const doLogin = () => {
        postLogin(formulario).then(response => {
          console.warn(response)
          setTokencito(response.data.token)
          Asyncstorage.setItem("token", response.data.token).then(response => {
            alert("Login exitosos")
            navigation.navigate('Home')
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

                <Button title="Enviar" name="Submit" onPress={doLogin}/>

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
