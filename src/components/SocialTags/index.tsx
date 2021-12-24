import React from 'react';

const error = (message: string) => {
    if (process.env.NODE_ENV === 'development') {
        throw new Error(message);
    } else {
        console.error(message);
    }
};

const isAbsoluteUrl = (url: string) => {
    return url.indexOf('http://') === 0 || url.indexOf('https://') == 0;
};

export interface SocialTagsProps {
    title: string;
    description?: string;
    url: string;
    canonical?: string;
    image?: string;
}

export const SocialTags = ({
    title,
    description,
    url,
    canonical,
    image,
}: SocialTagsProps) => {
    if (!isAbsoluteUrl(url)) {
        error('URLs must be absolute. Check the `url` prop');
    }

    if (image && !isAbsoluteUrl(image)) {
        error('URLs must be absolute. Check the `image` prop');
    }

    if (canonical && !isAbsoluteUrl(canonical)) {
        error('URLs must be absolute. Check the `canonical` prop');
    }

    return (
        <React.Fragment>
            <link rel="canonical" href={canonical ?? url} />

            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="Jonathan Como" />
            <meta property="og:locale" content="en_US" />
            <meta property="og:title" content={title} />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={image} />

            <meta property="twitter:site" content="@jonathancomo" />
            <meta property="twitter:creator" content="Jonathan Como" />
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:image" content={image} />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={title} />

            {description && (
                <React.Fragment>
                    <meta name="description" content={description} />
                    <meta property="og:description" content={description} />
                    <meta
                        property="twitter:description"
                        content={description}
                    />
                </React.Fragment>
            )}
        </React.Fragment>
    );
};
