import fs from 'fs';
import path from 'path';
import fm from 'front-matter';
import React from 'react';
import Head from 'next/head';
import { PageLayout } from '../src/components/PageLayout';
import { MainContainer } from '../src/components/MainContainer';

interface Context {
    params: { slug: string };
}

interface Props {
    body: string;
    attributes: {
        title: string;
        layout?: string;
        date?: string;
    };
}

export async function getStaticPaths() {
    const postDir = path.resolve('./content', 'posts');
    const postFiles = fs.readdirSync(postDir);
    const paths = postFiles.map(filename => ({
        params: { slug: path.parse(filename).name },
    }));

    return { paths, fallback: false };
}

export async function getStaticProps({ params }: Context) {
    // TODO: move clever way to do this, include "pages" too
    const filename = path.resolve('./content', 'posts', `${params.slug}.md`);
    const data = fs.readFileSync(filename, 'utf-8');
    const { attributes, body } = fm<Record<string, any>>(data);

    // The frontmatter parser will "cleverly" parse date strings as dates,
    // but we can't serialize these, so we format to ISO strings over the wire
    Object.keys(attributes).forEach(key => {
        const value = attributes[key];
        if (value instanceof Date) {
            attributes[key] = value.toISOString();
        }
    })

    return { props: { attributes, body } };
}

function Route({ attributes, body }: Props) {
    const { layout = 'post', ...props } = attributes;

    return (
        <React.Fragment>
            <Head>
                <title>{props.title}</title>
            </Head>

            <MainContainer>
                {layout === 'post' ? (
                    <PageLayout
                        title={props.title}
                        date={props.date}
                        body={body}
                    />
                ) : null}
            </MainContainer>
        </React.Fragment>
    )
}

export default Route;