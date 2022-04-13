import React, { useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from "react-native";

const width = Dimensions.get('screen').width
export default function DoubleTab() {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity style={{ width: width - 100, height: 60, backgroundColor: '#ffffff', borderRadius: 8, padding: 5 }}>
            <View>
                <Text>Nội dung tin nhắn...</Text>
            </View>
            <View style={{ width: 30, height: 30, borderWidth: 1, borderRadius: 25, alignSelf: 'flex-end', borderColor: '#cbcbcb' }} >

            </View>
        </TouchableOpacity>

    </View>
}