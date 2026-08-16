import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
} from 'react-native';

import { INGREDIENTS } from '../../outils/ingredientsData';
import { CATEGORY_COLORS, COULEURS } from '../../outils/constantes';

import styles from './style';

const IngredientModal = ({ visible, onClose, onSelect, selectedIngredients: ingredientsDejaAjoutes }) => {

  const [search, setSearch] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  useEffect(() => {

    if (visible) {
      setSelectedIngredients(ingredientsDejaAjoutes || []);
    }

  }, [visible, ingredientsDejaAjoutes]);

  // Filtrer les ingrédients selon la recherche
  const filteredIngredients = INGREDIENTS.filter(ing =>
    ing.label.toLowerCase().includes(search.toLowerCase())
  );

  // Grouper les ingrédients par catégorie
  const grouped = {};

  filteredIngredients.forEach(ing => {

    if (!grouped[ing.category]) {
      grouped[ing.category] = [];
    }

    grouped[ing.category].push(ing);

  });

  // Sélectionner / désélectionner un ingrédient
  const toggleIngredient = (ingredient) => {

    const alreadySelected = selectedIngredients.some(
      ing => ing.label === ingredient.label
    );

    if (alreadySelected) {

      setSelectedIngredients(prev =>
        prev.filter(ing => ing.label !== ingredient.label)
      );

    } else {

      setSelectedIngredients(prev => [
        ...prev,
        ingredient,
      ]);

    }

  };

  // Valider la sélection
  const handleConfirm = () => {

    if (selectedIngredients.length === 0) {
      return;
    }

    onSelect(selectedIngredients);

    setSelectedIngredients([]);
    setSearch('');
    onClose();

  };

  // Fermer sans valider
  const handleClose = () => {

    setSelectedIngredients([]);
    setSearch('');
    onClose();

  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
    >

      <View style={styles.container}>

        {/* Header */}
        <View style={styles.header}>

          <Text style={styles.headerTitle}>
            Choisir des ingrédients
          </Text>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleClose}
          >
            <Text style={styles.closeText}>
              ✕
            </Text>
          </TouchableOpacity>

        </View>

        {/* Recherche */}
        <TextInput
          placeholder="Rechercher un ingrédient..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />

        {/* Liste des ingrédients */}
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingBottom: 100,
          }}
        >

          {Object.keys(grouped).map(category => (

            <View
              key={category}
              style={styles.categoryContainer}
            >

              <Text style={styles.categoryTitle}>
                {category.toUpperCase()}
              </Text>

              <View style={styles.ingredientsContainer}>

                {grouped[category].map(ingredient => {

                  const isSelected = selectedIngredients.some(
                    ing => ing.label === ingredient.label
                  );

                  return (
                    <TouchableOpacity
                      key={ingredient.label}
                      onPress={() => toggleIngredient(ingredient)}
                      style={[
                        styles.ingredientButton,
                        {
                          backgroundColor:
                            CATEGORY_COLORS[ingredient.category],
                        },
                        isSelected && styles.selectedIngredient,
                      ]}
                    >

                      <Text
                        style={[
                          styles.ingredientText,
                          isSelected && styles.selectedIngredientText,
                        ]}
                      >
                        {isSelected ? '✓ ' : ''}
                        {ingredient.label}
                      </Text>

                    </TouchableOpacity>
                  );

                })}

              </View>

            </View>

          ))}

        </ScrollView>

        {/* Bouton de validation */}
        <TouchableOpacity
          style={[
            styles.confirmButton,
            {
              backgroundColor:
                selectedIngredients.length > 0
                  ? COULEURS.main
                  : '#999',
            },
          ]}
          onPress={handleConfirm}
          disabled={selectedIngredients.length === 0}
        >

          <Text style={styles.confirmButtonText}>

            {selectedIngredients.length === 0
              ? 'Sélectionner des ingrédients'
              : `Ajouter ${selectedIngredients.length} ingrédient${selectedIngredients.length > 1 ? 's' : ''}`
            }

          </Text>

        </TouchableOpacity>

      </View>

    </Modal>
  );
};

export default IngredientModal;