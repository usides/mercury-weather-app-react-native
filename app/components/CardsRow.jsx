import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import WeatherCard from './WeatherCard';

const CardsRow = ({ cardsData, changeForecastToShow }) => {
  return (
    <View style={styles.row}>
      <TouchableOpacity
        style={[styles.rowButton, styles.rowButtonLeft]}
        onPress={() => changeForecastToShow('left')}
      ></TouchableOpacity>
      {cardsData.map(({ date, icon, temp }) => (
        <WeatherCard key={date} date={date} icon={icon} temp={temp} />
      ))}

      <TouchableOpacity
        style={[styles.rowButton, styles.rowButtonRight]}
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
  rowButton: {
    position: 'absolute',
    top: '10%',
    backgroundColor: 'transparent',
    width: '50%',
    height: '90%',
    zIndex: 10,
  },
  rowButtonLeft: {
    left: 0,
  },
  rowButtonRight: {
    right: 0,
  },
  rowImg: {
    width: 25,
    height: 25,
  },
});

export default CardsRow;
