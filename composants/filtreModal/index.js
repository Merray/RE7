import React from 'react';

import {
    Modal,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

import styles from './style';


const FiltreModal = ({
    visible,
    onClose,
}) => {

    return (

        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >

            <View style={styles.overlay}>

                <View style={styles.modal}>

                    {/* TITRE */}
                    <Text style={styles.title}>
                        Filtres
                    </Text>


                    {/* CONTENU */}
                    <View style={styles.content}>

                        <Text style={styles.emptyText}>
                            Les filtres arriveront bientôt 👨‍🍳
                        </Text>

                    </View>


                    {/* BOUTON FERMER */}
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={onClose}
                    >

                        <Text style={styles.closeButtonText}>
                            Fermer
                        </Text>

                    </TouchableOpacity>

                </View>

            </View>

        </Modal>

    );
};

export default FiltreModal;