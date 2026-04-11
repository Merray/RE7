import { View, Text, Image } from 'react-native'
import React from 'react'
import headerStyles from './style'

const HeaderComposant = () => {
    return (
        <View style={headerStyles.header}>
            <Text style={headerStyles.profilName}>Merray</Text>
            <Image source={require('./../../assets/mrmerray.jpg')} style={headerStyles.profilImage}></Image>
        </View>
    )
}

export default HeaderComposant