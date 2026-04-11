import { StyleSheet } from "react-native";
import { COULEURS, PADDING, TEXT_SIZE } from "../../outils/constantes";

const recetteStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: COULEURS.blanc,
        elevation: 5,
        marginTop: 10,
        paddingVertical: PADDING.vertical,
        paddingHorizontal: PADDING.horizontal,
        borderRadius: 5
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 80 / 2,
    },
    description: {
        flex: 1,                // prend tout l’espace dispo
        flexDirection: 'column',
        justifyContent: 'center', // centre verticalement dans l’item
        alignItems: 'center',     // centre horizontalement
        marginLeft: 10,           // un petit espace par rapport à l’image
    },
    titre: {
        fontWeight: 'bold',
        fontSize: TEXT_SIZE.title,
        textAlign: 'center'
    }, ingredientsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
    },

    ingredients: {
        padding: 3,
        marginTop: 5,
        backgroundColor: '#ea680bd0',
        color: COULEURS.blanc,
        borderRadius: 5,
        textAlign: 'center',
    },
    badgeVegan: {
        position: 'absolute',
        top: 5,
        right: 5,
        width: 30,
        height: 30,
        borderRadius: 12,
    },
    ingredientsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 10,
    },

ingredientBadge: {
  color: '#fff',
  paddingVertical: 4,
  paddingHorizontal: 8,
  borderRadius: 12,
  margin: 3,
  fontSize: 12,
  fontWeight: 'bold',
  textAlign: 'center',
  minWidth: 60,
},



})

export default recetteStyle