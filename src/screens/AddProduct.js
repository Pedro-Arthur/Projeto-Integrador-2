import 'react-native-gesture-handler';
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView,
  StatusBar, TouchableOpacity, Modal, TextInput, ScrollView,
} from 'react-native';
import firebase from '@react-native-firebase/app';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';

export default function AddProduct({ navigation }) {

  //criação do modal, no momento em falso
  const [open, setOpen] = useState(false);

  //inicialização do firebase
  var firebaseConfig = {
    apiKey: "AIzaSyAyEsV5wInf2OSidNfZqwO6KSH5cFTqUD4",
    authDomain: "foodnow-787d2.firebaseapp.com",
    databaseURL: "https://foodnow-787d2.firebaseio.com",
    projectId: "foodnow-787d2",
    storageBucket: "foodnow-787d2.appspot.com",
    appId: "1:56864190172:android:14594d43472d849fc14e19",
    messagingSenderId: "56864190172",
  }
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  //constantes dos inputs
  const [type, setType] = useState('');
  const [name, setname] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [promotion, setPromotion] = useState('');
  const [pricePromotion, setPricePromotion] = useState('');
  const [amount, setAmount] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#f5872b" barStyle="light-content" />
      {/*botão para abrir o modal */}
      <TouchableOpacity
        onPress={() => setOpen(true)}
        style={styles.openModal}
      ><Icon name="plus" size={35} color="#FFF" />
      </TouchableOpacity>

      {/*início do modal */}
      <Modal
        animationType='slide'
        transparent={false}
        visible={open}
      >
        <ScrollView style={styles.modal}>
          <View style={styles.headerModal}>
            {/*botão pra retornar fora do modal*/}
            <TouchableOpacity
              onPress={() => setOpen(false)}
            ><Icon name="angle-left" size={35} color="#f5872b" onPress={() => setOpen(false)} style={{ marginLeft: 15 }}></Icon>
            </TouchableOpacity>
            <Text style={styles.titleModal}>Adicione um novo produto</Text>
          </View>

          <View style={styles.bodyModal}>
            <DropDownPicker
              items={[
                { label: 'Prato', value: 'Prato' },
                { label: 'Porções', value: 'Porções' },
                { label: 'Sobremesa', value: 'Sobremesa' },
                { label: 'Bebida', value: 'Bebida' },
              ]}
              placeholder={"Tipo do produto"}
              style={styles.inputName}
              dropDownStyle={{ backgroundColor: '#fff' }}
              value={type}
              onChangeItem={(type) => setType(type)}
            />

            <TextInput
              placeholder="Nome do produto"
              style={styles.inputName}
              value={name}
              onChangeText={(name) => setname(name)}
            >
            </TextInput>

            <TextInput
              placeholder="Descrição do produto"
              style={styles.inputDescribe}
              multiline={true}
              value={description}
              onChangeText={(description) => setDescription(description)}
            >
            </TextInput>

            <TextInput
              placeholder="Preço do produto"
              style={styles.inputName}
              keyboardType='numeric'
              value={price}
              onChangeText={(price) => setPrice(price)}
            >
            </TextInput>

            <DropDownPicker
              items={[
                { label: 'Sim', value: 'Sim' },
                { label: 'Não', value: 'Não' },
              ]}
              placeholder={"Promoção"}
              style={styles.inputName}
              dropDownStyle={{ backgroundColor: '#fff' }}
              value={promotion}
              onChangeItem={(promotion) => setPromotion(promotion)}
            />

            <TextInput
              placeholder="Preço na promoção"
              style={styles.inputName}
              keyboardType='numeric'
              value={pricePromotion}
              onChangeText={(pricePromotion) => setPricePromotion(pricePromotion)}
            >
            </TextInput>

            <TextInput
              placeholder="Quantidade do produto"
              style={styles.inputName}
              keyboardType='numeric'
              value={amount}
              onChangeText={(amount) => setAmount(amount)}
            >
            </TextInput>

            <TouchableOpacity style={styles.addItem} onPress={() => {
              setOpen(false);
              navigation.navigate('SelectImage', { name, description, price, promotion, pricePromotion, amount, type });
              //deixando os inputs vazios novamente
              setname('');
              setDescription('');
              setPrice('');
              setPricePromotion('');
              setAmount('');
            }
            } >
              <Text style={styles.addItemText}>CADASTRAR</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  modal: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleModal: {
    marginTop: 8,
    marginLeft: 12,
    paddingBottom: 10,
    fontSize: 28,
    color: '#f5872b',
  },
  headerModal: {
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  bodyModal: {
    marginTop: 14,
    margin: 20,
    justifyContent: 'center'
  },
  inputName: {
    marginLeft: 14,
    marginRight: 14,
    fontSize: 20,
    marginTop: 30,
    padding: 9,
    borderBottomWidth: 2,
    borderColor: '#f5872b',
    borderRadius: 7,
  },
  inputDescribe: {
    marginLeft: 14,
    marginRight: 14,
    fontSize: 20,
    marginTop: 20,
    height: 90,
    padding: 9,
    textAlignVertical: 'top',
    borderWidth: 2,
    borderColor: '#f5872b',
    borderRadius: 7,
  },
  addItem: {
    backgroundColor: '#f5872b',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 14,
    marginRight: 14,
    height: 50,
    borderRadius: 5,
  },
  addItemText: {
    fontSize: 18,
    color: "#fff",
  },
  openModal: {
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: '#0cc95f',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    right: 25,
    bottom: 25,
    elevation: 2,
  },
});