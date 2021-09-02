import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { deDE } from '@material-ui/core/locale';

let theme = createTheme({
    palette: {
        primary: {
            main: '#c90c0c'
        },
        secondary: {
            main: '#1976d2'
        },
        warning: {
            main: '#ff9800'
        }
    },
    overrides: {
        MuiTablePagination: {
            spacer: {
                flex: 'none'
            }
        }
    }
}, deDE);

theme = responsiveFontSizes(theme)

export default theme