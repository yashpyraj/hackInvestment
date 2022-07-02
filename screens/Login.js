import { StyleSheet, Text, View, KeyboardAvoidingView, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { Button, Input, Center, Image, Icon, Heading } from 'native-base'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { SafeAreaView } from 'react-native-safe-area-context'
const Login = ({ navigation }) => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState('')
    const image = { uri: "https://www.w3schools.com/css/img_lights.jpg" };

    const signIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log('Sign IN', user)
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error)
                // ..
            });
    }
    return (

        <KeyboardAvoidingView style={styles.container}>
            <ImageBackground source={image} blurRadius={5} resizeMode="cover" style={{ flex: 1 }}>
                <Center flex={1}>
                    <Heading>Hello Again</Heading>
                    <Text>Welcome Back!!</Text>
                    <Input mt='5'
                        borderColor='black'
                        placeholderTextColor='black'
                        onChangeText={(text) => setEmail(text)}
                        w={{
                            base: "75%",
                            md: "25%"
                        }} InputLeftElement={<Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="black" />} placeholder="Name" value={email} />
                    <Input
                        onChangeText={(text) => setPassword(text)}
                        borderColor='black'
                        placeholderTextColor='black'
                        value={password}
                        w={{
                            base: "75%",
                            md: "25%"
                        }} type={show ? "text" : "password"} mt='5'
                        onSubmitEditing={signIn}

                        InputRightElement={<Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="black" onPress={() => setShow(!show)} />} placeholder="Password" />
                    <Button mt='5' backgroundColor="#1AA37A"
                        _text={{ color: 'black' }}
                        name='Press' onPress={signIn} w={{
                            base: "55%",
                            md: "25%"

                        }}> Login</Button>
                    <Button
                        borderColor="black"
                        _text={{ color: 'black' }}
                        onPress={() => navigation.navigate('Registor')}
                        mt='5' name='Press' variant={'outline'}
                        w={{
                            base: "55%",
                            md: "25%"
                        }} > Registor</Button>


                </Center>
            </ImageBackground>
        </KeyboardAvoidingView>

    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})