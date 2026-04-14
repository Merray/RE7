import { View, Text, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { FakeRecettes } from '../../fakeData/fakeRecettes'
import recetteStyle from './style'
import RecetteComposant from '../../composants/recetteComposant'
import HeaderComposant from '../../composants/headerComposant';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Recettes = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={FakeRecettes}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        style={recetteStyle.verticalFLatlist}
        renderItem={({ item }) => {
          return (
            <RecetteComposant item={item} navigation={navigation} />
          )
        }} />

        /* Bouton pour ajouter */
        <TouchableOpacity
        style={recetteStyle.fab}
        activeOpacity={0.8} // Pour effet de pression
        onPress={() => navigation.navigate('recetteFormulaire')}
      >
        <MaterialCommunityIcons name="plus" size={35} color="white" />
      </TouchableOpacity>
    </View>
  )
}

export default Recettes