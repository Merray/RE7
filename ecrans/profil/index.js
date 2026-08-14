import { View, Text, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';

const Profil = ({ navigation }) => {

  const [utilisateur, setUtilisateur] = useState(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      setUtilisateur(user);
    });

    return unsubscribe;
  }, []);

  const deconnexion = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      console.log('Erreur déconnexion :', error);
    }
  };

  return (
    <View>
      <Text>Profil</Text>

      {utilisateur ? (
        <TouchableOpacity onPress={deconnexion}>
          <Text>Se déconnecter</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => navigation.navigate('connexion')}
        >
          <Text>Se connecter</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Profil;