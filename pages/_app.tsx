import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ColorModeContext } from '../src/components/ColorMode';
import { useColorModeContext } from '../src/hooks/useColorModeContext';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
    const [colorModeContext] = useColorModeContext();
    const themeColor = colorModeContext.mode === 'dark' ? 'black' : 'white';

    return (
        <React.Fragment>
            <Head>
                <title>Jonathan Como</title>
                <meta
                    name="viewport"
                    content="initial-scale=1, width=device-width"
                />
                <meta name="theme-color" content={themeColor} />
            </Head>
            <ColorModeContext.Provider value={colorModeContext}>
                <Component {...pageProps} />
            </ColorModeContext.Provider>
        </React.Fragment>
    );
}
