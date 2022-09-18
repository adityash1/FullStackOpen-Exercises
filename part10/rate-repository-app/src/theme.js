import { Platform } from 'react-native';

const theme = {
  colors: {
    textPrimary: "#24292e",
    textSecondary: "#586069",
    buttonColor: "#0366d6",
    black: "#24292e",
    white: "#f6f8fa",
    background: '#e1e4e8',
  },
  fontSizes: {
    body: 14,
    subheading: 16,
    heading: 20,
  },
  fonts: {
    main: Platform.select({
      ios: 'Arial',
      android: 'Roboto',
      default: 'System',
    }), 
  },
  fontWeights: {
    normal: "400",
    bold: "700",
  },
};

export default theme;
