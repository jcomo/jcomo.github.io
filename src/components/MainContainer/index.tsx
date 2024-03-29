import React, { PropsWithChildren, useContext } from 'react';
import NextLink from 'next/link';
import { routes } from '../../routes';
import { DateTime } from 'luxon';
import { links } from './links';
import { ColorModeContext } from '../ColorMode';
import { SunIcon } from '@heroicons/react/outline';
import { MoonIcon } from '@heroicons/react/solid';

export const MainContainer = ({ children }: PropsWithChildren<{}>) => {
    const { mode, toggleMode } = useContext(ColorModeContext);
    const ModeIcon = mode === 'dark' ? MoonIcon : SunIcon;

    return (
        <div className="mx-auto max-w-2xl  px-4 md:px-0">
            <header className="mt-8 mb-12">
                <div className="flex items-center justify-between">
                    <NextLink passHref href={routes.index()}>
                        <a className="text-4xl font-bold no-underline">
                            <h1>Jonathan Como</h1>
                        </a>
                    </NextLink>
                    <button onClick={toggleMode} className="hidden md:block">
                        <ModeIcon className="h-6 w-6" />
                    </button>
                </div>
                <div className="mt-2 flex">
                    {links.map(({ text, href }, i) => (
                        <div key={i} className="mr-4">
                            <NextLink passHref href={href}>
                                <a className="link-secondary lowercase">
                                    {text}
                                </a>
                            </NextLink>
                        </div>
                    ))}
                </div>
            </header>

            <main>{children}</main>

            <footer className="mt-20 mb-8 text-center">
                <p className="text-light text-sm">
                    &copy; {DateTime.local().toFormat('yyyy')} Jonathan Como
                </p>
            </footer>
        </div>
    );
};
