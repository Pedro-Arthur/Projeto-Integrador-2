import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Title from '../../components/Title';
import ListProduct from '../../components/ListProduct';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function bebidas({ navigation: { goBack } }) {
  return (
    <View>
      <ScrollView>
        <View style={style.container}>
          <Icon name={'angle-left'} onPress={() => goBack()} size={35} color="#555" />
          <Title textTwo="Bebidas" />
          <ListProduct />
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

