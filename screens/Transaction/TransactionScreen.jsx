import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const TransactionScreen = () => {
  const [transactionData,setTransactionData] = useState([])
  const [loading,setLoading] = useState(false)
  return (
    <View style={styles.container}>
      <Text>TESTS</Text>
    </View>
  )
}

export default TransactionScreen

const styles = StyleSheet.create({
  container:{
    marginTop:12
  }
})