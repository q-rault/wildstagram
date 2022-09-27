import { useState, useEffect } from 'react';
import { Image, Text, FlatList, StyleSheet } from 'react-native';
import * as FileSystem from 'expo-file-system';

export default ImagesScreen = () => {
  const [imagesURI, setImagesURI] = useState([]);
  useEffect(() => {
    (async () => {
      const images = await FileSystem.readDirectoryAsync(
        FileSystem.cacheDirectory + 'ImageManipulator'
      );
      setImagesURI(images);
    })();
  }, []);

  return imagesURI.length > 0 ? (
    <FlatList
      data={imagesURI}
      keyExtractor={(imageURI) => imageURI}
      renderItem={(itemData) => {
        console.log('item', itemData);
        return (
          <Image
            style={styles.image}
            source={{
              uri:
                FileSystem.cacheDirectory + 'ImageManipulator/' + itemData.item,
            }}
          />
        );
      }}
    />
  ) : (
    <Text>Images Screen</Text>
  );
};

const styles = StyleSheet.create({
  image: {
    resizeMode: 'cover',
    height: 500,
  },
});
