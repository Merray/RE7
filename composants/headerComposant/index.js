import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import headerStyles from './style';

const HeaderComposant = ({ navigation }) => {

    const [utilisateur, setUtilisateur] = useState(null);
    const [profil, setProfil] = useState(null);

    useEffect(() => {

        let unsubscribeProfil = null;

        const unsubscribeAuth = auth().onAuthStateChanged(user => {

            setUtilisateur(user);

            if (!user) {
                setProfil(null);

                if (unsubscribeProfil) {
                    unsubscribeProfil();
                    unsubscribeProfil = null;
                }

                return;
            }

            unsubscribeProfil = firestore()
                .collection('users')
                .doc(user.uid)
                .onSnapshot(document => {

                    if (document.exists) {
                        setProfil(document.data());
                    } else {
                        setProfil(null);
                    }

                });

        });

        return () => {

            unsubscribeAuth();

            if (unsubscribeProfil) {
                unsubscribeProfil();
            }

        };

    }, []);

    return (
        <View style={headerStyles.header}>

            {utilisateur ? (
                <>
                    <View style={headerStyles.texteContainer}>

                        <Text style={headerStyles.salutation}>
                            Salut {profil?.pseudo || '👋'}
                        </Text>

                        <Text style={headerStyles.question}>
                            Qu'est-ce qu'on cuisine aujourd'hui ?
                        </Text>

                    </View>

                    <Image
                        source={
                            profil?.photoURL
                                ? { uri: profil.photoURL }
                                : require('./../../assets/avatar_default.png')
                        }
                        style={headerStyles.profilImage}
                    />
                </>
            ) : (
                <>
                    <Text style={headerStyles.profilName}>
                        Invité(e)
                    </Text>

                    <TouchableOpacity
                        style={headerStyles.boutonConnexion}
                        onPress={() => navigation.navigate('connexion')}
                        activeOpacity={0.7}
                    >
                        <Text style={headerStyles.connexion}>
                            Se connecter
                        </Text>
                    </TouchableOpacity>
                </>
            )}

        </View>
    );
};

export default HeaderComposant;