import { StyleSheet } from 'react-native';
import { COULEURS, PADDING, TEXT_SIZE } from '../../outils/constantes';

export default StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: COULEURS.main,
  },

  contentContainer: {
    padding: PADDING.horizontal,
    paddingBottom: 30,
  },

  titre: {
    fontSize: TEXT_SIZE.title,
    fontWeight: 'bold',
    color: COULEURS.secondary,
    textAlign: 'center',
    marginVertical: 20,
  },

  photoContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },

  photoProfil: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 4,
    borderColor: COULEURS.secondary,
  },

  card: {
    backgroundColor: COULEURS.blanc,
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,

    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },

  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#777',
    marginBottom: 8,
  },

  valeur: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COULEURS.secondary,
  },

  accroche: {
    fontSize: 20,
    fontStyle: 'italic',
    color: '#666',
  },

  nombreRecettes: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COULEURS.secondary,
  },

  message: {
    fontSize: 18,
    color: '#777',
    textAlign: 'center',
    marginTop: 40,
  },

});