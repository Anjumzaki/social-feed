import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {images, theme} from '../utils/';
import {useWindowDimensions} from 'react-native';

const CreateSocialPost = ({
  onChangePostDescription,
  postDescription,
  selectedMediaChildren,
  postButton,
  uploadPhoto,
  uploadVideo,
}) => {
  const {width} = useWindowDimensions();

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            onChangeText={onChangePostDescription}
            placeholder={' Write something here...'}
            placeholderTextColor={'#666'}
            value={postDescription}
            scrollEnabled
            textAlignVertical="top"
            multiline
          />

          <View style={styles.mediaUploadView}>
            <TouchableOpacity onPress={uploadPhoto}>
              <Image
                source={images.UploadMedia}
                style={styles.uploadMediaIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={uploadVideo}>
              <Image
                source={images.UploadVideo}
                style={styles.uploadMediaIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* BUTTON */}
      <View style={styles.footerView}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {selectedMediaChildren}
        </ScrollView>
        <TouchableOpacity onPress={postButton} style={styles.postButton}>
          <Text style={styles.postText}>POST</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    margin: 10,
  },
  textInput: {
    height: '40%',
    borderWidth: 0.2,
    borderRadius: 5,
    width: '90%',
    borderColor: '#666',
    color: '#000',
    paddingLeft: 5,
    fontSize: 18,
  },
  mediaUploadView: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: '40%',
    width: '10%',
    alignItems: 'center',
  },
  uploadMediaIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    tintColor: '#333',
  },
  footerView: {
    bottom: 20,
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
  },
  postButton: {
    height: 50,
    width: '90%',
    backgroundColor: '#ADD5E6',
    borderRadius: 50,
    justifyContent: 'center',
    marginTop: 20,
  },
  postText: {
    alignSelf: 'center',
    fontSize: 16,
    color: '#FFF',
  },
});

export {CreateSocialPost};
