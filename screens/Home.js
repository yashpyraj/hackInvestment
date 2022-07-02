import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Avatar } from 'native-base'

import { auth, db } from '../firebase'
import { getAuth, signOut } from "firebase/auth";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { collection, getDocs } from "firebase/firestore";
import { doc, onSnapshot } from "firebase/firestore";


const Home = ({ navigation }) => {
    const [investments, setInvestments] = useState([])


    useEffect(() => {
        const chatRef = collection(db, "investments")
        const unsub = onSnapshot(chatRef, (snap) => {
            let investments = []
            snap.docs.forEach((doc) => {
                investments.push({ ...doc.data(), id: doc.id })
            })


            setInvestments(investments)

        })


        return unsub
    }, [])






    const userSignOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("Sign Out")
            navigation.replace('Login')
        }).catch((error) => {
            // An error happened.
            console.log(error)
        });
    }
    useLayoutEffect(() => {

        navigation.setOptions({
            title: "Investment",
            headerStyle: { backgroundColor: "#fff" },
            headerTitleStyle: { color: "black" },
            headerTintColor: "black",

            headerLeft: () => (
                <View style={{ margin: 0 }}>
                    <TouchableOpacity activeOpacity={0.5} onPress={userSignOut}>
                        <Avatar size={'sm'} source={{ uri: auth?.currentUser?.photoURL }} />
                    </TouchableOpacity>
                </View>
            ),
        });
    }, []);
    return (
        <SafeAreaView>
            <ScrollView>
                {console.log(investments)}
                {console.log(auth)}

                {investments.map(({ id, chatName }) => (
                    <CustomListItem key={id} chatName={chatName} id={id} />
                ))}



            </ScrollView>
        </SafeAreaView>
    )
}

export default Home


const styles = StyleSheet.create({})