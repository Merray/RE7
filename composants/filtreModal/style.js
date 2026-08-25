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
        minHeight: 250,
    },

    title: {
        fontSize: 22,
        fontWeight: 'bold',

        textAlign: 'center',
        marginBottom: 20,
    },

    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    emptyText: {
        color: '#777',
        fontSize: 16,
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
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#333',
    },

    filterOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        width: 270,

        paddingVertical: 15,
        paddingHorizontal: 25,

        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 20,

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

});

export default styles;