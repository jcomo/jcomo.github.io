import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from '../src/createEmotionCache';
import { ColorModeContext } from '../src/components/ColorMode';
import { useColorModeContext } from '../src/hooks/useColorModeContext';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

export default function MyApp({
    Component,
    pageProps,
    emotionCache = clientSideEmotionCache,
}: MyAppProps) {
    const [colorModeContext, theme] = useColorModeContext(pageProps.theme);

    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <title>Jonathan Como</title>
                <meta
                    name="viewport"
                    content="initial-scale=1, width=device-width"
                />
                <meta
                    name="theme-color"
                    content={theme.palette.background.default}
                />
            </Head>
            <ColorModeContext.Provider value={colorModeContext}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Component {...pageProps} />
                </ThemeProvider>
            </ColorModeContext.Provider>
        </CacheProvider>
    );
}
