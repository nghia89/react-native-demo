import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface IProp {
    title: string,
    children: React.ReactNode
}

export default function Menu(props: IProp) {
    return <View style={styles.container}>
        <Text style={styles.title}>{props.title}</Text>
        <View>{props.children}</View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 40
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 16
    }
})