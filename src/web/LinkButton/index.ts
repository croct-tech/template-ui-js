import r2wc from '@r2wc/react-to-web-component';
import {LinkButton as ReactLinkButton, LinkButtonProps} from '../../react';

export type {LinkButtonProps};

export const LinkButton = r2wc(ReactLinkButton, {
    props: {
        href: 'string',
        branded: 'boolean',
        theme: 'string',
        position: 'string',
        label: 'string',
    },
});
