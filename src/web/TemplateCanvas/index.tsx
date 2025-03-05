import r2wc from '@r2wc/react-to-web-component';
import {Fragment, FunctionComponent} from 'react';
import {css, TemplateCanvas as UnstyledTemplateCanvas, TemplateCanvasProps} from '../../react/TemplateCanvas';

export type {TemplateCanvasProps};

const ReactTemplateCanvas: FunctionComponent<TemplateCanvasProps> = props => (
    <Fragment>
        <style>{css}</style>
        <UnstyledTemplateCanvas {...props}>
            <slot />
        </UnstyledTemplateCanvas>
    </Fragment>
);

export const TemplateCanvas = r2wc(ReactTemplateCanvas, {
    shadow: 'closed',
    props: {
        subBrand: 'string',
        theme: 'string',
        title: 'string',
        ctaLabel: 'string',
        ctaLink: 'string',
    },
});
