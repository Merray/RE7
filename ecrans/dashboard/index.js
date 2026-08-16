import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import { useEffect, useState } from 'react';

import firestore from '@react-native-firebase/firestore';

import dashBoardStyles from './style';

import { FakeQuotes } from '../../fakeData/fakeQuotes';

import HeaderComposant from '../../composants/headerComposant';
import DerniereRecetteComposant from '../../composants/dernieresRecettesComposant';

import { mapRecetteForNavigation } from '../../outils/recetteMapper';


const Dashboard = ({ navigation }) => {

  const [randomQuote] = useState(
  () => FakeQuotes[Math.floor(Math.random() * FakeQuotes.length)]
);

  const [recettes, setRecettes] = useState([]);
  const [toutesLesRecettes, setToutesLesRecettes] = useState([]);
  const [recetteDuMoment, setRecetteDuMoment] = useState(null);


  // Récupération des dernières recettes
  useEffect(() => {

    const unsubscribe = firestore()
      .collection('recettes')
      .orderBy('createdAt', 'desc')
      .limit(5)
      .onSnapshot(querySnapshot => {

        const data = [];

        querySnapshot.forEach(doc => {

          data.push({
            id: doc.id,
            ...doc.data(),
          });

        });

        setRecettes(data);

      });

    return () => unsubscribe();

  }, []);


  // Récupération de toutes les recettes
  useEffect(() => {

    const unsubscribe = firestore()
      .collection('recettes')
      .onSnapshot(querySnapshot => {

        const data = [];

        querySnapshot.forEach(doc => {

          data.push({
            id: doc.id,
            ...doc.data(),
          });

        });

        setToutesLesRecettes(data);

      });

    return () => unsubscribe();

  }, []);


  // Choisir une recette aléatoire
  const choisirRecetteAleatoire = () => {

    if (toutesLesRecettes.length === 0) {
      return;
    }

    const index = Math.floor(
      Math.random() * toutesLesRecettes.length
    );

    setRecetteDuMoment(
      toutesLesRecettes[index]
    );

  };


  // Première sélection de la recette du moment
  useEffect(() => {

    if (
      toutesLesRecettes.length > 0 &&
      recetteDuMoment === null
    ) {

      choisirRecetteAleatoire();

    }

  }, [toutesLesRecettes]);


  return (
    <ScrollView>

      {/* HEADER */}
      <HeaderComposant navigation={navigation} />


      {/* IMAGE */}
      <Image
        source={require('./../../assets/image_cuisine.jpg')}
        style={dashBoardStyles.imageCuisine}
      />


      {/* DERNIÈRES RECETTES */}
      <View>

        <Text style={dashBoardStyles.titre}>
          Les dernières recettes
        </Text>

        {recettes.length === 0 ? (

          <Text style={dashBoardStyles.emptyText}>
            Aucune recette pour le moment 👨‍🍳
          </Text>

        ) : (

          <FlatList
            data={recettes}
            keyExtractor={item => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={dashBoardStyles.horizontalFlatList}
            renderItem={({ item }) => (
              <DerniereRecetteComposant
                item={item}
              />
            )}
          />

        )}

      </View>


      {/* RECETTE DU MOMENT */}
      <View>

        <Text style={dashBoardStyles.titre}>
          La recette du moment
        </Text>

        {recetteDuMoment && (

          <View style={dashBoardStyles.recetteMomentCard}>

            {/* IMAGE */}
            <Image
              source={{
                uri: recetteDuMoment.image,
              }}
              style={dashBoardStyles.recetteMomentImage}
            />


            {/* INFORMATIONS */}
            <View style={dashBoardStyles.recetteMomentContent}>

              <Text
                style={dashBoardStyles.recetteMomentTitle}
                numberOfLines={2}
              >
                {recetteDuMoment.nom}
              </Text>

              <Text
                style={dashBoardStyles.recetteMomentDescription}
                numberOfLines={3}
              >
                {recetteDuMoment.description}
              </Text>


              {/* BOUTON DECOUVRIR */}
              <TouchableOpacity
                style={dashBoardStyles.recetteMomentButton}
                onPress={() =>
                  navigation.navigate(
                    'recetteDetail',
                    {
                      recette:
                        mapRecetteForNavigation(
                          recetteDuMoment
                        ),
                    }
                  )
                }
              >

                <Text
                  style={dashBoardStyles.recetteMomentButtonText}
                >
                  Découvrir la recette →
                </Text>

              </TouchableOpacity>


              {/* NOUVEAU TIRAGE */}
              <TouchableOpacity
                style={
                  dashBoardStyles.recetteMomentChangeButton
                }
                onPress={choisirRecetteAleatoire}
              >

                <Text
                  style={
                    dashBoardStyles.recetteMomentChangeText
                  }
                >
                  Une autre recette
                </Text>

              </TouchableOpacity>

            </View>

          </View>

        )}

      </View>


      {/* CITATION */}
      <View style={dashBoardStyles.quoteCard}>

        <Text style={dashBoardStyles.quoteText}>
          {randomQuote}
        </Text>

      </View>

    </ScrollView>
  );
};


export default Dashboard;