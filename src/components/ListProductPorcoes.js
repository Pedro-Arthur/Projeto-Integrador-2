import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native';

export default function ListProductSobremesa() {
    const [listFood, setListFood] = useState([]);
    const navigation = useNavigation();
    useEffect(() => {
        const subscriber = firestore()
            .collection('Foods')
            .where('type', '==', 'Porções')
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
                    }} style={styles.boxProducts}>

                        <View style={styles.card}>
                            <View style={styles.cardImg}>
                                <Image source={{ uri: item.image }} style={styles.ImageProducts}>
                                </Image>
                            </View>
                            <View style={styles.TextProducts}>
                                <Text style={styles.NameProducts}>{item.name}</Text>
                                <Text style={styles.descriptionMenu}>{item.description}</Text>
                                <Text style={styles.valueMenu}>R${item.price}</Text>
                                <Text style={styles.valueMenuValid}>R${item.pricePromotion}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    //Products
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