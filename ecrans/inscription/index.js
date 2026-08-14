import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import styles from './style';

const Inscription = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [erreur, setErreur] = useState('');

  const inscrire = async () => {
    setErreur('');

    if (motDePasse !== confirmation) {
      setErreur('Les mots de passe ne correspondent pas.');
      return;
    }

    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        motDePasse
      );

      const uid = userCredential.user.uid;

      await firestore()
        .collection('users')
        .doc(uid)
        .set({
          pseudo: '',
          accroche: '',
          nombreRecettes: 0,
          photoURL: null,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });

      //navigation.goBack();

      Alert.alert(
              "🎉 Bienvenue 🎉",
              "Ton compte a été créé, tu peux maintenant te connecter !",
              [
                {
                  text: "Se connecter",
                  onPress: () => navigation.navigate('connexion')
                }
              ]
            );

    } catch (error) {
      console.log('Erreur inscription :', error.code);

      setErreur('Impossible de créer le compte.');
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.titre}>Inscription</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#777"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        placeholderTextColor="#777"
        value={motDePasse}
        onChangeText={setMotDePasse}
        secureTextEntry={true}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirmer le mot de passe"
        placeholderTextColor="#777"
        value={confirmation}
        onChangeText={setConfirmation}
        secureTextEntry={true}
      />

      {erreur !== '' && (
        <Text style={styles.erreur}>
          {erreur}
        </Text>
      )}

      <TouchableOpacity
        style={styles.bouton}
        onPress={inscrire}
      >
        <Text style={styles.boutonTexte}>
          Créer mon compte
        </Text>
      </TouchableOpacity>

    </View>
  );
};

export default Inscription;