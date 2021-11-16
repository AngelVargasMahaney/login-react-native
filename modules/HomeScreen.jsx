import React from 'react'
import Asyncstorage from "@react-native-async-storage/async-storage"
import { View, Text } from 'react-native'

class HomeScreen extends React.Component {
    constructor() {
        super();
        this.checkToken()
    }

    checkToken = async () => {
        const token = await Asyncstorage.getItem("token")
        if (token) {
            console.log("s")
        } else {
            console.log("sw")


        }
    }
    render() {
        return (
            <View >
                <Text> Soy el Home luego del Login</Text>
            </View >
        )
    }
}

export default HomeScreen
