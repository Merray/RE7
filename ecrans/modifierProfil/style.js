import { StyleSheet } from 'react-native';
import { COULEURS, PADDING, TEXT_SIZE } from '../../outils/constantes';

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },

    contentContainer: {
        paddingHorizontal: PADDING.horizontal,
        paddingBottom: 40,
    },

    titre: {
        fontSize: TEXT_SIZE.title,
        fontWeight: 'bold',
        color: COULEURS.main,
        textAlign: 'center',
        marginVertical: 25,
    },

    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555',
        marginTop: 15,
        marginBottom: 8,
    },

    input: {
        backgroundColor: COULEURS.blanc,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
        color: '#333',
        elevation: 2,
    },

    inputAccroche: {
        minHeight: 120,
        textAlignVertical: 'top',
    },

    compteur: {
        textAlign: 'right',
        marginTop: 5,
        color: '#888',
        fontSize: 12,
    },

    bouton: {
        marginTop: 30,
        backgroundColor: COULEURS.main,
        paddingVertical: 15,
        borderRadius: 15,
        alignItems: 'center',
        elevation: 5,
    },

    boutonDesactive: {
        opacity: 0.6,
    },

    boutonTexte: {
        color: COULEURS.blanc,
        fontSize: 17,
        fontWeight: 'bold',
    },

    loading: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    photoContainer: {
        alignSelf: 'center',
        width: 130,
        height: 130,
        borderRadius: 65,
        overflow: 'hidden',
        marginTop: 10,
        marginBottom: 15,
        elevation: 4,
        backgroundColor: '#eee',
    },

    photoProfil: {
        width: '100%',
        height: '100%',
    },

    boutonPhoto: {
        alignSelf: 'center',
        backgroundColor: COULEURS.bleu,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginBottom: 30,
        elevation: 3,
    },

    boutonPhotoTexte: {
        color: COULEURS.blanc,
        fontWeight: 'bold',
        fontSize: TEXT_SIZE.secondary,
    },

});

export default styles;