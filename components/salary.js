import { StyleSheet, View, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { Center, Text, Input, Button } from 'native-base'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Salary = ({ navigation }) => {
    const [salary, setSalary] = useState({})
    const add = () => {
        console.log('here')
    }
    const addSAlary = async () => {
        try {
            if (Object.keys(salary).length === 0) {
                return alert('Please add salary')
                //TODO: all snackbar here
            }
            const salaryadd = {
                salary: salary

            }
            await AsyncStorage.setItem('@salary', JSON.stringify(salaryadd))
            navigation.navigate('Home')


        } catch (error) {
            console.log(error)
        }
    }
    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: '#CAF6BF' }} >
            <Center flex={1}>

                <Text fontSize='lg'>Pls enter your monthly income</Text>
                <Input mt='5'
                    borderColor='green.800'
                    h='10'
                    keyboardType='numeric'
                    placeholderTextColor='black'
                    onChangeText={(text) => setSalary(text)}
                    w={{
                        base: "75%",
                        md: "25%"
                    }} size={5} placeholder="Income..." value={salary} />
                <Button mt='5' backgroundColor="#1AA37A"
                    _text={{ color: 'black' }}
                    name='Press' onPress={addSAlary} w={{
                        base: "55%",
                        md: "25%"

                    }}> Submit</Button>

            </Center>



        </SafeAreaView>
    )
}

export default Salary

const styles = StyleSheet.create({})