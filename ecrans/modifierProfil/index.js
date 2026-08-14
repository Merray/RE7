import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    ScrollView,
    Image
} from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import styles from './style';
import storage from '@react-native-firebase/storage';
import { launchImageLibrary } from 'react-native-image-picker';

const ModifierProfil = ({ navigation }) => {

    const [pseudo, setPseudo] = useState('');
    const [accroche, setAccroche] = useState('');
    const [chargement, setChargement] = useState(true);
    const [sauvegarde, setSauvegarde] = useState(false);
    const [photoURL, setPhotoURL] = useState(null);
    const [photoLocale, setPhotoLocale] = useState(null);

    useEffect(() => {

        const utilisateur = auth().currentUser;

        if (!utilisateur) {
            setChargement(false);
            return;
        }

        const recupererProfil = async () => {

            try {

                const document = await firestore()
                    .collection('users')
                    .doc(utilisateur.uid)
                    .get();

                if (document.exists) {

                    const data = document.data();

                    setPseudo(data.pseudo || '');
                    setAccroche(data.accroche || '');
                    setPhotoURL(data.photoURL || null);

                }

            } catch (error) {

                console.error('Erreur récupération profil :', error);

                Alert.alert(
                    'Erreur',
                    'Impossible de récupérer ton profil.'
                );

            } finally {

                setChargement(false);

            }
        };

        recupererProfil();

    }, []);

    const choisirPhoto = async () => {

        try {

            const resultat = await launchImageLibrary({
                mediaType: 'photo',
                quality: 0.8,
            });

            if (resultat.didCancel) {
                return;
            }

            if (resultat.errorCode) {

                console.log(
                    'Erreur sélection image :',
                    resultat.errorCode,
                    resultat.errorMessage
                );

                Alert.alert(
                    'Erreur',
                    'Impossible de sélectionner cette image.'
                );

                return;
            }

            const uri = resultat.assets?.[0]?.uri;

            if (uri) {
                setPhotoLocale(uri);
            }

        } catch (error) {

            console.error('Erreur sélection photo :', error);

            Alert.alert(
                'Erreur',
                'Impossible de sélectionner la photo.'
            );
        }
    };

    const sauvegarder = async () => {

        if (pseudo.trim() === '') {
            Alert.alert(
                'Pseudo requis',
                'Merci de choisir un pseudo.'
            );
            return;
        }

        if (pseudo.trim().length < 3) {
            Alert.alert(
                'Pseudo trop court',
                'Ton pseudo doit contenir au moins 3 caractères.'
            );
            return;
        }

        if (pseudo.trim().length > 20) {
            Alert.alert(
                'Pseudo trop long',
                'Ton pseudo ne peut pas dépasser 20 caractères.'
            );
            return;
        }

        const utilisateur = auth().currentUser;

        if (!utilisateur) {
            Alert.alert(
                'Connexion requise',
                'Tu dois être connecté pour modifier ton profil.'
            );
            return;
        }

        try {

            setSauvegarde(true);

            let nouvellePhotoURL = photoURL;

            // --------------------------------------------------
            // Upload de la nouvelle photo si nécessaire
            // --------------------------------------------------

            if (photoLocale) {

                const reference = storage()
                    .ref(`profilePhotos/${utilisateur.uid}.jpg`);

                await reference.putFile(photoLocale);

                nouvellePhotoURL = await reference.getDownloadURL();
            }

            // --------------------------------------------------
            // Mise à jour Firestore
            // --------------------------------------------------

            await firestore()
                .collection('users')
                .doc(utilisateur.uid)
                .update({
                    pseudo: pseudo.trim(),
                    accroche: accroche.trim(),
                    photoURL: nouvellePhotoURL || null,
                });

            Alert.alert(
                'Profil enregistré 🎉',
                'Ton profil a bien été mis à jour.',
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.goBack(),
                    },
                ]
            );

        } catch (error) {

            console.error('Erreur sauvegarde profil :', error);

            Alert.alert(
                'Erreur',
                'Impossible de sauvegarder ton profil.'
            );

        } finally {

            setSauvegarde(false);

        }
    };

    if (chargement) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps="handled"
        >

            <Text style={styles.titre}>
                Modifier mon profil
            </Text>

            {/* Photo de profil */}

            <View style={styles.photoContainer}>

                <Image
                    source={
                        photoLocale
                            ? { uri: photoLocale }
                            : photoURL
                                ? { uri: photoURL }
                                : require('../../assets/avatar_default.png')
                    }
                    style={styles.photoProfil}
                />

            </View>

            <TouchableOpacity
                style={styles.boutonPhoto}
                onPress={choisirPhoto}
                activeOpacity={0.7}
            >
                <Text style={styles.boutonPhotoTexte}>
                    📷 Changer ma photo
                </Text>
            </TouchableOpacity>

            <Text style={styles.label}>
                Pseudo
            </Text>

            <TextInput
                style={styles.input}
                value={pseudo}
                onChangeText={setPseudo}
                placeholder="Ton pseudo"
                placeholderTextColor="#777"
                maxLength={20}
                autoCapitalize="none"
            />

            <Text style={styles.compteur}>
                {pseudo.length}/20
            </Text>

            <Text style={styles.label}>
                Phrase d'accroche
            </Text>

            <TextInput
                style={[styles.input, styles.inputAccroche]}
                value={accroche}
                onChangeText={setAccroche}
                placeholder="Quelques mots sur toi..."
                placeholderTextColor="#777"
                multiline
                maxLength={100}
            />

            <Text style={styles.compteur}>
                {accroche.length}/100
            </Text>

            <TouchableOpacity
                style={[
                    styles.bouton,
                    sauvegarde && styles.boutonDesactive,
                ]}
                onPress={sauvegarder}
                disabled={sauvegarde}
                activeOpacity={0.7}
            >

                {sauvegarde ? (
                    <View style={styles.loading}>
                        <ActivityIndicator color="white" />

                        <Text style={styles.boutonTexte}>
                            Enregistrement...
                        </Text>
                    </View>
                ) : (
                    <Text style={styles.boutonTexte}>
                        💾 Enregistrer
                    </Text>
                )}

            </TouchableOpacity>

        </ScrollView>
    );
};

export default ModifierProfil;