import React, { useCallback, useEffect, useRef } from 'react'
import { StatusBar, StyleSheet, View, Text, Image, Animated, Easing } from 'react-native'
import { Audio, Video } from 'expo-av';
import { getMusicNoteAnim, WINDOW_HEIGHT, WINDOW_WIDTH } from '../../utils'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { VideoModel } from '../data/videosData';

interface IProps {
    item: VideoModel
    isPlay: boolean
}

const statusBarHeight = StatusBar.currentHeight || 0;

export default function VideoItem(props: IProps) {

    const { item, isPlay } = props

    const discAnimatedValue = useRef(new Animated.Value(0)).current;
    const musicNoteAnimatedValue1 = useRef(new Animated.Value(0)).current;
    const musicNoteAnimatedValue2 = useRef(new Animated.Value(0)).current;


    const noteMusicAnimated1 = getMusicNoteAnim(musicNoteAnimatedValue1, false)
    const noteMusicAnimated2: any = getMusicNoteAnim(musicNoteAnimatedValue2, true)

    const discAnimLoopRef = useRef<any>();
    const musicAnimLoopRef = useRef<any>();


    const discAnimated = {
        transform: [
            {
                rotate: discAnimatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg']
                })
            }
        ]
    }

    const triggerAnimation = useCallback(() => {
        discAnimLoopRef.current = Animated.loop(
            Animated.timing(discAnimatedValue, {
                toValue: 1,
                duration: 3000,
                easing: Easing.linear,
                useNativeDriver: true
            })
        );
        discAnimLoopRef.current.start();
        musicAnimLoopRef.current = Animated.loop(
            Animated.sequence([
                Animated.sequence([
                    Animated.timing(musicNoteAnimatedValue1, {
                        toValue: 1,
                        duration: 2000,
                        easing: Easing.linear,
                        useNativeDriver: false,
                    }),
                    Animated.timing(musicNoteAnimatedValue2, {
                        toValue: 1,
                        duration: 2000,
                        easing: Easing.linear,
                        useNativeDriver: false,
                    }),
                ]),
            ]),
        );
        musicAnimLoopRef.current.start();
    }, [discAnimatedValue, musicNoteAnimatedValue1, musicNoteAnimatedValue2]);

    useEffect(() => {
        if (isPlay) {
            triggerAnimation();
        } else {
            discAnimLoopRef.current?.stop();
            musicAnimLoopRef.current?.stop();
            discAnimatedValue.setValue(0);
            musicNoteAnimatedValue1.setValue(0);
            musicNoteAnimatedValue2.setValue(0);
        }
    }, [isPlay, triggerAnimation, discAnimatedValue, musicNoteAnimatedValue1, musicNoteAnimatedValue2,]);


    return <View style={[
        styles.container,
        { height: WINDOW_HEIGHT },
    ]}>
        <StatusBar barStyle={'light-content'} />
        <Video
            source={{ uri: item.uri }}
            style={styles.video}
            shouldPlay={isPlay}
            // useNativeControls
            resizeMode="cover"
            isLooping
        // paused={!isActive}
        />
        <View style={styles.bottomSection}>
            <View style={styles.bottomLeftSection}>
                <Text style={styles.textChannel}>{item.channelName}</Text>
                <Text style={styles.textCation}>{item.caption}</Text>
                <Text style={styles.textCation}>{item.musicName}</Text>
            </View>
            <View style={styles.bottomRightSection}>
                <Animated.Image source={require('./../../assets/disc.png')} style={[styles.disc, discAnimated]} />
                <Animated.Image source={require('./../../assets/floating-music-note.png')} style={[styles.noteMusic, noteMusicAnimated1]} />
                <Animated.Image source={require('./../../assets/floating-music-note.png')} style={[styles.noteMusic, noteMusicAnimated2]} />
            </View>
        </View>
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

