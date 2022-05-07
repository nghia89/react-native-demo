import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, Animated, Platform, SafeAreaView } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { WINDOW_WIDTH } from '../../utils';
import AnimatedHeart from './AnimatedHeart';

const width = Dimensions.get('screen').width
function getUniqueID() {
    return Math.floor(Math.random() * Date.now()).toString();
}
export default function DoubleChatZalo() {

    const [hearCount, setHearCount] = useState(0)
    const hearCountAnimatedValue = useRef(new Animated.Value(0)).current;
    const timeout = useRef<ReturnType<typeof setTimeout>>();
    const [hearts, setHearts] = useState<{ id: string }[]>([]);


    const handleCompleteAnimation = useCallback((id: string) => {
        setHearts(pre => {
            return [...pre].filter(x => x.id !== id)
        })
    }, [])

    return <SafeAreaView style={{
        backgroundColor: '#eaeaeaea',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }}>
        <View style={{ flexDirection: 'row' }}>
            <View style={{
                width: WINDOW_WIDTH * 0.7,
                backgroundColor: 'white',
                borderRadius: 8,
                padding: 8,
            }}>
                <Text>Nội dung tin nhắn sd asd asd sad sad...</Text>
            </View>
            <View>
                <TouchableOpacity
                    activeOpacity={1}
                    style={[styles.reactionButton, styles.loveButton]}
                    onPress={() => {
                        setHearCount(hearCount + 1);
                        setHearts(oldHearts => [...oldHearts, { id: getUniqueID() }]);
                        if (timeout.current)
                            clearTimeout(timeout.current)
                        timeout.current = setTimeout(() => {
                            Animated.spring(hearCountAnimatedValue, {
                                toValue: 0,
                                speed: 50,
                                useNativeDriver: true
                            }).start(() => setHearCount(0))
                        }, 500);

                        Animated.spring(hearCountAnimatedValue, {
                            toValue: -50,
                            speed: 50,
                            useNativeDriver: true
                        }).start()
                    }}
                >
                    {
                        hearCount ? (<Animated.Image
                            style={[styles.heartIcon]}
                            source={require('../../assets/images/heart.png')}
                        />) :
                            (<Animated.Image
                                style={[styles.heartIcon]}
                                source={require('../../assets/images/heart-outline.png')}
                            />)
                    }
                </TouchableOpacity>
            </View>
            <Animated.View
                style={[
                    styles.reactionButton1,
                    styles.loveCountCircle,
                    {
                        transform: [
                            { translateY: hearCountAnimatedValue },
                            {
                                scale: hearCountAnimatedValue.interpolate({
                                    inputRange: [-50, 0],
                                    outputRange: [1, 0]
                                })
                            }
                        ]
                    }
                ]}>
                <Text style={styles.loveCountText}>{hearCount}</Text>
            </Animated.View>
            {hearts.map(({ id }) => (
                <AnimatedHeart
                    key={id}
                    id={id}
                    onCompleteAnimation={handleCompleteAnimation}
                />
            ))}
        </View>
    </SafeAreaView>
}

let styles = StyleSheet.create({
    heartCircle: {
        width: 32,
        height: 32,
        position: 'absolute',
        top: 15,
        right: -3,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor: 'white',
        ...Platform.select({
            android: { elevation: 3 },
            ios: {
                shadowColor: 'grey',
                shadowOpacity: 1,
                shadowRadius: 1,
                shadowOffset: {
                    width: 0.5,
                    height: 0.5,
                },
            },
        }),
    },
    heartIcon: {
        position: 'absolute',
        width: 18,
        height: 18,
    },
    reactionButton: {
        position: 'absolute',
        top: 39,
        right: 2,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100
    },
    reactionButton1: {
        position: 'absolute',
        top: 39,
        right: 2,
        zIndex: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loveButton: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: 'white',
        ...Platform.select({
            android: { elevation: 3 },
            ios: {
                shadowColor: 'grey',
                shadowOpacity: 1,
                shadowRadius: 1,
                shadowOffset: {
                    width: 0.5,
                    height: 0.5,
                },
            },
        }),
    },
    loveIcon: {
        width: 12,
        height: 12,
    },
    loveCountCircle: {
        width: 24,
        height: 24,
        borderRadius: 16,
        backgroundColor: '#ffd500',
        zIndex: 100,
    },
    loveCountText: {
        color: 'white',
    },
})