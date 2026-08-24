import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import recetteStyle from './style';
import RecetteComposant from '../../composants/recetteComposant';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COULEURS } from '../../outils/constantes';

const Recettes = ({ navigation }) => {

  const [recettes, setRecettes] = useState([]);

  const [recherche, setRecherche] = useState('');

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

  const recettesFiltrees = recettes.filter(recette =>
    recette.nom
      ?.toLowerCase()
      .includes(recherche.toLowerCase())
  );

  return (
    <View style={{ flex: 1, backgroundColor: COULEURS.secondary }}>

      <View style={recetteStyle.searchContainer}>

        <MaterialCommunityIcons
          name="magnify"
          size={24}
          color="#777"
        />

        <TextInput
          style={recetteStyle.searchInput}
          placeholder="Rechercher une recette..."
          value={recherche}
          onChangeText={setRecherche}
          placeholderTextColor="#999"
        />

        {recherche.length > 0 && (
          <TouchableOpacity
            onPress={() => setRecherche('')}
          >
            <MaterialCommunityIcons
              name="close-circle"
              size={22}
              color="#777"
            />
          </TouchableOpacity>
        )}

      </View>
      <FlatList
        data={recettesFiltrees}
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