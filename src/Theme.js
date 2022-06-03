import { useContext } from 'react'
import Context from './Context'
import PropTypes from 'prop-types';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';
import * as React from 'react';
import { grey } from '@mui/material/colors';

ThemeConfig.propTypes = {
    children: PropTypes.node
};

export default function ThemeConfig({ children }) {
    const { isDarkMode } = useContext(Context);

    const xrpltheme = createTheme({
        components: {
            MuiAccordion: {
                defaultProps: {
                    elevation: 0,
                    defaultExpanded: true,
                },
                styleOverrides: {
                    root: ({ theme }) => ({
                        border: `1px solid ${theme.palette.divider}`,
                        // '&:not(:last-child)': {
                        //     borderBottom: 0,
                        // },
                    })
                }
            },
            MuiAccordionSummary: {
                styleOverrides: {
                    root: ({ theme }) => (
                        {
                            backgroundColor:
                                theme.palette.background.paper,
                            // theme.palette.mode === 'dark'
                            //     ? 'rgba(255, 255, 255, .05)'
                            //     : 'rgba(0, 0, 0, .03)',
                            '& .MuiAccordionSummary-content': {
                                marginLeft: theme.spacing(1),
                            },
                        }
                    )
                }
            },
            MuiAppBar: {
                variants: [
                    {
                        props: { variant: 'drawer-app-bar' },
                        style: ({ theme }) => ({
                            zIndex: 100,
                        })
                    },
                ],
                styleOverrides: {
                    root: ({ theme }) => (
                        {
                            top: 'auto',
                            backgroundColor: theme.palette.background.paper,
                            boxShadow: 'rgba(4, 17, 29, 0.25) 0px 0px 8px 0px',
                            color: theme.palette.text.primary,
                            zIndex: 120,
                        }
                    )
                },
            },
            MuiDialog: {
                styleOverrides: {
                    root: {
                        '& .MuiDialog-paper': {
                            minWidth: 400
                        }
                    }
                }
            },
            MuiLink: {
                variants: [
                    {
                        props: { variant: 'menu-item' },
                        style: {
                            textTransform: 'uppercase',
                        }
                    },
                ],

            },
            MuiListItemText: {
                styleOverrides: {
                    root: {
                        overflowWrap: 'anywhere',
                    }
                }
            },
            MuiListSubheader: {
                styleOverrides: {
                    root: {
                        minWidth: 120,
                        overflowWrap: 'anywhere',
                        background: 'none'
                    }
                }
            },
            MuiToolbar: {
                styleOverrides: {
                    root: {
                        minHeight: 'auto',
                    }
                }
            },
            MuiTypography: {
                variants: [
                    {
                        props: { variant: 'body1' },
                        style: {
                            color: 'rgb(190, 190, 190)',
                            fontSize: 14,
                            fontWeight: 500,
                        }
                    },
                    {
                        props: { variant: 'caption' },
                        style: {
                            fontSize: 16,
                            fontWeight: 600,
                        }
                    },
                ]
            },
        },
        palette: isDarkMode ? {
            mode: 'dark',
            primary: {
                main: grey[100],
                light: grey[50],
                dark: grey[200],
                contrastText: 'black'
            },
            secondary: {
                main: grey[700],
                light: grey[500],
                dark: grey[900],
                contrastText: 'white'
            },
            background: {
                paper: grey[900],
                light: '#212121'
            }
        } : {
            mode: 'light',
            primary: {
                main: '#000000',
                light: grey[500],
                dark: grey[900],
                contrastText: 'white'
            },
            secondary: {
                main: grey[100],
                light: grey[50],
                dark: grey[200],
                contrastText: 'white'
            },
            background: {
                paper: 'rgba(250, 250, 250)',
                light: '#212121'
            }
        },
    });

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={xrpltheme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </StyledEngineProvider>
    );
}
