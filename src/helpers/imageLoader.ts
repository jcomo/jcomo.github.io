import { ImageLoaderProps } from 'next/image';

// Simple passthrough loader to satisfy the `export` command. Can improve
// this later to use optimized images.
export const loader = ({ src }: ImageLoaderProps) => {
    return src;
};
