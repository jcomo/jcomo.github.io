import { Link, Typography } from '@mui/material';
import { Box, useTheme } from '@mui/system';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula as darkTheme } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { vs as lightTheme } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import NextLink from 'next/link';

export interface MarkdownContentProps {
    children: string;
}

export const MarkdownContent = ({ children }: MarkdownContentProps) => {
    const theme = useTheme();
    const prismStyle = theme.palette.mode === 'dark' ? darkTheme : lightTheme;

    return (
        <ReactMarkdown
            components={{
                h1({ children }) {
                    return (
                        <Typography sx={{ mt: 4, mb: 2 }} variant="h3">
                            {children}
                        </Typography>
                    );
                },
                h2({ children }) {
                    return (
                        <Typography sx={{ mt: 4, mb: 2 }} variant="h4">
                            {children}
                        </Typography>
                    );
                },
                h3({ children }) {
                    return (
                        <Typography paragraph variant="h5">
                            {children}
                        </Typography>
                    );
                },
                h4({ children }) {
                    return (
                        <Typography paragraph variant="h6">
                            {children}
                        </Typography>
                    );
                },
                h5({ children }) {
                    return (
                        <Typography paragraph variant="h6">
                            {children}
                        </Typography>
                    );
                },
                h6({ children }) {
                    return (
                        <Typography paragraph variant="h6">
                            {children}
                        </Typography>
                    );
                },
                p({ children }) {
                    return <Typography paragraph>{children}</Typography>;
                },
                blockquote({ children }) {
                    return (
                        <Box
                            sx={{
                                px: 4,
                                my: 6,
                                borderLeft: (theme) =>
                                    `4px solid ${theme.palette.text.secondary}`,
                            }}
                        >
                            <Typography color="textSecondary">
                                {children}
                            </Typography>
                        </Box>
                    );
                },
                a({ children, href, target, rel }) {
                    return (
                        <NextLink passHref href={href || '#'}>
                            <Link
                                color="primary"
                                target={target}
                                rel={rel}
                                sx={{
                                    '&:hover': {
                                        color: (theme) =>
                                            theme.palette.background.default,
                                        backgroundColor: (theme) =>
                                            theme.palette.primary.main,
                                        textDecoration: 'none',
                                    },
                                }}
                            >
                                {children}
                            </Link>
                        </NextLink>
                    );
                },
                pre({ children }) {
                    return <pre style={{ fontSize: '1rem' }}>{children}</pre>;
                },
                // eslint-disable-next-line no-unused-vars
                code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                        <SyntaxHighlighter
                            PreTag="div"
                            language={match[1]}
                            style={prismStyle}
                            codeTagProps={{
                                style: {
                                    fontSize: '1rem',
                                    fontFamily: `'Source Code Pro', 'Inconsolata', monospace`,
                                },
                            }}
                        >
                            {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                    ) : (
                        <code className={className} {...props}>
                            {children}
                        </code>
                    );
                },
            }}
        >
            {children}
        </ReactMarkdown>
    );
};
