import { Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Cocktail, CocktailMenu } from '../../interfaces/cocktails';
import Image from 'next/image';

export interface CocktailsPageProps {
    menus: CocktailMenu[];
}

export const CocktailsPage = ({ menus }: CocktailsPageProps) => {
    return (
        <Container maxWidth="sm">
            <Box sx={{ my: 8, textAlign: 'center' }}>
                <Box sx={{ mb: 8 }}>
                    <Box sx={{ mb: 2 }}>
                        <Image height={64} width={64} src="/images/wobbly-paw.jpg" />
                    </Box>
                    <Typography variant="h1">
                        The Wobbly Paw
                    </Typography>
                </Box>

                {menus.map(({ name, cocktails }, i) => (
                    <Box key={i} sx={{ mb: 10 }}>
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="h3" sx={{ textTransform: 'lowercase' }}>
                                {name}
                            </Typography>
                        </Box>

                        {cocktails.map(({ name, glass, ingredients }, j) => (
                            <Box key={j} sx={{ mb: 4 }}>
                                <Box sx={{ mb: 1 }}>
                                    <Image height={48} width={48} src={`/images/cocktails/${glass}.png`} />
                                </Box>
                                <Typography variant="h5" sx={{ textTransform: 'lowercase' }}>
                                    {name}
                                </Typography>
                                <Typography sx={{ textTransform: 'lowercase' }}>
                                    {ingredients.join(', ')}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                ))}
            </Box>
        </Container>
    );
}