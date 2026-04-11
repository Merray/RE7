import { TouchableOpacity, Image, Text, View } from 'react-native';
import { INGREDIENT_CATEGORIES, CATEGORY_COLORS } from '../../outils/constantes';
import recetteStyle from './style';
import { images } from '../../fakeData/fakeImages';
import { mapRecetteForNavigation } from '../../outils/recetteMapper';

// Fonction pour récupérer la couleur d'un ingrédient
const getIngredientColor = (ingredient) => {
  const ingLower = ingredient.toLowerCase();

  if (INGREDIENT_CATEGORIES.proteines.some(i => ingLower.includes(i.toLowerCase()))) {
    return CATEGORY_COLORS.proteines;
  }
  if (INGREDIENT_CATEGORIES.feculents.some(i => ingLower.includes(i.toLowerCase()))) {
    return CATEGORY_COLORS.feculents;
  }
  if (INGREDIENT_CATEGORIES.legumes.some(i => ingLower.includes(i.toLowerCase()))) {
    return CATEGORY_COLORS.legumes;
  }
  if (INGREDIENT_CATEGORIES.epices?.some(i => ingLower.includes(i.toLowerCase()))) {
    return CATEGORY_COLORS.epices;
  }

  return '#999'; // fallback gris
};

const RecetteComposant = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      style={recetteStyle.container}
      onPress={() =>
        navigation.navigate('recetteDetail', { recette: mapRecetteForNavigation(item) })
      }
    >
      <Image style={recetteStyle.image} source={images[item.img]} />
      <View style={recetteStyle.description}>
        <Text style={recetteStyle.titre}>{item.mainText}</Text>

        {/* Badges ingrédients */}
        <View style={recetteStyle.ingredientsContainer}>
          {item.ingredientsPrincipaux.map((ingredient, index) => (
            <Text
              key={index}
              style={[
                recetteStyle.ingredientBadge,
                { backgroundColor: getIngredientColor(ingredient) },
              ]}
            >
              {ingredient}
            </Text>
          ))}
        </View>
      </View>

      {/* Badge Vegan en haut à droite */}
      {item.isVegan && (
        <Image source={require('./../../assets/vegan.jpg')} style={recetteStyle.badgeVegan} />
      )}
    </TouchableOpacity>
  );
};

export default RecetteComposant;
