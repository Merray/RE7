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
    filtreVegetarien,
    setFiltreVegetarien,
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

                        {/* TYPE DE RECETTE */}
                        <Text style={styles.sectionTitle}>
                            Type de recette
                        </Text>

                        <TouchableOpacity
                            style={[
                                styles.filterOption,
                                filtreVegetarien && styles.filterOptionActive,
                            ]}
                            onPress={() =>
                                setFiltreVegetarien(!filtreVegetarien)
                            }
                        >

                            <Text style={styles.filterOptionText}>
                                🌱 Végétarien
                            </Text>

                            <View
                                style={[
                                    styles.checkbox,
                                    filtreVegetarien && styles.checkboxActive,
                                ]}
                            >
                                {filtreVegetarien && (
                                    <Text style={styles.checkmark}>
                                        ✓
                                    </Text>
                                )}
                            </View>

                        </TouchableOpacity>

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