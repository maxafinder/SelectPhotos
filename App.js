import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Image, StyleSheet, Button, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';


export default function App() {

  // use React hook for setting the selected image
  const [selectedImage, setSelectedImage] = React.useState(null);



  let openImagePickerAsync = async () => {
    // get permission from user to access camera roll
    let libraryPermissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    // if they decline permission
    if (libraryPermissionResult.granted == false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    // let user select image from their camera roll
    let picked = await ImagePicker.launchImageLibraryAsync();

    // if they cancelled the selection
    if (picked.cancelled == true) {
      return;
    }

    // set the selected image
    setSelectedImage({ localUri: picked.uri });
  }; // openImagePickerAsync()





  // Show choosen image
  if (selectedImage != null) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: selectedImage.localUri }} style={styles.image}/>
      </View>
    );
  }



  // Instructions and choose button
  return (
    <View style={styles.container}>
      <Text style={styles.instructionText}>To share photo from your phone, press button</Text>

      <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
        <Text style={styles.buttonText}>Choose Photo</Text>
      </TouchableOpacity>
    </View>
  );


} // App()




const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    width: 300,
    height: 300,
    resizeMode: "contain"
  },

  instructionText: {
    fontFamily: "Cochin",
    fontSize: 20,
    fontWeight: "bold"
  },

  button: {
    marginTop: 30,
    backgroundColor: 'navy',
    padding: 15,
    borderRadius: 10,
    width: 150,
    height: 55
  },

  buttonText: {
    fontFamily: "Cochin",
    fontSize: 20,
    color: 'white'
  }

});
