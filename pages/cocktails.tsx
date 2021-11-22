import React from 'react';
import { CocktailsPage } from '../src/components/CocktailsPage';
import { CocktailMenu } from '../src/interfaces/cocktails';
import path from 'path';
import fs from 'fs';

interface Props {
    menus: CocktailMenu[];
}

export async function getStaticProps() {
    const dataPath = path.resolve('./content', 'data', 'cocktails.json')
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    return {
        props: {
            theme: 'cocktails',
            menus: data.menus,
        }
    }
}

function Route({ menus }: Props) {
    return (
        <CocktailsPage menus={menus} />
    );
}

export default Route;