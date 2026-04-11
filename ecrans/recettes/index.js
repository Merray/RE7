import { View, Text, FlatList, ScrollView } from 'react-native'
import React from 'react'
import { FakeRecettes } from '../../fakeData/fakeRecettes'
import recetteStyle from './style'
import RecetteComposant from '../../composants/recetteComposant'
import HeaderComposant from '../../composants/headerComposant';

const Recettes = ({ navigation }) => {
  return (
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
  )
}

export default Recettes