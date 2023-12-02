import { Text, View, StyleSheet, SafeAreaView, Pressable } from 'react-native'
import React, {useEffect} from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import * as AppAuth from "expo-app-auth"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    const navigation = useNavigation()
    useEffect(() => {
        const checkTokenValidity = async() => {
            const accessToken = await AsyncStorage.getItem("token")
            const expirationDate = await AsyncStorage.getItem("expirationDate")
            console.log("access token", accessToken)
            console.log("expiration date", expirationDate)
            if (accessToken && expirationDate) {
                const currentTime = Date.now()
                if (currentTime < parseInt(expirationDate)) {
                    // here the token is still valid
                    navigation.replace("Main")
                } else {
                    // token would be expired so we need to remove it from the async storage
                    AsyncStorage.removeItem("token")
                    AsyncStorage.removeItem("expirationDate")
                }
            }
        }

        checkTokenValidity
    },[])
    async function authenticate() {
        const config = {
            issuer:"https://accounts.spotify.com",
            clientId:"f9130c75aecb4e428046e443b28eb211",
            scopes: [
                "user-read-email",
                "user-library-read",
                "user-read-recently-played",
                "playlist-read-private",
                "playlist-read-collaborative",
                "playlist-modify-public"
            ],
            redirectUrl:"exp://3q-hem.anonymous.spotify-project.exp.direct:80"
        }
        const result = await AppAuth.authAsync(config)
        console.log(result)
        if (result.accessToken) {
            const expirationDate = new Date(result.accessTokenExpirationDate).getTime()
            AsyncStorage.setItem("token", result.accessToken)
            AsyncStorage.setItem("expirationDate", expirationDate.toString())
            navigation.navigate("Main")
        }
    }
    return (
        <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
            <SafeAreaView>
                <View style={{ height: 80 }} />
                <Entypo style={{ textAlign: "center" }} name="spotify" size={74} color="white" />
                <Text
                    style={{
                        color:"white",
                        textAlign:"center",
                        marginTop:20,
                        fontWeight:"bold",
                        fontSize:32
                    }}
                >
                    Millions of Songs Free on Spotify!
                </Text>
                <View style={{height:60}}/>
                <Pressable
                    onPress={authenticate}
                    style={{
                        backgroundColor:"#1D8954",
                        padding:10,
                        width:300,
                        marginLeft:"auto",
                        marginRight:"auto",
                        borderRadius:25,
                        alignItems:"center",
                        justifyContent:"center",
                        marginVertical:10
                    }}
                >
                    <Text style={{color:"white", fontWeight:"500"}}>Sign In with Spotify</Text>
                </Pressable>

                <Pressable
                    style={{
                        backgroundColor:"0131624",
                        padding:10,
                        borderColor:"#C0C0C0",
                        borderWidth:0.8,
                        width:300,
                        marginLeft:"auto",
                        marginRight:"auto",
                        borderRadius:25,
                        alignItems:"center",
                        justifyContent:"center",
                        flexDirection:"row",
                        marginVertical:10,
                    }}
                >
                    <MaterialIcons name="phone-android" size={24} color="white" />
                    <Text
                        style={{
                            color:"white",
                            fontWeight:"500",
                            textAlign:"center",
                            flex:1
                        }}
                    >Continue with phone number</Text>
                </Pressable>

                <Pressable
                    style= {{
                        backgroundColor:"#0131624",
                        borderColor:"#C0C0C0",
                        borderWidth:0.8,
                        width:300,
                        marginLeft:"auto",
                        marginRight:"auto",
                        borderRadius:25,
                        justifyContent:"center",
                        alignItems:"center",
                        flexDirection:"row",
                        padding:10,
                        marginVertical:10
                    }}
                >
                    <AntDesign name="google" size={24} color="maroon" />
                    <Text style={{color:"white", fontWeight:"500", flex:1, textAlign:"center"}}>Continue with Google</Text>
                </Pressable>

                <Pressable
                    style={{
                        borderWidth:0.8,
                        borderColor:"#C0C0C0",
                        width:300,
                        marginLeft:"auto",
                        marginRight:"auto",
                        borderRadius:25,
                        alignItems:"center",
                        justifyContent:"center",
                        flexDirection:"row",
                        padding:10,
                        marginVertical:10
                    }}
                >
                    <Entypo name="facebook" size={24} color="blue" />
                    <Text style={{color:"white", flex:1, textAlign:"center", fontWeight:"500"}}>Continue with Facebook</Text>
                </Pressable>
            </SafeAreaView>
        </LinearGradient>

    )
}

export default LoginScreen

const style = StyleSheet.create()