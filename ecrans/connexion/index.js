import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import styles from './style';

const Connexion = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const seConnecter = async () => {

    if (!email || !password) {
      Alert.alert(
        'Champs manquants',
        'Veuillez renseigner votre adresse e-mail et votre mot de passe.'
      );
      return;
    }

    try {
      setLoading(true);

      await auth().signInWithEmailAndPassword(
        email.trim(),
        password
      );

      navigation.goBack();

    } catch (error) {

      console.log('Erreur connexion Firebase :', error);

      Alert.alert(
        'Connexion impossible',
        'Adresse e-mail ou mot de passe incorrect.'
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Connexion
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Adresse e-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.button}
        onPress={seConnecter}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Connexion...' : 'Se connecter'}
        </Text>
      </TouchableOpacity>

    </View>
  );
};

export default Connexion;