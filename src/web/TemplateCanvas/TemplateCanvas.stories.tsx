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
    args: {
        title: 'Testimonial grid',
        theme: 'light',
        ctaLink: 'https://app.croct.com',
        ctaLabel: 'Edit content',
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
    },
};

type Story = StoryObj<TemplateCanvasProps>;

export const Regular: Story = {};

export const Dark: Story = {
    name: 'Regular (Dark)',
    args: {
        theme: 'dark',
    },
};

export default meta;
