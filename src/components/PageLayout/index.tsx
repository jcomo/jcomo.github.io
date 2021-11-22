import { Link, Typography } from '@mui/material';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { DateTime } from 'luxon';
import { Box } from '@mui/system';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism'

export interface PageLayoutProps {
    title: string;
    body: string;
    date?: string;
}

export const PageLayout = ({ title, body, date }: PageLayoutProps) => {
    const publishedAt = date ? DateTime.fromISO(date) : undefined;

    return (
        <React.Fragment>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h2" component="h1">
                    {title}
                </Typography>
                {publishedAt && (
                    <Typography variant="subtitle2" color="textSecondary">
                        {publishedAt.toLocaleString(DateTime.DATE_FULL)}
                    </Typography>
                )}
            </Box>

            <ReactMarkdown
                children={body}
                components={{
                    h1({ children }) {
                        return <Typography sx={{ mt: 4, mb: 2 }} variant="h3">{children}</Typography>
                    },
                    h2({ children }) {
                        return <Typography sx={{ mt: 4, mb: 2 }} variant="h4">{children}</Typography>
                    },
                    h3({ children }) {
                        return <Typography paragraph variant="h5">{children}</Typography>
                    },
                    h4({ children }) {
                        return <Typography paragraph variant="h6">{children}</Typography>
                    },
                    h5({ children }) {
                        return <Typography paragraph variant="h6">{children}</Typography>
                    },
                    h6({ children }) {
                        return <Typography paragraph variant="h6">{children}</Typography>
                    },
                    p({ children }) {
                        return <Typography paragraph>{children}</Typography>
                    },
                    a({ children, href, target, rel }) {
                        return <Link color="primary" href={href} target={target} rel={rel} sx={{
                            '&:hover': {
                                color: (theme) => theme.palette.background.default,
                                backgroundColor: (theme) => theme.palette.primary.main,
                                textDecoration: 'none',
                            }
                        }}>{children}</Link>
                    },
                    pre({ children }) {
                        return (
                            <pre style={{ fontSize: '1rem' }}>{children}</pre>
                        );
                    },
                    code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '')
                        return !inline && match ? (
                            <SyntaxHighlighter language={match[1]} style={dracula} PreTag="div">
                                {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                        ) : (
                            <code className={className} {...props}>
                                {children}
                            </code>
                        )
                    },
                }}
            />
        </React.Fragment>
    );
}