import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Modal, Image } from 'react-native';
import TitreInput from '../../composants/titreInput';
import { COULEURS } from '../../outils/constantes';
import recetteFormulaireStyle from './style';
import firestore from '@react-native-firebase/firestore';
import { INGREDIENTS } from '../../outils/ingredientsData';
import { CATEGORY_COLORS } from '../../outils/constantes';
import IngredientModal from '../../composants/ingredientModal';

const RecetteFormulaire = () => {
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [preparation, setPreparation] = useState(['']);
  const [modalVisible, setModalVisible] = useState(false);

  // Ajouter un ingrédient
  const addIngredient = (ingredient) => {
    const exists = ingredients.some(i => i.label === ingredient.label);
    if (exists) return;

    setIngredients(prev => [...prev, ingredient]);
  };

  // Retirer un ingrédient
  const removeIngredient = (index) => {
    const updated = [...ingredients];
    updated.splice(index, 1);
    setIngredients(updated);
  };

  // Ajouter une étape
  const addField = (setter, state) => {
    setter([...state, '']);
  };

  // Modifier une étape
  const updateField = (setter, state, value, index) => {
    const updated = [...state];
    updated[index] = value;
    setter(updated);
  };

  // Retirer une étape
  const removeField = (setter, state, index) => {
    if (state.length === 1) return;
    const updated = state.filter((_, i) => i !== index);
    setter(updated);
  };

  // sauvegarde de la recette dans Firebase
  const sauvegarder = async () => {
    try {
      // Nettoyage des tableaux
      const cleanIngredients = ingredients;
      const cleanPreparation = preparation.filter(p => p.trim() !== '');

      // Enregistrement
      await firestore().collection('recettes').add({
        nom,
        description,
        ingredients: cleanIngredients,
        preparation: cleanPreparation,
        createdAt: new Date(),
      });

      console.log('Recette enregistrée');

    } catch (error) {
      console.error('Erreur Firebase:', error);
    }
  };

  return (
    <>
      <ScrollView
        style={{ flex: 1, backgroundColor: COULEURS.secondary }}
        contentContainerStyle={{ padding: 15, paddingBottom: 100 }}
        keyboardShouldPersistTaps="handled">

        <Image
          source={require('../../assets/image_cuisine.jpg')}
          style={{
            width: '100%',
            height: 180,
            borderRadius: 15,
            marginBottom: 15,
          }}
        />

        {/* Nom */}
        <TitreInput
          titre="Nom de la recette"
          placeholder="Ex: Poulet croustillant"
          value={nom}
          onChangeText={setNom}
        />

        {/* Description */}
        <TitreInput
          titre="Description"
          placeholder="Décris ta recette..."
          value={description}
          onChangeText={setDescription}
        />

        {/* Ingrédient */}
        <View style={recetteFormulaireStyle.card}>
          <Text style={recetteFormulaireStyle.sectionTitle}>
            🥕 Ingrédients 🥕
          </Text>

          {/* badges */}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {ingredients.map((ing, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => removeIngredient(index)}
                style={{
                  backgroundColor: CATEGORY_COLORS[ing.category],
                  paddingVertical: 6,
                  paddingHorizontal: 10,
                  borderRadius: 15,
                  margin: 5,
                }}
              >
                <Text style={{ color: 'white' }}>
                  {ing.label} ✕
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={recetteFormulaireStyle.boutonAjouter}
            onPress={() => setModalVisible(true)}
          >
            <Text style={recetteFormulaireStyle.boutonAjouterTexte}>
              + Ajouter un ingrédient
            </Text>
          </TouchableOpacity>
        </View>




        {/* PREPARATION */}
        <View style={recetteFormulaireStyle.card}>
          <Text style={recetteFormulaireStyle.sectionTitle}>
            👨‍🍳 Préparation 👨‍🍳
          </Text>

          {preparation.length === 1 && preparation[0] === '' && (
  <Text style={{ textAlign: 'center', color: '#999', marginTop: 10 }}>
    👇 Ajoute les étapes de préparation 👇
  </Text>
)}

          {preparation.map((step, index) => (
            <View key={index} style={recetteFormulaireStyle.inputRow}>

              <View style={recetteFormulaireStyle.stepBadge}>
                <Text style={recetteFormulaireStyle.stepText}>
                  {index + 1}
                </Text>
              </View>

              <TextInput
                placeholder={`Étape ${index + 1}`}
                value={step}
                onChangeText={(text) =>
                  updateField(setPreparation, preparation, text, index)
                }
                style={[recetteFormulaireStyle.container, { flex: 1 }]}
              />

              {preparation.length > 1 && (
                <TouchableOpacity
                  onPress={() => removeField(setPreparation, preparation, index)}
                  style={recetteFormulaireStyle.deleteButton}
                >
                  <Text style={recetteFormulaireStyle.deleteText}>✕</Text>
                </TouchableOpacity>
              )}

            </View>
          ))}

          <TouchableOpacity
            style={recetteFormulaireStyle.boutonAjouter}
            onPress={() => addField(setPreparation, preparation)}
          >
            <Text style={recetteFormulaireStyle.boutonAjouterTexte}>
              + Ajouter une étape
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={recetteFormulaireStyle.boutonSauvegarder}
          activeOpacity={0.6}
          onPress={sauvegarder}
        >
          <Text style={recetteFormulaireStyle.boutonSauvegarderText}>
            Enregistrer la RE7
          </Text>
        </TouchableOpacity>

      </ScrollView>
      <IngredientModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelect={(ing) => {
          addIngredient(ing);
          setModalVisible(false);
        }}
      />

    </>

  );
};

export default RecetteFormulaire;