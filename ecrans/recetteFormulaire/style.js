import { StyleSheet } from 'react-native';
import { COULEURS, TEXT_SIZE, PADDING } from '../../outils/constantes';

const recetteFormulaireStyle = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#eee',
        marginTop: 8,
        paddingVertical: 12,
        paddingHorizontal: PADDING.horizontal,
        borderRadius: 12,
        backgroundColor: '#fafafa',
        fontSize: TEXT_SIZE.secondary,
    },
    sectionTitle: {
        fontWeight: 'bold',
        fontSize: TEXT_SIZE.title,
        color: COULEURS.main,
        marginBottom: 10,
        textAlign: 'center',
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    deleteButton: {
        marginLeft: 10,
        marginTop: 8,
        backgroundColor: COULEURS.rouge,
        width: 28,
        height: 28,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },

    deleteText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
    boutonAjouter: {
        marginTop: 15,
        alignSelf: 'center',
        backgroundColor: COULEURS.main,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        elevation: 3,
    },

    boutonAjouterTexte: {
        color: COULEURS.blanc,
        fontWeight: 'bold',
        fontSize: TEXT_SIZE.secondary,
    },
    boutonSauvegarder: {
        marginTop: 30,
        marginBottom: 40,
        alignSelf: 'center',
        width: '85%',
        backgroundColor: COULEURS.bleu,
        paddingVertical: 16,
        borderRadius: 15,
        alignItems: 'center',
        elevation: 6,
    },

    boutonSauvegarderText: {
        color: COULEURS.blanc,
        fontWeight: 'bold',
        fontSize: TEXT_SIZE.title,
    },
    card: {
        backgroundColor: COULEURS.iconColor,
        borderRadius: 15,
        padding: 15,
        marginTop: 15,
        elevation: 4,
    },
    stepBadge: {
  backgroundColor: COULEURS.main,
  width: 30,
  height: 30,
  borderRadius: 15,
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 10,
  marginTop: 8,
},

stepText: {
  color: 'white',
  fontWeight: 'bold',
},
});

export default recetteFormulaireStyle;