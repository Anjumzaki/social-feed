import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import Share from 'react-native-share';
import { SocialCard, StatusBar } from '../components/';
import { images } from '../utils/';
import {
  getAllPosts,
  getAllUsers,
  PostSchema,
  UserSchema,
  postLike,
  getPostById,
  getAllComments,
  getCommentById,
} from '../models/model2';
import RNFetchBlob from 'rn-fetch-blob';
const RNFS = require('react-native-fs');
import { Modal, Portal, Button, Provider } from 'react-native-paper'; ''
import { realm } from '../models/model2'
const Home = ({ route, navigation }) => {
  const { user } = route.params;
  const [data, setData] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [realmData, setRealmData] = useState([]);
  const [posts, setPosts] = useState(getAllPosts());
  const [users, setUsers] = useState(getAllUsers());
  //
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const ActivityFeedStoragePath =
    '/storage/emulated/0/Pictures/ActivityFeedStoragePath/';

  const getdatas = async () => {
    await setPosts(getAllPosts());
    await setUsers(getAllUsers());
    // alert("ASDa")

  };

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'ActivityFeed Storage Permission',
          message:
            'ActivityFeed App needs access to your storage ' +
            'so you can download your customized images/videos.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        RNFetchBlob.fs
          .mkdir(ActivityFeedStoragePath)
          .then(i => {
            console.log(i);
          })
          .catch(err => {
            console.log(
              '🚀 ~ file: home.js ~ line 318 ~ requestStoragePermission ~ err',
              err,
            );
            RNFetchBlob.fs
              .exists(ActivityFeedStoragePath)
              .then(exist => {
                if (exist) {
                  console.log(exist, ' DIRECOTRY EXISTS');
                } else {
                  requestStoragePermission();
                }
              })
              .catch(e => {
                console.log(e);
              });
          });
      } else {
        // console.log("Storage permission denied");
      }
    } catch (err) {
      // console.log(err);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {

      getdatas();
      requestStoragePermission();
      //     (async () => {
      //       const realm = await Realm.open({
      //         path: 'myrealm1',
      //         schema: [Post],
      //       }).then(realm => {
      //         const tasks = realm.objects('SocialFeed2'); // load data in the database...
      //         // console.log("🚀 ~ file: home.js ~ line 277 ~ tasks", tasks)
      //         setTasks([...tasks]); // set variable for tasks read from database
      //         setRealm(realm); // get realm instance to use later in app
      //         // set up listener to update task list when the
      //         try {
      //           tasks.addListener(() => {
      //             setTasks([...tasks]);
      //           });
      //         } catch (error) {
      //           console.error(`Error updating tasks: ${error}`);
      //         }
      //       });
      //     })();
    });
    return unsubscribe;
  }, [navigation]);

  const likePost = (item, user) => {
    postLike(item.id, user);
    getdatas();
    // JSON basedÏ
    // const like = data.map(obj => {
    //   if (obj.id === item.id) {
    //     return {
    //       ...obj,
    //       own_reactions: {
    //         like: item.own_reactions.like === 0 ? 1 : 0,
    //       },
    //     };
    //   }
    //   return obj;
    // });
    // setData(like);
  };

  const sharePost = () => {
    const options = {
      title: 'Share via',
      message: 'some message', // description
      url: 'some share url', // deeplink
    };
    Share.open(options)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };

  const downloadItem = () => {
    const down = realmData;
    if (down.postType === 'image') {
      RNFetchBlob.config({
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: false,
          description: 'File downloaded by download manager.',
          title: 'test-report-PNG' + '.png',
          path: ActivityFeedStoragePath + 'test-report-' + '.png',
        },
      })
        .fetch('GET', down.postMedia.images)
        .then(resp => {
          console.log(resp, '423');
        })
        .catch(err => console.log(err));
    } else if (down.postType === 'video') {
      RNFetchBlob.config({
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: false,
          description: 'File downloaded by download manager.',
          title: 'test-report-MP4' + '.mp4',
          path: ActivityFeedStoragePath + 'test-report-MP4' + '.mp4',
        },
      })
        .fetch('GET', down.postMedia.videos)
        .then(resp => {
          console.log(resp, '438');
        })
        .catch(err => console.log(err));
    } else {
      console.log('nul');
    }
  };

  const fileExists = () => {
    RNFetchBlob.fs
      .exists(ActivityFeedStoragePath + 'test-report-MP4' + '.mp4')
      .then(r => {
        const local =
          'file://' + ActivityFeedStoragePath + 'test-report-MP4' + '.mp4';
        console.log(local);
      });
  };
  const getLike = (data) => {
    var found = false
    // console.log(data.likes[0]?.userId,"ASDASD")
    for (var i = 0; i < data.likes.length; i++) {
      if (data.likes[i].userId == user.id) {
        found = true
      }
    }
    return found
  }

  return (
    <View style={{ backgroundColor: '#f2f2f2', flex: 1 }}>
      <FlatList
        data={posts} // data // tasks.reverse()
        removeClippedSubviews
        scrollEventThrottle={15}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <StatusBar data={user} openCreatePost={() => navigation.navigate('CreatePost', { user: user })} />
        }
        renderItem={({ item, index }) => (
          // <></>
          <SocialCard
            key1={item.id}
            title={item?.user?.firstName + ' ' + item?.user?.lastName}
            timestamp={new Date(item.createdTime).toDateString()}
            description={item.postDescription}
            // description={JSON.stringify(item.likes)}
            profilePicture={item?.user?.profilePicture}
            media={{ uri: item?.postMedia?.images }}
            mediaHeight={item?.postMedia?.images === '' ? 0 : 340}
            mediaType={item.postType}
            onPressLike={() => getLike(item) != true ? likePost(item, user.id) : null}
            onPressComment={() => navigation.navigate('Comments', { data: item, user: user })}
            onPressShare={() => sharePost(item)}
            likeIcon={
              getLike(item) != true
                ? images.HeartOutline2
                : images.Heart2
            }
            commentIcon={images.Comment}
            shareIcon={images.Share}
            totalLikes={item.likes.length}
            totalComments={getCommentById(item.id).length}
            threeDots={() => setVisible(true) + setRealmData(item)}
          />
        )}
      />
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={{ backgroundColor: '#FFF', padding: 10 }}>
        <View style={{ borderWidth: 0.5, padding: 10, borderColor: '#666' }}>
          <TouchableOpacity onPress={() => downloadItem() + setVisible(false)}>
            <Text style={{ color: '#000' }}>Download</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default Home;
