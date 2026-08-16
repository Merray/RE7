import { StyleSheet } from 'react-native';
import { COULEURS, TEXT_SIZE, PADDING } from '../../outils/constantes';

export default StyleSheet.create({

    // =========================
    // CONTENEUR PRINCIPAL
    // =========================

    container: {
        flex: 1,
        backgroundColor: COULEURS.main,
    },

    // =========================
    // IMAGE
    // =========================

    image: {
        width: '100%',
        height: 200,
    },

    // =========================
    // INFORMATIONS RECETTE
    // =========================

    infoContainer: {
        backgroundColor: '#f2f2f2',
        padding: PADDING.horizontal,
    },

    title: {
        fontSize: TEXT_SIZE.title,
        fontWeight: 'bold',
        marginVertical: 5,
    },

    sub: {
        fontSize: TEXT_SIZE.secondary,
        color: '#666',
    },

    info: {
        fontSize: 14,
        color: '#444',
        marginVertical: 5,
    },

    // =========================
    // CRÉATEUR
    // =========================

    createurContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10,
    },

    createurProfil: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
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

    // =========================
    // BOUTONS ACTIONS
    // =========================

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

    // =========================
    // ONGLETS
    // =========================

    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
    },

    tab: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },

    activeTab: {
        borderBottomColor: COULEURS.secondary,
    },

    tabText: {
        fontSize: 16,
        fontWeight: '600',
    },

    // =========================
    // CONTENU DYNAMIQUE
    // =========================

    dynamicContainer: {
        flex: 1,
        backgroundColor: COULEURS.secondary,
        padding: PADDING.horizontal,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },

    scrollContent: {
        paddingTop: 10,

        // Espace supplémentaire pour éviter
        // que la barre Android cache le contenu
        paddingBottom: 50,
    },

    // =========================
    // INGRÉDIENTS
    // =========================

    ingredientsList: {
        marginVertical: 10,
    },

    ingredientRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COULEURS.blanc,
        borderRadius: 10,
        marginBottom: 8,
        paddingVertical: 8,
        paddingHorizontal: 10,
    },

    quantiteBadge: {
        minWidth: 75,
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },

    quantiteText: {
        color: COULEURS.blanc,
        fontWeight: 'bold',
        fontSize: 14,
    },

    ingredientName: {
        flex: 1,
        fontSize: 18,
        fontWeight: '600',
        color: COULEURS.noir,
    },

    // =========================
    // PRÉPARATION
    // =========================

    preparationList: {
        marginVertical: 10,
    },

    preparationStep: {
        flexDirection: 'row',
        alignItems: 'flex-start',

        backgroundColor: COULEURS.blanc,

        borderRadius: 12,

        paddingVertical: 14,
        paddingHorizontal: 12,

        marginBottom: 12,

        elevation: 2,
    },

    stepBadge: {
        width: 34,
        height: 34,

        borderRadius: 17,

        backgroundColor: COULEURS.main,

        justifyContent: 'center',
        alignItems: 'center',

        marginRight: 12,

        flexShrink: 0,
    },

    stepNumber: {
        color: COULEURS.blanc,
        fontWeight: 'bold',
        fontSize: 16,
    },

    preparationText: {
        flex: 1,

        color: COULEURS.noir,

        fontSize: 18,
        lineHeight: 25,
    },

});