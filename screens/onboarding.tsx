import React, { useEffect, useRef, useState } from "react";
import { View, Text, Image, FlatList, Dimensions, Animated, TouchableOpacity } from "react-native";
import Svg, { Circle, G, Path } from "react-native-svg";
import { Sliders } from './data/slider'
import AntDesign from 'react-native-vector-icons/AntDesign'
const { width, height } = Dimensions.get('window')
export function Onboarding(props: any) {
    const scrollX = useRef(new Animated.Value(0)).current
    const [currentIndex, setCurrentIndex] = useState(0)

    const sliderRef = useRef<any>(null)

    const viewableItemsChanged = useRef(({ viewableItems }: any) => {
        setCurrentIndex(viewableItems[0].index)
    }).current;
    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    const scrollTo = () => {
        if (currentIndex < Sliders.length - 1) {
            sliderRef.current.scrollToIndex({ index: currentIndex + 1 })
        } else {
            props.handleOnboarding()
        }
    }

    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ flex: 3 }}>
            <FlatList
                data={Sliders}
                renderItem={(({ item }) => OnboardingItem(item))}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                bounces={false}
                keyExtractor={(item, index) => item.id.toString()}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                    useNativeDriver: false
                })}
                onViewableItemsChanged={viewableItemsChanged}
                scrollEventThrottle={32}
                viewabilityConfig={viewConfig}
                ref={sliderRef}
            />
            {OnboardingPaging(Sliders, scrollX)}
            {NextButton(scrollTo)}
        </View>
    </View>
}

interface IProps {
    id: number,
    path: string,
    title: string
}

export function OnboardingItem({ id, path, title }: IProps) {
    return <View key={id} style={{ flex: 1, width: width, height: height, justifyContent: 'center' }}>
        <Image resizeMode="contain" style={{ flex: 0.7 }} source={{ uri: path }} />
        <View style={{ padding: 15 }}>
            <Text>{title}</Text>
        </View>
    </View>
}

export function OnboardingPaging(sliders: any[], scrollX: Animated.Value) {
    return <View style={{ flexDirection: 'row', height: 60, justifyContent: 'center' }}>
        {
            sliders.map((_, i) => {
                const inputRange = [(i - 1) * width, i * width, (i + 1) * width]
                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [10, 20, 10],
                    extrapolate: "clamp"
                })
                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.3, 1, 0.3],
                    extrapolate: "clamp"
                })
                return <Animated.View key={i} style={{ width: dotWidth, opacity: opacity, height: 10, borderRadius: 5, backgroundColor: '#493d8a', margin: 8 }} />
            })
        }
    </View>
}

export function NextButton(scrollTo: any) {
    const size = 128, strokeWidth = 2, center = size / 2, radius = size / 2 - strokeWidth / 2, circumference = 2 * Math.PI * radius - 2;

    const progressAnimation = useRef(new Animated.Value(0)).current;
    const progressRef = useRef<any>(null)

    const animation = (toValue: any) => {
        Animated.timing(progressAnimation, {
            toValue,
            duration: 300,
            useNativeDriver: true
        }).start()
    }
    // useEffect(() => {
    //     animation(percentage)
    // }, [percentage])

    // useEffect(() => {
    //     progressAnimation.addListener((value) => {
    //         const strokeDashoffset = circumference - (circumference * value.value) / 100;
    //         if (progressRef?.current) {
    //             progressRef.current.setNativeProps({
    //                 strokeDashoffset
    //             })
    //         }
    //     }, [percentage])
    // })

    return <View style={{ justifyContent: 'center', paddingBottom: 15 }}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Svg width={size} height={size}   >
                <G rotation={"-90"} origin={center}>
                    <Circle stroke={"#E6E7E8"} cx={center} cy={center} r={radius} strokeWidth={strokeWidth} />
                    {/* <Circle
                        stroke={"#F4338F"} cx={center} cy={center} r={radius}
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                    /> */}
                </G>
            </Svg>
            <TouchableOpacity onPress={scrollTo} style={{ position: 'absolute', padding: 20, borderRadius: 100, backgroundColor: '#f4338f' }} activeOpacity={0.6}>
                <AntDesign name="arrowright" size={32} color="#fff" />
            </TouchableOpacity>
        </View>
    </View>
}