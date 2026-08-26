import { StyleSheet } from 'react-native';

import { COULEURS } from '../../outils/constantes';


const styles = StyleSheet.create({

    overlay: {
        flex: 1,
        justifyContent: 'flex-end',

        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },

    modal: {
        backgroundColor: COULEURS.blanc,

        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,

        padding: 20,

        minHeight: 430,
    },

    title: {
        fontSize: 22,
        fontWeight: 'bold',

        textAlign: 'center',
        marginBottom: 20,
    },

    content: {
        alignItems: 'center',
    },

    filtersContainer: {
        width: '100%',
        rowGap: 6,
        marginBottom: 15,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',

        marginBottom: 12,

        color: '#333',
    },


    /*
    =========================
    FILTRES AVEC IMAGE
    =========================
    */

    imageFilterOption: {
        width: '100%',
        height: 105,

        borderRadius: 20,
        overflow: 'hidden',
    },

    filterImage: {
        flex: 1,
        justifyContent: 'center',
    },

    filterImageStyle: {
        borderRadius: 20,
    },


    /*
    =========================
    CHECKBOX SUR LES IMAGES
    =========================
    */

    imageCheckbox: {
        position: 'absolute',

        right: 25,
        top: '50%',

        width: 32,
        height: 32,

        marginTop: -16,

        borderRadius: 16,

        borderWidth: 2,
        borderColor: '#FFFFFF',

        backgroundColor: 'rgba(255,255,255,0.9)',

        justifyContent: 'center',
        alignItems: 'center',

        elevation: 5,
    },


    /*
    =========================
    FILTRE CLASSIQUE
    =========================
    */

    filterOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        width: '100%',

        paddingVertical: 15,
        paddingHorizontal: 25,

        borderWidth: 1,
        borderColor: '#DDD',

        borderRadius: 20,

        marginTop: 6,
        marginBottom: 15,
    },

    filterOptionActive: {
        borderColor: '#05a565',
        backgroundColor: '#F0FFF7',
    },

    filterOptionText: {
        fontSize: 16,
        color: '#333',
    },


    /*
    =========================
    CHECKBOX CLASSIQUE
    =========================
    */

    checkbox: {
        width: 32,
        height: 32,

        borderRadius: 16,

        borderWidth: 2,
        borderColor: '#BBB',

        justifyContent: 'center',
        alignItems: 'center',
    },

    checkboxActive: {
        backgroundColor: '#05a565',
        borderColor: '#05a565',
    },

    checkmark: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },


    /*
    =========================
    BOUTONS DU BAS
    =========================
    */

    resetButton: {
        borderWidth: 1,
        borderColor: COULEURS.secondary,

        paddingVertical: 14,

        borderRadius: 12,

        alignItems: 'center',

        marginBottom: 10,
    },

    resetButtonText: {
        color: COULEURS.secondary,
        fontSize: 16,
        fontWeight: 'bold',
    },

    closeButton: {
        backgroundColor: COULEURS.secondary,

        paddingVertical: 14,

        borderRadius: 12,

        alignItems: 'center',
    },

    closeButtonText: {
        color: COULEURS.blanc,
        fontSize: 16,
        fontWeight: 'bold',
    },

});

export default styles;