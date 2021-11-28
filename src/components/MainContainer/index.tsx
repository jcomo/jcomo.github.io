import { Container, Link, Typography } from '@mui/material';
import React, { PropsWithChildren } from 'react';
import NextLink from 'next/link';
import { routes } from '../../routes';
import { DateTime } from 'luxon';
import { Box } from '@mui/system';
import { links } from './links';

export const MainContainer = ({ children }: PropsWithChildren<{}>) => {
    return (
        <Container maxWidth="md">
            <Box component="header" sx={{ mt: 4, mb: 6 }}>
                <NextLink passHref href={routes.index()}>
                    <Link variant="h1" color="textPrimary" underline="none">
                        Jonathan Como
                    </Link>
                </NextLink>
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
