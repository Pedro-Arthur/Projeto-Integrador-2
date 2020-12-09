import React, { Component, useState, useEffect } from 'react';
import { View, Image, ScrollView, StyleSheet, Text, TouchableOpacity, FlatList, ImageBackground } from 'react-native';
import NumericInput from 'react-native-numeric-input'
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Descriptions({ route, navigation }) {
  const { name, price, pricePromotion, description, image, quant } = route.params;
  const bag = [{ name }, { price }, { pricePromotion }, { description }, { image }];
  // Adiciona o segundo array no primeiro
  // Equivalente a vegetais.push('aipo', 'beterraba');

  return (
    <View style={styles.container}>
      <View style={styles.boxProducts}>
        <ImageBackground source={{ uri: image }} style={styles.img}>
          <Icon name={'angle-left'} onPress={() => navigation.goBack()} size={35} style={styles.Icon} color="#555" />
        </ImageBackground>
        <View style={styles.descriptionProduct}>
          <Text style={styles.titleProduct}>{(name)}</Text>
          <Text style={styles.valueMenu}>{(price)}</Text>
          <Text style={styles.valueMenuValid}>R${(pricePromotion)}</Text>
          <Text style={styles.descriptio}>{(description)}</Text>
          <NumericInput
            totalWidth={150}
            totalHeight={50}
            iconSize={25}
            step={1}
            minValue={0}
            maxValue={quant}
            valueType='real'
            rounded
            borderColor='#f5872b'
            textColor='#f5872b'
            iconStyle={{ color: 'white' }}
            rightButtonBackgroundColor='#f5872b'
            leftButtonBackgroundColor='#f5872b'
          />
        </View>
      </View>
      <View style={styles.btns}>
        <View style={styles.favorite}>
          <TouchableOpacity onPress={() => { navigation.navigate('DeliveryAddress') }} style={styles.cart}>
            <View>
              <Text style={styles.cartText}>ADICIONAR</Text>
            </View>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  Icon: {
    marginTop: 10,
    marginHorizontal: 5,
  },
  boxProducts: {
    marginBottom: 15,
    borderWidth: 0.5,
    borderRadius: 8,
    width: '100%',
    backgroundColor: '#eee',
    borderColor: '#dddddd'
  },
  container: {
    backgroundColor: "#fff",
    flex: 1,
    width: '100%',
    flexDirection: 'row',
  },
  //Products
  img: {
    height: 300,
    width: '100%',
  },
  ImageProducts: {
    height: '100%',
    width: '100%',
  },
  descriptionProduct: {
    height: '100%',
    backgroundColor: "#fff",
    paddingVertical: 35,
    paddingHorizontal: 10,
    borderColor: '#fff',
    marginTop: -40,
    borderWidth: 5,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  titleProduct: {
    paddingBottom: 10,
    fontWeight: 'bold',
    color: '#f5872b',
    fontSize: 40,
  },
  descriptio: {
    marginTop: 15,
    fontSize: 15,
    marginBottom: 15,
    textAlign: 'justify',
    color: '#919190',
  },
  valueMenu: {
    textDecorationLine: 'line-through',
    color: '#d2d2d2',
    fontSize: 18,
  },
  valueMenuValid: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#f5872b',
    marginBottom: 10,
  },
  btns: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    position: 'absolute',
    flexDirection: 'row',
  },
  favorite: {
    marginRight: 10,
  },
  cart: {
    backgroundColor: '#f5872b',
    color: '#fff',
    alignItems: 'center',
    width: '100%',
    marginLeft: 8,
    height: 60,
    borderRadius: 10,
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  cartText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  icon: {
    color: "#fff",
  },
});