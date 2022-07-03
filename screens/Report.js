import { StyleSheet, View, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import { collection, query, onSnapshot, doc, updateDoc, deleteDoc, addDoc } from "firebase/firestore";
import { Heading, Center, ScrollView, Text, Input, HStack, FlatList, Pressable, Button, Box } from 'native-base'
import { auth, db } from '../firebase'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native'



export default function Report({ navigation, route }) {
    const [expenses, setExpenses] = useState([])
    const isFocused = useIsFocused()
    const [totalCost, setTotalCost] = useState(0)
    const [salary, setSalary] = useState(0)




    useEffect(() => {
        retrieveData()
        const q = query(collection(db, "expenses"));
        const unsub = onSnapshot(q, (querySnapshot) => {
            let expenses = [];
            querySnapshot.forEach((doc) => {
                expenses.push({ ...doc.data(), id: doc.id });
            });
            setExpenses(expenses);
            setTotalCost(expenses.reduce((n, { expenses }) => n + parseInt(expenses), 0))
        });


        return () => unsub();
    }, [isFocused]);


    const retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('@salary');
            if (value !== null) {
                console.log(value)
                const list = JSON.parse(value)

                setSalary(list.salary)
            }
        } catch (error) {
            console.log(error)
        }
    };

    //update feature
    // const toggleComplete = async (expenses) => {
    //     await updateDoc(doc(db, "expenses", expenses.id), { completed: !task.completed });
    // };

    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "expenses", id));
    };

    const renderItem = ({ item }) => {



        return (
            <Box
                p={5} m={2} backgroundColor={'green.50'} borderRadius={20} style={{
                    shadowColor: '#1AA37A',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    elevation: 5
                }}>
                <HStack alignItems={'center'} justifyContent={'space-between'}>
                    <HStack>
                        <Text m={1}>{item.expenses}</Text>
                        <Text m={1}>{item.desc}</Text>
                    </HStack>
                    <TouchableOpacity onPress={() => { handleDelete(item.id) }}>
                        <MaterialIcons name='delete' size={25} color={'#1AA37A'} />
                    </TouchableOpacity>
                </HStack>
            </Box>
        );
    };

    let profit = salary - totalCost
    return (
        <ScrollView style={styles.container}>

            <Box flex={1} m={5}>
                <Heading textAlign={'center'}>Your Expenses</Heading>

                <Button mt='5'
                    alignSelf={'center'}
                    backgroundColor="#1AA37A"
                    _text={{ color: 'black' }}
                    ml={3}
                    name='Press'
                    onPress={() => navigation.navigate('AddExpense')}
                    w={{
                        base: "55%",
                        md: "25%"

                    }}> Add</Button>

                <Box h={'70%'}>
                    <FlatList

                        data={expenses}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                    />

                </Box>
                <Text bold fontSize={'xl'} ml={2}>Your expenses:{totalCost}</Text>
                {
                    profit > 0 ?

                        <Text ml={2}>Your Saving this month: {salary - totalCost}</Text>
                        :
                        <Text ml={2}>Loss , you are broke</Text>}
            </Box>
            <Box>
                <Text bold fontSize={'2xl'} textAlign={'center'}> Investment news</Text>
            </Box>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#CAF6BF'
    },
})