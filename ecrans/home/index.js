import { View, Text, ScrollView, Image, FlatList, TouchableOpacity } from 'react-native'
import dashBoardStyles from './style'
import { FakeRecettes } from '../../fakeData/fakeRecettes'
import { images } from '../../fakeData/fakeImages';
import { FakeQuotes } from '../../fakeData/fakeQuotes';
import HeaderComposant from '../../composants/headerComposant';
import DerniereRecetteComposant from '../../composants/dernieresRecettesComposant';



const Dashboard = () => {

  const randomQuote = FakeQuotes[Math.floor(Math.random() * FakeQuotes.length)];

  return (
    <ScrollView>
      {/* Debut header */}
      <HeaderComposant />
      {/* Fin header */}
      <Image source={require('./../../assets/image_cuisine.jpg')} style={dashBoardStyles.imageCuisine}></Image>
      {/* Debut recettes */}
      <View>
        <Text style={dashBoardStyles.titre}>Les dernières recettes</Text>
        <FlatList
          data={FakeRecettes}
          keyExtractor={item => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={dashBoardStyles.horizontalFlatList}
          renderItem={({ item }) => {
            return (
              <DerniereRecetteComposant item={item}/>
            )
          }} />
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