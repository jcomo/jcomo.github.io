import { Link, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { PostPreview } from '../../interfaces/post';
import NextLink from 'next/link';
import { routes } from '../../routes';
import { DateTime } from 'luxon';

export interface HomePageProps {
    posts: PostPreview[];
}

export const HomePage = ({ posts }: HomePageProps) => {
    return (
        <React.Fragment>
            {posts.map(({ slug, title, date }) => (
                <Box key={slug} sx={{ mb: 4 }}>
                    <NextLink passHref href={routes.post(slug)}>
                        <Link
                            variant="h6"
                            color="primary"
                            sx={{
                                '&:hover': {
                                    color: (theme) =>
                                        theme.palette.background.default,
                                    backgroundColor: (theme) =>
                                        theme.palette.primary.main,
                                    textDecoration: 'none',
                                },
                            }}
                        >
                            {title}
                        </Link>
                    </NextLink>
                    <Typography variant="subtitle2" color="textSecondary">
                        {DateTime.fromISO(date).toLocaleString(
                            DateTime.DATE_FULL,
                        )}
                    </Typography>
                </Box>
            ))}
        </React.Fragment>
    );
};
