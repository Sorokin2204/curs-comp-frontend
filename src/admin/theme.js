import { createTheme } from '@mui/material';

export const theme = createTheme({
  components: {
    MuiIconButton: {
      defaultProps: {
        disableRipple: true,
        variant: 'contained',
      },
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        variant: 'contained',
      },
    },
    MuiTableCell: {
      defaultProps: {
        disableRipple: true,
        variant: 'contained',
      },
      styleOverrides: {
        root: { padding: '5px', width: 'min-content', minWidth: 0 },
      },
    },
  },
});
