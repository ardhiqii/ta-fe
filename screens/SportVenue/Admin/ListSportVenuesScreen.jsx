import Card from '@components/SportVenue/Card'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'


const DATA = [
  {id:"2454c84f-51a1-437a-a396-018f0bd5c3e3"}
]

const ListSportVenuesScreen = () => {
  return (
    <View style={styles.container}>
      <Card/>
      <View style={{height:2,backgroundColor:"#cfd8dc"}}/>
      <Card/>
      <View style={{height:2,backgroundColor:"#cfd8dc"}}/>
      <Card/>
      <View style={{height:2,backgroundColor:"#cfd8dc"}}/>
      <Card/>
      <View style={{height:2,backgroundColor:"#cfd8dc"}}/>

    </View>
  )
}

export default ListSportVenuesScreen

const styles = StyleSheet.create({
  container:{
    marginTop:12,
    paddingBottom:10,
    rowGap:16,
  }
})