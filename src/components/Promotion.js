import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native';

export default function Promotion() {
  const [listFood, setListFood] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    const subscriber = firestore()
      .collection('Foods')
      .where('promotion', '==', 'Sim')
      .onSnapshot(querySnapshot => {
        const listFood = [];
        querySnapshot.forEach(documentSnapshot => {
          listFood.push({
            ...documentSnapshot.data(),
          });
        });
        setListFood(listFood);
      });
    return () => subscriber();
  }, []);
  return (
    <View>
      <FlatList
        horizontal
        data={listFood}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => {
            navigation.navigate('Descriptions', {
              name: item.name,
              description: item.description,
              price: item.price,
              pricePromotion: item.pricePromotion,
              image: item.image
            });
          }} style={style.boxProducts}>
            <View style={{ flex: 2 }}>
              <Image source={{ uri: item.image }} style={style.ImageProducts}></Image>
            </View>
            <View style={style.TextProducts}>
              <Text style={style.NameProducts}>{item.name}</Text>
              <Text style={style.descriptionMenu}>{item.description}</Text>
              <Text style={style.valueMenu}>R${item.price}</Text>
              <Text style={style.valueMenuValid}>R${item.pricePromotion}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
const style = StyleSheet.create({
  scroll: {
    width: '100%',
  },
  //Products
  boxProducts: {
    flexDirection: 'column',
    height: 350,
    width: 250,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 15,
    borderWidth: 0.5,
    borderRadius: 8,
    backgroundColor: '#eee',
    borderColor: '#dddddd',
  },
  ImageProducts: {
    width: '100%',
    height: '70%',
    borderWidth: 5,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  TextProducts: {
    marginTop: '-33%',
    justifyContent: 'center',
    flex: 1,
    paddingLeft: 10,
  },
  NameProducts: {
    paddingLeft: 10,
    fontWeight: 'bold',
    color: '#f5872b',
    fontSize: 22,
  },
  descriptionMenu: {
    paddingLeft: 10,
    paddingTop: 10,
    height: 45,
    textAlign: 'justify',
    width: '90%',
    color: '#919190',
  },
  valueMenu: {
    paddingTop: 10,
    paddingLeft: 10,
    textDecorationLine: 'line-through',
    color: '#d2d2d2',
  },
  valueMenuValid: {
    fontWeight: 'bold',
    fontSize: 15,
    paddingTop: 2,
    paddingLeft: 10,
    color: '#f5872b',
  },
})