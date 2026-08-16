import { StyleSheet } from 'react-native';
import { COULEURS } from '../../outils/constantes';

const ingredientModalStyle = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: COULEURS.secondary,
    padding: 15,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  closeButton: {
    padding: 5,
  },

  closeText: {
    fontSize: 22,
    fontWeight: 'bold',
  },

  searchInput: {
    backgroundColor: COULEURS.blanc,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },

  categoryContainer: {
    marginBottom: 15,
  },

  categoryTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },

  ingredientsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  ingredientButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 15,
    margin: 5,
  },

  selectedIngredient: {
    borderWidth: 2,
    borderColor: COULEURS.blanc,
    opacity: 0.7,
  },

  ingredientText: {
    color: COULEURS.blanc,
  },

  selectedIngredientText: {
    fontWeight: 'bold',
  },

  confirmButton: {
    position: 'absolute',
    bottom: 20,
    left: 15,
    right: 15,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },

  confirmButtonText: {
    color: COULEURS.blanc,
    fontWeight: 'bold',
    fontSize: 16,
  },

});

export default ingredientModalStyle;