import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import recetteStyle from './style';
import RecetteComposant from '../../composants/recetteComposant';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FiltreModal from '../../composants/filtreModal';
import { COULEURS } from '../../outils/constantes';

const Recettes = ({ navigation }) => {

  const [recettes, setRecettes] = useState([]);

  const [recherche, setRecherche] = useState('');

  const [filtreModalVisible, setFiltreModalVisible] =
    useState(false);
  const [filtreVegetarien, setFiltreVegetarien] =
    useState(false);

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

  const recettesFiltrees = recettes.filter(recette => {

    const rechercheNormalisee =
      recherche.toLowerCase();

    // Recherche dans le nom de la recette
    const nomCorrespond =
      recette.nom
        ?.toLowerCase()
        .includes(rechercheNormalisee);

    // Recherche dans les ingrédients
    const ingredientCorrespond =
      recette.ingredients?.some(ingredient =>
        ingredient.label
          ?.toLowerCase()
          .includes(rechercheNormalisee)
      );

    // La recette est conservée si le nom OU
    // au moins un ingrédient correspond
    return nomCorrespond || ingredientCorrespond;

  });

  return (
    <View style={{ flex: 1, backgroundColor: COULEURS.secondary }}>

      <View style={recetteStyle.searchRow}>

        {/* BARRE DE RECHERCHE */}
        <View style={recetteStyle.searchContainer}>

          <MaterialCommunityIcons
            name="magnify"
            size={24}
            color="#777"
          />

          <TextInput
            style={recetteStyle.searchInput}
            placeholder="Rechercher une recette"
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

        {/* BOUTON FILTRES */}
        <TouchableOpacity
          style={recetteStyle.filterButton}
          onPress={() => setFiltreModalVisible(true)}
        >
          <MaterialCommunityIcons
            name="filter-variant"
            size={26}
            color="#777"
          />
        </TouchableOpacity>

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

      <FiltreModal
        visible={filtreModalVisible}
        onClose={() => setFiltreModalVisible(false)}
        filtreVegetarien={filtreVegetarien}
        setFiltreVegetarien={setFiltreVegetarien}
      />

    </View>
  );
};

export default Recettes;