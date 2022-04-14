import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, Animated } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

const width = Dimensions.get('screen').width
export default function DoubleTab() {

    const [isHeart, setIsHeart] = useState(false)
    const lastHeart = useRef(0)
    const isAnimating = useRef(false);
    const animatedValue = useRef(new Animated.Value(0)).current

    useEffect(() => {
        if (isHeart)
            Animated.timing(
                animatedValue,
                {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true
                }
            ).start(() => (isAnimating.current = false));
        else {
            animatedValue.setValue(0)
            isAnimating.current = false;
        }
    }, [animatedValue, isHeart])

    const heartAnimation = {
        transform: [
            {
                scale: animatedValue.interpolate({
                    inputRange: [0, 0.1, 0.8, 1],
                    outputRange: [0, 2, 2, 1]
                })
            },
            {
                translateY: animatedValue.interpolate({
                    inputRange: [0, 0.1, 0.8, 1],
                    outputRange: [0, -40, -40, 1]
                })
            }
        ]
    }

    const heartCircleAnimation = {
        opacity: animatedValue,
    }

    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity style={{ width: width - 100, height: 60, backgroundColor: '#ffffff', borderRadius: 8, padding: 5 }}
            onPress={() => {
                const now = Date.now();
                const delay = 300;
                if (lastHeart && now - lastHeart.current < delay) {
                    if (!isAnimating.current) {
                        setIsHeart(!isHeart)
                        isAnimating.current = true;
                    }
                }
                else
                    lastHeart.current = now
            }}
        >
            <View>
                <Text>Nội dung tin nhắn...</Text>
            </View>
            {
                isHeart && <View style={[styles.circleHeart]} >
                    <Animated.View style={[{ width: 30, height: 30, borderWidth: 1, borderRadius: 25, borderColor: '#cbcbcb', position: 'absolute' }, heartCircleAnimation]}></Animated.View>
                    <Animated.View
                        style={[heartAnimation]}>
                        <Icon name="heart-outline" size={25}></Icon>
                    </Animated.View>
                </View>
            }
        </TouchableOpacity>

    </View>
}

let styles = StyleSheet.create({

    circleHeart: {
        justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-end', width: 30, height: 30, position: 'relative'
    }
})