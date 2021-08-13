import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createTheme({
    palette: {
        primary: {
            main: '#c90c0c'
        },
        secondary: {
            main: '#f21b3f'
        },
    },
});

theme = responsiveFontSizes(theme)

export default theme