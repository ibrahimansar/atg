import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, SafeAreaView, Button } from 'react-native';
import Card from "../component/Card";
import Header from "../component/Header";
import Constants from "expo-constants";
import Apis from "../APIs/Apis";
import useApi from "../hooks/useApi";

export default ImagesScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getApis = useApi(Apis.url)

  useEffect(() => {
    getApis.request();
  })

  useEffect(() => {
    fetch(Apis.url)
      .then((response) => response.json())
      .then((json) => setData(json.photos))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
        {getApis.error && (
          <>
            <AppText>Couldn't retrieve the listings.</AppText>
            <Button title="Retry" onPress={getApis.request} />
          </>
        )}

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
          <Button title = "Reload" onPress={getApis.request}/>
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