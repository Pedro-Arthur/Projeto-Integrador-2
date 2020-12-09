import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

export default function AdminArea({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Área do administrador</Text>

      <View style={styles.btn}>
        <Button
          title="Perfil"
          onPress={() => navigation.navigate('Profile')}
        />
      </View>

      <View style={styles.btn}>
        <Button
          title="Adicionar Produto"
          onPress={() => navigation.navigate('AddProduct')}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    paddingBottom: 50,
  },
  btn: {
    marginBottom: 20,
  }
})