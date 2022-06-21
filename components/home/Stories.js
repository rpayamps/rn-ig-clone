import { View, Text, ScrollView, Image, StyleSheet } from 'react-native'
import React from 'react'

const Stories = () => {
  return (
    <View style={{ marginBottom: 13}}>
        <ScrollView horizontal 
        showsVerticalScrollIndicator={false}
        >
            {/* {users.map((story, index) =>( 
            <View key={index} style={{alignItems: "center"}}>
            <Image source={{ uri: story.image}} style={style.story}/>
            <Text style={{color: 'white'}}>{
                story.user.length > 11 ? story.user.slice(0, 10).toLowerCase() + "..." : story.usertoLowerCase()
            }</Text>
            </View>
            ))} */}
        </ScrollView>
      <Text style={{color: 'white'}}>Stories</Text>
    </View>
  )
}

const styles = StyleSheet.create({
 story: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginLeft: 6,
    borderWidth: 3,
    borderColor: '#ff8501',
 },

})

export default Stories