import { View, Text, ScrollView, Image, FlatList, TouchableOpacity } from 'react-native'
import dashBoardStyles from './style'
import { FakeRecettes } from '../../fakeData/fakeRecettes'
import { images } from '../../fakeData/fakeImages';
import { FakeQuotes } from '../../fakeData/fakeQuotes';
import HeaderComposant from '../../composants/headerComposant';
import DerniereRecetteComposant from '../../composants/dernieresRecettesComposant';
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';



const Dashboard = () => {

  const randomQuote = FakeQuotes[Math.floor(Math.random() * FakeQuotes.length)];
  const [recettes, setRecettes] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('recettes')
      .orderBy('createdAt', 'desc') // 🔥 les plus récentes
      .limit(4) // 🔥 seulement 4
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

  return (
    <ScrollView>
      {/* Debut header */}
      <HeaderComposant />
      {/* Fin header */}
      <Image source={require('./../../assets/image_cuisine.jpg')} style={dashBoardStyles.imageCuisine}></Image>
      {/* Debut recettes */}
      <View>
        <Text style={dashBoardStyles.titre}>Les dernières recettes</Text>

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
            renderItem={({ item }) => {
              return (
                <DerniereRecetteComposant item={{
                ...item,
                mainText: item.nom,
                img: item.image,
                subText: item.description
              }} />
              );
            }}
          />
        )}
      </View>
      {/* Fin recettes */}

      {/* Début citation */}
      <View style={dashBoardStyles.quoteCard}>
        <Text style={dashBoardStyles.quoteText}>{randomQuote}</Text>
      </View>
      {/* Fin citation */}
    </ScrollView>
  )
}

export default Dashboard