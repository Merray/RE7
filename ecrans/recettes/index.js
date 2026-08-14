import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import recetteStyle from './style';
import RecetteComposant from '../../composants/recetteComposant';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Recettes = ({ navigation }) => {

  const [recettes, setRecettes] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('recettes')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {

        const data = [];

        querySnapshot.forEach(doc => {
          data.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setRecettes(data);
      });

    return () => unsubscribe();
  }, []);

  return (
    <View style={{ flex: 1 }}>

      <FlatList
        data={recettes}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        style={recetteStyle.verticalFLatlist}
        renderItem={({ item }) => (
          <RecetteComposant
            item={item}
            navigation={navigation}
          />
        )}
      />

      <TouchableOpacity
        style={recetteStyle.boutonAjouter}
        activeOpacity={0.6}
        onPress={() => navigation.navigate('recetteFormulaire')}
      >
        <MaterialCommunityIcons
          name="plus"
          size={35}
          color="white"
        />
      </TouchableOpacity>

    </View>
  );
};

export default Recettes;