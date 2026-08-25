import { StyleSheet } from "react-native";
import { COULEURS, PADDING } from "../../outils/constantes";

const recetteStyle = StyleSheet.create({
  verticalFLatlist: {
    backgroundColor: COULEURS.secondary,
    paddingHorizontal: PADDING.horizontal,
    paddingVertical: PADDING.vertical
  },
  boutonAjouter: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#05a565',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',

    marginHorizontal: PADDING.horizontal,
    marginVertical: 15,

    paddingHorizontal: 15,
    height: 50,

    backgroundColor: '#FFFFFF',
    borderRadius: 25,

    elevation: 3,
  },

  searchInput: {
    flex: 1,

    marginLeft: 10,

    fontSize: 16,
    color: '#333',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: PADDING.horizontal,
    marginVertical: 10,
  },

  filterButton: {
    width: 50,
    height: 50,

    marginLeft: 10,

    backgroundColor: '#FFFFFF',
    borderRadius: 25,

    justifyContent: 'center',
    alignItems: 'center',

    elevation: 3,
  },
})

export default recetteStyle