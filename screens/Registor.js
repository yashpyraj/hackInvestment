import React, { useState, useLayoutEffect } from 'react'
import { Center, Image, Input, Icon, Button, KeyboardAvoidingView, Heading } from 'native-base';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { auth } from '../firebase';


import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";


const RegistorScreen = ({ navigation }) => {
    const [fullName, setfullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [show, setShow] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: 'Back to login'
        })
    }, [navigation])
    const registor = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                console.log(userCredential)
                const user = userCredential.user
                updateProfile(user, {
                    displayName: fullName,
                    photoURL: imageUrl || 'https://www.gravatar.com/avatar/?d=identicon',
                })

                // ...
            })
            .catch((error) => {
                console.log(error)
                console.log(error.message)


                // ..
            });
    }

    // const test = () => {
    //     sendEmailVerification(auth.currentUser)
    //         .then(() => {
    //             console.log('Email verification sent!')
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //             console.log(error.message)


    //             // ..
    //         });
    // }

    return (
        <KeyboardAvoidingView style={styles.container}>

            <Center flex={1}>
                <Heading>Create a Account </Heading>
                <Input mt='5'
                    onChangeText={(text) => setfullName(text)}
                    w={{
                        base: "75%",
                        md: "25%"
                    }} placeholder="Full Name" value={fullName} />
                <Input mt='5'
                    onChangeText={(text) => setEmail(text)}
                    w={{
                        base: "75%",
                        md: "25%"
                    }} placeholder="Email" value={email} />
                <Input
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    w={{
                        base: "75%",
                        md: "25%"
                    }} type={show ? "text" : "password"} mt='5' InputRightElement={<Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" onPress={() => setShow(!show)} />} placeholder="Password" />
                <Input mt='5'
                    onChangeText={(text) => setImageUrl(text)}
                    onSubmitEditing={registor}
                    w={{
                        base: "75%",
                        md: "25%"
                    }} placeholder="Image url (Optional) " value={imageUrl} />
                <Button
                    onPress={registor}

                    mt='5' name='Press' w={{
                        base: "55%",
                        md: "25%"
                    }} > Registor</Button>
            </Center>
        </KeyboardAvoidingView>

    )
}

export default RegistorScreen

const styles = StyleSheet.create({
    container: { flex: 1 },
})
