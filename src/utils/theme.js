import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createTheme({
    palette: {
        primary: {
            main: '#c90c0c'
        },
        secondary: {
            main: '#1976d2'
        },
    },
});

theme = responsiveFontSizes(theme)

export default theme