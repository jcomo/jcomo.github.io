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
    const thing = 1;
    const prismStyle = thing > 0 ? lightTheme : darkTheme;

    return (
        <ReactMarkdown
            className={`
                prose-pre:not-prose
                prose-a:link-primary
                prose
                max-w-none
                prose-pre:bg-transparent
                prose-pre:p-0
                dark:prose-invert
            `}
            components={{
                a({ children, href, ...rest }) {
                    return (
                        <NextLink passHref href={href || '#'}>
                            <a {...rest}>{children}</a>
                        </NextLink>
                    );
                },
                code({ inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    if (!match || inline) {
                        return (
                            <code className={className} {...props}>
                                {children}
                            </code>
                        );
                    }

                    return (
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
                    );
                },
            }}
        >
            {children}
        </ReactMarkdown>
    );
};
