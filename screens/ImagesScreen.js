import { useState, useEffect } from 'react';
import { Image, Text, FlatList, StyleSheet, Button } from 'react-native';
import * as FileSystem from 'expo-file-system';
import singleFileUploader from 'single-file-uploader';
import Constants from 'expo-constants';

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
          <>
            <Image
              style={styles.image}
              source={{
                uri:
                  FileSystem.cacheDirectory +
                  'ImageManipulator/' +
                  itemData.item,
              }}
            />
            <Button title='Upload'
              onPress={async () =>{
                try {
                await singleFileUploader({
                  distantUrl: 'https://wildstagram.nausicaa.wilders.dev/upload',
                  expectedStatusCode: 201,
                  filename: itemData.item,
                  filetype: 'image/jpeg',
                  formDataName: 'fileData',
                  localUri:
                    FileSystem.cacheDirectory +
                    'ImageManipulator/' +
                    itemData.item,
                  token: Constants.manifest.extra.token,
                });
                alert("Uploaded");
              } catch(error) {
                  alert("Didn't work")
                }
              }}
            />
          </>
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
