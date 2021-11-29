import fs from 'fs';
import path from 'path';
import fm from 'front-matter';
import { Post, PostPreview } from '../interfaces/post';

export interface PostsRepository {
    getAll: () => Promise<PostPreview[]>;
    getAllSlugs: () => Promise<string[]>;
    getBySlug: (slug: string) => Promise<Post | null>;
}

export class FileSystemPostsRepository implements PostsRepository {
    private readonly baseDir: string;

    constructor(baseDir: string) {
        this.baseDir = baseDir;
    }

    async getAll(): Promise<PostPreview[]> {
        const previews: PostPreview[] = [];
        const slugs = await this.getAllSlugs();
        const promises = slugs.map(async (slug) => {
            const post = await this.getBySlug(slug);
            if (post) {
                previews.push(post);
            }
        });

        // Wait for the list to be populated
        await Promise.all(promises);

        // Sort by post date, descending
        return previews.sort((a, b) => (a.date > b.date ? -1 : 1));
    }

    async getAllSlugs(): Promise<string[]> {
        return new Promise((resolve, reject) => {
            fs.readdir(this.baseDir, 'utf-8', (err, filenames) => {
                if (err) {
                    reject(err);
                } else {
                    const slugs = filenames.map(
                        (filename) => path.parse(filename).name,
                    );
                    resolve(slugs);
                }
            });
        });
    }

    async getBySlug(slug: string): Promise<Post | null> {
        const filename = path.resolve(this.baseDir, `${slug}.md`);
        return new Promise((resolve, reject) => {
            fs.readFile(filename, 'utf-8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    const { attributes, body } = fm<Record<string, any>>(data);

                    // The frontmatter parser will "cleverly" parse date strings as dates,
                    // but we can't serialize these, so we format to ISO strings over the wire
                    Object.keys(attributes).forEach((key) => {
                        const value = attributes[key];
                        if (value instanceof Date) {
                            attributes[key] = value.toISOString();
                        }
                    });

                    resolve({
                        slug,
                        title: attributes.title,
                        date: attributes.date,
                        body,
                    });
                }
            });
        });
    }
}

export const getPostsRepository = () => {
    const baseDir = path.resolve('./content', 'posts');
    return new FileSystemPostsRepository(baseDir);
};
