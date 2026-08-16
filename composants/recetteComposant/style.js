import { StyleSheet } from 'react-native';
import { COULEURS, PADDING, TEXT_SIZE } from '../../outils/constantes';

const recetteStyle = StyleSheet.create({

  container: {
  flexDirection: 'row',
  height: 100,
  backgroundColor: COULEURS.blanc,
  elevation: 5,
  marginTop: 10,
  borderRadius: 10,
  overflow: 'hidden',
},

image: {
  width: 100,
  height: '100%',
},

  description: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: 8,
  paddingVertical: 5,
},

  titre: {
  fontWeight: 'bold',
  fontSize: TEXT_SIZE.title - 2,
  textAlign: 'center',
  lineHeight: (TEXT_SIZE.title - 2) * 1.1,
},

  ingredientsContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 6,
},

  ingredientBadge: {
  color: COULEURS.blanc,
  paddingVertical: 3,
  paddingHorizontal: 7,
  borderRadius: 10,
  margin: 2,
  fontSize: 11,
  fontWeight: 'bold',
  textAlign: 'center',
},

  moreIngredients: {
    color: '#777',
    fontSize: 11,
    fontWeight: 'bold',
    margin: 3,
  },

  badgeVegan: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 30,
    height: 30,
    borderRadius: 12,
  },

});

export default recetteStyle;