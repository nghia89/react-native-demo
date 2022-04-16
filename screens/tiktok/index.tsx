import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import React, { useEffect, useRef, useState } from 'react';
import Videos from './../data/videosData'
import VideoItem from "./videoItem";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../../utils";
import { StatusBar } from "expo-status-bar";



export default function Tiktok() {
    const [currentIndex, setCurrentIndex] = useState(0)
    return <View   >
        <FlatList
            data={Videos}
            renderItem={({ item, index }) => (
                <VideoItem item={item} isPlay={currentIndex == index} />
            )}
            onScroll={(e) => {
                const index = Math.round(e.nativeEvent.contentOffset.y / (WINDOW_HEIGHT - 40))
                setCurrentIndex(index)
            }}
            pagingEnabled
        />
        <StatusBar />
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
})