import { Easing, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
import { Text, StyleSheet, Animated } from "react-native"
import Icon from 'react-native-vector-icons/Ionicons'
export default function AddButton(props: any) {
    const buttonScale = useRef(new Animated.Value(1)).current;
    const [plush, setPlush] = useState(0);
    const notePlusValue = useRef(new Animated.Value(plush)).current;


    function handlePress() {
        Animated.sequence([
            Animated.timing(buttonScale, {
                toValue: 0.9,
                duration: 200,
                useNativeDriver: true
            }),
            Animated.timing(buttonScale, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true
            }),
            Animated.timing(notePlusValue, {
                toValue: plush == 0 ? 1 : 0,
                duration: 200,
                easing: Easing.linear,
                useNativeDriver: true
            })
        ]).start(() => { setPlush(plush == 1 ? 0 : 1) })
    }

    return <View style={{ alignItems: 'center' }}>
        <Animated.View style={{
            transform: [{
                translateX: notePlusValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, -75],
                }),
            },
            {
                translateY: notePlusValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -60],
                })
            }]
        }}>
            <View style={{ backgroundColor: "#7F58FF", borderRadius: 20, width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                <Icon name="call-outline" size={20} color={"white"} />
            </View>
        </Animated.View>
        <Animated.View style={[styles.button, {
            transform: [
                {
                    scale: buttonScale
                }
            ]
        }]}>

            <TouchableOpacity
                onPress={() => handlePress()}
            >
                <Animated.View style={{
                    transform: [{
                        rotate: notePlusValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: ["0deg", "60deg"],
                        })
                    }]
                }}>
                    <Icon name="add-outline" size={32} color={"white"} />
                </Animated.View>
            </TouchableOpacity>
        </Animated.View>
    </View>
}

const styles = StyleSheet.create({
    button: {
        width: 72, height: 72, backgroundColor: "#7F58FF", justifyContent: 'center', alignItems: 'center', borderRadius: 36, top: -70, shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
})