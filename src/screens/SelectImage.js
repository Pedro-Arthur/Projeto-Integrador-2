import React, { useState } from 'react';
import {
  View, SafeAreaView, Text, TouchableOpacity,
  StyleSheet, Platform, Image,
} from 'react-native';
import * as Progress from 'react-native-progress';
import ImagePicker from 'react-native-image-picker';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export default function SelectImage({ route, navigation }) {

  //inicializando o firebase
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

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  //função que da as especificações do Image-Picker
  const selectImage = () => {
    const options = {
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    //abrindo Image-Picker
    ImagePicker.launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log(source);
        setImage(source);
      }
    });
  };

  //chamando os params da outra página
  const { name, description, price, promotion, pricePromotion, amount, type } = route.params;

  //função que faz o upload
  async function uploadImage() {
    const { uri } = image;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'android' ? uri.replace('file://', '') : uri;
    setUploading(true);
    setTransferred(0);
    const task = storage()
      .ref('productImages//' + filename)
      .putFile(uploadUri);
    //barra de progresso
    task.on('state_changed', snapshot => {
      setTransferred(
        Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
      );
    });
    try {
      await task;
    } catch (e) {
      console.error(e);
    }
    setUploading(false);
    setImage(null);

    const imageURL = await storage()
      .ref('productImages//' + filename)
      .getDownloadURL();

    //insere os dados no firestore
    firestore().collection('Foods').add(
      {
        name: name,
        description: description,
        price: price,
        promotion: promotion.value,
        pricePromotion: pricePromotion,
        amount: amount,
        type: type.value,
        image: imageURL,
      }
    ).then(() => {
      alert('Produto cadastrado com sucesso!');
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Escolha uma imagem</Text>
      <Text style={styles.title}>para seu produto</Text>
      <TouchableOpacity style={styles.selectButton} onPress={selectImage}>
        <Text style={styles.buttonText}>Escolher</Text>
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        {image !== null ? (
          <Image source={{ uri: image.uri }} style={styles.imageBox} />
        ) : null}
        {uploading ? (
          <View style={styles.progressBarContainer}>
            <Progress.Bar progress={transferred} width={300} />
          </View>
        ) : (
            <TouchableOpacity style={styles.uploadButton} onPress={() => {
              uploadImage();
              navigation.navigate('AddProduct');
            }
            }>
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
          )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    marginLeft: 12,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f5872b',
  },
  selectButton: {
    borderRadius: 5,
    width: 250,
    height: 50,
    backgroundColor: '#00fa9a',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  uploadButton: {
    borderRadius: 5,
    width: 250,
    height: 50,
    backgroundColor: '#b0c4de',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageContainer: {
    marginTop: 30,
    marginBottom: 50,
    alignItems: 'center',
  },
  progressBarContainer: {
    marginTop: 20,
  },
  imageBox: {
    width: 300,
    height: 300,
  }
});