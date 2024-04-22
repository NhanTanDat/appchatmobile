import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const IntroduceUser = () => {
  return (
    <View style={styles.container}>
        <Text style={{fontWeight:"800"}}>Những người bạn có thể biết:</Text>
        
    </View>
  )
}

export default IntroduceUser

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'red',
        width: '100%',
        justifyContent:"flex-start",
        alignItems:"flex-start",
        margin:10
      }



})