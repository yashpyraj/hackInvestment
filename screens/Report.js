import { StyleSheet, View, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import { collection, query, onSnapshot, doc, updateDoc, deleteDoc, addDoc } from "firebase/firestore";
import { Heading, Center, ScrollView, Text, Input, HStack, FlatList, Pressable, Button, Box } from 'native-base'
import { auth, db } from '../firebase'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useIsFocused } from '@react-navigation/native'



export default function Report({ navigation, route }) {
    const [expenses, setExpenses] = useState([])
    const [desc, setDesc] = useState(0)
    const isFocused = useIsFocused()




    useEffect(() => {
        const q = query(collection(db, "expenses"));
        const unsub = onSnapshot(q, (querySnapshot) => {
            let expenses = [];
            querySnapshot.forEach((doc) => {
                expenses.push({ ...doc.data(), id: doc.id });
            });
            setExpenses(expenses);
        });
        return () => unsub();
    }, [isFocused]);
    const toggleComplete = async (expenses) => {
        await updateDoc(doc(db, "expenses", expenses.id), { completed: !task.completed });
    };

    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "expenses", id));
    };

    const renderItem = ({ item }) => {



        return (
            <Pressable
                p={5} m={2} backgroundColor={'green.50'} borderRadius={20} style={{
                    shadowColor: '#1AA37A',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    elevation: 5
                }}>

                <Text>{item.expenses}</Text>

            </Pressable>
        );
    };
    return (
        <KeyboardAvoidingView style={styles.container}>

            <Box flex={1} m={5}>
                <Heading>Your Expenses</Heading>

                <Button mt='5' backgroundColor="#1AA37A"
                    _text={{ color: 'black' }}
                    name='Press'
                    onPress={() => navigation.navigate('AddExpense')}
                    w={{
                        base: "55%",
                        md: "25%"

                    }}> Add</Button>

            </Box>
            <FlatList
                mt={2}
                data={expenses}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})