import React, { useCallback, useEffect, useRef } from 'react'
import { StatusBar, StyleSheet, View, Text, Image, Animated, Easing } from 'react-native'
import { Audio, Video } from 'expo-av';
import { getMusicNoteAnim, WINDOW_HEIGHT, WINDOW_WIDTH } from '../../utils'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { menu1Data } from '../data/menuData';

interface IProps {
    item: any
    isPlay: boolean
}



export default function VideoItem(props: IProps) {



    return <View style={[
        styles.container,
        { height: WINDOW_HEIGHT },
    ]}>
        <Text>aa</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        width: WINDOW_WIDTH,
    },
    video: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    bottomSection: {
        bottom: 0,
        position: 'absolute',
        width: WINDOW_WIDTH,
        marginBottom: 25,
        flexDirection: 'row'
    },
    bottomLeftSection: {
        width: WINDOW_WIDTH - 60,
        justifyContent: 'center',
        paddingLeft: 10
    },
    bottomRightSection: {
        width: 60,
        justifyContent: 'center'
    },
    textCation: {
        color: '#FFFFFF'
    },
    textChannel: {
        color: '#FFFFFF',
        fontWeight: 'bold'
    },
    disc: {
        width: 45,
        height: 45
    },
    noteMusic: {
        width: 20,
        height: 20,
        position: 'absolute',
        top: -5,
        left: -10,
        tintColor: 'white',
    }
})

