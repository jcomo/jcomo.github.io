import { MainContainer } from '../src/components/MainContainer';
import path from 'path';
import fs from 'fs';
import fm from 'front-matter';
import { PostPreview } from '../src/interfaces/post';
import { HomePage } from '../src/components/HomePage';

interface Props {
    posts: PostPreview[];
}

export async function getStaticProps() {
    const postDir = path.resolve('./content', 'posts');
    const postFiles = fs.readdirSync(postDir);
    const posts = postFiles.map((filename) => {
        const data = fs.readFileSync(path.resolve(postDir, filename), 'utf-8');
        const { attributes } = fm<Record<string, any>>(data);

        // TODO: use permalink instead
        return {
            slug: path.parse(filename).name,
            title: attributes.title,
            date: attributes.date.toISOString(),
        };
    });

    return { props: { posts } };
}

const Route = ({ posts }: Props) => {
    return (
        <MainContainer>
            <HomePage posts={posts} />
        </MainContainer>
    );
};

export default Route;
