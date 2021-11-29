import { Typography } from '@mui/material';
import React from 'react';
import { DateTime } from 'luxon';
import { Box } from '@mui/system';
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
            <MarkdownContent>{body}</MarkdownContent>
        </React.Fragment>
    );
};
