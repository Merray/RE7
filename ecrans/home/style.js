import { StyleSheet } from "react-native";
import { COULEURS, PADDING, TEXT_SIZE } from "../../outils/constantes";

const dashBoardStyles = StyleSheet.create({
    imageCuisine: {
        width: 420,
        height: 300
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
        paddingVertical: PADDING.vertical
    },
    
    quoteCard: {
  margin: 16,
  padding: 16,
  backgroundColor: '#f9f9f9',
  borderRadius: 12,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
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
});

export default dashBoardStyles;