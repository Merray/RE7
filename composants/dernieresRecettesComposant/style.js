import { StyleSheet } from "react-native";
import { COULEURS, PADDING } from "../../outils/constantes";

const derniereRecetteStyle = StyleSheet.create({
    horizontalFlatListItem: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: PADDING.horizontal,
        marginRight: 15,
        borderRadius: 10,
        backgroundColor: COULEURS.blanc,
        elevation: 3,
    },
    imgRecette: {
        width: 60,
        height: 60
    },
    mainRecetteText: {
        fontWeight: 'bold',
        fontSize: 16
    },
    subRecetteText: {
        marginTop: 10,
        paddingBottom: 5,
        fontSize: 12
    },
})

export default derniereRecetteStyle