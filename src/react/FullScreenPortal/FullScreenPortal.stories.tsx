import type {Meta, StoryObj} from '@storybook/react';
import {Fragment, ReactElement} from 'react';
import {expect, within} from '@storybook/test';
import {FullScreenPortal, FullScreenPortalProps} from './index.tsx';
import styles from './stories.module.css';
import css from './stories.module.css?inline';

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
            <Fragment>
                <style>{css}</style>
                <div className={styles.example}>
                    This example is rendered in the body of the page.
                </div>
            </Fragment>
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
        const container = within(canvasElement.parentElement as HTMLElement);

        await expect(container.findByText('This example is rendered in the body of the page.'))
            .resolves
            .toBeInTheDocument();
    },
};

export default meta;
