
import React, { useRef } from "react";
import { StatusBar, FlatList, Image, Animated, Text, View, Dimensions, StyleSheet, TouchableOpacity, Easing, SafeAreaViewBase, SafeAreaView } from 'react-native';
const { width, height } = Dimensions.get('screen');
import { faker } from '@faker-js/faker';

faker.seed(10);
const DATA = [...Array(30).keys()].map((_, i) => {
    return {
        key: faker.random.uuid(),
        image: `https://randomuser.me/api/portraits/${faker.helpers.randomize(['women', 'men'])}/${faker.random.number(60)}.jpg`,
        name: faker.name.findName(),
        jobTitle: faker.name.jobTitle(),
        email: faker.internet.email(),
    };
});

const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3 - (StatusBar.currentHeight || 30);

export default function FlatListAnimated() {
    const scrollY = useRef(new Animated.Value(0)).current;

    return <View style={{ flex: 1, backgroundColor: '#6666' }}>
        <FlatList
            onScroll={
                Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
                    useNativeDriver: false
                })}
            data={DATA}
            keyExtractor={item => item.key}
            contentContainerStyle={{ padding: 15 }}
            renderItem={({ item, index }) => {
                return <Animated.View
                    style={{
                        backgroundColor: 'white',
                        flexDirection: 'row', margin: 15, borderRadius: 20, shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                        transform: [{
                            scale: scrollY.interpolate({
                                inputRange: [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 2)],
                                outputRange: [1, 1, 1, 0]
                            }),
                        }],
                        opacity: scrollY.interpolate({
                            inputRange: [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 1)],
                            outputRange: [1, 1, 1, 0]
                        })
                    }}>
                    <Image
                        source={{ uri: item.image }}
                        style={{ width: AVATAR_SIZE, height: AVATAR_SIZE, borderRadius: 36, marginRight: SPACING / 2 }}
                    />
                    <View>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.name}</Text>
                        <Text style={{ fontSize: 18, opacity: .8 }}>{item.email}</Text>
                        <Text style={{ fontSize: 14, opacity: .7 }}>{item.jobTitle}</Text>
                    </View>
                </Animated.View>
            }}
        />
    </View>
}