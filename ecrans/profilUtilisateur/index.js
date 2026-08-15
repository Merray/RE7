import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';

import styles from './style';

const ProfilUtilisateur = ({ route, navigation }) => {

  const { uid } = route.params;

  const [profil, setProfil] = useState(null);
  const [chargement, setChargement] = useState(true);

  useEffect(() => {

    const recupererProfil = async () => {

      try {

        const document = await firestore()
          .collection('users')
          .doc(uid)
          .get();

        if (document.exists) {

          const data = document.data();

          setProfil(data);

          navigation.setOptions({
            title: data.pseudo || 'Profil',
          });
        }

      } catch (error) {

        console.log(
          'Erreur récupération profil utilisateur :',
          error
        );

      } finally {

        setChargement(false);

      }

    };

    recupererProfil();

  }, [uid, navigation]);

  if (chargement) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!profil) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Impossible de trouver ce profil.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >

      <Text style={styles.titre}>
        Profil de {profil.pseudo || 'Utilisateur'}
      </Text>

      {/* Photo */}
      <View style={styles.photoContainer}>

        <Image
          source={
            profil.photoURL
              ? { uri: profil.photoURL }
              : require('../../assets/avatar_default.png')
          }
          style={styles.photoProfil}
        />

      </View>

      {/* Pseudo */}
      <View style={styles.card}>

        <Text style={styles.label}>
          Pseudo
        </Text>

        <Text style={styles.valeur}>
          {profil.pseudo || 'Utilisateur'}
        </Text>

      </View>

      {/* Accroche */}
      <View style={styles.card}>

        <Text style={styles.label}>
          Phrase d'accroche
        </Text>

        <Text style={styles.accroche}>
          {profil.accroche || 'Aucune phrase d’accroche pour le moment.'}
        </Text>

      </View>

      {/* Recettes */}
      <View style={styles.card}>

        <Text style={styles.label}>
          Recettes
        </Text>

        <Text style={styles.nombreRecettes}>
          🍳 {profil.nombreRecettes ?? 0}
        </Text>

      </View>

    </ScrollView>
  );
};

export default ProfilUtilisateur;