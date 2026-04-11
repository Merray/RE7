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
    }, profilImage: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2
    },
    profilName: {
        fontSize: TEXT_SIZE.title,
        color: COULEURS.noir,
        fontFamily: 'Poppins-Regular'
    },
})

export default headerStyles;