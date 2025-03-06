import type {Meta, StoryFn, StoryObj} from '@storybook/react';
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

const SizesTemplate: StoryFn<LinkButtonProps> = args => (
    <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
        <LinkButton {...args} size="md" />
        <LinkButton {...args} size="lg" />
    </div>
);

export const Sizes: Story = {
    args: {
        href: 'https://app.croct.com',
        label: 'Edit content',
    },
    render: SizesTemplate,
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
