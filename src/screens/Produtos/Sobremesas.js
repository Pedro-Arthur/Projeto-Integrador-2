import React from 'react';
import { View, StatusBar, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Title from '../../components/Title';
import ListProductSobremesa from '../../components/ListProductSobremesa';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';

export default function bebidas({ navigation }) {
  return (
    <View>
      <ScrollView>
        <View style={style.container}>
          <Icon name={'angle-left'} onPress={() => navigation.goBack()} size={35} color="#555" />
          <Title textTwo="Sobremesas" />
          <ListProductSobremesa />
        </View>
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    marginTop: 10,
    marginHorizontal: 5,
  },
});