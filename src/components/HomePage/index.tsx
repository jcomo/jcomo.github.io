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
                <div key={slug} className="mb-8">
                    <NextLink passHref href={routes.post(slug)}>
                        <a className="link-primary text-xl">{title}</a>
                    </NextLink>
                    <p className="text-light mt-1 text-base">
                        {DateTime.fromISO(date).toLocaleString(
                            DateTime.DATE_FULL,
                        )}
                    </p>
                </div>
            ))}
        </React.Fragment>
    );
};
