//basuc
import React, { useState } from 'react';
import { View, Image, ScrollView, StyleSheet, Text, Dimensions } from 'react-native';
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
import { FirebaseDatabaseTypes } from '@react-native-firebase/database';

export default function UserArea({ navigation }) {
  const [name, setName] = useState('')

  // Logout de usuário.
  var user = firebase.auth().currentUser
  if (user != null) {
    var userId = user.uid
    database()
      .ref('/users/' + userId + '/name')
      .once('value')
      .then(snapshot => {
        setName(snapshot.val())
      });
  }

  return (
    <View style={style.container}>
      <ScrollView>
        <View style={style.name}>
          <Text style={style.nameUser}>Olá, {name}</Text>
          <Text style={style.questUser}>O que você quer comer?</Text>
        </View>
        <View style={style.contact}>
          <View style={style.circle}>
            <View style={style.inner}>
              <View style={style.circleIcon}>
                <Icon name={'map-marker'} size={35} style={style.icon} />
              </View>
            </View>
          </View>

          <View style={style.circle}>
            <View style={style.inner}>
              <View style={style.circleIcon}>
                <Icon name={'envelope'} size={35} style={style.icon} />
              </View>
            </View>
          </View>

          <View style={style.circle}>
            <View style={style.inner}>
              <View style={style.circleIcon}>
                <Icon name={'phone'} size={35} style={style.icon} />
              </View>
            </View>
          </View>

          <View style={style.circle}>
            <View style={style.inner}>
              <View style={style.circleIcon}>
                <Icon name={'comment'} size={35} style={style.icon} />
              </View>
            </View>
          </View>
        </View>

        <View style={style.boxTitle}>
          <HeaderTitle textTwo="Promoções" />
        </View>
        <View>
          <Promotion />
        </View>
      </ScrollView>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    width: '100%',
  },
  boxTitle: {
    marginLeft: 10,
  },
  // Bem vindo User
  name: {
    paddingTop: 30,
    paddingLeft: 15,
  },
  nameUser: {
    width: 300,
    fontWeight: 'bold',
    fontSize: 45,
    color: '#525563',
  },
  questUser: {
    fontSize: 20,
    color: '#919190',
  },
  scroll: {
    width: '100%',
  },
  image: {
    width,
    height: 250,
    resizeMode: 'cover',
  },
  pagination: {
    marginTop: -20,
    flexDirection: 'row',
    bottom: 0,
    alignSelf: 'center',
  },
  pagingText: {
    fontSize: width / 30,
    color: '#888',
    margin: 3,
  },
  pagingActiveText: {
    fontSize: width / 30,
    color: '#fff',
    margin: 3,
  },

  //Products
  boxProducts: {
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
    height: '80%',
    borderWidth: 5,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  TextProducts: {
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

  //contato
  contact: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    marginTop: '8%',
    margin: 21,
  },
  circleIcon: {
    backgroundColor: 'rgba(245, 135, 42, 0.25)',
    width: 65,
    height: 65,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    opacity: 1,
    color: '#f5872b',
  },
})
