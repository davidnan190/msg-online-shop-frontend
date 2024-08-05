import { createTheme, responsiveFontSizes } from '@mui/material/styles';

import { styles } from './styles';

let theme = createTheme({
  palette: {
    primary: {
      main: styles.colors.primary,
    },
    secondary: {
      main: styles.colors.secondary,
    },
    text: {
      primary: styles.colors.text,
    },
    background: {
      default: styles.colors.background,
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  shape: {
    borderRadius: parseInt(styles.borderRadius),
  },
  spacing: parseInt(styles.spacing.padding),
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        body {
          background-color: ${styles.colors.background};
        }
      `,
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: styles.borderRadius,
          padding: styles.spacing.padding,
          boxShadow: styles.boxShadow,
        },
        contained: {
          '&.MuiButton-containedPrimary': {
            backgroundColor: styles.buttons.primary.background,
            color: styles.buttons.primary.color,
          },
          '&.MuiButton-containedSecondary': {
            backgroundColor: styles.buttons.secondary.background,
            color: styles.buttons.secondary.color,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: styles.colors.background,
          borderRadius: styles.borderRadius,
          boxShadow: styles.boxShadow,
        },
      },
    },
  },
});

// Apply responsive font sizes
theme = responsiveFontSizes(theme);

export default theme;
