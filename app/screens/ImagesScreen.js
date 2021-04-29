import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, SafeAreaView } from 'react-native';
import Card from "../component/Card";
import Header from "../component/Header";
import Constants from "expo-constants"

export default ImagesScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=1&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s')
      .then((response) => response.json())
      .then((json) => setData(json.photos))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      {isLoading ? <Text>Loading...</Text> : 
      (
        <>
        <Header title = "Home" navigation={navigation}/>
          <FlatList
            data={data.photo}
            numColumns= '2'
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <Card
                 imageUrl = {item.url_s}
               />
            )}
          />
        </>  
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    paddingLeft:5,
    paddingRight: 5
  }
});