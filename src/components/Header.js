import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Appbar, Title } from 'react-native-paper'

function Header({ titleText }) {
  return (
    <Appbar.Header style={styles.headerContainer}>
      <View style={styles.container}>
        <Title style={styles.title}>{titleText}</Title>
      </View>
    </Appbar.Header>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#FFF',
  },
  container: {
    width: '100%',
    height: 60,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  title: {
    color: '#464646',
    fontSize: 20
  }
})

export default Header
