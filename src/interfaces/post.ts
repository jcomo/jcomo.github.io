export interface PostPreview {
    slug: string;
    title: string;
    date: string;
}

export interface Post extends PostPreview {
    body: string;
}