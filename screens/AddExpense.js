import { StyleSheet, View, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import { collection, query, onSnapshot, doc, updateDoc, deleteDoc, addDoc } from "firebase/firestore";
import { Heading, Center, ScrollView, Text, Input, HStack, FlatList, Pressable, Button, Box } from 'native-base'
import { auth, db } from '../firebase'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';



const AddExpense = ({ navigation }) => {
    const [expenses, setExpenses] = useState('')
    const [desc, setDesc] = useState('')


    const handleSubmit = async (e) => {
        if (!expenses || !desc) {
            return alert('Please add amount and desc')

        }
        await addDoc(collection(db, "expenses"), {
            expenses,
            desc,
            createdAt: new Date(),
            completed: false,
        });
        navigation.navigate('Report')
    };
    return (
        <Box flex={1} m={5}>
            <Heading>Your Expenses</Heading>
            <Input mt='5'
                borderColor='black'
                keyboardType='numeric'
                h='10'
                placeholderTextColor='black'
                onChangeText={(text) => setExpenses(text)}
                w={{
                    base: "75%",
                    md: "25%"
                }}
                placeholder="Amount" value={expenses} />
            <Input
                onChangeText={(text) => setDesc(text)}
                borderColor='black'
                h='10'
                placeholderTextColor='black'
                value={desc}
                w={{
                    base: "75%",
                    md: "25%"
                }} mt='5'
                onSubmitEditing={() => { }}

                placeholder="Description" />
            <Button mt='5' backgroundColor="#1AA37A"
                _text={{ color: 'black' }}
                name='Press' onPress={handleSubmit} w={{
                    base: "55%",
                    md: "25%"

                }}> Enter</Button>

        </Box>
    )
}

export default AddExpense

const styles = StyleSheet.create({})