import r2wc from '@r2wc/react-to-web-component';
import {Fragment} from 'react';
import css from '../../react/LinkButton/styles.module.css?inline';
import {LinkButton as ReactLinkButton, LinkButtonProps} from '../../react/LinkButton';

export type {LinkButtonProps};

export const LinkButton = r2wc(
    (props: LinkButtonProps) => (
        <Fragment>
            <style>{css}</style>
            <ReactLinkButton {...props}>
                <slot />
            </ReactLinkButton>
        </Fragment>
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
