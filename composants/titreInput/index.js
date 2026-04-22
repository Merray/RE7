import { View, Text, TextInput, StyleSheet } from 'react-native';
import titreInputStyles from './style';

const TitreInput = ({ titre, placeholder, value = '', onChangeText }) => {
  return (
    <View style={titreInputStyles.container}>
      <Text style={titreInputStyles.label}>{titre}</Text>
      <TextInput
        style={titreInputStyles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default TitreInput;