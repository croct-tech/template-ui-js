import type {Meta, StoryObj} from '@storybook/react';
import {ReactElement} from 'react';
import {expect, userEvent, within} from '@storybook/test';
import styles from './stories.module.css';
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
        title: 'Template title',
        theme: 'light',
        subBrandLabel: 'templates',
        ctaLabel: 'Edit content',
        ctaLink: 'https://app.croct.com',
        ctaTarget: '_blank',
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
        isolated: {
            name: 'Isolated',
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
            control: {
                type: 'text',
            },
        },
        minHeight: {
            name: 'Min height',
            control: {
                type: 'text',
            },
        },
        maxHeight: {
            name: 'Max height',
            control: {
                type: 'text',
            },
        },
        ctaTarget: {
            name: 'Call to action target',
            control: {
                type: 'text',
            },
        },
        fullScreen: {
            name: 'Full screen',
        },
        portal: {
            name: 'Portal',
        },
    },
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
};

type Story = StoryObj<typeof TemplateCanvas>;

export const Iframe: Story = {
    args: {
        isolated: true,
        fullScreen: true,
        portal: false,
        children: (
            <div className={styles.example} style={{position: 'absolute', inset: 0, width: '100%', height: '100%'}}>
                Template content.
            </div>
        ),
    },
    play: async ({canvasElement, args}) => {
        const container = within(canvasElement);

        const iframe = await container.findByTitle(args.title) as HTMLIFrameElement;

        await expect(iframe).toBeInTheDocument();

        await new Promise<void>(resolve => {
            iframe.onload = (): void => {
                resolve();
            };
        });

        const iframeBody = iframe.contentDocument?.body ?? null;

        await expect(iframeBody).not.toBeNull();

        const iframeContainer = within(iframeBody as HTMLElement);

        await expect(iframeContainer.findByText('Template content.')).resolves.toBeInTheDocument();
    },
};

function StyleDemo(): ReactElement {
    const setStyle = (): void => {
        const style = document.createElement('style');

        style.id = 'example';
        style.setAttribute('data-testid', 'example');

        style.innerHTML = `
            .example {
                background-color: red;
            }
        `;

        document.head.appendChild(style);
    };

    const unsetStyle = (): void => {
        document.getElementById('example')?.remove();
    };

    return (
        <div className={styles.example} style={{position: 'absolute', inset: 0, width: '100%', height: '100%'}}>
            <div className="example">Template content.</div>
            <div>
                <button type="button" onClick={setStyle}>Set style</button>
                <button type="button" onClick={unsetStyle}>Unset style</button>
            </div>
        </div>
    );
}

export const IframeStyle: Story = {
    args: {
        isolated: true,
        fullScreen: true,
        portal: false,
        children: (<StyleDemo />),
    },
    play: async ({canvasElement, args}) => {
        const container = within(canvasElement);
        const head = within(canvasElement.ownerDocument.head);

        const iframe = await container.findByTitle(args.title) as HTMLIFrameElement;

        await expect(iframe).toBeInTheDocument();

        await new Promise<void>(resolve => {
            iframe.onload = (): void => {
                resolve();
            };
        });

        const iframeBody = iframe.contentDocument?.body ?? null;

        await expect(iframeBody).not.toBeNull();

        const iframeContainer = within(iframeBody as HTMLElement);

        await expect(iframeContainer.findByText('Template content.')).resolves.toBeInTheDocument();

        const iframeHead = iframe.contentDocument?.head as HTMLHeadElement;

        await expect(iframeHead).not.toBeNull();

        await expect(head.queryByTestId('example')).not.toBeInTheDocument();
        // queryByTestId does not work, probably because the element is in the iframe DOM
        await expect(iframeHead.querySelector('[data-testid="example"]')).toBeNull();

        const setStyleButton = iframeContainer.getByRole('button', {name: 'Set style'});

        await userEvent.click(setStyleButton);

        await expect(head.getByTestId('example')).toBeInTheDocument();
        await expect(iframeHead.querySelector('[data-testid="example"]')).not.toBeNull();

        const unsetStyleButton = iframeContainer.getByRole('button', {name: 'Unset style'});

        await userEvent.click(unsetStyleButton);

        await expect(head.queryByTestId('example')).not.toBeInTheDocument();
        await expect(iframeHead.querySelector('[data-testid="example"]')).toBeNull();
    },
};

export const IframePortal: Story = {
    args: {
        isolated: true,
        fullScreen: true,
        portal: true,
        children: (
            <div className={styles.example} style={{position: 'absolute', inset: 0, width: '100%', height: '100%'}}>
                Template content.
            </div>
        ),
    },
    play: async ({canvasElement, args}) => {
        const container = within(canvasElement.parentNode as HTMLElement);

        const iframe = await container.findByTitle(args.title) as HTMLIFrameElement;

        await expect(iframe).toBeInTheDocument();

        await new Promise<void>(resolve => {
            iframe.onload = (): void => {
                resolve();
            };
        });

        const iframeBody = iframe.contentDocument?.body ?? null;

        await expect(iframeBody).not.toBeNull();

        const iframeContainer = within(iframeBody as HTMLElement);

        await expect(iframeContainer.findByText('Template content.')).resolves.toBeInTheDocument();
    },
};

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

        await expect(cta).toHaveAttribute('target', args.ctaTarget);
    },
};

export const Portal: Story = {
    args: {
        // Prevent the template from being rendered in a portal on the docs page
        portal: new URL(window.location.href).searchParams.get('viewMode') !== 'docs',
    },
};

export const Dark: Story = {
    name: 'Inline (Dark)',
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
    play: async ({canvasElement, args}) => {
        const container = within(canvasElement);

        await expect(container.getByRole('heading', {name: args.title, level: 1})).toBeInTheDocument();
    },
};

export default meta;
