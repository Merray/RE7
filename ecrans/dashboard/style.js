import { StyleSheet } from "react-native";
import {
  COULEURS,
  PADDING,
  TEXT_SIZE
} from "../../outils/constantes";


const dashBoardStyles = StyleSheet.create({

  imageCuisine: {
    width: 420,
    height: 300,
  },


  titre: {
    paddingHorizontal: PADDING.horizontal,
    paddingVertical: PADDING,
    marginTop: 15,
    fontSize: TEXT_SIZE.title,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
  },


  horizontalFlatList: {
    paddingHorizontal: PADDING.horizontal,
    paddingVertical: PADDING.vertical,
  },


  // ==========================================
  // RECETTE DU MOMENT
  // ==========================================

  recetteMomentCard: {
    marginHorizontal: PADDING.horizontal,
    marginTop: 5,
    marginBottom: 10,
    backgroundColor: COULEURS.blanc,
    borderRadius: 18,
    overflow: 'hidden',
    elevation: 5,
  },


  recetteMomentImage: {
    width: '100%',
    height: 200,
  },


  recetteMomentContent: {
    padding: 15,
  },


  recetteMomentTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COULEURS.main,
    marginBottom: 8,
  },


  recetteMomentDescription: {
    fontSize: TEXT_SIZE.secondary,
    color: '#666',
    lineHeight: 20,
    marginBottom: 15,
  },


  recetteMomentButton: {
    backgroundColor: COULEURS.main,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },


  recetteMomentButtonText: {
    color: COULEURS.blanc,
    fontSize: TEXT_SIZE.secondary,
    fontWeight: 'bold',
  },


  recetteMomentChangeButton: {
    marginTop: 10,
    paddingVertical: 8,
    alignItems: 'center',
  },


  recetteMomentChangeText: {
    color: COULEURS.main,
    fontWeight: 'bold',
    fontSize: 14,
  },


  // ==========================================
  // CITATION
  // ==========================================

  quoteCard: {
    margin: 16,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },


  quoteText: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#555',
  },


  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
    fontSize: 14,
  },

});


export default dashBoardStyles;