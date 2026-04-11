import { StyleSheet } from 'react-native';
import { COULEURS, TEXT_SIZE, PADDING } from '../../outils/constantes';

export default StyleSheet.create({
    container: { flex: 1, backgroundColor: COULEURS.main },
    image: { width: '100%', height: 200 },
    infoContainer: { backgroundColor: '#f2f2f2', padding: PADDING.horizontal },
    title: { fontSize: TEXT_SIZE.title, fontWeight: 'bold', marginVertical: 5 },
    sub: { fontSize: TEXT_SIZE.secondary, color: '#666' },
    info: { fontSize: 14, color: '#444', marginVertical: 5 },

    tabContainer: { flexDirection: 'row', justifyContent: 'center', marginVertical: 10 },
    tab: { paddingVertical: 10, paddingHorizontal: 20, borderBottomWidth: 2, borderBottomColor: 'transparent' },
    activeTab: { borderBottomColor: COULEURS.secondary },
    tabText: { fontSize: 16, fontWeight: '600' },

    dynamicContainer: {
        flex: 1,
        backgroundColor: COULEURS.secondary,
        padding: PADDING.horizontal,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },

    ingredientsList: { flexDirection: 'row', flexWrap: 'wrap', marginVertical: 10 },
    ingredientBadge: {
        color: '#fff',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 14,
        margin: 4,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        minWidth: 70,
    },


    preparationList: { marginVertical: 10 },
    bullet: { fontSize: 16, marginRight: 6, lineHeight: 20 },
    preparationText: { fontSize: 20, color: '#fff', lineHeight: 22, flexShrink: 1 },
    stepNumber: {
        fontWeight: 'bold',
        color: COULEURS.noir,
        marginRight: 8,
        fontSize: TEXT_SIZE.secondary,
        width: 70, // pour que le texte soit aligné
    },
    preparationStep: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 8
    },
    preparationText: {
        color: COULEURS.noir,
        fontSize: 20,
        lineHeight: 22,
        flexShrink: 1
    },
});
