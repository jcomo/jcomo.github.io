import React from 'react';
import { DateTime } from 'luxon';
import { MarkdownContent } from '../MarkdownContent';

export interface PageLayoutProps {
    title: string;
    body: string;
    date?: string;
}

export const PageLayout = ({ title, body, date }: PageLayoutProps) => {
    const publishedAt = date ? DateTime.fromISO(date) : undefined;

    return (
        <React.Fragment>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
                {publishedAt && (
                    <p className="text-md text-gray-500">
                        {publishedAt.toLocaleString(DateTime.DATE_FULL)}
                    </p>
                )}
            </div>
            <MarkdownContent>{body}</MarkdownContent>
        </React.Fragment>
    );
};
