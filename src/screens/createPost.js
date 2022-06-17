import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import Realm from 'realm';
import * as ImagePicker from 'react-native-image-picker';
import { CreateSocialPost } from '../components/';
import { addPost, getUserById } from '../models/model2';

const includeExtra = true;

const CreatePost = ({ navigation, route }) => {
  const [text, onChangeText] = useState('');
  const [mediaList, setMediaList] = useState([]);
  const [uploadList, setUploadList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [response, setResponse] = useState(null);
  //
  const [realm, setRealm] = useState(null);
  const [tasks, setTasks] = useState([]);

  const [mediaType, setMediaType] = useState('text');
  const [mediaTypeImage, setMediaTypeImage] = useState(
    'https://picsum.photos/710',
  );
  const [mediaTypeVideo, setMediaTypeVideo] = useState(
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  );

  const uploadPhotos = () => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeExtra,
    };
    ImagePicker.launchImageLibrary(options, setResponse);
  };

  const uploadVideos = () => {
    const options = {
      selectionLimit: 1,
      mediaType: 'video',
      includeExtra,
    };
    ImagePicker.launchImageLibrary(options, setResponse);
  };

  // useEffect(() => {
  //   (async () => {
  //     const realm = await Realm.open({
  //       path: 'myrealm1',
  //       schema: [Post],
  //     }).then(realm => {
  //       const tasks = realm.objects('SocialFeed2');
  //       setTasks([...tasks]);
  //       setRealm(realm);
  //       try {
  //         tasks.addListener(() => {
  //           setTasks([...tasks]);
  //         });
  //       } catch (error) {
  //         console.error(`Error updating tasks: ${error}`);
  //       }
  //     });
  //   })();
  // }, []);

  const postUpdate = () => {
    addPost(
      new Date().getTime() + Math.random(),
      Date.now(),
      mediaType,
      {
        images: mediaType === 'image' ? mediaTypeImage : '',
        videos: mediaType === 'video' ? mediaTypeVideo : '',
      },
      text,
      {
        likes: 0,
        comments: 0,
      },
      { likes: 0, comments: 0 },
      route.params.user,
    );
    // realm.write(() => {
    //   realm.create('SocialFeed2', {
    //     // id: Date.now(),
    //     // username: 'saif',
    //     // fullName: 'Saif Ali',
    //     // postDescription: text,
    //     // createdTime: Date.now(),
    //     // attachments: 'https://picsum.photos/536/354',
    //   });
    // });
    onChangeText('');
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFF' }}>
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          justifyContent: 'center',
        }}>
        <TouchableOpacity onPress={() => setMediaType('image')}>
          <Text
            style={{
              color: '#000',
              padding: 5,
              borderWidth: 0.5,
              borderColor: '#696969',
              borderRadius: 10,
            }}>
            Set Image
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setMediaType('video')}>
          <Text
            style={{
              color: '#000',
              padding: 5,
              borderWidth: 0.5,
              borderColor: '#696969',
              borderRadius: 10,
              marginLeft: 10,
            }}>
            Set Video
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setMediaType('text')}>
          <Text
            style={{
              color: '#000',
              padding: 5,
              borderWidth: 0.5,
              borderColor: '#696969',
              borderRadius: 10,
              marginLeft: 10,
            }}>
            Set Text
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setMediaType('html')}>
          <Text
            style={{
              color: '#000',
              padding: 5,
              borderWidth: 0.5,
              borderColor: '#696969',
              borderRadius: 10,
              marginLeft: 10,
            }}>
            Set HTML
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        <Text
          style={{
            color: '#000',
            alignSelf: 'center',
          }}>
          {mediaType} mode
        </Text>
      </View>
      <CreateSocialPost
        onChangePostDescription={onChangeText}
        postDescription={text}
        uploadPhoto={() => uploadPhotos()}
        uploadVideo={() => uploadVideos()}
        selectedMediaChildren={
          response?.assets &&
          response?.assets.map(({ uri }) => (
            <View style={{}}>
              <Image
                resizeMode="cover"
                resizeMethod="scale"
                style={{ width: 100, height: 100, borderRadius: 10 }}
                source={{ uri: uri }}
              />
            </View>
          ))
        }
        postButton={() => postUpdate()}
      />
    </View>
  );
};

export default CreatePost;
