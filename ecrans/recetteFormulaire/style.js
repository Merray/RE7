import { StyleSheet } from 'react-native';
import { COULEURS, TEXT_SIZE, PADDING } from '../../outils/constantes';

const recetteFormulaireStyle = StyleSheet.create({

    // =========================
    // CONTENEURS / INPUTS
    // =========================

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

    card: {
        backgroundColor: COULEURS.iconColor,
        borderRadius: 15,
        padding: 15,
        marginTop: 15,
        elevation: 4,
    },

    sectionTitle: {
        fontWeight: 'bold',
        fontSize: TEXT_SIZE.title,
        color: COULEURS.main,
        marginBottom: 10,
        textAlign: 'center',
    },


    // =========================
    // BOUTONS AJOUT
    // =========================

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


    // =========================
    // BOUTON SAUVEGARDER
    // =========================

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


    // =========================
    // PRÉPARATION
    // =========================

    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
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
        color: COULEURS.blanc,
        fontWeight: 'bold',
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
        color: COULEURS.blanc,
        fontWeight: 'bold',
        fontSize: 18,
    },


    // =========================
    // PHOTO
    // =========================

    imagePicker: {
        height: 150,
        borderRadius: 12,
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        overflow: 'hidden',
    },

    imagePreview: {
        width: '100%',
        height: '100%',
    },


    // =========================
    // QUANTITÉS
    // =========================

    quantiteRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },

    quantiteIngredient: {
        flex: 1,
        fontSize: TEXT_SIZE.secondary,
        fontWeight: 'bold',
        color: COULEURS.noir,
    },

    quantiteInput: {
        width: 65,
        height: 42,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        backgroundColor: COULEURS.blanc,
        paddingVertical: 8,
        paddingHorizontal: 5,
        textAlign: 'center',
        fontSize: TEXT_SIZE.secondary,
        marginHorizontal: 6,
    },

    uniteButton: {
        width: 95,
        height: 42,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        backgroundColor: COULEURS.blanc,
        paddingVertical: 10,
        paddingHorizontal: 10,
    },

    uniteButtonText: {
        fontSize: 14,
        color: COULEURS.noir,
        flexShrink: 1,
    },

    uniteArrow: {
        fontSize: 10,
        marginLeft: 5,
    },


    // =========================
    // LOADING
    // =========================

    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    loadingText: {
        marginTop: 10,
        color: COULEURS.blanc,
        fontWeight: 'bold',
    },

});

export default recetteFormulaireStyle;