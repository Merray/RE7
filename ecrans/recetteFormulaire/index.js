import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Modal, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import TitreInput from '../../composants/titreInput';
import { COULEURS } from '../../outils/constantes';
import recetteFormulaireStyle from './style';
import firestore from '@react-native-firebase/firestore';
import { INGREDIENTS } from '../../outils/ingredientsData';
import { CATEGORY_COLORS } from '../../outils/constantes';
import IngredientModal from '../../composants/ingredientModal';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import { Alert } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const RecetteFormulaire = ({ navigation, route }) => {
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [preparation, setPreparation] = useState(['']);
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const recetteAModifier = route?.params?.recette;

  const utilisateur = auth().currentUser;

  useEffect(() => {

    navigation.setOptions({
      title: recetteAModifier
        ? 'Modifier une recette'
        : 'Ajouter une recette',
    });

    if (!recetteAModifier) {
      return;
    }

    setNom(recetteAModifier.nom);
    setDescription(recetteAModifier.description);
    setIngredients(recetteAModifier.ingredients);
    setPreparation(recetteAModifier.preparation);
    setImage(recetteAModifier.image);

  }, [recetteAModifier]);

  // Validation des champs non vides
  const validerFormulaire = () => {
    if (!image) {
      Alert.alert("Erreur", "Ajoute une photo 📸");
      return false;
    }

    if (!nom.trim()) {
      Alert.alert("Erreur", "Le nom est obligatoire");
      return false;
    }

    if (!description.trim()) {
      Alert.alert("Erreur", "La description est obligatoire");
      return false;
    }

    if (ingredients.length === 0) {
      Alert.alert("Erreur", "Ajoute au moins un ingrédient");
      return false;
    }

    const cleanPreparation = preparation.filter(p => p.trim() !== '');

    if (cleanPreparation.length === 0) {
      Alert.alert("Erreur", "Ajoute au moins une étape");
      return false;
    }

    return true;
  };

  //Upload de l'image sur firebase storage
  const uploadImage = async (uri) => {
    if (!uri) return null;

    try {
      const filename = uri.substring(uri.lastIndexOf('/') + 1);

      const reference = storage().ref(`recettes/${Date.now()}_${filename}`);

      await reference.putFile(uri);

      const url = await reference.getDownloadURL();

      return url;

    } catch (error) {
      console.error('Erreur upload image:', error);
      return null;
    }
  };

  // Choix de la photo de la recette
  const choisirImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.7,
        maxWidth: 1000,
        maxHeight: 1000,
      },
      (response) => {
        if (response.didCancel) return;
        if (response.errorCode) {
          console.error(response.errorMessage);
          return;
        }

        const uri = response.assets[0].uri;
        setImage(uri);
      }
    );
  };

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

    if (loading) return;
    if (!validerFormulaire()) return;

    if (!utilisateur) {
      Alert.alert(
        "Connexion requise",
        "Tu dois être connecté pour créer une RE7."
      );
      return;
    }

    try {
      setLoading(true);
      const cleanIngredients = ingredients;
      const cleanPreparation = preparation.filter(p => p.trim() !== '');


      let imageUrl = recetteAModifier?.image || null;

      if (image && !image.startsWith('https://')) {
        imageUrl = await uploadImage(image);
      }

      if (recetteAModifier) {
        await firestore()
          .collection('recettes')
          .doc(recetteAModifier.id)
          .update({
            nom,
            description,
            ingredients: cleanIngredients,
            preparation: cleanPreparation,
            image: imageUrl,
          });
      } else {
        await firestore()
          .collection('recettes')
          .add({
            nom,
            description,
            ingredients: cleanIngredients,
            preparation: cleanPreparation,
            image: imageUrl,
            createdAt: new Date(),
            createdByUid: utilisateur.uid,
          });
      }

      setLoading(false);

      console.log('Recette enregistrée');
      Alert.alert(
        "🎉 Bravo 🎉",
        "Ta recette a bien été enregistrée !",
        [
          {
            text: "Retour au Dashboard",
            onPress: () => navigation.navigate('dashboard', {
              screen: 'tabs_dashboard',
            })
          }
        ]
      );

    } catch (error) {
      console.error('Erreur Firebase:', error);

      setLoading(false);
      Alert.alert(
        "Erreur ❌",
        "Une erreur est survenue lors de l'enregistrement"
      );
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

        <View style={recetteFormulaireStyle.card}>
          <Text style={recetteFormulaireStyle.sectionTitle}>
            📸 Photo de la recette
          </Text>

          <TouchableOpacity
            onPress={choisirImage}
            style={recetteFormulaireStyle.imagePicker}
          >
            {image ? (
              <Image
                source={{ uri: image }}
                style={recetteFormulaireStyle.imagePreview}
              />
            ) : (
              <Text style={{ color: '#888' }}>
                Ajouter une photo
              </Text>
            )}
          </TouchableOpacity>
        </View>

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
          style={[recetteFormulaireStyle.boutonSauvegarder,
          loading && { opacity: 0.5 }]}
          disabled={loading}
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
      {loading && (
        <View style={recetteFormulaireStyle.loadingOverlay}>
          <ActivityIndicator size="large" color={COULEURS.blanc} />
          <Text style={recetteFormulaireStyle.loadingText}>
            Enregistrement en cours...
          </Text>
        </View>
      )}

    </>

  );
};

export default RecetteFormulaire;