import { StyleSheet } from "react-native";
import { COULEURS, PADDING, TEXT_SIZE } from "../../outils/constantes";

const headerStyles = StyleSheet.create({

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: PADDING.horizontal,
        paddingVertical: 16,
        backgroundColor: COULEURS.secondary,
    },

    // Conteneur du texte pour l'utilisateur connecté
    texteContainer: {
        flex: 1,
        paddingRight: 15,
    },

    // "Salut Jim 👋"
    salutation: {
        fontSize: 28,
        fontWeight: 'bold',
        color: COULEURS.blanc,
        fontFamily: 'Poppins-Regular',
    },

    // "Qu'est-ce qu'on cuisine aujourd'hui ?"
    question: {
        fontSize: 14,
        color: COULEURS.blanc,
        marginTop: 2,
        lineHeight: 26,
    },

    // Avatar de l'utilisateur connecté
    profilImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },

    // Nom affiché pour un utilisateur non connecté
    profilName: {
        fontSize: TEXT_SIZE.title,
        color: COULEURS.blanc,
        fontFamily: 'Poppins-Regular',
    },

    // Bouton "Se connecter"
    boutonConnexion: {
        backgroundColor: COULEURS.blanc,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        elevation: 3,
    },

    connexion: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COULEURS.secondary,
    },

});

export default headerStyles;