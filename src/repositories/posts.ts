import fs from 'fs';
import path from 'path';
import fm from 'front-matter';
import { Post } from "../interfaces/post";

export interface PostsRepository {
    getAllSlugs(): string[];
    getBySlug(slug: string): Post | null;
}

export class FileSystemPostsRepository implements PostsRepository {
    private readonly baseDir: string;

    constructor(baseDir: string) {
        this.baseDir = baseDir;
    }

    getAllSlugs(): string[] {
        const postFiles = fs.readdirSync(this.baseDir);
        return postFiles.map(filename => path.parse(filename).name);
    }

    getBySlug(slug: string): Post | null {
        const filename = path.resolve(this.baseDir, `${slug}.md`);
        const data = fs.readFileSync(filename, 'utf-8');
        const { attributes, body } = fm<Record<string, any>>(data);

        // The frontmatter parser will "cleverly" parse date strings as dates,
        // but we can't serialize these, so we format to ISO strings over the wire
        Object.keys(attributes).forEach(key => {
            const value = attributes[key];
            if (value instanceof Date) {
                attributes[key] = value.toISOString();
            }
        });

        return {
            slug,
            title: attributes.title,
            date: attributes.date,
            body,
        };
    }
}

export const getPostsRepository = () => {
    const baseDir = path.resolve('./content', 'posts');
    return new FileSystemPostsRepository(baseDir);
}