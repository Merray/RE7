import { StyleSheet } from "react-native";
import { COULEURS, PADDING } from "../../outils/constantes";

const recetteStyle = StyleSheet.create({
    verticalFLatlist: {
        backgroundColor: COULEURS.secondary,
        paddingHorizontal: PADDING.horizontal,
        paddingVertical: PADDING.vertical
    },
    boutonAjouter: {
  position: 'absolute',
  bottom: 20,
  right: 20,
  width: 60,
  height: 60,
  borderRadius: 30,
  backgroundColor: '#05a565',
  justifyContent: 'center',
  alignItems: 'center',
  elevation: 8,
},
})

export default recetteStyle