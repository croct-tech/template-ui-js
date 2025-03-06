import type {Meta, StoryObj} from '@storybook/web-components';
import {TemplateCanvas, TemplateCanvasProps} from './index';

customElements.define('template-canvas', TemplateCanvas);

const meta: Meta<TemplateCanvasProps> = {
    title: 'TemplateCanvas',
    tags: ['autodocs'],
    component: 'template-canvas',
    parameters: {
        layout: 'fullscreen',
    },
    render: (args): string => {
        const maxWidth = args.maxWidth !== undefined ? `max-width="${args.maxWidth}"` : '';
        const maxHeight = args.maxHeight !== undefined ? `max-height="${args.maxHeight}"` : '';

        return `
            <template-canvas
                ${maxWidth}
                ${maxHeight}
                theme="${args.theme}"
                title="${args.title}"
                cta-label="${args.ctaLabel}"
                cta-link="${args.ctaLink}"
                sub-brand-label="${args.subBrandLabel}"
                sub-brand-link="${args.subBrandLink}"
            >
                <div style="width: 100%; height: 400px"></div>
            </template-canvas>
        `;
    },
    args: {
        title: 'Testimonial grid',
        theme: 'light',
        ctaLink: 'https://app.croct.com',
        ctaLabel: 'Edit content',
        subBrandLabel: 'templates',
        subBrandLink: 'https://croct.com/templates',
    },
    argTypes: {
        title: {
            name: 'Title',
            description: 'The title of the template.',
        },
        children: {
            name: 'Template',
            description: 'The template component to be shown.',
            control: {
                disable: true,
            },
        },
        ctaLabel: {
            name: 'Call to action label',
            description: 'The label of the call to action.',
        },
        ctaLink: {
            name: 'Call to action link',
            description: 'The URL to navigate to when the call to action is clicked.',
        },
        theme: {
            name: 'Theme',
            description: 'The theme of the template.',
        },
        subBrandLabel: {
            name: 'Sub brand label',
            description: 'The sub-brand label to show on the side of the logo.',
        },
        subBrandLink: {
            name: 'Sub brand link',
            description: 'The URL of the sub-brand.',
        },
        maxWidth: {
            name: 'Max width',
            description: 'The template max width.',
            control: {
                type: 'number',
            },
        },
        maxHeight: {
            name: 'Max height',
            description: 'The template max height.',
            control: {
                type: 'number',
            },
        },
    },
};

type Story = StoryObj<TemplateCanvasProps>;

export const Regular: Story = {
    argTypes: {
        theme: {
            name: 'Theme',
            control: {
                disable: true,
            },
        },
    },
};

export const Dark: Story = {
    name: 'Regular (Dark)',
    args: {
        theme: 'dark',
    },
    argTypes: {
        theme: {
            name: 'Theme',
            control: {
                disable: true,
            },
        },
    },
};

export const MaximumSize: Story = {
    name: 'Maximum size',
    args: {
        maxWidth: 600,
        maxHeight: 256,
    },
};

export default meta;
