import { TouchableOpacity, Image, Text, View } from 'react-native';
import { CATEGORY_COLORS } from '../../outils/constantes';
import recetteStyle from './style';
import { mapRecetteForNavigation } from '../../outils/recetteMapper';

// Fonction pour récupérer la couleur d'un ingrédient
const getIngredientColor = (ingredient) => {
  return CATEGORY_COLORS[ingredient.category] || '#999';
};

const RecetteComposant = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      style={recetteStyle.container}
      onPress={() =>
        navigation.navigate('recetteDetail', {
          recette: mapRecetteForNavigation(item)
        })
      }
    >

      {/* Image */}
      <Image
        style={recetteStyle.image}
        source={{ uri: item.image }}
      />

      <View style={recetteStyle.description}>

        {/* Nom */}
        <Text style={recetteStyle.titre}>
          {item.nom}
        </Text>

        {/* Badges ingrédients */}
        <View style={recetteStyle.ingredientsContainer}>
          {item.ingredients.map((ingredient, index) => (
            <Text
              key={index}
              style={[
                recetteStyle.ingredientBadge,
                {
                  backgroundColor: getIngredientColor(ingredient),
                },
              ]}
            >
              {ingredient.label}
            </Text>
          ))}
        </View>

      </View>

      {/* Badge Vegan */}
      {item.isVegan && (
        <Image
          source={require('./../../assets/vegan.jpg')}
          style={recetteStyle.badgeVegan}
        />
      )}

    </TouchableOpacity>
  );
};

export default RecetteComposant;