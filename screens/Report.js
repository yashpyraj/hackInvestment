import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Heading, Center } from 'native-base'

export default function Report({ navigation, route }) {
    return (
        <View>
            <Center>
                <Heading>{route.params.item.month}</Heading>
            </Center>
        </View>
    )
}

const styles = StyleSheet.create({})