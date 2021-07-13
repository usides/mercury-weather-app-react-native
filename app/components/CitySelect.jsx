import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { StyleSheet, View } from 'react-native';
import cities from '../api/city_config';

const CitySelect = ({ selectCity }) => {
  const citiesArray = Object.keys(cities);
  const [selectedValue, setSelectedValue] = useState(0);
  const values = ['Select city', ...citiesArray];

  const handleOptionClick = (itemValue) => {
    setSelectedValue(itemValue);
    selectCity(itemValue);
  };

  return (
    <View style={styles.pickerWrap}>
      <Picker
        style={selectedValue === 0 ? styles.pickerGrey : styles.pickerBlue}
        selectedValue={selectedValue}
        onValueChange={handleOptionClick}
      >
        {values
          .filter((item, index) =>
            selectedValue === 0 ? item : index === 0 ? false : item,
          )
          .map((item, index) => (
            <Picker.Item
              label={item}
              value={item}
              key={index}
              style={item === 'Select city' ? styles.selectCity : styles.item}
            />
          ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerWrap: {
    padding: 13,
    backgroundColor: '#f8f8fa',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'rgba(128, 131, 164, 0.2)',
    marginTop: 20,
  },
  pickerGrey: {
    color: '#8083a4',
  },
  pickerBlue: {
    color: '#2c2d76',
  },
  item: {
    color: '#2c2d76',
    fontSize: 20,
  },
  selectCity: {
    color: '#8083a4',
    fontSize: 20,
  },
});

export default CitySelect;
