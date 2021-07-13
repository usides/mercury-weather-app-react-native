import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const WeatherCard = ({ date, icon, temp }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardDate}>{date}</Text>
      <Image fadeDuration={0} style={styles.cardImg} source={{ uri: icon }} />
      <Text style={styles.cardTemp}>{temp}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    justifyContent: 'space-between',
    backgroundColor: `#373af5`,
    borderRadius: 8,
    color: `#fff`,
    padding: 25,
    marginTop: 18,
    flex: 1,
  },
  cardImg: {
    alignSelf: 'center',
    width: 100,
    height: 100,
  },
  cardDate: {
    textAlign: 'left',
    fontFamily: 'Ubuntu_700Bold',
    fontSize: 16,
    color: '#fff',
  },
  cardTemp: {
    fontSize: 32,
    textAlign: 'right',
    fontFamily: 'Ubuntu_700Bold',
    color: '#fff',
  },
});

export default WeatherCard;
