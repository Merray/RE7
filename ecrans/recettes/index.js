import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import recetteStyle from './style';
import RecetteComposant from '../../composants/recetteComposant';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FiltreModal from '../../composants/filtreModal';
import analyserTagsRecette from '../../outils/tagsRecette';
import { COULEURS } from '../../outils/constantes';

const Recettes = ({ navigation }) => {

  const [recettes, setRecettes] = useState([]);

  const [recherche, setRecherche] = useState('');

  const [filtreModalVisible, setFiltreModalVisible] =
    useState(false);
  const [filtreVegetarien, setFiltreVegetarien] =
    useState(false);
  const [filtreVegan, setFiltreVegan] =
    useState(false);

  const [filtreProtMaxing, setFiltreProtMaxing] =
    useState(false);

  const nombreFiltresActifs =
    [
      filtreVegetarien,
      filtreVegan,
      filtreProtMaxing,
    ].filter(Boolean).length;

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

    // Recherche dans le nom
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

    // La recherche correspond au nom
    // OU à au moins un ingrédient
    const correspondRecherche =
      nomCorrespond || ingredientCorrespond;


    // Par défaut, la recette est acceptée
    let correspondFiltre = true;


    // Analyse automatique des tags
    const tagsRecette = analyserTagsRecette(
      recette.ingredients
    );


    // 🥦 Filtre végétarien
    if (filtreVegetarien) {

      correspondFiltre =
        correspondFiltre &&
        tagsRecette.vegetarien;

    }

    // 🌱 Filtre vegan
    if (filtreVegan) {

      correspondFiltre =
        correspondFiltre &&
        tagsRecette.vegan;

    }


    // 💪 Filtre ProtMaxing
    if (filtreProtMaxing) {

      correspondFiltre =
        correspondFiltre &&
        tagsRecette.protMaxing;

    }


    // La recette doit respecter
    // la recherche ET le filtre
    return (
      correspondRecherche &&
      correspondFiltre
    );

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

          {nombreFiltresActifs > 0 && (

            <View style={recetteStyle.filterBadge}>

              <Text style={recetteStyle.filterBadgeText}>
                {nombreFiltresActifs}
              </Text>

            </View>

          )}

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

        filtreVegan={filtreVegan}
        setFiltreVegan={setFiltreVegan}

        filtreProtMaxing={filtreProtMaxing}
        setFiltreProtMaxing={setFiltreProtMaxing}
      />

    </View>
  );
};

export default Recettes;