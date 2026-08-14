import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';

const Profil = ({ navigation }) => {

  console.log('Utilisateur connecté :', auth().currentUser);

  return (
    <View>

      <Text>Profil</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate('connexion')}
      >
        <Text>Se connecter</Text>
      </TouchableOpacity>

    </View>
  );
};

export default Profil;