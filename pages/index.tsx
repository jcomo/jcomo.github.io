import { MainContainer } from '../src/components/MainContainer';
import { PostPreview } from '../src/interfaces/post';
import { HomePage } from '../src/components/HomePage';
import { getPostsRepository } from '../src/repositories';

interface Props {
    posts: PostPreview[];
}

export async function getStaticProps() {
    const postsRepo = getPostsRepository();
    const posts = postsRepo.getAll();
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
