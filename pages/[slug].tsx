import React from 'react';
import Head from 'next/head';
import { PageLayout } from '../src/components/PageLayout';
import { MainContainer } from '../src/components/MainContainer';
import { getPostsRepository } from '../src/repositories';

interface Context {
    params: { slug: string };
}

interface Props {
    body: string;
    attributes: {
        title: string;
        date?: string;
    };
}

export async function getStaticPaths() {
    const postsRepo = getPostsRepository();
    const paths = postsRepo.getAllSlugs().map(slug => ({
        params: { slug },
    }));

    return { paths, fallback: false };
}

export async function getStaticProps({ params }: Context) {
    const postsRepo = getPostsRepository();
    const post = postsRepo.getBySlug(params.slug);
    if (!post) {
        return { notFound: true };
    }

    const { body, ...attributes } = post;
    return { props: { attributes, body } };
}

function Route({ attributes, body }: Props) {
    return (
        <React.Fragment>
            <Head>
                <title>{attributes.title}</title>
            </Head>

            <MainContainer>
                <PageLayout
                    title={attributes.title}
                    date={attributes.date}
                    body={body}
                />
            </MainContainer>
        </React.Fragment>
    )
}

export default Route;
