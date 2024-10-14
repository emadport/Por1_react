import { createTheme } from '@mui/material/styles';
export const themeColor = '#49b4b8'
const theme = createTheme({
  palette: {
    primary: {
      main: '#ff5722',
    },
    secondary: {
      main: '#ffeb3b',
    },
  },
  shape: {
    borderRadius: 8, // Define your border radius here
  },
  // Add more theme properties as needed
});

export default theme;
