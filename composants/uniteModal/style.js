import { StyleSheet } from 'react-native';
import { COULEURS, TEXT_SIZE } from '../../outils/constantes';

const styles = StyleSheet.create({

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: 20,
  },

  modal: {
    backgroundColor: COULEURS.blanc,
    borderRadius: 20,
    padding: 20,
    maxHeight: '70%',
  },

  title: {
    fontSize: TEXT_SIZE.title,
    fontWeight: 'bold',
    color: COULEURS.main,
    textAlign: 'center',
    marginBottom: 15,
  },

  option: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  optionText: {
    fontSize: TEXT_SIZE.secondary,
    textAlign: 'center',
    color: COULEURS.noir,
  },

  closeButton: {
    marginTop: 15,
    backgroundColor: COULEURS.main,
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
  },

  closeButtonText: {
    color: COULEURS.blanc,
    fontWeight: 'bold',
    fontSize: TEXT_SIZE.secondary,
  },

});

export default styles;