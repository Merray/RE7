import { StyleSheet } from 'react-native';
import { COULEURS, PADDING } from '../../outils/constantes';

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: COULEURS.secondary,
    paddingHorizontal: PADDING.horizontal,
    paddingTop: 50,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },

  input: {
    backgroundColor: COULEURS.blanc,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    fontSize: 16,
  },

  button: {
    backgroundColor: COULEURS.main,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 15,
  },

  buttonText: {
    color: COULEURS.blanc,
    fontSize: 18,
    fontWeight: 'bold',
  },

});

export default styles;