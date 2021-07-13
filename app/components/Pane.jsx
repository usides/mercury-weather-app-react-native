import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const Pane = ({ headerText, isPlaceholder, children }) => {
  return (
    <View style={styles.pane}>
      <Text style={styles.paneHeader}>{headerText}</Text>
      {children}
      {isPlaceholder && (
        <>
          <Image
            style={styles.paneImage}
            source={require('../../assets/placeholder.png')}
          />
          <Text style={styles.paneDescription}>
            'Fill in all the fields and the weather will be displayed'
          </Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  pane: {
    padding: 35,
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 20,
    // minHeight: 300,
  },
  paneHeader: {
    fontSize: 25,
    fontFamily: 'Ubuntu_700Bold',
    color: '#2c2d76',
  },
  paneImage: {
    alignSelf: 'center',
    marginVertical: 20,
  },
  paneDescription: {
    fontFamily: 'Ubuntu_700Bold',
    textAlign: 'center',
    color: `#8083a4`,
    fontSize: 16,
  },
});

export default Pane;
