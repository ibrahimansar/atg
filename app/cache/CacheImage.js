import React from 'react';
import { Image } from "react-native-expo-image-cache";
import { View, Dimensions, StyleSheet} from "react-native";
import shorthash from 'shorthash';
import { FileSystem } from 'expo';

export default class CacheImage extends React.Component {
  state = {
    source: null,
  };

  componentDidMount = async () => {
    const { uri } = this.props;
    const name = shorthash.unique(uri);
    console.log(name);
    const path = `${FileSystem.cacheDirectory}${name}`;
    const image = await FileSystem.getInfoAsync(path);
    if (image.exists) {
      console.log('read image from cache');
      console.log(img)
      this.setState({
        source: {
          uri: image.uri,
        },
      });
      return;
    }

    console.log('downloading image to cache');
    const newImage = await FileSystem.downloadAsync(uri, path);
    this.setState({
      source: {
        uri: newImage.uri,
      },
    });
  };

  render() {
    return(
    <View style={styles.card}>
      <Image
        style={styles.image} 
        tint="light"
        preview={{ uri: this.state.source }}
        uri={this.state.source}
      />
    </View>
    )
  }
}

const styles = StyleSheet.create({
    image: {
      width: "100%",
      height: 200,
  },
  card: {
    borderRadius: 15,
    backgroundColor: "#ffffff",
    margin: "1%",
    overflow: "hidden",
    width: "48%",
    height: Dimensions.get('window').width/2 + 15
  }
});