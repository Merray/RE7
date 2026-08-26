import React from 'react';

import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';

import imageVegetarien from '../../assets/filtres/vegetarien.png';
import imageVegan from '../../assets/filtres/vegan.png';
import imageProtMaxing from '../../assets/filtres/protmaxing.png';

import styles from './style';


const FiltreModal = ({
    visible,
    onClose,

    filtreVegetarien,
    setFiltreVegetarien,

    filtreVegan,
    setFiltreVegan,

    filtreProtMaxing,
    setFiltreProtMaxing,
}) => {

    const resetFiltres = () => {

        setFiltreVegetarien(false);
        setFiltreVegan(false);
        setFiltreProtMaxing(false);

    };


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


                        {/* CONTENEUR DES FILTRES */}
                        <View style={styles.filtersContainer}>


                            {/* VÉGÉTARIEN */}
                            <TouchableOpacity
                                style={[
                                    styles.imageFilterOption,
                                    filtreVegetarien &&
                                    styles.filterOptionActive,
                                ]}
                                onPress={() =>
                                    setFiltreVegetarien(
                                        !filtreVegetarien
                                    )
                                }
                            >

                                <ImageBackground
                                    source={imageVegetarien}
                                    style={styles.filterImage}
                                    imageStyle={styles.filterImageStyle}
                                >

                                    <View
                                        style={[
                                            styles.imageCheckbox,
                                            filtreVegetarien &&
                                            styles.checkboxActive,
                                        ]}
                                    >

                                        {filtreVegetarien && (

                                            <Text style={styles.checkmark}>
                                                ✓
                                            </Text>

                                        )}

                                    </View>

                                </ImageBackground>

                            </TouchableOpacity>


                            {/* VEGAN */}
                            <TouchableOpacity
                                style={[
                                    styles.imageFilterOption,
                                    filtreVegan &&
                                    styles.filterOptionActive,
                                ]}
                                onPress={() =>
                                    setFiltreVegan(
                                        !filtreVegan
                                    )
                                }
                            >

                                <ImageBackground
                                    source={imageVegan}
                                    style={styles.filterImage}
                                    imageStyle={styles.filterImageStyle}
                                >

                                    <View
                                        style={[
                                            styles.imageCheckbox,
                                            filtreVegan &&
                                            styles.checkboxActive,
                                        ]}
                                    >

                                        {filtreVegan && (

                                            <Text style={styles.checkmark}>
                                                ✓
                                            </Text>

                                        )}

                                    </View>

                                </ImageBackground>

                            </TouchableOpacity>


                            {/* PROTMAXING */}
                            <TouchableOpacity
                                style={[
                                    styles.imageFilterOption,
                                    filtreProtMaxing &&
                                    styles.filterOptionActive,
                                ]}
                                onPress={() =>
                                    setFiltreProtMaxing(
                                        !filtreProtMaxing
                                    )
                                }
                            >

                                <ImageBackground
                                    source={imageProtMaxing}
                                    style={styles.filterImage}
                                    imageStyle={styles.filterImageStyle}
                                >

                                    <View
                                        style={[
                                            styles.imageCheckbox,
                                            filtreProtMaxing &&
                                            styles.checkboxActive,
                                        ]}
                                    >

                                        {filtreProtMaxing && (

                                            <Text style={styles.checkmark}>
                                                ✓
                                            </Text>

                                        )}

                                    </View>

                                </ImageBackground>

                            </TouchableOpacity>

                        </View>

                    </View>


                    {/* BOUTON RÉINITIALISER */}
                    <TouchableOpacity
                        style={styles.resetButton}
                        onPress={resetFiltres}
                    >

                        <Text style={styles.resetButtonText}>
                            ↺ Réinitialiser les filtres
                        </Text>

                    </TouchableOpacity>


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