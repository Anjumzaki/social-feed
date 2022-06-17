import { Platform, Dimensions, PixelRatio } from 'react-native';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const IS_IPAD = SCREEN_HEIGHT / SCREEN_WIDTH < 1.6;

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

function normalize(size) {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
}

module.exports = {
  color: {
    bg: "#E9EFFD",
    lightbg: "#F2F6FF",
    gray: "#f2f2f2",
    blue: "#3374D5",
    lightblue: "#2B65EC",
    darkgray: "#A9A9A9",
    light: "#ffffff",
    danger: "#F32013",
    shadow: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
    },
    primary: "#467DFF",
    lightGray: "#E5E9F1",
    dark: "#000000",
    mediumGray: "#D9D9D9",
    darkSky: "#93B0F5",
  },
  textInput: { width: "100%", height: 40, borderRadius: 10, borderColor: "black", borderWidth: 1, padding: 10, marginBottom: 20 },

  //Screen
  screen: Dimensions.get('window'),
  platform: Platform.OS,
  isIOS: Platform.OS === 'ios',
  isANDROID: Platform.OS === 'android',
  isiPAD: IS_IPAD,
  screenHeight: (Platform.OS === 'ios' && SCREEN_HEIGHT) || SCREEN_HEIGHT - 24,
  screenWidth: SCREEN_WIDTH,
  fullScreenHeight: SCREEN_HEIGHT,
  maxUIWidth: 500,

  //Font
  fontSize: {
    micro: 5,
    xxxsmall: 7,
    xxsmall: 8,
    xsmall: 10,
    xmin: 11,
    mini: 12,
    lmini: 13,
    regular: 14,
    small: 15,
    xmedium: 16,
    xxmedium: 17,
    medium: 18,
    lmedium: 19,
    large: 20,
    xlarge: 22,
    bigger: 30
  },

  fontStyle: {
    italic: 'italic',
    normal: 'normal',
    bold: 'bold'
  },

  fonts: {
    // poppinsSemiBold: 'Poppins-SemiBold',
    // poppinsRegular: 'Poppins-Regular',
    // poppinsMedium: 'Poppins-Medium',
    // poppinsLight: 'Poppins-Light',
  },
};