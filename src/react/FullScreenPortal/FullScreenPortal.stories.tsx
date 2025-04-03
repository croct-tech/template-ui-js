import type {Meta, StoryObj} from '@storybook/react';
import {ReactElement} from 'react';
import {expect, within} from '@storybook/test';
import {FullScreenPortal, FullScreenPortalProps} from './index.tsx';
import style from './styles.module.css';

const meta: Meta<FullScreenPortalProps> = {
    title: 'FullScreenPortal',
    component: FullScreenPortal,
    decorators: [
        (Story): ReactElement => (
            <div style={{minWidth: '100%'}}>
                <Story />
            </div>
        ),
    ],
    args: {
        children: (
            <div className={style.example}>
                This example is rendered in the body of the page.
            </div>
        ),
    },
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
};

type Story = StoryObj<typeof meta>;

export const Example: Story = {
    args: {
    },
    play: async ({canvasElement}) => {
        const portal = canvasElement.parentElement?.querySelector('[id^="full-screen-portal-"]') ?? null;

        expect(portal).not.toBeNull();

        const container = within(portal as HTMLElement);

        await expect(await container.findByRole('This example is rendered in the body of the page.'))
            .toBeInTheDocument();
    },
};

export default meta;
