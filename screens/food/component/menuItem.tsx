import React from "react";
import { TouchableOpacity, StyleSheet, Image, Text, View } from "react-native";

interface IProps {
    name: any,
    image: any,
    description: any,
    price: any,
    key: any
}

export default function MenuItem(props: IProps) {

    return <TouchableOpacity key={props.key} style={[styles.container]}>
        <Image source={props.image} style={styles.image} />
        <View style={styles.dishInfo}>
            <View>
                <Text style={styles.dishName}>{props.name}</Text>
                <Text style={styles.description}>{props.description}</Text>
            </View>
            <Text style={styles.price}>${props.price}</Text>
        </View>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: '#eaeaea',
        paddingVertical: 16,
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 16,
    },
    dishInfo: {
        flex: 1,
        flexWrap: 'wrap',
    },
    dishName: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
    },
    description: {
        fontSize: 11,
        color: 'rgba(51, 51, 51, 0.4)',
        marginBottom: 8,
    },
    price: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#FE4A00',
    },
})