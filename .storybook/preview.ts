import type {Preview} from '@storybook/react'

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        backgrounds: {
            values: [
                {
                    name: 'Dark',
                    value: '#0F172A'
                },
                {
                    name: 'Light',
                    value: '#FFFFFF'
                },
            ],
            default: 'Light',
        },
    },
};

export default preview;
