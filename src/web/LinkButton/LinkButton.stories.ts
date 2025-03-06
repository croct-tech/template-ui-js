import type {Meta, StoryObj} from '@storybook/web-components';
import {LinkButton, LinkButtonProps} from './index.tsx';

customElements.define('link-button', LinkButton);

const meta = {
    title: 'LinkButton',
    tags: ['autodocs'],
    args: {
        theme: 'light',
        size: 'md',
    },
    render: (args): string => `
<link-button
    href="${args.href}"
    branded="${args.branded}"
    position="${args.position}"
    label="${args.label}"
    theme="${args.theme}"
    size="${args.size}"
>
</link-button>
    `,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        href: {
            description: 'The URL to navigate to when the button is clicked.',
            control: {
                type: 'text',
            },
        },
        label: {
            description: 'The label of the button.',
            control: {
                type: 'text',
            },
        },
        branded: {
            description: 'Whether the button should display the Croct logo.',
            control: {
                type: 'boolean',
            },
        },
        position: {
            description: 'The floating position of the button.',
            control: {
                type: 'select',
                options: ['bottom-right', 'bottom-left'],
            },
        },
        theme: {
            description: 'The theme of the button.',
            control: {
                type: 'select',
                options: ['light', 'dark'],
            },
        },
    },
} satisfies Meta<LinkButtonProps>;

type Story = StoryObj<LinkButtonProps>;

export default meta;

export const Regular: Story = {
    args: {
        href: 'https://app.croct.com',
        label: 'Edit content',
    },
};

export const Sizes: Story = {
    args: {
        href: 'https://app.croct.com',
        label: 'Edit content',
    },
    render: (args): string => `
        <div style="display: flex; align-items: center; gap: 16px">
            <link-button
                href="${args.href}"
                branded="${args.branded}"
                position="${args.position}"
                label="${args.label}"
                theme="${args.theme}"
                size="md"
            >
            </link-button>
            <link-button
                href="${args.href}"
                branded="${args.branded}"
                position="${args.position}"
                label="${args.label}"
                theme="${args.theme}"
                size="lg"
            >
            </link-button>
        </div>
    `,
};

export const Branded: Story = {
    args: {
        href: 'https://app.croct.com',
        branded: true,
        label: 'Edit content',
    },
};

export const Floating: Story = {
    args: {
        href: 'https://app.croct.com',
        branded: true,
        position: 'bottom-right',
        label: 'Edit content',
    },
    tags: ['!autodocs'],
};
