import { StyleSheet } from "react-native";
import { COULEURS, PADDING } from "../../outils/constantes";

const derniereRecetteStyle = StyleSheet.create({
    horizontalFlatListItem: {
    width: 280,
    marginRight: 15,
    borderRadius: 15,
    backgroundColor: COULEURS.blanc,
    overflow: 'hidden',
    elevation: 4,
},

imgRecette: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
},

mainRecetteText: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10,
    marginHorizontal: 12,
},

subRecetteText: {
    marginTop: 6,
    marginBottom: 12,
    marginHorizontal: 12,
    fontSize: 13,
    color: '#666',
},
})

export default derniereRecetteStyle