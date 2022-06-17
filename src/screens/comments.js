import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import { images, theme } from '../utils/';
import {
  getUserById,
  getPostById,
  postComment,
  getCommentById,
  postCommentLike,
  postCommentReply,
  postReplyCommentLike
} from '../models/model2';

const Comments = ({ navigation, route }) => {
  const postID = route.params.data.id;
  const user = route.params.user;
  const post = route.params.data;
  const [text, onChangeText] = useState('');
  const [replying, setReplying] = useState(false);
  const [replyingTo, setReplyingTo] = useState({});
  const [comments, setComments] = useState([]);
  const getdatas = async () => {
    console.log(JSON.stringify(getCommentById(postID)))
    await setComments(getCommentById(postID));
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getdatas();
    });
    return unsubscribe;
  }, [navigation]);

  const postCommentFunc = (item) => {
    if (replying) {
      postCommentReply(new Date().getTime() + Math.random(), Date.now(), user.id, postID, replyingTo.id, text, user)
      onChangeText('');
      setReplying(false)
      getdatas();
    }
    else {
      postComment(new Date().getTime() + Math.random(), Date.now(), text, user, post, postID);
      onChangeText('');
    }

  };

  const postReplyCommentFuncLike = (item) => {

    // alert(JSON.stringify(item))
    console.log(user)
    postReplyCommentLike(new Date().getTime() + Math.random(), Date.now(), user.id, postID, item.id);
    getdatas()
  };
  const postCommentFuncLike = (item) => {

    // alert(JSON.stringify(item))
    console.log(user.id)
    postCommentLike(new Date().getTime() + Math.random(), Date.now(), user.id, postID, item.id);
    getdatas()
  };
  const handleReply = (item) => {
    setReplying(true)
    setReplyingTo(item)
    console.log(item)
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
    <View style={{ backgroundColor: '#FFF', flex: 1 }}>
      <View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            padding: 20,
            backgroundColor: '#dcdcdc50',
            borderBottomColor: "black",
            borderBottomWidth: 1
          }}>
          <View>
            <Image style={{ width: 40, height: 40, borderRadius: 50 }} source={{ uri: user?.profilePicture }} />
          </View>
          <View style={{ width: '80%', marginLeft: 10 }}>
            <View
              style={{
                padding: 10,
                borderRadius: 10,
                color: '#000',

              }}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 14,
                  fontWeight: '600'
                }}>
                {post.user.firstName + " " + post.user.lastName}
              </Text>

              <Text
                style={{
                  color: 'black',
                  fontSize: 12,
                  marginTop: 10
                }}>
                {post.postDescription}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <FlatList
        data={comments}
        renderItem={item => {
          return (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                width: '100%',
                padding: 20
              }}>
              <View>
                <Image style={{ width: 40, height: 40, borderRadius: 50 }} source={{ uri: item.item?.user?.profilePicture }} />
              </View>
              <View style={{ width: '80%', marginLeft: 10 }}>
                <View
                  style={{
                    backgroundColor: '#dcdcdc',
                    padding: 10,
                    width: '100%',
                    alignSelf: 'center',
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 14,
                      fontWeight: '600'
                    }}>
                    {item.item.user.firstName + " " + item.item.user.lastName}
                  </Text>

                  <Text
                    style={{
                      color: '#000',
                      fontSize: 12,
                      marginTop: 10
                    }}>
                    {item.item.message}
                  </Text>
                </View>
                <View style={{ width: "100%", flexDirection: "row", marginTop: 10 }}>
                  {getLike(item.item) != true ? <TouchableOpacity onPress={
                    () => postCommentFuncLike(item.item)
                  }>
                    <View style={{ flexDirection: 'row' }}>
                      <Image style={{ width: 20, height: 20, marginHorizontal: 10 }} source={images.HeartOutline2} />
                      <Text>
                        {item.item.likes.length}  Like
                      </Text>
                    </View>
                  </TouchableOpacity> : <TouchableOpacity >
                    <View style={{ flexDirection: 'row' }}>
                      <Image style={{ width: 20, height: 20, marginHorizontal: 10 }} source={images.Heart2} />
                      <Text>
                        {item.item.likes.length}   Like
                      </Text>
                    </View>
                  </TouchableOpacity>}
                  <TouchableOpacity onPress={() => handleReply(item.item)} >
                    <View style={{ flexDirection: 'row' }}>
                      <Image style={{ width: 20, height: 20, marginHorizontal: 10 }} source={images.Comment} />
                      <Text>
                        {item.item?.replies?.length}  replies
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                {item.item?.replies?.map((item) => (
                  <View style={{
                    flexDirection: 'row',
                    marginTop: 10,
                  }}>
                    <Image style={{ width: 25, height: 25, borderRadius: 30 }} source={{ uri: item.user.profilePicture }} />
                    <View
                      style={{
                        backgroundColor: '#dcdcdc50',
                        padding: 10,
                        marginLeft: 5,
                        alignSelf: 'center',
                        borderRadius: 10,
                      }}>
                      <Text
                        style={{
                          color: '#000',
                          fontSize: 14,
                          fontWeight: '600'
                        }}>
                        {item.user.firstName + " " + item.user.lastName}
                      </Text>

                      <Text
                        style={{
                          color: '#000',
                          fontSize: 12,
                          marginTop: 10
                        }}>
                        {item.message}
                      </Text>
                    </View>
                    {getLike(item) != true ? <TouchableOpacity onPress={
                      () => postReplyCommentFuncLike(item)
                    }>
                      <View style={{ flexDirection: 'row' }}>
                        <Image style={{ width: 20, height: 20, marginHorizontal: 10 }} source={images.HeartOutline2} />
                        <Text>
                          {item.likes.length}  Like
                        </Text>
                      </View>
                    </TouchableOpacity> : <TouchableOpacity >
                      <View style={{ flexDirection: 'row' }}>
                        <Image style={{ width: 20, height: 20, marginHorizontal: 10 }} source={images.Heart2} />
                        <Text>
                          {item.likes.length}   Like
                        </Text>
                      </View>
                    </TouchableOpacity>}
                  </View>

                ))}
              </View>
            </View>
          );
        }}
      />
      <View style={styles.footerView} >
        <View>
          {!replying ? null :
            <View
              style={{
                padding: 10,
                backgroundColor: "silver",
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
            >
              <Image style={{ width: 20, height: 20, marginHorizontal: 10 }} source={images.Comment} />
              <Text>
                Replying to: {replyingTo?.user?.firstName + " " + replyingTo?.user?.lastName}
              </Text>
              <TouchableOpacity onPress={() => setReplying(false)} style={{ width: 20, height: 20, borderRadius: 10, borderWidth: 1, borderColor: "black", alignItems: 'center' }}>
                <Text>
                  x
                </Text>
              </TouchableOpacity>
            </View>
          }
          <View
            style={{
              padding: 10,
              flexDirection: 'row',
              justifyContent: 'space-around',
              width: '100%',
            }}>
            <Image
              source={{ uri: user.profilePicture }}
              style={{ width: 40, height: 40, borderRadius: 50 }}
            />
            <TextInput
              style={{
                height: 40,
                borderWidth: 0.3,
                borderRadius: 50,
                borderColor: '#666',
                width: '70%',
                color: '#333',
              }}
              onChangeText={onChangeText}
              placeholder={' Write something here...'}
              placeholderTextColor={'#666'}
              value={text}
              onPressIn={() => { }}
            />
            <TouchableOpacity
              onPress={() => postCommentFunc()}
              style={{
                borderWidth: 0.3,
                borderColor: '#666',
                height: 40,
                width: 40,
                borderRadius: 50,
                alignSelf: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={images.SendMessage}
                style={{
                  width: 24,
                  height: 24,
                  resizeMode: 'contain',
                  alignSelf: 'center',
                  left: 2,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View >
    </View >
  );
};

const styles = StyleSheet.create({
  footerView: {
    bottom: 0,
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

export default Comments;
