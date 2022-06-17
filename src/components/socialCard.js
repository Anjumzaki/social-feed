import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import Video from 'react-native-video';
import {images, theme} from '../utils/';
import {useWindowDimensions} from 'react-native';
import RenderHtml from 'react-native-render-html';
import SocialTextView from './socialTextView';
import VisibilitySensor from './visibilitySensor';

// ACTIVITY FEED COMPONENT
const SocialCard = ({
  title,
  timestamp,
  description,
  profilePicture,
  media,
  mediaHeight,
  mediaType,
  onPressLike,
  onPressComment,
  onPressShare,
  likeIcon,
  commentIcon,
  shareIcon,
  videoLayout,
  key1,
  totalLikes,
  totalComments,
  threeDots
}) => {
  const {width} = useWindowDimensions();

  const [pause, setpause] = useState(false);
  const [isBufferingNow, setIsBuffering] = useState(true);

  const handleImageVisibility = visible => {
    visible === true ? setpause(false) : setpause(true);
  };

  const onBuffer = ({isBuffering}) => {
    setIsBuffering(isBuffering);
  };

  return (
    <View key={key1} style={styles.socialCardContainer}>
      <View style={styles.headContainerRow}>
        <Image source={{uri: profilePicture}} style={styles.profilePicture} />
        <View style={styles.headContainerColumn}>
          <View style={styles.headContainerColumnInside}>
            <View>
              <Text style={styles.fullName}>{title}</Text>
              <Text style={styles.timestamp}>{timestamp}</Text>
            </View>
            <TouchableOpacity onPress={threeDots}  > 
              <Image source={images.ThreeDots} style={styles.threeDots} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={{padding: 10}}>
        {mediaType == 'html' ? (
          <RenderHtml
            contentWidth={width}
            tagsStyles={{
              h1: {
                fontSize: 32,
                color: '#000',
                lineHeight: 20,
                marginHorizontal: 5,
                marginVertical: 10,
              },
              p: {
                fontSize: 14,
                color: '#000',
                lineHeight: 20,
                marginHorizontal: 5,
                marginVertical: 10,
              },
              a: {color: '#0066ff'},
              h2: {
                color: '#000',
                marginHorizontal: 5,
                marginVertical: 10,
              },
              i: {color: '#000'},
              div: {color: '#000'},
            }}
            source={{
              html:
                `<div>${description.replace(/<\/?[^>]+(>|$)/g, '')}</div>` ||
                '',
            }}
          />
        ) : (
          <SocialTextView
            style={{
              fontSize: 14,
              color: '#000',
              lineHeight: 20,
              fontFamily: theme.fonts.poppinsRegular,
            }}
            hashtagStyle={{
              fontSize: 14,
              color: '#00acee',
              fontWeight: 'bold',
              fontFamily: theme.fonts.poppinsRegular,
            }}
            mentionStyle={{
              fontSize: 14,
              color: '#4267B2',
              fontWeight: 'bold',
              fontFamily: theme.fonts.poppinsRegular,
            }}
            linkStyle={{
              fontSize: 14,
              color: '#01a049',
              fontWeight: 'bold',
              fontFamily: theme.fonts.poppinsRegular,
            }}
            emailStyle={{
              fontSize: 14,
              color: '#ff0000',
              fontWeight: 'bold',
              fontFamily: theme.fonts.poppinsRegular,
            }}>
            {description}
          </SocialTextView>
        )}
      </View>

      <TouchableOpacity>
        {mediaType == 'image' ? (
          <Image
            style={{height: mediaHeight, width: '100%'}}
            source={media}
          />
        ) : mediaType == 'video' ? (
          <View>
            {isBufferingNow && (
              <View style={styles.videoLoadingView}>
                <ActivityIndicator size="large" animating={isBufferingNow} />
                <Text style={styles.videoLoadingText}> Video Loading... </Text>
              </View>
            )}
            <VisibilitySensor onChange={handleImageVisibility}>
              <Video
                source={media}
                style={{width: '100%', aspectRatio: 1}}
                paused={pause}
                repeat={false}
                onBuffer={onBuffer}
                hideShutterView={true}
                bufferConfig={{
                  minBufferMs: 15000,
                  maxBufferMs: 50000,
                  bufferForPlaybackMs: 2500,
                  bufferForPlaybackAfterRebufferMs: 5000,
                }}
                maxBitRate={2000000}
                minLoadRetryCount={5}
                onLayout={videoLayout}
                resizeMode="cover"
              />
            </VisibilitySensor>
          </View>
        ) : null}
      </TouchableOpacity>

      <View>
        <View style={styles.topFooter}>
          <Text style={styles.topFooterText}>
            {totalLikes} {totalLikes >= 2 ? 'Likes' : 'Like'}
          </Text>
          <Text style={styles.topFooterText}>
            {totalComments} {totalComments >= 2 ? 'Comments' : 'Comment'}
          </Text>
        </View>
        <View style={styles.hairlineWidth} />
        <View style={styles.bottomFooter}>
          <TouchableOpacity
            onPress={onPressLike}
            style={styles.bottomFooterIconView}>
            <Image source={likeIcon} style={styles.bottomFooterIcon} />
            <Text style={styles.bottomFooterText}>Like</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onPressComment}
            style={styles.bottomFooterIconView}>
            <Image source={commentIcon} style={styles.bottomFooterIcon} />
            <Text style={styles.bottomFooterText}>Comment</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onPressShare}
            style={styles.bottomFooterIconView}>
            <Image source={shareIcon} style={styles.bottomFooterIcon} />
            <Text style={styles.bottomFooterText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// STATUSBAR COMPONENT
const StatusBar = ({openCreatePost,data}) => {
  const [text, onChangeText] = useState('');

  return (
    <View style={styles.writeStatusView}>
      <Image
        source={{uri: data?.profilePicture}}
        style={{width: 40, height: 40, borderRadius: 50}}
      />
      <TextInput
        style={{height: 40, borderWidth: 0.5, borderRadius: 50, width: '85%'}}
        onChangeText={onChangeText}
        placeholder={' Write something here...'}
        placeholderTextColor={'#666'}
        value={text}
        onPressIn={openCreatePost}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  socialCardContainer: {
    backgroundColor: '#FFF',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1.5,
    elevation: 2,
  },
  headContainerRow: {flexDirection: 'row', padding: 10},
  headContainerColumn: {flexDirection: 'column', flex: 1},
  headContainerColumnInside: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profilePicture: {width: 40, height: 40, marginRight: 10, borderRadius: 50},
  fullName: {
    fontSize: 16,
    color: '#000',
    fontFamily: theme.fonts.poppinsRegular,
  },
  timestamp: {
    fontSize: 12,
    color: '#000',
    fontFamily: theme.fonts.poppinsLight,
    bottom: 2.5,
  },
  threeDots: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  videoLoadingText: {
    backgroundColor: '#62626262',
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
  },
  topFooter: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
  },
  topFooterText: {
    fontSize: 12,
    color: '#000',
    fontFamily: theme.fonts.poppinsLight,
  },
  hairlineWidth: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#333',
    width: '95%',
    alignSelf: 'center',
  },
  bottomFooter: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-around',
  },
  bottomFooterIconView: {flexDirection: 'row', alignItems: 'center'},
  bottomFooterIcon: {width: 20, height: 20},
  bottomFooterText: {
    fontSize: 14,
    color: '#000',
    left: 5,
    fontFamily: theme.fonts.poppinsRegular,
  },
  videoLoadingView: {
    zIndex: 9999,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  writeStatusView: {
    backgroundColor: '#FFF',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export {SocialCard, StatusBar};
