import { StyleSheet } from 'react-native';

import {
    COULEURS,
} from '../../outils/constantes';

const styles = StyleSheet.create({

    overlay: {
        position: 'absolute',

        top: 0,
        bottom: 0,
        left: 0,
        right: 0,

        backgroundColor: 'rgba(0,0,0,0.6)',

        justifyContent: 'center',
        alignItems: 'center',

        zIndex: 999,
        elevation: 999,
    },

    text: {
        color: COULEURS.blanc,
        marginTop: 15,
        fontSize: 16,
        fontWeight: 'bold',
    },

});

export default styles;