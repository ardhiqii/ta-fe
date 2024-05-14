import Button from '@components/UI/Button'
import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { UserContext } from 'store/user-contex'

const TransactionScreen = () => {
  const [transactionData,setTransactionData] = useState([])
  const [loading,setLoading] = useState(false)
  const {user,logoutUser} = useContext(UserContext)
  return (
    <View style={styles.container}>
      <Text>TESTS</Text>
      <Button onPress={logoutUser}>LOGOUT</Button>
    </View>
  )
}

export default TransactionScreen

const styles = StyleSheet.create({
  container:{
    marginTop:12
  }
})