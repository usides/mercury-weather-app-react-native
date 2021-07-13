import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import WeatherCard from './WeatherCard';

const CardsRow = ({ cardsData, changeForecastToShow }) => {
  return (
    <View style={styles.row}>
      <TouchableOpacity
        style={styles.rowButtonLeft}
        onPress={() => changeForecastToShow('left')}
      ></TouchableOpacity>
      {cardsData.map(({ date, icon, temp }) => (
        <WeatherCard key={date} date={date} icon={icon} temp={temp} />
      ))}

      <TouchableOpacity
        style={styles.rowButtonRight}
        onPress={() => changeForecastToShow('right')}
      ></TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  rowButtonLeft: {
    position: 'absolute',
    left: 0,
    top: '10%',
    backgroundColor: 'transparent',
    width: '50%',
    height: '90%',
    zIndex: 10,
  },
  rowButtonRight: {
    position: 'absolute',
    right: 0,
    top: '10%',
    backgroundColor: 'transparent',
    zIndex: 10,
    width: '50%',
    height: '90%',
  },
  rowImg: {
    width: 25,
    height: 25,
  },
});

export default CardsRow;
