import { StyleSheet } from "react-native";
import { COULEURS, PADDING, TEXT_SIZE } from "../../outils/constantes";

const titreInputStyles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: TEXT_SIZE.title,
    fontWeight: 'bold',
    color: COULEURS.noir,
    marginBottom: 5,
  },
  input: {
    color: COULEURS.noir,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: PADDING.horizontal,
    fontSize: TEXT_SIZE.secondary,
    backgroundColor: COULEURS.blanc,
  },
});

export default titreInputStyles;