import React, { useEffect, useRef } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { WINDOW_HEIGHT } from '../../utils';



type AnimatedHeartProps = {
    id: string;
    onCompleteAnimation: (id: string) => void;
};
const getRandomSignedNum = () => (Math.random() < 0.5 ? -1 : 1);
const getRandomXOutput = () => {
    if (getRandomSignedNum() < 0) {
        return -(Math.floor(Math.random() * 300) + 20);
    } else {
        return Math.floor(Math.random() * 10) + 20;
    }
};
const getRandomRotateOutput = () => {
    return [getRandomSignedNum() < 0 ? '-60deg' : '60deg', '0deg'];
};

const AnimatedHeart = ({ id, onCompleteAnimation }: AnimatedHeartProps) => {
    const animatedValueY = useRef(new Animated.Value(0)).current;
    const refOutputX = useRef(getRandomXOutput()).current;
    const refRotate = useRef(getRandomRotateOutput()).current;
    useEffect(() => {
        Animated.timing(animatedValueY, {
            toValue: -WINDOW_HEIGHT,
            duration: 3000,
            useNativeDriver: true
        }).start(() => onCompleteAnimation(id))
    }, [animatedValueY, id])

    return (
        <Animated.Image
            source={require('../../assets/images/heart.png')}
            style={[
                styles.heartIcon,
                {
                    transform: [
                        {
                            translateX: animatedValueY.interpolate({
                                inputRange: [-WINDOW_HEIGHT, 0],
                                outputRange: [refOutputX, 0]
                            })
                        },
                        {
                            translateY: animatedValueY.interpolate({
                                inputRange: [-WINDOW_HEIGHT, -10, 0],
                                outputRange: [-WINDOW_HEIGHT, -50, 0]
                            })
                        },
                        {
                            rotate: animatedValueY.interpolate({
                                inputRange: [-WINDOW_HEIGHT, 0],
                                outputRange: refRotate
                            })
                        },
                        {
                            scale: animatedValueY.interpolate({
                                inputRange: [-50, 0],
                                outputRange: [1, 0.5],
                                extrapolate: 'clamp'
                            })
                        }
                    ],
                    opacity: animatedValueY.interpolate({
                        inputRange: [-WINDOW_HEIGHT * 0.7, 0],
                        outputRange: [0, 1]
                    })
                }
            ]}
        />
    );
};

const styles = StyleSheet.create({
    heartIcon: {
        width: 24,
        height: 24,
        position: 'absolute',
        right: 0,
    },
});

export default AnimatedHeart;
