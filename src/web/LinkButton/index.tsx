import r2wc from '@r2wc/react-to-web-component';
import {Fragment, FunctionComponent} from 'react';
import {LinkButton as UnstyledLinkButton, css, LinkButtonProps} from '../../react/LinkButton';

export type {LinkButtonProps};

const ReactLinkButton: FunctionComponent<LinkButtonProps> = props => (
    <Fragment>
        <style>{css}</style>
        <UnstyledLinkButton {...props}>
            <slot />
        </UnstyledLinkButton>
    </Fragment>
);

export const LinkButton = r2wc(ReactLinkButton, {
    shadow: 'closed',
    props: {
        href: 'string',
        branded: 'boolean',
        theme: 'string',
        position: 'string',
        label: 'string',
    },
});
