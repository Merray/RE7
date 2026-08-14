import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Image, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import styles from './style';

const Profil = ({ navigation }) => {

  const [utilisateur, setUtilisateur] = useState(null);
  const [profil, setProfil] = useState(null);
  const [chargement, setChargement] = useState(true);

  // Écoute les changements de connexion
  useEffect(() => {

    const unsubscribe = auth().onAuthStateChanged(user => {

      setUtilisateur(user);
      setChargement(false);

    });

    return unsubscribe;

  }, []);

  // Récupération du profil Firestore
  // À chaque fois que la page Profil reprend le focus
  useFocusEffect(
    useCallback(() => {

      if (!utilisateur) {
        setProfil(null);
        return;
      }

      const recupererProfil = async () => {

        try {

          const document = await firestore()
            .collection('users')
            .doc(utilisateur.uid)
            .get();

          if (document.exists) {
            setProfil(document.data());
          }

        } catch (error) {

          console.log('Erreur récupération profil :', error);

        }

      };

      recupererProfil();

    }, [utilisateur])
  );

  const deconnexion = async () => {

    try {

      await auth().signOut();

    } catch (error) {

      console.log('Erreur déconnexion :', error);

    }

  };

  if (chargement) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Utilisateur non connecté
  if (!utilisateur) {
    return (
      <View style={styles.container}>

        <Text style={styles.titre}>
          Profil
        </Text>

        <Text style={styles.message}>
          Vous devez être connecté pour accéder à votre profil.
        </Text>

        <TouchableOpacity
          style={styles.boutonConnexion}
          onPress={() => navigation.navigate('connexion')}
          activeOpacity={0.7}
        >
          <Text style={styles.boutonTexte}>
            Se connecter
          </Text>
        </TouchableOpacity>

      </View>
    );
  }

  // Utilisateur connecté
  return (
    <ScrollView style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}>

      <Text style={styles.titre}>
        Mon profil
      </Text>

      {/* Photo de profil */}
      <View style={styles.photoContainer}>

        <Image
          source={
            profil?.photoURL
              ? { uri: profil.photoURL }
              : require('../../assets/avatar_default.png')
          }
          style={styles.photoProfil}
        />

      </View>

      {/* Adresse e-mail */}
      <View style={styles.card}>

        <Text style={styles.label}>
          Adresse e-mail
        </Text>

        <Text style={styles.email}>
          {utilisateur.email}
        </Text>

      </View>

      {/* Pseudo */}
      <View style={styles.card}>

        <Text style={styles.label}>
          Pseudo
        </Text>

        <Text style={styles.valeur}>
          {profil?.pseudo || 'Pas encore défini'}
        </Text>

      </View>

      {/* Accroche */}
      <View style={styles.card}>

        <Text style={styles.label}>
          Ma phrase d'accroche
        </Text>

        <Text style={styles.accroche}>
          {profil?.accroche || 'Aucune phrase d’accroche pour le moment.'}
        </Text>

      </View>

      {/* Statistiques */}
      <View style={styles.card}>

        <Text style={styles.label}>
          Mes recettes
        </Text>

        <Text style={styles.nombreRecettes}>
          🍳 {profil?.nombreRecettes ?? 0}
        </Text>

      </View>

      {/* Modifier */}
      <TouchableOpacity
        style={styles.boutonModifier}
        onPress={() => navigation.navigate('modifierProfil')}
        activeOpacity={0.7}
      >
        <Text style={styles.boutonTexte}>
          ✏️ Modifier mon profil
        </Text>
      </TouchableOpacity>

      {/* Déconnexion */}
      <TouchableOpacity
        style={styles.boutonDeconnexion}
        onPress={deconnexion}
        activeOpacity={0.7}
      >
        <Text style={styles.boutonDeconnexionTexte}>
          Se déconnecter
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
};

export default Profil;