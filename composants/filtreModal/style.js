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

});

export default styles;