import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { images } from '../../fakeData/fakeImages';
import { COULEURS, INGREDIENT_CATEGORIES, CATEGORY_COLORS } from '../../outils/constantes';
import { mapRecetteForNavigation } from '../../outils/recetteMapper';
import styles from './style';

const RecetteDetail = ({ route, navigation }) => {
  const { recette } = route.params;
  const [activeTab, setActiveTab] = useState('ingredients');

  useEffect(() => {
    navigation.setOptions({ title: recette.mainText });
  }, [navigation, recette]);

  const getIngredientColor = (ing) => {
    const ingLower = ing.toLowerCase();
    if (INGREDIENT_CATEGORIES.proteines.some(p => ingLower.includes(p.toLowerCase()))) return CATEGORY_COLORS.proteines;
    if (INGREDIENT_CATEGORIES.feculents.some(f => ingLower.includes(f.toLowerCase()))) return CATEGORY_COLORS.feculents;
    if (INGREDIENT_CATEGORIES.legumes.some(l => ingLower.includes(l.toLowerCase()))) return CATEGORY_COLORS.legumes;
    if (INGREDIENT_CATEGORIES.epices?.some(e => ingLower.includes(e.toLowerCase()))) return CATEGORY_COLORS.epices;
    return '#999';
  };

  return (
    <View style={styles.container}>
      {/* Image + infos */}
      <Image source={images[recette.img]} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{recette.mainText}</Text>
        <Text style={styles.sub}>{recette.subText}</Text>
        <Text style={styles.info}>⏱ {recette.tempsPreparation} min • {recette.difficulte}</Text>
      </View>

      {/* Onglets */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'ingredients' && styles.activeTab]}
          onPress={() => setActiveTab('ingredients')}
        >
          <Text style={styles.tabText}>Ingrédients</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'preparation' && styles.activeTab]}
          onPress={() => setActiveTab('preparation')}
        >
          <Text style={styles.tabText}>Préparation</Text>
        </TouchableOpacity>
      </View>

      {/* Contenu dynamique */}
      <View style={styles.dynamicContainer}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {activeTab === 'ingredients' ? (
            <View style={styles.ingredientsList}>
              {recette.ingredients.map((ing, i) => (
                <Text
                  key={i}
                  style={[styles.ingredientBadge, { backgroundColor: getIngredientColor(ing) }]}
                >
                  {ing}
                </Text>
              ))}
            </View>
          ) : (
            <View style={styles.preparationList}>
              {recette.preparation.map((step, i) => (
                <View key={i} style={styles.preparationStep}>
                  <Text style={styles.stepNumber}>Étape {i + 1} :</Text>
                  <Text style={styles.preparationText}>{step}</Text>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default RecetteDetail;
