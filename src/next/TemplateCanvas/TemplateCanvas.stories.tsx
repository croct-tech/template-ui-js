import type {Meta, StoryObj} from '@storybook/react';
import {ReactElement} from 'react';
import {expect, within} from '@storybook/test';
import styles from '../../react/TemplateCanvas/stories.module.css';
import {TemplateCanvas, TemplateCanvasProps} from './index.tsx';
import {embeddedFlag} from '../../react/TemplateCanvas';

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
        title: 'Template title',
        theme: 'light',
        subBrandLabel: 'templates',
        ctaLabel: 'Edit content',
        ctaLink: 'https://app.croct.com',
        subBrandLink: 'https://croct.com/templates',
        children: (
            <div className={styles.example} style={{width: '100%', height: 400}}>
                Template content.
            </div>
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
        src: {
            name: 'Iframe source',
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
        minHeight: {
            name: 'Min height',
        },
        maxHeight: {
            name: 'Max height',
        },
    },
    parameters: {
        layout: 'fullscreen',
        nextjs: {
            appDirectory: true, // 👈 Set this
        },
    },
    tags: ['autodocs'],
};

type Story = StoryObj<typeof TemplateCanvas>;

export const Inline: Story = {
    argTypes: {
        theme: {
            name: 'Theme',
            control: {
                disable: true,
            },
        },
    },
    play: async ({canvasElement, args}) => {
        const container = within(canvasElement);

        await expect(container.getByRole('heading', {name: args.title, level: 1})).toBeInTheDocument();

        await expect(container.getByText(`/ ${args.subBrandLabel}`)).toBeInTheDocument();

        const cta = container.getByRole('link', {name: args.ctaLabel});

        await expect(cta).toBeInTheDocument();

        await expect(cta).toHaveAttribute('href', args.ctaLink);
    },
};

export const Iframe: Story = {
    args: {
        src: 'iframe.html?viewMode=docs&id=templatecanvas--docs',
        fullScreen: true,
    },
};

export const SelfEmbedded: Story = {
    args: {
        src: '#',
        fullScreen: true,
    },
    play: async ({canvasElement, args}) => {
        const container = within(canvasElement);

        const iframe = container.getByTitle(args.title) as HTMLIFrameElement;

        await expect(iframe).toBeInTheDocument();

        await expect(iframe).toHaveAttribute('src', '/?__embedded=true');
    },
};

export default meta;
