import type {Meta, StoryObj} from '@storybook/react';
import {ReactElement} from 'react';
import {expect, within} from '@storybook/test';
import {TemplateCanvas, TemplateCanvasProps} from './index.tsx';

const meta: Meta<TemplateCanvasProps> = {
    title: 'TemplateCanvas',
    component: TemplateCanvas,
    decorators: [
        (Story): ReactElement => (
            <div style={{minWidth: '100%'}}>
                <Story />
            </div>
        ),
    ],
    args: {
        title: 'Testimonial grid',
        theme: 'light',
        subBrandLabel: 'templates',
        ctaLabel: 'Edit content',
        ctaLink: 'https://app.croct.com',
        subBrandLink: 'https://croct.com/templates',
        children: (
            <div style={{width: '100%', height: 400}} />
        ),
    },
    argTypes: {
        title: {
            name: 'Title',
        },
        ctaLabel: {
            name: 'Call to action label',
        },
        ctaLink: {
            name: 'Call to action link',
        },
        children: {
            name: 'Template',
            control: {
                disable: true,
            },
        },
        theme: {
            name: 'Theme',
            control: {
                type: 'radio',
                labels: {
                    light: 'Light',
                    dark: 'Dark',
                },
            },
        },
        subBrandLabel: {
            name: 'Sub brand label',
        },
        subBrandLink: {
            name: 'Sub brand link',
        },
        maxWidth: {
            name: 'Max width',
        },
        maxHeight: {
            name: 'Max height',
        },
    },
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
};

type Story = StoryObj<typeof meta>;

export const Regular: Story = {
    play: async ({canvasElement}) => {
        const container = within(canvasElement);

        await expect(container.getByRole('heading', {name: 'Testimonial grid', level: 1})).toBeInTheDocument();

        await expect(container.getByText('/ templates')).toBeInTheDocument();

        const cta = container.getByRole('link', {name: 'Edit content'});

        await expect(cta).toBeInTheDocument();

        await expect(cta).toHaveAttribute('href', 'https://app.croct.com');
    },
};

export const Dark: Story = {
    name: 'Regular (Dark)',
    args: {
        theme: 'dark',
    },
};

export const MaximumSize: Story = {
    name: 'Maximum size',
    args: {
        maxWidth: 500,
        maxHeight: 200,
    },
    play: async ({canvasElement}) => {
        const container = within(canvasElement);

        await expect(container.getByRole('heading', {name: 'Testimonial grid', level: 1})).toBeInTheDocument();
    },
};

export default meta;
