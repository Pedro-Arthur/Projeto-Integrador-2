import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class HeaderTitle extends Component {
  render() {
    return (
      <View style={styles.header}>
        <Text style={styles.titleTwo}>{this.props.textTwo}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleTwo: {
    marginVertical: 8,
    fontSize: 45,
    fontWeight: 'bold',
    color: '#f5872b',
  },
});