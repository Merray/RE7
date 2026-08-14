import { StyleSheet } from 'react-native';
import { COULEURS, PADDING } from '../../outils/constantes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COULEURS.secondary,
    padding: PADDING.horizontal,
    justifyContent: 'center',
  },

  titre: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },

  input: {
    backgroundColor: COULEURS.blanc,
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#000',
  },

  bouton: {
    backgroundColor: '#05a565',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },

  boutonTexte: {
    color: COULEURS.blanc,
    fontSize: 18,
    fontWeight: 'bold',
  },

  erreur: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default styles;