import { View, Text, StyleSheet, FlatList, Dimensions, ScrollView, Platform, Image, Animated, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from 'react';
import { menu1Data, menu2Data, menu3Data } from '../data/menuData'

import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../../utils";
import { StatusBar } from "expo-status-bar";
import Menu from "./component/menu";
import MenuItem from "./component/menuItem";
import Icon from "react-native-vector-icons/Ionicons";


export default function Food() {
    const [currentIndex, setCurrentIndex] = useState(0)

    const bannerAnimationValue = useRef(new Animated.Value(0)).current;

    const bannerAnimated = {
        transform: [
            {
                scale: bannerAnimationValue.interpolate({
                    inputRange: [-300, 0],
                    outputRange: [2, 1],
                    extrapolate: 'clamp',
                }),
            },
        ],
    }


    return <View style={styles.container} >
        <TouchableOpacity
            style={styles.searchButton}
        >
            <Icon style={{ color: 'white' }} size={32} name="search-outline"></Icon>
        </TouchableOpacity>
        <Animated.View style={[styles.bannerContainer, bannerAnimated]}>
            <Image style={styles.banner} source={require('../../assets/images/food-app/foodBanner.png')} />
            <View
                style={styles.gradient}
            />
        </Animated.View>
        <ScrollView
            onScroll={Animated.event(
                [
                    {
                        nativeEvent: {
                            contentOffset: { y: bannerAnimationValue }
                        }
                    }
                ],
                { useNativeDriver: false },
            )}
            scrollEventThrottle={30}

        >
            <View style={styles.paddingForBanner} />

            <View style={styles.scrollViewContent}>
                <View style={styles.shopDetailCard}>
                    <Text>Restaurant</Text>
                    <Text style={styles.shopAddressTextRow}>
                        <Text style={styles.distance}>1km</Text>
                        <Text>-</Text>
                        <Text style={styles.shopAddress}> 127 trần thế </Text>
                    </Text>
                    <View style={styles.ratingsRow}>
                        <Text style={styles.start}>★</Text>
                        <Text style={styles.ratingPointText}>5</Text>
                        <Text style={styles.numberOfRatings}>(999+)</Text>
                    </View>
                </View>
                <Menu title="Recommended Menu">
                    {menu1Data.map((item, index) => (
                        <MenuItem {...item} key={index} />
                    ))}
                </Menu>
                <Menu title="Crispy Chicken">
                    {menu2Data.map((item, index) => (
                        <MenuItem {...item} key={index} />
                    ))}
                </Menu>
                <Menu title="Dessert">
                    {menu3Data.map((item, index) => (
                        <MenuItem {...item} key={index} />
                    ))}
                </Menu>
            </View>
        </ScrollView>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    paddingForBanner: {
        height: 224
    },
    bannerContainer: {
        height: 224,
        width: '100%',
        position: 'absolute'
    },
    banner: {
        width: '100%',
        height: '100%'
    },
    shopDetailCard: {
        width: '90%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        padding: 16,
        marginBottom: 40,
        marginTop: -40,
        borderRadius: 8,
        ...Platform.select({
            android: { elevation: 3 },
            ios: {
                shadowColor: '#a8bed2',
                shadowOpacity: 1,
                shadowRadius: 4,
                shadowOffset: {
                    width: 2,
                    height: 2
                }
            }
        })
    },
    shopName: {
        color: '#101825',
        fontSize: 24,
        fontWeight: 'bold'
    },
    shopAddressTextRow: {
        fontSize: 12,
        marginVertical: 16
    },
    distance: {
        fontWeight: 'bold',
        color: '#607d8b'
    },
    shopAddress: {
        color: '#586065'
    },
    ratingsRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    start: {
        color: '#f6be00',
        fontSize: 16
    },
    ratingPointText: {
        fontWeight: 'bold',
        fontSize: 12,
        marginLeft: 4,
        marginRight: 2
    },
    numberOfRatings: {
        color: '#607d8b',
        fontSize: 12
    },
    scrollViewContent: {
        paddingHorizontal: 16,
        backgroundColor: 'white',
    },
    gradient: {
        position: 'absolute',
        opacity: 0.1,
        width: '100%',
        backgroundColor: 'black',
        height: 124,
    },
    searchButton: {
        position: 'absolute',
        zIndex: 100,
        width: 48,
        height: 48,
        right: 0,
        top: 48
    }
})