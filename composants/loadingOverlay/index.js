import React from 'react';
import {
    View,
    Text,
} from 'react-native';

import { ActivityIndicator } from 'react-native-paper';

import styles from './style';
import { COULEURS } from '../../outils/constantes';

const LoadingOverlay = ({
    visible,
    message = 'Chargement...',
}) => {

    if (!visible) {
        return null;
    }

    return (
        <View style={styles.overlay}>

            <ActivityIndicator
                size="large"
                color={COULEURS.blanc}
            />

            <Text style={styles.text}>
                {message}
            </Text>

        </View>
    );
};

export default LoadingOverlay;