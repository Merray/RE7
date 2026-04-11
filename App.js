import { View, Text, StyleSheet } from 'react-native';
import Routes from './routes';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  return (
      <View style={styles.container}>
        <Routes />
      </View>
  );
};

export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop : 45,
    backgroundColor: 'rgba(174, 177, 174, 0.52)'
  },
});

