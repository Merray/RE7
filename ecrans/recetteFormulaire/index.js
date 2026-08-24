import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';

import {
  KeyboardAwareScrollView,
} from 'react-native-keyboard-aware-scroll-view';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import { launchImageLibrary } from 'react-native-image-picker';

import TitreInput from '../../composants/titreInput';
import IngredientModal from '../../composants/ingredientModal';
import UniteModal from '../../composants/uniteModal';

import {
  COULEURS,
  CATEGORY_COLORS,
} from '../../outils/constantes';

import recetteFormulaireStyle from './style';

import LoadingOverlay from '../../composants/loadingOverlay';


const RecetteFormulaire = ({ navigation, route }) => {

  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [preparation, setPreparation] = useState(['']);

  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [uniteModalVisible, setUniteModalVisible] = useState(false);
  const [ingredientUniteIndex, setIngredientUniteIndex] = useState(null);

  const recetteAModifier = route?.params?.recette;

  const utilisateur = auth().currentUser;


  // Configuration du formulaire
  // + récupération des données en cas de modification
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

  const modifierIngredient = (index, propriete, valeur) => {

    setIngredients(prev => {

      const updated = [...prev];

      updated[index] = {
        ...updated[index],
        [propriete]: valeur,
      };

      return updated;

    });

  };


  // Validation des champs non vides
  const validerFormulaire = () => {

    if (!image) {
      Alert.alert(
        'Erreur',
        'Ajoute une photo 📸'
      );

      return false;
    }

    if (!nom.trim()) {
      Alert.alert(
        'Erreur',
        'Le nom est obligatoire'
      );

      return false;
    }

    if (!description.trim()) {
      Alert.alert(
        'Erreur',
        'La description est obligatoire'
      );

      return false;
    }

    if (ingredients.length === 0) {
      Alert.alert(
        'Erreur',
        'Ajoute au moins un ingrédient'
      );

      return false;
    }

    const cleanPreparation = preparation.filter(
      p => p.trim() !== ''
    );

    if (cleanPreparation.length === 0) {
      Alert.alert(
        'Erreur',
        'Ajoute au moins une étape'
      );

      return false;
    }

    return true;
  };


  // Upload de l'image sur Firebase Storage
  const uploadImage = async (uri) => {

    if (!uri) {
      return null;
    }

    try {

      const filename =
        uri.substring(uri.lastIndexOf('/') + 1);

      const reference = storage()
        .ref(`recettes/${Date.now()}_${filename}`);

      await reference.putFile(uri);

      const url = await reference.getDownloadURL();

      return url;

    } catch (error) {

      console.error(
        'Erreur upload image:',
        error
      );

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
      response => {

        if (response.didCancel) {
          return;
        }

        if (response.errorCode) {

          console.error(
            response.errorMessage
          );

          return;
        }

        const uri = response.assets[0].uri;

        setImage(uri);

      }
    );
  };


  // Ajouter plusieurs ingrédients
  const addIngredients = (newIngredients) => {

    setIngredients(prev => {

      const existingLabels = new Set(
        prev.map(ingredient => ingredient.label)
      );

      const uniqueNewIngredients = newIngredients
        .filter(
          ingredient =>
            !existingLabels.has(ingredient.label)
        )
        .map(ingredient => ({
          ...ingredient,
          quantite: '',
          unite: 'g',
        }));



      return [
        ...prev,
        ...uniqueNewIngredients,
      ];

    });

  };


  // Retirer un ingrédient
  const removeIngredient = (index) => {

    const updated = [...ingredients];

    updated.splice(index, 1);

    setIngredients(updated);

  };


  // Ajouter une étape
  const addField = (setter, state) => {

    setter([
      ...state,
      '',
    ]);

  };


  // Modifier une étape
  const updateField = (
    setter,
    state,
    value,
    index
  ) => {

    const updated = [...state];

    updated[index] = value;

    setter(updated);

  };


  // Retirer une étape
  const removeField = (
    setter,
    state,
    index
  ) => {

    if (state.length === 1) {
      return;
    }

    const updated = state.filter(
      (_, i) => i !== index
    );

    setter(updated);

  };


  // Sauvegarde de la recette dans Firebase
  const sauvegarder = async () => {

    if (loading) {
      return;
    }

    if (!validerFormulaire()) {
      return;
    }

    if (!utilisateur) {

      Alert.alert(
        'Connexion requise',
        'Tu dois être connecté pour créer une RE7.'
      );

      return;
    }

    try {

      setLoading(true);

      const cleanIngredients = ingredients;

      const cleanPreparation =
        preparation.filter(
          p => p.trim() !== ''
        );


      // On conserve l'image existante
      // si aucune nouvelle image n'est sélectionnée
      let imageUrl =
        recetteAModifier?.image || null;


      // Nouvelle image uniquement si l'URI
      // n'est pas déjà une URL Firebase
      if (
        image &&
        !image.startsWith('https://')
      ) {

        imageUrl = await uploadImage(image);

      }


      // Modification
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

      }

      // Création
      else {

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

        await firestore()
          .collection('users')
          .doc(utilisateur.uid)
          .update({
            nombreRecettes:
              firestore.FieldValue.increment(1),
          });

      }


      setLoading(false);

      console.log(
        'Recette enregistrée'
      );

      Alert.alert(
        '🎉 Bravo 🎉',
        'Ta recette a bien été enregistrée !',
        [
          {
            text: 'Retour au Dashboard',
            onPress: () =>
              navigation.navigate(
                'dashboard',
                {
                  screen: 'tabs_dashboard',
                }
              ),
          },
        ]
      );

    } catch (error) {

      console.error(
        'Erreur Firebase:',
        error
      );

      setLoading(false);

      Alert.alert(
        'Erreur ❌',
        "Une erreur est survenue lors de l'enregistrement"
      );

    }

  };


  return (
    <>
      <KeyboardAwareScrollView
        style={{
          flex: 1,
          backgroundColor: COULEURS.secondary,
        }}
        contentContainerStyle={{
          padding: 15,
          paddingBottom: 150,
        }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        extraHeight={150}
        extraScrollHeight={50}
      >

        {/* Image cuisine */}
        <Image
          source={require('../../assets/image_cuisine.jpg')}
          style={{
            width: '100%',
            height: 180,
            borderRadius: 15,
            marginBottom: 15,
          }}
        />


        {/* PHOTO */}
        <View style={recetteFormulaireStyle.card}>

          <Text
            style={recetteFormulaireStyle.sectionTitle}
          >
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


        {/* NOM */}
        <TitreInput
          titre="Nom de la recette"
          placeholder="Ex: Poulet croustillant"
          value={nom}
          onChangeText={setNom}
        />


        {/* DESCRIPTION */}
        <TitreInput
          titre="Description"
          placeholder="Décris ta recette..."
          value={description}
          onChangeText={setDescription}
        />


        {/* INGREDIENTS */}
        <View style={recetteFormulaireStyle.card}>

          <Text
            style={recetteFormulaireStyle.sectionTitle}
          >
            🥕 Ingrédients 🥕
          </Text>


          {/* Badges */}
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}
          >

            {ingredients.map((ingredient, index) => (

              <TouchableOpacity
                key={index}
                onPress={() =>
                  removeIngredient(index)
                }
                style={{
                  backgroundColor:
                    CATEGORY_COLORS[
                    ingredient.category
                    ],

                  paddingVertical: 6,
                  paddingHorizontal: 10,

                  borderRadius: 15,
                  margin: 5,
                }}
              >

                <Text style={{ color: 'white' }}>
                  {ingredient.label} ✕
                </Text>

              </TouchableOpacity>

            ))}

          </View>


          {/* Ajouter des ingrédients */}
          <TouchableOpacity
            style={recetteFormulaireStyle.boutonAjouter}
            onPress={() =>
              setModalVisible(true)
            }
          >

            <Text
              style={
                recetteFormulaireStyle.boutonAjouterTexte
              }
            >
              + Ajouter des ingrédients
            </Text>

          </TouchableOpacity>

        </View>

        {/* QUANTITÉS */}
        {ingredients.length > 0 && (
          <View style={recetteFormulaireStyle.card}>

            <Text style={recetteFormulaireStyle.sectionTitle}>
              📏 Quantités
            </Text>

            {ingredients.map((ingredient, index) => (

              <View
                key={ingredient.label}
                style={recetteFormulaireStyle.quantiteRow}
              >

                {/* Nom de l'ingrédient */}
                <Text style={recetteFormulaireStyle.quantiteIngredient}>
                  {ingredient.label}
                </Text>

                {/* Quantité */}
                <TextInput
                  value={ingredient.quantite}
                  onChangeText={(value) =>
                    modifierIngredient(index, 'quantite', value)
                  }
                  placeholder="0"
                  keyboardType="numeric"
                  style={recetteFormulaireStyle.quantiteInput}
                />

                {/* Unité */}
                <TouchableOpacity
                  style={recetteFormulaireStyle.uniteButton}
                  onPress={() => {
                    setIngredientUniteIndex(index);
                    setUniteModalVisible(true);
                  }}
                >
                  <Text style={recetteFormulaireStyle.uniteButtonText}>
                    {ingredient.unite}
                  </Text>

                  <Text style={recetteFormulaireStyle.uniteArrow}>
                    ▼
                  </Text>
                </TouchableOpacity>

              </View>

            ))}

          </View>
        )}

        {/* PREPARATION */}
        <View style={recetteFormulaireStyle.card}>

          <Text
            style={recetteFormulaireStyle.sectionTitle}
          >
            👨‍🍳 Préparation 👨‍🍳
          </Text>


          {preparation.length === 1 &&
            preparation[0] === '' && (

              <Text
                style={{
                  textAlign: 'center',
                  color: '#999',
                  marginTop: 10,
                }}
              >
                👇 Ajoute les étapes de préparation 👇
              </Text>

            )}


          {preparation.map((step, index) => (

            <View
              key={index}
              style={
                recetteFormulaireStyle.inputRow
              }
            >

              <View
                style={
                  recetteFormulaireStyle.stepBadge
                }
              >

                <Text
                  style={
                    recetteFormulaireStyle.stepText
                  }
                >
                  {index + 1}
                </Text>

              </View>


              <TextInput
                placeholder={`Étape ${index + 1}`}
                value={step}
                onChangeText={text =>
                  updateField(
                    setPreparation,
                    preparation,
                    text,
                    index
                  )
                }
                style={[
                  recetteFormulaireStyle.container,
                  {
                    flex: 1,
                  },
                ]}
              />


              {preparation.length > 1 && (

                <TouchableOpacity
                  onPress={() =>
                    removeField(
                      setPreparation,
                      preparation,
                      index
                    )
                  }
                  style={
                    recetteFormulaireStyle.deleteButton
                  }
                >

                  <Text
                    style={
                      recetteFormulaireStyle.deleteText
                    }
                  >
                    ✕
                  </Text>

                </TouchableOpacity>

              )}

            </View>

          ))}


          <TouchableOpacity
            style={
              recetteFormulaireStyle.boutonAjouter
            }
            onPress={() =>
              addField(
                setPreparation,
                preparation
              )
            }
          >

            <Text
              style={
                recetteFormulaireStyle.boutonAjouterTexte
              }
            >
              + Ajouter une étape
            </Text>

          </TouchableOpacity>

        </View>


        {/* SAUVEGARDE */}
        <TouchableOpacity
          style={[
            recetteFormulaireStyle.boutonSauvegarder,
            loading && {
              opacity: 0.5,
            },
          ]}
          disabled={loading}
          activeOpacity={0.6}
          onPress={sauvegarder}
        >

          <Text
            style={
              recetteFormulaireStyle.boutonSauvegarderText
            }
          >
            Enregistrer la RE7
          </Text>

        </TouchableOpacity>

      </KeyboardAwareScrollView>


      {/* MODAL INGREDIENTS */}
      < IngredientModal
        visible={modalVisible}
        onClose={() =>
          setModalVisible(false)
        }
        onSelect={addIngredients}
        selectedIngredients={ingredients}
      />

      <UniteModal
        visible={uniteModalVisible}
        onClose={() => setUniteModalVisible(false)}
        onSelect={(unite) => {

          modifierIngredient(
            ingredientUniteIndex,
            'unite',
            unite
          );

          setUniteModalVisible(false);

        }}
      />


      {/* LOADING */}
      <LoadingOverlay
        visible={loading}
        message="Enregistrement en cours..."
      />

    </>
  );
};

export default RecetteFormulaire;