import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, TextInput } from 'react-native';
import { INGREDIENTS } from '../../outils/ingredientsData';
import { CATEGORY_COLORS, COULEURS } from '../../outils/constantes';

const IngredientModal = ({ visible, onClose, onSelect }) => {
  const [search, setSearch] = useState('');

  // Filtre
  const filteredIngredients = INGREDIENTS.filter(ing =>
    ing.label.toLowerCase().includes(search.toLowerCase())
  );

  // Groupement
  const grouped = {};
  filteredIngredients.forEach(ing => {
    if (!grouped[ing.category]) grouped[ing.category] = [];
    grouped[ing.category].push(ing);
  });

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={{ flex: 1, backgroundColor: COULEURS.secondary, padding: 15 }}>

        {/* header */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Choisir un ingrédient</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={{ fontSize: 18 }}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Recherche*/}
        <TextInput
          placeholder="Rechercher un ingrédient..."
          value={search}
          onChangeText={setSearch}
          style={{
            backgroundColor: 'white',
            borderRadius: 8,
            padding: 10,
            marginBottom: 10,
          }}
        />

        {/* Liste des ingrédients */}
        <ScrollView>
          {Object.keys(grouped).map(category => (
            <View key={category} style={{ marginBottom: 15 }}>
              
              <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>
                {category.toUpperCase()}
              </Text>

              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {grouped[category].map((ing, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => onSelect(ing)}
                    style={{
                      backgroundColor: CATEGORY_COLORS[ing.category],
                      paddingVertical: 6,
                      paddingHorizontal: 10,
                      borderRadius: 15,
                      margin: 5,
                    }}
                  >
                    <Text style={{ color: 'white' }}>{ing.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>

            </View>
          ))}
        </ScrollView>

      </View>
    </Modal>
  );
};

export default IngredientModal