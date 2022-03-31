import React from 'react';
import { CocktailsPage } from '../src/components/CocktailsPage';
import { CocktailMenu } from '../src/interfaces/cocktails';
import path from 'path';
import fs from 'fs';
import { SocialTags } from '../src/components/SocialTags';
import Head from 'next/head';

interface Props {
    menus: CocktailMenu[];
}

export async function getStaticProps() {
    const dataPath = path.resolve('./content', 'data', 'cocktails.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    return {
        props: {
            theme: 'cocktails',
            menus: data.menus,
        },
    };
}

function Route({ menus }: Props) {
    return (
        <React.Fragment>
            <Head>
                <SocialTags
                    title="The Wobbly Paw"
                    description="Enjoy seasonal and classic cocktails at The Wobbly Paw, est. 2020"
                    image="https://www.jcomo.me/images/wobbly-paw-share.jpg"
                    url="https://www.jcomo.me/cocktails"
                />
            </Head>
            <CocktailsPage menus={menus} />
        </React.Fragment>
    );
}

export default Route;
