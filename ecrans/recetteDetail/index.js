import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { CATEGORY_COLORS } from '../../outils/constantes';
import styles from './style';

const RecetteDetail = ({ route, navigation }) => {

  const { recette } = route.params;

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

  return (
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
                  onPress={() => console.log('Modifier la recette')}
                >
                  <Text style={styles.actionButtonText}>
                    ✏️
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.actionButton, styles.deleteButton]}
                  onPress={() => console.log('Supprimer la recette')}
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

        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

          {activeTab === 'ingredients' ? (

            <View style={styles.ingredientsList}>

              {recette.ingredients.map((ing, i) => (
                <Text
                  key={i}
                  style={[
                    styles.ingredientBadge,
                    {
                      backgroundColor: getIngredientColor(ing)
                    }
                  ]}
                >
                  {ing.label}
                </Text>
              ))}

            </View>

          ) : (

            <View style={styles.preparationList}>

              {recette.preparation.map((step, i) => (
                <View
                  key={i}
                  style={styles.preparationStep}
                >

                  <Text style={styles.stepNumber}>
                    Étape {i + 1} :
                  </Text>

                  <Text style={styles.preparationText}>
                    {step}
                  </Text>

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