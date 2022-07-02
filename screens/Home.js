import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View, ImageBackground } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Avatar, Button, Center, FlatList, Heading, HStack, Text, Pressable, VStack, Input } from 'native-base'

import { auth, db } from '../firebase'
import { getAuth, signOut } from "firebase/auth";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { collection, getDocs, doc, onSnapshot, addDoc } from "firebase/firestore";
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native'


const Home = ({ navigation }) => {
    const [months, setMonths] = useState([])
    const [found, setFound] = useState(true)
    const [salary, setSalary] = useState({})
    const isFocused = useIsFocused()
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        getList()
        let month = moment().format("MMMM");
        const monthRef = collection(db, "month")
        console.log(salary)
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

    }, [found, isFocused])

    const getList = async () => {

        const storedValue = await AsyncStorage.getItem('@salary');

        if (!storedValue) {
            setSalary([])
            navigation.navigate('Salary')

        }

        const list = JSON.parse(storedValue)
        setSalary(list)



    }



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



    const renderItem = ({ item }) => {



        return (
            <Pressable onPress={() => navigation.navigate('Report', { item })}
                p={5} m={2} backgroundColor={'green.50'} borderRadius={20} style={{
                    shadowColor: '#1AA37A',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    elevation: 5
                }}>

                <HStack justifyContent='space-between' alignItems={'center'} >
                    <VStack>
                        <Heading>{item.month} month</Heading>
                        <Text>Report</Text>
                    </VStack>
                    <MaterialIcons name='chevron-right' size={30} />
                </HStack>


            </Pressable>
        );
    };



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#CAF6BF' }} >


            {/* 
                <Center
                    mt={40}
                    p={5} m={2} backgroundColor={'green.50'} borderRadius={20} style={{
                        shadowColor: '#1AA37A',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.8,
                        shadowRadius: 2,
                        elevation: 5
                    }}>
                    <Text fontSize='lg'>Pls enter your monthly income</Text>



                    <Input mt='5'
                        borderColor='green.800'
                        h='10'
                        keyboardType='numeric'
                        placeholderTextColor='black'
                        onChangeText={(text) => setSalary(text)}
                        // onEndEditing={(text) => setSalary(text)}
                        w={{
                            base: "75%",
                            md: "25%"
                        }} size={5} placeholder="Income..." value={salary} />
                    <Button mt='5' backgroundColor="#1AA37A"
                        _text={{ color: 'black' }}
                        name='Press' onPress={submitSalary} w={{
                            base: "55%",
                            md: "25%"

                        }}> Submit</Button>
                </Center> */}



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