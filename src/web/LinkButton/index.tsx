import r2wc from '@r2wc/react-to-web-component';
import {LinkButton as ReactLinkButton, LinkButtonProps} from '../../react/LinkButton';

export type {LinkButtonProps};

export const LinkButton = r2wc(
    (props: LinkButtonProps) => (
        <ReactLinkButton {...props}>
            <slot />
        </ReactLinkButton>
    ),
    {
        shadow: 'closed',
        props: {
            href: 'string',
            branded: 'boolean',
            theme: 'string',
            position: 'string',
            label: 'string',
            size: 'string',
        },
    },
);
