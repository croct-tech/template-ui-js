import type {Meta, StoryObj} from '@storybook/react';
import {within, expect} from '@storybook/test';
import {LinkButton, LinkButtonProps} from './index.tsx';

const meta: Meta<LinkButtonProps> = {
    title: 'LinkButton',
    component: LinkButton,
    args: {
        theme: 'light',
    },
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof LinkButton>;

export const Regular: Story = {
    args: {
        href: 'https://app.croct.com',
        label: 'Edit content',
    },
    play: async ({canvasElement}) => {
        const button = within(canvasElement).getByRole('link', {name: 'Edit content'});

        await expect(button).toHaveAttribute('href', 'https://app.croct.com');
    },
};

export const Sizes: Story = {
    args: {
        href: 'https://app.croct.com',
        label: 'Edit content',
    },
    render: (args: LinkButtonProps) => (
        <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
            <LinkButton {...args} size="md" />
            <LinkButton {...args} size="lg" />
        </div>
    ),
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
        size: 'lg',
        href: 'https://app.croct.com',
        branded: true,
        position: 'bottom-right',
        label: 'Edit content',
    },
};
