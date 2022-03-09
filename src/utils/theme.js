import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { deDE } from '@material-ui/core/locale';

let theme = createTheme({
    palette: {
        primary: {
            main: '#c90c0c'
            // main: "#4cc9f0"
            // main: '#d90429'
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
        },
        MuiInputBase: {
            root: {
                "&$disabled": {
                    color: '#333'
                }
            }
        }
    }
}, deDE);

theme = responsiveFontSizes(theme)

export default theme