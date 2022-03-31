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
                        <a className="text-xl text-blue-600 underline hover:bg-blue-600 hover:text-white hover:no-underline">
                            {title}
                        </a>
                    </NextLink>
                    <p className="mt-1 text-base text-gray-500">
                        {DateTime.fromISO(date).toLocaleString(
                            DateTime.DATE_FULL,
                        )}
                    </p>
                </div>
            ))}
        </React.Fragment>
    );
};
