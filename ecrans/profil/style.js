import { StyleSheet } from 'react-native';
import { COULEURS, PADDING, TEXT_SIZE } from '../../outils/constantes';

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    }, contentContainer: {
        paddingHorizontal: PADDING.horizontal,
        paddingBottom: 30,
    },

    titre: {
        fontSize: TEXT_SIZE.title,
        fontWeight: 'bold',
        color: COULEURS.main,
        textAlign: 'center',
        marginVertical: 25,
    },

    message: {
        textAlign: 'center',
        fontSize: TEXT_SIZE.secondary,
        color: '#666',
        marginTop: 30,
    },

    card: {
        backgroundColor: COULEURS.blanc,
        borderRadius: 15,
        padding: 18,
        marginBottom: 15,
        elevation: 3,
    },

    label: {
        fontSize: 14,
        color: '#777',
        marginBottom: 6,
        fontWeight: 'bold',
    },

    valeur: {
        fontSize: 22,
        fontWeight: 'bold',
        color: COULEURS.main,
    },

    accroche: {
        fontSize: 17,
        color: '#555',
        fontStyle: 'italic',
    },

    nombreRecettes: {
        fontSize: 22,
        fontWeight: 'bold',
        color: COULEURS.main,
    },

    boutonConnexion: {
        alignSelf: 'center',
        marginTop: 25,
        backgroundColor: COULEURS.main,
        paddingHorizontal: 30,
        paddingVertical: 12,
        borderRadius: 25,
        elevation: 4,
    },

    boutonModifier: {
        backgroundColor: COULEURS.bleu,
        paddingVertical: 14,
        borderRadius: 15,
        alignItems: 'center',
        marginTop: 15,
        elevation: 4,
    },

    boutonTexte: {
        color: COULEURS.blanc,
        fontSize: 16,
        fontWeight: 'bold',
    },

    boutonDeconnexion: {
        backgroundColor: COULEURS.rouge,
        paddingVertical: 14,
        borderRadius: 15,
        alignItems: 'center',
        marginTop: 15,
        elevation: 4,
    },

    boutonDeconnexionTexte: {
        color: COULEURS.blanc,
        fontSize: 16,
        fontWeight: 'bold',
    },
    email: {
        fontSize: 16,
        color: '#555',
    }, photoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },

    photoProfil: {
        width: 110,
        height: 110,
        borderRadius: 55,
        borderWidth: 3,
        borderColor: COULEURS.main,
    },

});

export default styles;