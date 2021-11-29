import { Container, Hidden, IconButton, Link, Typography } from '@mui/material';
import React, { PropsWithChildren, useContext } from 'react';
import NextLink from 'next/link';
import { routes } from '../../routes';
import { DateTime } from 'luxon';
import { Box } from '@mui/system';
import { links } from './links';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness4OutlinedIcon from '@mui/icons-material/Brightness4Outlined';
import { ColorModeContext } from '../ColorMode';

export const MainContainer = ({ children }: PropsWithChildren<{}>) => {
    const { mode, toggleMode } = useContext(ColorModeContext);
    const ModeIcon =
        mode === 'dark' ? Brightness4Icon : Brightness4OutlinedIcon;

    return (
        <Container maxWidth="md">
            <Box component="header" sx={{ mt: 4, mb: 6 }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <NextLink passHref href={routes.index()}>
                        <Link variant="h1" color="textPrimary" underline="none">
                            Jonathan Como
                        </Link>
                    </NextLink>
                    <Hidden smDown>
                        <IconButton onClick={toggleMode}>
                            <ModeIcon
                                sx={{
                                    color: (theme) =>
                                        theme.palette.text.primary,
                                }}
                            />
                        </IconButton>
                    </Hidden>
                </Box>
                <Box sx={{ mt: 1, display: 'flex' }}>
                    {links.map(({ text, href }, i) => (
                        <Box key={i} sx={{ mr: 2 }}>
                            <Link
                                color="secondary"
                                href={href}
                                sx={{
                                    textTransform: 'lowercase',
                                    '&:hover': {
                                        color: (theme) =>
                                            theme.palette.background.default,
                                        backgroundColor: (theme) =>
                                            theme.palette.secondary.main,
                                        textDecoration: 'none',
                                    },
                                }}
                            >
                                {text}
                            </Link>
                        </Box>
                    ))}
                </Box>
            </Box>

            <main>{children}</main>

            <Box component="footer" sx={{ mt: 10, mb: 4, textAlign: 'center' }}>
                <Typography color="textSecondary" variant="caption">
                    &copy; {DateTime.local().toFormat('yyyy')} Jonathan Como
                </Typography>
            </Box>
        </Container>
    );
};
