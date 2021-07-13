import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const DateSelect = ({ selectDate }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedValue, setSelectedValue] = useState('Select date');

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    date.setHours(0, 0, 0, 0);
    const timeZoneOffsetMs = date.getTimezoneOffset() * 60 * 1000 * -1;
    const selectedDt = date.getTime() + timeZoneOffsetMs;
    const selectedDtDate = new Date(selectedDt);
    const selectedDtString = `${selectedDtDate.getUTCDate()}/${
      selectedDtDate.getUTCMonth() + 1
    }/${selectedDtDate.getUTCFullYear()}`;
    setSelectedValue(selectedDtString);
    selectDate(selectedDt / 1000);
    hideDatePicker();
  };

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() - 1);

  const minDate = new Date();
  minDate.setDate(minDate.getDate() - 5);

  return (
    <View>
      <TouchableOpacity style={styles.input} onPress={showDatePicker}>
        <Text
          style={[
            styles.inputText,
            selectedValue !== 'Select date' ? styles.inputSelected : '',
          ]}
        >
          {selectedValue}
        </Text>
        <Image
          style={styles.inputImg}
          source={require('../../assets/calendar.png')}
        />
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode='date'
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        minimumDate={minDate}
        maximumDate={maxDate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 13,
    backgroundColor: '#f8f8fa',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'rgba(128, 131, 164, 0.2)',
    marginTop: 10,
    position: 'relative',
  },
  inputText: {
    color: '#8083a4',
    fontSize: 20,
    marginLeft: 8,
  },
  inputImg: {
    position: 'absolute',
    top: '70%',
    right: 26,
    width: 16,
    height: 16,
  },
  inputSelected: {
    color: '#2c2d76',
  },
});

export default DateSelect;
