//basuc
import React, { useState, useEffect } from 'react';
import { View, Image, ScrollView, StyleSheet, Text, Dimensions, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

//Components
import HeaderTitle from '../components/HeaderTitle';
import Promotion from '../components/Promotion';
//setando tamanho
const { width } = Dimensions.get('window')
const height = width * 0.6 //60%

//firebase
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import Title from '../components/Title';
import { FirebaseDatabaseTypes } from '@react-native-firebase/database';

export default function UserArea({ route, navigation }) {
  const { name, price, pricePromotion, description } = route.params;
  const [cart, setCart] = useState([]);
  const [bagTotal, setbagTotal] = useState([{ namee: 'dasdada', price: 'macaraao', pricePromotion: 'carne', description: 'alface' }]);
  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          {bagTotal.map((item, index) => (
            <View key={index} style={styles.boxProducts}>
              <View style={styles.card}>
                <View style={styles.cardImg}>
                  <Image source={{ uri: item.image }} style={styles.ImageProducts}>
                  </Image>
                </View>
                <View style={styles.TextProducts}>
                  <Text style={styles.NameProducts}>{item.namee}</Text>
                  <Text style={styles.descriptionMenu}>{item.description}</Text>
                  <Text style={styles.valueMenu}>R${item.price}</Text>
                  <Text style={styles.valueMenuValid}>R${item.pricePromotion}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginHorizontal: 5,
  },
  boxProducts: {
    marginBottom: 15,
    borderWidth: 0.5,
    borderRadius: 8,
    backgroundColor: '#eee',
    borderColor: '#dddddd'
  },
  card: {
    flexDirection: 'row',
    flex: 1,
  },
  cardImg: {
    flex: 1,
  },
  ImageProducts: {
    width: '90%',
    height: '100%',
    borderWidth: 5,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  TextProducts: {
    paddingVertical: 5,
    flex: 1,
  },
  NameProducts: {
    fontWeight: 'bold',
    color: '#f5872b',
    fontSize: 20,
  },
  descriptionMenu: {
    paddingTop: 10,
    height: 55,
    textAlign: 'justify',
    width: '90%',
    color: '#919190',
  },
  valueMenu: {
    fontSize: 15,
    paddingTop: 10,
    textDecorationLine: 'line-through',
    color: '#d2d2d2',
  },
  valueMenuValid: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingTop: 2,
    color: '#f5872b',
  },
});