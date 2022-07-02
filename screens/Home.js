import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Avatar, Button, FlatList, Heading, HStack, Pressable } from 'native-base'

import { auth, db } from '../firebase'
import { getAuth, signOut } from "firebase/auth";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { collection, getDocs, doc, onSnapshot, addDoc } from "firebase/firestore";
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';

const Home = ({ navigation }) => {
    const [months, setMonths] = useState([])
    const [found, setFound] = useState(true)


    useEffect(() => {
        let month = moment().format("MMMM");

        const monthRef = collection(db, "month")
        onSnapshot(monthRef, (snap) => {
            let months = []
            snap.docs.forEach((doc) => {
                months.push({ ...doc.data(), id: doc.id })
            })
            setMonths(months)

            let found = months.some(el => el.month === month);
            setFound(found)
        })

        if (!found) {
            createMonth()
        }

    }, [found])




    const createMonth = async () => {

        try {
            const docRef = await addDoc(collection(db, "month"), {
                month: moment().format("MMMM"),
                year: moment().format("YYYY"),
                day: moment().format("D")

            });
            console.log("month with ID: ", docRef.id);

        } catch (e) {
            console.error("Error adding month: ", e);
        }

    }

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


    const onPress = () => { }
    const renderItem = ({ item }) => {

        const image = { uri: "https://www.w3schools.com/css/img_lights.jpg" };

        return (
            <Pressable onPress={onPress} p={5} m={2} backgroundColor='green.50' borderRadius={20} style={{
                shadowColor: '#1AA37A',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.8,
                shadowRadius: 2,
                elevation: 5
            }}>


                <Heading>{item.month} month</Heading>
                <Text>Report</Text>
                <MaterialIcons />


            </Pressable>
        );
    };



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#CAF6BF' }} >
            <FlatList
                mt={2}
                data={months}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />


        </SafeAreaView>
    )
}

export default Home


const styles = StyleSheet.create({})