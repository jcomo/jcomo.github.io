import React, { useContext } from 'react';
import { CocktailMenu } from '../../interfaces/cocktails';
import { loader } from '../../helpers/imageLoader';
import { ColorModeContext } from '../ColorMode';
import Image from 'next/image';

export interface CocktailsPageProps {
    menus: CocktailMenu[];
}

export const CocktailsPage = ({ menus }: CocktailsPageProps) => {
    const { mode } = useContext(ColorModeContext);
    console.log(mode);

    return (
        <div className="mx-auto max-w-sm">
            <div className="my-16 text-center">
                <div className="mb-16">
                    <div className="mb-4">
                        <Image
                            unoptimized
                            height={64}
                            width={64}
                            src="/images/wobbly-paw.png"
                            alt="The Wobbly Paw"
                            loader={loader}
                        />
                    </div>
                    <h1 className="text-4xl font-semibold">The Wobbly Paw</h1>
                </div>

                {menus.map(({ name, cocktails }, i) => (
                    <div key={i} className="mb-20">
                        <div className="mb-8">
                            <h2 className="text-3xl lowercase">{name}</h2>
                        </div>

                        {cocktails.map(({ name, glass, ingredients }, j) => (
                            <div key={j} className="mb-8">
                                <div className="mb-2">
                                    <Image
                                        unoptimized
                                        height={48}
                                        width={48}
                                        src={`/images/cocktails/${glass}.png`}
                                        alt={`${glass} cocktail glass`}
                                        loader={loader}
                                    />
                                </div>
                                <h3 className="text-lg font-semibold lowercase">
                                    {name}
                                </h3>
                                <p className="lowercase">
                                    {ingredients.join(', ')}
                                </p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};
