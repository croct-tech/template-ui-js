import type {Meta, StoryObj} from '@storybook/react';
import {within, expect} from '@storybook/test';
import {LinkButton} from './index.tsx';

const meta = {
    title: 'LinkButton',
    component: LinkButton,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof LinkButton>;

export default meta;

type Story = StoryObj<typeof meta>;

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
};
