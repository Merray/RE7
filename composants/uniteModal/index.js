import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';

import { UNITES } from '../../outils/unitesData';
import styles from './style';

const UniteModal = ({ visible, onClose, onSelect }) => {

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >

      <View style={styles.overlay}>

        <View style={styles.modal}>

          {/* Titre */}
          <Text style={styles.title}>
            Choisir une unité
          </Text>

          {/* Liste des unités */}
          <ScrollView>
            {UNITES.map(unite => (

              <TouchableOpacity
                key={unite}
                style={styles.option}
                onPress={() => onSelect(unite)}
              >
                <Text style={styles.optionText}>
                  {unite}
                </Text>
              </TouchableOpacity>

            ))}
          </ScrollView>

          {/* Annuler */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
          >
            <Text style={styles.closeButtonText}>
              Annuler
            </Text>
          </TouchableOpacity>

        </View>

      </View>

    </Modal>
  );
};

export default UniteModal;