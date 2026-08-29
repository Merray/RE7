import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

import LoadingOverlay from '../../composants/loadingOverlay';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

import { CATEGORY_COLORS } from '../../outils/constantes';
import styles from './style';
import { SafeAreaView } from 'react-native-safe-area-context';

const RecetteDetail = ({ route, navigation }) => {

  const { recette } = route.params;
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('ingredients');
  const [createur, setCreateur] = useState(null);
  const utilisateur = auth().currentUser;

  const estCreateur = utilisateur?.uid === recette.createdByUid;


  useEffect(() => {

    navigation.setOptions({
      title: recette.nom,
    });

  }, [navigation, recette]);

  // Récupération du profil du créateur
  useEffect(() => {

    if (!recette.createdByUid) {
      setCreateur(null);
      return;
    }

    const recupererCreateur = async () => {

      try {

        const document = await firestore()
          .collection('users')
          .doc(recette.createdByUid)
          .get();

        if (document.exists) {
          setCreateur(document.data());
        }

      } catch (error) {

        console.log(
          'Erreur récupération créateur :',
          error
        );

      }

    };

    recupererCreateur();

  }, [recette.createdByUid]);

  const getIngredientColor = (ing) => {
    return CATEGORY_COLORS[ing.category] || '#999';
  };

  const supprimerRecette = () => {
    Alert.alert(
      'Supprimer la recette',
      'Es-tu sûr de vouloir supprimer cette recette ? Cette action est irréversible.',
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: supprimerRecetteConfirmee,
        },
      ]
    );
  };

  const supprimerRecetteConfirmee = async () => {

    if (loading) {
      return;
    }

    try {

      setLoading(true);
      // Suppression de l'image dans Firebase Storage
      if (recette.image) {
        const imageReference = storage().refFromURL(recette.image);
        await imageReference.delete();
      }

      // Suppression de la recette dans Firestore
      await firestore()
        .collection('recettes')
        .doc(recette.id)
        .delete();

      // Décrémente le nombre de recettes
      // du créateur
      await firestore()
        .collection('users')
        .doc(recette.createdByUid)
        .update({
          nombreRecettes:
            firestore.FieldValue.increment(-1),
        });

      setLoading(false);

      Alert.alert(
        '🗑️ Recette supprimée',
        'La recette a bien été supprimée.',
        [
          {
            text: 'Elle était naze de toute façon',
            onPress: () => navigation.navigate('dashboard', {
              screen: 'tabs_dashboard',
            }),
          },
        ]
      );

    } catch (error) {

      console.error('Erreur suppression recette :', error);

      setLoading(false);

      Alert.alert(
        'Erreur ❌',
        'Une erreur est survenue lors de la suppression de la recette.'
      );

    }
  };

  return (

    <SafeAreaView
      style={{ flex: 1 }}>


      <View style={styles.container}>

        {/* Image */}
        <Image
          source={{ uri: recette.image }}
          style={styles.image}
        />

        {/* Informations recette */}
        <View style={styles.infoContainer}>

          <Text style={styles.title}>
            {recette.nom}
          </Text>

          <Text style={styles.sub}>
            {recette.description}
          </Text>

          {/* Créateur */}
          {/* Créateur */}
          {recette.createdByUid && (
            <View style={styles.createurContainer}>

              {/* Profil du créateur */}
              <TouchableOpacity
                style={styles.createurProfil}
                activeOpacity={0.7}
                onPress={() =>
                  navigation.navigate('profilUtilisateur', {
                    uid: recette.createdByUid,
                  })
                }
              >

                <Image
                  source={
                    createur?.photoURL
                      ? { uri: createur.photoURL }
                      : require('../../assets/avatar_default.png')
                  }
                  style={styles.createurPhoto}
                />

                <View style={styles.createurInfos}>

                  <Text style={styles.createurLabel}>
                    Créée par
                  </Text>

                  <Text style={styles.createurPseudo}>
                    {createur?.pseudo || 'Utilisateur'}
                  </Text>

                </View>

              </TouchableOpacity>

              {/* Boutons du créateur */}
              {estCreateur && (
                <View style={styles.actionsContainer}>

                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() =>
                      navigation.navigate('recetteFormulaire', {
                        recette,
                      })
                    }
                  >
                    <Text style={styles.actionButtonText}>
                      ✏️
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.actionButton, styles.deleteButton]}
                    onPress={supprimerRecette}
                  >
                    <Text style={styles.actionButtonText}>
                      🗑️
                    </Text>
                  </TouchableOpacity>

                </View>
              )}

            </View>
          )}

        </View>

        {/* Onglets */}
        <View style={styles.tabContainer}>

          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'ingredients' && styles.activeTab
            ]}
            onPress={() => setActiveTab('ingredients')}
          >
            <Text style={styles.tabText}>
              Ingrédients
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'preparation' && styles.activeTab
            ]}
            onPress={() => setActiveTab('preparation')}
          >
            <Text style={styles.tabText}>
              Préparation
            </Text>
          </TouchableOpacity>

        </View>

        {/* Contenu dynamique */}
        <View style={styles.dynamicContainer}>

          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >

            {activeTab === 'ingredients' ? (

              <View style={styles.ingredientsList}>

                {recette.ingredients.map((ing, i) => (

                  <View
                    key={i}
                    style={styles.ingredientRow}
                  >

                    {/* Quantité */}
                    {ing.quantite ? (
                      <View
                        style={[
                          styles.quantiteBadge,
                          {
                            backgroundColor: getIngredientColor(ing),
                          },
                        ]}
                      >
                        <Text style={styles.quantiteText}>
                          {ing.quantite} {ing.unite || ''}
                        </Text>
                      </View>
                    ) : null}

                    {/* Nom */}
                    <Text style={styles.ingredientName}>
                      {ing.label}
                    </Text>

                  </View>

                ))}

              </View>

            ) : (

              <View style={styles.preparationList}>

                {recette.preparation.map((step, i) => (

                  <View
                    key={i}
                    style={styles.preparationStep}
                  >

                    {/* Numéro de l'étape */}
                    <View style={styles.stepBadge}>
                      <Text style={styles.stepNumber}>
                        {i + 1}
                      </Text>
                    </View>

                    {/* Texte */}
                    <Text style={styles.preparationText}>
                      {step}
                    </Text>

                  </View>

                ))}

              </View>

            )}

          </ScrollView>

        </View>


        <LoadingOverlay
          visible={loading}
          message="Suppression de la recette..."
        />

      </View>

    </SafeAreaView >
  );
};

export default RecetteDetail;