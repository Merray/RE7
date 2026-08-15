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
    createurContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        paddingHorizontal: PADDING.horizontal,
        paddingVertical: 10,
    },

    createurPhoto: {
        width: 45,
        height: 45,
        borderRadius: 23,
        borderWidth: 2,
        borderColor: COULEURS.main,
    },

    createurInfos: {
        marginLeft: 10,
    },

    createurLabel: {
        fontSize: 13,
        color: '#777',
    },

    createurPseudo: {
        fontSize: TEXT_SIZE.secondary,
        fontWeight: 'bold',
        color: COULEURS.main,
    },
    createurContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10,
    },

    createurPhoto: {
        width: 55,
        height: 55,
        borderRadius: 55 / 2,
        borderWidth: 3,
        borderColor: COULEURS.secondary,
    },

    createurInfos: {
        marginLeft: 12,
    },

    createurLabel: {
        fontSize: 16,
        color: '#777',
    },

    createurPseudo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COULEURS.secondary,
    },
    createurProfil: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },

    actionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },

    actionButton: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: COULEURS.main,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },

    deleteButton: {
        backgroundColor: COULEURS.rouge,
    },

    actionButtonText: {
        fontSize: 19,
    },
});
