import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import derniereRecetteStyle from './style'
import { images } from '../../fakeData/fakeImages'

const DerniereRecetteComposant = ({item}) => {
    return (
        <TouchableOpacity style={derniereRecetteStyle.horizontalFlatListItem}>
            <Image style={derniereRecetteStyle.imgRecette} source={images[item.img]} />
            <Text style={derniereRecetteStyle.mainRecetteText}>{item.mainText}</Text>
            <Text style={derniereRecetteStyle.subRecetteText}>{item.subText}</Text>
        </TouchableOpacity>
    )
}

export default DerniereRecetteComposant