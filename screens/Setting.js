import { StyleSheet, View, SafeAreaView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Center, HStack, Text, Button, VStack } from 'native-base';
import { auth, db } from '../firebase'
import { getAuth, signOut } from "firebase/auth";

const Setting = ({ navigation }) => {
    const [salary, setSalary] = useState({})

    useEffect(() => {
        getList()
    }, [])

    const getList = async () => {

        const storedValue = await AsyncStorage.getItem('@salary');

        if (!storedValue) {
            setSalary([])
            navigation.navigate('Salary')

        }

        const list = JSON.parse(storedValue)
        setSalary(list)



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
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#CAF6BF' }} >
            <Center mt={70} justifyContent={'space-around'} p={5}>
                <Text m={5} fontSize={'xl'}>Your monthly income is</Text>
                <Text m={2} fontSize={'4xl'}>{salary.salary}</Text>
                <Button m={5} w={20} h={10} size="sm"
                    onPress={() => navigation.navigate('Salary')}
                    backgroundColor={'#1AA37A'}

                >EDIT</Button>


            </Center>
            <Button size="sm"
                alignSelf={'center'}
                onPress={userSignOut}
                w={20}
                mt={20}
                borderColor="red"
                _text={{ color: 'red' }}
                variant={'outline'}
                colorScheme="secondary">
                LOGOUT
            </Button>
        </SafeAreaView>
    )
}

export default Setting

const styles = StyleSheet.create({})