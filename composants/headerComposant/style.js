import { StyleSheet } from "react-native";
import { COULEURS, PADDING, TEXT_SIZE } from "../../outils/constantes";

const headerStyles = StyleSheet.create({

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: PADDING.horizontal,
        paddingVertical: PADDING.vertical,
        backgroundColor: COULEURS.secondary
    },

    profilImage: {
        width: 50,
        height: 50,
        borderRadius: 25
    },

    profilName: {
        fontSize: TEXT_SIZE.title,
        color: COULEURS.blanc,
        fontFamily: 'Poppins-Regular'
    },

    boutonConnexion: {
        backgroundColor: COULEURS.blanc,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        elevation: 3
    },

    connexion: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COULEURS.secondary
    }
})

export default headerStyles