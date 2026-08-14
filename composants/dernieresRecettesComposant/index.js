import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import derniereRecetteStyle from './style';

const DerniereRecetteComposant = ({ item }) => {

    const navigation = useNavigation();

    const ouvrirRecette = () => {
        navigation.navigate('recetteDetail', {
            recette: item,
        });
    };

    return (
        <TouchableOpacity
            style={derniereRecetteStyle.horizontalFlatListItem}
            onPress={ouvrirRecette}
        >
            <Image
                style={derniereRecetteStyle.imgRecette}
                source={{ uri: item.image }}
            />

            <Text style={derniereRecetteStyle.mainRecetteText}>
                {item.nom}
            </Text>

            <Text style={derniereRecetteStyle.subRecetteText}>
                {item.description}
            </Text>
        </TouchableOpacity>
    );
};

export default DerniereRecetteComposant;